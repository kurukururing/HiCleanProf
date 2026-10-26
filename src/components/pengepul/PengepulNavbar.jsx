import { useState } from 'react';
import { Bell, Menu, X, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function PengepulNavbar({ activeName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: 'Beranda', path: '/pengepul' },
    { name: 'Rute', path: '/pengepul/rute' },
    { name: 'Verifikasi', path: '/pengepul/verifikasi' },
    { name: 'Material', path: '/pengepul/material' },
    { name: 'Profil', path: '/pengepul/profil' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/pengepul" className="flex items-center gap-2">
          <img src="/logoDesc.png" alt="Hi-Clean" className="h-9 w-auto" />
          <span className="px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-bold">MITRA</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((lnk) => (
            <Link
              key={lnk.name}
              to={lnk.path}
              className={`text-sm font-medium transition-colors ${
                activeName === lnk.name ? 'text-brand-green font-semibold' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {lnk.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/pengepul/notifikasi" aria-label="Notifikasi" className="relative rounded-full p-2.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors inline-flex items-center justify-center">
            <Bell className="size-5" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500 ring-2 ring-white" />
          </Link>

          <div className="relative">
            <button type="button" onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="flex items-center gap-2 rounded-full p-1 pl-2.5 bg-neutral-100 hover:bg-neutral-200 transition-colors border border-neutral-200">
              <span className="text-xs font-semibold hidden sm:inline-block max-w-[140px] truncate">Bank Sampah Maju Jaya</span>
              <div className="size-8 rounded-full bg-brand-green text-ink flex items-center justify-center font-bold text-sm">B</div>
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl border border-neutral-100 z-50">
                <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                  <p className="text-xs font-bold text-neutral-900">Bank Sampah Maju Jaya</p>
                  <p className="text-[11px] text-neutral-500 truncate">Alexander Wijayanto</p>
                </div>
                <Link to="/pengepul/profil" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors">
                  <User className="size-4 text-neutral-500" /> Profil Mitra
                </Link>
                <button type="button" onClick={() => navigate('/')} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1">
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
          {links.map((lnk) => (
            <Link
              key={lnk.name}
              to={lnk.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-sm font-medium ${
                activeName === lnk.name ? 'text-brand-green font-semibold' : 'text-neutral-700'
              }`}
            >
              {lnk.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
