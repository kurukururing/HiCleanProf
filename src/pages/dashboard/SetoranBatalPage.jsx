import { ChevronLeft, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

export function SetoranBatalPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-16">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-[#F4F4F6]/90 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(ROUTES.dashboard)}
            aria-label="Kembali ke Beranda"
            className="flex items-center justify-center size-10 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-transform active:scale-95 shadow-sm cursor-pointer"
          >
            <ChevronLeft className="size-6 stroke-[2.5]" />
          </button>

          <Link
            to={ROUTES.dashboard}
            className="flex items-center justify-center size-10 rounded-full bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-100 transition-transform active:scale-95 shadow-2xs"
          >
            <Menu className="size-5" />
          </Link>
        </div>
      </header>

      <main className="flex-grow mx-auto w-full max-w-md px-4 pt-16 flex flex-col items-center justify-center text-center space-y-6">
        {/* Red Cancelled Icon Circle */}
        <div className="size-28 rounded-full bg-red-100 flex items-center justify-center p-2">
          <div className="size-24 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg">
            <X className="size-12 stroke-[3]" />
          </div>
        </div>

        <div className="space-y-2 px-4">
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 font-heading">
            Setoran berhasil dibatalkan
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-body max-w-xs">
            Silahkan melakukan setoran ulang jika sebelumnya terdapat kesalahan
          </p>
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 px-4 pt-3.5 pb-[max(1rem,env(safe-area-inset-bottom))] z-40">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={() => navigate(ROUTES.dashboard)}
            className="w-full py-4 rounded-2xl bg-neutral-900 hover:bg-black text-white text-sm font-extrabold shadow-md active:scale-[0.99] transition-all cursor-pointer text-center"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}

