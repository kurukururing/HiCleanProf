import { useState } from 'react';
import { 
  ArrowRight, Sparkles, Clock, ShieldCheck, 
  ChevronRight, Trash2, MapPin, Truck, Plus, CheckCircle2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { WargaNavbar } from '../../components/layout/WargaNavbar';
import { siteConfig } from '../../config/siteConfig';

export function SetoranMainPage() {
  const navigate = useNavigate();
  const [pickupTab, setPickupTab] = useState('Semua');

  const pickups = [
    { name: 'Truk HiClean 01', driver: 'Pak Budi Santoso', location: 'Jl. Purimas Raya', dist: '400m', time: '10-20 Mnt', slot: '5 slot (45kg)', category: 'Plastik & kaleng minuman' },
    { name: 'Truk EcoTransport', driver: 'Pak Rudi Hartono', location: 'Jl. Melati No. 12', dist: '500m', time: '15-25 Mnt', slot: '3 slot (30kg)', category: 'Kaca & botol sirup' },
    { name: 'Truk SafeMove 03', driver: 'Bu Ani Sulastri', location: 'Jl. Kentang No. 5', dist: '300m', time: '5-15 Mnt', slot: '7 slot (50kg)', category: 'Kertas & kardus' }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <WargaNavbar activeName="Setoran" />

      <main className="flex-grow mx-auto w-full max-w-4xl px-4 py-5 sm:px-6 lg:px-8 space-y-5 pb-8">
        
        {/* Header Title */}
        <div className="pt-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900">
            Setoran Sampah
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Panggil armada jemput langsung atau bergabung ke rute pickup terdekat
          </p>
        </div>

        {/* Poin & Target Card */}
        <div className="rounded-3xl bg-neutral-900 text-white p-5 sm:p-7 shadow-xl relative overflow-hidden border border-neutral-800 space-y-3">
          <div className="absolute -right-8 -bottom-8 size-48 rounded-full bg-brand-green/15 blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">Poin Hadiah Terkumpul</span>
            <span className="text-[10px] font-bold bg-white/10 px-2.5 py-0.5 rounded-full text-brand-green uppercase tracking-wider">
              Aktif
            </span>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black tracking-tight text-brand-green">
              1.430 <span className="text-sm font-normal text-white">pts</span>
            </p>
          </div>
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs text-neutral-300">
              <span className="text-[11px] text-neutral-400">Target minggu ini</span>
              <span className="font-bold text-white text-xs">60%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full bg-brand-green transition-all duration-700" style={{ width: '60%' }} />
            </div>
            <p className="text-[10px] sm:text-[11px] text-neutral-400">Tinggal 8 kg lagi untuk capai target mingguan</p>
          </div>
        </div>

        {/* Setor Sampah Sekarang CTA Hero Card */}
        <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-xs border border-neutral-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-green text-[11px] font-bold">
              Penjemputan Sampah Mandiri 🚚
            </span>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900 tracking-tight">
              Panggil Armada Sekarang
            </h2>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              Kolektor terverifikasi akan datang ke depan pintu rumahmu untuk menimbang dan mencairkan poin.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] text-neutral-600 font-medium">
            <span className="px-2.5 py-1.5 rounded-xl bg-neutral-100 flex items-center gap-1.5 justify-center">
              ⏱️ 15 - 30 Menit
            </span>
            <span className="px-2.5 py-1.5 rounded-xl bg-neutral-100 flex items-center gap-1.5 justify-center">
              ⚖️ Min. 1 kg
            </span>
            <span className="px-2.5 py-1.5 rounded-xl bg-neutral-100 flex items-center gap-1.5 justify-center">
              ✨ Gratis Ongkir
            </span>
            <span className="px-2.5 py-1.5 rounded-xl bg-neutral-100 flex items-center gap-1.5 justify-center">
              📋 Proses Mudah
            </span>
          </div>

          <div className="pt-2">
            <Link
              to={ROUTES.setoranStep1}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white py-3.5 px-6 text-xs sm:text-sm font-bold shadow-md hover:bg-neutral-800 transition-all hover:scale-[1.01]"
            >
              Mulai Setor Sampah <ArrowRight className="size-4 text-brand-green" />
            </Link>
          </div>
        </div>

        {/* Gabung Pick Up Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">Gabung Pick Up Terdekat</h2>
              <p className="text-[11px] sm:text-xs text-neutral-500">Hemat waktu dengan armada yang sedang berpatroli di sekitarmu</p>
            </div>
            <div className="flex items-center gap-1.5">
              {['Semua', 'Terdekat'].map((tab) => {
                const active = pickupTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setPickupTab(tab)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      active ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 border border-neutral-200'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            {pickups.map((pk, idx) => (
              <div key={idx} className="rounded-3xl bg-white p-4 sm:p-5 shadow-xs border border-neutral-200/80 space-y-3 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 sm:size-11 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center font-bold">
                      <Truck className="size-5 sm:size-6" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-900">{pk.name}</h3>
                      <p className="text-[11px] text-neutral-500">{pk.driver} &bull; {pk.location} ({pk.dist})</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-green text-[10px] sm:text-xs font-semibold">
                    <Clock className="size-3" /> {pk.time}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 py-2 border-y border-neutral-100 text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Sisa Bagasi</span>
                    <span className="font-bold text-neutral-800 text-[11px] sm:text-xs">{pk.slot}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Kategori</span>
                    <span className="font-bold text-neutral-800 text-[11px] sm:text-xs truncate block">{pk.category}</span>
                  </div>
                </div>

                <div>
                  <Link
                    to={ROUTES.gabungPickupStep1}
                    className="w-full flex items-center justify-center rounded-xl bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 py-2.5 px-4 text-xs font-bold transition-all"
                  >
                    Gabung Pick Up Ini
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setoran Aktif Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">Setoran Sedang Berjalan</h2>
            <Link to={ROUTES.setoranActiveList} className="text-xs font-bold text-brand-green hover:underline">
              Lihat Semua &rarr;
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-4 sm:p-5 shadow-xs border border-neutral-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-neutral-500 font-medium flex items-center gap-1">
                <Clock className="size-3" /> 20 Sep 2026 - 10:00 WIB
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Menuju lokasi
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <p className="text-xs sm:text-sm font-bold text-neutral-900 font-mono">ID: #HC-78664</p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-medium">&bull; Kardus</span>
                <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-medium">&bull; Plastik Botol</span>
              </div>
            </div>

            <div className="bg-neutral-50 p-3 rounded-2xl flex items-center justify-between border border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="size-10 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center font-bold text-sm">
                  PB
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900">Pak Budi Amirudin</p>
                  <p className="text-[10px] text-neutral-500">Motor Roda Tiga &bull; Bank Sampah RW 04</p>
                  <p className="text-[10px] text-brand-green font-semibold mt-0.5">★ 4.9 (30 Setoran)</p>
                </div>
              </div>

              <Link 
                to={ROUTES.activePickup}
                className="inline-flex items-center gap-1 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 px-4 py-2 rounded-xl shadow transition-colors"
              >
                Lacak
              </Link>
            </div>
          </div>
        </div>

      </main>

      <footer className="hidden sm:block bg-white border-t border-neutral-200 py-6 text-neutral-500 text-xs mt-auto">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
