import { useState } from 'react';
import { 
  Bell, Menu, X, ArrowRight, Wallet, History, Sparkles, 
  Clock, MapPin, CheckCircle2, Trash2, BookOpen, ChevronRight, 
  User, LogOut, Settings, Award, ShieldCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { useLanguage } from '../../i18n/LanguageContext';
import { siteConfig } from '../../config/siteConfig';

export function DashboardPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock data user login sesuai contoh
  const user = {
    name: 'Budiman Sekti',
    role: 'Mahasiswa UPN Veteran Jawa Timur',
    streakDays: 3,
    targetPercent: 60,
    targetRemainingKg: 8,
    balancePoints: '2.450',
    pendingPoints: '350',
    totalPointsEarned: '4.800',
    activeShipment: {
      id: '#HC-88412',
      status: 'Dalam Perjalanan',
      estimateTime: 'Hari ini, 14:15 WIB',
      timeLeft: '15 menit lagi tiba',
      materialType: 'Limbah daur ulang',
      materialDesc: 'Plastik bersih & kardus',
      weightKg: '10.5 kg',
    },
    pickupSchedules: [
      { type: 'Plastik', desc: 'Botol & kemasan', day: 'Senin', time: '08:00–10:00', icon: Trash2 },
      { type: 'Kaca', desc: 'Botol & wadah', day: 'Rabu', time: '09:00–11:00', icon: Sparkles },
      { type: 'Kertas', desc: 'Koran & karton', day: 'Jumat', time: '07:30–09:30', icon: BookOpen },
      { type: 'Lain-lain', desc: 'Baterai & elektronik', day: 'Sabtu', time: '10:00–12:00', icon: ShieldCheck },
    ],
    tips: [
      { 
        title: 'PANDUAN BOTOL PET', 
        headline: 'Bilas, Lepas, Tutup & Label', 
        desc: 'Buang sisa minuman, lepas tutup, & label plastik sebelum disetor agar nilai poin daur ulang maksimal',
      },
      { 
        title: 'PANDUAN KALENG', 
        headline: 'Kosongkan, Bilas & Pipihkan', 
        desc: 'Buang sisa isi, bilas hingga bersih, dan pipihkan kaleng sebelum disetor agar nilai poin daur ulang maksimal',
      }
    ]
  };

  const handleLogout = () => {
    navigate(ROUTES.home);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      {/* NAVBAR SETELAH LOGIN */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to={ROUTES.dashboard || '/dashboard'} className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-9 w-auto" />
          </Link>

          {/* Desktop Navigation & Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-semibold text-brand-green">Beranda</Link>
            <Link to="/dashboard/setoran" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Setoran</Link>
            <Link to="/dashboard/riwayat" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Riwayat</Link>
            <Link to="/dashboard/penukaran" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Penukaran</Link>
            <Link to="/dashboard/profil" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Profil</Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Notifikasi */}
            <Link 
              to="/dashboard/notifikasi" 
              aria-label="Notifikasi" 
              className="relative rounded-full p-2.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors inline-flex items-center justify-center"
            >
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500 ring-2 ring-white" />
            </Link>

            {/* Profil Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 rounded-full p-1 pl-2.5 bg-neutral-100 hover:bg-neutral-200 transition-colors border border-neutral-200"
              >
                <span className="text-xs font-semibold hidden sm:inline-block max-w-[120px] truncate">{user.name}</span>
                <div className="size-8 rounded-full bg-brand-green text-ink flex items-center justify-center font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl border border-neutral-100 z-50">
                  <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                    <p className="text-xs font-bold text-neutral-900">{user.name}</p>
                    <p className="text-[11px] text-neutral-500 truncate">{user.role}</p>
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
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1"
                  >
                    <LogOut className="size-4 text-red-500" /> Keluar
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-full p-2.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-3">
            <Link 
              to="/dashboard" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-brand-green"
            >
              Beranda
            </Link>
            <Link 
              to="/dashboard/setoran" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-700"
            >
              Setoran
            </Link>
            <Link 
              to="/dashboard/riwayat" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-700"
            >
              Riwayat
            </Link>
            <Link 
              to="/dashboard/penukaran" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-700"
            >
              Penukaran
            </Link>
            <Link 
              to="/dashboard/profil" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-700"
            >
              Profil
            </Link>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA - RESPONSIVE CONTAINER */}
      <main className="flex-grow mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Greeting Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
              Halo, {user.name}! <span className="inline-block animate-bounce">👋</span>
            </h1>
            <p className="text-sm text-neutral-500 mt-0.5">{user.role}</p>
          </div>
          
          {/* Quick Date / Status Badge if needed */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold">
            <ShieldCheck className="size-4" /> Akun Terverifikasi
          </div>
        </div>

        {/* Top Cards Grid: Streak & Target Minggu Ini */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Total Streak */}
          <div className="rounded-3xl bg-neutral-900 text-white p-6 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-300">Total streak</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-green">Aktif</span>
            </div>
            <div className="my-4">
              <p className="text-3xl font-bold tracking-tight">{user.streakDays} hari</p>
              <p className="text-xs text-neutral-400 mt-1">Berturut-turut</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-green font-medium">
              <Sparkles className="size-3.5" /> Pertahankan kebiasaan baikmu!
            </div>
          </div>

          {/* Target Minggu Ini */}
          <div className="rounded-3xl bg-neutral-900 text-white p-6 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-300">Target minggu ini</span>
              <span className="text-xs font-bold text-white">{user.targetPercent}%</span>
            </div>
            <div className="my-4 space-y-2">
              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-white/20 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-brand-green transition-all duration-500" 
                  style={{ width: `${user.targetPercent}%` }} 
                />
              </div>
              <p className="text-xs text-neutral-400">{user.targetRemainingKg} kg lagi untuk mencapai target</p>
            </div>
            <div className="text-xs text-neutral-400 flex items-center justify-between">
              <span>Target: 20 kg</span>
              <span className="text-brand-green font-medium">Hampir tercapai</span>
            </div>
          </div>
        </div>

        {/* Dompet HiClean Card */}
        <div className="rounded-3xl bg-neutral-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute -right-10 -bottom-10 size-48 rounded-full bg-brand-green/10 blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="size-9 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center">
                <Wallet className="size-5" />
              </div>
              <h2 className="text-lg font-semibold tracking-tight">Dompet HiClean</h2>
            </div>
            <Link 
              to="/dashboard/riwayat-poin" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-full transition-all"
            >
              Riwayat Poin <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center py-2 border-y border-white/10 my-4">
            <div className="md:col-span-2">
              <p className="text-xs text-neutral-400 font-medium">Poin Tersisa saat ini</p>
              <p className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1 text-brand-green">
                {user.balancePoints} <span className="text-lg font-normal text-white">poin</span>
              </p>
            </div>
            <div className="flex md:flex-col justify-between gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
              <div>
                <p className="text-[11px] text-neutral-400">Poin Pending</p>
                <p className="text-sm font-bold text-amber-400 mt-0.5 flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-amber-400 animate-pulse" /> {user.pendingPoints} poin
                </p>
              </div>
              <div className="md:pt-2 md:border-t md:border-white/10">
                <p className="text-[11px] text-neutral-400">Total Poin</p>
                <p className="text-sm font-bold text-white mt-0.5">{user.totalPointsEarned} poin</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/dashboard/tukar-poin"
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white text-ink py-3.5 px-6 font-bold text-sm shadow-lg hover:bg-neutral-100 transition-all hover:scale-[1.01]"
            >
              Tukar Poin Sekarang <Sparkles className="size-4 text-brand-green" />
            </Link>
          </div>
        </div>

        {/* Setoran Aktif Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Setoran Aktif</h2>
              <p className="text-xs text-neutral-500">Cek setoran yang sedang aktif saat ini</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200/85 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold w-fit">
                <span className="size-2 rounded-full bg-amber-500 animate-ping" />
                {user.activeShipment.status} 🚚
              </div>
              <span className="text-xs font-mono font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-lg w-fit">
                ID: {user.activeShipment.id}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 items-center">
              <div className="md:col-span-8 space-y-1">
                <p className="text-xs text-neutral-500 font-medium">Estimasi Penjemputan</p>
                <p className="text-xl font-bold text-neutral-900">{user.activeShipment.estimateTime}</p>
                <p className="text-xs text-brand-green font-semibold flex items-center gap-1.5 pt-1">
                  <Clock className="size-3.5" /> {user.activeShipment.timeLeft}
                </p>
              </div>

              <div className="md:col-span-4 flex justify-start md:justify-end">
                {/* Visual bottle illustration or badge */}
                <div className="flex items-center gap-3 bg-neutral-50 p-3 rounded-2xl border border-neutral-100">
                  <div className="size-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center font-bold">
                    <Trash2 className="size-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900">{user.activeShipment.materialType}</p>
                    <p className="text-[11px] text-neutral-500">{user.activeShipment.materialDesc}</p>
                    <p className="text-xs font-bold text-brand-green mt-0.5">{user.activeShipment.weightKg}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <Link
                to="/dashboard/setoran-aktifs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white py-3 px-6 text-xs font-bold shadow hover:bg-neutral-800 transition-colors"
              >
                Lacak langsung <ArrowRight className="size-4 text-brand-green" />
              </Link>
            </div>
          </div>
        </div>

        {/* Jadwal Pengambilan Section */}
        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Jadwal Pengambilan</h2>
            <p className="text-xs text-neutral-500">Pilih jenis sampah untuk jadwal penjemputan</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {user.pickupSchedules.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx} 
                  className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/85 hover:border-brand-green transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div className="size-10 rounded-2xl bg-neutral-100 text-neutral-800 flex items-center justify-center">
                      <IconComp className="size-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-full">
                      Tersedia
                    </span>
                  </div>

                  <div className="my-4">
                    <p className="text-base font-bold text-neutral-900">{item.type}</p>
                    <p className="text-xs text-neutral-500">{item.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[11px] text-neutral-400 block">Hari</span>
                      <span className="font-semibold text-neutral-800">{item.day}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-neutral-400 block">Waktu</span>
                      <span className="font-semibold text-neutral-800">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips Pilah Sampah Section */}
        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Tips Pilah Sampah</h2>
            <p className="text-xs text-neutral-500">Praktikkan cara pilah yang benar agar sampah bisa diproses dengan baik</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.tips.map((tip, idx) => (
              <div key={idx} className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200/85 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block p-2 rounded-xl bg-brand-green/10 text-brand-green">
                      <Sparkles className="size-4" />
                    </span>
                    <span className="text-xs font-bold text-brand-green tracking-wider">{tip.title}</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 tracking-tight">{tip.headline}</h3>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">{tip.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <Link 
                    to="/dashboard/edukasi/tip-1"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green hover:underline"
                  >
                    Baca Selengkapnya <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* FOOTER SETELAH LOGIN */}
      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
