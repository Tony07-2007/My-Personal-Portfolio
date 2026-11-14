import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import type { AccentColorKey, SectionConfig } from '../types/portfolio';
import { getAccentTokens, type ThemeMode } from '../utils/portfolioLogic';

interface NavbarProps {
  brandName: string;
  accent: AccentColorKey;
  sections: SectionConfig[];
  theme: ThemeMode;
  onToggleTheme: () => void;
  onPrimaryAction: () => void;
}

const SECTION_SHORT_LABELS: Record<SectionConfig['id'], string> = {
  capabilities: 'About',
  experience: 'Experience',
  work: 'Projects',
  contact: 'Contact',
};

export function Navbar({
  brandName,
  accent,
  sections,
  theme,
  onToggleTheme,
  onPrimaryAction,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const tokens = getAccentTokens(accent);

  const navLinks = sections
    .filter((s) => s.visible)
    .map((s) => ({
      href: `#${s.id}`,
      label: SECTION_SHORT_LABELS[s.id],
    }));

  const handleMobileNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative z-40 border-b border-[#D5E0D9] bg-[#F7FAF8] transition-colors duration-200 dark:border-[#1F382A] dark:bg-[#07110C]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          className="font-display shrink-0 whitespace-nowrap text-lg font-bold tracking-tight text-[#0B1A12] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#057A55] dark:text-[#F1F7F3] dark:focus-visible:outline-[#34D399]"
        >
          {brandName}
        </a>

        {/* Zone 2: Dynamic single-line navigation links matching visible sections */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap text-sm font-medium text-[#3B5245] underline-offset-4 transition-colors duration-150 hover:text-[#057A55] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#057A55] dark:text-[#B3C7BA] dark:hover:text-[#34D399] dark:focus-visible:outline-[#34D399]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Theme toggle beside Start a Project + mobile menu button */}
        <div className="flex shrink-0 items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-pressed={theme === 'dark'}
            aria-label={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
            className="inline-flex min-h-[40px] min-w-[40px] shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#C6D7CD] bg-white px-3 py-2 text-sm font-medium text-[#0B1A12] transition-colors duration-150 hover:border-[#057A55] hover:bg-[#EDF3EF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#057A55] dark:border-[#1F382A] dark:bg-[#0E1C14] dark:text-[#F1F7F3] dark:hover:border-[#34D399] dark:hover:bg-[#13261C]"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 text-[#34D399]" aria-hidden="true" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-[#057A55]" aria-hidden="true" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onPrimaryAction}
            className={`hidden min-h-[40px] shrink-0 cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 sm:inline-flex sm:items-center ${tokens.buttonBg} ${tokens.buttonHover}`}
          >
            Let’s Work
          </button>

          <button
            type="button"
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border border-[#D5E0D9] bg-white text-[#0B1A12] transition-colors hover:bg-[#EDF3EF] md:hidden dark:border-[#1F382A] dark:bg-[#0E1C14] dark:text-[#F1F7F3] dark:hover:bg-[#13261C]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[#D5E0D9] bg-white px-6 py-4 md:hidden dark:border-[#1F382A] dark:bg-[#0E1C14]"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNavClick(link.href);
                }}
                className="flex min-h-[44px] items-center text-sm font-medium text-[#0B1A12] transition-colors hover:text-[#057A55] dark:text-[#F1F7F3] dark:hover:text-[#34D399]"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onPrimaryAction();
              }}
              className={`mt-2 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium ${tokens.buttonBg} ${tokens.buttonHover}`}
            >
              Let’s Work
            </button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
