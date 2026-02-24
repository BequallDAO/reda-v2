import { Search, PanelRight } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

const engineLabels: Record<string, string> = {
  marketing: 'Marketing Engine',
  sales: 'Sales Engine',
  campaigns: 'Campaign Builder',
  ops: 'Operations Engine',
};

export function TopBar() {
  const { currentEngine, actionRailCollapsed, toggleActionRail } = useAppStore();

  return (
    <header className="flex items-center justify-between h-12 px-4 border-b border-border bg-surface">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-text">{engineLabels[currentEngine]}</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface2 text-text2 text-sm">
          <Search size={14} />
          <span className="hidden sm:inline">Search...</span>
        </div>
        <button
          onClick={toggleActionRail}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            actionRailCollapsed
              ? 'text-text2 hover:bg-surface2'
              : 'text-accent2 bg-accent/10'
          }`}
          title="Toggle action panel"
        >
          <PanelRight size={18} />
        </button>
      </div>
    </header>
  );
}
