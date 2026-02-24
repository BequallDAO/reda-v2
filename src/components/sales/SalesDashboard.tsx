import { TrendingUp, DollarSign, Phone, Target } from 'lucide-react';
import { mockDeals } from '@/data/mockAccounts';
import { PipelineFunnel } from './PipelineFunnel';

export function SalesDashboard() {
  const totalValue = mockDeals.reduce((sum, d) => {
    const val = parseFloat(d.value.replace(/[$M,]/g, '')) || 0;
    return sum + val;
  }, 0);

  const metrics = [
    { label: 'Active Deals', value: mockDeals.length, icon: Target, color: 'text-accent2' },
    { label: 'Pipeline Value', value: `$${totalValue}M`, icon: DollarSign, color: 'text-green' },
    { label: 'Calls This Week', value: 8, icon: Phone, color: 'text-blue' },
    { label: 'Conversion', value: '23%', icon: TrendingUp, color: 'text-yellow' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
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
      <PipelineFunnel />
    </div>
  );
}
