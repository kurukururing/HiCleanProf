import { CheckCircle2, QrCode } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function RedemptionSuccessPage({ isTicket = false }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans justify-between">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3 sm:px-6">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="size-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors text-neutral-800"
          >
            &larr;
          </button>
          
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-8 w-auto" />
          </Link>

          <Link to="/dashboard" className="text-xs font-semibold text-brand-green hover:underline">
            Beranda
          </Link>
        </div>
      </header>

      <main className="flex-grow mx-auto w-full max-w-md px-4 py-8 space-y-6 text-center flex flex-col justify-center">
        <div className="size-20 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center mx-auto">
          <CheckCircle2 className="size-12" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight">Penukaran berhasil</h1>
          <p className="text-xs text-neutral-600">Terima kasih sudah melakukan penukaran dan mempercayai kami</p>
        </div>

        {isTicket && (
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-3">
            {/* Visual QR Code Display */}
            <div className="size-48 bg-neutral-100 border border-neutral-200 rounded-2xl mx-auto flex items-center justify-center p-4">
              <QrCode className="size-36 text-neutral-900" />
            </div>
            <p className="text-xs font-medium text-neutral-600">Tunjukan QR ke petugas yang ada pada bus yang sedang bertugas</p>
          </div>
        )}

        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 text-left space-y-3">
          <h2 className="text-sm font-bold text-neutral-900">Rincian Transaksi</h2>
          <div className="space-y-2 text-xs divide-y divide-neutral-100">
            {isTicket ? (
              <div className="flex items-center justify-between pt-1">
                <span className="text-neutral-500">Tarif bus (250pts x 2 tiket)</span>
                <span className="font-bold text-neutral-900">500 pts</span>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-neutral-500">Nominal Saldo E-Wallet</span>
                  <span className="font-bold text-neutral-900">Rp25.000</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-neutral-500">Biaya Transaksi</span>
                  <span className="font-bold text-neutral-900">Rp1.000</span>
                </div>
              </>
            )}
            <div className="flex items-center justify-between pt-2">
              <span className="text-neutral-500">Poin Dibutuhkan</span>
              <span className="font-bold text-red-600">-500pts</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-neutral-500">Poin Saat Ini</span>
              <span className="font-bold text-brand-green">1.450pts</span>
            </div>
            <div className="flex items-center justify-between pt-3 font-bold text-sm">
              <span className="text-neutral-900">Sisa Poin</span>
              <span className="text-brand-green">950pts</span>
            </div>
          </div>
        </div>
      </main>

      <div className="p-4 bg-white border-t border-neutral-200">
        <div className="max-w-md mx-auto">
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
