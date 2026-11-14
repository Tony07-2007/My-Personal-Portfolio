import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import type { MetricStat, PortfolioProfile } from '../types/portfolio';
import { getAccentTokens } from '../utils/portfolioLogic';

const HERO_VIDEO_SRC = '/assets/videos/hero-handshake-project.mp4';
const HERO_VIDEO_POSTER = '/assets/videos/hero-handshake-poster.jpg';

interface HeroSectionProps {
  profile: PortfolioProfile;
  metrics: MetricStat[];
  onExploreWork: () => void;
}

export function HeroSection({
  profile,
  metrics,
  onExploreWork,
}: HeroSectionProps) {
  const tokens = getAccentTokens(profile.accent);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => {
      if (mediaQuery.matches) {
        videoEl.pause();
      } else {
        void videoEl.play().catch(() => {
          // Autoplay may be deferred until browser media readiness.
        });
      }
    };

    syncMotionPreference();
    mediaQuery.addEventListener('change', syncMotionPreference);
    return () => {
      mediaQuery.removeEventListener('change', syncMotionPreference);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[#D5E0D9] bg-[#0B1A12] transition-colors duration-200 dark:border-[#1F382A] dark:bg-[#07110C]"
    >
      <div className="relative overflow-hidden">
        {/* Background Video Layer: Clear, vivid handshake over project plan */}
        {!videoFailed && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <video
              ref={videoRef}
              data-testid="hero-bg-video"
              src={HERO_VIDEO_SRC}
              poster={HERO_VIDEO_POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onError={() => setVideoFailed(true)}
              className="h-full w-full object-cover object-center contrast-[1.03]"
            />
            {/* Light directional scrims keeping the video vivid while ensuring >= 4.5:1 text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#06130C]/68 via-[#06130C]/38 to-[#06130C]/14 dark:from-[#040E09]/74 dark:via-[#040E09]/44 dark:to-[#040E09]/18" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06130C]/72 via-transparent to-[#06130C]/20 dark:from-[#040E09]/76 dark:via-transparent dark:to-[#040E09]/24" />
          </div>
        )}

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-16 lg:pt-24 lg:pb-20">
          <div className="max-w-2xl">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-[#E3EFE7] drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]">
              <span className="whitespace-nowrap">{profile.role}</span>
              <span aria-hidden="true" className="text-[#9AB5A4]">
                ·
              </span>
              <span className="whitespace-nowrap">{profile.location}</span>
              <span aria-hidden="true" className="text-[#9AB5A4]">
                ·
              </span>
              <span className="whitespace-nowrap font-semibold text-[#6EE7B7]">
                {profile.availability}
              </span>
            </p>

            <h1
              className="font-display mt-5 max-w-2xl text-[clamp(2.5rem,4.6vw,3.95rem)] font-bold leading-[1.06] tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]"
              style={{ textWrap: 'balance' }}
            >
              {profile.headline}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#EFF6F1] drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)] sm:text-lg">
              {profile.leadCopy}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreWork}
                className={`inline-flex min-h-[44px] shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg px-6 py-3 text-sm font-medium shadow-md transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 ${tokens.buttonBg} ${tokens.buttonHover}`}
              >
                <span>About &amp; Experience</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Full-width 4-column metric strip below hero split */}
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/25 pt-10 md:grid-cols-4 md:gap-8">
            {metrics.map((stat) => (
              <div key={stat.id} className="space-y-1">
                <p className="font-display text-3xl font-semibold tracking-tight text-white tabular-nums drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)] sm:text-4xl">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-[#E3EFE7] drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle architectural marquee divider */}
      <div
        aria-hidden="true"
        className="overflow-hidden border-t border-[#D5E0D9] bg-white py-3.5 transition-colors duration-200 dark:border-[#1F382A] dark:bg-[#0E1C14]"
      >
        <div className="marquee-track text-xs font-medium tracking-wide text-[#5A7264] dark:text-[#85A190]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-6 pr-6">
              <span>About Me</span>
              <span>·</span>
              <span>Product Design</span>
              <span>·</span>
              <span>Design Systems</span>
              <span>·</span>
              <span>Front-End Engineering</span>
              <span>·</span>
              <span>Career Journey</span>
              <span>·</span>
              <span>Selected Projects</span>
              <span>·</span>
              <span>About Me</span>
              <span>·</span>
              <span>Product Design</span>
              <span>·</span>
              <span>Design Systems</span>
              <span>·</span>
              <span>Front-End Engineering</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
