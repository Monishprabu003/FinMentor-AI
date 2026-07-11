# FinMentor – AI-Powered Personal Finance & Learning Platform

**FinMentor** is a modern, production-ready AI-powered personal finance learning and money management platform built specifically for students, fresh graduates, and young professionals.

Unlike traditional budget trackers that assume existing financial knowledge, FinMentor combines robust backend financial tracking and deterministic calculations with an interactive **Google Gemini AI Educational Tutor**, a structured **Financial Learning Center**, and a curated **Finance Book Library** with student-focused action plans.

---

## Architecture & Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Recharts, Framer Motion transitions.
- **Backend**: FastAPI (Python 3.11), SQLAlchemy 2.0 ORM, Pydantic v2, Alembic, PyJWT Authentication.
- **Database**: Dual-engine support:
  - **SQLite (`finmentor.db`)** by default for instant zero-configuration local execution.
  - **PostgreSQL 16** configured for Docker Compose and production deployments.
- **AI Engine**: Google Gemini API (`google-genai` SDK) with a built-in interactive educational simulation fallback when no API key is set.

---

## Core Features & Modules

1. **High-Converting Landing Page**:
   - Interactive financial literacy preview widget.
   - One-click **Instant Demo Login** (`demo@finmentor.ai`) populated with realistic student & graduate financial data.
2. **Executive Financial Dashboard**:
   - Real-time Net Worth & Health Score calculation.
   - Interactive Recharts cash flow (Income vs. Expense) visualization.
   - Budget utilization gauges and AI Spending Insights.
3. **Income & Expense Ledger**:
   - Searchable, filterable transaction table with category tags, date ranges, and full CRUD modals.
4. **Budget Manager & 50/30/20 Planner**:
   - Visual category budget health bars with automated alert triggers.
   - Smart 50% Needs / 30% Wants / 20% Savings allocation analyzer.
5. **Savings Goal Planner**:
   - Milestone tracking (Emergency Fund, Student Loan Payoff, First Car, Starter Investment) with monthly required savings calculation.
6. **Financial Learning Center (Academy)**:
   - Interactive curriculum covering Budgeting 101, Emergency Funds, Stocks & ETFs, Asset vs. Liability, and Young Professional Taxes.
7. **Finance Book Library**:
   - Summaries and checklists from foundational personal finance classics (*The Psychology of Money*, *I Will Teach You To Be Rich*, *Bogleheads' Guide*, etc.).
8. **FinMentor AI Studio**:
   - Interactive AI Financial Tutor explaining concepts clearly without giving risky financial advice.
   - AI Spending Analyzer interpreting computed backend metrics.

---

## Running Locally (Zero Configuration)

### Option 1: Local Development Servers (Recommended for rapid testing)

#### 1. Backend (FastAPI + SQLite out-of-the-box)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 -m uvicorn app.main:app --reload --port 8000
```
- API Docs available at: `http://localhost:8000/docs`

#### 2. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
- App available at: `http://localhost:5173`

---

### Option 2: Docker Compose (Full Stack with PostgreSQL)

```bash
docker-compose up --build
```
- Frontend available at: `http://localhost:3000`
- Backend API Docs at: `http://localhost:8000/docs`

---

## Important AI Principles
- **Strict Educational Boundary**: The AI is programmed solely to explain financial concepts, terms, and habits.
- **Deterministic Math**: All financial metrics, cash flows, budget utilization, and savings projections are computed by the FastAPI backend engine.
