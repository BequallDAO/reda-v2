import { useState } from 'react';
import { AlertCircle, AlertTriangle, Building2, MapPin, Users, Wrench } from 'lucide-react';
import { Badge } from '@/components/shared/Badge';
import { ScopeGapMatrix } from './ScopeGapMatrix';
import { MilestoneTracker } from './MilestoneTracker';
import type { OpsProject } from '@/types';

interface OpsWorkspaceProps {
  project: OpsProject;
}

const tabs = ['Overview', 'Critical Path', 'Scope', 'Escalations'] as const;

export function OpsWorkspace({ project }: OpsWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Overview');

  const permittingVariant = project.permittingStatus === 'approved' ? 'green' : project.permittingStatus === 'pending' ? 'yellow' : 'red';
  const alignmentVariant = project.factoryAlignment === 'aligned' ? 'green' : project.factoryAlignment === 'gap' ? 'yellow' : 'red';

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-text">{project.name}</h2>
          <Badge variant={project.status === 'active' ? 'green' : project.status === 'on-hold' ? 'yellow' : 'blue'}>
            {project.status}
          </Badge>
          <Badge variant="purple">{project.phase}</Badge>
        </div>
        <span className="text-sm text-text2">{project.units} units</span>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-0 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === tab
                ? 'text-accent2 border-b-2 border-accent'
                : 'text-text2 hover:text-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'Overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={14} className="text-text2" />
                <span className="text-text2">Location:</span>
                <span className="text-text">{project.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Building2 size={14} className="text-text2" />
                <span className="text-text2">GC Partner:</span>
                <span className="text-text">{project.gcPartner}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users size={14} className="text-text2" />
                <span className="text-text2">Units:</span>
                <span className="text-text">{project.units}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Wrench size={14} className="text-text2" />
                <span className="text-text2">Phase:</span>
                <span className="text-text">{project.phase}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 bg-surface2/50 rounded-lg p-3">
                <span className="text-xs text-text2">Permitting</span>
                <div className="mt-1">
                  <Badge variant={permittingVariant}>{project.permittingStatus}</Badge>
                </div>
              </div>
              <div className="flex-1 bg-surface2/50 rounded-lg p-3">
                <span className="text-xs text-text2">Factory-GC Alignment</span>
                <div className="mt-1">
                  <Badge variant={alignmentVariant}>{project.factoryAlignment}</Badge>
                </div>
              </div>
            </div>

            {project.escalations.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-text">Active Escalations</h3>
                {project.escalations.map((e) => (
                  <div key={e.id} className={`flex gap-2 px-3 py-2 rounded-lg border ${
                    e.severity === 'red' ? 'bg-red/5 border-red/20' : 'bg-yellow/5 border-yellow/20'
                  }`}>
                    {e.severity === 'red' ? <AlertCircle size={14} className="text-red shrink-0 mt-0.5" /> : <AlertTriangle size={14} className="text-yellow shrink-0 mt-0.5" />}
                    <div>
                      <div className="text-sm font-medium text-text">{e.title}</div>
                      <div className="text-xs text-text2">{e.description}</div>
                      <div className="text-[10px] text-text2 mt-1">{e.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'Critical Path' && (
          <MilestoneTracker milestones={project.milestones} />
        )}

        {activeTab === 'Scope' && (
          <ScopeGapMatrix items={project.scopeItems} />
        )}

        {activeTab === 'Escalations' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-text">All Escalations</h3>
            {project.escalations.length === 0 ? (
              <div className="text-sm text-text2 text-center py-8">No escalations. All clear.</div>
            ) : (
              project.escalations.map((e) => (
                <div key={e.id} className={`px-3 py-3 rounded-lg border ${
                  e.severity === 'red' ? 'bg-red/5 border-red/20' : 'bg-yellow/5 border-yellow/20'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {e.severity === 'red' ? <AlertCircle size={14} className="text-red" /> : <AlertTriangle size={14} className="text-yellow" />}
                    <span className="text-sm font-medium text-text">{e.title}</span>
                    <Badge variant={e.severity === 'red' ? 'red' : 'yellow'}>{e.severity}</Badge>
                  </div>
                  <p className="text-xs text-text2">{e.description}</p>
                  <span className="text-[10px] text-text2">{e.date}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
