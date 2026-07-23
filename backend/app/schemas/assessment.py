from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class AssessmentSubmit(BaseModel):
    monthly_income: Optional[float] = None
    monthly_expenses: Optional[float] = None
    financial_goals: Optional[List[str]] = []
    assessment_answers: Optional[Dict[str, Any]] = {}
    financial_score: Optional[int] = None
    knowledge_level: Optional[str] = None
    financial_persona: Optional[str] = None
    risk_profile: Optional[str] = None

class AssessmentResponse(BaseModel):
    status: str
    message: str
    assessment_completed: bool
    financial_score: Optional[int]
    knowledge_level: Optional[str]
    financial_persona: Optional[str]
    risk_profile: Optional[str]
