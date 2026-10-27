import { useState } from 'react';
import { Camera, Check, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PengepulStepHeader } from '../../components/pengepul/PengepulStepHeader';
import { ROUTES } from '../../routes';

export function PengepulFotoVerifikasiPage() {
  const navigate = useNavigate();
  const [captured, setCaptured] = useState(true);

  const handleSave = () => {
    navigate(ROUTES.pengepulVerifikasiLangkah3 || '/pengepul/verifikasi/langkah-3', {
      state: {
        attachedPhoto: '/verifikasi_pengepul/Foto.jpg'
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#1a1d1b] flex flex-col font-sans pb-24">
      <PengepulStepHeader backTo={ROUTES.pengepulVerifikasiLangkah3 || '/pengepul/verifikasi/langkah-3'} />

      <main className="mx-auto w-full max-w-md px-4 py-2 space-y-4">
        {/* Camera Viewport Frame with Focus Brackets */}
        <div className="relative rounded-3xl overflow-hidden aspect-[3/4] border-2 border-neutral-300 shadow-md bg-black">
          <img
            src="/verifikasi_pengepul/Foto.jpg"
            alt="Viewfinder"
            className="w-full h-full object-cover"
          />

          {/* Green Focus Corners (Reticle) */}
          <div className="absolute inset-4 pointer-events-none">
            {/* Top Left */}
            <div className="absolute top-0 left-0 size-8 border-t-4 border-l-4 border-brand-green rounded-tl-xl" />
            {/* Top Right */}
            <div className="absolute top-0 right-0 size-8 border-t-4 border-r-4 border-brand-green rounded-tr-xl" />
            {/* Bottom Left */}
            <div className="absolute bottom-0 left-0 size-8 border-b-4 border-l-4 border-brand-green rounded-bl-xl" />
            {/* Bottom Right */}
            <div className="absolute bottom-0 right-0 size-8 border-b-4 border-r-4 border-brand-green rounded-br-xl" />
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium tracking-wide">
            Arahkan kamera ke sampel material
          </div>
        </div>

        {/* Shutter Button */}
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setCaptured(!captured)}
            aria-label="Ambil Foto"
            className="size-16 rounded-full bg-brand-green text-ink flex items-center justify-center hover:bg-brand-green/90 active:scale-95 transition-all shadow-lg ring-4 ring-white"
          >
            <Camera className="size-8" />
          </button>
        </div>
      </main>

      {/* Fixed Bottom Save Button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3.5 px-6 rounded-2xl bg-brand-green text-ink text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-md active:scale-[0.99] text-center"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

