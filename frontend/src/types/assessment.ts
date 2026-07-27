export type AssessmentDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type QuestionFormat =
  | 'mcq'
  | 'true_false'
  | 'fill_blank'
  | 'scenario'
  | 'calculator'
  | 'case_study';

export interface AssessmentOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface AssessmentQuestion {
  id: string;
  questionNumber: number;
  format: QuestionFormat;
  category: string;
  difficulty: AssessmentDifficulty;
  question: string;
  scenarioText?: string;
  options: AssessmentOption[];
  xpReward: number;
  hint: string;
  referenceLessonId?: string;
  referenceLessonTitle?: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: AssessmentDifficulty;
  totalQuestions: number;
  durationMinutes: number;
  passingScorePercentage: number;
  xpReward: number;
  coinsReward: number;
  hasCertificate: boolean;
  unlocked: boolean;
  userBestScorePercentage?: number;
  completedCount: number;
  questions: AssessmentQuestion[];
}

export interface AssessmentResult {
  assessmentId: string;
  assessmentTitle: string;
  scorePercentage: number;
  totalQuestions: number;
  correctCount: number;
  xpEarned: number;
  coinsEarned: number;
  passed: boolean;
  completedAt: string;
  newLevelUnlocked?: {
    level: number;
    title: string;
  };
  badgesUnlocked?: string[];
  strongTopics: string[];
  weakTopics: string[];
  recommendedLessonId: string;
  recommendedLessonTitle: string;
  userAnswers: Record<string, string>; // questionId -> selectedOptionId
}

export interface GamificationBadge {
  id: string;
  name: string;
  description: string;
  category: 'Streak' | 'Quiz' | 'Path' | 'Level' | 'Special';
  iconName: string;
  unlocked: boolean;
  unlockedDate?: string;
  requirementText: string;
  xpBonus: number;
}

export interface LevelInfo {
  level: number;
  title: string;
  currentXp: number;
  nextLevelXp: number;
  perks: string[];
}
