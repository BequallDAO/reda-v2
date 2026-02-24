export interface Account {
  id: string;
  company_name: string;
  tier: number;
  icp_score: number;
  stage: string;
  call_ready: boolean;
  enrichment_status: 'pending' | 'partial' | 'complete';
  contact_name: string;
  contact_title: string;
  contact_email: string;
  contact_phone: string;
  city: string;
  state: string;
  employee_count: number;
  annual_revenue: string;
  recent_projects: string;
  modular_openness: number;
  intel_brief: string;
  outreach_draft: string;
  last_signal_date: string;
  last_signal_type: string;
  icp_breakdown: ICPBreakdown;
  key_contacts: Contact[];
}

export interface ICPBreakdown {
  company_size: number;
  modular_openness: number;
  project_pipeline: number;
  geographic_fit: number;
  decision_authority: number;
  timing_urgency: number;
}

export interface Contact {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
}

export interface Signal {
  id: string;
  accountId: string;
  accountName: string;
  type: 'rfp' | 'hiring' | 'permit' | 'news' | 'funding' | 'partnership';
  title: string;
  description: string;
  date: string;
  strength: 'strong' | 'moderate' | 'weak';
}

export interface Deal {
  id: string;
  accountId: string;
  accountName: string;
  stage: number;
  route: 'A' | 'B';
  owner: string;
  value: string;
  lastActivity: string;
  nextAction: string;
  contact: Contact;
  brief: string;
  memo: string;
}

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  enrolled: number;
  opened: number;
  replied: number;
  meetingsBooked: number;
  steps: CampaignStep[];
  createdAt: string;
}

export interface CampaignStep {
  id: string;
  type: 'email' | 'linkedin' | 'call';
  dayOffset: number;
  subject: string;
  content: string;
}

export interface OpsProject {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'on-hold' | 'complete';
  phase: string;
  units: number;
  gcPartner: string;
  permittingStatus: 'approved' | 'pending' | 'blocked';
  factoryAlignment: 'aligned' | 'gap' | 'critical';
  escalations: Escalation[];
  milestones: Milestone[];
  scopeItems: ScopeItem[];
}

export interface Escalation {
  id: string;
  severity: 'red' | 'yellow';
  title: string;
  description: string;
  date: string;
}

export interface Milestone {
  id: string;
  name: string;
  date: string;
  status: 'complete' | 'on-track' | 'at-risk' | 'overdue';
}

export interface ScopeItem {
  id: string;
  category: string;
  item: string;
  factoryScope: boolean;
  gcScope: boolean;
  gap: boolean;
  notes: string;
}

export type Engine = 'marketing' | 'sales' | 'campaigns' | 'ops';
