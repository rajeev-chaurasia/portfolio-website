/**
 * Decorative aurora glow — layered blurred gradient blobs that drift slowly.
 * Pure CSS animation (gated behind prefers-reduced-motion in globals.css).
 * Parent must be position: relative; content should sit above with z-10.
 */
export default function Aurora({
  variant = 'hero',
}: {
  variant?: 'hero' | 'soft';
}) {
  if (variant === 'soft') {
    return (
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="aurora-blob aurora-drift-2 bg-aurora-b left-[10%] top-[20%] h-72 w-72" />
        <div className="aurora-blob aurora-drift-1 bg-aurora-a right-[5%] top-[40%] h-80 w-80" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="aurora-blob aurora-drift-1 bg-aurora-a -left-[5%] top-[15%] h-96 w-96" />
      <div className="aurora-blob aurora-drift-2 bg-aurora-b right-[0%] top-[10%] h-[28rem] w-[28rem]" />
      <div className="aurora-blob aurora-drift-3 bg-aurora-c left-[35%] bottom-[5%] h-80 w-80" />
    </div>
  );
}
