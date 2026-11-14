import { ArrowDown, ArrowUp, Eye, EyeOff } from 'lucide-react';
import type { PortfolioSectionId, SectionConfig } from '../../types/portfolio';

interface LayoutOrderEditorProps {
  sections: SectionConfig[];
  onMoveSection: (index: number, direction: 'up' | 'down') => void;
  onToggleSection: (id: PortfolioSectionId) => void;
}

export function LayoutOrderEditor({
  sections,
  onMoveSection,
  onToggleSection,
}: LayoutOrderEditorProps) {
  const visibleCount = sections.filter((s) => s.visible).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-sm font-semibold text-[#0B1A12] dark:text-[#F1F7F3]">
            Page Section Order
          </h3>
          <p className="mt-0.5 text-xs text-[#5A7264] dark:text-[#85A190]">
            Rearrange sections vertically or toggle visibility.
          </p>
        </div>
        <span className="text-xs font-medium text-[#3B5245] tabular-nums dark:text-[#B3C7BA]">
          {visibleCount} / {sections.length} active
        </span>
      </div>

      <ul className="divide-y divide-[#D5E0D9] rounded-xl border border-[#D5E0D9] bg-[#F7FAF8] dark:divide-[#1F382A] dark:border-[#1F382A] dark:bg-[#07110C]">
        {sections.map((section, index) => (
          <li
            key={section.id}
            className="flex items-center justify-between gap-3 px-4 py-3.5"
          >
            <div className="min-w-0">
              <p
                className={`text-sm font-semibold ${
                  section.visible
                    ? 'text-[#0B1A12] dark:text-[#F1F7F3]'
                    : 'text-[#85A190] line-through dark:text-[#5A7264]'
                }`}
              >
                <span className="mr-2 text-xs font-medium text-[#5A7264] tabular-nums dark:text-[#85A190]">
                  0{index + 1}.
                </span>
                {section.label}
              </p>
              <p className="mt-0.5 truncate text-xs text-[#5A7264] dark:text-[#85A190]">
                {section.description}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() => onMoveSection(index, 'up')}
                disabled={index === 0}
                aria-label={`Move ${section.label} up`}
                className="inline-flex min-h-[36px] min-w-[36px] cursor-pointer items-center justify-center rounded-lg border border-[#D5E0D9] bg-white text-[#0B1A12] transition-colors hover:border-[#057A55] disabled:cursor-not-allowed disabled:opacity-35 dark:border-[#1F382A] dark:bg-[#0E1C14] dark:text-[#F1F7F3] dark:hover:border-[#34D399]"
              >
                <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onMoveSection(index, 'down')}
                disabled={index === sections.length - 1}
                aria-label={`Move ${section.label} down`}
                className="inline-flex min-h-[36px] min-w-[36px] cursor-pointer items-center justify-center rounded-lg border border-[#D5E0D9] bg-white text-[#0B1A12] transition-colors hover:border-[#057A55] disabled:cursor-not-allowed disabled:opacity-35 dark:border-[#1F382A] dark:bg-[#0E1C14] dark:text-[#F1F7F3] dark:hover:border-[#34D399]"
              >
                <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onToggleSection(section.id)}
                aria-pressed={section.visible}
                aria-label={`${section.visible ? 'Hide' : 'Show'} ${section.label} section`}
                className={`inline-flex min-h-[36px] cursor-pointer items-center gap-1 rounded-lg border px-2.5 text-xs font-medium transition-colors ${
                  section.visible
                    ? 'border-[#D5E0D9] bg-white text-[#057A55] hover:border-[#057A55] dark:border-[#1F382A] dark:bg-[#0E1C14] dark:text-[#34D399]'
                    : 'border-[#D5E0D9] bg-[#EDF3EF] text-[#5A7264] hover:text-[#0B1A12] dark:border-[#1F382A] dark:bg-[#13261C] dark:text-[#85A190]'
                }`}
              >
                {section.visible ? (
                  <>
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Shown</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Hidden</span>
                  </>
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
