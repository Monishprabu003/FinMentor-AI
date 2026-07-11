export interface User {
  id: number;
  email: string;
  full_name: string;
  experience_level: 'student' | 'graduate' | 'professional';
  monthly_income_target: number;
  created_at: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  title: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  date: string;
  notes?: string;
  created_at: string;
}

export interface Budget {
  id: number;
  user_id: number;
  category: string;
  monthly_limit: number;
  alert_threshold: number;
  spent_amount: number;
  remaining_amount: number;
  percent_used: number;
  status: 'OK' | 'WARNING' | 'OVER_BUDGET';
}

export interface SavingsGoal {
  id: number;
  user_id: number;
  name: string;
  target_amount: number;
  current_amount: number;
  target_date?: string;
  category: string;
  progress_percentage: number;
  monthly_savings_required?: number;
}

export interface CategoryExpenseSummary {
  category: string;
  total_amount: number;
  percentage: number;
}

export interface MonthlyCashFlow {
  month: string;
  income: number;
  expense: number;
  net_savings: number;
}

export interface BudgetAnalyzer503020 {
  needs_spent: number;
  needs_target: number;
  wants_spent: number;
  wants_target: number;
  savings_spent: number;
  savings_target: number;
  recommendation: string;
}

export interface DashboardSummary {
  total_income_this_month: number;
  total_expense_this_month: number;
  net_savings_this_month: number;
  savings_rate_percentage: number;
  estimated_net_worth: number;
  category_breakdown: CategoryExpenseSummary[];
  monthly_cash_flow: MonthlyCashFlow[];
  budget_analyzer: BudgetAnalyzer503020;
}

export interface LearningModule {
  id: string;
  title: string;
  category: string;
  level: string;
  duration_minutes: number;
  summary: string;
  content: string;
  takeaways: string[];
  completed?: boolean;
}

export interface FinanceBook {
  id: string;
  title: string;
  author: string;
  cover_color: string;
  difficulty: string;
  tagline: string;
  summary: string;
  key_takeaways: string[];
  action_checklist: string[];
}

export interface SpendingInsight {
  type: 'POSITIVE' | 'TIP' | 'WARNING' | 'INSIGHT' | 'LEARN';
  title: string;
  description: string;
}

export interface ConceptExplanation {
  concept: string;
  simple_explanation: string;
  real_world_example: string;
  key_takeaway: string;
}
