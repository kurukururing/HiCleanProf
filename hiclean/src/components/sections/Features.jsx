import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useReveal } from '../../hooks/useReveal';
import { RevealText } from '../ui/RevealText';
import { LabelMarquee } from '../ui/LabelMarquee';
import { features } from '../../data/features';

/**
 * Features — header di tengah + tab pill, kiri mockup HP, kanan accordion bergaris.
 *
 * Mockup HP menampilkan screenshot aplikasi. Setiap fitur boleh punya BEBERAPA gambar
 * yang berganti otomatis secara berurutan (lalu mengulang dari awal):
 *
 *   {
 *     id: 'w1', titleID: '...', ...,
 *     screens: [
 *       { src: '/screens/w1-1.webp', duration: 3000 },          // tampil 3 detik
 *       { src: '/screens/w1-2.webp', duration: 5000 },          // tampil 5 detik
 *       { src: '/screens/w1-3.webp', srcEN: '/screens/w1-3-en.webp' }, // durasi default
 *     ],
 *   }
 *
 * - `duration` (ms) = berapa lama gambar itu tampil sebelum berganti ke gambar berikutnya.
 *   Untuk gambar terakhir, itu waktu sebelum kembali ke gambar pertama.
 * - `srcEN` opsional untuk UI bahasa Inggris.
 * - Format lama `screenshot` / `screenshotEN` (satu gambar) tetap didukung.
 * - Gambar yang gagal dimuat dilewati; jika semuanya gagal/kosong, layar menampilkan
 *   judul + deskripsi fitur sebagai cadangan.
 *
 * Kontrol: bar progres di bawah HP (klik untuk loncat ke gambar tertentu);
 * slideshow berhenti saat kursor berada di atas HP.
 */

const EASE = 'ease-[cubic-bezier(0.25,1,0.5,1)]';
const TABS = ['warga', 'pengepul'];

const DEFAULT_DURATION = 3500; // ms, jika `duration` tidak diisi

// Rasio layar HP yang dipakai frame. Semua screenshot sebaiknya memakai rasio yang sama
// (mis. 1170 × 2532 px = iPhone 14/15) agar tidak ada bagian yang terpotong.
const SCREEN_RATIO = 'aspect-[1170/2532]';

// Normalisasi data fitur → daftar gambar { key, src, duration }
function getScreens(feat, lang) {
  const list = feat.screens?.length
    ? feat.screens
    : feat.screenshot
      ? [{ src: feat.screenshot, srcEN: feat.screenshotEN }]
      : [];

  return list.map((s, i) => ({
    key: `${feat.id}:${i}`,
    src: (lang === 'en' && s.srcEN) || s.src,
    duration: s.duration ?? DEFAULT_DURATION,
  }));
}

function ToggleIcon({ open }) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${EASE} motion-reduce:transition-none ${
        open ? 'border-ink bg-ink text-white' : 'border-neutral-300 bg-white text-ink'
      }`}
    >
      <span className="absolute h-px w-3.5 bg-current" />
      <span
        className={`absolute h-3.5 w-px bg-current transition-transform duration-500 ${EASE} motion-reduce:transition-none ${
          open ? 'scale-y-0' : 'scale-y-100'
        }`}
      />
    </span>
  );
}

function PhoneMockup({ items, activeIndex, lang }) {
  const active = items[activeIndex];

  // Semua gambar tiap fitur (sudah dinormalisasi)
  const screensById = useMemo(
    () => Object.fromEntries(items.map((f) => [f.id, getScreens(f, lang)])),
    [items, lang],
  );

  // Gambar yang gagal dimuat (dilewati dari slideshow)
  const [failed, setFailed] = useState(() => new Set());
  const markFailed = (key) =>
    setFailed((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });

  // Posisi slideshow, terikat pada fitur: pindah fitur otomatis kembali ke gambar pertama
  const [pos, setPos] = useState({ id: null, frame: 0 });
  const [paused, setPaused] = useState(false);
  const [epoch, setEpoch] = useState(0); // naik setiap timer perlu mulai ulang (resume / klik bar)

  const usable = useMemo(
    () => (screensById[active.id] ?? []).filter((s) => !failed.has(s.key)),
    [screensById, active.id, failed],
  );
  const frame = pos.id === active.id ? Math.min(pos.frame, Math.max(usable.length - 1, 0)) : 0;

  useEffect(() => {
    if (paused || usable.length < 2) return undefined;
    const id = setTimeout(
      () => setPos({ id: active.id, frame: (frame + 1) % usable.length }),
      usable[frame].duration,
    );
    return () => clearTimeout(id);
  }, [paused, usable, frame, active.id, epoch]);

  const jumpTo = (i) => {
    setPos({ id: active.id, frame: i });
    setEpoch((e) => e + 1);
  };

  return (
    <>
      <div
        className="relative w-[250px] shrink-0 rounded-[2.75rem] bg-ink p-2.5 md:w-[270px]"
        onPointerEnter={(e) => {
          if (e.pointerType !== 'touch') setPaused(true); // sentuhan tidak "menempel"
        }}
        onPointerLeave={() => {
          setPaused(false);
          setEpoch((e) => e + 1);
        }}
      >
        <div className={`relative ${SCREEN_RATIO} overflow-hidden rounded-[2.25rem] bg-white`}>
          {/* Pulau kamera dekoratif: hanya menutup area tengah status bar */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-2.5 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-ink"
          />

          {items.map((feat) => {
            const isActive = feat.id === active.id;
            const screens = (screensById[feat.id] ?? []).filter((s) => !failed.has(s.key));

            return (
              <div key={feat.id} aria-hidden={!isActive} className="absolute inset-0">
                {screens.length === 0 ? (
                  /* Cadangan: belum ada gambar / semuanya gagal dimuat */
                  <div
                    className={`flex h-full flex-col px-5 pt-16 transition-opacity duration-700 ${EASE} motion-reduce:transition-none ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <h4 className="text-xl font-medium leading-tight tracking-tight text-ink">
                      {lang === 'id' ? feat.titleID : feat.titleEN}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                      {lang === 'id' ? feat.descID : feat.descEN}
                    </p>
                  </div>
                ) : (
                  screens.map((s) => (
                    <img
                      key={s.key}
                      src={s.src}
                      alt={isActive && usable[frame]?.key === s.key ? (lang === 'id' ? feat.titleID : feat.titleEN) : ''}
                      decoding="async"
                      draggable="false"
                      onError={() => markFailed(s.key)}
                      className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${EASE} motion-reduce:transition-none ${
                        isActive && usable[frame]?.key === s.key ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bar progres: tinggi ruang selalu dipesan agar layout tidak melompat antar fitur */}
      <div className="flex h-1.5 items-center gap-1.5" role="group" aria-label="Slideshow">
        {usable.length > 1 &&
          usable.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`${i + 1} / ${usable.length}`}
              aria-current={i === frame ? 'true' : undefined}
              className="relative h-1.5 w-8 overflow-hidden rounded-full bg-neutral-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <span
                key={`${i}-${i === frame ? epoch : 'idle'}`}
                className="absolute inset-0 origin-left rounded-full bg-ink"
                style={
                  i < frame
                    ? { transform: 'scaleX(1)' }
                    : i === frame
                      ? {
                          animation: `fs-progress ${s.duration}ms linear forwards`,
                          animationPlayState: paused ? 'paused' : 'running',
                        }
                      : { transform: 'scaleX(0)' }
                }
              />
            </button>
          ))}
      </div>
    </>
  );
}

