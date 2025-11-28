# main.py — FastAPI + اتصال بسيط بـ OpenAI (GPT)
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# حاول استيراد مكتبة openai إذا موجودة
try:
    import openai
except Exception:
    openai = None

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Neuro-Context-AI backend is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/analyze")
async def analyze(data: dict):
    """
    يتلقى JSON مثل: {"text": "نص تريد تحليله"}
    سيحاول استخدام OpenAI إذا مفتاح API موجود، وإلا يرجع استجابة بسيطة.
    """
    text = data.get("text", "")
    if not text:
        raise HTTPException(status_code=400, detail="Missing 'text' in request body.")

    # استخدم متغيّر البيئة OPENAI_API_KEY — تعيينه خطوة لاحقة
    api_key = os.environ.get("OPENAI_API_KEY")

    # إذا مكتبة openai غير منصّبة أو مفتاح غير موجود نرجع رد بدائي
    if not openai or not api_key:
        # fallback بسيط (بدون AI) — مجرد echo مع بعض النصائح
        return {
            "analysis": f"(fallback) Received text: {text}",
            "note": "OpenAI not configured. Set environment variable OPENAI_API_KEY to enable AI."
        }

    # تهيئة مكتبة OpenAI
    openai.api_key = api_key

    try:
        resp = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "أنت مساعد مختص بتحليل النصوص وإعطاء ملخص نقاط رئيسية واقتراحات."},
                {"role": "user", "content": f"حلّل النص التالي واعطِ: (1) ملخّص قصير، (2) أهم 3 نقاط، (3) اقتراح تحسين واحد.\n\n{text}"}
            ],
            max_tokens=500,
            temperature=0.2,
        )
        content = resp["choices"][0]["message"]["content"].strip()
        return {"analysis": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI error: {str(e)}")
