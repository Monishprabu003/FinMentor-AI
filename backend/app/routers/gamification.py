from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.auth_service import get_current_user
from app.services.gamification_service import GamificationService
from app.models.models import User, UserBadge, UserCertificate

router = APIRouter(prefix="/gamification", tags=["Gamification Ecosystem"])

@router.get("/user-stats")
def get_user_gamification_stats(current_user: User = Depends(get_current_user)):
    return {
        "xp": current_user.xp,
        "level": current_user.level,
        "level_title": current_user.level_title,
        "streak_days": current_user.streak_days,
        "next_level_xp": current_user.level * 500,
    }

@router.post("/award-xp")
def award_user_xp(
    xp_amount: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return GamificationService.award_xp(current_user, db, xp_amount)

@router.get("/badges")
def get_user_badges(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    badges = db.query(UserBadge).filter(UserBadge.user_id == current_user.id).all()
    return badges

@router.get("/certificates")
def get_user_certificates(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    certs = db.query(UserCertificate).filter(UserCertificate.user_id == current_user.id).all()
    return certs

@router.post("/generate-certificate")
def generate_course_certificate(
    course_title: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return GamificationService.generate_certificate(current_user, db, course_title)

@router.get("/leaderboard")
def get_leaderboard(db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.xp.desc()).limit(20).all()
    leaderboard = []
    for idx, u in enumerate(users, start=1):
        leaderboard.append({
            "rank": idx,
            "id": u.id,
            "name": u.full_name,
            "xp": u.xp,
            "level": u.level,
            "streak": u.streak_days,
        })
    return leaderboard
