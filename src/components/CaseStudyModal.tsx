import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { AccentColorKey, ProjectItem } from '../types/portfolio';
import { getAccentTokens } from '../utils/portfolioLogic';
import { SafeImage } from './SafeImage';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  projects: ProjectItem[];
  accent: AccentColorKey;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export function CaseStudyModal({
  project,
  projects,
  accent,
  onClose,
  onSelectProject,
}: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const tokens = getAccentTokens(accent);
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#D5E0D9] bg-white shadow-2xl dark:border-[#1F382A] dark:bg-[#0E1C14]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky modal header bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#D5E0D9] bg-white/95 px-6 py-4 backdrop-blur-xs sm:px-8 dark:border-[#1F382A] dark:bg-[#0E1C14]/95">
          <div className="min-w-0">
            <p className="truncate text-xs text-[#5A7264] dark:text-[#85A190] sm:text-sm">
              <span className="font-medium text-[#0B1A12] dark:text-[#F1F7F3]">
                {project.category}
              </span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span>{project.client}</span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span className="tabular-nums">{project.year}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="inline-flex min-h-[40px] min-w-[40px] shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#D5E0D9] bg-[#F7FAF8] text-[#0B1A12] transition-colors hover:bg-[#EDF3EF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#057A55] dark:border-[#1F382A] dark:bg-[#07110C] dark:text-[#F1F7F3] dark:hover:bg-[#13261C]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <h2
            id="case-study-title"
            className="font-display text-2xl font-bold tracking-tight text-[#0B1A12] dark:text-[#F1F7F3] sm:text-3xl"
            style={{ textWrap: 'balance' }}
          >
            {project.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#3B5245] dark:text-[#B3C7BA]">
            {project.summary}
          </p>

          {/* Media Showcase */}
          <div className="mt-6 aspect-[16/9] max-h-[340px] w-full overflow-hidden rounded-xl border border-[#D5E0D9] bg-[#EDF3EF] dark:border-[#1F382A] dark:bg-[#07110C]">
            <SafeImage
              src={project.imageUrl}
              alt={project.imageAlt}
              fallbackTitle={project.title}
              fallbackSubtitle={project.client}
            />
          </div>

          {/* Project Metadata Ledger */}
          <div className="mt-8 grid grid-cols-1 gap-4 border-y border-[#D5E0D9] py-5 sm:grid-cols-3 dark:border-[#1F382A]">
            <div>
              <p className="text-xs font-medium text-[#5A7264] dark:text-[#85A190]">
                Role
              </p>
              <p className="mt-1 text-sm font-medium text-[#0B1A12] dark:text-[#F1F7F3]">
                {project.role}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#5A7264] dark:text-[#85A190]">
                Timeline
              </p>
              <p className="mt-1 text-sm font-medium text-[#0B1A12] tabular-nums dark:text-[#F1F7F3]">
                {project.duration}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#5A7264] dark:text-[#85A190]">
                Deliverables
              </p>
              <p className="mt-1 text-sm font-medium text-[#0B1A12] dark:text-[#F1F7F3]">
                {project.deliverables.join(' · ')}
              </p>
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-display text-lg font-semibold text-[#0B1A12] dark:text-[#F1F7F3]">
                The Challenge
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3B5245] dark:text-[#B3C7BA] sm:text-base">
                {project.challenge}
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-[#0B1A12] dark:text-[#F1F7F3]">
                Architecture &amp; Execution
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3B5245] dark:text-[#B3C7BA] sm:text-base">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Measurable Outcomes */}
          <div className="mt-8 rounded-xl border border-[#D5E0D9] bg-[#F7FAF8] p-6 dark:border-[#1F382A] dark:bg-[#07110C]">
            <h3 className="font-display text-sm font-semibold text-[#0B1A12] dark:text-[#F1F7F3]">
              Measured Outcomes
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {project.outcomes.map((outcome) => (
                <div key={outcome.metric + outcome.description}>
                  <p
                    className={`font-display text-2xl font-bold tracking-tight tabular-nums ${tokens.textAccent}`}
                  >
                    {outcome.metric}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#3B5245] dark:text-[#B3C7BA] sm:text-sm">
                    {outcome.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Case Study Pagination */}
          {projects.length > 1 ? (
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#D5E0D9] pt-6 dark:border-[#1F382A]">
              <button
                type="button"
                onClick={() => onSelectProject(prevProject)}
                className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border border-[#D5E0D9] bg-white px-4 py-2 text-sm font-medium text-[#0B1A12] transition-colors hover:bg-[#EDF3EF] dark:border-[#1F382A] dark:bg-[#13261C] dark:text-[#F1F7F3] dark:hover:bg-[#1A3325]"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectProject(nextProject)}
                className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border border-[#D5E0D9] bg-white px-4 py-2 text-sm font-medium text-[#0B1A12] transition-colors hover:bg-[#EDF3EF] dark:border-[#1F382A] dark:bg-[#13261C] dark:text-[#F1F7F3] dark:hover:bg-[#1A3325]"
              >
                <span>Next Project</span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
