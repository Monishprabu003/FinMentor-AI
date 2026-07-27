import os
import firebase_admin
from firebase_admin import credentials
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import engine, Base, SessionLocal
from app.routers import auth, transactions, budgets, savings, analytics, learn, ai, assessment, gamification, notifications
from app.data.demo_seeder import seed_demo_data

# Initialize Firebase Admin if credential exists
try:
    firebase_admin.get_app()
except ValueError:
    cred_path = os.getenv("FIREBASE_CREDENTIALS", "firebase-service-account.json")
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
    else:
        firebase_admin.initialize_app()

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(assessment.router, prefix=settings.API_V1_STR)
app.include_router(gamification.router, prefix=settings.API_V1_STR)
app.include_router(transactions.router, prefix=settings.API_V1_STR)
app.include_router(budgets.router, prefix=settings.API_V1_STR)
app.include_router(savings.router, prefix=settings.API_V1_STR)
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(learn.router, prefix=settings.API_V1_STR)
app.include_router(ai.router, prefix=settings.API_V1_STR)
app.include_router(notifications.router, prefix=settings.API_V1_STR)

@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    try:
        seed_demo_data(db)
    finally:
        db.close()

@app.get("/")
def root():
    return {
        "app": settings.PROJECT_NAME,
        "status": "ONLINE",
        "docs_url": "/docs",
        "api_v1_prefix": settings.API_V1_STR
    }

@app.get(f"{settings.API_V1_STR}/health")
def health_check():
    return {
        "status": "healthy",
        "engine": "deterministic-finance + gemini-educational",
        "database": "connected",
    }
