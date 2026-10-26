import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { ROUTES } from '../../routes';
import { ForgotShell } from '../../components/auth/AuthShell';
import { AuthButton, TextField } from '../../components/auth/fields';

/** Lupa Password, langkah 1: masukkan email. */
export function ForgotPasswordPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(ROUTES.forgotOtp, { state: { email: email.trim() } });
  };

  return (
    <ForgotShell title={t('auth.forgot.title')} description={t('auth.forgot.desc')}>
      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        <TextField
          id="forgot-email"
          type="email"
          tone="light"
          aria-label={t('auth.field.email')}
          placeholder={t('auth.field.emailHint')}
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthButton ready={Boolean(email.trim())}>{t('auth.send')}</AuthButton>
      </form>
    </ForgotShell>
  );
}
