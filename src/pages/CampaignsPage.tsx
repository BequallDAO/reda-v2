import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CampaignList } from '@/components/campaigns/CampaignList';
import { CampaignStatus } from '@/components/campaigns/CampaignStatus';
import { CampaignBuilder } from '@/components/campaigns/CampaignBuilder';
import { Button } from '@/components/shared/Button';
import type { Campaign } from '@/types';

export default function CampaignsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [builderOpen, setBuilderOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-text">Campaigns</h2>
        <Button onClick={() => setBuilderOpen(true)} size="sm">
          <Plus size={14} /> New Campaign
        </Button>
      </div>

      <CampaignList onSelect={setSelectedCampaign} selectedId={selectedCampaign?.id || null} />

      {selectedCampaign && (
        <div className="bg-surface rounded-lg border border-border p-4">
          <h3 className="text-sm font-semibold text-text mb-3">{selectedCampaign.name}</h3>
          <CampaignStatus campaign={selectedCampaign} />
        </div>
      )}

      <CampaignBuilder isOpen={builderOpen} onClose={() => setBuilderOpen(false)} />
    </div>
  );
}
