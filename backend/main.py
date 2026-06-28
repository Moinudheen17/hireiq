from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.db import Base, engine
from app.routers import jobs, candidates
from app.config import settings
import os

# Create upload directory
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HireIQ API",
    description="AI-powered resume screening tool",
    version="1.0.0"
)

# CORS — allows Priya's frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(jobs.router)
app.include_router(candidates.router)

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "HireIQ backend is running"}