from typing import List
import logging
from app.config import settings
from app.schemas.schemas import (
    AIChatRequest,
    AIChatResponse,
    AIExplainConceptRequest,
    AIExplainConceptResponse,
    DashboardSummaryResponse
)

logger = logging.getLogger("finmentor_ai")

SYSTEM_PROMPT = """You are FinMentor AI, an expert personal finance educator and empathetic tutor designed for students, fresh graduates, and young professionals.
CRITICAL MANDATES:
1. STRICTLY EDUCATIONAL: Only explain financial concepts, terms, trade-offs, budgeting frameworks, and financial literacy.
2. NO RAW CALCULATIONS: Do not perform raw financial math or claim to execute calculations—point the user to the deterministic FinMentor backend charts and calculators.
3. CLEAR ELI5 LANGUAGE: Use relatable examples (coffee habits, rent splits, entry-level salaries, student loans) and avoid dry jargon.
4. ACTIONABLE HABITS: Always encourage consistent saving, emergency reserves, index investing, and building a strong credit score.
"""

# Try to initialize google-genai client if API key is provided
_gemini_client = None
try:
    if settings.GEMINI_API_KEY and len(settings.GEMINI_API_KEY.strip()) > 5:
        from google import genai
        _gemini_client = genai.Client(api_key=settings.GEMINI_API_KEY)
except Exception as e:
    logger.warning(f"Could not initialize Google Gemini SDK: {e}. Using Educational Fallback Simulator.")


def chat_with_mentor(request: AIChatRequest, experience_level: str = "student") -> AIChatResponse:
    if _gemini_client:
        try:
            prompt = f"{SYSTEM_PROMPT}\nUser Experience Level: {experience_level}\nUser Message: {request.message}"
            if request.context:
                prompt += f"\nAdditional Context: {request.context}"
            response = _gemini_client.models.generate_content(
                model='gemini-2.5-pro',
                contents=prompt
            )
            reply_text = response.text
            return AIChatResponse(
                reply=reply_text,
                suggested_questions=[
                    "What is the difference between an ETF and an individual stock?",
                    "How large should my emergency fund be?",
                    "How does compound interest work over 10 years?"
                ]
            )
        except Exception as e:
            logger.error(f"Gemini API error during chat: {e}")

    # High-quality Educational Simulator Fallback
    msg_lower = request.message.lower()
    if "etf" in msg_lower or "mutual fund" in msg_lower or "stock" in msg_lower or "invest" in msg_lower:
        reply = (
            "**Investing Simplified for Young Professionals:**\n\n"
            "An **ETF (Exchange-Traded Fund)** is like a basket of hundreds of different stocks bundled together. "
            "Instead of trying to guess which single company will win, you own a tiny slice of the entire market (like the S&P 500).\n\n"
            "• **Why ETFs?** Low fees (expense ratios often under 0.05%) and instant diversification.\n"
            "• **Mutual Funds:** Similar concept, but often actively managed with slightly higher fees and traded only once at the end of the market day.\n"
            "• **Golden Rule:** Before investing in stocks or ETFs, make sure you have at least 3 to 6 months of living expenses saved in a High-Yield Savings Account (HYSA)!"
        )
        questions = [
            "What is a High-Yield Savings Account (HYSA)?",
            "What is dollar-cost averaging?",
            "How do taxes work on ETF capital gains?"
        ]
    elif "budget" in msg_lower or "50/30/20" in msg_lower or "save" in msg_lower or "spending" in msg_lower:
        reply = (
            "**Mastering Your First Budget (The 50/30/20 Rule):**\n\n"
            "Budgeting isn't about restriction—it's about giving every dollar a job so you can spend on things you love without guilt.\n\n"
            "1. **50% Needs:** Essential rent, groceries, utilities, and transportation.\n"
            "2. **30% Wants:** Dining out, subscriptions, travel, and entertainment.\n"
            "3. **20% Future Savings:** Emergency fund, retirement accounts, and debt extra paydown.\n\n"
            "Check out your live **FinMentor 50/30/20 Analyzer** on the dashboard to see exactly how your current spending aligns!"
        )
        questions = [
            "How do I reduce my fixed 'Needs' expenses?",
            "Should I pay off student loans or invest first?",
            "What is zero-based budgeting?"
        ]
    elif "tax" in msg_lower or "credit" in msg_lower or "debt" in msg_lower:
        reply = (
            "**Understanding Credit & Debt Fundamentals:**\n\n"
            "Your **Credit Score** is essentially your financial reputation score (300 to 850). To build a rock-solid score early on:\n\n"
            "• **On-time payments:** Account for 35% of your score. Set up autopay for at least the minimum.\n"
            "• **Credit Utilization:** Keep your statement balance below 30% of your credit limit.\n"
            "• **Debt Payoff Strategies:** Try the **Avalanche Method** (pay highest interest rate first to save money) or the **Snowball Method** (pay smallest balance first for quick psychological momentum)."
        )
        questions = [
            "What is the difference between Avalanche vs Snowball debt payoff?",
            "How do tax brackets work?",
            "Should I close my oldest credit card?"
        ]
    else:
        reply = (
            "Hello! I am **FinMentor AI**, your dedicated personal finance learning assistant.\n\n"
            "I'm here to demystify any financial concept—whether you're curious about **budgeting frameworks**, **index funds**, **compound interest**, **taxes**, or building an **emergency fund**.\n\n"
            "All your transaction calculations and budget progress are handled deterministically by our financial engine. Ask me any question about personal finance to get started!"
        )
        questions = [
            "Explain the 50/30/20 budgeting rule with examples.",
            "What is compound interest and why start early?",
            "How do I start investing with just $50 a month?"
        ]

    return AIChatResponse(reply=reply, suggested_questions=questions)


