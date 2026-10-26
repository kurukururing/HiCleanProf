import { useLanguage } from '../../i18n/LanguageContext';
import { SectionHeading } from '../ui/SectionHeading';
import { User, Truck, Leaf } from 'lucide-react';
import { priceTable } from '../../data/priceTable';

export function Impact() {
  const { t, lang } = useLanguage();

  const impacts = [
    { icon: User, title: t('impact.warga.title'), desc: t('impact.warga.desc') },
    { icon: Truck, title: t('impact.pengepul.title'), desc: t('impact.pengepul.desc') },
    { icon: Leaf, title: t('impact.lingkungan.title'), desc: t('impact.lingkungan.desc') }
  ];

  return (
    <section id="impact" className="py-24 md:py-32 bg-neutral-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label={t('section.impact.label')} title={t('section.impact.title')} className="text-center md:text-left" />

        {/* 3 Kolom Dampak */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 mt-12">
          {impacts.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center md:items-start md:text-left group">
              <div className="w-16 h-16 bg-white border border-neutral-200 text-ink rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-green group-hover:text-white group-hover:border-brand-green transition-all duration-300">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-ink mb-3">{item.title}</h3>
              <p className="text-neutral-600 text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Tabel Harga Minimalis */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm md:text-base whitespace-nowrap">
              <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-neutral-200 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-8 py-6 sticky left-0 bg-neutral-50 z-10">{t('impact.table.type')}</th>
                  <th className="px-8 py-6">{t('impact.table.pengepul')}</th>
                  <th className="px-8 py-6">{t('impact.table.bank')}</th>
                  <th className="px-8 py-6 text-brand-green">{t('impact.table.diff')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {priceTable.map((row) => (
                  <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors group">
                    <td className="px-8 py-5 font-semibold text-ink sticky left-0 bg-white group-hover:bg-neutral-50/50 transition-colors shadow-[4px_0_12px_-4px_rgba(0,0,0,0.02)] z-10">
                      {lang === 'id' ? row.nameID : row.nameEN}
                    </td>
                    <td className="px-8 py-5 text-neutral-600 font-medium">{row.pengepul}</td>
                    <td className="px-8 py-5 text-neutral-600 font-medium">{row.bank}</td>
                    <td className="px-8 py-5 font-bold text-brand-green bg-brand-green-50/30">{row.diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-neutral-400 mt-6 px-4 italic">{t('impact.table.note')} (hiduphijau.com)</p>
      </div>
    </section>
  );
}