from typing import List, Dict

LEARNING_MODULES = [
    {
        "id": "mod_budget_101",
        "title": "Budgeting 101: The 50/30/20 Rule",
        "category": "Budgeting",
        "level": "Beginner",
        "duration_minutes": 8,
        "summary": "Master the world's most effective and flexible budgeting framework designed for young adults.",
        "content": """
### Why Traditional Budgets Fail
Most young professionals abandon traditional budgets because they try to track every penny with rigid spreadsheet rules. Real life has unexpected outings, birthday dinners, and shifting expenses.

### Enter the 50/30/20 Rule
Popularized by Senator Elizabeth Warren in *All Your Worth*, the 50/30/20 rule divides your after-tax net income into three simple buckets:

1. **50% Needs (Non-Negotiables)**
   - Housing (Rent & Utilities)
   - Groceries & Basic Household Supplies
   - Transportation (Public transit pass, car payment/gas)
   - Minimum Debt & Insurance Payments

2. **30% Wants (Lifestyle & Enjoyment)**
   - Dining out & Coffee runs
   - Subscriptions (Spotify, Netflix, Gym)
   - Travel & Concert tickets
   - Hobby purchases

3. **20% Financial Future (Wealth Building)**
   - Emergency Fund contributions
   - Investing in low-cost index ETFs (Roth IRA / 401k)
   - Extra debt principal paydown

### Pro Student Tip
If you live in a high-cost city where rent takes more than 50%, don't panic! Adjust your Wants bucket downward to protect your 20% future savings bucket.
        """,
        "takeaways": [
            "Needs = 50%, Wants = 30%, Future Savings & Investing = 20%",
            "Automate your 20% savings transfer on payday so you pay your future self first",
            "Flexibility is key—budgeting is about freedom and intentionality, not guilt"
        ]
    },
    {
        "id": "mod_emergency_fund",
        "title": "Emergency Funds: Your Financial Safety Net",
        "category": "Savings & Safety",
        "level": "Beginner",
        "duration_minutes": 6,
        "summary": "Learn how much cash buffer you need before investing in stocks or paying extra on low-interest loans.",
        "content": """
### What is an Emergency Fund?
An emergency fund is dedicated cash kept in a safe, liquid account designed exclusively for true unexpected financial shocks—such as sudden medical bills, unexpected laptop repair during finals, or job transitions.

### How Much Should You Save?
- **Starter Buffer:** Aim for **$1,000** immediately while paying off high-interest credit cards.
- **Full Safety Net:** Aim for **3 to 6 months of essential living expenses** (your 'Needs' bucket).

### Where Should You Keep It?
Never keep your emergency fund in a regular checking account (where it earns 0.01% interest and is easily spent on impulse). Keep it in a **High-Yield Savings Account (HYSA)** currently yielding 4% to 5% APY with FDIC insurance.
        """,
        "takeaways": [
            "Start with a $1,000 starter emergency fund immediately",
            "Build toward 3–6 months of essential 'Needs' before aggressive stock investing",
            "Keep emergency reserves in an FDIC-insured High-Yield Savings Account (HYSA)"
        ]
    },
    {
        "id": "mod_investing_etfs",
        "title": "Investing 101: Stocks, Index Funds & ETFs",
        "category": "Investing",
        "level": "Intermediate",
        "duration_minutes": 10,
        "summary": "Demystify the stock market and discover how index ETFs let you build wealth effortlessly.",
        "content": """
### Stocks vs. Index Funds vs. ETFs
- **Individual Stock:** Buying a single share means owning a tiny piece of one company (e.g., Apple or Nvidia). If that company struggles, your investment drops.
- **Index Fund / ETF:** An Exchange-Traded Fund (ETF) is a basket that buys hundreds of top companies at once. When you buy one share of an S&P 500 ETF (like VOO or IVV), you instantly own a fraction of America's 500 largest profitable companies.

### The Power of Compound Interest
Albert Einstein famously called compound interest the 'eighth wonder of the world.' When your investments earn returns, those returns start earning their own returns year after year.

### The Golden Rule of Young Investing
Don't try to time the market or pick meme stocks. Practice **Dollar-Cost Averaging (DCA)**—investing a consistent amount every month regardless of stock market headlines.
        """,
        "takeaways": [
            "Index ETFs offer instant diversification across hundreds of companies at very low cost",
            "Time in the market beats timing the market every time",
            "Compound interest grows exponentially over decades—starting at age 22 is a massive advantage"
        ]
    },
    {
        "id": "mod_assets_liabilities",
        "title": "Assets vs. Liabilities & Beating Inflation",
        "category": "Wealth Building",
        "level": "Intermediate",
        "duration_minutes": 7,
        "summary": "Understand true net worth and why holding only cash is guaranteed to lose purchasing power over time.",
        "content": """
### Robert Kiyosaki's Simple Definition
- **Asset:** Anything that puts money *into* your pocket or appreciates over time (Index ETFs, dividend stocks, rental properties, certificates of deposit).
- **Liability:** Anything that takes money *out* of your pocket or depreciates rapidly (24% APR credit card balances, high car payments, unused subscriptions).

### The Invisible Thief: Inflation
If inflation averages 3% per year, $1,000 kept under your mattress will only have the purchasing power of roughly $740 ten years from now. Investing in productive assets protects and grows your real buying power.
        """,
        "takeaways": [
            "Net Worth = Total Assets minus Total Liabilities",
            "Prioritize acquiring income-generating assets early in your career",
            "Cash is essential for emergencies, but long-term wealth requires investing to outpace inflation"
        ]
    },
    {
        "id": "mod_taxes_credit",
        "title": "Taxes & Credit Scores Made Simple",
        "category": "Taxes & Credit",
        "level": "Student & Graduate",
        "duration_minutes": 9,
        "summary": "Navigate progressive tax brackets without fear and build an elite 780+ credit score from scratch.",
        "content": """
### Progressive Tax Brackets Explained
A common myth is: 'If I get a raise into a higher tax bracket, I'll take home less money.' This is **false**! Tax brackets are marginal—only the dollars above the bracket threshold are taxed at the higher percentage.

### Building a 750+ Credit Score
1. **Payment History (35%):** Always pay your statement balance on time, 100% of the time. Set up autopay!
2. **Credit Utilization (30%):** Keep statement balances under 30% (ideally under 10%) of your total credit limit.
3. **Length of History (15%):** Keep your oldest no-annual-fee student card open forever.
        """,
        "takeaways": [
            "Tax brackets are marginal—earning more money always leaves you with more take-home pay",
            "Set up autopay for statement balances to ensure 100% on-time payment history",
            "Keep credit utilization below 30% to maximize your FICO score"
        ]
    }
]


