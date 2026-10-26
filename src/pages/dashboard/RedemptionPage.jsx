import { useState } from 'react';
import { 
  Bell, Menu, X, ArrowRight, Wallet, Sparkles, 
  Clock, History, User, LogOut, Settings, ShieldCheck, ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';

export function RedemptionPage() {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState('Semua');

  const historyList = [
    { title: 'Saldo E-Wallet Go-Pay', desc: 'Tukarkan poin menjadi saldo Go-Pay', pts: '-250pts', status: 'Berhasil' },
    { title: 'Saldo E-Wallet OVO', desc: 'Tukarkan poin menjadi saldo OVO', pts: '-300pts', status: 'Berhasil' },
    { title: 'Saldo E-Wallet DANA', desc: 'Tukarkan poin menjadi saldo DANA', pts: '-150pts', status: 'Berhasil' }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-9 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Beranda</Link>
            <Link to="/dashboard/setoran-aktifs" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Setoran</Link>
            <Link to="/dashboard/riwayat" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Riwayat</Link>
            <Link to="/dashboard/penukaran" className="text-sm font-semibold text-brand-green">Penukaran</Link>
            <Link to="/dashboard/profil" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Profil</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/dashboard/notifikasi" 
              aria-label="Notifikasi" 
              className="relative rounded-full p-2.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors inline-flex items-center justify-center"
            >
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500 ring-2 ring-white" />
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 rounded-full p-1 pl-2.5 bg-neutral-100 hover:bg-neutral-200 transition-colors border border-neutral-200"
              >
                <span className="text-xs font-semibold hidden sm:inline-block max-w-[120px] truncate">Budiman Sekti</span>
                <div className="size-8 rounded-full bg-brand-green text-ink flex items-center justify-center font-bold text-sm">
                  B
                </div>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl border border-neutral-100 z-50">
                  <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                    <p className="text-xs font-bold text-neutral-900">Budiman Sekti</p>
                    <p className="text-[11px] text-neutral-500 truncate">Mahasiswa UPN Veteran Jawa Timur</p>
                  </div>
                  <Link 
                    to="/dashboard/profil" 
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors"
                  >
                    <User className="size-4 text-neutral-500" /> Profil Saya
                  </Link>
                  <Link 
                    to="/dashboard/pengaturan" 
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors"
                  >
                    <Settings className="size-4 text-neutral-500" /> Pengaturan
                  </Link>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.home)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1"
                  >
                    <LogOut className="size-4 text-red-500" /> Keluar
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-full p-2.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-3">
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">Beranda</Link>
            <Link to="/dashboard/setoran-aktifs" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">Setoran</Link>
            <Link to="/dashboard/riwayat" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">Riwayat</Link>
            <Link to="/dashboard/penukaran" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-brand-green">Penukaran</Link>
            <Link to="/dashboard/profil" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">Profil</Link>
          </div>
        )}
      </header>

      <main className="flex-grow mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">Penukaran</h1>

        {/* Total Poin Card (Image 2 format) */}
        <div className="rounded-3xl bg-neutral-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6">
          <div className="absolute -right-10 -bottom-10 size-48 rounded-full bg-brand-green/10 blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-xs font-semibold text-neutral-300">Total Poin Kamu</span>
            </div>
            <Link 
              to="/dashboard/penukaran/riwayat-poin" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-full transition-all"
            >
              Riwayat poin <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div>
            <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">1.430 <span className="text-lg font-normal text-brand-green">pts</span></p>
            <p className="text-xs text-neutral-400 mt-1.5">Diperbarui otomatis setiap setoran selesai</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-[11px] text-neutral-400 font-medium">Bisa Ditukar</p>
              <p className="text-xl font-bold text-white mt-0.5">1.250 pts</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Dapat diklaim langsung</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-[11px] text-neutral-400 font-medium">Tertahan</p>
              <p className="text-xl font-bold text-white mt-0.5">180 pts</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Dalam verifikasi</p>
            </div>
          </div>
        </div>

        {/* Pilih Kategori Penukaran */}
        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Pilih Kategori Penukaran</h2>
            <p className="text-xs text-neutral-500">Pilih jenis reward sesuai kebutuhan Anda</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 hover:border-brand-green transition-all flex flex-col justify-between">
              <div>
                <div className="size-11 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-4">
                  <Wallet className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">Saldo E-Wallet</h3>
                <p className="text-xs text-neutral-500 mt-1">Gopay, Dana, OVO, dan ShopeePay</p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-400">Mulai dari <strong className="text-neutral-900 font-semibold">500pt</strong></span>
                <Link 
                  to="/dashboard/penukaran/wallet" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green hover:underline"
                >
                  Tukar saldo <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 hover:border-brand-green transition-all flex flex-col justify-between">
              <div>
                <div className="size-11 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-4">
                  <Sparkles className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">Tiket Bus</h3>
                <p className="text-xs text-neutral-500 mt-1">WiraWiri & Trans Suroboyo Bus</p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-400">Mulai dari <strong className="text-neutral-900 font-semibold">250pts</strong></span>
                <Link 
                  to="/dashboard/penukaran/tiket" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green hover:underline"
                >
                  Tukar tiket <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Rekomendasi Reward */}
        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Rekomendasi Reward</h2>
            <p className="text-xs text-neutral-500">Pilihan reward populer dan paling cocok sama kamu</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['Semua', 'Transportasi', 'E-Wallet'].map((tab) => {
              const active = activeCategoryTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveCategoryTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                    active ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center font-bold">
                    <Wallet className="size-6" />
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-bold mb-1">
                      Rekomendasi
                    </span>
                    <h3 className="text-sm font-bold text-neutral-900">Saldo E-Wallet Go-Pay</h3>
                    <p className="text-[11px] text-neutral-500">Tukarkan poin menjadi saldo Go-Pay</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-neutral-900 mb-2">500pts (10rb)</p>
                  <Link
                    to="/dashboard/penukaran/wallet"
                    className="inline-block px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                  >
                    Tukar Poin
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Riwayat Penukaran Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Riwayat Penukaran</h2>
            </div>
            <Link to="/dashboard/penukaran/riwayat" className="text-xs font-bold text-brand-green hover:underline">
              Lihat Semua &rarr;
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
            {historyList.map((item, i) => (
              <div key={i} className={`flex items-center justify-between ${i > 0 ? 'pt-4 border-t border-neutral-100' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                    <Wallet className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900">{item.title}</p>
                    <p className="text-[11px] text-neutral-500">{item.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-red-600">{item.pts}</p>
                  <span className="text-[10px] text-brand-green font-semibold">{item.status}</span>
                </div>
              </div>
            ))}
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
