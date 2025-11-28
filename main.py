from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

@app.post("/api/analyze")
async def analyze(data: dict):
    text = data.get("text", "")
    result = f"Received text: {text}"
    return {"analysis": result}

