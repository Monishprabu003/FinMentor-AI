from sqlalchemy import create_engine, text
from app.config import settings

engine = create_engine(settings.DATABASE_URL)

alter_statements = [
    "ALTER TABLE users ADD COLUMN assessment_completed BOOLEAN DEFAULT FALSE;",
    "ALTER TABLE users ADD COLUMN financial_score INTEGER;",
    "ALTER TABLE users ADD COLUMN knowledge_level VARCHAR;",
    "ALTER TABLE users ADD COLUMN financial_persona VARCHAR;",
    "ALTER TABLE users ADD COLUMN risk_profile VARCHAR;",
    "ALTER TABLE users ADD COLUMN monthly_income FLOAT;",
    "ALTER TABLE users ADD COLUMN monthly_expenses FLOAT;",
    "ALTER TABLE users ADD COLUMN financial_goals JSON;",
    "ALTER TABLE users ADD COLUMN assessment_answers JSON;",
    "ALTER TABLE users ADD COLUMN auth_provider VARCHAR DEFAULT 'local';",
    # Note: SQLite doesn't easily support ALTER COLUMN to drop NOT NULL, 
    # but existing null inserts might just fail if strict mode is on. 
    # Since it's SQLite, we will rely on SQLAlchemy not inserting it, 
    # and if it fails, we can just supply a dummy password.
]

with engine.connect() as conn:
    for stmt in alter_statements:
        try:
            conn.execute(text(stmt))
            conn.commit()
            print(f"Executed: {stmt}")
        except Exception as e:
            print(f"Failed or already exists: {stmt} -> {e}")
            conn.rollback()

print("Database migration complete.")
