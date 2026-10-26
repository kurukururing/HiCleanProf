import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { ROUTES } from '../../routes';
import { ForgotShell } from '../../components/auth/AuthShell';
import { AuthButton, OtpInput } from '../../components/auth/fields';

const OTP_LENGTH = 6;

/** Lupa Password, langkah 2: kode OTP 6 digit. */
export function OtpPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));

  // Email dari langkah sebelumnya; contoh dari Figma dipakai bila halaman dibuka langsung.
  const email = state?.email || 'budi@gmail.com';
  const ready = digits.every(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(ROUTES.forgotReset);
  };

  return (
    <ForgotShell
      title={t('auth.otp.title')}
      description={
        <>
          {t('auth.otp.desc')}
          <br />
          <span className="break-all">{email}</span>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        <OtpInput value={digits} onChange={setDigits} length={OTP_LENGTH} />
        <AuthButton ready={ready}>{t('auth.send')}</AuthButton>
      </form>
    </ForgotShell>
  );
}
