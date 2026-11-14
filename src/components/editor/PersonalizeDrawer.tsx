import { useEffect, useState, type FormEvent } from 'react';
import { RotateCcw, X } from 'lucide-react';
import type {
  PortfolioData,
  PortfolioProfile,
  PortfolioSectionId,
  ProjectItem,
} from '../../types/portfolio';
import { getAccentTokens, type ThemeMode } from '../../utils/portfolioLogic';
import { IdentityEditor } from './IdentityEditor';
import { LayoutOrderEditor } from './LayoutOrderEditor';
import { ProjectsEditor } from './ProjectsEditor';

interface PersonalizeDrawerProps {
  isOpen: boolean;
  data: PortfolioData;
  theme: ThemeMode;
  onSetTheme: (theme: ThemeMode) => void;
  onClose: () => void;
  onSaveProfile: (profile: PortfolioProfile) => void;
  onAddProject: (project: ProjectItem) => void;
  onUpdateProject: (id: string, patch: Partial<ProjectItem>) => void;
  onRemoveProject: (id: string) => void;
  onMoveProject: (index: number, direction: 'up' | 'down') => void;
  onMoveSection: (index: number, direction: 'up' | 'down') => void;
  onToggleSection: (id: PortfolioSectionId) => void;
  onResetDefaults: () => void;
}

type EditorTab = 'identity' | 'sections' | 'projects';

export function PersonalizeDrawer({
  isOpen,
  data,
  theme,
  onSetTheme,
  onClose,
  onSaveProfile,
  onAddProject,
  onUpdateProject,
  onRemoveProject,
  onMoveProject,
  onMoveSection,
  onToggleSection,
  onResetDefaults,
}: PersonalizeDrawerProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>('identity');
  const [draft, setDraft] = useState<PortfolioProfile>(data.profile);

  useEffect(() => {
    setDraft(data.profile);
  }, [data.profile, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tokens = getAccentTokens(draft.accent);

  const handleProfileSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim()) return;
    onSaveProfile({
      ...draft,
      name: draft.name.trim(),
      role: draft.role.trim() || data.profile.role,
      headline: draft.headline.trim() || data.profile.headline,
      leadCopy: draft.leadCopy.trim() || data.profile.leadCopy,
      aboutIntro: draft.aboutIntro.trim() || data.profile.aboutIntro,
      email: draft.email.trim() || data.profile.email,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="personalize-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-lg flex-col border-l border-[#D5E0D9] bg-white shadow-2xl dark:border-[#1F382A] dark:bg-[#0E1C14]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#D5E0D9] px-6 py-4 dark:border-[#1F382A]">
          <div>
            <h2
              id="personalize-drawer-title"
              className="font-display text-lg font-bold text-[#0B1A12] dark:text-[#F1F7F3]"
            >
              Personalize Portfolio
            </h2>
            <p className="text-xs text-[#5A7264] dark:text-[#85A190]">
              Modularly edit copy, rearrange sections, and write case studies.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close personalize panel"
            className="inline-flex min-h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-lg border border-[#D5E0D9] bg-[#F7FAF8] text-[#0B1A12] hover:bg-[#EDF3EF] dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#F1F7F3] dark:hover:bg-[#13261C]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Modular Editor Tab Switcher */}
        <div className="border-b border-[#D5E0D9] bg-[#F7FAF8] px-6 py-2.5 dark:border-[#1F382A] dark:bg-[#07110C]">
          <div
            role="tablist"
            aria-label="Portfolio editor modules"
            className="grid grid-cols-3 gap-1 rounded-lg border border-[#D5E0D9] bg-white p-1 dark:border-[#1F382A] dark:bg-[#0E1C14]"
          >
            {(
              [
                { id: 'identity', label: 'Identity & Copy' },
                { id: 'sections', label: 'Sections' },
                { id: 'projects', label: 'Projects' },
              ] as const
            ).map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-[36px] cursor-pointer whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                    selected
                      ? `${tokens.activeTabBg} shadow-xs`
                      : 'text-[#3B5245] hover:text-[#0B1A12] dark:text-[#B3C7BA] dark:hover:text-[#F1F7F3]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form
            id="profile-edit-form"
            onSubmit={handleProfileSubmit}
            className={activeTab === 'identity' ? 'block' : 'hidden'}
          >
            <IdentityEditor
              draft={draft}
              theme={theme}
              onChangeDraft={setDraft}
              onSetTheme={onSetTheme}
            />
          </form>

          {activeTab === 'sections' ? (
            <LayoutOrderEditor
              sections={data.sections}
              onMoveSection={onMoveSection}
              onToggleSection={onToggleSection}
            />
          ) : null}

          {activeTab === 'projects' ? (
            <ProjectsEditor
              projects={data.projects}
              onAddProject={onAddProject}
              onUpdateProject={onUpdateProject}
              onRemoveProject={onRemoveProject}
              onMoveProject={onMoveProject}
            />
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#D5E0D9] bg-[#F7FAF8] px-6 py-4 dark:border-[#1F382A] dark:bg-[#07110C]">
          <button
            type="button"
            onClick={onResetDefaults}
            className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium text-[#3B5245] hover:bg-[#D5E0D9]/50 hover:text-[#0B1A12] dark:text-[#B3C7BA] dark:hover:bg-[#13261C] dark:hover:text-[#F1F7F3]"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="submit"
            form="profile-edit-form"
            className={`min-h-[40px] cursor-pointer whitespace-nowrap rounded-lg px-5 py-2 text-sm font-medium ${tokens.buttonBg} ${tokens.buttonHover}`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
