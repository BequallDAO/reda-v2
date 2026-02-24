import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectList } from '@/components/layout/ProjectList';
import { ActionRail } from '@/components/layout/ActionRail';
import { MarketingDashboard } from '@/components/marketing/MarketingDashboard';
import { SignalFeed } from '@/components/marketing/SignalFeed';
import { EnrichmentQueue } from '@/components/marketing/EnrichmentQueue';
import { WorkspaceTabs } from '@/components/sales/WorkspaceTabs';
import { useAppStore } from '@/stores/appStore';
import { useAccountsStore } from '@/stores/accountsStore';
import type { Account } from '@/types';

export default function MarketingPage() {
  const { accountId } = useParams();
  const { actionRailCollapsed } = useAppStore();
  const accounts = useAccountsStore((s) => s.accounts);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(
    accountId ? accounts.find((a) => a.id === accountId) || null : null
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      <ProjectList
        onSelectAccount={(account) => setSelectedAccount(account)}
        selectedAccountId={selectedAccount?.id || null}
      />

      {/* Main Workspace */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {selectedAccount ? (
          <div className="flex-1 flex flex-col">
            {/* Account header */}
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-base font-semibold text-text">{selectedAccount.company_name}</h2>
              <span className="text-xs text-text2">{selectedAccount.city}, {selectedAccount.state} · {selectedAccount.contact_name}</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <WorkspaceTabs account={selectedAccount} />
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-6">
            <MarketingDashboard />
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface rounded-lg border border-border p-4">
                <SignalFeed />
              </div>
              <div className="bg-surface rounded-lg border border-border p-4">
                <EnrichmentQueue />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Rail */}
      {!actionRailCollapsed && <ActionRail account={selectedAccount} />}
    </div>
  );
}
