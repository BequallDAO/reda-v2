import { Mail, Play, Pause, FileEdit } from 'lucide-react';
import { Badge } from '@/components/shared/Badge';
import { Card } from '@/components/shared/Card';
import { mockCampaigns } from '@/data/mockAccounts';
import type { Campaign } from '@/types';

interface CampaignListProps {
  onSelect: (campaign: Campaign) => void;
  selectedId: string | null;
}

const statusConfig: Record<string, { variant: 'green' | 'yellow' | 'default' | 'blue'; icon: typeof Play }> = {
  active: { variant: 'green', icon: Play },
  paused: { variant: 'yellow', icon: Pause },
  draft: { variant: 'default', icon: FileEdit },
  completed: { variant: 'blue', icon: Mail },
};

export function CampaignList({ onSelect, selectedId }: CampaignListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {mockCampaigns.map((campaign) => {
        const config = statusConfig[campaign.status];
        const replyRate = campaign.enrolled > 0 ? Math.round((campaign.replied / campaign.enrolled) * 100) : 0;
        return (
          <button
            key={campaign.id}
            onClick={() => onSelect(campaign)}
            className={`text-left cursor-pointer ${selectedId === campaign.id ? 'ring-1 ring-accent' : ''} rounded-lg`}
          >
            <Card>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-text truncate">{campaign.name}</h3>
                <Badge variant={config.variant}>{campaign.status}</Badge>
              </div>
              <p className="text-xs text-text2 mb-3">{campaign.objective}</p>
              <div className="grid grid-cols-4 gap-2">
                <div className="text-center">
                  <div className="text-lg font-bold text-accent2">{campaign.enrolled}</div>
                  <div className="text-[10px] text-text2">Enrolled</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue">{campaign.opened}</div>
                  <div className="text-[10px] text-text2">Opened</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green">{campaign.replied}</div>
                  <div className="text-[10px] text-text2">Replied</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow">{replyRate}%</div>
                  <div className="text-[10px] text-text2">Rate</div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs text-text2">
                <Mail size={10} />
                {campaign.steps.length} steps · {campaign.meetingsBooked} meetings booked
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
