import Reveal from "@/components/Reveal";

/**
 * Shared section shell. Gives every section the same horizontal measure,
 * vertical rhythm, and a monospace eyebrow label — the page's recurring
 * structural device.
 */
export default function Section({ id, eyebrow, children, align = "left", className = "" }) {
  const headingId = `${id}-label`;

  return (
    <section
      id={id}
      aria-labelledby={eyebrow ? headingId : undefined}
      className={`mx-auto w-full max-w-page px-6 py-24 sm:px-10 md:py-32 ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <p
            id={headingId}
            className={`mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-label text-muted ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            <span aria-hidden="true" className="accent-bar h-px w-8" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      {children}
    </section>
  );
}
