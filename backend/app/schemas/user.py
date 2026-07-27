from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    experience_level: Optional[str] = "student"

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserAssessmentSubmit(BaseModel):
    monthly_income: float
    monthly_expenses: float
    financial_goals: List[str]
    answers: Dict[str, Any]

class UserResponse(UserBase):
    id: int
    auth_provider: str
    monthly_income_target: float
    assessment_completed: bool
    financial_score: Optional[int] = None
    knowledge_level: Optional[str] = None
    financial_persona: Optional[str] = None
    risk_profile: Optional[str] = None
    xp: int = 3450
    level: int = 8
    level_title: str = "Financial Strategist"
    streak_days: int = 14

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
