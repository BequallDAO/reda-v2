import { HardHat, AlertTriangle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/shared/Badge';
import { mockOpsProjects } from '@/data/mockAccounts';
import type { OpsProject } from '@/types';

interface OpsProjectListProps {
  onSelect: (project: OpsProject) => void;
  selectedId: string | null;
}

const statusVariants: Record<string, 'green' | 'yellow' | 'blue'> = {
  active: 'green',
  'on-hold': 'yellow',
  complete: 'blue',
};

export function OpsProjectList({ onSelect, selectedId }: OpsProjectListProps) {
  return (
    <div className="space-y-2">
      {mockOpsProjects.map((project) => {
        const redEscalations = project.escalations.filter((e) => e.severity === 'red').length;
        const yellowEscalations = project.escalations.filter((e) => e.severity === 'yellow').length;

        return (
          <button
            key={project.id}
            onClick={() => onSelect(project)}
            className={`w-full text-left px-3 py-3 rounded-lg border transition-colors cursor-pointer ${
              selectedId === project.id
                ? 'border-accent bg-accent/10'
                : 'border-border hover:border-accent/30 bg-surface'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <HardHat size={14} className="text-purple" />
                <span className="text-sm font-semibold text-text">{project.name}</span>
              </div>
              <Badge variant={statusVariants[project.status]}>{project.status}</Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-text2 ml-6">
              <span>{project.location}</span>
              <span>{project.units} units</span>
              <span>{project.phase}</span>
            </div>
            {(redEscalations > 0 || yellowEscalations > 0) && (
              <div className="flex items-center gap-2 mt-1.5 ml-6">
                {redEscalations > 0 && (
                  <span className="flex items-center gap-1 text-xs text-red">
                    <AlertCircle size={10} /> {redEscalations} critical
                  </span>
                )}
                {yellowEscalations > 0 && (
                  <span className="flex items-center gap-1 text-xs text-yellow">
                    <AlertTriangle size={10} /> {yellowEscalations} warning
                  </span>
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
