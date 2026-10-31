import { CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function PickupSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans justify-between">
      <header className="sticky top-0 z-50 bg-white border-b-2 border-neutral-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3 sm:px-6">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="size-10 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 flex items-center justify-center transition-colors text-neutral-900 shadow-2xs font-bold cursor-pointer"
          >
            &larr;
          </button>
          
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-10 sm:h-11 w-auto object-contain" />
          </Link>

          <Link to="/dashboard" className="text-xs font-extrabold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-1.5 rounded-full border border-neutral-300 transition-colors">
            Beranda
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12 max-w-md mx-auto space-y-6">
        <div className="size-28 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green relative">
          <div className="absolute inset-0 rounded-full border-4 border-brand-green/30 animate-ping" />
          <CheckCircle2 className="size-16 text-brand-green" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">Permintaan berhasil</h1>
          <p className="text-xs text-neutral-600 leading-relaxed max-w-xs mx-auto">
            Terima kasih sudah mencoba untuk kembali peduli pada lingkungan
          </p>
        </div>
      </main>

      <div className="p-4 bg-white border-t border-neutral-200">
        <div className="max-w-xl mx-auto">
          <Link
            to="/dashboard"
            className="w-full flex items-center justify-center rounded-2xl bg-neutral-900 text-white py-4 px-6 text-xs font-bold hover:bg-neutral-800 transition-colors shadow-lg"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
