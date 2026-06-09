/**
 * A stylized stand-in for Quorum screenshots, drawn entirely with divs.
 * It sketches the app's core idea — group availability as a heatmap with one
 * recommended time — so the section looks intentional before real screenshots
 * are dropped in. Replace by swapping <QuorumMock /> for an <Image /> once
 * you have assets (see README).
 */

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

// Availability intensity per slot (0–4), deterministic so SSR and client match.
const GRID = [
  [1, 2, 1, 3, 2, 0, 0],
  [2, 3, 2, 3, 1, 1, 0],
  [1, 2, 3, 4, 2, 1, 1],
  [0, 1, 2, 4, 3, 2, 1],
  [2, 2, 3, 4, 4, 2, 0],
  [1, 1, 2, 3, 2, 1, 0],
];

const OPACITY = ["bg-white/[0.04]", "bg-ember/20", "bg-ember/40", "bg-amber/50", "bg-amber/80"];

export default function QuorumMock() {
  return (
    <div
      aria-label="Illustration of Quorum's availability heatmap interface"
      role="img"
      className="relative mx-auto w-full max-w-sm rounded-2xl border border-line bg-panel p-5 shadow-[0_0_80px_-20px_rgba(255,122,26,0.35)]"
    >
      {/* App header */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-label text-muted">
          Quorum
        </p>
        <p className="font-mono text-[10px] text-muted">design-team · 6 people</p>
      </div>

      {/* Day labels */}
      <div className="mt-5 grid grid-cols-7 gap-1.5">
        {DAYS.map((d, i) => (
          <span
            key={`${d}-${i}`}
            className="text-center font-mono text-[10px] text-muted"
          >
            {d}
          </span>
        ))}
      </div>

      {/* Availability heatmap */}
      <div className="mt-2 grid grid-cols-7 gap-1.5">
        {GRID.flat().map((level, i) => (
          <div
            key={i}
            className={`aspect-square rounded-[5px] ${OPACITY[level]}`}
          />
        ))}
      </div>

      {/* Recommended time */}
      <div className="mt-5 flex items-center justify-between rounded-xl border border-amber/30 bg-amber/5 px-4 py-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-label text-muted">
            Best time
          </p>
          <p className="mt-0.5 text-sm font-medium text-fog">Thu · 7:00 PM</p>
        </div>
        <p className="font-mono text-xs text-amber">5/6 in</p>
      </div>
    </div>
  );
}
