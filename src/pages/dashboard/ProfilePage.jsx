import { 
  User, LogOut, Settings, ShieldCheck, ChevronRight,
  MapPin, Globe, Lock, Flame, Package
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { WargaNavbar } from '../../components/layout/WargaNavbar';
import { siteConfig } from '../../config/siteConfig';

export function ProfilePage() {
  const navigate = useNavigate();

  const user = {
    name: 'Budiman',
    fullName: 'Budiman Sekti',
    phone: '+62-821-7567-7656',
    joinDate: 'September 2026',
    streakDays: 3,
    totalSetor: '42.5 kg',
    activePoints: '1.430 pts'
  };

  const menuItems = [
    { label: 'Data Diri', icon: User, path: ROUTES.profileData },
    { label: 'Alamat Saya', icon: MapPin, path: ROUTES.profileAddress },
    { label: 'Bahasa', icon: Globe, path: ROUTES.profileLanguage },
    { label: 'Keamanan Akun', icon: Lock, path: ROUTES.profileSecurity },
    { label: 'Pengaturan Umum', icon: Settings, path: ROUTES.generalSettings }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <WargaNavbar activeName="Profil" />

      <main className="flex-grow mx-auto w-full max-w-3xl px-4 py-5 sm:px-6 space-y-4 pb-8">
        
        {/* Header */}
        <div className="pt-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900">Akun Saya</h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">Kelola data dan preferensi akun Anda</p>
        </div>

        {/* User Profile Card */}
        <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80">
          <div className="flex items-center gap-4">
            <div className="size-14 sm:size-16 rounded-2xl bg-brand-green/20 text-brand-green flex items-center justify-center font-extrabold text-2xl shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base sm:text-lg font-bold text-neutral-900">{user.fullName}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green text-[10px] sm:text-[11px] font-bold shrink-0">
                  Terverifikasi
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">Bergabung {user.joinDate}</p>
              <p className="text-[11px] sm:text-xs font-mono text-neutral-600 mt-0.5">{user.phone}</p>
            </div>
          </div>
        </div>

        {/* Streak Alert Card */}
        <div className="rounded-3xl bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 sm:p-5 shadow-md flex items-center gap-3 sm:gap-4">
          <div className="size-10 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
            <Flame className="size-5 sm:size-6" />
          </div>
          <div>
            <p className="text-sm sm:text-base font-bold">{user.streakDays} hari streak tanpa putus!</p>
            <p className="text-[11px] sm:text-xs text-white/90 mt-0.5">Teruskan kebiasaan baik daur ulang Anda</p>
          </div>
        </div>

        {/* Stats: Total Setor & Poin Aktif */}
        <div className="rounded-3xl bg-neutral-900 text-white p-5 sm:p-6 shadow-xl grid grid-cols-2 gap-4 items-center relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 size-32 rounded-full bg-brand-green/15 blur-2xl pointer-events-none" />
          <div className="border-r border-white/10 pr-4">
            <p className="text-[11px] text-neutral-400 flex items-center gap-1.5">
              <Package className="size-3 text-brand-green" /> Total Setor
            </p>
            <p className="text-xl sm:text-2xl font-extrabold mt-1 text-white">{user.totalSetor}</p>
          </div>
          <div className="pl-2">
            <p className="text-[11px] text-neutral-400 flex items-center gap-1.5">
              <ShieldCheck className="size-3 text-brand-green" /> Poin Aktif
            </p>
            <p className="text-xl sm:text-2xl font-extrabold mt-1 text-brand-green">{user.activePoints}</p>
          </div>
        </div>

        {/* Menu List */}
        <div className="rounded-3xl bg-white shadow-xs border border-neutral-200/80 divide-y divide-neutral-100 overflow-hidden">
          {menuItems.map((item, i) => {
            const IconComp = item.icon;
            return (
              <Link
                key={i}
                to={item.path}
                className="flex items-center justify-between p-4 sm:p-5 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 sm:size-10 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center">
                    <IconComp className="size-4 sm:size-5" />
                  </div>
                  <span className="text-sm font-semibold text-neutral-900">{item.label}</span>
                </div>
                <ChevronRight className="size-4 sm:size-5 text-neutral-400" />
              </Link>
            );
          })}
        </div>

        {/* Keluar Button */}
        <button
          type="button"
          onClick={() => navigate(ROUTES.home)}
          className="w-full flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-red-50/80 border border-red-200 text-red-600 hover:bg-red-100 transition-colors font-semibold text-sm"
        >
          <div className="flex items-center gap-3">
            <div className="size-9 sm:size-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <LogOut className="size-4 sm:size-5" />
            </div>
            <span>Keluar dari Akun</span>
          </div>
          <ChevronRight className="size-4 sm:size-5 text-red-400" />
        </button>

      </main>

      <footer className="hidden sm:block bg-white border-t border-neutral-200 py-6 text-neutral-500 text-xs mt-auto">
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
