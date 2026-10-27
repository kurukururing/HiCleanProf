import { useState } from 'react';
import { 
  Bell, Menu, X, ArrowRight, Wallet, Sparkles, 
  Clock, History, User, LogOut, Settings, ShieldCheck, Calendar, Filter
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';

export function RedemptionHistoryPage() {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Semua');

  const historyList = [
    { type: 'Transportasi', title: '1x Tiket Feeder Wira Wiri', date: '20 Sep 2026, 14:10 WIB', pts: '-250pts', status: 'Siap Digunakan', validUntil: '21 Sep 2026, 14:10 WIB' },
    { type: 'E-Wallet', title: 'Saldo Go-Pay Rp25.000', date: '20 Sep 2026, 14:10 WIB', pts: '-500pts', status: 'Berhasil Masuk', validUntil: null },
    { type: 'Transportasi', title: '1x Tiket Bus Semanggi', date: '20 Sep 2026, 14:10 WIB', pts: '-300pts', status: 'Sudah Dipakai', validUntil: null }
  ];

  const filtered = activeTab === 'Semua' 
    ? historyList 
    : historyList.filter(h => h.type.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-9 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Beranda</Link>
            <Link to="/dashboard/setoran" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Setoran</Link>
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
            <Link to="/dashboard/setoran" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">Setoran</Link>
            <Link to="/dashboard/riwayat" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">Riwayat</Link>
            <Link to="/dashboard/penukaran" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-brand-green">Penukaran</Link>
            <Link to="/dashboard/profil" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">Profil</Link>
          </div>
        )}
      </header>

      <main className="flex-grow mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">Riwayat Penukaran</h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { label: 'Semua', count: 2 },
              { label: 'Transportasi', count: 3 },
              { label: 'E-Wallet', count: 1 }
            ].map(tab => {
              const active = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                    active ? 'bg-neutral-900 text-white shadow' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {tab.label}
                  <span className={`size-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    active ? 'bg-brand-green text-ink' : 'bg-neutral-200 text-neutral-800'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-700">
              <Calendar className="size-3.5 text-neutral-500" /> September 2026
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">September</h2>

          {filtered.map((item, idx) => {
            const isTicket = item.type === 'Transportasi';
            return (
              <div key={idx} className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200/85 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                      <Wallet className="size-6" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-neutral-900">{item.title}</p>
                      <p className="text-xs text-neutral-500">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-red-600">{item.pts}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold mt-1 ${
                      item.status === 'Siap Digunakan' ? 'bg-brand-green/10 text-brand-green' : item.status === 'Berhasil Masuk' ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                {item.validUntil && (
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                    <span className="text-xs text-neutral-500 flex items-center gap-1.5">
                      <Clock className="size-3.5 text-amber-500" /> Berlaku s/d: <strong className="text-neutral-800">{item.validUntil}</strong>
                    </span>
                    <Link
                      to="/dashboard/penukaran/berhasil-tiket"
                      className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                    >
                      Lihat Kode QR
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
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
