import type {
  AccentColorKey,
  ContactFormErrors,
  ContactFormInput,
  PortfolioData,
  PortfolioSectionId,
  ProjectCategory,
  ProjectItem,
  SectionConfig,
} from '../types/portfolio';

export const PORTFOLIO_STORAGE_KEY = 'editorial_portfolio_data_v6';
export const THEME_STORAGE_KEY = 'editorial_portfolio_theme_v1';

export type ThemeMode = 'light' | 'dark';

export function parseStoredTheme(raw: string | null): ThemeMode {
  return raw === 'dark' ? 'dark' : 'light';
}

export interface AccentTokens {
  label: string;
  hex: string;
  buttonBg: string;
  buttonHover: string;
  textAccent: string;
  ringAccent: string;
  activeTabBg: string;
  subtleBorder: string;
}

const ACCENT_MAP: Record<AccentColorKey, AccentTokens> = {
  cobalt: {
    label: 'Cobalt',
    hex: '#2563EB',
    buttonBg: 'bg-[#2563EB] text-white dark:bg-[#2563EB] dark:text-white',
    buttonHover: 'hover:bg-[#1D4ED8] dark:hover:bg-[#1D4ED8]',
    textAccent: 'text-[#2563EB] dark:text-[#60A5FA]',
    ringAccent: 'focus-visible:ring-[#2563EB]',
    activeTabBg: 'bg-[#0B1A12] text-white dark:bg-[#059669] dark:text-white',
    subtleBorder: 'border-[#2563EB]',
  },
  cinnabar: {
    label: 'Cinnabar',
    hex: '#E11D48',
    buttonBg: 'bg-[#E11D48] text-white dark:bg-[#E11D48] dark:text-white',
    buttonHover: 'hover:bg-[#BE123C] dark:hover:bg-[#BE123C]',
    textAccent: 'text-[#E11D48] dark:text-[#FB7185]',
    ringAccent: 'focus-visible:ring-[#E11D48]',
    activeTabBg: 'bg-[#0B1A12] text-white dark:bg-[#E11D48] dark:text-white',
    subtleBorder: 'border-[#E11D48]',
  },
  forest: {
    label: 'Emerald',
    hex: '#057A55',
    buttonBg: 'bg-[#057A55] text-white dark:bg-[#059669] dark:text-white',
    buttonHover: 'hover:bg-[#046C4E] dark:hover:bg-[#047857]',
    textAccent: 'text-[#057A55] dark:text-[#34D399]',
    ringAccent: 'focus-visible:ring-[#057A55]',
    activeTabBg: 'bg-[#057A55] text-white dark:bg-[#059669] dark:text-white',
    subtleBorder: 'border-[#057A55] dark:border-[#10B981]',
  },
  ink: {
    label: 'Pine Ink',
    hex: '#0B1A12',
    buttonBg: 'bg-[#0B1A12] text-white dark:bg-[#F1F7F3] dark:text-[#07110C]',
    buttonHover: 'hover:bg-[#1B3325] dark:hover:bg-[#D5E0D9]',
    textAccent: 'text-[#0B1A12] dark:text-[#F1F7F3]',
    ringAccent: 'focus-visible:ring-[#0B1A12]',
    activeTabBg: 'bg-[#0B1A12] text-white dark:bg-[#F1F7F3] dark:text-[#07110C]',
    subtleBorder: 'border-[#0B1A12] dark:border-[#F1F7F3]',
  },
};

export function getAccentTokens(accent: AccentColorKey): AccentTokens {
  return ACCENT_MAP[accent] ?? ACCENT_MAP.forest;
}

export function filterProjects(
  projects: ProjectItem[],
  category: ProjectCategory
): ProjectItem[] {
  if (category === 'All') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}

