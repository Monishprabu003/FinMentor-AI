import React from 'react';
import { Trophy } from 'lucide-react';
import { ComingSoonPage } from '../../components/dashboard/ComingSoonPage';

export const AchievementsPage: React.FC = () => (
  <ComingSoonPage
    title="Achievements"
    description="Earn badges for financial milestones — first budget, week-long streak, goal completed, and more. Level up your financial journey."
    icon={Trophy}
    gradientFrom="#f59e0b"
    gradientTo="#f97316"
  />
);
