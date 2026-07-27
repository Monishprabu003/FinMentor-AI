from pydantic import BaseModel
from typing import Optional
from datetime import date

class TransactionBase(BaseModel):
    title: str
    amount: float
    type: str # "INCOME" or "EXPENSE"
    category: str
    date: date
    notes: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class TransactionResponse(TransactionBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class BudgetBase(BaseModel):
    category: str
    monthly_limit: float
    alert_threshold: float = 0.85

class BudgetCreate(BudgetBase):
    pass

class BudgetResponse(BudgetBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class GoalBase(BaseModel):
    name: str
    target_amount: float
    current_amount: float = 0.0
    target_date: Optional[date] = None
    category: str = "Emergency Fund"

class GoalCreate(GoalBase):
    pass

class GoalResponse(GoalBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
