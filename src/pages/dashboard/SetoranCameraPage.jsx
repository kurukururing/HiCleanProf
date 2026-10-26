import { useState } from 'react';
import { ArrowLeft, Camera, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function SetoranCameraPage() {
  const navigate = useNavigate();
  const [captured, setCaptured] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3 sm:px-6">
          <button type="button" onClick={() => navigate(-1)} className="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white">
            <ArrowLeft className="size-5" />
          </button>
          
          <span className="text-xs font-bold text-neutral-200">Kamera Bukti Sampah</span>

          <div className="size-10" />
        </div>
      </header>

      <main className="flex-grow mx-auto w-full max-w-md px-4 py-6 flex flex-col justify-between">
        <div className="relative flex-grow rounded-3xl bg-neutral-900 border border-white/10 overflow-hidden flex flex-col items-center justify-center min-h-[380px] my-2">
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
          
          {captured ? (
            <div className="absolute inset-0 bg-brand-green/20 flex flex-col items-center justify-center space-y-2">
              <div className="size-16 rounded-full bg-brand-green text-ink flex items-center justify-center shadow-xl">
                <Check className="size-8" />
              </div>
              <p className="text-xs font-bold text-white">Foto Berhasil Diambil!</p>
            </div>
          ) : (
            <div className="text-center space-y-2 z-10 px-6">
              <Camera className="size-12 text-brand-green mx-auto animate-pulse" />
              <p className="text-xs text-neutral-300">Posisikan sampah di dalam bingkai agar terdeteksi AI scanner</p>
            </div>
          )}
        </div>

        <div className="space-y-3 pt-4">
          <button
            type="button"
            onClick={() => setCaptured(true)}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-brand-green text-ink py-4 px-6 text-xs font-extrabold hover:bg-brand-green/90 transition-colors shadow-lg"
          >
            <Camera className="size-4" /> Ambil Foto
          </button>

          {captured && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white border border-white/20 py-3.5 px-6 text-xs font-bold hover:bg-neutral-800 transition-colors"
            >
              Gunakan Foto Ini & Lanjutkan
            </button>
          )}
        </div>
      </main>

      <footer className="py-6 text-center text-neutral-500 text-xs">
        <p>&copy; {siteConfig.year} Hi-Clean App.</p>
      </footer>
    </div>
  );
}
