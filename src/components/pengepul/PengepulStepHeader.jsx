import { useState } from 'react';
import { ChevronLeft, Menu, X, Home, Navigation, ShieldCheck, Layers, User, Bell, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { ConfirmationModal } from '../ui/ConfirmationModal';

export function PengepulStepHeader({ backTo, title }) {
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

  const links = [
    { name: 'Beranda', path: ROUTES.pengepulDashboard || '/pengepul', icon: Home },
    { name: 'Rute', path: ROUTES.pengepulRoute || '/pengepul/rute', icon: Navigation },
    { name: 'Verifikasi', path: ROUTES.pengepulVerifikasi || '/pengepul/verifikasi', icon: ShieldCheck },
    { name: 'Material', path: ROUTES.pengepulMaterial || '/pengepul/material', icon: Layers },
    { name: 'Profil', path: ROUTES.pengepulProfile || '/pengepul/profil', icon: User }
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#F4F4F6]/90 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-md items-center justify-between">
          {/* Back Button (Green Circle) */}
          <button
            type="button"
            onClick={handleBack}
            aria-label="Kembali"
            className="flex items-center justify-center size-10 rounded-full bg-brand-green text-ink hover:brightness-105 transition-transform active:scale-95 shadow-sm cursor-pointer"
          >
            <ChevronLeft className="size-6 stroke-[2.5]" />
          </button>

          {title && (
            <h1 className="text-sm font-extrabold text-neutral-900 truncate px-2 font-heading">
              {title}
            </h1>
          )}

          {/* Burger Button (White Circle) */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Menu"
            className="flex items-center justify-center size-10 rounded-full bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-100 transition-transform active:scale-95 shadow-2xs"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
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

            <nav className="flex-grow px-4 py-4 space-y-1 overflow-y-auto">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2 pb-1">
                Menu Mitra
              </p>
              {links.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-neutral-700 hover:bg-neutral-100 transition-all"
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

            <div className="px-4 py-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  setShowLogoutModal(true);
                }}
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

