import { Zap } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import type { Account, Deal } from '@/types';
import { getNextAction } from '@/hooks/useNextAction';

interface NextActionCardProps {
  account: Account;
  deal?: Deal;
  compact?: boolean;
}

export function NextActionCard({ account, deal, compact = false }: NextActionCardProps) {
  const { message, assignee, actions } = getNextAction(account, deal);

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium text-accent2">
          <Zap size={12} />
          Next Action — {assignee}
        </div>
        <p className="text-sm text-text leading-relaxed">{message}</p>
        <div className="flex gap-2">
          {actions.map((a) => (
            <Button key={a.label} variant={a.variant} size="sm">
              {a.label}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className="border-accent/30">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-accent/15">
          <Zap size={14} className="text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text">Next Action</h3>
          <span className="text-xs text-text2">Assigned to {assignee}</span>
        </div>
      </div>
      <p className="text-sm text-text leading-relaxed mb-4">{message}</p>
      <div className="flex gap-2">
        {actions.map((a) => (
          <Button key={a.label} variant={a.variant} size="sm">
            {a.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
