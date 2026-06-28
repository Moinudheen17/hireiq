from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

# Job schemas
class JobCreate(BaseModel):
    title: str
    description: str

class JobResponse(BaseModel):
    id: int
    title: str
    description: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Candidate schemas
class CandidateResponse(BaseModel):
    id: int
    job_id: int
    filename: str
    score: Optional[float] = None
    explanation: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class CandidateDetail(CandidateResponse):
    resume_text: str

    class Config:
        from_attributes = True

# Results schema
class JobResults(BaseModel):
    job: JobResponse
    candidates: List[CandidateResponse]