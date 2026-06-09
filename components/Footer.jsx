import { colophon, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-page px-6 py-14 sm:px-10">
        {/* Colophon — the site exposing its own design tokens. A small,
            deliberate signal that the design decisions here were decisions. */}
        <div>
          <p className="font-mono text-xs uppercase tracking-label text-muted">
            Colophon
          </p>
          <ul
            className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3"
            role="list"
            aria-label="Design tokens used on this site"
          >
            {colophon.tokens.map((token) => (
              <li
                key={`${token.label}-${token.value}`}
                className="flex items-center gap-2 font-mono text-xs text-muted"
              >
                {token.kind === "swatch" && (
                  <span
                    aria-hidden="true"
                    className="inline-block h-3 w-3 rounded-sm"
                    style={{ backgroundColor: token.value }}
                  />
                )}
                <span className="text-fog/80">{token.value}</span>
                <span className="text-muted/70">· {token.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-xs leading-relaxed text-muted/70">
            {colophon.note}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
          <a
            href="#top"
            className="link-quiet self-start font-mono text-xs text-muted hover:text-fog sm:self-auto"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
