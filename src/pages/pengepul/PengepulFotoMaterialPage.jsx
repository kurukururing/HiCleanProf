import { useState } from 'react';
import { ArrowLeft, Menu, Camera, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

export function PengepulFotoMaterialPage() {
  const navigate = useNavigate();
  const [captured, setCaptured] = useState(true);

  const handleSave = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>

          <h1 className="text-base font-extrabold text-neutral-900">Foto Bukti Sampah</h1>

          <Link
            to={ROUTES.pengepulDashboard}
            className="size-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          >
            <Menu className="size-4" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow mx-auto w-full max-w-md px-4 py-5 flex flex-col items-center justify-between">
        
        {/* Camera Viewfinder with Green Corners */}
        <div className="relative w-full aspect-[3/4] max-h-[500px] rounded-3xl overflow-hidden border-2 border-brand-green bg-neutral-900 shadow-2xl flex items-center justify-center">
          {/* Bale photo from Figma upload */}
          <img 
            src="/material/foto-material.jpg" 
            alt="Bal Sampah Pres" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80';
            }}
          />

          {/* Corner frame overlays */}
          <div className="absolute top-4 left-4 size-8 border-t-4 border-l-4 border-brand-green rounded-tl-xl pointer-events-none" />
          <div className="absolute top-4 right-4 size-8 border-t-4 border-r-4 border-brand-green rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 size-8 border-b-4 border-l-4 border-brand-green rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 size-8 border-b-4 border-r-4 border-brand-green rounded-br-xl pointer-events-none" />

          {/* Shutter capture button overlay */}
          <div className="absolute bottom-6 inset-x-0 flex justify-center">
            <button
              type="button"
              onClick={() => setCaptured(!captured)}
              className="size-16 rounded-full bg-brand-green text-white shadow-xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center ring-4 ring-white/50"
            >
              <Camera className="size-7" />
            </button>
          </div>
        </div>

        <p className="text-xs text-neutral-500 text-center mt-3">
          Pastikan kondisi ikatan bal, label kemasan, dan tingkat kekeringan sampah terlihat jelas
        </p>
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

