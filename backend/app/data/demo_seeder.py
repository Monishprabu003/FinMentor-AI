from datetime import date, timedelta
from sqlalchemy.orm import Session
from app.models.models import User, Transaction, Budget, SavingsGoal, LearningProgress
from app.services.auth_service import get_password_hash

def seed_demo_data(db: Session):
    demo_email = "demo@finmentor.ai"
    existing_user = db.query(User).filter(User.email == demo_email).first()
    if existing_user:
        return existing_user

    demo_user = User(
        email=demo_email,
        hashed_password=get_password_hash("demo123"),
        full_name="Alex Rivera",
        experience_level="graduate",
        monthly_income_target=3400.0
    )
    db.add(demo_user)
    db.commit()
    db.refresh(demo_user)

    today = date.today()

    # Seed realistic transactions for a young professional
    transactions_data = [
        # Income
        {"title": "Junior Associate Salary (Net)", "amount": 2850.0, "type": "INCOME", "category": "Salary", "days_ago": 4},
        {"title": "Freelance Web Design Project", "amount": 550.0, "type": "INCOME", "category": "Freelance", "days_ago": 12},
        # Expenses - Needs
        {"title": "Apartment Rent & Utilities Share", "amount": 1050.0, "type": "EXPENSE", "category": "Housing", "days_ago": 3},
        {"title": "Weekly Grocery Run (Trader Joe's)", "amount": 142.50, "type": "EXPENSE", "category": "Food & Dining", "days_ago": 2},
        {"title": "Fresh produce & pantry essentials", "amount": 118.00, "type": "EXPENSE", "category": "Food & Dining", "days_ago": 9},
        {"title": "City Metro Monthly Transit Pass", "amount": 120.00, "type": "EXPENSE", "category": "Transportation", "days_ago": 5},
        # Expenses - Wants
        {"title": "Weekend Dinner with College Friends", "amount": 64.00, "type": "EXPENSE", "category": "Entertainment", "days_ago": 6},
        {"title": "Cloud & Finance E-Books Subscription", "amount": 28.00, "type": "EXPENSE", "category": "Education & Books", "days_ago": 14},
        {"title": "Campus Coffee & Matcha", "amount": 19.50, "type": "EXPENSE", "category": "Food & Dining", "days_ago": 1},
        # Savings / Investing transfer
        {"title": "Automated S&P 500 ETF Investment (VOO)", "amount": 400.0, "type": "EXPENSE", "category": "Savings & Investments", "days_ago": 4},
        {"title": "High-Yield Emergency Fund Transfer", "amount": 250.0, "type": "EXPENSE", "category": "Savings & Investments", "days_ago": 4},
    ]

    for tx in transactions_data:
        db.add(Transaction(
            user_id=demo_user.id,
            title=tx["title"],
            amount=tx["amount"],
            type=tx["type"],
            category=tx["category"],
            date=today - timedelta(days=tx["days_ago"]),
            notes="Auto-seeded transaction for demo experience"
        ))

    # Seed Budgets
    budgets_data = [
        {"category": "Housing", "limit": 1150.0},
        {"category": "Food & Dining", "limit": 400.0},
        {"category": "Transportation", "limit": 180.0},
        {"category": "Entertainment", "limit": 160.0},
        {"category": "Education & Books", "limit": 100.0},
    ]
    for b in budgets_data:
        db.add(Budget(
            user_id=demo_user.id,
            category=b["category"],
            monthly_limit=b["limit"],
            alert_threshold=0.85
        ))

    # Seed Savings Goals
    goals_data = [
        {
            "name": "3-Month Emergency Fund (HYSA)",
            "target": 3000.0,
            "current": 1850.0,
            "category": "Emergency Fund",
            "target_date": today + timedelta(days=120)
        },
        {
            "name": "Starter Roth IRA Index Fund Portfolio",
            "target": 2500.0,
            "current": 1100.0,
            "category": "Investing",
            "target_date": today + timedelta(days=180)
        },
        {
            "name": "Professional Laptop & Career Certification",
            "target": 1200.0,
            "current": 700.0,
            "category": "Education",
            "target_date": today + timedelta(days=60)
        }
    ]
    for g in goals_data:
        db.add(SavingsGoal(
            user_id=demo_user.id,
            name=g["name"],
            target_amount=g["target"],
            current_amount=g["current"],
            target_date=g["target_date"],
            category=g["category"]
        ))

    # Seed Learning Progress
    db.add(LearningProgress(user_id=demo_user.id, module_id="mod_budget_101", completed=True, score=100))
    db.add(LearningProgress(user_id=demo_user.id, module_id="mod_emergency_fund", completed=True, score=100))

    db.commit()
    return demo_user
