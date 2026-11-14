import type { ExperienceItem, Testimonial } from '../types/portfolio';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  testimonial: Testimonial;
}

export function ExperienceSection({
  experience,
  testimonial,
}: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      data-section-id="experience"
      className="border-b border-[#D5E0D9] bg-white py-20 transition-colors duration-200 lg:py-24 dark:border-[#1F382A] dark:bg-[#0E1C14]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-4 border-b border-[#D5E0D9] pb-8 md:flex-row md:items-end dark:border-[#1F382A]">
          <div>
            <p className="font-editorial text-lg italic text-[#3B5245] dark:text-[#B3C7BA]">
              Career Ledger
            </p>
            <h2 className="font-display mt-1 text-3xl font-bold tracking-tight text-[#0B1A12] dark:text-[#F1F7F3] sm:text-4xl">
              Experience
            </h2>
          </div>
          <p className="text-sm text-[#3B5245] tabular-nums dark:text-[#B3C7BA]">
            2014 — 2026 · {experience.length} Roles
          </p>
        </div>

        <div className="divide-y divide-[#D5E0D9] dark:divide-[#1F382A]">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="grid grid-cols-1 gap-3 py-7 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <p className="text-sm font-medium text-[#5A7264] tabular-nums dark:text-[#85A190] md:col-span-3">
                {exp.period}
              </p>
              <div className="md:col-span-4">
                <h3 className="font-display text-lg font-semibold text-[#0B1A12] dark:text-[#F1F7F3]">
                  {exp.role}
                </h3>
                <p className="mt-0.5 text-sm text-[#3B5245] dark:text-[#B3C7BA]">
                  {exp.company}
                  <span
                    aria-hidden="true"
                    className="mx-2 text-[#85A190] dark:text-[#5A7264]"
                  >
                    ·
                  </span>
                  {exp.location}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-[#3B5245] dark:text-[#B3C7BA] md:col-span-5 sm:text-base">
                {exp.highlight}
              </p>
            </div>
          ))}
        </div>

        {/* Attributable Client Testimonial adjacent to Experience */}
        <figure className="mt-12 rounded-2xl border border-[#D5E0D9] bg-[#F7FAF8] p-8 sm:p-10 dark:border-[#1F382A] dark:bg-[#13261C]">
          <blockquote className="font-editorial text-xl leading-relaxed text-[#0B1A12] dark:text-[#F1F7F3] sm:text-2xl">
            “{testimonial.quote}”
          </blockquote>
          <figcaption className="mt-6 flex flex-wrap items-center gap-2 text-sm text-[#3B5245] dark:text-[#B3C7BA]">
            <span className="font-semibold text-[#0B1A12] dark:text-[#F1F7F3]">
              {testimonial.author}
            </span>
            <span aria-hidden="true">·</span>
            <span>{testimonial.role}</span>
            <span aria-hidden="true">·</span>
            <span>{testimonial.company}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
