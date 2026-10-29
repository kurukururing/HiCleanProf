import { useState } from 'react';
import { 
  ChevronLeft, Menu, Check, Scale, ShieldCheck, 
  Calendar, Star, Trash2, ArrowLeft 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';

export function SetoranSuccessPage() {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);

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

      <main className="flex-grow mx-auto w-full max-w-md px-4 pt-4 space-y-6">
        {/* Success Icon */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="size-24 rounded-full bg-brand-green/20 p-2 flex items-center justify-center">
            <div className="size-20 rounded-full bg-brand-green flex items-center justify-center shadow-lg text-ink">
              <Check className="size-10 stroke-[3]" />
            </div>
          </div>

          <div className="space-y-1 px-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 font-heading">
              Setoran berhasil diproses
            </h1>
            <p className="text-xs text-neutral-500 leading-relaxed font-body">
              Terima kasih sudah peduli dengan lingkungan dan memilah sampah dengan hati - hati
            </p>
          </div>
        </div>

        {/* Card: Jenis Sampah (Dark Card) */}
        <div className="rounded-3xl bg-[#1a1d1b] text-white p-5 shadow-xl flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1 relative z-10">
            <p className="text-[11px] text-neutral-400 font-medium flex items-center gap-1.5">
              <Trash2 className="size-3.5 text-brand-green" />
              <span>Jenis Sampah</span>
            </p>
            <h2 className="text-xl font-extrabold text-white font-heading tracking-tight">
              Botol Plastik
            </h2>
          </div>

          <div className="text-4xl relative z-10 pr-2">
            🧴
          </div>
        </div>

        {/* 2-col Stats: Berat Diterima & Estimasi Poin */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-3xl bg-white border border-neutral-200/80 shadow-sm space-y-1">
            <p className="text-[11px] text-neutral-500 font-medium flex items-center gap-1.5">
              <Scale className="size-3.5 text-neutral-700" />
              <span>Berat diterima</span>
            </p>
            <p className="text-xl font-extrabold text-neutral-900 font-heading font-mono pt-1">
              10.5 <span className="text-xs font-normal text-neutral-500">kg</span>
            </p>
          </div>

          <div className="p-4 rounded-3xl bg-white border border-neutral-200/80 shadow-sm space-y-1">
            <p className="text-[11px] text-neutral-500 font-medium flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-brand-green" />
              <span>Estimasi poin</span>
            </p>
            <p className="text-xl font-extrabold text-brand-green font-heading font-mono pt-1">
              +250 <span className="text-xs font-bold">pts</span>
            </p>
          </div>
        </div>

        {/* Card: Mitra Pengepul */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-neutral-900" />
            <h3 className="text-xs font-extrabold text-neutral-900 font-heading">
              Mitra Pengepul
            </h3>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="size-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              🧔
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-extrabold text-neutral-900 truncate font-heading">
                Pak Budi Amirudin
              </h4>
              <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                Motor Roda Tiga Eco - Bank Sampah RW 04
              </p>
              <p className="text-[10px] font-semibold text-neutral-600 flex items-center gap-1 mt-0.5">
                <Star className="size-3 text-amber-500 fill-amber-500" />
                <span>4.9 (30 Setoran) &bull; Terverifikasi</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Lacak Penjemputan (Primary CTA) */}
          <button
            type="button"
            onClick={() => navigate(ROUTES.activePickup)}
            className="w-full py-4 rounded-2xl bg-neutral-900 hover:bg-black text-white text-sm font-extrabold shadow-md active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Lacak Penjemputan</span>
          </button>

          {/* Kembali ke Beranda Button (Secondary CTA) */}
          <button
            type="button"
            onClick={() => navigate(ROUTES.dashboard)}
            className="w-full py-3.5 rounded-2xl bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 text-sm font-bold shadow-2xs active:scale-[0.99] transition-all cursor-pointer"
          >
            Kembali ke Beranda
          </button>

          {/* Batalkan Button (Subtle Red Text) */}
          <button
            type="button"
            onClick={() => setShowCancelModal(true)}
            className="w-full py-2.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:underline transition-all cursor-pointer"
          >
            Batalkan Permintaan Setoran
          </button>
        </div>
      </main>

      {/* Confirmation Modal: Batalkan */}
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => {
          setShowCancelModal(false);
          navigate(ROUTES.setoranBatal);
        }}
        title="Batalkan Setoran Sampah?"
        description="Apakah Anda yakin ingin membatalkan jadwal setoran ini? Permintaan armada akan dibatalkan."
        confirmText="Ya, Batalkan"
        cancelText="Jangan Batalkan"
        type="danger"
        icon={<Trash2 className="size-6 text-red-600 stroke-[2.2]" />}
      />
    </div>
  );
}
