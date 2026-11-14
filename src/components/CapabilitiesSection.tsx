import { Download } from 'lucide-react';
import type { CapabilityItem, PortfolioData } from '../types/portfolio';
import {
  formatPrintableResumeText,
  getAccentTokens,
} from '../utils/portfolioLogic';

interface CapabilitiesSectionProps {
  data: PortfolioData;
  capabilities: CapabilityItem[];
}

export function CapabilitiesSection({
  data,
  capabilities,
}: CapabilitiesSectionProps) {
  const tokens = getAccentTokens(data.profile.accent);

  const handleDownloadResume = () => {
    const content = formatPrintableResumeText(data);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    const slug = data.profile.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    anchor.href = url;
    anchor.download = `${slug || 'portfolio'}-resume.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="capabilities"
      data-section-id="capabilities"
      className="border-b border-[#D5E0D9] bg-[#F7FAF8] py-20 transition-colors duration-200 lg:py-24 dark:border-[#1F382A] dark:bg-[#07110C]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-editorial text-lg italic text-[#3B5245] dark:text-[#B3C7BA]">
              About Me
            </p>
            <h2
              className="font-display mt-1 text-3xl font-bold tracking-tight text-[#0B1A12] dark:text-[#F1F7F3] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Where thoughtful design meets clean code.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#3B5245] dark:text-[#B3C7BA]">
              {data.profile.aboutIntro}
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#3B5245] dark:text-[#B3C7BA]">
              {data.profile.aboutDetail}
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleDownloadResume}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border border-[#C6D7CD] bg-white px-5 py-2.5 text-sm font-medium text-[#0B1A12] transition-colors hover:border-[#057A55] hover:bg-[#EDF3EF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#057A55] dark:border-[#1F382A] dark:bg-[#0E1C14] dark:text-[#F1F7F3] dark:hover:border-[#34D399] dark:hover:bg-[#13261C]"
              >
                <Download
                  className="h-4 w-4 text-[#3B5245] dark:text-[#B3C7BA]"
                  aria-hidden="true"
                />
                <span>Download Resume</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-[#D5E0D9] border-t border-b border-[#D5E0D9] dark:divide-[#1F382A] dark:border-[#1F382A]">
              {capabilities.map((item) => (
                <div
                  key={item.number}
                  className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="sm:col-span-4">
                    <h3 className="font-display text-base font-semibold text-[#0B1A12] dark:text-[#F1F7F3] sm:text-lg">
                      <span className={`mr-2 tabular-nums ${tokens.textAccent}`}>
                        {item.number}.{' '}
                      </span>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#3B5245] dark:text-[#B3C7BA] sm:col-span-8 sm:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
