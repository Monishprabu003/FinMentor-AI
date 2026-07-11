from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import User
from app.schemas.schemas import (
    AIChatRequest,
    AIChatResponse,
    AIExplainConceptRequest,
    AIExplainConceptResponse
)
from app.services.auth_service import get_current_user
from app.services.finance_engine import compute_dashboard_summary
from app.services.ai_service import chat_with_mentor, generate_spending_insights, explain_concept

router = APIRouter(prefix="/ai", tags=["FinMentor AI Assistant"])

@router.post("/chat", response_model=AIChatResponse)
def ai_chat(
    req: AIChatRequest,
    current_user: User = Depends(get_current_user)
):
    return chat_with_mentor(req, current_user.experience_level)


@router.get("/insights")
def ai_spending_insights(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    dashboard_metrics = compute_dashboard_summary(current_user, db)
    insights = generate_spending_insights(dashboard_metrics)
    return {"insights": insights}


@router.post("/explain-concept", response_model=AIExplainConceptResponse)
def ai_explain_concept(
    req: AIExplainConceptRequest,
    current_user: User = Depends(get_current_user)
):
    req.user_level = current_user.experience_level
    return explain_concept(req)
