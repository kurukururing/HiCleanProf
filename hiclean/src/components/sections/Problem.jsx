import { useLanguage } from '../../i18n/LanguageContext';
import { problemStats, painPoints } from '../../data/stats';
import { LabelMarquee } from '../ui/LabelMarquee';

/**
 * Problem section — kontras ditambah:
 * - latar warm-50 (hangat, terlihat beda dari putih; neutral-50 hanya 1,04:1 vs putih)
 * - statistik masuk panel gelap (ink): angka putih, satuan hijau brand
 * - daftar masalah tetap editorial: garis tebal ink + garis tipis ink/10
 * - label section berupa teks besar yang bergerak otomatis di belakang judul (marquee)
 */

// "Warga (Aulia Rahma)" → peran + nama persona
function splitPersona(title) {
  const match = title.match(/^(.*?)\s*\((.+)\)\s*$/);
  return match ? { role: match[1], name: match[2] } : { role: title, name: null };
}

// Satu kolom persona: aturan tebal di atas, peran sebagai tipografi besar, masalah sebagai daftar bergaris
function PainGroup({ title, items, t }) {
  const { role, name } = splitPersona(title);

  return (
    <section aria-label={title} className="border-t-2 border-ink pt-5">
      <header className="flex items-baseline justify-between gap-4">
        <h3 className="text-3xl font-medium leading-none tracking-tighter text-ink md:text-4xl">{role}</h3>
        {name && <p className="text-sm text-ink/60">{name}</p>}
      </header>

      <ul className="mt-8">
        {items.map((key, i) => (
          <li
            key={key}
            className="grid grid-cols-[2.5rem_1fr] border-t border-ink/15 py-4 text-lg leading-snug text-ink"
          >
            <span className="pt-1 text-xs tabular-nums text-ink/50">{String(i + 1).padStart(2, '0')}</span>
            {t(key)}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Problem() {
  const { t, lang } = useLanguage();

  return (
    <section id="problem" className="scroll-mt-20 overflow-x-clip bg-warm-50 py-24 md:py-32">
      {/* Header: marquee berjalan di belakang judul, tanpa menambah tinggi section */}
      <div className="relative">
        <LabelMarquee text={t('section.problem.label')} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <h2 className="max-w-[16ch] text-4xl font-medium leading-[1.05] tracking-tighter text-ink md:text-5xl lg:text-6xl">
                {t('section.problem.title')}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Statistik: panel gelap */}
        <div className="mt-14 rounded-[2rem] bg-ink px-6 py-10 md:mt-16 md:px-12 md:py-14">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
            {problemStats.map((stat) => {
              const value = lang === 'id' ? stat.valueID : stat.valueEN;
              const unit = lang === 'id' ? stat.unitID : stat.unitEN;
              return (
                <div
                  key={stat.id}
                  className="flex min-w-0 flex-col xl:border-l xl:border-white/15 xl:pl-8 xl:first:border-l-0 xl:first:pl-0"
                >
                  {/* Angka besar + satuan kecil: satuan turun ke baris baru bila tidak muat,
                      sehingga tidak pernah meluber ke kolom sebelah */}
                  <dd className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-5xl font-medium leading-none tracking-tighter tabular-nums text-white md:text-6xl xl:text-5xl 2xl:text-6xl">
                      {value}
                    </span>
                    {unit && (
                      <span className="text-xl font-medium tracking-tight text-brand-green md:text-2xl">
                        {unit}
                      </span>
                    )}
                  </dd>

                  <dt className="mt-5 max-w-[18rem] text-sm leading-snug text-white/75">
                    {t(stat.descKey)}
                  </dt>

                  {/* mt-auto: sumber selalu sejajar di dasar kolom */}
                  {stat.source && <p className="mt-auto pt-3 text-xs text-white/40">{stat.source}</p>}
                </div>
              );
            })}
          </dl>
        </div>

        <p className="mt-5 text-xs italic text-ink/50">{t('stat.extra')}</p>

        {/* Pain points: dua kolom editorial, tanpa kartu dan ikon */}
        <div className="mt-16 grid gap-x-16 gap-y-14 md:mt-20 md:grid-cols-2">
          <PainGroup title={t('pain.warga.title')} items={painPoints.warga} t={t} />
          <PainGroup title={t('pain.pengepul.title')} items={painPoints.pengepul} t={t} />
        </div>
      </div>
    </section>
  );
}