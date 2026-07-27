import React from 'react';
import { FileText } from 'lucide-react';
import { ComingSoonPage } from '../../components/dashboard/ComingSoonPage';

export const ReportsPage: React.FC = () => (
  <ComingSoonPage
    title="Reports"
    description="Monthly and yearly financial summaries with AI-written commentary, charts, and exportable PDFs for your records."
    icon={FileText}
    gradientFrom="#64748b"
    gradientTo="#3b82f6"
  />
);
