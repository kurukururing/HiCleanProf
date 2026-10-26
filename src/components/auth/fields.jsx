import { useRef, useState } from 'react';
import { Check, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

/* ------------------------------------------------------------------ */
/* Gaya bersama                                                        */
/* ------------------------------------------------------------------ */

const inputBase =
  'h-[52px] w-full rounded-full border border-field-line bg-field px-5 text-base text-ink transition-colors placeholder:text-sm placeholder:text-neutral-600 hover:border-neutral-400 focus-visible:border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green md:text-sm';

// tone="dark"  → dipakai di atas foto gelap (label putih)
// tone="light" → dipakai di atas latar abu (label gelap)
const labelTone = { dark: 'text-white', light: 'text-ink' };

/* ------------------------------------------------------------------ */
/* Field teks                                                          */
/* ------------------------------------------------------------------ */

export function TextField({ id, label, tone = 'dark', className = '', ...inputProps }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className={`mb-2 block text-sm ${labelTone[tone]}`}>
          {label}
        </label>
      )}
      <input id={id} className={inputBase} {...inputProps} />
    </div>
  );
}

/** Field password dengan tombol mata. `reveal={false}` untuk tanpa tombol (mis. halaman reset). */
export function PasswordField({ id, label, tone = 'dark', reveal = true, className = '', ...inputProps }) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className={`mb-2 block text-sm ${labelTone[tone]}`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className={`${inputBase} ${reveal ? 'pr-14' : ''}`}
          {...inputProps}
        />
        {reveal && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? t('auth.password.hide') : t('auth.password.show')}
            aria-pressed={visible}
            className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-ink transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
          >
            {visible ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tombol utama                                                        */
/* ------------------------------------------------------------------ */

/**
 * Tombol utama form. `ready` = form sudah terisi → hijau; belum → gelap (sesuai dua kondisi di Figma).
 * Tombol tetap bisa diklik di kedua kondisi supaya alur bisa dicoba tanpa mengisi apa pun.
 */
export function AuthButton({ ready = false, children, className = '', ...props }) {
  return (
    <button
      type="submit"
      className={`inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full font-heading text-lg font-medium text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green motion-reduce:transition-none ${
        ready ? 'bg-brand-green hover:bg-brand-green/90' : 'bg-ink hover:bg-neutral-800'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Checkbox "Ingat saya"                                               */
/* ------------------------------------------------------------------ */

export function Checkbox({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer select-none items-center gap-2.5 text-sm text-white">
      <input id={id} type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="grid size-5 place-items-center rounded-[5px] bg-field text-white transition-colors peer-checked:bg-brand-green peer-checked:[&_svg]:opacity-100 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white">
        <Check className="size-3.5 opacity-0 transition-opacity" strokeWidth={3} aria-hidden />
      </span>
      {label}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Login sosial & pemisah                                              */
/* ------------------------------------------------------------------ */

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09C3.25 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.27C.46 8.24 0 10.06 0 12s.46 3.76 1.27 5.38l4-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.62l4 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

const socialBtn =
  'inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-white font-heading text-lg font-medium text-black shadow-sm transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

/** Tombol Google & Apple (visual saja, belum terhubung ke penyedia login). */
export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button type="button" className={socialBtn}>
        <GoogleIcon />
        Google
      </button>
      <button type="button" className={socialBtn}>
        <AppleIcon />
        Apple
      </button>
    </div>
  );
}

export function OrDivider() {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-3 text-sm text-white" role="separator">
      <span className="h-px flex-1 bg-white/80" aria-hidden />
      {t('auth.or')}
      <span className="h-px flex-1 bg-white/80" aria-hidden />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* OTP 6 digit                                                         */
/* ------------------------------------------------------------------ */

export function OtpInput({ value, onChange, length = 6 }) {
  const { t } = useLanguage();
  const refs = useRef([]);

  const focusAt = (i) => refs.current[Math.max(0, Math.min(length - 1, i))]?.focus();

  const handleChange = (i, e) => {
    const digit = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...value];
    next[i] = digit;
    onChange(next);
    if (digit) focusAt(i + 1);
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !value[i]) {
      e.preventDefault();
      const next = [...value];
      next[i - 1] = '';
      onChange(next);
      focusAt(i - 1);
    } else if (e.key === 'ArrowLeft') focusAt(i - 1);
    else if (e.key === 'ArrowRight') focusAt(i + 1);
  };

  const handlePaste = (e) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!digits) return;
    e.preventDefault();
    onChange(Array.from({ length }, (_, i) => digits[i] ?? ''));
    focusAt(digits.length);
  };

  return (
    <div className="grid grid-cols-6 gap-2 sm:gap-3" onPaste={handlePaste}>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={value[i] ?? ''}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          aria-label={`${t('auth.otp.digit')}${i + 1}`}
          className="h-14 w-full min-w-0 rounded-2xl border border-neutral-400 bg-transparent text-center font-heading text-xl font-semibold text-ink transition-colors hover:border-neutral-600 focus-visible:border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
        />
      ))}
    </div>
  );
}
