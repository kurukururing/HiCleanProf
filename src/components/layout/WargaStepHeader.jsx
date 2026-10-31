import { useState } from 'react';
import { ChevronLeft, Menu, X, Home, Truck, History, Gift, User, Bell, LogOut, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { ConfirmationModal } from '../ui/ConfirmationModal';

export function WargaStepHeader({ 
  backTo, 
  stepBadge = 'Lokasi', 
  stepNumber = 1, 
  totalSteps = 6,
  title
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  const navLinks = [
    { name: 'Beranda', path: ROUTES.dashboard, icon: Home },
    { name: 'Setoran', path: ROUTES.setoranMain, icon: Truck },
    { name: 'Riwayat', path: ROUTES.history, icon: History },
    { name: 'Penukaran', path: ROUTES.redemption, icon: Gift },
    { name: 'Profil', path: ROUTES.profile, icon: User }
  ];

  return (
    <>
      {/* Top Floating App Bar */}
      <header className="sticky top-0 z-30 bg-white border-b-2 border-neutral-200 shadow-2xs px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-md items-center justify-between">
          {/* Back Button (Black Circle) */}
          <button
            type="button"
            onClick={handleBack}
            aria-label="Kembali"
            className="flex items-center justify-center size-10 rounded-2xl bg-neutral-100 border border-neutral-300 text-neutral-900 hover:bg-neutral-200 transition-transform active:scale-95 shadow-2xs cursor-pointer font-bold"
          >
            <ChevronLeft className="size-6 stroke-[2.5]" />
          </button>

          {/* Optional Center Step Title */}
          {title && (
            <h1 className="text-sm font-extrabold text-neutral-900 truncate px-2 font-heading">
              {title}
            </h1>
          )}

          {/* Burger Button */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Menu"
            className="flex items-center justify-center size-10 rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800 transition-transform active:scale-95 shadow-md cursor-pointer"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* Dynamic Progress Card */}
      <div className="mx-auto w-full max-w-md px-4 pt-1 pb-3">
        <div className="rounded-3xl bg-white p-4 sm:p-5 shadow-xs border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-700">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200/60 text-[11px] font-extrabold flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-brand-green" />
              {stepBadge}
            </span>
            <span className="text-xs font-extrabold text-neutral-800 font-mono">
              Langkah {stepNumber} dari {totalSteps}
            </span>
          </div>

          {/* Adaptive Progress Bar Grid based on totalSteps */}
          <div 
            className="grid gap-1.5 h-1.5"
            style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`rounded-full h-full transition-all duration-300 ${
                  idx < stepNumber ? 'bg-brand-green' : 'bg-neutral-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-200 z-10">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 bg-neutral-50">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-brand-green text-ink flex items-center justify-center font-bold text-base shadow">
                  B
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900">Budiman Sekti</p>
                  <p className="text-[11px] text-neutral-500">Warga Terverifikasi</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-center size-8 rounded-full bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-500 transition-colors cursor-pointer"
              >
                <X className="size-4.5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-grow px-4 py-4 space-y-1 overflow-y-auto">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2 pb-1">
                Menu Utama
              </p>
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-neutral-700 hover:bg-neutral-100 transition-all active:scale-[0.98]"
                  >
                    <div className="size-8 rounded-xl flex items-center justify-center bg-neutral-100 text-neutral-600">
                      <Icon className="size-4" />
                    </div>
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-neutral-100 space-y-1">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2 pb-1">
                  Lainnya
                </p>
                <Link
                  to={ROUTES.notifications}
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

            {/* Logout Footer */}
            <div className="px-4 py-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  setShowLogoutModal(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all cursor-pointer"
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

      {/* Logout Modal */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false);
          navigate('/');
        }}
        title="Keluar dari Akun?"
        description="Apakah Anda yakin ingin keluar dari sesi akun Hi-Clean?"
        confirmText="Ya, Keluar"
        cancelText="Batal"
        type="danger"
      />
    </>
  );
}
