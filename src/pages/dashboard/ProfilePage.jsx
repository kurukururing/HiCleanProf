import { useState } from 'react';
import { 
  Bell, Menu, X, ArrowRight, Wallet, Sparkles, 
  Clock, History, User, LogOut, Settings, ShieldCheck, ChevronRight,
  MapPin, Globe, Lock, Flame, Package
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';

export function ProfilePage() {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = {
    name: 'Budiman',
    fullName: 'Budiman Sekti',
    phone: '+62-821-7567-7656',
    joinDate: 'September 2026',
    streakDays: 3,
    totalSetor: '42.5 kg',
    activePoints: '1.430 pts'
  };

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
            <Link to="/dashboard/penukaran" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Penukaran</Link>
            <Link to="/dashboard/profil" className="text-sm font-semibold text-brand-green">Profil</Link>
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
                <span className="text-xs font-semibold hidden sm:inline-block max-w-[120px] truncate">{user.name}</span>
                <div className="size-8 rounded-full bg-brand-green text-ink flex items-center justify-center font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl border border-neutral-100 z-50">
                  <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                    <p className="text-xs font-bold text-neutral-900">{user.fullName}</p>
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
            <Link to="/dashboard/penukaran" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">Penukaran</Link>
            <Link to="/dashboard/profil" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-brand-green">Profil</Link>
          </div>
        )}
      </header>

      <main className="flex-grow mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">Akun Saya</h1>

        {/* User Card (Image 1 format) */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
            alt="Budiman" 
            className="size-16 rounded-full object-cover border-2 border-brand-green/30 shrink-0" 
          />
          <div className="space-y-1 w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-900">{user.name}</h2>
              <span className="px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-[11px] font-semibold">
                Terverifikasi
              </span>
            </div>
            <p className="text-xs text-neutral-500">Bergabung pada {user.joinDate}</p>
            <p className="text-xs font-mono text-neutral-600">{user.phone}</p>
          </div>
        </div>

        {/* Streak Alert Card */}
        <div className="rounded-3xl bg-[#FF4B4B] text-white p-5 shadow-md flex items-center gap-4">
          <div className="size-10 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
            <Flame className="size-6" />
          </div>
          <div>
            <p className="text-base font-bold">{user.streakDays} hari streak tanpa putus</p>
            <p className="text-xs text-white/90 mt-0.5">Teruskan streak anda agar dapat dibagikan</p>
          </div>
        </div>

        {/* Total Setor & Poin Aktif Card */}
        <div className="rounded-3xl bg-neutral-900 text-white p-6 shadow-xl grid grid-cols-2 gap-4 items-center">
          <div className="border-r border-white/10 pr-4">
            <p className="text-xs text-neutral-400 font-medium flex items-center gap-1.5">
              <Package className="size-3.5 text-brand-green" /> Total Setor
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold mt-1 text-white">{user.totalSetor}</p>
          </div>
          <div className="pl-2">
            <p className="text-xs text-neutral-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-brand-green" /> Poin Aktif
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold mt-1 text-brand-green">{user.activePoints}</p>
          </div>
        </div>

        {/* Menu List */}
        <div className="rounded-3xl bg-white shadow-sm border border-neutral-200 divide-y divide-neutral-100 overflow-hidden">
          {[
            { label: 'Data diri', icon: User, path: '/dashboard/profil/data-diri' },
            { label: 'Alamat', icon: MapPin, path: '/dashboard/profil/alamat' },
            { label: 'Bahasa', icon: Globe, path: '/dashboard/profil/bahasa' },
            { label: 'Keamanan', icon: Lock, path: '/dashboard/profil/keamanan' },
            { label: 'Pengaturan Umum', icon: Settings, path: '/dashboard/pengaturan' }
          ].map((item, i) => {
            const IconComp = item.icon;
            return (
              <Link
                key={i}
                to={item.path}
                className="flex items-center justify-between p-5 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center">
                    <IconComp className="size-5" />
                  </div>
                  <span className="text-sm font-bold text-neutral-900">{item.label}</span>
                </div>
                <ChevronRight className="size-5 text-neutral-400" />
              </Link>
            );
          })}
        </div>

        {/* Keluar Button */}
        <Link
          to={ROUTES.home}
          className="w-full flex items-center justify-between p-5 rounded-3xl bg-red-50/80 border border-red-200 text-red-600 hover:bg-red-100 transition-colors font-bold text-sm"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <LogOut className="size-5" />
            </div>
            <span>Keluar</span>
          </div>
          <ChevronRight className="size-5 text-red-400" />
        </Link>

      </main>

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
