import { useLanguage } from '../../i18n/LanguageContext';
import { SectionHeading } from '../ui/SectionHeading';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export function Validation() {
  const { t } = useLanguage();

  return (
    <section id="validation" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label={t('section.validation.label')} title={t('section.validation.title')} />

        {/* Statistik Besar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-neutral-200 mb-12">
          <div className="text-center md:text-left">
            <div className="text-5xl md:text-6xl font-bold font-heading text-brand-green mb-2">98,3%</div>
            <div className="text-sm text-neutral-600 font-medium">{t('val.successRate')}</div>
            <div className="text-xs text-neutral-400 mt-1">Maze</div>
          </div>
          <div className="text-center md:text-left md:border-l md:border-neutral-200 md:pl-8">
            <div className="text-5xl md:text-6xl font-bold font-heading text-ink mb-2">12</div>
            <div className="text-sm text-neutral-600 font-medium">{t('val.respondent')}</div>
          </div>
          <div className="text-center md:text-left md:border-l md:border-neutral-200 md:pl-8">
            <div className="text-5xl md:text-6xl font-bold font-heading text-ink mb-2">59/60</div>
            <div className="text-sm text-neutral-600 font-medium">{t('val.taskSuccess')}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ringkasan Riset */}
          <div className="bg-neutral-50 p-6 md:p-8 rounded-2xl border border-neutral-100">
            <h3 className="font-semibold text-lg mb-4">{t('val.research')}</h3>
            <ul className="space-y-4 text-neutral-600">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" /><span>{t('val.research.1')}</span></li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" /><span>{t('val.research.2')}</span></li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" /><span>{t('val.research.3')}</span></li>
            </ul>
          </div>

          {/* Kotak Keterbatasan (Wajib) */}
          <div className="bg-orange-50 p-6 md:p-8 rounded-2xl border-l-4 border-l-accent-orange border-y border-r border-orange-100">
            <div className="flex items-center gap-3 mb-4 text-orange-800">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-semibold text-lg">{t('val.limit.title')}</h3>
            </div>
            <ul className="space-y-3 text-orange-900/80 list-disc pl-5">
              <li>{t('val.limit.1')}</li>
              <li>{t('val.limit.2')}</li>
              <li>{t('val.limit.3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}