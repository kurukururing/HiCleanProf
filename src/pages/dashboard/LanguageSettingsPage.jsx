import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function LanguageSettingsPage() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState('American English');

  const languages = [
    { name: 'Arabic', flag: '🇸🇦' },
    { name: 'Indonesia', flag: '🇮🇩' },
    { name: 'Japanese', flag: '🇯🇵' },
    { name: 'Danish', flag: '🇩🇰' },
    { name: 'Dutch', flag: '🇳🇱' }
  ];

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
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Bahasa</h1>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold text-neutral-500 mb-2">Bahasa Saat Ini</p>
            <div className="flex items-center justify-between p-4 rounded-3xl bg-white border border-brand-green shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇺🇸</span>
                <span className="text-xs font-bold text-neutral-900">{selectedLang}</span>
              </div>
              <div className="size-6 rounded-full bg-brand-green text-ink flex items-center justify-center">
                <Check className="size-3.5" />
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-neutral-500 mb-2">Semua Bahasa</p>
            <div className="space-y-2">
              {languages.map((lg) => (
                <button
                  key={lg.name}
                  type="button"
                  onClick={() => setSelectedLang(lg.name)}
                  className="w-full flex items-center justify-between p-4 rounded-3xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lg.flag}</span>
                    <span className="text-xs font-bold text-neutral-900">{lg.name}</span>
                  </div>
                  <span className="size-5 rounded-full border border-neutral-300" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center rounded-2xl bg-neutral-900 text-white py-4 px-6 text-xs font-bold hover:bg-neutral-800 transition-colors shadow-lg"
          >
            Simpan
          </button>
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
