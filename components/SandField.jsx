/**
 * Drifting sand texture for hero-type sections. Two seamless noise layers
 * (fine cream grain + coarse amber mottling) pan in opposite directions at
 * different speeds, like wind over sand. The wrapper carries the dissolve
 * mask; layers animate via transform so the loop is cheap and seamless.
 * Reduced-motion users get the texture frozen (global CSS rule).
 */
export default function SandField() {
  return (
    <div aria-hidden="true" className="sand-field absolute inset-0 overflow-hidden">
      <div className="sand-layer sand-fine" />
      <div className="sand-layer sand-coarse" />
    </div>
  );
}
