"use client";

import { useRef, useState } from "react";

/**
 * Theme-song toggle that lives in the nav, beside the wordmark.
 * Browsers block autoplay with sound, so it's strictly user-initiated.
 * Drop the track at /public/audio/southern-lights.mp3.
 */
export default function ThemeSong() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      // play() rejects if the file is missing or autoplay is blocked — ignore.
      audio.play().catch(() => {});
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/southern-lights.mp3"
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
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
        className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-fog transition-colors hover:border-amber/60"
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
    </>
  );
}
