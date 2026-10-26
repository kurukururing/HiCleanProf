import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { ROUTES } from '../../routes';
import { PhotoShell } from '../../components/auth/AuthShell';
import { AuthButton, TextField } from '../../components/auth/fields';

/** Daftar pengepul, langkah 2: data usaha. */
export function RegisterBusinessPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', owner: '', phone: '', address: '' });

  const ready = Object.values(form).every((v) => v.trim());
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(ROUTES.login);
  };

  return (
    <PhotoShell>
      <h1 className="text-2xl font-medium text-white md:text-3xl">{t('auth.register.title')}</h1>

      <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
        <TextField
          id="biz-name"
          label={t('auth.biz.name')}
          placeholder={t('auth.biz.nameHint')}
          autoComplete="organization"
          value={form.name}
          onChange={set('name')}
        />
        <TextField
          id="biz-owner"
          label={t('auth.biz.owner')}
          placeholder={t('auth.biz.ownerHint')}
          autoComplete="name"
          value={form.owner}
          onChange={set('owner')}
        />
        <TextField
          id="biz-phone"
          type="tel"
          inputMode="tel"
          label={t('auth.biz.phone')}
          placeholder={t('auth.biz.phoneHint')}
          autoComplete="tel"
          value={form.phone}
          onChange={set('phone')}
        />
        <TextField
          id="biz-address"
          label={t('auth.biz.address')}
          placeholder={t('auth.biz.addressHint')}
          autoComplete="street-address"
          value={form.address}
          onChange={set('address')}
        />

        <AuthButton ready={ready} className="mt-2">
          {t('auth.register.submit')}
        </AuthButton>

        <p className="text-center text-sm text-white">
          {t('auth.register.haveAccount')}{' '}
          <Link
            to={ROUTES.login}
            className="rounded-sm font-medium text-brand-green underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t('auth.register.login')}
          </Link>
        </p>
      </form>
    </PhotoShell>
  );
}
