export type CourseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface TOCHeading {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface PracticeOption {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: PracticeOption[];
  xpReward: number;
}

export interface InteractiveCalculatorConfig {
  type: '50-30-20' | 'SIP' | 'EmergencyFund';
  defaultIncome?: number;
  title: string;
  description: string;
}

export interface DetailedLesson {
  id: string;
  moduleId: string;
  moduleTitle: string;
  lessonNumber: number;
  totalLessonsInCourse: number;
  title: string;
  subtitle: string;
  readingTimeMinutes: number;
  difficulty: CourseDifficulty;
  xpReward: number;
  completionPercentage: number;
  completed: boolean;
  bookmarked: boolean;
  tableOfContents: TOCHeading[];
  leadParagraph: string;
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    callout?: {
      type: 'tip' | 'warning' | 'info' | 'formula';
      title: string;
      text: string;
      formulaCode?: string;
    };
  }[];
  calculatorConfig?: InteractiveCalculatorConfig;
  keyTakeaways: string[];
  practiceQuestions: PracticeQuestion[];
  discussionCount: number;
}

export interface CourseModuleItem {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  lessons: {
    id: string;
    title: string;
    durationMinutes: number;
    completed: boolean;
    type: 'lesson' | 'quiz' | 'calculator';
  }[];
}

export interface Instructor {
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
  rating: number;
  studentsTaught: number;
  coursesCount: number;
}

export interface ReviewItem {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
}

export interface FullCourse {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  whyItMatters: string;
  category: string;
  difficulty: CourseDifficulty;
  durationHours: number;
  lessonsCount: number;
  xpReward: number;
  hasCertificate: boolean;
  studentsEnrolled: number;
  rating: number;
  ratingCount: number;
  progressPercentage: number;
  bookmarked: boolean;
  isFavorite: boolean;
  thumbnailGradient: string;
  iconName: string;
  prerequisites: string[];
  targetAudience: string[];
  skillsGained: string[];
  modules: CourseModuleItem[];
  instructor: Instructor;
  reviews: ReviewItem[];
}
