import { useState } from 'react';
import { OpsProjectList } from '@/components/ops/OpsProjectList';
import { OpsWorkspace } from '@/components/ops/OpsWorkspace';
import type { OpsProject } from '@/types';

export default function OpsPage() {
  const [selectedProject, setSelectedProject] = useState<OpsProject | null>(null);

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Project List */}
      <div className="flex flex-col w-[300px] border-r border-border bg-surface/50">
        <div className="p-3 border-b border-border">
          <h3 className="text-sm font-semibold text-text">Active Projects</h3>
          <span className="text-xs text-text2">7 projects</span>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <OpsProjectList onSelect={setSelectedProject} selectedId={selectedProject?.id || null} />
        </div>
      </div>

      {/* Workspace */}
      <div className="flex-1 overflow-hidden">
        {selectedProject ? (
          <OpsWorkspace project={selectedProject} />
        ) : (
          <div className="flex items-center justify-center h-full text-text2 text-sm">
            Select a project to view coordination details
          </div>
        )}
      </div>
    </div>
  );
}
