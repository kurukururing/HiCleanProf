import { useLanguage } from '../../i18n/LanguageContext';
import { SectionHeading } from '../ui/SectionHeading';
import { teamMembers } from '../../data/team';
import { siteConfig } from '../../config/siteConfig';

export function Team() {
  const { t } = useLanguage();

  return (
    <section id="team" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading label={t('section.team.label')} title={t('section.team.title')} className="items-center text-center" />
        <p className="text-neutral-500 mb-12 -mt-8">{siteConfig.institution} · {siteConfig.competition}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-24 h-24 mx-auto bg-brand-green-50 text-brand-green rounded-full flex items-center justify-center text-2xl font-bold font-heading mb-6">
                {member.initials}
              </div>
              <h3 className="text-xl font-semibold text-ink mb-1">{member.name}</h3>
              <p className="text-sm text-neutral-500">{t(member.roleKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}