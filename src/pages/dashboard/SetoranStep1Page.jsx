import { useState, useRef } from 'react';
import { 
  MapPin, CheckCircle2, Crosshair, Home, 
  GraduationCap, Building2, Radio, ArrowLeft,
  Sparkles, X, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { WargaStepHeader } from '../../components/layout/WargaStepHeader';
import { InteractiveMap } from '../../components/maps/InteractiveMap';

export function SetoranStep1Page() {
  const navigate = useNavigate();
  const addressInputRef = useRef(null);

  const [placeCategory, setPlaceCategory] = useState('rumah');
  const [address, setAddress] = useState('');
  const [benchmark, setBenchmark] = useState('');
  const [mapCenter, setMapCenter] = useState([-7.3197, 112.7842]);
  const [errorMessage, setErrorMessage] = useState(null);

  const placeTypes = [
    { id: 'rumah', label: 'Rumah Pribadi', icon: Home },
    { id: 'sekolah', label: 'Sekolah / Madrasah', icon: GraduationCap },
    { id: 'banksampah', label: 'Bank Sampah RW', icon: Building2 }
  ];

  const handleGetCurrentLocation = () => {
    setMapCenter([-7.3197, 112.7842]);
  };

  const handleUseSavedAddress = () => {
    setAddress('Jl. Medokan Asri Timur No.14, Gunung Anyar');
    setBenchmark('Pagar Hitam Kayu, seberang toko bahan kue');
    setErrorMessage(null);
  };

  const handleNext = () => {
    if (!address.trim()) {
      setErrorMessage('Harap masukkan alamat lengkap penjemputan terlebih dahulu.');
      addressInputRef.current?.focus();
      return;
    }
    setErrorMessage(null);
    navigate(ROUTES.setoranStep2);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-28">
      {/* Toast Error Alert */}
      {errorMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-red-500/50 max-w-sm text-center">
          <AlertCircle className="size-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
          <button 
            type="button" 
            onClick={() => setErrorMessage(null)} 
            className="ml-auto text-neutral-400 hover:text-white"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* 1 of 6 Step Header */}
      <WargaStepHeader
        stepBadge="Lokasi"
        title="Lokasi Penjemputan"
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
            Petugas kurir akan menjemput limbah sampah langsung ke titik lokasi yang Anda tentukan
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
                  desc: address || 'Pilih alamat Anda',
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
              className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-neutral-900/90 hover:bg-neutral-900 text-white text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
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
            <span className="px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-bold tracking-wide">
              Tersedia
            </span>
          </div>
        </div>

        {/* Quick Fill Address Helper Pill */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200/70 text-xs text-emerald-950">
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="size-4 text-brand-green shrink-0" />
            <span className="text-[11px] font-medium truncate">
              Ada alamat rumah tersimpan di profil
            </span>
          </div>
          <button
            type="button"
            onClick={handleUseSavedAddress}
            className="text-[11px] font-extrabold text-emerald-900 bg-white px-3 py-1 rounded-full border border-emerald-200 shadow-2xs hover:bg-emerald-100 transition-colors shrink-0 cursor-pointer active:scale-95"
          >
            Gunakan Alamat Tersimpan
          </button>
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
          <div className="relative">
            <input
              ref={addressInputRef}
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Masukkan alamat lengkap penjemputan"
              className={`w-full rounded-2xl border px-4 py-3.5 pr-10 text-xs text-neutral-900 placeholder:text-neutral-400 font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:bg-white transition-all ${
                errorMessage && !address.trim() 
                  ? 'bg-red-50/50 border-red-300 ring-1 ring-red-400' 
                  : 'bg-neutral-100/70 border-neutral-200'
              }`}
            />
            {address && (
              <button
                type="button"
                onClick={() => setAddress('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                title="Hapus Alamat"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Patokan Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-extrabold text-neutral-900 font-heading">
              Patokan / Ciri Khusus
            </label>
            <span className="text-neutral-400 font-medium text-[11px]">
              Opsional
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={benchmark}
              onChange={(e) => setBenchmark(e.target.value)}
              placeholder="Contoh: Pagar hitam kayu, seberang warung kelontong"
              className="w-full rounded-2xl bg-neutral-100/70 border border-neutral-200 px-4 py-3.5 pr-10 text-xs text-neutral-900 placeholder:text-neutral-400 font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:bg-white transition-all"
            />
            {benchmark && (
              <button
                type="button"
                onClick={() => setBenchmark('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                title="Hapus Patokan"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
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
