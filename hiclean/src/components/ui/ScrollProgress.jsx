import { useEffect, useRef } from 'react';

/**
 * Garis progres tipis di tepi atas layar yang memanjang sesuai posisi scroll.
 * Memberi petunjuk "sudah sejauh mana" tanpa mengganggu. Diperbarui lewat requestAnimationFrame
 * dan hanya memakai transform, jadi ringan. Taruh sekali di App.jsx.
 */
export function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      const progress = max > 0 ? Math.min(Math.max(root.scrollTop / max, 0), 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div ref={barRef} className="h-full origin-left bg-brand-green" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}