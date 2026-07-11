from datetime import datetime, date
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    experience_level: str = "student"
    monthly_income_target: Optional[float] = 3200.0

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    experience_level: Optional[str] = None
    monthly_income_target: Optional[float] = None

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[str] = None


# Transaction Schemas
class TransactionBase(BaseModel):
    title: str
    amount: float = Field(gt=0, description="Amount must be positive")
    type: str  # "INCOME" or "EXPENSE"
    category: str
    date: date
    notes: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class TransactionUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = None
    type: Optional[str] = None
    category: Optional[str] = None
    date: Optional[date] = None
    notes: Optional[str] = None

class TransactionResponse(TransactionBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Budget Schemas
class BudgetBase(BaseModel):
    category: str
    monthly_limit: float = Field(gt=0)
    alert_threshold: Optional[float] = 0.85

class BudgetCreate(BudgetBase):
    pass

class BudgetUpdate(BaseModel):
    monthly_limit: Optional[float] = None
    alert_threshold: Optional[float] = None

class BudgetResponse(BudgetBase):
    id: int
    user_id: int
    spent_amount: float = 0.0
    remaining_amount: float = 0.0
    percent_used: float = 0.0
    status: str = "OK"  # OK | WARNING | OVER_BUDGET

    class Config:
        from_attributes = True


# Savings Goal Schemas
class SavingsGoalBase(BaseModel):
    name: str
    target_amount: float = Field(gt=0)
    current_amount: float = 0.0
    target_date: Optional[date] = None
    category: str = "Emergency Fund"

class SavingsGoalCreate(SavingsGoalBase):
    pass

class SavingsGoalUpdate(BaseModel):
    name: Optional[str] = None
    target_amount: Optional[float] = None
    current_amount: Optional[float] = None
    target_date: Optional[date] = None
    category: Optional[str] = None

class SavingsGoalResponse(SavingsGoalBase):
    id: int
    user_id: int
    progress_percentage: float = 0.0
    monthly_savings_required: Optional[float] = None

    class Config:
        from_attributes = True


# Learning Progress Schemas
class LearningProgressCreate(BaseModel):
    module_id: str
    score: int = 100

class LearningProgressResponse(BaseModel):
    id: int
    module_id: str
    completed: bool
    score: int
    completed_at: datetime

    class Config:
        from_attributes = True


# Analytics & Dashboard Schemas
class CategoryExpenseSummary(BaseModel):
    category: str
    total_amount: float
    percentage: float

class MonthlyCashFlow(BaseModel):
    month: str
    income: float
    expense: float
    net_savings: float

class BudgetAnalyzer503020(BaseModel):
    needs_spent: float
    needs_target: float
    wants_spent: float
    wants_target: float
    savings_spent: float
    savings_target: float
    recommendation: str

class DashboardSummaryResponse(BaseModel):
    total_income_this_month: float
    total_expense_this_month: float
    net_savings_this_month: float
    savings_rate_percentage: float
    estimated_net_worth: float
    category_breakdown: List[CategoryExpenseSummary]
    monthly_cash_flow: List[MonthlyCashFlow]
    budget_analyzer: BudgetAnalyzer503020


# AI Assistant Request & Response Schemas
class AIChatRequest(BaseModel):
    message: str
    context: Optional[str] = None

class AIChatResponse(BaseModel):
    reply: str
    suggested_questions: List[str]

class AIExplainConceptRequest(BaseModel):
    concept: str
    user_level: str = "student"

class AIExplainConceptResponse(BaseModel):
    concept: str
    simple_explanation: str
    real_world_example: str
    key_takeaway: str
