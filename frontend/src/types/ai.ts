export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  bookmarked?: boolean;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  formulaCode?: string;
  followUpPrompts?: string[];
}

export interface AIConversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  pinned: boolean;
  category: 'Budgeting' | 'Investing' | 'Taxes' | 'General' | 'Quiz Preparation';
  messages: AIMessage[];
}

export interface AIPromptItem {
  id: string;
  title: string;
  description: string;
  category: 'Budgeting' | 'Investing' | 'Taxes' | 'Calculations' | 'Career & Income' | 'FIRE Movement';
  promptText: string;
  popularCount: number;
}

export interface AIRecommendation {
  id: string;
  type: 'Lesson' | 'Book' | 'Quiz' | 'Path' | 'Assessment' | 'Action';
  title: string;
  description: string;
  reason: string;
  targetUrl: string;
  gradient: string;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  category: 'Improvement' | 'Weakness' | 'Strength' | 'Streak';
  metric: string;
  date: string;
}

export interface AISettingsConfig {
  responseLength: 'Concise' | 'Detailed' | 'Comprehensive';
  learningStyle: 'Practical & Examples' | 'Theoretical & Equations' | 'Balanced';
  tone: 'Encouraging & Friendly' | 'Professional & Direct' | 'Socratic Coach';
  language: 'English' | 'Hinglish' | 'Hindi';
  studyReminders: boolean;
}
