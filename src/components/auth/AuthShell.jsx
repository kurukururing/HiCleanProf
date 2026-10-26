import { LockIllustration } from './LockIllustration';

/**
 * Latar halaman auth ber-foto (Login, Pilih Peran, Daftar).
 * Foto jalan + pepohonan dari company profile, di-blur dan digelapkan seperti di Figma.
 * Mobile: form full-width di bawah navbar. Desktop (md+): form berada di kartu kaca di tengah.
 */
export function PhotoShell({ children, size = 'md' }) {
  const width = size === 'lg' ? 'max-w-lg' : 'max-w-md';

  return (
    <main className="relative isolate flex min-h-[100svh] flex-grow flex-col overflow-hidden bg-ink pt-16">
      <img
        src="/hiCleanUser2.jpeg"
        alt=""
        aria-hidden="true"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover object-[20%_55%] blur-md md:origin-[0%_70%] md:scale-[1.6]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-black/50 to-black/65" aria-hidden="true" />

      <div className={`mx-auto w-full ${width} px-5 pb-16 pt-14 sm:px-6 sm:pt-16 md:my-auto md:py-16`}>
        <div className="md:rounded-[2rem] md:border md:border-white/10 md:bg-black/25 md:p-10 md:shadow-2xl md:shadow-black/30 md:backdrop-blur-md">
          {children}
        </div>
      </div>
    </main>
  );
}

/**
 * Latar abu polos untuk alur Lupa Password: ilustrasi gembok di atas, lalu judul, deskripsi, dan form.
 */
export function ForgotShell({ title, description, children }) {
  return (
    <main className="flex min-h-[85svh] flex-grow flex-col bg-auth-plain pt-16">
      <div className="mx-auto w-full max-w-md px-5 pb-16 pt-10 sm:px-6 md:my-auto md:py-16">
        <LockIllustration className="mx-auto h-auto w-44 md:w-52" />

        <h1 className="mt-10 text-center text-[1.75rem] font-semibold leading-tight tracking-tight text-black md:text-3xl">
          {title}
        </h1>
        <p className="mt-3 text-balance text-center font-heading text-lg font-medium leading-snug text-black md:text-xl">
          {description}
        </p>

        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
