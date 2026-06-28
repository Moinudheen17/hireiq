from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")

def score_resume(job_description: str, resume_text: str) -> float:
    jd_embedding = model.encode([job_description])
    resume_embedding = model.encode([resume_text])

    similarity = cosine_similarity(jd_embedding, resume_embedding)[0][0]

    # Convert to 0-100 scale
    score = round(float(similarity) * 100, 2)
    return score