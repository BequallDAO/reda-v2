import { Radio, FileText, Users, Newspaper, Banknote, Handshake } from 'lucide-react';
import { Badge } from '@/components/shared/Badge';
import type { Signal } from '@/types';
import { mockSignals } from '@/data/mockAccounts';

const typeIcons: Record<string, typeof Radio> = {
  rfp: FileText,
  hiring: Users,
  permit: FileText,
  news: Newspaper,
  funding: Banknote,
  partnership: Handshake,
};

const strengthVariants: Record<string, 'green' | 'yellow' | 'default'> = {
  strong: 'green',
  moderate: 'yellow',
  weak: 'default',
};

export function SignalFeed() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Radio size={14} className="text-accent2" />
        <h3 className="text-sm font-semibold text-text">Signal Feed</h3>
        <Badge variant="blue">{mockSignals.length}</Badge>
      </div>
      <div className="space-y-2">
        {mockSignals.map((signal: Signal) => {
          const Icon = typeIcons[signal.type] || Newspaper;
          return (
            <div key={signal.id} className="flex gap-3 px-3 py-2.5 rounded-lg bg-surface border border-border hover:border-accent/30 transition-colors">
              <div className="shrink-0 mt-0.5">
                <Icon size={14} className="text-text2" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-text truncate">{signal.accountName}</span>
                  <Badge variant={strengthVariants[signal.strength]} size="sm">{signal.strength}</Badge>
                </div>
                <p className="text-xs text-text2 leading-relaxed">{signal.title}</p>
                <span className="text-[10px] text-text2">{signal.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
