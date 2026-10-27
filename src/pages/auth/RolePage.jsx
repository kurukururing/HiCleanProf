import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { ROUTES } from '../../routes';
import { PhotoShell } from '../../components/auth/AuthShell';

/**
 * Di Figma, foto peran adalah cutout (PNG transparan) yang menyembul di atas kartu.
 * Selama cutout belum ada, foto dari company profile di-crop ke orangnya.
 * Ganti `photo` dengan PNG cutout + hapus `focus` bila aset sudah tersedia.
 */
const ROLES = [
  {
    key: 'warga',
    to: ROUTES.registerWarga,
    photo: { src: '/hiCleanUser.jpeg', pos: '39% 0%', origin: '39% 14%' },
  },
  {
    key: 'pengepul',
    to: ROUTES.registerPengepul,
    photo: { src: '/hiCleanUser2.jpeg', pos: '55% 0%', origin: '55% 12%' },
  },
];

function RoleCard({ to, photo, title, description }) {
  return (
    <Link
      to={to}
      className="group grid h-28 grid-cols-[45%_1fr] overflow-hidden rounded-[1.75rem] bg-white shadow-xl shadow-black/20 border-2 border-transparent hover:border-brand-green hover:shadow-lg active:scale-[0.97] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none md:h-32"
    >
      <div className="relative overflow-hidden bg-neutral-200">
        <img
          src={photo.src}
          alt=""
          aria-hidden="true"
          decoding="async"
          style={{ objectPosition: photo.pos, transformOrigin: photo.origin }}
          className="absolute inset-0 h-full w-full scale-[2.1] object-cover transition-transform duration-500 group-hover:scale-[2.25] motion-reduce:transition-none"
        />
      </div>
      <div className="flex flex-col justify-center px-4">
        <h2 className="text-xl font-bold tracking-tight text-role md:text-2xl">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-neutral-600">{description}</p>
      </div>
    </Link>
  );
}

export function RolePage() {
  const { t } = useLanguage();

  return (
    <PhotoShell size="lg">
      <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-[2.5rem]">{t('auth.role.title')}</h1>
      <p className="mt-2 text-lg font-medium text-white">{t('auth.role.subtitle')}</p>

      <div className="mt-10 md:mt-12">
        <RoleCard {...ROLES[0]} title={t('auth.role.warga')} description={t('auth.role.wargaDesc')} />

        <p className="my-8 pl-[calc(45%+1rem)] text-xl font-medium text-white">{t('auth.or')}</p>

        <RoleCard {...ROLES[1]} title={t('auth.role.pengepul')} description={t('auth.role.pengepulDesc')} />
      </div>
    </PhotoShell>
  );
}
