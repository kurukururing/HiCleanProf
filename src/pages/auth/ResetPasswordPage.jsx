import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { ROUTES } from '../../routes';
import { ForgotShell } from '../../components/auth/AuthShell';
import { AuthButton, PasswordField } from '../../components/auth/fields';

/** Lupa Password, langkah 3: atur kata sandi baru, lalu kembali ke Login. */
export function ResetPasswordPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(ROUTES.login);
  };

  return (
    <ForgotShell title={t('auth.reset.title')} description={t('auth.reset.desc')}>
      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        <PasswordField
          id="reset-password"
          tone="light"
          reveal={false}
          label={t('auth.reset.newPassword')}
          placeholder={t('auth.field.passwordHint')}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordField
          id="reset-confirm"
          tone="light"
          reveal={false}
          label={t('auth.reset.confirm')}
          placeholder={t('auth.field.passwordHint')}
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <AuthButton ready={Boolean(password.trim() && confirm.trim())} className="mt-1">
          {t('auth.send')}
        </AuthButton>
      </form>
    </ForgotShell>
  );
}