export function getCategoryCount(
  projects: ProjectItem[],
  category: ProjectCategory
): number {
  return filterProjects(projects, category).length;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactForm(input: ContactFormInput): {
  valid: boolean;
  errors: ContactFormErrors;
  sanitized: ContactFormInput;
} {
  const sanitized: ContactFormInput = {
    name: input.name.trim(),
    email: input.email.trim(),
    scope: input.scope.trim() || 'Product Design',
    budget: input.budget.trim() || '$15k – $30k',
    message: input.message.trim(),
  };

  const errors: ContactFormErrors = {};

  if (sanitized.name.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  if (!EMAIL_REGEX.test(sanitized.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (sanitized.message.length < 15) {
    errors.message =
      'Please include a brief project summary (at least 15 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  };
}

export function parseStoredPortfolio(
  raw: string | null,
  fallback: PortfolioData
): PortfolioData {
  if (!raw) {
    return fallback;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<PortfolioData>;
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      !parsed.profile ||
      typeof parsed.profile.name !== 'string' ||
      !Array.isArray(parsed.projects)
    ) {
      return fallback;
    }

    return {
      profile: {
        ...fallback.profile,
        ...parsed.profile,
      },
      metrics: Array.isArray(parsed.metrics) ? parsed.metrics : fallback.metrics,
      projects: parsed.projects,
      capabilities: Array.isArray(parsed.capabilities)
        ? parsed.capabilities
        : fallback.capabilities,
      experience: Array.isArray(parsed.experience)
        ? parsed.experience
        : fallback.experience,
      testimonial: parsed.testimonial ?? fallback.testimonial,
      sections: mergeSections(parsed.sections, fallback.sections),
    };
  } catch {
    return fallback;
  }
}

function mergeSections(
  stored: SectionConfig[] | undefined,
  fallback: SectionConfig[]
): SectionConfig[] {
  if (!Array.isArray(stored) || stored.length === 0) {
    return fallback;
  }
  const fallbackMap = new Map(fallback.map((s) => [s.id, s]));
  const seen = new Set<PortfolioSectionId>();
  const merged: SectionConfig[] = [];

  for (const item of stored) {
    if (item && fallbackMap.has(item.id) && !seen.has(item.id)) {
      const base = fallbackMap.get(item.id)!;
      merged.push({
        ...base,
        visible: typeof item.visible === 'boolean' ? item.visible : base.visible,
      });
      seen.add(item.id);
    }
  }

  for (const base of fallback) {
    if (!seen.has(base.id)) {
      merged.push(base);
    }
  }

  return merged;
}

export function reorderList<T>(
  items: T[],
  index: number,
  direction: 'up' | 'down'
): T[] {
  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (
    index < 0 ||
    index >= items.length ||
    targetIndex < 0 ||
    targetIndex >= items.length
  ) {
    return items;
  }
  const copy = [...items];
  const [moved] = copy.splice(index, 1);
  copy.splice(targetIndex, 0, moved);
  return copy;
}

export function toggleSectionVisibility(
  sections: SectionConfig[],
  id: PortfolioSectionId
): SectionConfig[] {
  return sections.map((section) =>
    section.id === id ? { ...section, visible: !section.visible } : section
  );
}

export function updateProjectItem(
  projects: ProjectItem[],
  id: string,
  patch: Partial<ProjectItem>
): ProjectItem[] {
  return projects.map((project) =>
    project.id === id ? { ...project, ...patch } : project
  );
}

export function createProjectItem(input: {
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  client: string;
  summary: string;
  challenge?: string;
  solution?: string;
}): ProjectItem {
  const cleanTitle = input.title.trim();
  const slug = cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return {
    id: `${slug || 'project'}-${Date.now()}`,
    title: cleanTitle,
    category: input.category,
    year: input.year.trim() || '2026',
    client: input.client.trim() || 'Independent Commission',
    role: 'Lead Designer & Engineer',
    duration: '8 weeks',
    readTime: '4 min case study',
    summary: input.summary.trim(),
    challenge:
      input.challenge?.trim() ||
      'Streamlining fragmented user workflows into a unified, responsive interface without sacrificing depth or control.',
    solution:
      input.solution?.trim() ||
      'Designed and built a modular component architecture paired with clear typographic hierarchy and instant feedback.',
    imageUrl: '',
    imageAlt: `${cleanTitle} showcase preview`,
    featured: false,
    deliverables: ['Product Architecture', 'Interface Design', 'Front-End Build'],
    outcomes: [
      { metric: '2.4x', description: 'Faster completion across primary user flows' },
      { metric: '99.2%', description: 'Accessibility & contrast compliance score' },
    ],
  };
}

export function formatPrintableResumeText(data: PortfolioData): string {
  const lines: string[] = [
    data.profile.name.toUpperCase(),
    `${data.profile.role} · ${data.profile.location}`,
    `Email: ${data.profile.email}`,
    '',
    'SUMMARY',
    '-------',
    data.profile.aboutIntro,
    data.profile.aboutDetail,
    '',
    'EXPERIENCE',
    '----------',
    ...data.experience.map(
      (exp) =>
        `${exp.period} | ${exp.role} — ${exp.company} (${exp.location})\n  ${exp.highlight}`
    ),
    '',
    'CAPABILITIES',
    '------------',
    ...data.capabilities.map(
      (cap) => `${cap.number}. ${cap.title}: ${cap.description}`
    ),
    '',
    'SELECTED PROJECTS',
    '-----------------',
    ...data.projects.map(
      (proj) =>
        `${proj.title} (${proj.year}) — ${proj.category} · ${proj.client}\n  ${proj.summary}`
    ),
  ];
  return lines.join('\n');
}
