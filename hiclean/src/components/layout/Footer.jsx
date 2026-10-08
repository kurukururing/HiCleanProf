import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { siteConfig } from '../../config/siteConfig';

const REFERENCES = [
  'KLHK (2024). Sistem Informasi Pengelolaan Sampah Nasional (SIPSN).',
  'BPS Kota Surabaya (2025). Kota Surabaya dalam Angka 2025.',
  'Pemkot Surabaya (2025a). Roadmap Pengelolaan Sampah 2025–2026.',
  'UU No. 18 Tahun 2008 tentang Pengelolaan Sampah.',
  'Farida, Y., et al. (2024). Reverse logistics toward a circular economy...',
  'Sembiring, E., et al. (2024). Improving household waste management in Indonesia...',
];

/**
 * Tautan footer: seluruh section di halaman, dikelompokkan.
 * id section mengikuti SECTION_IDS di Navbar:
 * home · problem · how-it-works · features · technology · impact · validation · partners · team · contact
 */
const LINK_GROUPS = [
  {
    title: { id: 'Jelajahi', en: 'Explore' },
    links: [
      { href: '#home', id: 'Beranda', en: 'Home' },
      { href: '#problem', id: 'Masalah', en: 'The problem' },
      { href: '#how-it-works', id: 'Cara kerja', en: 'How it works' },
      { href: '#features', id: 'Fitur', en: 'Features' },
    ],
  },
  {
    title: { id: 'Inovasi & Dampak', en: 'Innovation & Impact' },
    links: [
      { href: '#technology', id: 'Inovasi', en: 'Innovation' },
      { href: '#impact', id: 'Dampak', en: 'Impact' },
      { href: '#validation', id: 'Validasi', en: 'Validation' },
    ],
  },
  {
    title: { id: 'Tentang Kami', en: 'About us' },
    links: [
      { href: '#partners', id: 'Mitra', en: 'Partners' },
      { href: '#team', id: 'Tim', en: 'Team' },
      { href: '#contact', id: 'Kontak', en: 'Contact' },
    ],
  },
];

// Teks yang belum punya key di i18n. Pindahkan bila perlu.
const COPY = {
  id: {
    tagline: 'Ekosistem pengumpulan sampah yang transparan dan terukur untuk warga dan pengepul di Surabaya.',
    ctaTitle: 'Mari wujudkan pengelolaan sampah yang transparan.',
    cta: 'Hubungi kami',
    contact: 'Hubungi kami',
    social: 'Media sosial',
    top: 'Kembali ke atas',
    footerNav: 'Navigasi footer',
  },
  en: {
    tagline: 'A transparent, measurable waste-collection ecosystem for residents and collectors in Surabaya.',
    ctaTitle: "Let's make waste management transparent.",
    cta: 'Contact us',
    contact: 'Get in touch',
    social: 'Social media',
    top: 'Back to top',
    footerNav: 'Footer navigation',
  },
};

// File ada di folder public/. Sesuaikan ekstensinya (.jpeg / .jpg / .webp) dengan file kamu.
const BG_IMAGE = '/hiCleanUser.jpeg';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

/* Ikon outline 24px, gaya sama untuk semua platform */
const ICONS = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
    </>
  ),
  tiktok: <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.4 2.5 2 4 4.5 4.2" />,
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9.5 5 2.5-5 2.5z" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 11v5M8 8v.01M12 16v-5m0 2.5c0-1.4 1-2.5 2.5-2.5S17 12 17 13.5V16" />
    </>
  ),
  x: <path d="M4 4h4l12 16h-4zM4 20l6.5-7M20 4l-6.5 7" />,
};

// Default-nya mengasumsikan handle yang sama di semua platform (siteConfig.contact.social).
// Untuk URL yang berbeda, isi siteConfig.contact.links, mis. { tiktok: 'https://tiktok.com/@...' }.
const SOCIALS = [
  { key: 'instagram', label: 'Instagram', url: (h) => `https://instagram.com/${h}` },
  { key: 'tiktok', label: 'TikTok', url: (h) => `https://tiktok.com/@${h}` },
  { key: 'youtube', label: 'YouTube', url: (h) => `https://youtube.com/@${h}` },
  { key: 'linkedin', label: 'LinkedIn', url: (h) => `https://linkedin.com/company/${h}` },
  { key: 'x', label: 'X', url: (h) => `https://x.com/${h}` },
];

function SocialIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

/* Ornamen sisi CTA: titik + bracket + garis yang memanjang sampai tombol (hanya layar lebar) */
function Bracket({ flip = false }) {
  const dots =
    'h-14 w-20 shrink-0 bg-[radial-gradient(circle,rgba(255,255,255,0.28)_1px,transparent_1px)] [background-size:12px_12px]';
  return (
    <div className={`hidden flex-1 items-center lg:flex ${flip ? 'flex-row-reverse' : ''}`} aria-hidden="true">
      <div className={dots} />
      <div
        className={`h-14 w-3 shrink-0 border-y border-white/25 ${flip ? 'rounded-l-md border-l' : 'rounded-r-md border-r'}`}
      />
      <div className="h-px flex-1 bg-white/25" />
    </div>
  );
}

