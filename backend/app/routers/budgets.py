from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import User, Budget, Transaction
from app.schemas.schemas import BudgetCreate, BudgetUpdate, BudgetResponse
from app.services.auth_service import get_current_user
from app.services.finance_engine import enrich_budget_response

router = APIRouter(prefix="/budgets", tags=["Budgets"])

@router.get("", response_model=List[BudgetResponse])
def get_budgets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    budgets = db.query(Budget).filter(Budget.user_id == current_user.id).all()
    
    # Compute current month expenses per category
    now = datetime.utcnow()
    current_month_tx = db.query(Transaction).filter(
        Transaction.user_id == current_user.id,
        Transaction.type == "EXPENSE"
    ).all()

    category_spend = {}
    for tx in current_month_tx:
        if tx.date.year == now.year and tx.date.month == now.month:
            category_spend[tx.category] = category_spend.get(tx.category, 0.0) + tx.amount

    responses = []
    for b in budgets:
        spent = category_spend.get(b.category, 0.0)
        responses.append(enrich_budget_response(b, spent))
        
    return responses


@router.post("", response_model=BudgetResponse, status_code=status.HTTP_201_CREATED)
def create_budget(
    b_in: BudgetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing = db.query(Budget).filter(
        Budget.user_id == current_user.id,
        Budget.category == b_in.category
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Budget for this category already exists")

    new_budget = Budget(
        user_id=current_user.id,
        category=b_in.category,
        monthly_limit=b_in.monthly_limit,
        alert_threshold=b_in.alert_threshold or 0.85
    )
    db.add(new_budget)
    db.commit()
    db.refresh(new_budget)
    return enrich_budget_response(new_budget, 0.0)


@router.put("/{budget_id}", response_model=BudgetResponse)
def update_budget(
    budget_id: int,
    b_in: BudgetUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    b = db.query(Budget).filter(
        Budget.id == budget_id,
        Budget.user_id == current_user.id
    ).first()
    if not b:
        raise HTTPException(status_code=404, detail="Budget not found")

    if b_in.monthly_limit is not None:
        b.monthly_limit = b_in.monthly_limit
    if b_in.alert_threshold is not None:
        b.alert_threshold = b_in.alert_threshold

    db.commit()
    db.refresh(b)
    
    # Re-calculate spent
    now = datetime.utcnow()
    txs = db.query(Transaction).filter(
        Transaction.user_id == current_user.id,
        Transaction.type == "EXPENSE",
        Transaction.category == b.category
    ).all()
    spent = sum(tx.amount for tx in txs if tx.date.year == now.year and tx.date.month == now.month)
    return enrich_budget_response(b, spent)


@router.delete("/{budget_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_budget(
    budget_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    b = db.query(Budget).filter(
        Budget.id == budget_id,
        Budget.user_id == current_user.id
    ).first()
    if not b:
        raise HTTPException(status_code=404, detail="Budget not found")

    db.delete(b)
    db.commit()
    return None
