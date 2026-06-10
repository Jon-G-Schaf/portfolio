"use client";

import { useThemeSong } from "@/components/ThemeSongProvider";

/**
 * The play/pause control in the nav. State and the actual <audio> live in
 * ThemeSongProvider (root layout) so playback survives page navigation.
 * Browsers block autoplay with sound, so it's strictly user-initiated.
 */
export default function ThemeSong() {
  const ctx = useThemeSong();
  const playing = ctx?.playing ?? false;
  const toggle = ctx?.toggle ?? (() => {});

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={
          playing
            ? "Pause theme song, Southern Lights by Sliders Club"
            : "Play theme song, Southern Lights by Sliders Club"
        }
        title={playing ? "Pause — Southern Lights" : "Play — Southern Lights"}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-fog transition-colors hover:border-amber/60"
      >
        {playing ? (
          <span className="flex items-end gap-[2px]" aria-hidden="true">
            <span className="eq-bar h-2 w-[2px] bg-current" />
            <span className="eq-bar h-3 w-[2px] bg-current [animation-delay:140ms]" />
            <span className="eq-bar h-2.5 w-[2px] bg-current [animation-delay:280ms]" />
          </span>
        ) : (
          <svg
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="currentColor"
            aria-hidden="true"
            className="ml-[1px]"
          >
            <path d="M0 0l10 6-10 6z" />
          </svg>
        )}
      </button>
      <span className="hidden font-mono text-[10px] uppercase tracking-label text-muted sm:inline">
        Vibe Setter
      </span>
    </div>
  );
}
