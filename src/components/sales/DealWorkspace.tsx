import { Badge } from '@/components/shared/Badge';
import { WorkspaceTabs } from './WorkspaceTabs';
import type { Account, Deal } from '@/types';

interface DealWorkspaceProps {
  account: Account;
  deal?: Deal;
}

function getStageLabel(stage: number): string {
  const labels: Record<number, string> = {
    1: 'Prospect', 2: 'Enrichment', 3: 'Qualified', 4: 'Outreach',
    5: 'First Contact', 6: 'Discovery', 7: 'Proposal', 8: 'Negotiation',
    9: 'Contract', 10: 'MSA Signed', 11: 'MAP Created', 12: 'Ops Handoff',
    13: 'Active Project', 14: 'Closed Won',
  };
  return labels[stage] || `Stage ${stage}`;
}

export function DealWorkspace({ account, deal }: DealWorkspaceProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-text">{account.company_name}</h2>
          <Badge variant="blue">T{account.tier}</Badge>
          {deal && (
            <>
              <Badge variant="green">Stage {deal.stage}: {getStageLabel(deal.stage)}</Badge>
              <Badge variant="purple">Route {deal.route}</Badge>
            </>
          )}
        </div>
        {deal && <span className="text-sm font-semibold text-accent2">{deal.value}</span>}
      </div>

      {/* Tabs Content */}
      <div className="flex-1 overflow-hidden">
        <WorkspaceTabs account={account} deal={deal} />
      </div>
    </div>
  );
}
