export interface Screenshot {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  imageUrl: string;
}

export interface EmailTemplate {
  recipient: string;
  subject: string;
  body: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  tools: string[];
  tags: string[];
  need: string;
  solution: string;
  result: string;
  highlightBadge: string;
  accentColor: string;
  screenshots: Screenshot[];
  emailTemplate?: EmailTemplate;
}

export interface BeforeAfter {
  before: string;
  after: string;
  iconName: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  badge: string;
}
