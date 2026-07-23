from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import User
from app.schemas.schemas import UserCreate, UserResponse, UserUpdate, Token
from app.services.auth_service import (
    verify_password,
    get_password_hash,
    create_access_token,
    get_current_user
)
from app.data.demo_seeder import seed_demo_data

from firebase_admin import auth as firebase_auth
from app.schemas.schemas import GoogleLoginRequest

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    
    hashed_pw = get_password_hash(user_in.password)
    user = User(
        email=user_in.email,
        hashed_password=hashed_pw,
        full_name=user_in.full_name,
        experience_level=user_in.experience_level,
        monthly_income_target=user_in.monthly_income_target or 3200.0
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/demo-login", response_model=Token)
def quick_demo_login(db: Session = Depends(get_db)):
    """Logs in directly as the auto-seeded demo account for instant exploration."""
    demo_user = seed_demo_data(db)
    access_token = create_access_token(data={"sub": demo_user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserResponse)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    return current_user


@router.put("/me", response_model=UserResponse)
def update_profile(
    user_in: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user_in.full_name is not None:
        current_user.full_name = user_in.full_name
    if user_in.experience_level is not None:
        current_user.experience_level = user_in.experience_level
    if user_in.monthly_income_target is not None:
        current_user.monthly_income_target = user_in.monthly_income_target
        
    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/google", response_model=Token)
def google_login(request: GoogleLoginRequest, db: Session = Depends(get_db)):
    print("\n======== GOOGLE LOGIN DEBUG ========")
    print("Received Request: POST /api/v1/auth/google")
    print(f"Request Body: token length={len(request.token)}")
    try:
        idinfo = firebase_auth.verify_id_token(request.token)
        print("Firebase Verification Result: SUCCESS")
        
        uid = idinfo.get("uid")
        email = idinfo.get("email")
        print(f"Decoded UID: {uid}")
        print(f"Decoded Email: {email}")
        
        if not email:
            print("Returning Response: 400 Invalid Google Token (no email)")
            raise HTTPException(status_code=400, detail="Invalid Google Token")
            
        user = db.query(User).filter(User.email == email).first()
        if not user:
            print("Database User Found?: NO. Creating new user.")
            user = User(
                email=email,
                hashed_password="oauth_dummy_password", # Bypass DB NOT NULL constraint
                full_name=idinfo.get("name", "Google User"),
                auth_provider="google"
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            print("Database User Found?: YES.")
            
        access_token = create_access_token(data={"sub": user.email})
        print("JWT Generated?: YES")
        print("Returning Response: 200 OK")
        print("===================================\n")
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        import traceback
        print("Firebase Verification Result: FAILED")
        print(f"Exception Type: {type(e)}")
        print(f"Exception Message: {str(e)}")
        traceback.print_exc()
        print("Returning Response: 401 Unauthorized")
        print("===================================\n")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Authentication error: {str(e)}")
