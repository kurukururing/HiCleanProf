import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { StatusBadge } from '../ui/StatusBadge';
import { siteConfig } from '../../config/siteConfig';

// File ada di folder public/. Sesuaikan ekstensinya (.jpeg / .jpg / .webp) dengan file kamu.
const HERO_IMAGE = '/hiCleanUser2.jpeg';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

export function Hero() {
  const { t } = useLanguage();
  const prototypeUrl = siteConfig.figmaPrototypeUrl;

  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink lg:items-center">
      <style>{`
        /* Animasi masuk: fill-mode "both" mencegah elemen berkedip sebelum delay selesai */
        @keyframes hero-rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        .hero-rise { animation: hero-rise 700ms cubic-bezier(0.25, 1, 0.5, 1) both; }
        @media (prefers-reduced-motion: reduce) { .hero-rise { animation: none; } }
      `}</style>

      {/* Foto latar. Di layar sempit fokus ke pengemudi; di desktop teks berada di sisi kiri yang kosong (jalan) */}
      <img
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[58%_50%] lg:object-center"
      />

      {/* Overlay: dari bawah di mobile, dari kiri di desktop, supaya teks terbaca tanpa menggelapkan seluruh foto */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/65 to-ink/10 lg:bg-gradient-to-r lg:from-ink/95 lg:via-ink/55 lg:to-transparent"
        aria-hidden="true"
      />
      {/* Scrim tipis di atas agar navbar transparan tetap terbaca */}
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/70 to-transparent" aria-hidden="true" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-40">
        <div className="max-w-2xl">

          <h1
            className="hero-rise mt-6 font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '100ms' }}
          >
            {t('hero.tagline')}
          </h1>

          <p
            className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-neutral-200 md:text-xl"
            style={{ animationDelay: '200ms' }}
          >
            {t('hero.desc')}
          </p>

          <div className="hero-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '300ms' }}>
            {prototypeUrl && (
              <a
                href={prototypeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-neutral-200 ${focusRing}`}
              >
                {t('action.tryPrototype')}
                <ArrowRight
                  className="ml-2 size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                  aria-hidden
                />
              </a>
            )}
            <a
              href="#how-it-works"
              className={`inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 font-semibold text-white transition-colors hover:border-white hover:bg-white/10 ${focusRing}`}
            >
              {t('action.seeHowItWorks')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}