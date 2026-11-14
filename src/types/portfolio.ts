export type ProjectCategory =
  | 'All'
  | 'Product Design'
  | 'Design Systems'
  | 'Engineering';

export type AccentColorKey = 'cobalt' | 'cinnabar' | 'forest' | 'ink';

export interface MetricStat {
  id: string;
  value: string;
  label: string;
}

export interface ProjectOutcome {
  metric: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  client: string;
  role: string;
  duration: string;
  readTime: string;
  summary: string;
  challenge: string;
  solution: string;
  imageUrl: string;
  imageAlt: string;
  featured: boolean;
  deliverables: string[];
  outcomes: ProjectOutcome[];
  liveUrl?: string;
}

export interface CapabilityItem {
  number: string;
  title: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlight: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface PortfolioProfile {
  name: string;
  role: string;
  location: string;
  availability: string;
  headline: string;
  leadCopy: string;
  aboutIntro: string;
  aboutDetail: string;
  email: string;
  accent: AccentColorKey;
  heroImageUrl: string;
  heroImageAlt: string;
  githubUrl: string;
  linkedinUrl: string;
}

export type PortfolioSectionId =
  | 'work'
  | 'capabilities'
  | 'experience'
  | 'contact';

export interface SectionConfig {
  id: PortfolioSectionId;
  label: string;
  description: string;
  visible: boolean;
}

export interface PortfolioData {
  profile: PortfolioProfile;
  metrics: MetricStat[];
  projects: ProjectItem[];
  capabilities: CapabilityItem[];
  experience: ExperienceItem[];
  testimonial: Testimonial;
  sections: SectionConfig[];
}

export interface ContactFormInput {
  name: string;
  email: string;
  scope: string;
  budget: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface SubmittedInquiry extends ContactFormInput {
  id: string;
  submittedAt: string;
}
