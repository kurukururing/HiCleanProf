import { useState } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { siteConfig } from '../../config/siteConfig';

const ROLES = ['warga', 'pengepul', 'mitra', 'lainnya'];

// Teks yang sebelumnya hardcoded. Pindahkan ke i18n bila sudah punya key-nya.
const COPY = {
  id: { email: 'Email', social: 'Media sosial', another: 'Kirim pesan lain' },
  en: { email: 'Email', social: 'Social media', another: 'Send another message' },
};

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';
const focusRingLight =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

const inputClass = `w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-ink transition-colors placeholder:text-neutral-400 hover:border-neutral-400 focus:bg-white ${focusRing}`;

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}

/**
 * Contact — panel gelap berisi info kontak (kiri) dan kartu form putih (kanan).
 * Kontras tinggi hitam/putih mengikuti gaya Juriso. Spasi dirapatkan:
 * tidak ada header terpisah, kolom kiri mengisi tinggi form (justify-between)
 * sehingga tidak ada ruang kosong di bawah info kontak.
 */
export function Contact() {
  const { t, lang } = useLanguage();
  const copy = COPY[lang] ?? COPY.en;
  const [sent, setSent] = useState(false);
  const { email, social } = siteConfig.contact;

  // Form hanya simulasi: belum ada pengiriman ke server.
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-[2rem] bg-ink p-3 md:gap-4 md:p-4 lg:grid-cols-12">
          {/* Kiri: judul + info kontak */}
          <div className="flex flex-col justify-between gap-12 p-5 md:p-8 lg:col-span-5 lg:p-10">
            <h2 className="max-w-[14ch] text-4xl font-medium leading-[1.05] tracking-tighter text-white md:text-5xl lg:text-6xl">
              {t('section.contact.title')}
            </h2>

            <dl className="border-t border-white/15">
              <div className="border-b border-white/15 py-5">
                <dt className="text-sm text-white/50">{copy.email}</dt>
                <dd className="mt-1.5 text-xl font-medium tracking-tight text-white md:text-2xl">
                  <a
                    href={`mailto:${email}`}
                    className={`group inline-flex items-center gap-2 break-all rounded-sm ${focusRingLight}`}
                  >
                    <span className="underline-offset-4 group-hover:underline">hiCleanCorp@gmail.com</span>
                    <ArrowUpRight
                      className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      aria-hidden
                    />
                  </a>
                </dd>
              </div>
              <div className="py-5">
                <dt className="text-sm text-white/50">{copy.social}</dt>
                <dd className="mt-1.5 text-xl font-medium tracking-tight text-white md:text-2xl">
                  @hicle0n.id
                </dd>
              </div>
            </dl>
          </div>

          {/* Kanan: form di kartu putih */}
          <div className="rounded-3xl bg-white p-6 md:p-10 lg:col-span-7">
            {sent ? (
              <div role="status" className="flex min-h-[22rem] flex-col items-start justify-center gap-5">
                <CheckCircle2 className="size-10 text-ink" strokeWidth={1.5} aria-hidden />
                <h3 className="max-w-md text-2xl font-medium leading-tight tracking-tight text-ink md:text-3xl">
                  {t('contact.success')}
                </h3>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className={`rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink ${focusRing}`}
                >
                  {copy.another}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <fieldset>
                  <legend className="mb-3 text-sm font-medium text-ink">{t('contact.role')}</legend>
                  <div className="flex flex-wrap gap-2">
                    {ROLES.map((role) => (
                      <label key={role} className="cursor-pointer">
                        <input
                          type="radio"
                          name="role"
                          value={role}
                          defaultChecked={role === ROLES[0]}
                          className="peer sr-only"
                        />
                        <span className="block rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 transition-colors duration-300 hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                          {t(`contact.role.${role}`)}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label={t('contact.name')}>
                    <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
                  </Field>
                  <Field id="email" label={t('contact.email')}>
                    <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
                  </Field>
                </div>

                <Field id="message" label={t('contact.message')}>
                  <textarea id="message" name="message" rows={5} required className={`${inputClass} resize-y`} />
                </Field>

                <button
                  type="submit"
                  className={`group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-85 sm:w-auto ${focusRing}`}
                >
                  {t('action.sendMessage')}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                    aria-hidden
                  />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}