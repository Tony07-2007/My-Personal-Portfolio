import { Moon, Sun } from 'lucide-react';
import type { AccentColorKey, PortfolioProfile } from '../../types/portfolio';
import type { ThemeMode } from '../../utils/portfolioLogic';

interface IdentityEditorProps {
  draft: PortfolioProfile;
  theme: ThemeMode;
  onChangeDraft: (updater: (prev: PortfolioProfile) => PortfolioProfile) => void;
  onSetTheme: (theme: ThemeMode) => void;
}

const ACCENT_OPTIONS: { key: AccentColorKey; label: string; swatch: string }[] = [
  { key: 'forest', label: 'Emerald', swatch: 'bg-[#057A55]' },
  { key: 'cobalt', label: 'Cobalt', swatch: 'bg-[#2563EB]' },
  { key: 'cinnabar', label: 'Cinnabar', swatch: 'bg-[#E11D48]' },
  { key: 'ink', label: 'Pine Ink', swatch: 'bg-[#0B1A12]' },
];

const INPUT_CLASSES =
  'mt-1 min-h-[40px] w-full rounded-lg border border-[#C6D7CD] bg-[#F7FAF8] px-3 py-2 text-sm text-[#0B1A12] focus:border-[#057A55] focus:bg-white focus:outline-none dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#F1F7F3] dark:focus:border-[#34D399] dark:focus:bg-[#13261C]';

export function IdentityEditor({
  draft,
  theme,
  onChangeDraft,
  onSetTheme,
}: IdentityEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <span className="block text-xs font-medium text-[#3B5245] dark:text-[#B3C7BA]">
          Appearance
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onSetTheme('light')}
            aria-pressed={theme === 'light'}
            className={`flex min-h-[40px] cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
              theme === 'light'
                ? 'border-[#057A55] bg-[#EDF3EF] text-[#0B1A12] dark:border-[#34D399] dark:bg-[#13261C] dark:text-[#F1F7F3]'
                : 'border-[#D5E0D9] bg-white text-[#3B5245] hover:border-[#057A55] dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#B3C7BA]'
            }`}
          >
            <Sun className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Light Mode</span>
          </button>
          <button
            type="button"
            onClick={() => onSetTheme('dark')}
            aria-pressed={theme === 'dark'}
            className={`flex min-h-[40px] cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
              theme === 'dark'
                ? 'border-[#057A55] bg-[#EDF3EF] text-[#0B1A12] dark:border-[#34D399] dark:bg-[#13261C] dark:text-[#F1F7F3]'
                : 'border-[#D5E0D9] bg-white text-[#3B5245] hover:border-[#057A55] dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#B3C7BA]'
            }`}
          >
            <Moon className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Dark Mode</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="edit-name"
            className="block text-xs font-medium text-[#3B5245] dark:text-[#B3C7BA]"
          >
            Full Name
          </label>
          <input
            id="edit-name"
            type="text"
            value={draft.name}
            onChange={(e) =>
              onChangeDraft((prev) => ({ ...prev, name: e.target.value }))
            }
            className={INPUT_CLASSES}
          />
        </div>

        <div>
          <label
            htmlFor="edit-location"
            className="block text-xs font-medium text-[#3B5245] dark:text-[#B3C7BA]"
          >
            Location
          </label>
          <input
            id="edit-location"
            type="text"
            value={draft.location}
            onChange={(e) =>
              onChangeDraft((prev) => ({ ...prev, location: e.target.value }))
            }
            className={INPUT_CLASSES}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="edit-role"
          className="block text-xs font-medium text-[#3B5245] dark:text-[#B3C7BA]"
        >
          Role / Discipline
        </label>
        <input
          id="edit-role"
          type="text"
          value={draft.role}
          onChange={(e) =>
            onChangeDraft((prev) => ({ ...prev, role: e.target.value }))
          }
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label
          htmlFor="edit-headline"
          className="block text-xs font-medium text-[#3B5245] dark:text-[#B3C7BA]"
        >
          Hero Headline
        </label>
        <input
          id="edit-headline"
          type="text"
          value={draft.headline}
          onChange={(e) =>
            onChangeDraft((prev) => ({ ...prev, headline: e.target.value }))
          }
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <label
          htmlFor="edit-lead"
          className="block text-xs font-medium text-[#3B5245] dark:text-[#B3C7BA]"
        >
          Hero Lead Copy
        </label>
        <textarea
          id="edit-lead"
          rows={2}
          value={draft.leadCopy}
          onChange={(e) =>
            onChangeDraft((prev) => ({ ...prev, leadCopy: e.target.value }))
          }
          className="mt-1 w-full rounded-lg border border-[#C6D7CD] bg-[#F7FAF8] px-3 py-2 text-sm text-[#0B1A12] focus:border-[#057A55] focus:bg-white focus:outline-none dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#F1F7F3] dark:focus:border-[#34D399] dark:focus:bg-[#13261C]"
        />
      </div>

      <div>
        <label
          htmlFor="edit-about-intro"
          className="block text-xs font-medium text-[#3B5245] dark:text-[#B3C7BA]"
        >
          Practice Bio
        </label>
        <textarea
          id="edit-about-intro"
          rows={2}
          value={draft.aboutIntro}
          onChange={(e) =>
            onChangeDraft((prev) => ({ ...prev, aboutIntro: e.target.value }))
          }
          className="mt-1 w-full rounded-lg border border-[#C6D7CD] bg-[#F7FAF8] px-3 py-2 text-sm text-[#0B1A12] focus:border-[#057A55] focus:bg-white focus:outline-none dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#F1F7F3] dark:focus:border-[#34D399] dark:focus:bg-[#13261C]"
        />
      </div>

      <div>
        <label
          htmlFor="edit-email"
          className="block text-xs font-medium text-[#3B5245] dark:text-[#B3C7BA]"
        >
          Contact Email
        </label>
        <input
          id="edit-email"
          type="email"
          value={draft.email}
          onChange={(e) =>
            onChangeDraft((prev) => ({ ...prev, email: e.target.value }))
          }
          className={INPUT_CLASSES}
        />
      </div>

      <div>
        <span className="block text-xs font-medium text-[#3B5245] dark:text-[#B3C7BA]">
          Accent Color
        </span>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {ACCENT_OPTIONS.map((opt) => {
            const selected = draft.accent === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() =>
                  onChangeDraft((prev) => ({ ...prev, accent: opt.key }))
                }
                aria-pressed={selected}
                className={`flex min-h-[40px] cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                  selected
                    ? 'border-[#057A55] bg-[#EDF3EF] text-[#0B1A12] dark:border-[#34D399] dark:bg-[#13261C] dark:text-[#F1F7F3]'
                    : 'border-[#D5E0D9] bg-white text-[#3B5245] hover:border-[#057A55] dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#B3C7BA]'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rounded-sm ${opt.swatch}`}
                />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
