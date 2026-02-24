import { SequenceEditor } from './SequenceEditor';
import type { Campaign } from '@/types';
import { Badge } from '@/components/shared/Badge';

interface CampaignStatusProps {
  campaign: Campaign;
}

export function CampaignStatus({ campaign }: CampaignStatusProps) {
  const replyRate = campaign.enrolled > 0 ? Math.round((campaign.replied / campaign.enrolled) * 100) : 0;

  return (
    <div className="space-y-5">
      {/* Metrics */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-surface rounded-lg border border-border px-4 py-3 text-center">
          <div className="text-2xl font-bold text-accent2">{campaign.enrolled}</div>
          <div className="text-xs text-text2">Enrolled</div>
        </div>
        <div className="bg-surface rounded-lg border border-border px-4 py-3 text-center">
          <div className="text-2xl font-bold text-blue">{campaign.opened}</div>
          <div className="text-xs text-text2">Opened</div>
        </div>
        <div className="bg-surface rounded-lg border border-border px-4 py-3 text-center">
          <div className="text-2xl font-bold text-green">{campaign.replied}</div>
          <div className="text-xs text-text2">Replied</div>
        </div>
        <div className="bg-surface rounded-lg border border-border px-4 py-3 text-center">
          <div className="text-2xl font-bold text-yellow">{campaign.meetingsBooked}</div>
          <div className="text-xs text-text2">Meetings</div>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center gap-3">
        <Badge variant={campaign.status === 'active' ? 'green' : campaign.status === 'draft' ? 'default' : 'yellow'}>
          {campaign.status}
        </Badge>
        <span className="text-xs text-text2">Reply rate: {replyRate}%</span>
        <span className="text-xs text-text2">Created: {campaign.createdAt}</span>
      </div>

      {/* Sequence */}
      <SequenceEditor steps={campaign.steps} />
    </div>
  );
}
