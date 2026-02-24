import { Badge } from '@/components/shared/Badge';
import { StatusDot } from '@/components/shared/StatusDot';
import type { Account } from '@/types';

interface ProjectCardProps {
  account: Account;
  isSelected: boolean;
  onClick: () => void;
}

function getStageStatus(stage: string): 'active' | 'pending' | 'blocked' | 'complete' {
  switch (stage) {
    case 'call_ready': return 'active';
    case 'enriched': return 'pending';
    case 'enrichment_needed': return 'warning' as 'pending';
    default: return 'pending';
  }
}

function getStageLabel(stage: string): string {
  switch (stage) {
    case 'call_ready': return 'Call Ready';
    case 'enriched': return 'Enriched';
    case 'enrichment_needed': return 'Needs Enrichment';
    default: return stage;
  }
}

export function ProjectCard({ account, isSelected, onClick }: ProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
        isSelected
          ? 'bg-accent/10 border border-accent/30'
          : 'hover:bg-surface2 border border-transparent'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <StatusDot status={getStageStatus(account.stage)} />
            <span className="text-sm font-medium text-text truncate">{account.company_name}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 ml-4">
            <Badge variant={account.tier === 1 ? 'blue' : 'default'} size="sm">
              T{account.tier}
            </Badge>
            <span className="text-xs text-text2">{getStageLabel(account.stage)}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-sm font-semibold text-accent2">{account.icp_score}</div>
          <div className="text-[10px] text-text2">ICP</div>
        </div>
      </div>
    </button>
  );
}