FINANCE_BOOKS = [
    {
        "id": "book_psychology_of_money",
        "title": "The Psychology of Money",
        "author": "Morgan Housel",
        "cover_color": "emerald",
        "difficulty": "Beginner Friendly",
        "tagline": "Timeless lessons on wealth, greed, and happiness.",
        "summary": "Doing well with money isn't necessarily about what you know. It's about how you behave. Morgan Housel shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of life's most important financial topics.",
        "key_takeaways": [
            "Wealth is what you don't see—it's the cars not purchased and watches not worn.",
            "Getting wealthy requires risk and optimism; staying wealthy requires humility and frugality.",
            "Compounding works miracles when left uninterrupted for decades."
        ],
        "action_checklist": [
            "Define your personal 'Enough' so you don't keep moving the financial goalposts",
            "Keep an emergency buffer to protect your long-term investments from forced selling",
            "Focus on high savings rate rather than chasing high-risk speculative investments"
        ]
    },
    {
        "id": "book_i_will_teach_you",
        "title": "I Will Teach You To Be Rich",
        "author": "Ramit Sethi",
        "cover_color": "cyan",
        "difficulty": "Beginner / Actionable",
        "tagline": "No guilt, no excuses, just a 6-week program that works.",
        "summary": "Ramit Sethi outlines a practical, automated money system for young adults. Instead of penny-pinching on lattes, he teaches you how to negotiate salary raises, eliminate credit card debt, and build an automated financial machine.",
        "key_takeaways": [
            "Spend extravagantly on the things you love, and cut mercilessly on the things you don't.",
            "Automate your money flow: Paycheck -> 401k -> Checking -> Automatic Savings & Investments.",
            "Investing should be boring and hands-off using low-cost index funds."
        ],
        "action_checklist": [
            "Open a no-fee High-Yield Savings Account and automate monthly deposits",
            "Call your credit card provider to request a fee waiver or lower APR",
            "Set up automatic monthly transfers into an index ETF or retirement account"
        ]
    },
    {
        "id": "book_bogleheads_guide",
        "title": "The Bogleheads' Guide to Investing",
        "author": "Taylor Larimore & Mel Lindauer",
        "cover_color": "blue",
        "difficulty": "Intermediate",
        "tagline": "Common sense investing inspired by Vanguard founder John Bogle.",
        "summary": "A definitive guide to simple, sensible index fund investing. By cutting investment fees, avoiding stock picking, and diversifying globally across total market index funds, everyday investors can outperform 85% of Wall Street fund managers.",
        "key_takeaways": [
            "Keep investment costs and management fees as close to zero as possible.",
            "Buy and hold a simple 3-fund portfolio (Total US Stock Market, Total International Stock Market, Total Bond Market).",
            "Stay the course during market volatility—never sell out of panic."
        ],
        "action_checklist": [
            "Check the Expense Ratio of any fund before investing (aim for < 0.08%)",
            "Set up a recurring monthly investment into a Total Stock Market ETF",
            "Rebalance once per year to maintain your target risk allocation"
        ]
    },
    {
        "id": "book_simple_path_to_wealth",
        "title": "The Simple Path to Wealth",
        "author": "JL Collins",
        "cover_color": "violet",
        "difficulty": "Beginner Friendly",
        "tagline": "Your roadmap to financial independence and a rich, free life.",
        "summary": "Originally written as letters to the author's daughter, this classic explains how financial independence gives you 'F-You Money'—the freedom to walk away from bad jobs or stressful situations.",
        "key_takeaways": [
            "Avoid consumer debt like the plague.",
            "Save 50% of your income if you want to achieve financial independence early.",
            "Vanguard's VTSAX / VTI (Total Stock Market Index) is the foundational wealth engine."
        ],
        "action_checklist": [
            "Calculate your Financial Independence number (Annual Expenses x 25)",
            "Pay off any consumer debt charging more than 5% interest",
            "Invest consistently in low-cost total market equity funds"
        ]
    }
]
