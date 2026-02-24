import { Users, Phone, Mail, Sparkles } from 'lucide-react';
import { useAccounts } from '@/hooks/useAccounts';

export function MarketingDashboard() {
  const { stats } = useAccounts();

  const metrics = [
    { label: 'Total Accounts', value: stats.total, icon: Users, color: 'text-accent2' },
    { label: 'Tier 1', value: stats.tier1, icon: Sparkles, color: 'text-blue' },
    { label: 'Call Ready', value: stats.callReady, icon: Phone, color: 'text-green' },
    { label: 'Need Enrichment', value: stats.needEnrichment, icon: Mail, color: 'text-yellow' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mb-4">
      {metrics.map((m) => (
        <div key={m.label} className="bg-surface rounded-lg border border-border px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <m.icon size={14} className={m.color} />
            <span className="text-xs text-text2">{m.label}</span>
          </div>
          <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
        </div>
      ))}
    </div>
  );
}
