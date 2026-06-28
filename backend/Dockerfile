FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir fastapi uvicorn[standard] sqlalchemy pdfplumber python-docx sentence-transformers google-genai groq python-multipart pydantic-settings aiofiles python-dotenv

COPY . .

RUN mkdir -p uploads

EXPOSE 8000

CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}