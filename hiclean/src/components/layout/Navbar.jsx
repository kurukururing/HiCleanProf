import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { useScrollSpy } from '../../hooks/useScrollSpy';

const SECTION_IDS = ['home', 'problem', 'how-it-works', 'features', 'technology', 'impact', 'validation', 'partners', 'team', 'contact'];

// Item dengan `labelKey` memakai i18n; item dengan `copyKey` memakai teks di COPY di bawah.
const NAV_ITEMS = [
  { id: 'home', labelKey: 'nav.home' },
  { id: 'problem', labelKey: 'nav.problem' },
  { id: 'how-it-works', labelKey: 'nav.howItWorks' },
  { id: 'features', labelKey: 'nav.features' },
  // Section "Inovasi" = Technology.jsx (root section harus memakai id="technology")
  { id: 'technology', copyKey: 'innovation' },
];

// Teks yang belum punya key di i18n. Pindahkan bila perlu.
const COPY = {
  id: { cta: 'Hubungi kami', open: 'Buka menu', close: 'Tutup menu', main: 'Navigasi utama', innovation: 'Inovasi' },
  en: { cta: 'Contact us', open: 'Open menu', close: 'Close menu', main: 'Main navigation', innovation: 'Innovation' },
};

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

export function Navbar() {
  const { t, lang } = useLanguage();
  const copy = COPY[lang] ?? COPY.en;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const activeSection = useScrollSpy(SECTION_IDS);

  const labelOf = (item) => (item.labelKey ? t(item.labelKey) : copy[item.copyKey]);

  // Status scroll (passive, dan dicek sekali saat mount untuk kasus refresh di tengah halaman)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu mobile: tutup dengan Escape / saat layar melebar, dan kunci scroll halaman saat terbuka
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia('(min-width: 1024px)');
    const onWide = (e) => e.matches && setIsOpen(false);
    const prevOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onWide);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onWide);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  // Logo berwarna putih, jadi bar selalu gelap: transparan di atas hero, kaca gelap saat di-scroll.
  const surface = isOpen
    ? 'border-white/10 bg-ink'
    : scrolled
      ? 'border-white/10 bg-ink/85 backdrop-blur-md'
      : 'border-transparent bg-transparent';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,padding] duration-300 motion-reduce:transition-none ${surface} ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <a href="#home" onClick={close} aria-label="Hi-Clean" className={`justify-self-start rounded-sm ${focusRing}`}>
          <img src="/logoDesc.png" alt="Hi-Clean" width="127" height="40" decoding="async" className="h-9 w-auto md:h-10" />
        </a>

        {/* Navigasi desktop: di tengah, penanda aktif berupa garis tipis (tanpa menggeser layout) */}
        <nav aria-label={copy.main} className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-9">
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active ? 'true' : undefined}
                    className={`relative py-1 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-white after:transition-transform after:duration-300 motion-reduce:after:transition-none ${focusRing} ${
                      active
                        ? 'text-white after:scale-x-100'
                        : 'text-white/60 after:scale-x-0 hover:text-white hover:after:scale-x-100'
                    }`}
                  >
                    {labelOf(item)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          <LanguageToggle isDark />
          <a
            href="#contact"
            className={`hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-neutral-200 sm:inline-block ${focusRing}`}
          >
            {copy.cta}
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? copy.close : copy.open}
            className={`grid size-10 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-white lg:hidden ${focusRing}`}
          >
            {isOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows,visibility] duration-300 motion-reduce:transition-none lg:hidden ${
          isOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <nav aria-label={copy.main} className="mx-auto max-w-7xl px-4 pb-6 pt-4 sm:px-6">
            <ul className="border-t border-white/10">
              {NAV_ITEMS.map((item) => {
                const active = activeSection === item.id;
                return (
                  <li key={item.id} className="border-b border-white/10">
                    <a
                      href={`#${item.id}`}
                      onClick={close}
                      aria-current={active ? 'true' : undefined}
                      className={`flex items-center justify-between py-4 font-heading text-2xl font-semibold tracking-tight transition-colors ${focusRing} ${
                        active ? 'text-white' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {labelOf(item)}
                      {active && <span className="size-2 rounded-full bg-brand-green" aria-hidden />}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href="#contact"
              onClick={close}
              className={`mt-6 block rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-ink ${focusRing}`}
            >
              {copy.cta}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}