import { useState } from 'react';
import { 
  ArrowLeft, MapPin, CheckCircle2, Clock, 
  Phone, MessageSquare, ShieldCheck, Trash2, Sparkles, ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import { ROUTES } from '../../routes';
import { InteractiveMap } from '../../components/maps/InteractiveMap';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';

export function ActivePickupPage() {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const pickupData = {
    id: '#HC-88412',
    status: 'Dalam Perjalanan',
    gpsCoordinates: 'GPS -6.2168, 107.586',
    locationName: 'Waru, Kabupaten Sidoarjo',
    verified: true,
    estimatedMinutes: 15,
    estimatedTimeStr: '14:15 WIB',
    steps: [
      { label: 'Terkonfirmasi', done: true },
      { label: 'Menuju lokasi', done: true },
      { label: 'Timbang', done: false },
      { label: 'Poin masuk', done: false },
    ],
    collector: {
      name: 'Pak Alexander Wijaya',
      role: 'Mitra Bank Sampah Maju Jaya - Medokan Asri',
      rating: 4.9,
      totalOrders: 102,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    items: [
      { name: 'Plastik PET (Bening)', detail: '15 Botol kemasan - Tutup terpisah', weight: '4,5kg' },
      { name: 'Kardus Box Bersih', detail: '3 Bundel pipih - Kering & Rapi', weight: '6.0kg' }
    ],
    totalWeight: '10.5 kg',
    estimatedPoints: '+240 pts'
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
          <button 
            type="button"
            onClick={() => navigate(ROUTES.dashboard)}
            className="size-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors text-neutral-800"
          >
            <ArrowLeft className="size-5" />
          </button>
          
          <Link to={ROUTES.dashboard} className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-8 w-auto" />
          </Link>

          <Link to={ROUTES.dashboard} className="text-xs font-semibold text-brand-green hover:underline">
            Beranda
          </Link>
        </div>
      </header>

      <main className="flex-grow mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 space-y-6 pb-28 sm:pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Setoran Aktif</h1>
            <p className="text-xs text-neutral-500 mt-0.5">Pantau posisi kurir mitra secara langsung</p>
          </div>
          <span className="text-xs font-mono font-medium text-neutral-600 bg-neutral-200 px-3 py-1 rounded-full">
            {pickupData.id}
          </span>
        </div>

        {/* Map Card */}
        <div className="rounded-3xl bg-white p-4 shadow-sm border border-neutral-200 overflow-hidden space-y-3">
          <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-neutral-100">
            <InteractiveMap
              center={[-7.3197, 112.7842]}
              zoom={15}
              markers={[
                {
                  id: 'truck',
                  position: [-7.3170, 112.7815],
                  type: 'truck',
                  title: 'Armada Truk HiClean',
                  desc: 'Pak Alexander Wijaya • Menuju lokasi Anda'
                },
                {
                  id: 'home',
                  position: [-7.3225, 112.7870],
                  type: 'home',
                  active: true,
                  title: 'Rumah Anda',
                  desc: pickupData.locationName
                }
              ]}
              routePath={[
                [-7.3170, 112.7815],
                [-7.3182, 112.7825],
                [-7.3195, 112.7840],
                [-7.3210, 112.7855],
                [-7.3225, 112.7870]
              ]}
              height="100%"
            />

            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow text-[11px] font-mono font-semibold text-neutral-800 flex items-center gap-1.5 border border-neutral-200/60 z-10">
              <MapPin className="size-3.5 text-brand-green" /> -7.3225, 112.7870
            </div>

            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow text-[11px] font-semibold text-neutral-800 flex items-center gap-1.5 border border-neutral-200/60 z-10">
              <span className="size-2 rounded-full bg-brand-green animate-ping" /> Kurir Sedang Menuju Rumah Anda
            </div>
          </div>

          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-brand-green" />
              <div>
                <p className="text-[11px] text-neutral-500">Titik GPS Terdeteksi</p>
                <p className="text-xs font-bold text-neutral-900">{pickupData.locationName}</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold">
              Terverifikasi
            </span>
          </div>
        </div>

        {/* Estimated Time Card */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-500 font-medium">Estimasi Waktu Tiba</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-0.5">
                {pickupData.estimatedMinutes} Menit <span className="text-sm font-normal text-neutral-500">({pickupData.estimatedTimeStr})</span>
              </p>
            </div>
            <Clock className="size-6 text-neutral-400" />
          </div>

          {/* Progress Steps */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {pickupData.steps.map((st, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-2">
                <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  st.done ? 'bg-brand-green text-ink shadow-sm' : 'bg-neutral-200 text-neutral-500'
                }`}>
                  {st.done ? <CheckCircle2 className="size-4" /> : (i + 1)}
                </div>
                <span className={`text-[11px] font-medium leading-tight ${st.done ? 'text-neutral-900 font-semibold' : 'text-neutral-400'}`}>
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mitra Pengepul Card */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Mitra Pengepul Penjemput</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={pickupData.collector.avatar} 
                alt={pickupData.collector.name} 
                className="size-14 rounded-full object-cover border-2 border-brand-green/30" 
              />
              <div>
                <p className="text-base font-bold text-neutral-900">{pickupData.collector.name}</p>
                <p className="text-xs text-neutral-500">{pickupData.collector.role}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold text-amber-500 flex items-center gap-1">
                    ★ {pickupData.collector.rating} <span className="text-neutral-400 font-normal">({pickupData.collector.totalOrders} Setoran)</span>
                  </span>
                  <span className="text-[11px] text-brand-green font-semibold">&bull; Terverifikasi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <a 
              href="tel:082175677656" 
              className="flex items-center justify-center gap-2 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 py-3.5 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              <Phone className="size-4 text-brand-green" /> Telepon Kurir
            </a>
            <a 
              href="https://wa.me/6282175677656" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center justify-center gap-2 rounded-2xl bg-brand-green text-ink py-3.5 text-xs sm:text-sm font-extrabold hover:brightness-105 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <MessageSquare className="size-4" /> WhatsApp
            </a>
          </div>
        </div>

        {/* Rincian Muatan Card */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <h2 className="text-sm font-bold text-neutral-900">Rincian Muatan</h2>
          <div className="space-y-3 divide-y divide-neutral-100">
            {pickupData.items.map((it, i) => (
              <div key={i} className={`flex items-center justify-between ${i > 0 ? 'pt-3' : ''}`}>
                <div>
                  <p className="text-xs font-bold text-neutral-900">{it.name}</p>
                  <p className="text-[11px] text-neutral-500">{it.detail}</p>
                </div>
                <p className="text-xs font-bold text-neutral-900">{it.weight}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-neutral-500">Total berat</p>
              <p className="text-lg font-bold text-neutral-900">{pickupData.totalWeight}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-neutral-500">Estimasi poin</p>
              <p className="text-base font-bold text-brand-green bg-brand-green/10 px-3 py-1 rounded-full">
                {pickupData.estimatedPoints}
              </p>
            </div>
          </div>
        </div>

        {/* Action: Batalkan Penjemputan */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowCancelModal(true)}
            className="w-full py-3.5 px-4 rounded-2xl bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <Trash2 className="size-4 text-red-500" />
            <span>Batalkan Permintaan Penjemputan</span>
          </button>
        </div>

      </main>

      {/* Confirmation Modal: Batalkan Penjemputan */}
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => {
          setShowCancelModal(false);
          navigate(ROUTES.dashboard);
        }}
        title="Batalkan Penjemputan?"
        description="Apakah Anda yakin ingin membatalkan penjemputan ini? Armada kurir mitra yang sedang menuju lokasi Anda akan dialihkan."
        confirmText="Ya, Batalkan"
        cancelText="Kembali"
        type="danger"
        icon={<Trash2 className="size-6 text-red-600 stroke-[2.2]" />}
      />

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>&copy; {siteConfig.year} Hi-Clean App. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-6">
            <Link to="/kebijakan-privasi" className="hover:text-neutral-900 transition-colors">Kebijakan Privasi</Link>
            <span>&bull;</span>
            <Link to="/syarat-ketentuan" className="hover:text-neutral-900 transition-colors">Syarat Ketentuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
