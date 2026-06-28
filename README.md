# HireIQ — AI-Powered Resume Screening Tool

An internal web tool that reduces resume screening from 3-4 days to under 1 hour using AI.

## Tech Stack

**Backend:** FastAPI, SQLite, SQLAlchemy, Sentence Transformers, Groq LLaMA, pdfplumber  
**Frontend:** React 18, Tailwind CSS, Axios, React Router  
**DevOps:** Docker, Docker Compose, GitHub Actions, Render  

## Quick Start

```bash
docker-compose up
```

- Backend → http://localhost:8000
- Frontend → http://localhost:3000
- API Docs → http://localhost:8000/docs

## Features

- Create job openings with descriptions
- Upload PDF and DOCX resumes
- AI-powered semantic scoring using Sentence Transformers
- LLM explanations via Groq LLaMA
- Ranked candidate list with score rings
- Full candidate detail view