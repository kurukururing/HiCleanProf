import { useState } from 'react';
import { 
  Bell, Menu, X, ArrowRight, Wallet, Sparkles, 
  Clock, History, User, LogOut, Settings, ShieldCheck, ChevronRight,
  Trash2, MapPin
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';

export function SetoranMainPage() {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pickupTab, setPickupTab] = useState('Semua');

  const pickups = [
    { name: 'Truk HiClean', driver: 'Pak Budi Santoso', location: 'Jl. Purimas Raya', dist: '400m', time: '10-20 Mnt', slot: '5 slot (45kg)', category: 'Plastik & kaleng minuman' },
    { name: 'Truk EcoTransport', driver: 'Pak Rudi', location: 'Jl. Melati No. 12', dist: '500m', time: '15-25 Mnt', slot: '3 slot (30kg)', category: 'Kaca & botol' },
    { name: 'Truk SafeMove', driver: 'Bu Ani', location: 'Jl. Kentang No. 5', dist: '300m', time: '5-15 Mnt', slot: '7 slot (50kg)', category: 'Kertas & plastik' }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-9 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Beranda</Link>
            <Link to="/dashboard/setoran" className="text-sm font-semibold text-brand-green">Setoran</Link>
            <Link to="/dashboard/riwayat" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Riwayat</Link>
            <Link to="/dashboard/penukaran" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Penukaran</Link>
            <Link to="/dashboard/profil" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Profil</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/dashboard/notifikasi" aria-label="Notifikasi" className="relative rounded-full p-2.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors inline-flex items-center justify-center">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500 ring-2 ring-white" />
            </Link>

            <div className="relative">
              <button type="button" onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="flex items-center gap-2 rounded-full p-1 pl-2.5 bg-neutral-100 hover:bg-neutral-200 transition-colors border border-neutral-200">
                <span className="text-xs font-semibold hidden sm:inline-block max-w-[120px] truncate">Budiman Sekti</span>
                <div className="size-8 rounded-full bg-brand-green text-ink flex items-center justify-center font-bold text-sm">B</div>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl border border-neutral-100 z-50">
                  <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                    <p className="text-xs font-bold text-neutral-900">Budiman Sekti</p>
                    <p className="text-[11px] text-neutral-500 truncate">Mahasiswa UPN Veteran Jawa Timur</p>
                  </div>
                  <Link to="/dashboard/profil" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors">
                    <User className="size-4 text-neutral-500" /> Profil Saya
                  </Link>
                  <Link to="/dashboard/pengaturan" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors">
                    <Settings className="size-4 text-neutral-500" /> Pengaturan
                  </Link>
                  <button type="button" onClick={() => navigate(ROUTES.home)} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1">
                    <LogOut className="size-4 text-red-500" /> Keluar
                  </button>
                </div>
              )}
            </div>

            <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden rounded-full p-2.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors">
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-3">
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">Beranda</Link>
            <Link to="/dashboard/setoran" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-brand-green">Setoran</Link>
            <Link to="/dashboard/riwayat" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">Riwayat</Link>
            <Link to="/dashboard/penukaran" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">Penukaran</Link>
            <Link to="/dashboard/profil" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">Profil</Link>
          </div>
        )}
      </header>

      <main className="flex-grow mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">Setoran</h1>

        {/* Poin & Target Card (Image 1) */}
        <div className="rounded-3xl bg-neutral-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4">
          <div className="absolute -right-10 -bottom-10 size-48 rounded-full bg-brand-green/10 blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-300">Poin Kamu</span>
            <span className="text-xs font-mono bg-white/10 px-3 py-1 rounded-full text-brand-green">Aktif</span>
          </div>
          <div>
            <p className="text-4xl font-extrabold tracking-tight text-brand-green">1.430 <span className="text-lg font-normal text-white">pts</span></p>
          </div>
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs text-neutral-300">
              <span>Target minggu ini</span>
              <span className="font-bold text-white">60%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full bg-brand-green" style={{ width: '60%' }} />
            </div>
            <p className="text-[11px] text-neutral-400">8 kg lagi untuk mencapai target</p>
          </div>
        </div>

        {/* Setor Sampah Sekarang Banner */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold">
              Penjemputan Sampah 🚚
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Setor Sampah Sekarang</h2>
            <p className="text-xs text-neutral-500 mt-1">Panggil armada penjemputan mandiri langsung ke titik lokasimu</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-neutral-600 font-medium">
            <span className="px-3 py-1.5 rounded-xl bg-neutral-100">⏱️ 15 - 30 Menit</span>
            <span className="px-3 py-1.5 rounded-xl bg-neutral-100">⚖️ Min 1 kg</span>
            <span className="px-3 py-1.5 rounded-xl bg-neutral-100">✨ Gratis biaya ongkir</span>
            <span className="px-3 py-1.5 rounded-xl bg-neutral-100">📋 6 langkah mudah</span>
          </div>

          <div className="pt-2">
            <Link
              to="/dashboard/setoran/langkah-1"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white py-3.5 px-6 text-xs font-bold shadow hover:bg-neutral-800 transition-colors"
            >
              Siap Jemput <ArrowRight className="size-4 text-brand-green" />
            </Link>
          </div>
        </div>

        {/* Gabung Pick Up Section */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Gabung Pick Up</h2>
              <p className="text-xs text-neutral-500">Hemat emosi & jemput kilat tanpa perlu menunggu dengan bergabung rute disekitar</p>
            </div>
            <div className="flex items-center gap-2">
              {['Semua', 'Terdekat'].map((tab) => {
                const active = pickupTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setPickupTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      active ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 border border-neutral-200'
                    }`}
                  >
                    {tab} {tab === 'Semua' ? '3' : '2'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {pickups.map((pk, idx) => (
              <div key={idx} className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200/85 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center font-bold">
                      <TruckIcon className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-neutral-900">{pk.name}</h3>
                      <p className="text-xs text-neutral-500">{pk.driver} - {pk.location} ({pk.dist})</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold">
                    <Clock className="size-3.5" /> {pk.time}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 py-2 border-y border-neutral-100 text-xs">
                  <div>
                    <span className="text-[11px] text-neutral-400 block">Sisa bagasi</span>
                    <span className="font-bold text-neutral-800">{pk.slot}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-400 block">Kategori</span>
                    <span className="font-bold text-neutral-800">{pk.category}</span>
                  </div>
                </div>

                <div>
                  <Link
                    to="/dashboard/setoran/langkah-1"
                    className="w-full flex items-center justify-center rounded-2xl bg-neutral-900 text-white py-3 px-6 text-xs font-bold hover:bg-neutral-800 transition-colors shadow"
                  >
                    Gabung Pick Up
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setoran Aktif Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Setoran Aktif</h2>
            <Link to="/dashboard/setoran/aktif-list" className="text-xs font-bold text-brand-green hover:underline">
              Lihat Semua &rarr;
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200/85 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-medium flex items-center gap-1.5">
                <Clock className="size-3.5" /> 20 Sep 2026 - 10:00 WIB
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Menuju lokasi
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-base font-bold text-neutral-900 font-mono">ID : #HC-78664</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-medium">&bull; Kardus</span>
                <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-medium">&bull; Plastik Botol</span>
              </div>
            </div>

            <div className="bg-neutral-100/80 p-4 rounded-2xl flex items-center justify-between border border-neutral-200/60">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
                  alt="Kurir" 
                  className="size-12 rounded-full object-cover border" 
                />
                <div>
                  <p className="text-sm font-bold text-neutral-900">Pak Budi Amirudin</p>
                  <p className="text-[11px] text-neutral-500">Motor Roda Tiga Eco - Bank Sampah RW 04</p>
                  <p className="text-[11px] text-brand-green font-semibold mt-0.5">★ 4.9 (30 Setoran) - Terverifikasi</p>
                </div>
              </div>

              <Link 
                to="/dashboard/setoran-aktifs"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 px-5 py-2.5 rounded-xl shadow transition-colors"
              >
                Lacak
              </Link>
            </div>
          </div>
        </div>

      </main>

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
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

function TruckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 17h4V5H2v12h3m11 0h3v-4l-3-4h-3v8z" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}
