import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { ActionRail } from '@/components/layout/ActionRail';
import { SalesDashboard } from '@/components/sales/SalesDashboard';
import { DealWorkspace } from '@/components/sales/DealWorkspace';
import { NewProjectWizard } from '@/components/sales/NewProjectWizard';
import { Button } from '@/components/shared/Button';
import { Badge } from '@/components/shared/Badge';
import { StatusDot } from '@/components/shared/StatusDot';
import { useAppStore } from '@/stores/appStore';
import { useAccountsStore } from '@/stores/accountsStore';
import { mockDeals } from '@/data/mockAccounts';
import type { Deal } from '@/types';

export default function SalesPage() {
  const { dealId } = useParams();
  const { actionRailCollapsed } = useAppStore();
  const accounts = useAccountsStore((s) => s.accounts);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(
    dealId ? mockDeals.find((d) => d.id === dealId) || null : null
  );
  const [wizardOpen, setWizardOpen] = useState(false);

  const selectedAccount = selectedDeal
    ? accounts.find((a) => a.id === selectedDeal.accountId) || null
    : null;

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Deal List */}
      <div className="flex flex-col w-[280px] border-r border-border bg-surface/50">
        <div className="flex items-center justify-between p-3 border-b border-border">
          <h3 className="text-sm font-semibold text-text">Deals</h3>
          <Button variant="primary" size="sm" onClick={() => setWizardOpen(true)}>
            <Plus size={12} /> New
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {mockDeals.map((deal) => (
            <button
              key={deal.id}
              onClick={() => setSelectedDeal(deal)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                selectedDeal?.id === deal.id
                  ? 'bg-accent/10 border border-accent/30'
                  : 'hover:bg-surface2 border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StatusDot status={deal.stage >= 5 ? 'active' : 'pending'} />
                  <span className="text-sm font-medium text-text truncate">{deal.accountName}</span>
                </div>
                <span className="text-xs font-semibold text-accent2">{deal.value}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 ml-4">
                <Badge variant="green" size="sm">S{deal.stage}</Badge>
                <Badge variant="purple" size="sm">{deal.route}</Badge>
                <span className="text-xs text-text2">{deal.owner}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {selectedDeal && selectedAccount ? (
          <DealWorkspace account={selectedAccount} deal={selectedDeal} />
        ) : (
          <div className="p-4 space-y-4">
            <SalesDashboard />
          </div>
        )}
      </div>

      {/* Action Rail */}
      {!actionRailCollapsed && <ActionRail account={selectedAccount} />}

      {/* New Project Wizard */}
      <NewProjectWizard isOpen={wizardOpen} onClose={() => setWizardOpen(false)} />
    </div>
  );
}
