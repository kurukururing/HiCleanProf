import { useState } from 'react';
import { 
  User, MapPin, Package, Globe, Clock, Settings, 
  LogOut, ChevronRight, Star, Recycle, Scale 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PengepulNavbar } from '../../components/pengepul/PengepulNavbar';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { siteConfig } from '../../config/siteConfig';
import { ROUTES } from '../../routes';

export function PengepulProfilePage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { label: 'Data diri', icon: User, path: ROUTES.pengepulDataDiri },
    { label: 'Area layanan', icon: MapPin, path: ROUTES.pengepulAreaLayanan },
    { label: 'Material', icon: Package, path: ROUTES.pengepulAturPenerimaan },
    { label: 'Bahasa', icon: Globe, path: ROUTES.pengepulBahasa },
    { label: 'Jam Operasional', icon: Clock, path: ROUTES.pengepulJamOperasional },
    { label: 'Pengaturan Umum', icon: Settings, path: ROUTES.pengepulPengaturan }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-16">
      <PengepulNavbar activeName="Profil" />

      <main className="flex-grow mx-auto w-full max-w-md px-4 py-6 space-y-5">
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
          Akun Saya
        </h1>

        {/* Profile Card */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 flex items-center gap-4">
          <div className="relative shrink-0">
            <img 
              src="/profil_pengepul/data-diri.jpg" 
              alt="Alexander Wijayanto" 
              className="size-16 rounded-full object-cover border-2 border-emerald-200 shadow-sm"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80';
              }} 
            />
          </div>

          <div className="space-y-1 min-w-0 flex-grow">
            <span className="inline-block px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200/60">
              Terverifikasi
            </span>
            <h2 className="text-base font-extrabold text-neutral-900 truncate">
              Bank Sampah Maju Jaya
            </h2>
            <p className="text-xs text-neutral-500 truncate">
              Alexander Wijayanto - Penanggung Jawab
            </p>
            <p className="text-xs font-mono font-medium text-neutral-600">
              +62-821-7567-7656
            </p>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-3">
          {/* Total Setoran */}
          <div className="rounded-3xl bg-white p-4 shadow-sm border border-neutral-200/80 text-center space-y-1">
            <div className="size-10 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center mx-auto">
              <Recycle className="size-5 text-emerald-600" />
            </div>
            <p className="text-[11px] text-neutral-400 font-medium">Total Setoran</p>
            <p className="text-lg font-extrabold text-neutral-900">102</p>
          </div>

          {/* Total Sampah */}
          <div className="rounded-3xl bg-white p-4 shadow-sm border border-neutral-200/80 text-center space-y-1">
            <div className="size-10 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center mx-auto">
              <Scale className="size-5 text-emerald-600" />
            </div>
            <p className="text-[11px] text-neutral-400 font-medium">Total Sampah</p>
            <p className="text-lg font-extrabold text-neutral-900">1 ton</p>
          </div>

          {/* Skor Mitra */}
          <div className="rounded-3xl bg-white p-4 shadow-sm border border-neutral-200/80 text-center space-y-1">
            <div className="size-10 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center mx-auto">
              <Star className="size-5 text-emerald-600" />
            </div>
            <p className="text-[11px] text-neutral-400 font-medium">Skor Mitra</p>
            <p className="text-lg font-extrabold text-neutral-900">4.2</p>
          </div>
        </div>

        {/* Menu Navigation Block */}
        <div className="rounded-3xl bg-white shadow-sm border border-neutral-200/80 divide-y divide-neutral-100 overflow-hidden">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                to={item.path}
                className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="size-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-600 group-hover:text-brand-green transition-colors">
                    <Icon className="size-4" />
                  </div>
                  <span className="text-sm font-bold text-neutral-900">{item.label}</span>
                </div>
                <ChevronRight className="size-4 text-neutral-400 group-hover:text-neutral-700 group-hover:translate-x-0.5 transition-all" />
              </Link>
            );
          })}
        </div>

        {/* Keluar Button */}
        <button
          type="button"
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center justify-between p-4 rounded-3xl bg-red-100/70 border border-red-200 text-red-600 hover:bg-red-100 transition-colors font-extrabold text-sm shadow-sm cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-red-200/80 text-red-600 flex items-center justify-center">
              <LogOut className="size-4" />
            </div>
            <span>Keluar</span>
          </div>
          <ChevronRight className="size-4 text-red-400" />
        </button>
      </main>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false);
          navigate(ROUTES.home);
        }}
        title="Keluar dari Akun Mitra?"
        description="Apakah Anda yakin ingin keluar dari sesi akun mitra pengepul? Anda dapat masuk kembali kapan saja."
        confirmText="Ya, Keluar"
        cancelText="Batal"
        type="danger"
      />

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-md px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>&copy; {siteConfig.year} Hi-Clean App. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-4">
            <Link to="/kebijakan-privasi" className="hover:text-neutral-900">Kebijakan Privasi</Link>
            <span>&bull;</span>
            <Link to="/syarat-ketentuan" className="hover:text-neutral-900">Syarat Ketentuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