export function Features() {
  const { t, lang } = useLanguage();
  const rvTabs = useReveal({ variant: 'fade', delay: 250 });
  const rvPhone = useReveal({ variant: 'up', delay: 100 });
  const rvList = useReveal({ variant: 'up', stagger: true, step: 90, delay: 200 });
  const [activeTab, setActiveTab] = useState('warga');
  const [activeIndex, setActiveIndex] = useState(0);

  const currentFeatures = features[activeTab];
  const tabIndex = TABS.indexOf(activeTab);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveIndex(0);
  };

  return (
    <section id="features" className="scroll-mt-20 overflow-x-clip bg-neutral-50 py-24 md:py-32">
      <style>{`@keyframes fs-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          {/* Marquee label berjalan di belakang judul */}
          <div className="relative">
            <LabelMarquee text={t('section.features.label')} />
            <RevealText as="h2" className="relative z-10 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tighter text-ink md:text-5xl lg:text-6xl" text={t('section.features.title')} />
          </div>

          {/* Tab pill dengan thumb yang bergeser */}
          <div
            {...rvTabs}
            role="tablist"
            className="relative mt-10 grid grid-cols-2 rounded-full border border-neutral-200 bg-white p-1"
          >
            <span
              aria-hidden="true"
              className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-ink transition-transform duration-500 ${EASE} motion-reduce:transition-none`}
              style={{ transform: `translateX(${tabIndex * 100}%)` }}
            />
            {TABS.map((tab) => (
              <button
                key={tab}
                role="tab"
                type="button"
                aria-selected={activeTab === tab}
                onClick={() => handleTabChange(tab)}
                className={`relative z-10 min-w-32 rounded-full px-6 py-2 text-sm transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                  activeTab === tab ? 'text-white' : 'text-neutral-600 hover:text-ink'
                }`}
              >
                {t(`tab.${tab}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Isi */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Panel HP: tinggi mengikuti HP, jadi mockup tampil utuh */}
          <div {...rvPhone} className="lg:col-span-5">
            <div className="flex flex-col items-center gap-6 rounded-3xl border border-neutral-200 bg-neutral-100 px-6 py-10 md:py-12">
              <PhoneMockup items={currentFeatures} activeIndex={activeIndex} lang={lang} />
            </div>
            <p className="mt-4 text-xs text-neutral-500">{t('text.simulationData')}</p>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-7">
            <ul {...rvList} className="border-b border-neutral-200">
              {currentFeatures.map((feat, idx) => {
                const isActive = activeIndex === idx;
                const panelId = `feature-panel-${activeTab}-${feat.id}`;
                return (
                  <li key={feat.id} className="border-t border-neutral-200">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      className="group flex w-full items-center justify-between gap-6 py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink"
                    >
                      <span
                        className={`text-2xl font-medium tracking-tight transition-colors duration-500 md:text-3xl ${
                          isActive ? 'text-ink' : 'text-neutral-500 group-hover:text-ink'
                        }`}
                      >
                        {lang === 'id' ? feat.titleID : feat.titleEN}
                      </span>
                      <ToggleIcon open={isActive} />
                    </button>

                    {/* Konten: animasi tinggi lewat grid-rows */}
                    <div
                      id={panelId}
                      role="region"
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ${EASE} motion-reduce:transition-none ${
                        isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-xl pb-8 pr-14 text-base leading-relaxed text-neutral-600">
                          {lang === 'id' ? feat.descID : feat.descEN}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}