function FooterLinkGroup({ title, links, lang }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-white/50">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`inline-block text-base text-white/85 transition-colors hover:text-white ${focusRing}`}
            >
              {item[lang] ?? item.en}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { t, lang } = useLanguage();
  const copy = COPY[lang] ?? COPY.en;
  const [showRefs, setShowRefs] = useState(false);
  const { email, social, address, links } = siteConfig.contact;
  const handle = String(social).replace('@', '');

  return (
    <footer className="relative isolate overflow-hidden bg-ink pt-20 text-white md:pt-24">
      {/* Foto latar: dekoratif, difokuskan ke orang di sisi kiri */}
      <img
        src={BG_IMAGE}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[30%_65%]"
      />
      {/* Overlay: gelap di atas (menyatu dengan section sebelumnya) dan di bawah (menopang wordmark),
          lebih tipis di tengah supaya fotonya tetap terbaca */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/75 to-ink/95" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. CTA: judul + tombol dengan ornamen bracket */}
        <div className="flex flex-col items-center text-center">
          <h2 className="max-w-3xl text-3xl font-medium leading-[1.1] tracking-tighter text-white md:text-5xl">
            {copy.ctaTitle}
          </h2>

          <div className="mt-10 flex w-full items-center justify-center">
            <Bracket />
            <a
              href="#contact"
              className={`shrink-0 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-neutral-200 lg:mx-6 ${focusRing}`}
            >
              {copy.cta}
            </a>
            <Bracket flip />
          </div>
        </div>

        {/* 2. Brand + tautan + kontak */}
        <div className="mt-20 grid gap-14 border-t border-white/15 pt-14 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="#home" aria-label="Hi-Clean" className={`inline-block rounded-sm ${focusRing}`}>
              <img src="/logoDesc.png" alt="Hi-Clean" width="127" height="40" decoding="async" className="h-10 w-auto" />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">{copy.tagline}</p>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label={copy.social}>
              {SOCIALS.map(({ key, label, url }) => (
                <li key={key}>
                  <a
                    href={links?.[key] ?? url(handle)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={`grid size-10 place-items-center rounded-full border border-white/20 transition-colors hover:border-white hover:bg-white hover:text-ink ${focusRing}`}
                  >
                    <SocialIcon name={key} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tautan + kontak */}
          <nav
            aria-label={copy.footerNav}
            className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4 lg:col-span-8 lg:pl-8"
          >
            {LINK_GROUPS.map((group) => (
              <FooterLinkGroup key={group.title.en} title={group.title[lang] ?? group.title.en} links={group.links} lang={lang} />
            ))}

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-medium text-white/50">{copy.contact}</h3>
              <div className="mt-5 space-y-3">
                <a
                  href={`mailto:${email}`}
                  className={`block break-all text-base text-white/85 transition-colors hover:text-white ${focusRing}`}
                >
                  +62 812-3456-7890
                </a>
                {address && <p className="max-w-[16rem] text-sm leading-relaxed text-white/60">{address}</p>}
              </div>
            </div>
          </nav>
        </div>

        {/* Daftar sumber: terbuka saat diklik */}
        <div
          id="footer-references"
          className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
            showRefs ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <ul className="grid gap-x-12 gap-y-2 pt-10 text-xs leading-relaxed text-neutral-300 md:grid-cols-2">
              {REFERENCES.map((ref) => (
                <li key={ref}>{ref}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Baris bawah */}
        <div className="mt-12 grid items-center gap-3 border-t border-white/10 pt-6 text-xs text-neutral-300 md:grid-cols-3">
          <button
            type="button"
            onClick={() => setShowRefs((v) => !v)}
            aria-expanded={showRefs}
            aria-controls="footer-references"
            className={`justify-self-start underline underline-offset-4 hover:text-white ${focusRing}`}
          >
            {t('footer.source')}
          </button>
          <p className="md:text-center">
            &copy; {siteConfig.year} {siteConfig.team}
          </p>
          <a href="#home" className={`underline underline-offset-4 hover:text-white md:justify-self-end ${focusRing}`}>
            {copy.top}
          </a>
        </div>
      </div>

      {/* Wordmark besar, terpotong di tepi bawah */}
      <div className="pointer-events-none mt-10 select-none" aria-hidden="true">
        <span className="-mb-[0.2em] block text-center font-heading text-[clamp(4rem,19vw,17rem)] font-semibold leading-[0.8] tracking-tighter text-white/[0.12]">
          Hi-Clean
        </span>
      </div>
    </footer>
  );
}