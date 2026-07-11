from datetime import date, datetime
from typing import List, Dict
from sqlalchemy.orm import Session
from app.models.models import User, Transaction, Budget, SavingsGoal
from app.schemas.schemas import (
    BudgetResponse,
    SavingsGoalResponse,
    CategoryExpenseSummary,
    MonthlyCashFlow,
    BudgetAnalyzer503020,
    DashboardSummaryResponse,
)

def enrich_budget_response(budget: Budget, spent_amount: float) -> BudgetResponse:
    limit = budget.monthly_limit
    remaining = max(0.0, limit - spent_amount)
    percent_used = round((spent_amount / limit) * 100.0, 1) if limit > 0 else 0.0
    
    status = "OK"
    if spent_amount > limit:
        status = "OVER_BUDGET"
    elif percent_used >= (budget.alert_threshold * 100.0):
        status = "WARNING"
        
    return BudgetResponse(
        id=budget.id,
        user_id=budget.user_id,
        category=budget.category,
        monthly_limit=limit,
        alert_threshold=budget.alert_threshold,
        spent_amount=round(spent_amount, 2),
        remaining_amount=round(remaining, 2),
        percent_used=percent_used,
        status=status,
    )


def enrich_savings_goal_response(goal: SavingsGoal) -> SavingsGoalResponse:
    target = goal.target_amount
    current = goal.current_amount
    progress = round(min(100.0, (current / target) * 100.0), 1) if target > 0 else 0.0
    
    monthly_req = None
    if goal.target_date and goal.target_date > date.today():
        remaining_amount = max(0.0, target - current)
        days_left = (goal.target_date - date.today()).days
        months_left = max(1.0, days_left / 30.0)
        monthly_req = round(remaining_amount / months_left, 2)
        
    return SavingsGoalResponse(
        id=goal.id,
        user_id=goal.user_id,
        name=goal.name,
        target_amount=target,
        current_amount=current,
        target_date=goal.target_date,
        category=goal.category,
        progress_percentage=progress,
        monthly_savings_required=monthly_req,
    )


def compute_dashboard_summary(user: User, db: Session) -> DashboardSummaryResponse:
    # 1. Gather all transactions for the current user
    transactions = db.query(Transaction).filter(Transaction.user_id == user.id).all()
    
    # Current month filtering
    now = datetime.utcnow()
    current_year = now.year
    current_month = now.month
    
    total_income = 0.0
    total_expense = 0.0
    category_totals: Dict[str, float] = {}
    
    # Historical monthly cash flows (last 6 months)
    monthly_buckets: Dict[str, Dict[str, float]] = {}
    
    # Initialize last 6 months
    for m_offset in range(5, -1, -1):
        m_index = (current_month - m_offset - 1) % 12 + 1
        y_index = current_year - ((12 - (current_month - m_offset)) // 12 if current_month - m_offset <= 0 else 0)
        month_label = f"{date(y_index, m_index, 1).strftime('%b')} {y_index}"
        monthly_buckets[month_label] = {"income": 0.0, "expense": 0.0}
        
    all_time_net_worth = 2450.0  # Base starter balance assumption for young professionals
    
    for tx in transactions:
        tx_year = tx.date.year
        tx_month = tx.date.month
        month_label = f"{tx.date.strftime('%b')} {tx_year}"
        
        if tx.type == "INCOME":
            all_time_net_worth += tx.amount
            if tx_year == current_year and tx_month == current_month:
                total_income += tx.amount
            if month_label in monthly_buckets:
                monthly_buckets[month_label]["income"] += tx.amount
        elif tx.type == "EXPENSE":
            all_time_net_worth -= tx.amount
            if tx_year == current_year and tx_month == current_month:
                total_expense += tx.amount
                category_totals[tx.category] = category_totals.get(tx.category, 0.0) + tx.amount
            if month_label in monthly_buckets:
                monthly_buckets[month_label]["expense"] += tx.amount

    net_savings = round(total_income - total_expense, 2)
    savings_rate = round((net_savings / total_income) * 100.0, 1) if total_income > 0 else 0.0

    # Category breakdown
    category_breakdown: List[CategoryExpenseSummary] = []
    for cat, amt in sorted(category_totals.items(), key=lambda x: x[1], reverse=True):
        pct = round((amt / total_expense) * 100.0, 1) if total_expense > 0 else 0.0
        category_breakdown.append(
            CategoryExpenseSummary(category=cat, total_amount=round(amt, 2), percentage=pct)
        )

    # Monthly cash flow formatted for Recharts
    monthly_cash_flow: List[MonthlyCashFlow] = []
    for m_label, vals in monthly_buckets.items():
        monthly_cash_flow.append(
            MonthlyCashFlow(
                month=m_label,
                income=round(vals["income"], 2),
                expense=round(vals["expense"], 2),
                net_savings=round(vals["income"] - vals["expense"], 2)
            )
        )

    # 50/30/20 Deterministic Budget Analyzer
    # Needs: Housing, Food & Dining, Transportation, Insurance
    # Wants: Entertainment, Shopping, Subscriptions
    # Savings: Savings & Investments, Debt Paydown
    needs_spent = sum(amt for cat, amt in category_totals.items() if cat in ["Housing", "Food & Dining", "Transportation", "Utilities"])
    wants_spent = sum(amt for cat, amt in category_totals.items() if cat in ["Entertainment", "Shopping", "Education & Books", "Miscellaneous"])
    savings_spent = sum(amt for cat, amt in category_totals.items() if cat in ["Savings & Investments", "Debt Paydown"])
    
    needs_target = round(total_income * 0.50, 2)
    wants_target = round(total_income * 0.30, 2)
    savings_target = round(total_income * 0.20, 2)
    
    recommendation = "Your 50/30/20 balance is well-aligned! Keep up your consistent savings routine."
    if needs_spent > needs_target and total_income > 0:
        recommendation = f"Your essential 'Needs' are consuming {round((needs_spent/total_income)*100)}% of income (target: 50%). Look for opportunities to reduce recurring fixed bills."
    elif savings_spent < savings_target and total_income > 0:
        recommendation = f"Your savings rate is below the 20% rule of thumb. Consider setting up an automatic recurring transfer on payday."

    budget_analyzer = BudgetAnalyzer503020(
        needs_spent=round(needs_spent, 2),
        needs_target=needs_target,
        wants_spent=round(wants_spent, 2),
        wants_target=wants_target,
        savings_spent=round(savings_spent, 2),
        savings_target=savings_target,
        recommendation=recommendation
    )

    return DashboardSummaryResponse(
        total_income_this_month=round(total_income, 2),
        total_expense_this_month=round(total_expense, 2),
        net_savings_this_month=net_savings,
        savings_rate_percentage=savings_rate,
        estimated_net_worth=round(all_time_net_worth, 2),
        category_breakdown=category_breakdown,
        monthly_cash_flow=monthly_cash_flow,
        budget_analyzer=budget_analyzer,
    )
