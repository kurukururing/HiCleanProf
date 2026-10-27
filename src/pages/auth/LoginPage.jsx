import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { ROUTES } from '../../routes';
import { PhotoShell } from '../../components/auth/AuthShell';
import { AuthButton, Checkbox, OrDivider, PasswordField, SocialButtons, TextField } from '../../components/auth/fields';

const linkGreen =
  'rounded-sm text-brand-green underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export function LoginPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const ready = Boolean(email.trim() && password.trim());

  // Logika sederhana: jika email mengandung "pengepul", arahkan ke dashboard pengepul. Jika tidak, ke dashboard warga.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.toLowerCase().includes('pengepul')) {
      localStorage.setItem('hiclean_role', 'pengepul');
      navigate(ROUTES.pengepulDashboard);
    } else {
      localStorage.setItem('hiclean_role', 'warga');
      navigate(ROUTES.dashboard);
    }
  };

  return (
    <PhotoShell>
      <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">{t('auth.login.title')}</h1>
      <div className="mt-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white/80 leading-relaxed">
        💡 Tips demo: ketik email dengan kata &quot;pengepul&quot; untuk masuk sebagai Pengepul.
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <TextField
          id="login-email"
          type="email"
          label={t('auth.field.email')}
          placeholder="warga@gmail.com atau pengepul@gmail.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordField
          id="login-password"
          label={t('auth.field.password')}
          placeholder={t('auth.field.passwordHint')}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between gap-4 min-h-[44px]">
          <Checkbox id="login-remember" label={t('auth.login.remember')} checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          <Link to={ROUTES.forgot} className={`text-sm py-2 ${linkGreen}`}>
            {t('auth.login.forgot')}
          </Link>
        </div>

        <AuthButton ready={ready}>{t('auth.login.submit')}</AuthButton>

        <OrDivider />
        <SocialButtons />

        <p className="pt-1 text-center text-sm text-white">
          {t('auth.login.noAccount')}{' '}
          <Link to={ROUTES.role} className={`font-medium ${linkGreen}`}>
            {t('auth.login.register')}
          </Link>
        </p>
      </form>
    </PhotoShell>
  );
}
