from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.auth_service import get_current_user
from app.models.models import User

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("/")
def get_user_notifications(current_user: User = Depends(get_current_user)):
    return [
        {
            "id": "notif-1",
            "title": "🔥 14-Day Streak Bonus Unlocked!",
            "message": "You earned +150 XP for maintaining your learning streak.",
            "timestamp": "2 hours ago",
            "read": False,
            "type": "streak",
        },
        {
            "id": "notif-2",
            "title": "🏆 Level Up: Level 8 Financial Strategist",
            "message": "Congratulations! You've unlocked the Financial Strategist badge.",
            "timestamp": "1 day ago",
            "read": True,
            "type": "level_up",
        },
    ]

@router.post("/{notification_id}/read")
def mark_notification_read(notification_id: str, current_user: User = Depends(get_current_user)):
    return {"status": "success", "id": notification_id, "read": True}
