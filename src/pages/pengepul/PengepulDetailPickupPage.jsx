import { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, MapPin, 
  Navigation, Phone, MessageSquare, AlertCircle, Menu 
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { InteractiveMap } from '../../components/maps/InteractiveMap';

export function PengepulDetailPickupPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>

          <h1 className="text-base font-extrabold text-neutral-900">Detail Pickup</h1>

          <Link
            to={ROUTES.pengepulDashboard}
            className="size-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          >
            <Menu className="size-4" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow mx-auto w-full max-w-md px-4 py-5 space-y-4">
        
        {/* Map Preview Card with GPS Badge */}
        <div className="rounded-3xl overflow-hidden border border-neutral-200/80 bg-white shadow-sm space-y-0">
          <div className="relative h-56 sm:h-60 w-full bg-neutral-100">
            <InteractiveMap
              center={[-7.3225, 112.7870]}
              zoom={16}
              markers={[
                {
                  id: 'pickup-target',
                  position: [-7.3225, 112.7870],
                  type: 'home',
                  active: true,
                  title: 'Titik Penjemputan',
                  desc: 'Ibu Rahayu • Jl. Medokan Asri Barat No.14'
                },
                {
                  id: 'pengepul-loc',
                  position: [-7.3180, 112.7820],
                  type: 'truck',
                  title: 'Truk Anda',
                  desc: '450m dari lokasi'
                }
              ]}
              routePath={[
                [-7.3180, 112.7820],
                [-7.3195, 112.7840],
                [-7.3225, 112.7870]
              ]}
              height="100%"
            />
          </div>

          {/* Green GPS Detected Banner (Directly under map as shown in design) */}
          <div className="bg-brand-green text-ink p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="size-5 text-ink" />
              </div>
              <div>
                <p className="text-[11px] font-semibold opacity-90">Titik GPS Terdeteksi</p>
                <h3 className="text-sm font-extrabold">Waru, Kabupaten Sidoarjo</h3>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-neutral-900 text-white text-[10px] font-bold tracking-wider">
              Terverifikasi
            </span>
          </div>
        </div>

        {/* Customer Profile Card */}
        <div className="rounded-3xl bg-white p-4 sm:p-5 shadow-sm border border-neutral-200/80 flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" 
            alt="Ibu Mayangsari" 
            className="size-16 rounded-full object-cover border-2 border-emerald-200 shadow-sm shrink-0" 
          />
          <div className="space-y-0.5 min-w-0">
            <h2 className="text-base font-extrabold text-neutral-900 truncate">
              Ibu Mayangsari
            </h2>
            <p className="text-xs text-neutral-600 font-medium truncate">
              Warga RW 01 Medokan Asri Barat
            </p>
            <p className="text-xs text-neutral-500 truncate">
              Jl. Medokan Asri Barat No.14, Gunung Anyar
            </p>
          </div>
        </div>

        {/* Card: Rincian Muatan */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-4">
          <h3 className="text-base font-extrabold text-neutral-900">
            Rincian Muatan
          </h3>

          <div className="space-y-3 divide-y divide-neutral-100 text-xs">
            {/* Item 1 */}
            <div className="flex items-start justify-between gap-3 pt-1">
              <div>
                <p className="font-extrabold text-neutral-900 text-sm">Plastik PET (Bening)</p>
                <p className="text-neutral-500 text-[11px] mt-0.5">15 Botol kemasan - Tutup terpisah</p>
              </div>
              <span className="font-extrabold text-neutral-900 text-sm">4,5kg</span>
            </div>

            {/* Item 2 */}
            <div className="flex items-start justify-between gap-3 pt-3">
              <div>
                <p className="font-extrabold text-neutral-900 text-sm">Kardus Box Bersih</p>
                <p className="text-neutral-500 text-[11px] mt-0.5">3 Bundel pipih - Kering & Rapi</p>
              </div>
              <span className="font-extrabold text-neutral-900 text-sm">6.0kg</span>
            </div>
          </div>

          {/* Total Berat */}
          <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
            <span className="text-xs text-neutral-500 font-medium">Total berat</span>
            <span className="text-lg font-extrabold text-neutral-900">10.5 kg</span>
          </div>
        </div>

        {/* Card: Catatan Warga */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <h3 className="text-base font-extrabold text-neutral-900">
            Catatan
          </h3>

          <div className="bg-emerald-50/70 border border-emerald-100/90 rounded-2xl p-4 text-xs text-neutral-700 leading-relaxed font-medium">
            Barang sudah diletakan dipagar sebelah rumah, silahkan langsung diambil saja
          </div>
        </div>
      </main>

      {/* Floating Bottom Navigation Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
        <div className="mx-auto max-w-md flex items-center gap-3">
          <Link
            to={ROUTES.pengepulRouteNavigasi}
            className="flex-1 flex items-center justify-center py-4 rounded-2xl bg-brand-green text-ink text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-lg active:scale-[0.99]"
          >
            Navigasi
          </Link>
          <button
            type="button"
            onClick={() => setConfirmed(true)}
            className="px-5 py-4 rounded-2xl bg-neutral-900 text-white text-xs font-bold hover:bg-black transition-all shadow"
          >
            Timbang & Selesai
          </button>
        </div>
      </div>

      {/* Modal Sukses Timbang */}
      {confirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-neutral-200 text-center space-y-4">
            <div className="size-16 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center mx-auto">
              <CheckCircle2 className="size-8" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-neutral-900">Penjemputan Selesai!</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Data 10.5 kg sampah berhasil dikonfirmasi dan poin otomatis diteruskan ke akun Ibu Mayangsari.
              </p>
            </div>
            <Link
              to={ROUTES.pengepulRouteNavigasi}
              className="block w-full py-3.5 rounded-2xl bg-brand-green text-ink text-xs font-extrabold shadow"
            >
              Lanjutkan ke Titik Berikutnya
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

