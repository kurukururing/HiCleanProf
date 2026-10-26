import { useState } from 'react';
import { 
  ArrowLeft, Plus, GripVertical, MapPin, Trash2, 
  ArrowUp, ArrowDown, CheckCircle2, Clock, Sparkles, Navigation, Menu
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PengepulNavbar } from '../../components/pengepul/PengepulNavbar';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';

export function PengepulAturRutePage() {
  const navigate = useNavigate();

  const [stops, setStops] = useState([
    {
      id: 1,
      name: 'Ibu Maya Kusumawati',
      address: 'Jl. Medokan Asri No.14, RT 02 / RW 05',
      weight: '10kg',
      distance: '200m',
      tags: [
        { label: 'Terikat Rapi', color: 'bg-emerald-50 text-emerald-800' },
        { label: 'Terdekat', color: 'bg-emerald-100 text-emerald-900' }
      ]
    },
    {
      id: 2,
      name: 'Bapak Joko Santoso',
      address: 'Jl. Kenangan No.20, RT 01 / RW 03',
      weight: '10kg',
      distance: '200m',
      tags: [
        { label: 'Relasi Baik', color: 'bg-teal-50 text-teal-800' },
        { label: 'Jauh', color: 'bg-emerald-100 text-emerald-900' }
      ]
    },
    {
      id: 3,
      name: 'Ibu Siti Nurhaliza',
      address: 'Jl. Kebangkitan No.5, RT 03 / RW 02',
      weight: '10kg',
      distance: '200m',
      tags: [
        { label: 'Hubungan Erat', color: 'bg-emerald-50 text-emerald-800' },
        { label: 'Terdekat', color: 'bg-emerald-100 text-emerald-900' }
      ]
    },
    {
      id: 4,
      name: 'Bapak Ahmad Rizky',
      address: 'Jl. Merdeka No.10, RT 04 / RW 01',
      weight: '10kg',
      distance: '200m',
      tags: [
        { label: 'Terjalin Rapat', color: 'bg-teal-50 text-teal-800' },
        { label: 'Jauh', color: 'bg-emerald-100 text-emerald-900' }
      ]
    },
    {
      id: 5,
      name: 'Ibu Rina Rahayu',
      address: 'Jl. Sejahtera No.18, RT 05 / RW 04',
      weight: '10kg',
      distance: '200m',
      tags: [
        { label: 'Koneksi Kuat', color: 'bg-emerald-50 text-emerald-800' },
        { label: 'Terdekat', color: 'bg-emerald-100 text-emerald-900' }
      ]
    },
    {
      id: 6,
      name: 'Bapak Joko Santoso',
      address: 'Jl. Harmoni No.22, RT 03 / RW 05',
      weight: '15kg',
      distance: '150m',
      tags: [
        { label: 'Koneksi Stabil', color: 'bg-emerald-50 text-emerald-800' },
        { label: 'Sedang', color: 'bg-emerald-100 text-emerald-900' }
      ]
    },
    {
      id: 7,
      name: 'Ibu Siti Aminah',
      address: 'Jl. Cinta No.5, RT 01 / RW 03',
      weight: '20kg',
      distance: '250m',
      tags: [
        { label: 'Koneksi Stabil', color: 'bg-emerald-50 text-emerald-800' }
      ]
    }
  ]);

  const moveUp = (index) => {
    if (index === 0) return;
    const newStops = [...stops];
    const temp = newStops[index - 1];
    newStops[index - 1] = newStops[index];
    newStops[index] = temp;
    setStops(newStops);
  };

  const moveDown = (index) => {
    if (index === stops.length - 1) return;
    const newStops = [...stops];
    const temp = newStops[index + 1];
    newStops[index + 1] = newStops[index];
    newStops[index] = temp;
    setStops(newStops);
  };

  const handleDelete = (id) => {
    setStops((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulRoute)}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>
          
          <h1 className="text-lg font-extrabold text-neutral-900">Atur Rute</h1>

          <Link
            to={ROUTES.pengepulDashboard}
            className="size-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          >
            <Menu className="size-4" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow mx-auto w-full max-w-2xl px-4 py-5 sm:px-6 space-y-4">
        
        {/* Card: Rute Optimal Summary */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-700">
                <Navigation className="size-5 text-brand-green" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-neutral-900">Rute Optimal</h2>
                <p className="text-xs text-neutral-500 mt-0.5">Target penyelesaian rute 12:15 WIB</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold shrink-0">
              <span className="size-2 rounded-full bg-brand-green animate-pulse" />
              Siap Jalan
            </span>
          </div>

          <div className="grid grid-cols-3 divide-x divide-neutral-200 py-3 border-t border-neutral-100 text-center">
            <div className="px-1">
              <span className="text-[11px] text-neutral-500 block">Titik jemput</span>
              <span className="text-base sm:text-lg font-extrabold text-neutral-900 mt-0.5 block">{stops.length} Titik</span>
            </div>
            <div className="px-1">
              <span className="text-[11px] text-neutral-500 block">Total jarak</span>
              <span className="text-base sm:text-lg font-extrabold text-neutral-900 mt-0.5 block">3.2 km</span>
            </div>
            <div className="px-1">
              <span className="text-[11px] text-neutral-500 block">Estimasi Waktu</span>
              <span className="text-base sm:text-lg font-extrabold text-neutral-900 mt-0.5 block">75 menit</span>
            </div>
          </div>
        </div>

        {/* Button Tambah Titik Pickup */}
        <Link
          to={ROUTES.pengepulRoutePilih}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-brand-green text-ink text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-md active:scale-[0.99]"
        >
          <Plus className="size-4 stroke-[3]" />
          <span>Tambah Titik Pickup</span>
        </Link>

        {/* Info Banner */}
        <div className="rounded-2xl bg-emerald-50/70 border border-emerald-100/90 p-3.5 flex items-center gap-3 text-emerald-900 text-xs">
          <Menu className="size-4 shrink-0 text-brand-green" />
          <p className="font-medium">
            Tahan dan geser ikon atau gunakan panah untuk menyesuaikan urutan penjemputan warga
          </p>
        </div>

        {/* List of stops */}
        <div className="space-y-3 pt-1">
          {stops.map((item, index) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white p-4 sm:p-5 shadow-sm border border-neutral-200/80 flex items-start gap-3 hover:shadow-md transition-all group"
            >
              {/* Reorder handle & controls */}
              <div className="flex flex-col items-center gap-1 text-neutral-400 pt-0.5">
                <button
                  type="button"
                  title="Pindah ke atas"
                  disabled={index === 0}
                  onClick={() => moveUp(index)}
                  className="p-1 hover:text-brand-green hover:bg-neutral-100 rounded-lg disabled:opacity-20 transition-colors"
                >
                  <ArrowUp className="size-3.5" />
                </button>
                <div className="p-1 cursor-grab active:cursor-grabbing text-neutral-400">
                  <GripVertical className="size-4" />
                </div>
                <button
                  type="button"
                  title="Pindah ke bawah"
                  disabled={index === stops.length - 1}
                  onClick={() => moveDown(index)}
                  className="p-1 hover:text-brand-green hover:bg-neutral-100 rounded-lg disabled:opacity-20 transition-colors"
                >
                  <ArrowDown className="size-3.5" />
                </button>
              </div>

              {/* Main Info */}
              <div className="flex-grow space-y-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-400">#{index + 1}</span>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900">{item.name}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-0.5">
                    <MapPin className="size-3 text-neutral-400 shrink-0" />
                    <span>{item.address}</span>
                  </div>
                </div>

                {/* Sub row: weight & distance */}
                <div className="flex items-center gap-4 text-xs font-semibold text-neutral-700">
                  <div className="flex items-center gap-1">
                    <span className="text-neutral-400 text-[10px]">Berat:</span>
                    <span>{item.weight}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-neutral-400 text-[10px]">Jarak:</span>
                    <span>{item.distance}</span>
                  </div>
                </div>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    {item.tags.map((t, idx) => (
                      <span 
                        key={idx} 
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${t.color || 'bg-emerald-50 text-emerald-800'}`}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Delete button */}
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                title="Hapus dari rute"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Bottom Bar: Mulai Rute */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
        <div className="mx-auto max-w-2xl">
          <Link
            to={ROUTES.pengepulRouteBerhasil}
            className="w-full flex items-center justify-center py-4 rounded-2xl bg-brand-green text-ink text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-lg active:scale-[0.99]"
          >
            Mulai Rute
          </Link>
        </div>
      </div>
    </div>
  );
}

