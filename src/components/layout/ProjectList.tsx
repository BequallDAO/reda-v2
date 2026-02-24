import { Search, Filter } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { useAccounts } from '@/hooks/useAccounts';
import { useAccountsStore } from '@/stores/accountsStore';
import type { Account } from '@/types';

interface ProjectListProps {
  onSelectAccount: (account: Account) => void;
  selectedAccountId: string | null;
}

export function ProjectList({ onSelectAccount, selectedAccountId }: ProjectListProps) {
  const { filteredAccounts, filters, setSearch, setFilter } = useAccounts();
  const accounts = useAccountsStore((s) => s.accounts);

  return (
    <div className="flex flex-col w-[280px] border-r border-border bg-surface/50">
      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-surface2 text-text2">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search accounts..."
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-text placeholder:text-text2 outline-none flex-1"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
        <Filter size={12} className="text-text2" />
        <button
          onClick={() => setFilter('callReady', filters.callReady === true ? null : true)}
          className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
            filters.callReady === true
              ? 'bg-green/15 text-green'
              : 'bg-surface2 text-text2 hover:text-text'
          }`}
        >
          Call Ready
        </button>
        <button
          onClick={() => setFilter('tier', filters.tier === 1 ? null : 1)}
          className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
            filters.tier === 1
              ? 'bg-blue/15 text-blue'
              : 'bg-surface2 text-text2 hover:text-text'
          }`}
        >
          Tier 1
        </button>
        <span className="text-[10px] text-text2 ml-auto">{filteredAccounts.length}/{accounts.length}</span>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {filteredAccounts.map((account) => (
          <ProjectCard
            key={account.id}
            account={account}
            isSelected={account.id === selectedAccountId}
            onClick={() => onSelectAccount(account)}
          />
        ))}
      </div>
    </div>
  );
}
