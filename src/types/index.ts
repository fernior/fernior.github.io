export type Language = 'es' | 'en';
export type Theme = 'dark' | 'light';

export interface MetricItem {
  id: string;
  metric: string;
  prefix?: string;
  suffix?: string;
  numberValue?: number;
  highlightText?: string;
  title: string;
  description: string;
  organization: string;
  badge: string;
  accentColor: 'cyan' | 'gold' | 'crimson';
}

export interface PillarItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  metrics: string[];
  toolsAndFrameworks: string[];
  executiveFocus: string;
}

export interface CaseStudyItem {
  id: string;
  sector: string;
  organization: string;
  role: string;
  period: string;
  headline: string;
  challenge: string;
  strategy: string;
  results: string[];
  kpis: { label: string; value: string }[];
  tags: string[];
}

export interface TimelineItem {
  id: string;
  period: string;
  role: string;
  company: string;
  sector: string;
  location: string;
  highlight: string;
  description: string[];
  coreCompetencies: string[];
  current?: boolean;
}

export interface CredentialItem {
  id: string;
  type: 'degree' | 'certification' | 'executive';
  title: string;
  institution: string;
  year?: string;
  status?: string;
  licenseId?: string;
  badgeUrl?: string;
  verificationLink?: string;
  category: string;
}
