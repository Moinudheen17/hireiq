from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
import shutil
from concurrent.futures import ThreadPoolExecutor, as_completed

from app.models.db import get_db
from app.models.database import Job, Candidate
from app.models.schemas import JobCreate, JobResponse, JobResults
from app.services.extractor import extract_text
from app.services.scorer import score_resume
from app.services.explainer import explain_score
from app.config import settings

router = APIRouter()

@router.post("/jobs", response_model=JobResponse)
def create_job(job: JobCreate, db: Session = Depends(get_db)):
    new_job = Job(title=job.title, description=job.description)
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

@router.get("/jobs", response_model=List[JobResponse])
def list_jobs(db: Session = Depends(get_db)):
    return db.query(Job).order_by(Job.created_at.desc()).all()

@router.get("/jobs/{job_id}", response_model=JobResponse)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.delete("/jobs/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(job)
    db.commit()
    return {"message": "Job deleted successfully"}

@router.post("/jobs/{job_id}/upload")
def upload_resumes(
    job_id: int,
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db)
):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    upload_dir = os.path.join(settings.UPLOAD_DIR, str(job_id))
    os.makedirs(upload_dir, exist_ok=True)

    uploaded = []
    for file in files:
        file_path = os.path.join(upload_dir, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        try:
            text = extract_text(file_path)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to extract {file.filename}: {str(e)}")

        candidate = Candidate(
            job_id=job_id,
            filename=file.filename,
            resume_text=text
        )
        db.add(candidate)
        uploaded.append(file.filename)

    db.commit()
    return {"uploaded": uploaded, "count": len(uploaded)}

@router.post("/jobs/{job_id}/screen")
def screen_candidates(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    candidates = db.query(Candidate).filter(Candidate.job_id == job_id).all()
    if not candidates:
        raise HTTPException(status_code=400, detail="No resumes uploaded for this job")

    def process_candidate(candidate):
        score = score_resume(job.description, candidate.resume_text)
        explanation = explain_score(job.description, candidate.resume_text, score)
        return candidate.id, score, explanation

    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(process_candidate, c): c for c in candidates}
        for future in as_completed(futures):
            candidate_id, score, explanation = future.result()
            candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
            candidate.score = score
            candidate.explanation = explanation

    job.status = "screened"
    db.commit()

    return {"message": "Screening complete", "screened": len(candidates)}

@router.get("/jobs/{job_id}/results", response_model=JobResults)
def get_results(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    candidates = db.query(Candidate)\
        .filter(Candidate.job_id == job_id)\
        .order_by(Candidate.score.desc())\
        .all()

    return {"job": job, "candidates": candidates}
