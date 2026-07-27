import type {
  AIConversation,
  AIPromptItem,
  AIRecommendation,
  AIInsight,
  AISettingsConfig,
} from '../types/ai';

export const MOCK_AI_SETTINGS: AISettingsConfig = {
  responseLength: 'Detailed',
  learningStyle: 'Practical & Examples',
  tone: 'Encouraging & Friendly',
  language: 'English',
  studyReminders: true,
};

export const MOCK_CONVERSATIONS: AIConversation[] = [
  {
    id: 'conv-1',
    title: '50/30/20 Salary Breakdown Strategy',
    lastMessage: 'Here is your personalized ₹75,000 monthly allocation sheet.',
    timestamp: '10 mins ago',
    pinned: true,
    category: 'Budgeting',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Can you help me break down my ₹75,000 net monthly salary using the 50/30/20 rule?',
        timestamp: '10:15 AM',
      },
      {
        id: 'msg-2',
        sender: 'ai',
        text: 'Certainly, Monish! Based on your profile and target of building an Emergency Reserve while investing in Nifty 50 Index Funds, here is your exact monthly allocation:',
        timestamp: '10:15 AM',
        tableData: {
          headers: ['Category', 'Percentage', 'Monthly Target', 'Recommended Destinations'],
          rows: [
            ['Needs (Essential)', '50%', '₹37,500', 'Rent, Groceries, Utilities, Minimum EMI'],
            ['Wants (Lifestyle)', '30%', '₹22,500', 'Dining out, Netflix, Shopping, Weekend Trips'],
            ['Wealth (Automated)', '20%', '₹15,000', '₹10,000 SIP Index Fund + ₹5,000 Emergency Fund'],
          ],
        },
        formulaCode: 'Needs = ₹75,000 * 0.50 = ₹37,500\nWants = ₹75,000 * 0.30 = ₹22,500\nWealth = ₹75,000 * 0.20 = ₹15,000',
        followUpPrompts: [
          'How do I automate the ₹15,000 transfer on payday?',
          'What if my rent takes up 55% of my salary?',
          'Generate a 5-year wealth compounding projection',
        ],
      },
    ],
  },
  {
    id: 'conv-2',
    title: 'SIP Compounding vs FD Returns Comparison',
    lastMessage: 'At 12% CAGR vs 6.5% FD, SIP creates 3.2x more wealth over 15 years.',
    timestamp: 'Yesterday',
    pinned: true,
    category: 'Investing',
    messages: [
      {
        id: 'msg-3',
        sender: 'user',
        text: 'Should I invest ₹10,000 monthly in a Bank Fixed Deposit or a Nifty 50 Index SIP?',
        timestamp: 'Yesterday 4:30 PM',
      },
      {
        id: 'msg-4',
        sender: 'ai',
        text: 'Let us analyze both options objectively over a 15-year horizon assuming ₹10,000 monthly contribution:',
        timestamp: 'Yesterday 4:30 PM',
        tableData: {
          headers: ['Parameter', 'Fixed Deposit (FD)', 'Nifty 50 Index SIP'],
          rows: [
            ['Expected Return (CAGR)', '6.5% p.a.', '12.0% p.a. (Historical)'],
            ['Total Invested (15 Yrs)', '₹18,000,000', '₹18,000,000'],
            ['Maturity Corpus', '₹29,80,000', '₹50,45,000'],
            ['Inflation Net Impact', 'Barely beats inflation', 'Generates real wealth surplus'],
          ],
        },
        followUpPrompts: [
          'Explain the risk associated with equity Index Funds',
          'Which mutual funds are best for beginners?',
        ],
      },
    ],
  },
];

export const MOCK_PROMPT_LIBRARY: AIPromptItem[] = [
  {
    id: 'p-1',
    title: '50/30/20 Salary Breakdown',
    description: 'Calculate your exact Needs, Wants, and Wealth targets based on your net salary.',
    category: 'Budgeting',
    promptText: 'Break down my monthly net income using the 50/30/20 rule and suggest automated accounts.',
    popularCount: 1420,
  },
  {
    id: 'p-2',
    title: 'SIP vs Fixed Deposit Comparison',
    description: 'Compare compounding returns, tax impacts, and liquidity between SIPs and FDs.',
    category: 'Investing',
    promptText: 'Compare monthly SIP in Nifty 50 vs Bank Fixed Deposit over a 10-year period with calculations.',
    popularCount: 2310,
  },
  {
    id: 'p-3',
    title: 'Old vs New Tax Regime Analyzer',
    description: 'Determine which tax regime saves you maximum tax based on your salary deductions.',
    category: 'Taxes',
    promptText: 'Analyze Old vs New Tax regime for my salary slab and calculate 80C & 80D savings.',
    popularCount: 1890,
  },
  {
    id: 'p-4',
    title: 'Emergency Fund Calculation',
    description: 'Determine how much liquid cash buffer you need based on fixed monthly obligations.',
    category: 'Calculations',
    promptText: 'Calculate my recommended 6-month emergency reserve and suggest high-yield liquid funds.',
    popularCount: 950,
  },
];

export const MOCK_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: 'rec-1',
    type: 'Lesson',
    title: 'Lesson 4: Automating Monthly Cash Flows',
    description: 'You scored 65% on Budgeting. Review Lesson 4 before taking tomorrow\'s exam.',
    reason: 'Targeted weakness diagnostic',
    targetUrl: '/dashboard/learning/course/course-1/lesson/l4',
    gradient: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'rec-2',
    type: 'Assessment',
    title: 'Mutual Funds & Indexing Diagnostic',
    description: 'Ready to test your knowledge on expense ratios and CAGR compounding?',
    reason: '88% course progress achieved',
    targetUrl: '/dashboard/learning/assessment/asm-2',
    gradient: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'rec-3',
    type: 'Book',
    title: 'The Psychology of Money Summary',
    description: 'Read Chapter 4 on "Reasonable > Rational" money decisions.',
    reason: 'Complements your active path',
    targetUrl: '/dashboard/learning/library',
    gradient: 'from-purple-600 to-indigo-800',
  },
];

export const MOCK_AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ins-1',
    title: 'Quiz Accuracy Improved by +18%',
    description: 'Your scores in Budgeting & Emergency Fund assessments have increased significantly.',
    category: 'Improvement',
    metric: '+18% Accuracy',
    date: 'July 26, 2026',
  },
  {
    id: 'ins-2',
    title: 'Weak Concept Alert: Asset Rebalancing',
    description: 'Our diagnostic noticed 2 missed questions regarding portfolio rebalancing.',
    category: 'Weakness',
    metric: 'Needs Practice',
    date: 'July 27, 2026',
  },
  {
    id: 'ins-[3]',
    title: '14-Day Learning Streak Active',
    description: 'Top 5% learner consistency nationwide. Keep learning to hit 30 days!',
    category: 'Streak',
    metric: '🔥 14 Days',
    date: 'Today',
  },
];
