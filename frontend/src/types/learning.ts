export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type CategoryType =
  | 'Budgeting'
  | 'Saving'
  | 'Investing'
  | 'Taxes'
  | 'Insurance'
  | 'Mutual Funds'
  | 'Stock Market'
  | 'Financial Psychology'
  | 'Entrepreneurship'
  | 'Passive Income'
  | 'Financial Planning';

export interface MilestoneNode {
  id: string;
  title: string;
  durationMinutes: number;
  completed: boolean;
  type: 'lesson' | 'quiz' | 'project' | 'checkpoint';
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  iconName: string;
  difficulty: DifficultyLevel;
  completionPercentage: number;
  durationHours: number;
  lessonsCount: number;
  coursesCount: number;
  hasCertificate: boolean;
  unlocked: boolean;
  category: CategoryType;
  gradient: string;
  milestones: MilestoneNode[];
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  completed: boolean;
  videoUrl?: string;
  summary: string;
  keyTakeaways: string[];
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  difficulty: DifficultyLevel;
  durationHours: number;
  lessonsCount: number;
  studentsEnrolled: number;
  rating: number;
  progressPercentage: number;
  bookmarked: boolean;
  thumbnailGradient: string;
  iconName: string;
  modules: CourseModule[];
}

export interface ResourceItem {
  id: string;
  title: string;
  authorOrSource: string;
  type: 'Book' | 'Article' | 'Paper' | 'Guide' | 'Calculator' | 'Template' | 'PDF';
  difficulty: DifficultyLevel;
  readingTimeMinutes: number;
  coverGradient: string;
  summary: string;
  bookmarked: boolean;
  downloadUrl?: string;
  tagline?: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  coinReward: number;
  completed: boolean;
  category: CategoryType;
  expiresInHours: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedDate?: string;
  category: string;
}

export interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  credentialId: string;
  pathId: string;
  skillsVerified: string[];
  pdfUrl?: string;
}

export interface HeatmapDay {
  date: string;
  count: number; // number of lessons/quizzes done
  intensity: 0 | 1 | 2 | 3 | 4;
}

export interface LearningUserStats {
  level: number;
  levelTitle: string;
  currentXp: number;
  nextLevelXp: number;
  streakDays: number;
  coursesCompleted: number;
  certificatesEarned: number;
  hoursLearned: number;
  quizAccuracyPercentage: number;
  todayGoalMinutes: number;
  todayCompletedMinutes: number;
  strongTopics: string[];
  weakTopics: string[];
  heatmap: HeatmapDay[];
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatarUrl?: string;
  xp: number;
  streak: number;
  badgesCount: number;
  isCurrentUser?: boolean;
}
