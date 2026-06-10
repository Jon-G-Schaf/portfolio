/**
 * Journey-style sand for hero-type sections: sparse golden glints over a
 * smooth surface, like sunlight catching glitter. Two glint fields drift in
 * opposite directions so sparkles wink as they cross. The wrapper carries
 * the dissolve mask; layers animate via transform so the loop is cheap and
 * seamless. Reduced-motion users get the texture frozen (global CSS rule).
 */
export default function SandField() {
  return (
    <div aria-hidden="true" className="sand-field absolute inset-0 overflow-hidden">
      <div className="sand-layer sand-a" />
      <div className="sand-layer sand-b" />
    </div>
  );
}
