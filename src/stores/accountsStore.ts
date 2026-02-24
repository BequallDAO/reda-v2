import { create } from 'zustand';
import type { Account } from '@/types';
import { mockAccounts } from '@/data/mockAccounts';

interface AccountsState {
  accounts: Account[];
  loading: boolean;
  filters: {
    tier: number | null;
    stage: string | null;
    callReady: boolean | null;
    search: string;
  };
  selectedAccount: Account | null;
  setAccounts: (accounts: Account[]) => void;
  setSelectedAccount: (account: Account | null) => void;
  setFilter: (key: string, value: unknown) => void;
  setSearch: (search: string) => void;
  getFilteredAccounts: () => Account[];
}

export const useAccountsStore = create<AccountsState>((set, get) => ({
  accounts: mockAccounts,
  loading: false,
  filters: {
    tier: null,
    stage: null,
    callReady: null,
    search: '',
  },
  selectedAccount: null,
  setAccounts: (accounts) => set({ accounts }),
  setSelectedAccount: (account) => set({ selectedAccount: account }),
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),
  setSearch: (search) =>
    set((s) => ({ filters: { ...s.filters, search } })),
  getFilteredAccounts: () => {
    const { accounts, filters } = get();
    return accounts.filter((a) => {
      if (filters.tier !== null && a.tier !== filters.tier) return false;
      if (filters.stage !== null && a.stage !== filters.stage) return false;
      if (filters.callReady !== null && a.call_ready !== filters.callReady) return false;
      if (filters.search) {
        const s = filters.search.toLowerCase();
        return a.company_name.toLowerCase().includes(s) ||
          a.contact_name.toLowerCase().includes(s);
      }
      return true;
    });
  },
}));
