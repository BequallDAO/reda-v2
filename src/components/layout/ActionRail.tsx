import { Activity, Zap } from 'lucide-react';
import { NextActionCard } from '@/components/shared/NextActionCard';
import { Card } from '@/components/shared/Card';
import type { Account } from '@/types';
import { mockSignals } from '@/data/mockAccounts';

interface ActionRailProps {
  account: Account | null;
}

export function ActionRail({ account }: ActionRailProps) {
  const recentSignals = account
    ? mockSignals.filter((s) => s.accountId === account.id).slice(0, 3)
    : mockSignals.slice(0, 5);

  return (
    <div className="w-[300px] border-l border-border bg-surface/50 flex flex-col overflow-y-auto">
      {/* Next Action */}
      <div className="p-3 border-b border-border">
        {account ? (
          <NextActionCard account={account} />
        ) : (
          <Card className="border-accent/30">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-accent" />
              <span className="text-sm font-semibold text-text">Select an Account</span>
            </div>
            <p className="text-xs text-text2">Choose an account from the list to see the next recommended action.</p>
          </Card>
        )}
      </div>

      {/* Activity Log */}
      <div className="p-3 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Activity size={14} className="text-text2" />
          <h3 className="text-xs font-semibold text-text2 uppercase tracking-wide">Recent Activity</h3>
        </div>
        <div className="space-y-2">
          {recentSignals.map((signal) => (
            <div key={signal.id} className="px-2.5 py-2 rounded-lg bg-surface2/50">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className={`h-1.5 w-1.5 rounded-full ${
                  signal.strength === 'strong' ? 'bg-green' : signal.strength === 'moderate' ? 'bg-yellow' : 'bg-text2'
                }`} />
                <span className="text-xs font-medium text-text truncate">{signal.accountName}</span>
              </div>
              <p className="text-xs text-text2 leading-relaxed">{signal.title}</p>
              <span className="text-[10px] text-text2">{signal.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
