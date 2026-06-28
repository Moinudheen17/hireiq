from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def score_resume(job_description: str, resume_text: str) -> float:
    vectorizer = TfidfVectorizer(stop_words="english")
    
    try:
        tfidf_matrix = vectorizer.fit_transform([job_description, resume_text])
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        score = round(float(similarity) * 100, 2)
        return score
    except Exception:
        return 0.0