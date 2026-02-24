import { useState } from 'react';
import type { Account, Deal } from '@/types';
import { AccountBrief } from '@/components/marketing/AccountBrief';
import { ICPScoreCard } from '@/components/marketing/ICPScoreCard';
import { NextActionCard } from '@/components/shared/NextActionCard';

interface WorkspaceTabsProps {
  account: Account;
  deal?: Deal;
}

const tabs = ['Brief', 'Score', 'Memo', 'Next Actions'] as const;
type Tab = (typeof tabs)[number];

export function WorkspaceTabs({ account, deal }: WorkspaceTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Brief');
  const [memo, setMemo] = useState(deal?.memo || account.outreach_draft || '');

  return (
    <div className="flex flex-col h-full">
      {/* Tab Bar */}
      <div className="flex gap-0 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === tab
                ? 'text-accent2 border-b-2 border-accent'
                : 'text-text2 hover:text-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'Brief' && <AccountBrief account={account} />}
        {activeTab === 'Score' && <ICPScoreCard account={account} />}
        {activeTab === 'Memo' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-text">Account Memo</h3>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="Add notes about this account..."
              className="w-full h-64 bg-surface2 border border-border rounded-lg p-3 text-sm text-text placeholder:text-text2 outline-none focus:border-accent/50 resize-none"
            />
            <p className="text-xs text-text2">Changes save to Firestore automatically.</p>
          </div>
        )}
        {activeTab === 'Next Actions' && (
          <div className="space-y-4">
            <NextActionCard account={account} deal={deal} />
          </div>
        )}
      </div>
    </div>
  );
}
