import { useAccountsStore } from '@/stores/accountsStore';

export function useAccounts() {
  const accounts = useAccountsStore((s) => s.accounts);
  const loading = useAccountsStore((s) => s.loading);
  const filters = useAccountsStore((s) => s.filters);
  const selectedAccount = useAccountsStore((s) => s.selectedAccount);
  const setSelectedAccount = useAccountsStore((s) => s.setSelectedAccount);
  const setFilter = useAccountsStore((s) => s.setFilter);
  const setSearch = useAccountsStore((s) => s.setSearch);
  const getFilteredAccounts = useAccountsStore((s) => s.getFilteredAccounts);

  const filteredAccounts = getFilteredAccounts();

  const stats = {
    total: accounts.length,
    tier1: accounts.filter((a) => a.tier === 1).length,
    callReady: accounts.filter((a) => a.call_ready).length,
    needEnrichment: accounts.filter((a) => a.enrichment_status !== 'complete').length,
    needEmail: accounts.filter((a) => !a.contact_email).length,
  };

  return {
    accounts,
    filteredAccounts,
    loading,
    filters,
    selectedAccount,
    setSelectedAccount,
    setFilter,
    setSearch,
    stats,
  };
}
