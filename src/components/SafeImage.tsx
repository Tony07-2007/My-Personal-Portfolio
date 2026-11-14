import { useState } from 'react';
import { Layers } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  className?: string;
}

export function SafeImage({
  src,
  alt,
  fallbackTitle,
  fallbackSubtitle,
  className = '',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#EDF3EF] via-[#DFEAE3] to-[#CFE0D6] p-8 text-center text-[#0B1A12] dark:from-[#0E1C14] dark:via-[#13261C] dark:to-[#193225] dark:text-[#F1F7F3] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-[#C6D7CD] bg-white/85 text-[#3B5245] dark:border-[#244131] dark:bg-[#07110C]/80 dark:text-[#B3C7BA]">
          <Layers className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="font-display text-base font-semibold tracking-tight text-[#0B1A12] dark:text-[#F1F7F3]">
          {fallbackTitle}
        </p>
        {fallbackSubtitle ? (
          <p className="mt-1 text-xs text-[#3B5245] dark:text-[#B3C7BA]">
            {fallbackSubtitle}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
