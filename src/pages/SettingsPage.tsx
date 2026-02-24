import { Card } from '@/components/shared/Card';

export default function SettingsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <h2 className="text-base font-semibold text-text">Settings</h2>

      <Card>
        <h3 className="text-sm font-semibold text-text mb-3">Firebase Configuration</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text2">Project ID</span>
            <span className="text-text font-mono text-xs">bequall-reda</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text2">Auth Domain</span>
            <span className="text-text font-mono text-xs">bequall-reda.firebaseapp.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text2">Status</span>
            <span className="text-green text-xs">Connected</span>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-text mb-3">Team</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm text-text">Robert</div>
              <div className="text-xs text-text2">Sales Lead</div>
            </div>
            <span className="text-xs text-green">Active</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm text-text">Tucker</div>
              <div className="text-xs text-text2">Enrichment & Research</div>
            </div>
            <span className="text-xs text-green">Active</span>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-text mb-3">About</h3>
        <div className="space-y-1 text-sm">
          <div className="text-text">REDA V3 — Bequall Operations Platform</div>
          <div className="text-text2">React + Vite + TypeScript + Firebase</div>
          <div className="text-text2 text-xs mt-2">Version 3.0.0</div>
        </div>
      </Card>
    </div>
  );
}
