import { mockDeals } from '@/data/mockAccounts';

const stages = [
  { num: 1, label: 'Prospect' },
  { num: 2, label: 'Enrichment' },
  { num: 3, label: 'Qualified' },
  { num: 4, label: 'Outreach' },
  { num: 5, label: 'First Contact' },
  { num: 6, label: 'Discovery' },
  { num: 7, label: 'Proposal' },
  { num: 8, label: 'Negotiation' },
  { num: 9, label: 'Contract' },
  { num: 10, label: 'MSA Signed' },
  { num: 11, label: 'MAP Created' },
  { num: 12, label: 'Ops Handoff' },
  { num: 13, label: 'Active Project' },
  { num: 14, label: 'Closed Won' },
];

export function PipelineFunnel() {
  const dealsByStage = stages.map((s) => ({
    ...s,
    deals: mockDeals.filter((d) => d.stage === s.num),
    routeA: mockDeals.filter((d) => d.stage === s.num && d.route === 'A').length,
    routeB: mockDeals.filter((d) => d.stage === s.num && d.route === 'B').length,
  }));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-text">Pipeline</h3>
        <div className="flex gap-3 text-xs">
          <span className="text-accent2">Route A (Direct)</span>
          <span className="text-purple">Route B (Partner)</span>
        </div>
      </div>
      <div className="flex gap-1 overflow-x-auto pb-2">
        {dealsByStage.map((s) => {
          const total = s.deals.length;
          return (
            <div
              key={s.num}
              className={`flex flex-col items-center shrink-0 w-16 rounded-lg px-1 py-2 ${
                total > 0 ? 'bg-surface border border-border' : 'bg-surface2/30'
              }`}
            >
              <div className="text-[10px] text-text2 text-center leading-tight mb-1">{s.label}</div>
              <div className={`text-lg font-bold ${total > 0 ? 'text-accent2' : 'text-text2/50'}`}>{total}</div>
              {total > 0 && (
                <div className="flex gap-0.5 mt-1">
                  {s.routeA > 0 && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  {s.routeB > 0 && <span className="h-1.5 w-1.5 rounded-full bg-purple" />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
