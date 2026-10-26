import { useState } from 'react';
import { 
  Bell, Menu, X, ArrowRight, Wallet, History, Sparkles, 
  Clock, MapPin, CheckCircle2, Trash2, BookOpen, ChevronRight, 
  User, LogOut, Settings, Award, ShieldCheck, Calendar, Filter
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';

export function HistoryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Semua');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const historyItems = [
    {
      id: '#HC-78654',
      date: '20 Sep 2026 - 10:00 WIB',
      status: 'Diterima Penuh',
      statusType: 'success',
      tags: ['Kaleng & Logam Aluminium', 'Plastik Botol'],
      weight: '4.5 kg',
      estimateWeight: 'Estimasi 6 kg'
    },
    {
      id: '#HC-78664',
      date: '20 Sep 2026 - 10:00 WIB',
      status: 'Diterima Penuh',
      statusType: 'success',
      tags: ['Kardus', 'Plastik Botol'],
      weight: '6 kg',
      estimateWeight: 'Estimasi 6 kg'
    },
    {
      id: '#HC-78647',
      date: '15 Sep 2026 - 14:00 WIB',
      status: 'Diterima Sebagian',
      statusType: 'warning',
      tags: ['Plastik Botol'],
      weight: '4.5 kg',
      estimateWeight: 'Estimasi 6 kg',
      note: 'Catatan Petugas\n2.0 kg material tercampur basah dan tercampur dengan minyak makanan, sehingga tidak dapat diproses oleh pihak mitra daur ulang'
    },
    {
      id: '#HC-787413',
      date: '5 Sep 2026 - 17:00 WIB',
      status: 'Ditolak',
      statusType: 'danger',
      tags: ['Plastik Botol', 'Kaleng'],
      weight: '4.5 kg',
      estimateWeight: 'Estimasi 6 kg',
      note: 'Catatan Penolakan\nKontaminasi minyak pada botol dan kaleng sangat banyak dan tidak bisa ditoleran. Semuanya masih belum dbilas degann benar'
    }
  ];

  const filtered = activeTab === 'Semua' 
    ? historyItems 
    : activeTab === 'Diterima penuh'
      ? historyItems.filter(i => i.status === 'Diterima Penuh')
      : historyItems.filter(i => i.status === 'Diterima Sebagian');

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      {/* NAVBAR DIPERBARUI */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-9 w-auto" />
          </Link>

          {/* Navigasi Utama Sesuai Permintaan: Beranda, Setoran, Riwayat, Penukaran, Profil */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Beranda</Link>
            <Link to="/dashboard/setoran" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Setoran</Link>
            <Link to="/dashboard/riwayat" className="text-sm font-semibold text-brand-green">Riwayat</Link>
            <Link to="/dashboard/penukaran" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Penukaran</Link>
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
            <Link to="/dashboard/setoran" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">Setoran</Link>
            <Link to="/dashboard/riwayat" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-brand-green">Riwayat</Link>
            <Link to="/dashboard/penukaran" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">Penukaran</Link>
            <Link to="/dashboard/profil" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">Profil</Link>
          </div>
        )}
      </header>

      <main className="flex-grow mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">Riwayat Setoran</h1>

        {/* Top Summary Dark Card */}
        <div className="rounded-3xl bg-neutral-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6">
          <div className="absolute -right-10 -bottom-10 size-48 rounded-full bg-brand-green/10 blur-2xl pointer-events-none" />
          
          <div>
            <h2 className="text-lg font-bold">Riwayat Setoran</h2>
            <p className="text-xs text-neutral-400 mt-1 max-w-md">Jejak terverifikasi dari rumah tangga hingga pabrik daur ulang mitra</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
              <p className="text-xs text-neutral-400 font-medium">Total Setoran</p>
              <p className="text-3xl font-extrabold text-white mt-1">48.2 <span className="text-sm font-normal text-brand-green">kg</span></p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
              <p className="text-xs text-neutral-400 font-medium">Total Poin Terkumpul</p>
              <p className="text-3xl font-extrabold text-white mt-1">2.750 <span className="text-sm font-normal text-brand-green">pts</span></p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { label: 'Semua', count: 4 },
              { label: 'Diterima penuh', count: 2 },
              { label: 'Diterima sebagian', count: 2 }
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

          {/* Date & Material Filters */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-700">
              <Calendar className="size-3.5 text-neutral-500" /> 1 - 10 Sep 2026
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-700">
              <Filter className="size-3.5 text-neutral-500" /> Material
            </div>
          </div>
        </div>

        {/* History Cards List */}
        <div className="space-y-4">
          {filtered.map((item) => {
            const isSuccess = item.statusType === 'success';
            const isWarning = item.statusType === 'warning';
            const isDanger = item.statusType === 'danger';

            return (
              <div key={item.id} className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200/85 hover:shadow-md transition-shadow space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-medium flex items-center gap-1.5">
                    <Clock className="size-3.5" /> {item.date}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    isSuccess ? 'bg-emerald-50 text-emerald-700' : isWarning ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                  }`}>
                    <span className={`size-2 rounded-full ${isSuccess ? 'bg-emerald-500' : isWarning ? 'bg-amber-500' : 'bg-red-500'}`} />
                    {item.status}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-base font-bold text-neutral-900 font-mono">ID : {item.id}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tg, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-medium">
                        &bull; {tg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Weight Card Box inside */}
                <div className="bg-neutral-100/80 p-4 rounded-2xl flex items-center justify-between border border-neutral-200/60">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-white text-neutral-800 flex items-center justify-center font-bold shadow-sm">
                      <Trash2 className="size-5 text-brand-green" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-neutral-900">{item.weight}</p>
                      <p className="text-[11px] text-neutral-500">{item.estimateWeight}</p>
                    </div>
                  </div>

                  <Link 
                    to={`/dashboard/riwayat/detail/${encodeURIComponent(item.id)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-brand-green bg-white px-4 py-2 rounded-xl shadow-sm border border-neutral-200 transition-colors"
                  >
                    Detail <ChevronRight className="size-4" />
                  </Link>
                </div>

                {item.note && (
                  <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    isWarning ? 'bg-amber-50/60 border-amber-200 text-amber-900' : 'bg-red-50/60 border-red-200 text-red-900'
                  }`}>
                    <p className="font-bold mb-1">{item.note.split('\n')[0]}</p>
                    <p className="opacity-90">{item.note.split('\n')[1]}</p>
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
