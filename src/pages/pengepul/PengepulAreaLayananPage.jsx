import { useState } from 'react';
import { ArrowLeft, Menu, MapPin, Clock, Plus, Minus, Home, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { InteractiveMap } from '../../components/maps/InteractiveMap';

export function PengepulAreaLayananPage() {
  const navigate = useNavigate();
  const [radius, setRadius] = useState(3.5);
  const [selectedAreas, setSelectedAreas] = useState(['RW - 01']);

  const areas = [
    { id: 'RW - 01', name: 'RW - 01', desc: '10 titik penjemputan' },
    { id: 'RW - 02', name: 'RW - 02', desc: '15 titik penjemputan' },
    { id: 'RW - 03', name: 'RW - 03', desc: '20 titik penjemputan' },
    { id: 'RW - 04', name: 'RW - 04', desc: '12 titik penjemputan' },
    { id: 'RW - 05', name: 'RW - 05', desc: '18 titik penjemputan' },
  ];

  const toggleArea = (id) => {
    setSelectedAreas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    navigate(ROUTES.pengepulProfile);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-36">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulProfile)}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>

          <h1 className="text-base font-extrabold text-neutral-900">Area Layanan</h1>

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
        
        {/* Map Preview with Green Radius Circle */}
        <div className="rounded-3xl overflow-hidden border border-neutral-200/80 bg-white shadow-sm relative h-64 sm:h-72">
          <InteractiveMap
            center={[-7.3205, 112.7845]}
            zoom={14}
            coverageRadius={radius * 1000}
            markers={[
              {
                id: 'base-hub',
                position: [-7.3205, 112.7845],
                type: 'truck',
                title: 'Pangkalan Utama Mitra',
                desc: 'Bank Sampah Maju Jaya'
              }
            ]}
            height="100%"
          />

          {/* GPS Coordinates Tag Top Left */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-neutral-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-neutral-800 font-mono z-10">
            <MapPin className="size-3.5 text-brand-green" />
            <span>GPS -7.3205, 112.7845</span>
          </div>

          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-neutral-200/80 text-[10px] font-bold text-brand-green z-10">
            Radius Aktif: {radius.toFixed(1)} km
          </div>
        </div>

        {/* Green Radius Control Card */}
        <div className="rounded-3xl bg-brand-green text-ink p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <MapPin className="size-5 text-ink" />
              </div>
              <div>
                <span className="text-[11px] font-bold opacity-90 block">Jangkauan Radius</span>
                <p className="text-2xl font-extrabold tracking-tight mt-0.5">{radius.toFixed(1)} km</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-medium opacity-90 block">Estimasi Waktu Tempuh</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/10 text-xs font-extrabold mt-1">
                <Clock className="size-3.5" />
                <span>12 - 20 menit</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-black/10">
            <span className="text-xs font-extrabold">Perluas Radius</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setRadius(Math.max(1, radius - 0.5))}
                className="size-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-ink transition-transform active:scale-95"
              >
                <Minus className="size-4 stroke-[3]" />
              </button>
              <button
                type="button"
                onClick={() => setRadius(radius + 0.5)}
                className="size-8 rounded-full bg-white flex items-center justify-center text-ink shadow transition-transform active:scale-95"
              >
                <Plus className="size-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>

        {/* Wilayah Operasional Section */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
                <Home className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-neutral-900">Wilayah Operasional</h3>
                <p className="text-[11px] text-neutral-500">Atur wilayah operasional untuk mempermudah proses penjemputan</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
              {selectedAreas.length}/{areas.length} Area
            </span>
          </div>

          {/* List of RWs */}
          <div className="space-y-2 pt-1">
            {areas.map((ar) => {
              const isSelected = selectedAreas.includes(ar.id);
              return (
                <div
                  key={ar.id}
                  onClick={() => toggleArea(ar.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected ? 'border-brand-green bg-emerald-50/70' : 'border-emerald-100/70 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-neutral-700">
                      <Home className="size-4 text-emerald-800" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-neutral-900">{ar.name}</h4>
                      <p className="text-[10px] text-neutral-500 mt-0.5">{ar.desc}</p>
                    </div>
                  </div>

                  <div className={`size-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-brand-green bg-brand-green text-white' : 'border-neutral-300 bg-white'
                  }`}>
                    {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Floating Bottom Bar: Simpan and Batal */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
        <div className="mx-auto max-w-md space-y-2.5">
          <button
            type="button"
            onClick={handleSave}
            className="w-full flex items-center justify-center py-4 rounded-2xl bg-brand-green text-ink text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-lg active:scale-[0.99]"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulProfile)}
            className="w-full flex items-center justify-center py-3.5 rounded-2xl bg-white border border-brand-green text-brand-green text-sm font-extrabold hover:bg-emerald-50 transition-all active:scale-[0.99]"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

