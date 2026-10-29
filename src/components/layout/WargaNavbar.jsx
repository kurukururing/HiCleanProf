import { useState } from 'react';
import { 
  Bell, Home, Truck, History, Gift, User, 
  LogOut, Settings, ChevronRight, Menu, X,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { ConfirmationModal } from '../ui/ConfirmationModal';

export function WargaNavbar({ activeName }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Beranda', path: ROUTES.dashboard, icon: Home },
    { name: 'Setoran', path: ROUTES.setoranMain, icon: Truck },
    { name: 'Riwayat', path: ROUTES.history, icon: History },
    { name: 'Penukaran', path: ROUTES.redemption, icon: Gift },
    { name: 'Profil', path: ROUTES.profile, icon: User }
  ];

  return (
    <>
      {/* ───────────────── DESKTOP HEADER ───────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to={ROUTES.dashboard} className="flex items-center gap-2 shrink-0">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-8 md:h-9 w-auto" />
          </Link>

          {/* Desktop Navigation Links – pill strip */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-100/70 p-1 rounded-full border border-neutral-200/60">
            {navItems.map((item) => {
              const isActive = activeName === item.name;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-150 ${
                    isActive
                      ? 'bg-white text-neutral-900 shadow-sm border-b-2 border-brand-green/40'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Bell + Avatar (desktop) + Burger (mobile) */}
          <div className="flex items-center gap-2">
            {/* Bell – visible on both */}
            <Link
              to={ROUTES.notifications}
              aria-label="Notifikasi"
              className="relative rounded-full p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors inline-flex items-center justify-center border border-neutral-200/70"
            >
              <Bell className="size-4.5" />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500 ring-2 ring-white" />
            </Link>

            {/* Profile dropdown – desktop only */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 rounded-full py-1 pl-2.5 pr-1 bg-neutral-100 hover:bg-neutral-200 transition-colors border border-neutral-200"
              >
                <span className="text-xs font-semibold max-w-[120px] truncate text-neutral-800">
                  Budiman Sekti
                </span>
                <div className="size-8 rounded-full bg-brand-green text-ink flex items-center justify-center font-extrabold text-sm">
                  B
                </div>
              </button>

              {profileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl border border-neutral-100 z-50">
                    <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                      <p className="text-xs font-bold text-neutral-900">Budiman Sekti</p>
                      <p className="text-[11px] text-neutral-500">Warga Peduli Lingkungan</p>
                    </div>
                    <Link to={ROUTES.profile} onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors">
                      <User className="size-4 text-neutral-500" /> Profil Saya
                    </Link>
                    <Link to={ROUTES.generalSettings} onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors">
                      <Settings className="size-4 text-neutral-500" /> Pengaturan
                    </Link>
                    <button type="button" onClick={() => { setProfileMenuOpen(false); setShowLogoutModal(true); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1">
                      <LogOut className="size-4 text-red-500" /> Keluar
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Burger – mobile only */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="md:hidden flex items-center justify-center size-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors border border-neutral-200"
              aria-label="Buka Menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ───────────────── MOBILE DRAWER OVERLAY ───────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Slide-in panel from right */}
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white flex flex-col shadow-2xl">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-brand-green text-ink flex items-center justify-center font-extrabold text-base">
                  B
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">Budiman Sekti</p>
                  <p className="text-[11px] text-neutral-500">Warga Peduli Lingkungan</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-center size-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 transition-colors"
              >
                <X className="size-4.5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-grow px-4 py-4 space-y-1 overflow-y-auto">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2 pb-1">
                Menu Utama
              </p>
              {navItems.map((item) => {
                const isActive = activeName === item.name;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold transition-all duration-150 active:bg-neutral-100 ${
                      isActive
                        ? 'bg-brand-green/10 text-brand-green'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <div className={`size-8 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-brand-green/20 text-brand-green' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      <Icon className="size-4" />
                    </div>
                    <span>{item.name}</span>
                    {isActive && <span className="ml-auto size-2 rounded-full bg-brand-green" />}
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-neutral-100 space-y-1">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2 pb-1">
                  Akun
                </p>
                <Link
                  to={ROUTES.generalSettings}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-neutral-700 hover:bg-neutral-100 active:bg-neutral-100 transition-all duration-150"
                >
                  <div className="size-8 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center">
                    <Settings className="size-4" />
                  </div>
                  Pengaturan
                </Link>
                <Link
                  to={ROUTES.notifications}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-neutral-700 hover:bg-neutral-100 active:bg-neutral-100 transition-all duration-150"
                >
                  <div className="size-8 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center relative">
                    <Bell className="size-4" />
                    <span className="absolute top-0.5 right-0.5 size-2 rounded-full bg-red-500" />
                  </div>
                  Notifikasi
                </Link>
              </div>
            </nav>

            {/* Drawer Footer: Logout */}
            <div className="px-4 py-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => { setDrawerOpen(false); setShowLogoutModal(true); }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-red-600 hover:bg-red-50 active:bg-red-100 transition-all duration-150"
              >
                <div className="size-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                  <LogOut className="size-4" />
                </div>
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal Logout */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false);
          navigate(ROUTES.home);
        }}
        title="Keluar dari Akun?"
        description="Apakah Anda yakin ingin keluar? Anda perlu masuk kembali untuk mengakses poin dan riwayat setoran."
        confirmText="Ya, Keluar"
        cancelText="Batal"
        type="danger"
      />

      {/* ───────────────── MOBILE BOTTOM NAVIGATION BAR ───────────────── */}
      <nav 
        aria-label="Navigasi Bawah"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 pt-1 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = activeName === item.name;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl min-w-[56px] min-h-[48px] transition-all duration-150 active:scale-95 ${
                  isActive 
                    ? 'text-neutral-900 font-extrabold' 
                    : 'text-neutral-500 hover:text-neutral-800 font-semibold'
                }`}
              >
                <div className={`relative p-1 rounded-xl transition-colors ${
                  isActive ? 'bg-brand-green/20 text-neutral-900' : 'text-neutral-500'
                }`}>
                  <Icon className={`size-5 transition-transform ${isActive ? 'scale-110 text-neutral-900 stroke-[2.4]' : 'stroke-[1.8]'}`} />
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-brand-green" />
                  )}
                </div>
                <span className={`text-[10px] mt-0.5 tracking-tight ${
                  isActive ? 'text-neutral-900 font-extrabold' : 'text-neutral-500 font-medium'
                }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
