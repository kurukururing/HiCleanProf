import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { partners } from '../../data/partners';

/**
 * Partners — mosaik foto seperti referensi:
 * - Kolom berisi 2 tile bertumpuk dengan rasio tinggi & lebar yang bervariasi
 * - Bergerak otomatis terus dari kiri ke kanan (loop mulus, tanpa slider/scroll manual)
 * - Hover pada satu tile: tile membesar & naik ke depan, nama muncul,
 *   tile lain meredup, dan pergerakan berhenti
 *
 * Data (data/partners.js) — field gambar, urutan prioritas:
 *   image : foto utama (di-crop memenuhi tile)        → paling bagus untuk tampilan mosaik
 *   logo  : logo (ditampilkan utuh di tengah tile)
 *   (kosong) : monogram inisial
 */

const MIN_TILES_PER_LOOP = 16;

// Waktu (detik) untuk menempuh satu putaran penuh. Lebih besar = lebih lambat.
const LOOP_SECONDS = 60;
const LOOP_SECONDS_REDUCED = 120; // pengguna dengan reduced motion: tetap bergerak, lebih pelan

// Pola kolom: lebar + rasio tinggi tile atas : bawah
const COLUMN_PATTERNS = [
  { w: 'w-32 md:w-44', ratio: [3, 2] },
  { w: 'w-40 md:w-56', ratio: [2, 3] },
  { w: 'w-28 md:w-40', ratio: [1, 1] },
  { w: 'w-36 md:w-52', ratio: [2, 1] },
  { w: 'w-32 md:w-48', ratio: [1, 2] },
];

const FALLBACK_BG = ['bg-neutral-100', 'bg-neutral-200'];

