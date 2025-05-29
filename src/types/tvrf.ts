export interface Metric {
  name: string;
  description: string;
  value?: number;
  unit?: string;
  status?: "good" | "warning" | "critical";
}

export interface Pillar {
  id: string;
  name: string;
  description: string;
  metrics: Metric[];
  category: "critical" | "strategic";
}

export interface TVRFData {
  pillars: Pillar[];
  lastUpdated: string;
}

export const PILLAR_CATEGORIES = {
  CRITICAL: "critical",
  STRATEGIC: "strategic",
} as const;

export const PILLAR_IDS = {
  BUSINESS_IMPACT: "business-impact",
  DEV_HEALTH: "dev-health",
  SECURITY: "security",
  CONTINUITY: "continuity",
  SALES_PIPELINE: "sales-pipeline",
  SLA_COMPLIANCE: "sla-compliance",
  COST_CONTROL: "cost-control",
  EXEC_DECISION: "exec-decision",
  POLICY_CONTROL: "policy-control",
} as const;
