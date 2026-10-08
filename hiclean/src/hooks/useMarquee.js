import { useEffect, useRef, useState } from 'react';

/**
 * Marquee otomatis yang berjalan terus tanpa henti.
 *
 * Struktur yang diharapkan:
 *   <div ref={bandRef}>                 ← pembungkus (overflow-hidden)
 *     <div ref={trackRef} className="flex w-max">
 *       <ul ref={listRef}>…</ul>        ← satu daftar asli (ukurannya diukur)
 *       {salinan × (copies - 1)}        ← salinan agar track selalu menutupi lebar layar
 *     </div>
 *   </div>
 *
 * Digerakkan lewat requestAnimationFrame (bukan CSS animation) supaya tidak ikut mati
 * oleh reset global "prefers-reduced-motion". Pengguna reduced motion tetap melihat gerakan,
 * hanya dua kali lebih pelan. Berhenti menghitung saat di luar layar.
 *
 * @param seconds   waktu satu putaran penuh (lebih besar = lebih lambat)
 * @param direction 'right' (kiri → kanan) atau 'left' (kanan → kiri)
 */
export function useMarquee({ seconds = 40, direction = 'right' } = {}) {
  const bandRef = useRef(null);
  const trackRef = useRef(null);
  const listRef = useRef(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const band = bandRef.current;
    const track = trackRef.current;
    const list = listRef.current;
    if (!band || !track || !list) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sign = direction === 'right' ? 1 : -1;
    let width = 0; // lebar satu daftar
    let x = 0;
    let visible = true;
    let last = performance.now();
    let raf;

    const measure = () => {
      const next = list.offsetWidth;
      if (!next) return;
      const fraction = width ? x / width : sign > 0 ? -1 : 0; // jaga posisi relatif saat resize
      width = next;
      x = fraction * next;
      setCopies(Math.max(2, Math.ceil(band.clientWidth / next) + 1));
    };

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (width && visible) {
        const loop = reduce.matches ? seconds * 2 : seconds;
        x += sign * (width / loop) * dt;
        if (sign > 0) while (x >= 0) x -= width;
        else while (x <= -width) x += width;
        track.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(band);
    ro.observe(list);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(band);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [seconds, direction]);

  return { bandRef, trackRef, listRef, copies };
}