function initialsOf(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function PartnerTile({ partner, grow, tone, focusable }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const cover = partner.image && !imageFailed ? partner.image : null;
  const logo = !cover && partner.logo && !logoFailed ? partner.logo : null;

  return (
    <li
      tabIndex={focusable ? 0 : -1}
      title={partner.name}
      className={`pm-tile group/tile relative min-h-0 cursor-pointer overflow-hidden rounded-2xl outline-none ${
        cover ? 'bg-neutral-200' : FALLBACK_BG[tone % 2]
      }`}
      style={{ flex: `${grow} 1 0%` }}
    >
      {cover && (
        <img
          src={cover}
          alt=""
          loading="lazy"
          draggable="false"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover"
          style={{ objectPosition: partner.focus || 'center' }}
        />
      )}

      {logo && (
        <img
          src={logo}
          alt=""
          loading="lazy"
          draggable="false"
          onError={() => setLogoFailed(true)}
          className="h-full w-full object-contain p-6"
        />
      )}

      {!cover && !logo && (
        <span className="flex h-full w-full items-center justify-center text-3xl font-medium tracking-tighter text-neutral-400 md:text-4xl">
          {initialsOf(partner.name)}
        </span>
      )}

      {/* Nama: selalu terbaca di DOM, tampil saat hover / fokus */}
      <span className="pm-caption pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/30 to-transparent px-3 pb-3 pt-10 text-xs font-medium text-white md:text-sm">
        <span className="line-clamp-2">{partner.name}</span>
      </span>
    </li>
  );
}

function buildColumns(items) {
  const repeat = Math.max(1, Math.ceil(MIN_TILES_PER_LOOP / items.length));
  const loop = Array.from({ length: repeat }).flatMap(() => items);
  const columns = [];
  for (let i = 0; i < loop.length; i += 2) {
    columns.push(loop.slice(i, i + 2));
  }
  return columns;
}

function MosaicList({ columns, focusable, listRef }) {
  return (
    <ul ref={listRef} className="pm-list flex gap-3 pr-3" aria-hidden={focusable ? undefined : 'true'}>
      {columns.map((col, ci) => {
        const pattern = COLUMN_PATTERNS[ci % COLUMN_PATTERNS.length];
        return (
          <li key={ci} className={`${pattern.w} shrink-0`}>
            <ul className="flex h-full flex-col gap-3">
              {col.map((partner, ti) => (
                <PartnerTile
                  key={`${partner.id}-${ci}-${ti}`}
                  partner={partner}
                  grow={pattern.ratio[ti] ?? 1}
                  tone={ci + ti}
                  focusable={focusable}
                />
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

export function Partners() {
  const { t } = useLanguage();
  const columns = buildColumns(partners);

  // ── Gerakan otomatis kiri → kanan ──
  // Digerakkan lewat requestAnimationFrame (bukan CSS animation) supaya:
  //  - tidak ikut mati oleh reset CSS global "prefers-reduced-motion"
  //  - tidak macet ter-pause setelah tile diklik (fokus mouse ≠ fokus keyboard)
  //  - berhenti/jalan lagi dengan halus
  const bandRef = useRef(null);
  const trackRef = useRef(null);
  const listRef = useRef(null);
  const hovering = useRef(false);
  const keyboardFocus = useRef(false);
  const [copies, setCopies] = useState(2); // jumlah salinan daftar agar track selalu menutupi layar

  useEffect(() => {
    const band = bandRef.current;
    const track = trackRef.current;
    const list = listRef.current;
    if (!band || !track || !list) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0; // lebar satu daftar (termasuk padding kanan)
    let x = 0;
    let velocity = 0;
    let last = performance.now();
    let raf;

    const measure = () => {
      const next = list.offsetWidth;
      if (!next) return;
      x = width ? (x / width) * next : -next; // jaga posisi relatif saat resize
      width = next;
      setCopies(Math.max(2, Math.ceil(band.clientWidth / next) + 1));
    };

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (width) {
        const paused = hovering.current || keyboardFocus.current;
        const seconds = reduce.matches ? LOOP_SECONDS_REDUCED : LOOP_SECONDS;
        const target = paused ? 0 : width / seconds;
        velocity += (target - velocity) * (1 - Math.exp(-dt * 10)); // berhenti/mulai dengan easing
        x += velocity * dt;
        while (x >= 0) x -= width; // bergerak ke kanan, lalu loop mulus
        track.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(band);
    ro.observe(list);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <section id="partners" className="scroll-mt-20 bg-white py-24 md:py-32">
      <style>{`
        .pm-band { overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
                  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent); }
        .pm-track { will-change: transform; }

        .pm-tile { transition: transform 600ms cubic-bezier(0.25,1,0.5,1), opacity 500ms ease, filter 500ms ease, box-shadow 600ms ease; }
        .pm-caption { opacity: 0; transform: translateY(8px); transition: opacity 400ms ease, transform 500ms cubic-bezier(0.25,1,0.5,1); }

        /* Tile yang di-hover: maju, membesar, nama muncul */
        .pm-tile:hover, .pm-tile:focus-visible { transform: scale(1.14); z-index: 30; box-shadow: 0 24px 40px -16px rgba(0,0,0,0.35); }
        .pm-tile:hover .pm-caption, .pm-tile:focus-visible .pm-caption { opacity: 1; transform: translateY(0); }

        /* Tile lain meredup supaya yang aktif benar-benar menonjol */
        .pm-band:has(.pm-tile:hover) .pm-tile:not(:hover),
        .pm-band:has(.pm-tile:focus-visible) .pm-tile:not(:focus-visible) { opacity: 0.35; filter: grayscale(1); }

        /* Reduced motion: gerakan otomatis tetap jalan (lebih pelan, diatur di JS),
           hanya transisi hover yang dipersingkat */
        @media (prefers-reduced-motion: reduce) {
          .pm-tile, .pm-caption { transition-duration: 1ms; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-tighter text-ink md:text-5xl lg:text-6xl">
            {t('section.partners.title')}
          </h2>
        </div>
      </div>

      {/* Mosaik selebar layar. py-8 memberi ruang agar tile yang membesar tidak terpotong */}
      <div
        ref={bandRef}
        className="pm-band mt-12 py-8 md:mt-14"
        onPointerEnter={(e) => {
          if (e.pointerType !== 'touch') hovering.current = true; // sentuhan tidak "menempel"
        }}
        onPointerLeave={() => {
          hovering.current = false;
        }}
        onFocus={(e) => {
          keyboardFocus.current = e.target.matches(':focus-visible'); // hanya fokus keyboard
        }}
        onBlur={() => {
          keyboardFocus.current = false;
        }}
      >
        <div ref={trackRef} className="pm-track flex h-[260px] w-max md:h-[340px]">
          <MosaicList columns={columns} focusable listRef={listRef} />
          {Array.from({ length: copies - 1 }, (_, i) => (
            <div key={i} className="pm-dup contents">
              <MosaicList columns={columns} focusable={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}