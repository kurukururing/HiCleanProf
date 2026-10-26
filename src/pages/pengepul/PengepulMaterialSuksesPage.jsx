import { Check, ArrowLeft, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

export function PengepulMaterialSuksesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans justify-between pb-10">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulMaterial)}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>

          <Link
            to={ROUTES.pengepulDashboard}
            className="size-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          >
            <Menu className="size-4" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center max-w-md mx-auto w-full my-auto space-y-6">
        {/* Animated Green Circle Checkmark */}
        <div className="size-28 rounded-full bg-emerald-100/70 border-4 border-emerald-200/60 flex items-center justify-center shadow-inner animate-in zoom-in-75 duration-300">
          <div className="size-20 rounded-full bg-brand-green flex items-center justify-center text-white shadow-lg">
            <Check className="size-11 stroke-[3]" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
            Permintaan Pickup Berhasil
          </h1>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
            Terima kasih sudah peduli dengan lingkungan dan memilah sampah dengan hati - hati
          </p>
        </div>
      </main>

      {/* Bottom Button */}
      <div className="px-4 max-w-md mx-auto w-full">
        <Link
          to={ROUTES.pengepulDashboard}
          className="w-full flex items-center justify-center py-4 rounded-2xl bg-white border border-brand-green text-brand-green text-sm font-extrabold hover:bg-emerald-50 transition-all shadow-sm active:scale-[0.99]"
        >
          Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}

