# server/main.py

from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from typing import Tuple
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Neuro-Context-AI - Server")

# Allow CORS during development so frontend (index.html/script.js) يمكنه الاتصال بسهولة.
# لاحقاً ضعي قائمة origins مناسبة بدلاً من ["*"] عند النشر.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ======== Data Models ========
class AnalyzeRequest(BaseModel):
    text: str


class AnalyzeResponse(BaseModel):
    sentiment: str
    summary: str
    score: float


# ======== AI Engine (Placeholder) ========
# استبدلي هذا الدالة بمنطقك الحقيقي (OpenAI API أو موديل محلي...) لاحقاً.
def run_ai_engine(text: str) -> Tuple[str, str, float]:
    txt = (text or "").strip()
    lower = txt.lower()

    # مثال مبسّط جداً للتجربة:
    if any(w in lower for w in ("good", "great", "excellent", "nice", "happy")):
        sentiment = "positive"
    elif any(w in lower for w in ("bad", "sad", "terrible", "angry", "hate")):
        sentiment = "negative"
    else:
        sentiment = "neutral"

    summary = txt if len(txt) <= 120 else txt[:117].rsplit(" ", 1)[0] + "..."
    # score افتراضي بين 0 و1 (مثال بسيط)
    score = 0.9 if sentiment == "positive" else (0.1 if sentiment == "negative" else 0.5)

    return sentiment, summary, float(score)


# ======== Routes ========
@app.get("/", tags=["health"])
def root():
    return {"status": "ok", "service": "Neuro-Context-AI", "version": "0.1"}


@app.post("/api/analyze", response_model=AnalyzeResponse, tags=["ai"])
async def analyze(request: AnalyzeRequest):
    sentiment, summary, score = run_ai_engine(request.text)
    return AnalyzeResponse(sentiment=sentiment, summary=summary, score=score)


# ======== Run (development) ========
if __name__ == "__main__":
    # أوصِي تشغيل السيرفر بهذا الأمر من جذر المشروع:
    # uvicorn server.main:app --reload --host 0.0.0.0 --port 8000
    uvicorn.run("server.main:app", host="0.0.0.0", port=8000, reload=True)
