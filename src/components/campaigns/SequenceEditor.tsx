import { Mail, Linkedin, Phone, GripVertical } from 'lucide-react';
import { Badge } from '@/components/shared/Badge';
import type { CampaignStep } from '@/types';

interface SequenceEditorProps {
  steps: CampaignStep[];
}

const stepIcons: Record<string, typeof Mail> = {
  email: Mail,
  linkedin: Linkedin,
  call: Phone,
};

const stepColors: Record<string, 'blue' | 'purple' | 'green'> = {
  email: 'blue',
  linkedin: 'purple',
  call: 'green',
};

export function SequenceEditor({ steps }: SequenceEditorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text">Sequence Steps</h3>
      <div className="space-y-2">
        {steps.map((step, i) => {
          const Icon = stepIcons[step.type] || Mail;
          return (
            <div key={step.id} className="flex items-start gap-3 px-3 py-3 rounded-lg bg-surface border border-border">
              <div className="flex items-center gap-2 shrink-0 mt-0.5">
                <GripVertical size={14} className="text-text2 cursor-grab" />
                <div className={`flex items-center justify-center h-7 w-7 rounded-lg bg-${stepColors[step.type]}/15`}>
                  <Icon size={14} className={`text-${stepColors[step.type]}`} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-text">Step {i + 1}</span>
                  <Badge variant={stepColors[step.type]}>{step.type}</Badge>
                  <span className="text-xs text-text2">Day {step.dayOffset}</span>
                </div>
                <div className="text-xs text-text2">{step.subject}</div>
                <div className="text-xs text-text2 mt-1 truncate">{step.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
