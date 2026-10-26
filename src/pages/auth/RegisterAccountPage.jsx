import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { ROUTES } from '../../routes';
import { PhotoShell } from '../../components/auth/AuthShell';
import { AuthButton, PasswordField, TextField } from '../../components/auth/fields';

/**
 * Daftar langkah akun (nama pengguna, email, password).
 * - role="warga"    → tombol "Daftar" → kembali ke Login
 * - role="pengepul" → tombol "Selanjutnya →" → langkah data usaha
 */
export function RegisterAccountPage({ role = 'warga' }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });

  const isPengepul = role === 'pengepul';
  const ready = Object.values(form).every((v) => v.trim());
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(isPengepul ? ROUTES.registerPengepulUsaha : ROUTES.login);
  };

  return (
    <PhotoShell>
      <h1 className="text-2xl font-medium text-white md:text-3xl">{t('auth.register.title')}</h1>

      <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
        <TextField
          id="reg-username"
          label={t('auth.field.username')}
          placeholder={t('auth.field.emailHint')}
          autoComplete="username"
          value={form.username}
          onChange={set('username')}
        />
        <TextField
          id="reg-email"
          type="email"
          label={t('auth.field.email')}
          placeholder={t('auth.field.emailHint')}
          autoComplete="email"
          value={form.email}
          onChange={set('email')}
        />
        <PasswordField
          id="reg-password"
          label={t('auth.field.password')}
          placeholder={t('auth.field.passwordHint')}
          autoComplete="new-password"
          value={form.password}
          onChange={set('password')}
        />
        <PasswordField
          id="reg-confirm"
          label={t('auth.field.confirmPassword')}
          placeholder={t('auth.field.passwordHint')}
          autoComplete="new-password"
          value={form.confirm}
          onChange={set('confirm')}
        />

        <AuthButton ready={ready} className="mt-2">
          {isPengepul ? (
            <>
              {t('auth.register.next')}
              <ArrowRight className="size-5" aria-hidden />
            </>
          ) : (
            t('auth.register.submit')
          )}
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
