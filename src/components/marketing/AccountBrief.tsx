import { Building2, MapPin, DollarSign, Users, Briefcase } from 'lucide-react';
import { Badge } from '@/components/shared/Badge';
import type { Account } from '@/types';

interface AccountBriefProps {
  account: Account;
}

export function AccountBrief({ account }: AccountBriefProps) {
  return (
    <div className="space-y-5">
      {/* Company Overview */}
      <section>
        <h3 className="text-xs font-semibold text-text2 uppercase tracking-wide mb-3">Company Overview</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Building2 size={14} className="text-text2 shrink-0" />
            <span className="text-text2">Industry:</span>
            <span className="text-text">Real Estate Development</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={14} className="text-text2 shrink-0" />
            <span className="text-text2">Location:</span>
            <span className="text-text">{account.city}, {account.state}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users size={14} className="text-text2 shrink-0" />
            <span className="text-text2">Employees:</span>
            <span className="text-text">{account.employee_count}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign size={14} className="text-text2 shrink-0" />
            <span className="text-text2">Revenue:</span>
            <span className="text-text">{account.annual_revenue}</span>
          </div>
        </div>
      </section>

      {/* Intel Brief */}
      <section>
        <h3 className="text-xs font-semibold text-text2 uppercase tracking-wide mb-2">Intel Brief</h3>
        <div className="text-sm text-text leading-relaxed whitespace-pre-line bg-surface2/50 rounded-lg p-3">
          {account.intel_brief}
        </div>
      </section>

      {/* Key Contacts */}
      <section>
        <h3 className="text-xs font-semibold text-text2 uppercase tracking-wide mb-3">Key Contacts</h3>
        <div className="space-y-2">
          {account.key_contacts.map((contact) => (
            <div key={contact.email} className="flex items-center justify-between bg-surface2/50 rounded-lg px-3 py-2">
              <div>
                <div className="text-sm font-medium text-text">{contact.name}</div>
                <div className="text-xs text-text2">{contact.title}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-accent2">{contact.email}</div>
                <div className="text-xs text-text2">{contact.phone}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Projects */}
      <section>
        <h3 className="text-xs font-semibold text-text2 uppercase tracking-wide mb-2">Active Projects</h3>
        <div className="flex items-center gap-2 text-sm">
          <Briefcase size={14} className="text-text2" />
          <span className="text-text">{account.recent_projects}</span>
        </div>
      </section>

      {/* Modular Openness */}
      <section>
        <h3 className="text-xs font-semibold text-text2 uppercase tracking-wide mb-2">Modular Openness</h3>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-surface2">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${account.modular_openness}%` }}
            />
          </div>
          <Badge variant={account.modular_openness >= 70 ? 'green' : account.modular_openness >= 50 ? 'yellow' : 'red'}>
            {account.modular_openness}%
          </Badge>
        </div>
      </section>
    </div>
  );
}
