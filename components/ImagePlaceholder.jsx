/**
 * A clearly-marked slot for a screenshot or image. Swap each instance for a
 * real <Image /> from next/image once assets exist (see README).
 */
export default function ImagePlaceholder({ label, aspect = "aspect-[16/10]" }) {
  return (
    <figure
      className={`${aspect} flex w-full items-center justify-center rounded-2xl border border-dashed border-fog/20 bg-panel/60 p-6`}
    >
      <figcaption className="max-w-md text-center font-mono text-xs leading-relaxed text-muted">
        {label}
      </figcaption>
    </figure>
  );
}
