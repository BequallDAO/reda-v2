import type { Account, Deal } from '@/types';

interface NextAction {
  message: string;
  assignee: string;
  actions: { label: string; variant: 'primary' | 'secondary' | 'ghost' }[];
}

export function getNextAction(account: Account, deal?: Deal): NextAction {
  if (deal) {
    return getDealNextAction(deal, account);
  }
  return getAccountNextAction(account);
}

function getAccountNextAction(account: Account): NextAction {
  switch (account.stage) {
    case 'enrichment_needed':
      return {
        message: `Tucker needs to complete enrichment for ${account.company_name}. Missing: ${account.enrichment_status === 'partial' ? 'email verification, recent projects' : 'company intel, key contacts, email'}.`,
        assignee: 'Tucker',
        actions: [
          { label: 'Start Enrichment', variant: 'primary' },
          { label: 'Skip', variant: 'ghost' },
        ],
      };
    case 'enriched':
      return {
        message: `ICP score needs review for ${account.company_name}. Current score: ${account.icp_score}. Run full scoring to determine call-readiness.`,
        assignee: 'Tucker',
        actions: [
          { label: 'Run Scoring', variant: 'primary' },
          { label: 'View Score', variant: 'secondary' },
        ],
      };
    case 'call_ready':
      return {
        message: `Robert should call ${account.contact_name} at ${account.company_name} to discuss ${account.recent_projects}. Last signal: ${account.last_signal_type} on ${account.last_signal_date}.`,
        assignee: 'Robert',
        actions: [
          { label: 'Mark Called', variant: 'primary' },
          { label: 'Schedule', variant: 'secondary' },
          { label: 'Skip', variant: 'ghost' },
        ],
      };
    default:
      return {
        message: `Review ${account.company_name} and determine next enrichment step. Current stage: ${account.stage}.`,
        assignee: 'Tucker',
        actions: [
          { label: 'Review', variant: 'primary' },
        ],
      };
  }
}

function getDealNextAction(deal: Deal, account: Account): NextAction {
  if (deal.stage <= 2) {
    return {
      message: `Tucker needs to complete enrichment for ${deal.accountName}. Missing: email verification, recent projects.`,
      assignee: 'Tucker',
      actions: [
        { label: 'Start Enrichment', variant: 'primary' },
        { label: 'Skip', variant: 'ghost' },
      ],
    };
  }
  if (deal.stage === 3) {
    return {
      message: `ICP score needed for ${deal.accountName}. Run scoring to qualify this deal before outreach.`,
      assignee: 'Tucker',
      actions: [
        { label: 'Run Scoring', variant: 'primary' },
        { label: 'View Account', variant: 'secondary' },
      ],
    };
  }
  if (deal.stage === 4) {
    return {
      message: `Robert: Call ${deal.contact.name} at ${deal.accountName}. Pitch angle: ${account.recent_projects}. Last signal: ${account.last_signal_type} (${account.last_signal_date}).`,
      assignee: 'Robert',
      actions: [
        { label: 'Mark Called', variant: 'primary' },
        { label: 'Schedule', variant: 'secondary' },
        { label: 'Skip', variant: 'ghost' },
      ],
    };
  }
  if (deal.stage >= 5 && deal.stage < 10) {
    return {
      message: `Follow up sent to ${deal.contact.name} at ${deal.accountName}. ${deal.nextAction}. Check for reply and advance deal.`,
      assignee: 'Robert',
      actions: [
        { label: 'Log Activity', variant: 'primary' },
        { label: 'Send Follow-up', variant: 'secondary' },
        { label: 'Schedule Call', variant: 'ghost' },
      ],
    };
  }
  // Stage 10+
  return {
    message: `Create MAP (Mutual Action Plan) for ${deal.accountName}. Deal value: ${deal.value}. Upload to Ops Engine for project coordination.`,
    assignee: 'Robert',
    actions: [
      { label: 'Create MAP', variant: 'primary' },
      { label: 'Move to Ops', variant: 'secondary' },
    ],
  };
}
