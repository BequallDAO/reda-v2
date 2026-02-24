import { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { Badge } from '@/components/shared/Badge';
import { useAccounts } from '@/hooks/useAccounts';
import type { Account } from '@/types';

interface NewProjectWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewProjectWizard({ isOpen, onClose }: NewProjectWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [owner, setOwner] = useState('Robert');
  const { accounts } = useAccounts();
  const callReadyAccounts = accounts.filter((a) => a.call_ready);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-[600px] max-h-[80vh] bg-surface rounded-xl border border-border shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="text-base font-semibold text-text">New Sales Project</h2>
            <span className="text-xs text-text2">Step {step} of 3</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-text2 hover:bg-surface2 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="flex px-5 pt-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium ${
                s <= step ? 'bg-accent text-white' : 'bg-surface2 text-text2'
              }`}>
                {s < step ? <Check size={14} /> : s}
              </div>
              {s < 3 && <div className={`flex-1 h-0.5 mx-2 ${s < step ? 'bg-accent' : 'bg-surface2'}`} />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {step === 1 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-text">Select a Call-Ready Account</h3>
              <p className="text-xs text-text2">These accounts have been enriched and scored. Marketing data will be pre-loaded.</p>
              <div className="space-y-2 mt-3">
                {callReadyAccounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => setSelectedAccount(account)}
                    className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg border transition-colors cursor-pointer ${
                      selectedAccount?.id === account.id
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/30 bg-surface2/30'
                    }`}
                  >
                    <div>
                      <span className="text-sm font-medium text-text">{account.company_name}</span>
                      <div className="text-xs text-text2">{account.contact_name} — {account.contact_title}</div>
                    </div>
                    <Badge variant="blue">{account.icp_score} ICP</Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && selectedAccount && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-text">Confirm Scope</h3>
              <div className="bg-surface2/50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text2">Company</span>
                  <span className="text-text font-medium">{selectedAccount.company_name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text2">Primary Contact</span>
                  <span className="text-text">{selectedAccount.contact_name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text2">ICP Score</span>
                  <span className="text-accent2 font-medium">{selectedAccount.icp_score}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text2">Recent Projects</span>
                  <span className="text-text">{selectedAccount.recent_projects}</span>
                </div>
              </div>
              <div className="text-xs text-text2">Brief, Score, and Memo will be auto-populated from Marketing data.</div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-text">Assign Owner</h3>
              <div className="space-y-2">
                {['Robert', 'Tucker', 'Other'].map((name) => (
                  <button
                    key={name}
                    onClick={() => setOwner(name)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg border transition-colors cursor-pointer ${
                      owner === name
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/30 bg-surface2/30'
                    }`}
                  >
                    <span className="text-sm font-medium text-text">{name}</span>
                  </button>
                ))}
              </div>
              <div className="bg-green/10 border border-green/20 rounded-lg p-3 text-sm text-green">
                Ready to create project for {selectedAccount?.company_name} assigned to {owner}.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
          >
            {step > 1 ? <><ArrowLeft size={14} /> Back</> : 'Cancel'}
          </Button>
          <Button
            onClick={() => {
              if (step < 3) setStep(step + 1);
              else onClose();
            }}
            disabled={step === 1 && !selectedAccount}
          >
            {step < 3 ? <>Next <ArrowRight size={14} /></> : <>Create Project <Check size={14} /></>}
          </Button>
        </div>
      </div>
    </div>
  );
}
