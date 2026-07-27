import uuid
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.models import User, UserBadge, UserCertificate

LEVEL_TITLES = {
    1: "Financial Beginner",
    2: "Budget Explorer",
    3: "Smart Saver",
    4: "Investment Learner",
    5: "Finance Enthusiast",
    6: "Debt Eliminator",
    7: "Wealth Builder",
    8: "Financial Strategist",
    9: "Wealth Mastermind",
    10: "Financial Master",
}

class GamificationService:
    @staticmethod
    def award_xp(user: User, db: Session, xp_amount: int) -> dict:
        user.xp += xp_amount
        
        # Calculate Level (500 XP per level)
        new_level = max(1, min(50, (user.xp // 500) + 1))
        leveled_up = new_level > user.level
        user.level = new_level
        user.level_title = LEVEL_TITLES.get(new_level, "Financial Mastermind")
        
        db.commit()
        db.refresh(user)

        return {
            "total_xp": user.xp,
            "level": user.level,
            "level_title": user.level_title,
            "xp_awarded": xp_amount,
            "leveled_up": leveled_up,
        }

    @staticmethod
    def unlock_badge(user: User, db: Session, badge_id: str, badge_name: str) -> dict:
        existing = db.query(UserBadge).filter(
            UserBadge.user_id == user.id,
            UserBadge.badge_id == badge_id
        ).first()

        if not existing:
            new_badge = UserBadge(
                user_id=user.id,
                badge_id=badge_id,
                badge_name=badge_name,
                unlocked_at=datetime.utcnow()
            )
            db.add(new_badge)
            db.commit()
            return {"unlocked": True, "badge_name": badge_name}
        
        return {"unlocked": False, "message": "Badge already unlocked"}

    @staticmethod
    def generate_certificate(user: User, db: Session, course_title: str) -> dict:
        credential_id = f"FIN-{uuid.uuid4().hex[:8].upper()}"
        issue_date = datetime.utcnow().strftime("%B %d, %Y")

        cert = UserCertificate(
            user_id=user.id,
            title=f"Verified Certificate in {course_title}",
            credential_id=credential_id,
            issue_date=issue_date,
        )
        db.add(cert)
        db.commit()
        db.refresh(cert)

        return {
            "title": cert.title,
            "credential_id": cert.credential_id,
            "issue_date": cert.issue_date,
            "download_url": f"/api/v1/certificates/{cert.credential_id}/download",
        }
