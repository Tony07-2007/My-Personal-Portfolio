import type { SectionConfig } from '../types/portfolio';
import type { ThemeMode } from '../utils/portfolioLogic';

interface FooterProps {
  name: string;
  githubUrl: string;
  linkedinUrl: string;
  sections: SectionConfig[];
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const SHORT_LABELS: Record<SectionConfig['id'], string> = {
  capabilities: 'About',
  experience: 'Experience',
  work: 'Projects',
  contact: 'Contact',
};

export function Footer({
  name,
  githubUrl,
  linkedinUrl,
  sections,
  theme,
  onToggleTheme,
}: FooterProps) {
  const navLinks = sections.filter((s) => s.visible && s.id !== 'contact');

  return (
    <footer className="border-t border-[#D5E0D9] bg-white py-10 transition-colors duration-200 dark:border-[#1F382A] dark:bg-[#0E1C14]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <div className="text-sm text-[#3B5245] dark:text-[#B3C7BA]">
          <span className="font-display font-semibold text-[#0B1A12] dark:text-[#F1F7F3]">
            {name}
          </span>
          <span aria-hidden="true" className="mx-2 text-[#85A190] dark:text-[#5A7264]">
            ·
          </span>
          <span className="tabular-nums">© {new Date().getFullYear()}</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-[#3B5245] dark:text-[#B3C7BA]">
          {navLinks.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="whitespace-nowrap transition-colors hover:text-[#057A55] dark:hover:text-[#34D399]"
            >
              {SHORT_LABELS[section.id]}
            </a>
          ))}
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="whitespace-nowrap transition-colors hover:text-[#057A55] dark:hover:text-[#34D399]"
          >
            GitHub
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="whitespace-nowrap transition-colors hover:text-[#057A55] dark:hover:text-[#34D399]"
          >
            LinkedIn
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            className="cursor-pointer whitespace-nowrap font-medium text-[#0B1A12] underline-offset-4 hover:text-[#057A55] hover:underline dark:text-[#F1F7F3] dark:hover:text-[#34D399]"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </footer>
  );
}
