from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os

app = FastAPI(title="AI Suggestion Service")

class SuggestRequest(BaseModel):
    message: str

class SuggestResponse(BaseModel):
    suggestion: str

@app.post("/suggest", response_model=SuggestResponse)
async def suggest(req: SuggestRequest):
    """
    Return a draft reply suggestion for a given support ticket message.
    In production this would call an AI API such as OpenAI.
    """
    message = req.message
    # simple heuristic suggestion – replace with actual API call
    suggestion = f"Thank you for reaching out. We’re investigating your issue: '{message}'. We'll update you soon."
    return SuggestResponse(suggestion=suggestion)