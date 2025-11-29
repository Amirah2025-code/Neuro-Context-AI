# main.py - FastAPI + اتصال جاهز مع OpenAI

import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# تحميل ملف .env
load_dotenv()

# استيراد OpenAI
try:
    from openai import OpenAI
except Exception:
    raise Exception("مكتبة openai غير منصّبة. ثبّتها باستخدام: pip install openai")

# جلب المفتاح من .env
API_KEY = os.getenv("OPENAI_API_KEY")

if not API_KEY:
    raise Exception("مفتاح OPENAI_API_KEY غير موجود داخل ملف .env")

client = OpenAI(api_key=API_KEY)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# الموديل المستخدم
MODEL = "gpt-4.1-mini"

# تعريف شكل البيانات القادمة
class InputText(BaseModel):
    text: str

@app.get("/")
def home():
    return {"status": "API is running successfully!"}

@app.post("/api/analyze")
async def analyze_text(data: InputText):
    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "user", "content": data.text}
            ]
        )

        result = response.choices[0].message["content"]
        return {"result": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")
