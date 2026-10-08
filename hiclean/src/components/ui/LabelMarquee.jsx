import { useMarquee } from '../../hooks/useMarquee';

/**
 * Label section berupa teks besar yang bergerak otomatis di BELAKANG judul.
 * Dekoratif (aria-hidden) dan tidak menambah tinggi section.
 *
 * Cara pakai: bungkus judul dengan elemen `relative`, beri `relative z-10` pada judulnya,
 * lalu tempatkan <LabelMarquee /> di dalam pembungkus itu.
 *
 *   <div className="relative">
 *     <LabelMarquee text={t('section.xxx.label')} />
 *     <h2 className="relative z-10 ...">…</h2>
 *   </div>
 *
 * Marquee selebar layar (w-screen) dan berpusat pada pembungkusnya, jadi <section> yang
 * memakainya perlu `overflow-x-clip` agar tidak muncul scrollbar horizontal.
 * (Pakai clip, bukan hidden, supaya elemen `sticky` di dalam section tetap berfungsi.)
 */

const FADE_EDGES = 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)';

// Teks bergantian: terisi lalu hanya garis tepi, dipisahkan titik kecil
function MarqueeList({ text, listRef }) {
  return (
    <ul ref={listRef} className="flex shrink-0 items-center">
      {Array.from({ length: 4 }, (_, i) => (
        <li key={i} className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10">
          <span
            className="py-2 text-[clamp(4rem,11vw,9rem)] font-medium leading-none tracking-tighter text-neutral-200/80"
            style={i % 2 ? { color: 'transparent', WebkitTextStroke: '1.5px #dcdcdc' } : undefined}
          >
            {text}
          </span>
          <span className="size-3 shrink-0 rounded-full bg-neutral-200 md:size-4" />
        </li>
      ))}
    </ul>
  );
}

export function LabelMarquee({ text, seconds = 45, direction = 'right' }) {
  const { bandRef, trackRef, listRef, copies } = useMarquee({ seconds, direction });

  return (
    <div
      ref={bandRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 w-screen -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden"
      style={{ maskImage: FADE_EDGES, WebkitMaskImage: FADE_EDGES }}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        <MarqueeList text={text} listRef={listRef} />
        {Array.from({ length: copies - 1 }, (_, i) => (
          <MarqueeList key={i} text={text} />
        ))}
      </div>
    </div>
  );
}