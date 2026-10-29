import { useState } from 'react';
import { Search, LayoutGrid, CheckCircle2, Clock, Truck, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PengepulNavbar } from '../../components/pengepul/PengepulNavbar';
import { ROUTES } from '../../routes';

export function PengepulVerifikasiPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const verifikasiList = [
    {
      id: '#MAT-529-19',
      name: 'Pak Budi Amirudin',
      address: 'Jl. Medokan Asri Barat No.14, Gunung Anyar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      material: 'Botol plastik PET & Kardus bekas makanan',
      weight: '10.6 kg',
      status: 'Sedang dikirim',
      statusType: 'shipping',
      actionType: 'verifikasi',
      actionLabel: 'Verifikasi'
    },
    {
      id: '#MAT-530-20',
      name: 'Ibu Siti Nurhaliza',
      address: 'Jl. Kebon Jeruk No.45, Jakarta Barat',
      avatar: null,
      material: 'Kardus bekas elektronik',
      weight: '15.2 kg',
      status: 'Selesai',
      statusType: 'completed',
      actionType: 'selesai',
      actionLabel: 'Selesai'
    },
    {
      id: '#MAT-531-21',
      name: 'Bapak Andi Setiawan',
      address: 'Jl. Raya Cokroaminoto No.32, Surabaya',
      avatar: null,
      material: 'Botol kaca & Kertas koran',
      weight: '8.4 kg',
      status: 'Dalam proses',
      statusType: 'process',
      actionType: 'menunggu',
      actionLabel: 'Menunggu verifikasi'
    },
    {
      id: '#MAT-532-22',
      name: 'Ibu Rina Marlina',
      address: 'Jl. Kutisari Indah Barat No.18, Surabaya',
      avatar: null,
      material: 'Kaleng aluminium & Botol PET',
      weight: '6.5 kg',
      status: 'Menunggu ditimbang',
      statusType: 'waiting',
      actionType: 'verifikasi',
      actionLabel: 'Verifikasi'
    }
  ];

  const filtered = verifikasiList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === 'Semua') return true;
    if (activeTab === 'Sedang diproses') return item.status === 'Sedang dikirim' || item.status === 'Dalam proses';
    if (activeTab === 'Menunggu ditimbang') return item.status === 'Menunggu ditimbang' || item.status === 'Sedang dikirim';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#1a1d1b] flex flex-col font-sans">
      <PengepulNavbar activeName="Verifikasi" />

      <main className="flex-grow mx-auto w-full max-w-md px-4 py-5 space-y-4 pb-28 sm:pb-12">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 font-heading">
            Verifikasi Setoran
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Daftar setoran warga yang perlu diverifikasi fisik dan bobot
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 size-4.5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nomor ID atau nama warga..."
            className="w-full bg-white border border-neutral-200/90 text-neutral-800 placeholder-neutral-400 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm font-medium shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-green/30 transition-all"
          >
          </input>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { label: 'Semua', count: 4 },
            { label: 'Sedang diproses', count: 2 },
            { label: 'Menunggu ditimbang', count: 2 }
          ].map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.label)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                  isActive
                    ? 'bg-brand-green text-ink shadow-sm'
                    : 'bg-[#E5F8ED] text-emerald-900 hover:bg-emerald-100'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`size-4.5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                  isActive ? 'bg-neutral-900 text-white' : 'bg-white/80 text-emerald-900'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards List */}
        <div className="space-y-4 pt-1">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-3.5 hover:shadow-md transition-shadow"
            >
              {/* Header with ID and Status Badge */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-neutral-900 font-mono tracking-tight">
                  {item.id}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#E8F8EE] text-emerald-800 border border-emerald-200/50">
                  <span className="size-1.5 rounded-full bg-brand-green" />
                  {item.status}
                </span>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="size-12 rounded-full object-cover border border-neutral-200"
                  />
                ) : (
                  <div className="size-12 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-neutral-600 text-sm">
                    {item.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-neutral-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                    {item.address}
                  </p>
                </div>
              </div>

              {/* Material Box */}
              <div className="bg-[#EAF8F0] p-3.5 rounded-2xl flex items-center justify-between gap-3 border border-emerald-100/60">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-8 rounded-xl bg-white/80 text-brand-green flex items-center justify-center shrink-0">
                    <LayoutGrid className="size-4" />
                  </div>
                  <p className="text-xs font-semibold text-neutral-800 leading-snug line-clamp-2">
                    {item.material}
                  </p>
                </div>
                <span className="text-sm sm:text-base font-extrabold text-neutral-900 shrink-0 font-heading">
                  {item.weight}
                </span>
              </div>

              {/* Action Button */}
              {item.actionType === 'verifikasi' ? (
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.pengepulVerifikasiLangkah1 || '/pengepul/verifikasi/langkah-1')}
                  className="w-full py-3 rounded-2xl bg-brand-green text-ink text-xs sm:text-sm font-extrabold hover:brightness-105 transition-all shadow-sm active:scale-[0.98]"
                >
                  {item.actionLabel}
                </button>
              ) : item.actionType === 'selesai' ? (
                <button
                  type="button"
                  disabled
                  className="w-full py-3 rounded-2xl border border-neutral-200 text-neutral-400 text-xs sm:text-sm font-bold cursor-not-allowed bg-neutral-100"
                >
                  {item.actionLabel}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.pengepulVerifikasiLangkah1 || '/pengepul/verifikasi/langkah-1')}
                  className="w-full py-3 rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800 text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-[0.98]"
                >
                  {item.actionLabel}
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-6 text-neutral-500 text-xs mt-auto">
        <div className="mx-auto max-w-md px-4 flex flex-col items-center justify-center gap-2 text-center">
          <p>&copy; 2026 Hi-Clean App. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-4 text-neutral-400">
            <Link to="/kebijakan-privasi" className="hover:text-neutral-700">Kebijakan Privasi</Link>
            <span>&bull;</span>
            <Link to="/syarat-ketentuan" className="hover:text-neutral-700">Syarat Ketentuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
