import { ArrowUpRight } from 'lucide-react';
import type {
  AccentColorKey,
  ProjectCategory,
  ProjectItem,
} from '../types/portfolio';
import {
  filterProjects,
  getAccentTokens,
  getCategoryCount,
} from '../utils/portfolioLogic';
import { SafeImage } from './SafeImage';

interface WorkSectionProps {
  projects: ProjectItem[];
  activeCategory: ProjectCategory;
  accent: AccentColorKey;
  onSelectCategory: (category: ProjectCategory) => void;
  onOpenProject: (project: ProjectItem) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All',
  'Product Design',
  'Design Systems',
  'Engineering',
];

export function WorkSection({
  projects,
  activeCategory,
  accent,
  onSelectCategory,
  onOpenProject,
}: WorkSectionProps) {
  const filtered = filterProjects(projects, activeCategory);
  const tokens = getAccentTokens(accent);

  return (
    <section
      id="work"
      className="border-b border-[#D5E0D9] bg-[#F7FAF8] py-20 transition-colors duration-200 lg:py-24 dark:border-[#1F382A] dark:bg-[#07110C]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 border-b border-[#D5E0D9] pb-8 md:flex-row md:items-end dark:border-[#1F382A]">
          <div>
            <p className="font-editorial text-lg italic text-[#3B5245] dark:text-[#B3C7BA]">
              Personal &amp; Client Highlights
            </p>
            <h2 className="font-display mt-1 text-3xl font-bold tracking-tight text-[#0B1A12] dark:text-[#F1F7F3] sm:text-4xl">
              Featured Projects
            </h2>
          </div>

          {/* Functional Segmented Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter projects by discipline"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[#D5E0D9] bg-white p-1 dark:border-[#1F382A] dark:bg-[#0E1C14]"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              const count = getCategoryCount(projects, category);
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectCategory(category)}
                  className={`min-h-[40px] shrink-0 cursor-pointer whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#057A55] sm:text-sm ${
                    isActive
                      ? `${tokens.activeTabBg} shadow-xs`
                      : 'text-[#3B5245] hover:text-[#0B1A12] dark:text-[#B3C7BA] dark:hover:text-[#F1F7F3]'
                  }`}
                >
                  <span>{category === 'All' ? 'All Work' : category}</span>
                  <span
                    className={`ml-1.5 tabular-nums ${
                      isActive
                        ? 'text-white/80'
                        : 'text-[#5A7264] dark:text-[#85A190]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-[#D5E0D9] bg-[#F7FAF8] px-6 py-16 text-center dark:border-[#1F382A] dark:bg-[#07110C]">
            <h3 className="font-display text-lg font-semibold text-[#0B1A12] dark:text-[#F1F7F3]">
              No projects in {activeCategory} yet
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#3B5245] dark:text-[#B3C7BA]">
              Switch back to all work to browse every case study.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => onSelectCategory('All')}
                className="min-h-[40px] cursor-pointer whitespace-nowrap rounded-lg border border-[#C6D7CD] bg-white px-4 py-2 text-sm font-medium text-[#0B1A12] hover:bg-[#EDF3EF] dark:border-[#1F382A] dark:bg-[#0E1C14] dark:text-[#F1F7F3] dark:hover:bg-[#13261C]"
              >
                Show All Work
              </button>
            </div>
          </div>
        ) : (
          <div
            data-testid="projects-grid"
            className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {filtered.map((project, index) => {
              const isWide =
                activeCategory === 'All' &&
                project.featured &&
                (index === 0 || index === filtered.length - 1);

              return (
                <article
                  key={project.id}
                  className={`group flex flex-col justify-between rounded-2xl border border-[#D5E0D9] bg-white transition-colors duration-200 hover:border-[#057A55] dark:border-[#1F382A] dark:bg-[#0E1C14] dark:hover:border-[#34D399] ${
                    isWide ? 'md:col-span-2' : 'col-span-1'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onOpenProject(project)}
                    aria-label={`Inspect case study: ${project.title}`}
                    className="flex h-full w-full cursor-pointer flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#057A55] dark:focus-visible:outline-[#34D399]"
                  >
                    <div
                      className={`w-full overflow-hidden rounded-t-2xl border-b border-[#D5E0D9] bg-[#EDF3EF] dark:border-[#1F382A] dark:bg-[#07110C] ${
                        isWide
                          ? 'aspect-[16/9] md:aspect-[24/9] md:max-h-[400px]'
                          : 'aspect-[4/3]'
                      }`}
                    >
                      <div className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                        <SafeImage
                          src={project.imageUrl}
                          alt={project.imageAlt}
                          fallbackTitle={project.title}
                          fallbackSubtitle={`${project.category} · ${project.year}`}
                        />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-display text-xl font-semibold tracking-tight text-[#0B1A12] dark:text-[#F1F7F3] sm:text-2xl">
                            {project.title}
                          </h3>
                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#D5E0D9] bg-white text-[#3B5245] transition-colors group-hover:border-[#057A55] group-hover:text-[#057A55] dark:border-[#1F382A] dark:bg-[#0E1C14] dark:text-[#B3C7BA] dark:group-hover:border-[#34D399] dark:group-hover:text-[#34D399]">
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </div>

                        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-[#3B5245] dark:text-[#B3C7BA] sm:text-base">
                          {project.summary}
                        </p>
                      </div>

                      {/* Zero-pill clean inline metadata */}
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#D5E0D9] pt-4 text-xs text-[#5A7264] dark:border-[#1F382A] dark:text-[#85A190] sm:text-sm">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-[#0B1A12] dark:text-[#F1F7F3]">
                            {project.category}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{project.client}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{project.year}</span>
                        </div>
                        <span className="tabular-nums text-[#3B5245] dark:text-[#B3C7BA]">
                          {project.readTime}
                        </span>
                      </div>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
