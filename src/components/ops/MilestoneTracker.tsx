import { Check, Clock, AlertTriangle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/shared/Badge';
import type { Milestone } from '@/types';

interface MilestoneTrackerProps {
  milestones: Milestone[];
}

const statusConfig: Record<string, { variant: 'green' | 'blue' | 'yellow' | 'red'; icon: typeof Check }> = {
  complete: { variant: 'green', icon: Check },
  'on-track': { variant: 'blue', icon: Clock },
  'at-risk': { variant: 'yellow', icon: AlertTriangle },
  overdue: { variant: 'red', icon: AlertCircle },
};

export function MilestoneTracker({ milestones }: MilestoneTrackerProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text">Critical Path</h3>
      <div className="space-y-1">
        {milestones.map((m, i) => {
          const config = statusConfig[m.status];
          const Icon = config.icon;
          const isLast = i === milestones.length - 1;

          return (
            <div key={m.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center h-6 w-6 rounded-full ${
                  m.status === 'complete' ? 'bg-green/15' : 'bg-surface2'
                }`}>
                  <Icon size={12} className={`text-${config.variant}`} />
                </div>
                {!isLast && <div className="w-0.5 h-6 bg-border" />}
              </div>
              <div className="flex items-center justify-between flex-1 pb-4">
                <div>
                  <div className="text-sm text-text">{m.name}</div>
                  <div className="text-xs text-text2">{m.date}</div>
                </div>
                <Badge variant={config.variant}>{m.status}</Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
