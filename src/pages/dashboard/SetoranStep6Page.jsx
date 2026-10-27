import { useState } from 'react';
import { 
  ArrowLeft, MapPin, Calendar, Clock, 
  Sparkles, CheckCircle2, Info, ShieldCheck 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { WargaStepHeader } from '../../components/layout/WargaStepHeader';
import { InteractiveMap } from '../../components/maps/InteractiveMap';

export function SetoranStep6Page() {
  const navigate = useNavigate();

  const summary = {
    items: [
      {
        name: 'Plastik PET (Bening)',
        weight: '4,5kg',
        detail: '15 Botol kemasan - Tutup terpisah'
      },
      {
        name: 'Kardus Box Bersih',
        weight: '6.0kg',
        detail: '3 Bundel pipih - Kering & Rapi'
      }
    ],
    totalWeight: '10.5 kg',
    estPoints: '+240 pts',
    location: 'Jl. Medokan Asri Timur no.14, Gunung Anyar',
    benchmark: 'Pagar Hitam Kayu, seberang toko bahan kue berkat sejahtera',
    scheduleDate: 'Kamis, 20 September 2026',
    scheduleSlot: '08:30 - 10:30 WIB'
  };

  const handleConfirm = () => {
    navigate(ROUTES.setoranSuccess);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-28">
      {/* 6 of 6 Step Header */}
      <WargaStepHeader
        stepBadge="Konfirmasi"
        stepNumber={6}
        totalSteps={6}
        backTo={ROUTES.setoranStep5}
      />

      <main className="flex-grow mx-auto w-full max-w-md px-4 space-y-4">
        {/* Title & Description */}
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 font-heading">
            Konfirmasi Setoran Sampah
          </h1>
          <p className="text-xs text-neutral-500 leading-relaxed font-body">
            Periksa kembali rincian setoran sebelum mengirim permintaan pada armada pengepul
          </p>
        </div>

        {/* Card: Rincian Muatan */}
        <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-neutral-200/80 space-y-4">
          <h2 className="text-sm font-extrabold text-neutral-900 font-heading">
            Rincian Muatan
          </h2>

          <div className="space-y-3 divide-y divide-neutral-100">
            {summary.items.map((it, idx) => (
              <div key={idx} className={`flex items-start justify-between gap-3 ${idx > 0 ? 'pt-3' : ''}`}>
                <div>
                  <p className="text-xs font-extrabold text-neutral-900">
                    {it.name}
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    {it.detail}
                  </p>
                </div>
                <span className="text-xs font-extrabold text-neutral-900 font-mono">
                  {it.weight}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-neutral-500">Total berat</p>
              <p className="text-base font-extrabold text-neutral-900 font-heading">
                {summary.totalWeight}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-neutral-500">Estimasi poin</p>
              <span className="inline-block mt-0.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-extrabold font-mono">
                {summary.estPoints}
              </span>
            </div>
          </div>
        </div>

        {/* Card: Lokasi Pengambilan */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="size-4.5 text-neutral-900" />
              <h2 className="text-sm font-extrabold text-neutral-900 font-heading">
                Lokasi Pengambilan
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200/60">
              Terverifikasi
            </span>
          </div>

          {/* Mini Interactive Map */}
          <div className="relative h-32 w-full rounded-2xl overflow-hidden border border-neutral-100">
            <InteractiveMap
              center={[-7.3197, 112.7842]}
              zoom={16}
              markers={[
                {
                  id: 'pickup-point',
                  position: [-7.3197, 112.7842],
                  type: 'home',
                  title: 'Lokasi Anda',
                  desc: summary.location,
                  active: true
                }
              ]}
              showCoverageCircle={false}
              className="h-full w-full"
            />
          </div>

          <div>
            <p className="text-xs font-extrabold text-neutral-900">
              {summary.location}
            </p>
            <div className="mt-2 p-2.5 rounded-xl bg-neutral-100 text-neutral-600 text-[11px] flex items-start gap-2 leading-relaxed">
              <Info className="size-3.5 text-neutral-500 shrink-0 mt-0.5" />
              <span>
                <strong>Patokan:</strong> {summary.benchmark}
              </span>
            </div>
          </div>
        </div>

        {/* Card: Jadwal */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="size-4.5 text-neutral-900" />
            <h2 className="text-sm font-extrabold text-neutral-900 font-heading">
              Jadwal
            </h2>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-200/60 border border-neutral-200/80 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wide">
                Waktu Slot Penjemputan
              </p>
              <p className="text-xs font-extrabold text-neutral-900 mt-0.5">
                {summary.scheduleDate}
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-neutral-800 text-white text-xs font-bold font-mono">
              {summary.scheduleSlot}
            </span>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-4 px-6 rounded-full bg-neutral-900 hover:bg-black text-white text-sm font-extrabold shadow-lg active:scale-[0.99] transition-all cursor-pointer text-center"
          >
            Siap Dijemput
          </button>
        </div>
      </div>
    </div>
  );
}

