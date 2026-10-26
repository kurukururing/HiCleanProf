import { useState } from 'react';
import { ArrowLeft, Menu, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

export function PengepulBahasaPage() {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState('en');

  const languages = [
    { id: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { id: 'id', name: 'Indonesia', flag: '🇮🇩' },
    { id: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { id: 'da', name: 'Danish', flag: '🇩🇰' },
    { id: 'nl', name: 'Dutch', flag: '🇳🇱' },
  ];

  const handleSave = () => {
    navigate(ROUTES.pengepulProfile);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulProfile)}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>

          <h1 className="text-base font-extrabold text-neutral-900">Bahasa</h1>

          <Link
            to={ROUTES.pengepulDashboard}
            className="size-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          >
            <Menu className="size-4" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow mx-auto w-full max-w-md px-4 py-5 space-y-5">
        
        {/* Bahasa Saat Ini */}
        <div className="space-y-2">
          <h2 className="text-sm font-extrabold text-neutral-900">Bahasa Saat Ini</h2>
          <div 
            onClick={() => setSelectedLang('en')}
            className="rounded-3xl bg-white p-4 shadow-sm border border-neutral-200/80 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇺🇸</span>
              <span className="text-sm font-bold text-neutral-900">American English</span>
            </div>
            <div className="size-6 rounded-full bg-brand-green text-white flex items-center justify-center shadow-sm">
              <Check className="size-4 stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Semua Bahasa */}
        <div className="space-y-2.5">
          <h2 className="text-sm font-extrabold text-neutral-900">Semua Bahasa</h2>

          <div className="space-y-2.5">
            {languages.map((lang) => {
              const isSelected = selectedLang === lang.id;
              return (
                <div
                  key={lang.id}
                  onClick={() => setSelectedLang(lang.id)}
                  className={`rounded-3xl bg-white p-4 shadow-sm border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected ? 'border-brand-green ring-2 ring-brand-green/20' : 'border-neutral-200/80 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-sm font-bold text-neutral-900">{lang.name}</span>
                  </div>

                  <div className={`size-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-brand-green bg-brand-green text-white' : 'border-neutral-300 bg-neutral-200'
                  }`}>
                    {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Floating Bottom Bar: Simpan */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={handleSave}
            className="w-full flex items-center justify-center py-4 rounded-2xl bg-brand-green text-ink text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-lg active:scale-[0.99]"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

