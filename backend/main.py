from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any
import uuid
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class EnhanceRequest(BaseModel):
    section: str
    content: Any

stored_resume = {}

@app.post("/ai-enhance")
def ai_enhance(req: EnhanceRequest):
    section = req.section
    content = req.content

    if section == 'summary':
        return {
            "section": section,
            "content": f"✨ Improved summary ✨: {content} (AI-enhanced)"
        }

    elif section == 'skills':
        # Ensure both leadership and problem-solving are added only once
        base_skills = content if isinstance(content, list) else content.split(',')
        base_skills = [s.strip() for s in base_skills if s.strip()]
        extra_skills = ["leadership", "problem-solving"]
        enhanced = base_skills + [s for s in extra_skills if s not in base_skills]
        return {
            "section": section,
            "content": f"✨ Enhanced skills ✨: {', '.join(enhanced)}"
        }

    elif section == 'personalInfo':
        updated = {**content, 'fullName': content.get('fullName', '') + ' (AI)'}
        return {
            "section": section,
            "content": f"✨ Enhanced personalInfo ✨: {json.dumps(updated)}"
        }

    elif section == 'education':
        # Add institute name to the degree
        if isinstance(content, list):
            for item in content:
                if "degree" in item and "institution" in item:
                    item["degree"] += f" at {item['institution']}"
            return {
                "section": section,
                "content": content
            }
        return {
            "section": section,
            "content": content
        }

    else:
        return {
            "section": section,
            "content": f"✨ Enhanced {section} ✨: {content}"
        }

@app.get("/get-resumes")
def get_all_resumes():
    return stored_resume

@app.get("/get-resume/{resume_id}")
def get_resume_by_id(resume_id: str):
    resume = stored_resume.get(resume_id)
    if resume:
        return resume
    return {"error": "Resume not found"}


@app.post("/save-resume")
def save_resume(resume: dict = Body(...)):
    resume_id = str(uuid.uuid4())
    stored_resume[resume_id] = resume
    return {"message": "Resume saved", "resume_id": resume_id}

@app.delete("/delete-resume/{resume_id}")
def delete_resume(resume_id: str):
    if resume_id in stored_resume:
        del stored_resume[resume_id]
        return {"message": "Resume deleted successfully"}
    raise HTTPException(status_code=404, detail="Resume not found")