def generate_spending_insights(dashboard_summary: DashboardSummaryResponse) -> List[dict]:
    """Generates structured educational insights based on backend computed metrics."""
    insights = []
    
    # Check Savings Rate
    rate = dashboard_summary.savings_rate_percentage
    if rate >= 20.0:
        insights.append({
            "type": "POSITIVE",
            "title": "Stellar Savings Momentum! 🚀",
            "description": f"You are saving {rate}% of your income this month—exceeding the recommended 20% benchmark. Consider allocating surplus funds to a low-cost S&P 500 index ETF."
        })
    elif rate > 0:
        insights.append({
            "type": "TIP",
            "title": "Building Your Savings Habit",
            "description": f"Your savings rate is {rate}%. Automating transfers on payday can help you steadily climb toward the 20% financial independence milestone."
        })
    else:
        insights.append({
            "type": "WARNING",
            "title": "Expenses Exceeding Income",
            "description": "Your net cash flow is currently negative. Review discretionary categories like Dining Out or Subscriptions to protect your emergency buffer."
        })

    # Check Top Expense Category
    if dashboard_summary.category_breakdown:
        top_cat = dashboard_summary.category_breakdown[0]
        insights.append({
            "type": "INSIGHT",
            "title": f"Top Spending Area: {top_cat.category}",
            "description": f"{top_cat.category} accounts for {top_cat.percentage}% (${top_cat.total_amount}) of your monthly spend. Tracking category trends helps you spot subscription creep early."
        })

    # Add Educational Concept Highlight
    insights.append({
        "type": "LEARN",
        "title": "Concept Focus: The Emergency Fund Rule",
        "description": "Financial planners advise keeping 3 to 6 months of essential living costs in a liquid High-Yield Savings Account before making aggressive market investments."
    })

    return insights


def explain_concept(request: AIExplainConceptRequest) -> AIExplainConceptResponse:
    c_lower = request.concept.lower()
    if "etf" in c_lower or "exchange" in c_lower:
        return AIExplainConceptResponse(
            concept="ETF (Exchange-Traded Fund)",
            simple_explanation="An ETF is a single fund you buy on the stock market that holds hundreds or thousands of different stocks inside it, giving you instant diversification without picking winners.",
            real_world_example="Imagine buying a fruit basket that contains apples, oranges, grapes, and bananas instead of betting your money on just one apple tree.",
            key_takeaway="ETFs are ideal for young professionals because they offer low fees and broad market exposure."
        )
    elif "compound" in c_lower or "interest" in c_lower:
        return AIExplainConceptResponse(
            concept="Compound Interest",
            simple_explanation="Compound interest is earning interest not just on your original money, but also on the accumulated interest from previous years—interest on interest.",
            real_world_example="Investing $200/month starting at age 22 at an average 8% return grows to over $700,000 by age 60, with over $600,000 of that being pure compound growth!",
            key_takeaway="Time in the market is your greatest superpower. Starting 5 years earlier can double your retirement nest egg."
        )
    elif "inflation" in c_lower:
        return AIExplainConceptResponse(
            concept="Inflation",
            simple_explanation="Inflation is the gradual decrease in purchasing power of money over time, meaning $100 buys fewer goods today than it did 10 years ago.",
            real_world_example="A cup of coffee that cost $2.50 ten years ago now costs $4.50 today due to the rising cost of goods and services.",
            key_takeaway="Keeping all your long-term savings in cash loses value to inflation; investing helps your wealth grow faster than inflation."
        )
    elif "liability" in c_lower or "asset" in c_lower:
        return AIExplainConceptResponse(
            concept="Assets vs. Liabilities",
            simple_explanation="An Asset puts money into your pocket or appreciates in value (stocks, rental real estate, high-yield cash). A Liability takes money out of your pocket (high-interest credit card debt, car loans).",
            real_world_example="Buying an index fund is acquiring an asset; carrying a 24% APR credit card balance is carrying a toxic liability.",
            key_takeaway="Focus your 20s and 30s on systematically buying income-generating assets while eliminating consumer liabilities."
        )
    else:
        return AIExplainConceptResponse(
            concept=request.concept,
            simple_explanation=f"{request.concept} is a fundamental personal finance concept that helps individuals organize their income, protect their capital, and build sustainable long-term financial health.",
            real_world_example=f"Applying sound principles of {request.concept} in everyday student life allows you to make confident decisions about spending and saving.",
            key_takeaway="Mastering financial literacy early gives you freedom, peace of mind, and optionality throughout your career."
        )
