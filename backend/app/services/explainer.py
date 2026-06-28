from groq import Groq
from app.config import settings

client = Groq(api_key=settings.GROQ_API_KEY)

def explain_score(job_description: str, resume_text: str, score: float) -> str:
    prompt = f"""You are an expert HR assistant. A candidate's resume has been scored {score}/100 against a job description.

Job Description:
{job_description}

Resume:
{resume_text}

In 3-4 sentences, explain why this candidate scored {score}/100. Mention specific strengths and gaps. Be direct and professional."""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=200
    )
    return response.choices[0].message.content.strip()