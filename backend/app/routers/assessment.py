from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import User
from app.schemas.assessment import AssessmentSubmit, AssessmentResponse
from app.routers.auth import get_current_user

router = APIRouter(prefix="/assessment", tags=["Assessment"])

@router.post("/submit", response_model=AssessmentResponse)
def submit_assessment(
    payload: AssessmentSubmit,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # If the user has already completed the assessment, we could reject it or just update it
    # We will update it for flexibility.
    
    current_user.monthly_income = payload.monthly_income
    current_user.monthly_expenses = payload.monthly_expenses
    current_user.financial_goals = payload.financial_goals
    current_user.assessment_answers = payload.assessment_answers
    
    # We can trust the frontend calculations or compute here if missing
    score = payload.financial_score or 0
    current_user.financial_score = score
    
    if score <= 40:
        current_user.knowledge_level = "Beginner"
        current_user.financial_persona = "Financial Beginner"
    elif score <= 70:
        current_user.knowledge_level = "Intermediate"
        current_user.financial_persona = "Smart Saver"
    else:
        current_user.knowledge_level = "Advanced"
        current_user.financial_persona = "Wealth Explorer"
        
    # Override with frontend sent values if present
    if payload.knowledge_level:
        current_user.knowledge_level = payload.knowledge_level
    if payload.financial_persona:
        current_user.financial_persona = payload.financial_persona
    if payload.risk_profile:
        current_user.risk_profile = payload.risk_profile
        
    current_user.assessment_completed = True
    
    db.commit()
    db.refresh(current_user)
    
    return AssessmentResponse(
        status="success",
        message="Assessment submitted successfully.",
        assessment_completed=current_user.assessment_completed,
        financial_score=current_user.financial_score,
        knowledge_level=current_user.knowledge_level,
        financial_persona=current_user.financial_persona,
        risk_profile=current_user.risk_profile
    )
