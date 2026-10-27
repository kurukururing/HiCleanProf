import { CheckCircle2, ArrowRight, Home, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function GabungPickupSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-8 w-auto" />
          </Link>
          <Link to="/dashboard" className="text-xs font-semibold text-brand-green hover:underline">
            Beranda
          </Link>
        </div>
      </header>

      <main className="flex-grow mx-auto w-full max-w-md px-4 py-12 flex flex-col items-center justify-center text-center space-y-6">
        <div className="size-24 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center shadow-inner animate-bounce">
          <CheckCircle2 className="size-12" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold">
            Penjemputan Berhasil Dipesan 🎉
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Kurir Segera Menjemput!
          </h1>
          <p className="text-xs text-neutral-600 max-w-xs mx-auto leading-relaxed">
            ID Transaksi: <strong className="font-mono text-neutral-900">#HC-78664</strong>. Armada pengangkut sedang disiapkan menuju lokasi rumahmu.
          </p>
        </div>

        <div className="w-full rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 text-left space-y-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-700">
              <Clock className="size-5 text-brand-green" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Estimasi Tiba</p>
              <p className="text-sm font-bold text-neutral-900">15 - 30 Menit (09:00 - 10:30 WIB)</p>
            </div>
          </div>
        </div>

        <div className="w-full space-y-3 pt-4">
          <Link
            to="/dashboard/setoran-aktifs"
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white py-4 px-6 text-xs font-bold hover:bg-neutral-800 transition-colors shadow-lg"
          >
            Lacak Posisi Kurir <ArrowRight className="size-4 text-brand-green" />
          </Link>

          <Link
            to="/dashboard/setoran"
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white text-neutral-800 border border-neutral-300 py-3.5 px-6 text-xs font-bold hover:bg-neutral-50 transition-colors"
          >
            <Home className="size-4" /> Kembali ke Menu Setoran
          </Link>
        </div>
      </main>

      <footer className="bg-white border-t border-neutral-200 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-xl px-4 text-center">
          <p>&copy; {siteConfig.year} Hi-Clean App. Hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
