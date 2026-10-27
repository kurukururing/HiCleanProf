import { useState } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Scale, Package } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PengepulStepHeader } from '../../components/pengepul/PengepulStepHeader';
import { ROUTES } from '../../routes';

export function PengepulVerifikasiLangkah4Page() {
  const navigate = useNavigate();
  const location = useLocation();

  const keputusanData = location.state?.keputusan || 'penuh';
  const catatanData = location.state?.catatan || 'Barang bersih dan sudah disortir dengan baik.';

  const statusLabel =
    keputusanData === 'penuh'
      ? 'Diterima Penuh'
      : keputusanData === 'sebagian'
      ? 'Diterima Sebagian'
      : 'Ditolak';

  const statusBadgeClass =
    keputusanData === 'penuh'
      ? 'bg-[#20c85e] text-ink'
      : keputusanData === 'sebagian'
      ? 'bg-amber-400 text-neutral-900'
      : 'bg-red-500 text-white';

  const handleConfirm = () => {
    navigate(ROUTES.pengepulVerifikasiSukses || '/pengepul/verifikasi/sukses');
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#1a1d1b] flex flex-col font-sans pb-28">
      <PengepulStepHeader backTo={ROUTES.pengepulVerifikasiLangkah3 || '/pengepul/verifikasi/langkah-3'} />

      <main className="mx-auto w-full max-w-md px-4 py-2 space-y-4">
        {/* Stepper Card */}
        <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-[#FFF0E6] text-[#E06D2B] text-xs font-semibold">
              Konfirmasi
            </span>
            <span className="text-xs font-bold text-neutral-800 font-heading">
              Langkah 4 dari 4
            </span>
          </div>

          {/* 4 Segment Progress Bar (All 4 green) */}
          <div className="grid grid-cols-4 gap-2">
            <div className="h-1.5 rounded-full bg-brand-green" />
            <div className="h-1.5 rounded-full bg-brand-green" />
            <div className="h-1.5 rounded-full bg-brand-green" />
            <div className="h-1.5 rounded-full bg-brand-green" />
          </div>
        </div>

        {/* Card 1: Rincian Muatan */}
        <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-3">
          <h2 className="text-sm font-bold text-neutral-900 font-heading">
            Rincian Muatan
          </h2>

          <div className="border-t border-neutral-100 pt-3 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-neutral-900">
                  Plastik PET (Bening)
                </p>
                <p className="text-[11px] text-neutral-500">
                  15 Botol kemasan - Tutup terpisah
                </p>
              </div>
              <span className="text-xs font-extrabold text-neutral-900 font-mono">
                4,5kg
              </span>
            </div>

            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-neutral-900">
                  Kardus Box Bersih
                </p>
                <p className="text-[11px] text-neutral-500">
                  3 Bundel pipih - Kering & Rapi
                </p>
              </div>
              <span className="text-xs font-extrabold text-neutral-900 font-mono">
                6.0kg
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Berat Aktual */}
        <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-3">
          <h2 className="text-sm font-bold text-neutral-900 font-heading">
            Berat Aktual
          </h2>

          <div className="rounded-2xl bg-[#E5E5EA] p-4 space-y-1">
            <p className="text-[11px] text-neutral-600 font-medium">Total berat</p>
            <p className="text-2xl font-black text-neutral-900 font-heading">
              12.50kg
            </p>
            <p className="text-[10px] text-neutral-500">
              Sudah terverifikasi mesin OIML Class II
            </p>
          </div>
        </div>

        {/* Card 3: Status Penerimaan */}
        <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-3">
          <h2 className="text-sm font-bold text-neutral-900 font-heading">
            Status Penerimaan
          </h2>

          <div className="rounded-2xl bg-[#E5F8ED] p-4 flex items-center justify-between border border-brand-green/20">
            <div>
              <p className="text-[10px] text-neutral-500">Status verifikasi</p>
              <p className="text-xs sm:text-sm font-extrabold text-neutral-900">
                Tervalidasi
              </p>
            </div>
            <span className={`px-4 py-2 rounded-xl text-xs font-extrabold shadow-2xs ${statusBadgeClass}`}>
              {statusLabel}
            </span>
          </div>
        </div>

        {/* Card 4: Catatan */}
        <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-2">
          <h2 className="text-sm font-bold text-neutral-900 font-heading">
            Catatan
          </h2>

          <div className="rounded-2xl bg-[#E5F8ED] p-3.5 border border-brand-green/20 text-xs text-neutral-800">
            <p className="leading-relaxed">
              {catatanData || 'Barang bersih dan sudah disortir dengan baik.'}
            </p>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-3.5 px-6 rounded-2xl bg-brand-green text-ink text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-md active:scale-[0.99] text-center"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
}

