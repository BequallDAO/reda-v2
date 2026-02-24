import { ListChecks } from 'lucide-react';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { useAccounts } from '@/hooks/useAccounts';

export function EnrichmentQueue() {
  const { accounts } = useAccounts();
  const needsEnrichment = accounts.filter((a) => a.enrichment_status !== 'complete');

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ListChecks size={14} className="text-yellow" />
        <h3 className="text-sm font-semibold text-text">Enrichment Queue</h3>
        <Badge variant="yellow">{needsEnrichment.length}</Badge>
      </div>
      <div className="space-y-2">
        {needsEnrichment.map((account) => (
          <div key={account.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface border border-border">
            <div>
              <div className="text-sm font-medium text-text">{account.company_name}</div>
              <div className="text-xs text-text2">
                Status: {account.enrichment_status === 'partial' ? 'Partial — needs verification' : 'Not started'}
              </div>
            </div>
            <Button variant="secondary" size="sm">Enrich</Button>
          </div>
        ))}
        {needsEnrichment.length === 0 && (
          <div className="text-sm text-text2 py-4 text-center">All accounts enriched</div>
        )}
      </div>
    </div>
  );
}
