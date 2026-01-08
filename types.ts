
export interface ProvisionalSuspension {
  date: string;
  respondent: string;
  details: string;
  status: string;
  imageUrl?: string;
}

export interface FirstInstanceDecision {
  date: string;
  respondent: string;
  violation: string;
  outcome: string;
  imageUrl?: string;
}

export interface PendingAppeal {
  date_of_appeal: string;
  appellant: string;
  summary: string;
  status: string;
  imageUrl?: string;
}

export interface AppealDecision {
  date: string;
  respondent: string;
  adrv: string;
  outcome: string;
  imageUrl?: string;
}

export interface IntegrityData {
  provisional_suspensions: ProvisionalSuspension[];
  first_instance_decisions: FirstInstanceDecision[];
  pending_appeals: PendingAppeal[];
  appeal_decisions: AppealDecision[];
}

export type TabType = 'overview' | 'suspensions' | 'decisions' | 'appeals' | 'history';
