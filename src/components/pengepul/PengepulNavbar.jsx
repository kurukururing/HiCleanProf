import { useState } from 'react';
import { 
  Bell, Home, Navigation, ShieldCheck, Layers, 
  User, LogOut, Settings, Menu, X, ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { ConfirmationModal } from '../ui/ConfirmationModal';

export function PengepulNavbar({ activeName }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: 'Beranda', path: ROUTES.pengepulDashboard || '/pengepul', icon: Home },
    { name: 'Rute', path: ROUTES.pengepulRoute || '/pengepul/rute', icon: Navigation },
    { name: 'Verifikasi', path: ROUTES.pengepulVerifikasi || '/pengepul/verifikasi', icon: ShieldCheck },
    { name: 'Material', path: ROUTES.pengepulMaterial || '/pengepul/material', icon: Layers },
    { name: 'Profil', path: ROUTES.pengepulProfile || '/pengepul/profil', icon: User }
  ];

  return (
    <>
      {/* ───────────────── DESKTOP / MOBILE HEADER ───────────────── */}
      <header className="sticky top-0 z-40 bg-ink border-b border-white/10 shadow-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo + Mitra Badge */}
          <Link to="/pengepul" className="flex items-center gap-2.5 shrink-0 group py-0.5">
            <img 
              src="/logoDesc.png" 
              alt="Hi-Clean" 
              className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            <span className="px-2.5 py-0.5 rounded-full bg-brand-green text-ink text-[11px] font-black uppercase tracking-wider shadow-2xs">
              MITRA
            </span>
          </Link>

          {/* Desktop Navigation pill strip */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/10 p-1.5 rounded-full border border-white/10 backdrop-blur-sm shadow-inner">
            {links.map((lnk) => {
              const isActive = activeName === lnk.name;
              return (
                <Link
                  key={lnk.name}
                  to={lnk.path}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 ${
                    isActive
                      ? 'bg-brand-green text-ink shadow-md font-black'
                      : 'text-white/80 hover:text-white hover:bg-white/10 font-semibold'
                  }`}
                >
                  {lnk.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Bell + Avatar (desktop) + Burger (mobile) */}
          <div className="flex items-center gap-2.5">
            {/* Bell */}
            <Link
              to={ROUTES.pengepulNotifikasi || '/pengepul/notifikasi'}
              aria-label="Notifikasi"
              className="relative rounded-2xl p-2.5 bg-white/10 hover:bg-white/20 text-white transition-colors inline-flex items-center justify-center border border-white/15 shadow-2xs font-bold"
            >
              <Bell className="size-5 text-white" />
              <span className="absolute top-1.5 right-1.5 size-2.5 rounded-full bg-red-500 ring-2 ring-ink" />
            </Link>

            {/* Profile dropdown – desktop only */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2.5 rounded-full py-1.5 pl-3.5 pr-1.5 bg-white/10 hover:bg-white/20 transition-colors border border-white/15 shadow-sm text-white"
              >
                <span className="text-xs font-extrabold max-w-[140px] truncate text-white">
                  Bank Sampah Maju Jaya
                </span>
                <div className="size-8 rounded-full bg-brand-green text-ink flex items-center justify-center font-black text-sm shadow-2xs">
                  B
                </div>
              </button>

              {profileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-2xl border border-neutral-200 z-50 text-neutral-900">
                    <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                      <p className="text-xs font-bold text-neutral-900">Bank Sampah Maju Jaya</p>
                      <p className="text-[11px] text-neutral-500 truncate">Alexander Wijayanto</p>
                    </div>
                    <Link to={ROUTES.pengepulProfile || '/pengepul/profil'} onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors">
                      <User className="size-4 text-neutral-600" /> Profil Mitra
                    </Link>
                    <button type="button" onClick={() => { setProfileMenuOpen(false); setShowLogoutModal(true); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1 cursor-pointer">
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
              className="md:hidden flex items-center justify-center size-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label="Buka Menu"
            >
              <Menu className="size-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* ───────────────── MOBILE DRAWER ───────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Slide-in panel from right */}
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white flex flex-col shadow-2xl border-l-2 border-neutral-200">
            {/* Drawer Header: Profile Summary */}
            <div className="flex items-center justify-between px-5 py-4.5 border-b border-white/10 bg-ink text-white">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-brand-green text-ink flex items-center justify-center font-black text-base shadow-sm">
                  B
                </div>
                <div>
                  <p className="text-xs font-extrabold text-white">Bank Sampah Maju Jaya</p>
                  <p className="text-[11px] text-white/70 font-semibold flex items-center gap-1.5 mt-0.5">
                    <span className="size-2 rounded-full bg-brand-green inline-block animate-pulse" />
                    Mitra Terverifikasi
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-center size-9 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-colors shadow-2xs cursor-pointer"
              >
                <X className="size-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-grow px-4 py-4 space-y-1.5 overflow-y-auto">
              <p className="text-xs font-extrabold text-neutral-500 uppercase tracking-wider px-2 pb-1 font-heading">
                Menu Mitra
              </p>
              {links.map((item) => {
                const isActive = activeName === item.name;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-extrabold transition-all duration-150 active:scale-[0.98] ${
                      isActive
                        ? 'bg-neutral-900 text-white shadow-md'
                        : 'text-neutral-800 hover:bg-neutral-100'
                    }`}
                  >
                    <div className={`size-8 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-white/20 text-brand-green' : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      <Icon className="size-4.5 stroke-[2.2]" />
                    </div>
                    <span>{item.name}</span>
                    {isActive && <span className="ml-auto size-2 rounded-full bg-brand-green" />}
                  </Link>
                );
              })}

              <div className="pt-4 mt-3 border-t-2 border-neutral-200 space-y-1.5">
                <p className="text-xs font-extrabold text-neutral-500 uppercase tracking-wider px-2 pb-1 font-heading">
                  Lainnya
                </p>
                <Link
                  to={ROUTES.pengepulNotifikasi || '/pengepul/notifikasi'}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-bold text-neutral-800 hover:bg-neutral-100 active:bg-neutral-100 transition-all duration-150"
                >
                  <div className="size-8 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center relative">
                    <Bell className="size-4.5" />
                    <span className="absolute top-0.5 right-0.5 size-2 rounded-full bg-red-500" />
                  </div>
                  Notifikasi
                </Link>
              </div>
            </nav>

            {/* Footer: Logout */}
            <div className="px-4 py-4 border-t-2 border-neutral-200">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  setShowLogoutModal(true);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-bold text-red-600 hover:bg-red-50 active:bg-red-100 transition-all duration-150 cursor-pointer"
              >
                <div className="size-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                  <LogOut className="size-4.5" />
                </div>
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false);
          navigate('/');
        }}
        title="Keluar dari Akun Mitra?"
        description="Apakah Anda yakin ingin keluar dari sesi akun mitra pengepul? Anda dapat masuk kembali kapan saja."
        confirmText="Ya, Keluar"
        cancelText="Batal"
        type="danger"
      />
    </>
  );
}
