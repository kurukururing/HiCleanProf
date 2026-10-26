import { useEffect, useRef, useState } from 'react';

/**
 * Hook animasi saat scroll — tanpa library, hanya IntersectionObserver + CSS (scroll-animations.css).
 *
 * Prinsip agar nyaman dilihat:
 * - hanya opacity & transform (tidak menggeser layout, tidak ada layout shift)
 * - berjalan SEKALI (tidak berulang saat scroll naik-turun)
 * - dipicu setelah elemen masuk ±12% dari tepi bawah layar, bukan saat baru menyentuh
 * - elemen yang lebih tinggi dari layar tetap terpicu (threshold 0)
 * - reduced motion: konten langsung tampil (diatur di CSS)
 */

export function useInView({ rootMargin = '0px 0px -12% 0px', once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // Browser tanpa IntersectionObserver: tampilkan langsung, jangan sembunyikan konten
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, once]);

  return [ref, inView];
}

/**
 * Mengembalikan props yang tinggal di-spread ke elemen mana pun:
 *
 *   const rv = useReveal({ variant: 'up', delay: 100 });
 *   <div {...rv} className="...">          // elemen itu sendiri muncul
 *
 *   const list = useReveal({ stagger: true, step: 90 });
 *   <ul {...list}> <li/> <li/> <li/> </ul> // anak-anaknya muncul berurutan
 *
 * variant: 'up' | 'fade' | 'scale' | 'blur' | 'left' | 'right'
 * Jika elemen sudah punya `style`, gabungkan: style={{ ...punyaSaya, ...rv.style }}
 */
export function useReveal({ variant = 'up', delay = 0, stagger = false, step = 90, rootMargin } = {}) {
  const [ref, inView] = useInView(rootMargin ? { rootMargin } : undefined);

  return {
    ref,
    [stagger ? 'data-stagger' : 'data-reveal']: variant,
    'data-visible': inView ? 'true' : 'false',
    style: {
      '--reveal-delay': `${Math.min(delay, 1200)}ms`,
      '--stagger-step': `${step}ms`,
    },
  };
}