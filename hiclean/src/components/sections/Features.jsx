import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { StatusBadge } from '../ui/StatusBadge';
import { LabelMarquee } from '../ui/LabelMarquee';
import { features } from '../../data/features';

/**
 * Features — mengikuti section "Legal solutions for every challenge" di Juriso:
 * - header di tengah + kontrol tab berbentuk pill dengan thumb yang bergeser
 * - kiri: panel dengan mockup HP yang terpotong di tepi bawah (bukan HP melayang + panah)
 * - kanan: accordion bergaris dengan tombol +/- bulat
 *
 * Mockup HP hanya memakai data yang sudah ada (judul, deskripsi, daftar fitur per peran),
 * jadi layar HP mencerminkan menu aplikasi yang sebenarnya:
 *   - judul + deskripsi fitur aktif (crossfade)
 *   - daftar semua fitur peran tersebut, dengan baris aktif tersorot
 */

const EASE = 'ease-[cubic-bezier(0.25,1,0.5,1)]';
const TABS = ['warga', 'pengepul'];

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

function PhoneMockup({ items, activeIndex, roleLabel, lang }) {
  const pick = (f, key) => (lang === 'id' ? f[`${key}ID`] : f[`${key}EN`]);

  return (
    <div className="absolute left-1/2 top-10 h-[560px] w-[270px] -translate-x-1/2 rounded-[2.75rem] bg-ink p-2.5">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[2.25rem] bg-white px-5 pb-6 pt-4">
        {/* Pulau kamera */}
        <div className="absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />

        {/* Status bar */}
        <div className="flex items-center justify-between pt-1 text-[11px] font-medium text-ink">
          <span>9:41</span>
          <span className="flex items-end gap-0.5" aria-hidden="true">
            <span className="h-1 w-0.5 bg-ink" />
            <span className="h-1.5 w-0.5 bg-ink" />
            <span className="h-2 w-0.5 bg-ink" />
            <span className="h-2.5 w-0.5 bg-ink" />
          </span>
        </div>

        {/* Peran aktif */}
        <p className="mt-8 text-xs text-neutral-500">{roleLabel}</p>

        {/* Fitur aktif: crossfade */}
        <div className="relative mt-2 h-36">
          {items.map((feat, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={feat.id}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-all duration-700 ${EASE} motion-reduce:transition-none ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}
              >
                <h4 className="text-xl font-medium leading-tight tracking-tight text-ink">
                  {pick(feat, 'title')}
                </h4>
                <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-neutral-600">
                  {pick(feat, 'desc')}
                </p>
              </div>
            );
          })}
        </div>

        {/* Menu aplikasi: seluruh fitur peran ini */}
        <div className="mt-auto space-y-1.5">
          {items.map((feat, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={feat.id}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs transition-colors duration-500 ${EASE} motion-reduce:transition-none ${
                  isActive ? 'bg-ink text-white' : 'bg-neutral-100 text-neutral-500'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500 ${
                    isActive ? 'bg-white' : 'bg-neutral-300'
                  }`}
                />
                <span className="truncate">{pick(feat, 'title')}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Features() {
  const { t, lang } = useLanguage();
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          {/* Marquee label berjalan di belakang judul */}
          <div className="relative">
            <LabelMarquee text={t('section.features.label')} />
            <h2 className="relative z-10 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tighter text-ink md:text-5xl lg:text-6xl">
              {t('section.features.title')}
            </h2>
          </div>

          {/* Tab pill dengan thumb yang bergeser */}
          <div
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
        <div className="mt-16 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Panel HP */}
          <div className="lg:col-span-5">
            <div className="relative h-[480px] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 md:h-[540px]">
              <PhoneMockup
                items={currentFeatures}
                activeIndex={activeIndex}
                roleLabel={t(`tab.${activeTab}`)}
                lang={lang}
              />
            </div>
            <p className="mt-4 text-xs text-neutral-500">{t('text.simulationData')}</p>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-7">
            <ul className="border-b border-neutral-200">
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
                      <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span
                          className={`text-2xl font-medium tracking-tight transition-colors duration-500 md:text-3xl ${
                            isActive ? 'text-ink' : 'text-neutral-500 group-hover:text-ink'
                          }`}
                        >
                          {lang === 'id' ? feat.titleID : feat.titleEN}
                        </span>
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