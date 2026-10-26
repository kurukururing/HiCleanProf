import { useState } from 'react';
import { 
  Bell, Home, Navigation, ShieldCheck, Layers, 
  User, LogOut, Settings, Menu, X, ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

export function PengepulNavbar({ activeName }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo + Mitra Badge */}
          <Link to="/pengepul" className="flex items-center gap-2 shrink-0 group">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-8 md:h-9 w-auto" />
            <span className="px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-bold uppercase tracking-wide">
              MITRA
            </span>
          </Link>

          {/* Desktop Navigation pill strip */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-100/70 p-1 rounded-full border border-neutral-200/60">
            {links.map((lnk) => {
              const isActive = activeName === lnk.name;
              return (
                <Link
                  key={lnk.name}
                  to={lnk.path}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
                  }`}
                >
                  {lnk.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Bell + Avatar (desktop) + Burger (mobile) */}
          <div className="flex items-center gap-2">
            {/* Bell */}
            <Link
              to={ROUTES.pengepulNotifikasi || '/pengepul/notifikasi'}
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
                <span className="text-xs font-semibold max-w-[140px] truncate text-neutral-800">
                  Bank Sampah Maju Jaya
                </span>
                <div className="size-8 rounded-full bg-brand-green text-ink flex items-center justify-center font-bold text-sm">
                  B
                </div>
              </button>

              {profileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl border border-neutral-100 z-50">
                    <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                      <p className="text-xs font-bold text-neutral-900">Bank Sampah Maju Jaya</p>
                      <p className="text-[11px] text-neutral-500 truncate">Alexander Wijayanto</p>
                    </div>
                    <Link to={ROUTES.pengepulProfile || '/pengepul/profil'} onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors">
                      <User className="size-4 text-neutral-500" /> Profil Mitra
                    </Link>
                    <button type="button" onClick={() => { setProfileMenuOpen(false); navigate('/'); }}
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

      {/* ───────────────── MOBILE DRAWER ───────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Slide-in panel from right */}
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white flex flex-col shadow-2xl">
            {/* Drawer Header: Profile Summary */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 bg-neutral-50">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-brand-green text-ink flex items-center justify-center font-bold text-base shadow">
                  B
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900">Bank Sampah Maju Jaya</p>
                  <p className="text-[11px] text-neutral-500 flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-brand-green inline-block" />
                    Mitra Terverifikasi
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-center size-8 rounded-full bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-500 transition-colors"
              >
                <X className="size-4.5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-grow px-4 py-4 space-y-1 overflow-y-auto">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2 pb-1">
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
                    className={`flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold transition-all ${
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
                  Lainnya
                </p>
                <Link
                  to={ROUTES.pengepulNotifikasi || '/pengepul/notifikasi'}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-neutral-700 hover:bg-neutral-100 transition-all"
                >
                  <div className="size-8 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center relative">
                    <Bell className="size-4" />
                    <span className="absolute top-0.5 right-0.5 size-2 rounded-full bg-red-500" />
                  </div>
                  Notifikasi
                </Link>
              </div>
            </nav>

            {/* Footer: Logout */}
            <div className="px-4 py-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => { setDrawerOpen(false); navigate('/'); }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all"
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
    </>
  );
}
