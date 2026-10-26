import { useState } from 'react';
import { QrCode, CheckCircle2, ShieldCheck, Scale, ArrowLeft, Camera } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PengepulNavbar } from '../../components/pengepul/PengepulNavbar';
import { ROUTES } from '../../routes';

export function PengepulVerifikasiPage() {
  const navigate = useNavigate();
  const [scanned, setScanned] = useState(false);
  const [weight, setWeight] = useState('10.5');

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <PengepulNavbar activeName="Verifikasi" />

      <main className="flex-grow mx-auto w-full max-w-lg px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Verifikasi Setoran
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Pindai QR code dari aplikasi warga atau masukkan nomor resi manual
          </p>
        </div>

        {/* Scan Camera Area Simulation */}
        <div className="rounded-3xl bg-neutral-900 text-white p-6 shadow-xl text-center space-y-4 overflow-hidden relative">
          <div className="size-48 mx-auto rounded-3xl border-2 border-dashed border-brand-green/70 flex flex-col items-center justify-center relative p-4 bg-white/5">
            <QrCode className="size-20 text-brand-green/80 animate-pulse" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-green/90 shadow-[0_0_15px_#20c85e] animate-bounce" />
          </div>

          <div className="space-y-1">
            <p className="text-xs text-neutral-300 font-medium">Arahkan kamera ke QR Code warga</p>
            <p className="text-[11px] text-neutral-500">Mendukung QR Code dan barcode digital Hi-Clean</p>
          </div>

          <button
            type="button"
            onClick={() => setScanned(true)}
            className="w-full py-3.5 rounded-2xl bg-brand-green text-ink text-xs font-extrabold hover:bg-brand-green/90 transition-all shadow"
          >
            Simulasi Pindai Berhasil
          </button>
        </div>

        {/* Manual Weight Verification Card */}
        {scanned && (
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-400">Resi #HC-88412</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Tervalidasi
              </span>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-neutral-900">Ibu Mayangsari</h3>
              <p className="text-xs text-neutral-500">Jl. Medokan Asri Barat No.14, Gunung Anyar</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <label className="text-xs font-bold text-neutral-700 block">
                Berat Terukur (kg)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="flex-grow rounded-2xl bg-neutral-100 border border-neutral-200 px-4 py-3 text-sm font-extrabold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                />
                <span className="text-sm font-bold text-neutral-500">kg</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                alert(`Setoran ${weight} kg berhasil diverifikasi! Poin telah diteruskan.`);
                navigate(ROUTES.pengepulRoute);
              }}
              className="w-full py-4 rounded-2xl bg-brand-green text-ink text-xs font-extrabold shadow-md hover:bg-brand-green/90 transition-all"
            >
              Konfirmasi Timbangan & Kirim Poin
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

