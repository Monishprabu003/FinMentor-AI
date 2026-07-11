from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import User, LearningProgress
from app.schemas.schemas import LearningProgressCreate, LearningProgressResponse
from app.services.auth_service import get_current_user
from app.data.learning_content import LEARNING_MODULES, FINANCE_BOOKS

router = APIRouter(prefix="/learn", tags=["Learning Center & Books Library"])

@router.get("/modules")
def get_learning_modules(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    completed_records = db.query(LearningProgress).filter(
        LearningProgress.user_id == current_user.id
    ).all()
    completed_map = {rec.module_id: rec.completed for rec in completed_records}

    modules_with_status = []
    for m in LEARNING_MODULES:
        modules_with_status.append({
            **m,
            "completed": completed_map.get(m["id"], False)
        })
    return modules_with_status


@router.post("/modules/complete", response_model=LearningProgressResponse)
def mark_module_completed(
    payload: LearningProgressCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    progress = db.query(LearningProgress).filter(
        LearningProgress.user_id == current_user.id,
        LearningProgress.module_id == payload.module_id
    ).first()

    if progress:
        progress.completed = True
        progress.score = payload.score
    else:
        progress = LearningProgress(
            user_id=current_user.id,
            module_id=payload.module_id,
            completed=True,
            score=payload.score
        )
        db.add(progress)

    db.commit()
    db.refresh(progress)
    return progress


@router.get("/books")
def get_finance_books():
    return FINANCE_BOOKS
