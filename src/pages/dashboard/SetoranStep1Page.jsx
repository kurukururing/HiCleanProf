import { useState } from 'react';
import { 
  MapPin, CheckCircle2, Crosshair, Home, 
  GraduationCap, Building2, Radio, ArrowLeft 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { WargaStepHeader } from '../../components/layout/WargaStepHeader';
import { InteractiveMap } from '../../components/maps/InteractiveMap';

export function SetoranStep1Page() {
  const navigate = useNavigate();
  const [placeCategory, setPlaceCategory] = useState('rumah');
  const [address, setAddress] = useState('Jl. Medokan Asri Timur No.14, Gunung Anyar');
  const [benchmark, setBenchmark] = useState('Pagar Hitam Kayu, seberang toko bahan kue');
  const [mapCenter, setMapCenter] = useState([-7.3197, 112.7842]);

  const placeTypes = [
    { id: 'rumah', label: 'Rumah Pribadi', icon: Home },
    { id: 'sekolah', label: 'Sekolah / Madrasah', icon: GraduationCap },
    { id: 'banksampah', label: 'Bank Sampah RW', icon: Building2 }
  ];

  const handleGetCurrentLocation = () => {
    setMapCenter([-7.3197, 112.7842]);
  };

  const handleNext = () => {
    navigate(ROUTES.setoranStep2);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-28">
      {/* 1 of 6 Step Header */}
      <WargaStepHeader
        stepBadge="Lokasi"
        stepNumber={1}
        totalSteps={6}
        backTo={ROUTES.setoranMain}
      />

      <main className="flex-grow mx-auto w-full max-w-md px-4 space-y-5">
        {/* Title & Description */}
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 font-heading">
            Tentukan Lokasi Penjemputan
          </h1>
          <p className="text-xs text-neutral-500 leading-relaxed font-body">
            Petugas kurir akan menjemput limbah sampah langsung ketitik yang sudah anda pilih
          </p>
        </div>

        {/* Interactive Map Card */}
        <div className="rounded-3xl bg-white shadow-sm border border-neutral-200/80 overflow-hidden">
          <div className="relative h-64 sm:h-72 w-full">
            {/* GPS Pill Coordinate */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200 shadow-sm text-xs font-mono font-bold text-neutral-800">
              <Radio className="size-3.5 text-brand-green animate-pulse" />
              <span>GPS -7.3197, 112.7842</span>
            </div>

            {/* Interactive Leaflet Map */}
            <InteractiveMap
              center={mapCenter}
              zoom={16}
              markers={[
                {
                  id: 'pickup-point',
                  position: mapCenter,
                  type: 'home',
                  title: 'Titik Jemput Anda',
                  desc: address,
                  active: true
                }
              ]}
              showCoverageCircle={true}
              coverageRadiusMeters={350}
              className="h-full w-full"
            />

            {/* Lokasi Sekarang Button */}
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-neutral-900/90 hover:bg-neutral-900 text-white text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Crosshair className="size-3.5 text-brand-green" />
              <span>Lokasi Sekarang</span>
            </button>
          </div>

          {/* Map Card Dark Bottom Bar */}
          <div className="bg-[#1a1d1b] p-4 text-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="size-7 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center shrink-0">
                <CheckCircle2 className="size-4 text-brand-green" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Zona terjangkau titik jemput</p>
                <p className="text-[11px] text-neutral-400">HiClean Armada Medokan Asri</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-white/10 text-brand-green text-xs font-bold tracking-wide">
              Tersedia
            </span>
          </div>
        </div>

        {/* Kategori Tempat */}
        <div className="space-y-2.5">
          <h2 className="text-sm font-extrabold text-neutral-900 font-heading">
            Kategori Tempat
          </h2>
          <div className="grid grid-cols-3 gap-2.5">
            {placeTypes.map((pt) => {
              const Icon = pt.icon;
              const isSelected = placeCategory === pt.id;
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => setPlaceCategory(pt.id)}
                  className={`p-4 rounded-3xl border flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-brand-green shadow-md ring-2 ring-brand-green/20'
                      : 'bg-white border-neutral-200/80 hover:border-neutral-300'
                  }`}
                >
                  <div className={`size-10 rounded-2xl flex items-center justify-center ${
                    isSelected ? 'bg-brand-green/15 text-brand-green' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    <Icon className="size-5" />
                  </div>
                  <span className="text-[11px] font-bold text-neutral-800 leading-tight">
                    {pt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Alamat Lengkap Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-extrabold text-neutral-900 font-heading">
              Alamat Lengkap
            </label>
            <span className="text-red-500 font-semibold text-[11px]">
              Wajib diisi
            </span>
          </div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Masukan alamat lengkap"
            className="w-full rounded-2xl bg-neutral-200/60 border border-neutral-200 px-4 py-3.5 text-xs text-neutral-900 placeholder:text-neutral-500 font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:bg-white transition-all"
          />
        </div>

        {/* Patokan Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-extrabold text-neutral-900 font-heading">
              Patokan
            </label>
            <span className="text-neutral-400 font-medium text-[11px]">
              Opsional
            </span>
          </div>
          <input
            type="text"
            value={benchmark}
            onChange={(e) => setBenchmark(e.target.value)}
            placeholder="Contoh : pagar hitam"
            className="w-full rounded-2xl bg-neutral-200/60 border border-neutral-200 px-4 py-3.5 text-xs text-neutral-900 placeholder:text-neutral-500 font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:bg-white transition-all"
          />
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
        <div className="mx-auto max-w-md flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(ROUTES.setoranMain)}
            className="text-xs font-bold text-neutral-700 hover:text-neutral-900 flex items-center gap-1.5 px-3 py-2 cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            <span>Kembali</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-4 px-6 rounded-full bg-neutral-900 hover:bg-black text-white text-xs sm:text-sm font-extrabold shadow-md active:scale-[0.99] transition-all cursor-pointer text-center"
          >
            Lanjut (Langkah 2 /6)
          </button>
        </div>
      </div>
    </div>
  );
}
