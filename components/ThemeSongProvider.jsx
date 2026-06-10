"use client";

import { createContext, useContext, useRef, useState } from "react";

/**
 * Hosts the theme-song <audio> once, high in the tree (root layout), so it
 * keeps playing across client-side navigations. The nav button drives it
 * through this context instead of owning its own <audio> element.
 * Track: /public/audio/southern-lights.mp3
 */
const ThemeSongContext = createContext(null);

export function useThemeSong() {
  return useContext(ThemeSongContext);
}

export default function ThemeSongProvider({ children }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      // Rejects if the file is missing or autoplay is blocked — ignore.
      audio.play().catch(() => {});
    }
  }

  return (
    <ThemeSongContext.Provider value={{ playing, toggle }}>
      {children}
      <audio
        ref={audioRef}
        src="/audio/southern-lights.mp3"
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </ThemeSongContext.Provider>
  );
}
