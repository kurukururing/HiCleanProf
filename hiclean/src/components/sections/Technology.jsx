import { lazy, Suspense, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useReveal } from '../../hooks/useReveal';
import { RevealText } from '../ui/RevealText';
import { LabelMarquee } from '../ui/LabelMarquee';
import { technologies } from '../../data/technologies';

// Three.js cukup berat: dimuat hanya saat section ini dirender.
const SmartScale3D = lazy(() => import('../ui/SmartScale3D'));

const SIM_DATA = { actual: 12.5 }; // data simulasi berat (kg)

// Marquee label dibuat samar-putih agar terbaca sebagai tekstur di latar gelap
const MARQUEE_ON_DARK = '[&_*]:text-white/10!';

// Teks kontrol mengikuti bahasa aktif. Pindahkan ke i18n bila sudah punya key-nya.
const COPY = {
  id: {
    viewLabel: 'Mode tampilan',
    styleLabel: 'Gaya render',
    views: { assembled: 'Utuh', exploded: 'Bongkar', dimensions: 'Dimensi' },
    styles: { color: 'Warna', blueprint: 'Blueprint' },
    hint: 'Seret untuk memutar · Gulir untuk zoom',
  },
  en: {
    viewLabel: 'View mode',
    styleLabel: 'Render style',
    views: { assembled: 'Assembled', exploded: 'Exploded', dimensions: 'Dimensions' },
    styles: { color: 'Color', blueprint: 'Blueprint' },
    hint: 'Drag to rotate · Scroll to zoom',
  },
};

// Ring fokus: ink untuk elemen di atas putih, putih untuk elemen di atas latar gelap
const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';
const focusRingLight =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

/* Kontrol segmented: satu pilihan aktif dari beberapa opsi (di dalam panel putih) */
function Segmented({ label, value, options, onChange }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 p-1">
      {Object.entries(options).map(([key, text]) => (
        <button
          key={key}
          type="button"
          role="radio"
          aria-checked={value === key}
          onClick={() => onChange(key)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${focusRing} ${
            value === key ? 'bg-ink text-white' : 'text-neutral-600 hover:text-ink'
          }`}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

/* Satu baris accordion teknologi (di atas latar gelap) */
function TechItem({ tech, lang, open, onToggle }) {
  const title = lang === 'id' ? tech.titleID : tech.titleEN;
  const desc = lang === 'id' ? tech.descID : tech.descEN;
  const panelId = `tech-panel-${tech.id}`;

  return (
    <li className="border-b border-white/15">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={`flex w-full items-center justify-between gap-6 py-6 text-left ${focusRingLight}`}
      >
        <span
          className={`font-heading text-2xl font-semibold leading-tight tracking-tight transition-colors duration-300 ${
            open ? 'text-white' : 'text-white/60 hover:text-white'
          }`}
        >
          {title}
        </span>
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
            open ? 'border-brand-green bg-brand-green text-ink' : 'border-white/30 text-white'
          }`}
        >
          {open ? <Minus className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
        </span>
      </button>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-7 pr-14">
            <p className="text-base leading-relaxed text-white/70">{desc}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export function Technology() {
  const { t, lang } = useLanguage();
  const rvList = useReveal({ variant: 'up', stagger: true, step: 100, delay: 150 });
  const rvPanel = useReveal({ variant: 'up', delay: 200 });
  const copy = COPY[lang] ?? COPY.en;

  const [openId, setOpenId] = useState(technologies[0]?.id ?? null);
  const [view, setView] = useState('assembled'); // assembled | exploded | dimensions
  const [style, setStyle] = useState('color'); // color | blueprint

  // Opsional: tambahkan field `focus` (mis. 'loadcell', 'esp32', 'display') di data/technologies
  // agar kamera 3D berpindah ke komponen terkait saat item dibuka.
  const focusTarget = technologies.find((x) => x.id === openId)?.focus ?? null;

  return (
    <section id="technology" className="scroll-mt-20 overflow-x-clip bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header: marquee label berjalan di belakang judul */}
        <header className="relative mb-14">
          <div className={MARQUEE_ON_DARK}>
            <LabelMarquee text={t('section.technology.label')} />
          </div>
          <RevealText as="h2" className="relative z-10 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tighter text-white md:text-5xl lg:text-6xl" text={t('section.technology.title')} />
        </header>

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Daftar teknologi */}
          <ul {...rvList} className="border-t border-white/15 lg:col-span-5">
            {technologies.map((tech) => (
              <TechItem
                key={tech.id}
                tech={tech}
                lang={lang}
                open={openId === tech.id}
                onToggle={() => setOpenId(openId === tech.id ? null : tech.id)}
              />
            ))}
          </ul>

          {/* Panel model 3D: tetap putih sebagai titik fokus terang di atas latar gelap */}
          <div {...rvPanel} className="overflow-hidden rounded-[2rem] bg-white lg:sticky lg:top-24 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-end gap-3 border-b border-neutral-200 px-5 py-4">
              <Segmented label={copy.styleLabel} value={style} options={copy.styles} onChange={setStyle} />
            </div>

            <div className="h-[420px] md:h-[560px]">
              <Suspense fallback={<div className="h-full w-full animate-pulse bg-neutral-50 motion-reduce:animate-none" />}>
                <SmartScale3D
                  exploded={view === 'exploded'}
                  inspectMode={view === 'dimensions'}
                  focusTarget={focusTarget}
                  weighSimData={SIM_DATA}
                  variant={style}
                  lang={lang}
                />
              </Suspense>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 px-5 py-4">
              <Segmented label={copy.viewLabel} value={view} options={copy.views} onChange={setView} />
              <span className="hidden text-xs text-neutral-500 md:block">{copy.hint}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}