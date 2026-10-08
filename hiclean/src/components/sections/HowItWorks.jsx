import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { steps } from '../../data/steps';
import { LabelMarquee } from '../ui/LabelMarquee';

/**
 * HowItWorks — section GELAP (bg-ink) untuk memecah deretan section terang.
 * - Stepper Juriso: pill "Step - 01" di atas garis; garis progres hijau brand memanjang
 * - Langkah aktif: pill putih + tile hijau brand dengan nomor ink; lainnya redup
 * - Tanpa glow/shadow; kontras murni dari warna solid
 * - Autoplay dimatikan jika pengguna memilih reduced motion
 */

const EASE = 'ease-[cubic-bezier(0.25,1,0.5,1)]';

// Marquee label dibuat samar-putih agar terbaca sebagai tekstur di latar gelap
const MARQUEE_ON_DARK = '[&_*]:text-white/10!';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export function HowItWorks() {
  const { t, lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = steps.length;

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? total - 1 : current - 1));
  }, [total]);

  useEffect(() => {
    if (isPaused) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  // Garis berjalan dari titik tengah kolom pertama ke titik tengah kolom terakhir
  const railInset = `${50 / total}%`;
  const progress = total > 1 ? (activeIndex / (total - 1)) * 100 : 0;

  return (
    <section id="how-it-works" className="scroll-mt-20 overflow-x-clip bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            {/* Marquee label berjalan di belakang judul */}
            <div className="relative">
              <div className={MARQUEE_ON_DARK}>
                <LabelMarquee text={t('section.howItWorks.label')} />
              </div>
              <h2 className="relative z-10 text-4xl font-medium leading-[1.05] tracking-tighter text-white md:text-5xl lg:text-6xl">
                {t('section.howItWorks.title')}
              </h2>
            </div>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65">
              Alur terintegrasi untuk menciptakan ekosistem pengumpulan sampah yang transparan dan
              terukur.
            </p>
          </div>

          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Langkah sebelumnya"
              className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:bg-white/10 ${focusRing}`}
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Langkah berikutnya"
              className={`flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white text-ink transition-opacity duration-300 hover:opacity-85 ${focusRing}`}
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Stepper */}
        <div
          className="mt-14 rounded-3xl border border-white/15 p-6 md:mt-16 md:p-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div
            className="relative grid grid-cols-1 gap-12 md:gap-8 md:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
            style={{ '--cols': total }}
          >
            {/* Garis rail (hanya desktop) */}
            {total > 1 && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-3.5 hidden h-px bg-white/15 md:block"
                style={{ left: railInset, right: railInset }}
              >
                <div
                  className={`h-full bg-brand-green transition-[width] duration-700 ${EASE}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {steps.map((step, idx) => {
              const isActive = idx === activeIndex;
              const label = `Step - ${String(idx + 1).padStart(2, '0')}`;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveIndex(idx)}
                  className="relative flex cursor-pointer flex-col items-start md:items-center md:text-center"
                >
                  {/* Pill langkah (bg-ink menutup garis rail di belakangnya) */}
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`relative z-10 rounded-full border px-4 py-1 text-xs transition-colors duration-500 ${EASE} ${focusRing} ${
                      isActive
                        ? 'border-white bg-white text-ink'
                        : 'border-white/25 bg-ink text-white/60 hover:border-white/50'
                    }`}
                  >
                    {label}
                  </button>

                  {/* Konten */}
                  <div
                    className={`mt-8 flex w-full flex-1 flex-col items-start transition-opacity duration-700 md:items-center ${EASE} ${
                      isActive ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                    }`}
                  >
                    <h3 className="text-xl font-medium tracking-tight text-white md:text-2xl">
                      {lang === 'id' ? step.titleID : step.titleEN}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">
                      {lang === 'id' ? step.descID : step.descEN}
                    </p>

                    {/* Tile: nomor besar, hijau brand saat aktif */}
                    <div
                      className={`mt-8 flex aspect-[4/3] w-full items-center justify-center rounded-2xl transition-colors duration-700 ${EASE} ${
                        isActive ? 'bg-brand-green' : 'bg-white/5'
                      }`}
                    >
                      <span
                        className={`text-7xl font-medium tracking-tighter transition-colors duration-700 ${EASE} md:text-8xl ${
                          isActive ? 'text-ink' : 'text-white/15'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}