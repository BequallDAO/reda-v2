import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Plus } from 'lucide-react';
import { Button } from '@/components/shared/Button';

interface CampaignBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CampaignBuilder({ isOpen, onClose }: CampaignBuilderProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-[650px] max-h-[80vh] bg-surface rounded-xl border border-border shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="text-base font-semibold text-text">New Campaign</h2>
            <span className="text-xs text-text2">Step {step} of 4</span>
          </div>
          <button onClick={onClose} className="text-text2 hover:text-text cursor-pointer text-lg">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-text">Name & Objective</h3>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Campaign name..."
                className="w-full px-3 py-2 bg-surface2 border border-border rounded-lg text-sm text-text placeholder:text-text2 outline-none focus:border-accent/50"
              />
              <textarea
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="What's the goal of this campaign?"
                className="w-full h-24 px-3 py-2 bg-surface2 border border-border rounded-lg text-sm text-text placeholder:text-text2 outline-none focus:border-accent/50 resize-none"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-text">Select Accounts</h3>
              <p className="text-xs text-text2">Filter and select accounts from the marketing pool to enroll in this campaign.</p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">Tier 1</Button>
                <Button variant="secondary" size="sm">Call Ready</Button>
                <Button variant="secondary" size="sm">By Signal</Button>
              </div>
              <div className="bg-surface2/50 rounded-lg p-4 text-center text-sm text-text2">
                Account selection interface — filter by tier, stage, and signal type
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-text">Build Sequence</h3>
              <p className="text-xs text-text2">Add steps to your outreach sequence.</p>
              <div className="space-y-2">
                <div className="px-3 py-2 rounded-lg bg-surface2/50 border border-border text-sm text-text2">
                  Step 1: Email — Day 0
                </div>
                <div className="px-3 py-2 rounded-lg bg-surface2/50 border border-border text-sm text-text2">
                  Step 2: Follow-up Email — Day 3
                </div>
              </div>
              <Button variant="secondary" size="sm">
                <Plus size={14} /> Add Step
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-text">Review & Launch</h3>
              <div className="bg-surface2/50 rounded-lg p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text2">Campaign</span>
                  <span className="text-text">{name || 'Untitled'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text2">Objective</span>
                  <span className="text-text">{objective || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text2">Steps</span>
                  <span className="text-text">2 steps</span>
                </div>
              </div>
              <div className="bg-green/10 border border-green/20 rounded-lg p-3 text-sm text-green">
                Ready to launch campaign.
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-border">
          <Button variant="ghost" onClick={() => step > 1 ? setStep(step - 1) : onClose()}>
            {step > 1 ? <><ArrowLeft size={14} /> Back</> : 'Cancel'}
          </Button>
          <Button onClick={() => step < 4 ? setStep(step + 1) : onClose()}>
            {step < 4 ? <>Next <ArrowRight size={14} /></> : <>Launch <Check size={14} /></>}
          </Button>
        </div>
      </div>
    </div>
  );
}
