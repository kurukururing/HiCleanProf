import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function SecuritySettingsPage() {
  const navigate = useNavigate();
  const [biometric, setBiometric] = useState(false);
  const [twoStep, setTwoStep] = useState(true);

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3 sm:px-6">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="size-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors text-neutral-800"
          >
            <ArrowLeft className="size-5" />
          </button>
          
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-8 w-auto" />
          </Link>

          <Link to="/dashboard" className="text-xs font-semibold text-brand-green hover:underline">
            Beranda
          </Link>
        </div>
      </header>

      <main className="flex-grow mx-auto w-full max-w-md px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Keamanan</h1>

        <div className="space-y-4">
          <p className="text-xs font-bold text-neutral-500">Autentikasi</p>

          <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-neutral-900">Biometrik</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Masuk cepat tanpa menggunakan password dan verifikasi instan</p>
              </div>

              <button
                type="button"
                onClick={() => setBiometric(!biometric)}
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${biometric ? 'bg-brand-green' : 'bg-neutral-300'}`}
              >
                <span className={`inline-block size-5 transform rounded-full bg-white shadow transition-transform mt-0.5 ml-0.5 ${biometric ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <div>
                <p className="text-sm font-bold text-neutral-900">Verifikasi 2 langkah</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Kirimkan kode OTP melalui whatsapp kenomor yang sudah terdaftar saat ada perangkat tidak dikenal</p>
              </div>

              <button
                type="button"
                onClick={() => setTwoStep(!twoStep)}
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${twoStep ? 'bg-brand-green' : 'bg-neutral-300'}`}
              >
                <span className={`inline-block size-5 transform rounded-full bg-white shadow transition-transform mt-0.5 ml-0.5 ${twoStep ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

      </main>

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>&copy; {siteConfig.year} Hi-Clean App. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-6">
            <Link to="/kebijakan-privasi" className="hover:text-neutral-900 transition-colors">Kebijakan Privasi</Link>
            <span>&bull;</span>
            <Link to="/syarat-ketentuan" className="hover:text-neutral-900 transition-colors">Syarat Ketentuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
