import { ScoreBar } from '@/components/shared/ScoreBar';
import type { Account } from '@/types';

interface ICPScoreCardProps {
  account: Account;
}

const criteriaLabels: Record<string, string> = {
  company_size: 'Company Size',
  modular_openness: 'Modular Openness',
  project_pipeline: 'Project Pipeline',
  geographic_fit: 'Geographic Fit',
  decision_authority: 'Decision Authority',
  timing_urgency: 'Timing & Urgency',
};

export function ICPScoreCard({ account }: ICPScoreCardProps) {
  const { icp_breakdown } = account;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text">ICP Score Breakdown</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-accent2">{account.icp_score}</span>
          <span className="text-xs text-text2">/ 100</span>
        </div>
      </div>
      <div className="space-y-3">
        {Object.entries(icp_breakdown).map(([key, value]) => (
          <ScoreBar
            key={key}
            label={criteriaLabels[key] || key}
            value={value}
          />
        ))}
      </div>
    </div>
  );
}
