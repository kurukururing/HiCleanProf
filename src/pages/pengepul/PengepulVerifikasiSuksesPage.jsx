import { Check, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PengepulStepHeader } from '../../components/pengepul/PengepulStepHeader';
import { ROUTES } from '../../routes';

export function PengepulVerifikasiSuksesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#1a1d1b] flex flex-col font-sans">
      <PengepulStepHeader backTo={ROUTES.pengepulDashboard || '/pengepul'} />

      <main className="flex-grow mx-auto w-full max-w-md px-4 py-8 flex flex-col items-center justify-center text-center space-y-6">
        {/* Animated Green Checkmark with Halo */}
        <div className="size-32 rounded-full bg-[#E5F8ED] flex items-center justify-center shadow-lg relative animate-in zoom-in-90 duration-300">
          <div className="absolute inset-0 rounded-full bg-brand-green/20 animate-ping pointer-events-none" />
          <div className="size-24 rounded-full bg-brand-green flex items-center justify-center text-ink shadow-md">
            <Check className="size-12 stroke-[3.5]" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2 max-w-xs">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 font-heading">
            Verifikasi berhasil
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-body">
            Terima kasih sudah peduli dengan lingkungan dan memilah sampah dengan hati - hati
          </p>
        </div>

        {/* Verification Summary Receipt Card */}
        <div className="w-full rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 text-left space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <span className="text-[11px] font-bold text-neutral-400">Resi Setoran</span>
            <span className="font-mono text-xs font-bold text-neutral-900">#MAT-529-19</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-500">Warga Penyetor:</span>
              <span className="font-bold text-neutral-900">Pak Budi Amirudin</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Berat Bersih (Netto):</span>
              <span className="font-extrabold text-neutral-900 font-mono">12.50 kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Kategori:</span>
              <span className="font-semibold text-neutral-800">Botol Plastik PET & Kardus</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-neutral-100 items-center">
              <span className="text-neutral-500">Reward Ditransfer:</span>
              <span className="text-sm font-extrabold text-brand-green font-mono flex items-center gap-1">
                <Sparkles className="size-3.5" /> +1.250 Poin
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-4 mt-auto">
        <div className="mx-auto max-w-md flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulVerifikasi || '/pengepul/verifikasi')}
            className="w-full sm:flex-1 py-3.5 rounded-2xl bg-brand-green text-ink text-xs sm:text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-md active:scale-[0.99] text-center"
          >
            Verifikasi Berikutnya
          </button>
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulDashboard || '/pengepul')}
            className="w-full sm:flex-1 py-3.5 rounded-2xl border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-xs sm:text-sm font-bold transition-all active:scale-[0.99] text-center"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}

