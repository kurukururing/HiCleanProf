import { useState } from 'react';
import { ArrowLeft, Menu, Search, Package, Clock, Layers, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';

export function PengepulDistribusiMaterialPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const shipments = [
    {
      id: 'MAT-529-19',
      company: 'PT. Maju Sejahtera',
      date: '18 Sep 2026, 14:00 WIB',
      eta: '20 September 2026',
      category: 'Kaca & botol',
      weight: '300kg',
      status: 'Sedang dikirim',
      filterType: 'Sedang diproses'
    },
    {
      id: 'MAT-412-08',
      company: 'PT Maharta Daur Plastik Indo',
      date: '19 Sep 2026, 09:30 WIB',
      eta: '21 September 2026',
      category: 'Plastik PET Bening',
      weight: '450kg',
      status: 'Sedang dikirim',
      filterType: 'Sedang diproses'
    },
    {
      id: 'MAT-301-77',
      company: 'PT Sinar Daur Ulang',
      date: '17 Sep 2026, 11:15 WIB',
      eta: '19 September 2026',
      category: 'Kardus & Kertas',
      weight: '600kg',
      status: 'Menunggu ditimbang',
      filterType: 'Menunggu ditimbang'
    },
    {
      id: 'MAT-215-90',
      company: 'CV Eco Plastik',
      date: '16 Sep 2026, 15:00 WIB',
      eta: '18 September 2026',
      category: 'Logam & Aluminium',
      weight: '280kg',
      status: 'Menunggu ditimbang',
      filterType: 'Menunggu ditimbang'
    }
  ];

  const filtered = shipments.filter((item) => {
    const matchesFilter = activeFilter === 'Semua' || item.filterType === activeFilter;
    const matchesSearch = item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-16">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulMaterial)}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>

          <h1 className="text-base font-extrabold text-neutral-900">Distribusi Material</h1>

          <Link
            to={ROUTES.pengepulDashboard}
            className="size-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          >
            <Menu className="size-4" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow mx-auto w-full max-w-md px-4 py-5 space-y-4">
        
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Cari nomor pengiriman / nama mitra..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-full bg-emerald-50/70 border border-emerald-100 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveFilter('Semua')}
            className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
              activeFilter === 'Semua'
                ? 'bg-brand-green text-ink shadow-sm'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>Semua</span>
            <span className={`size-4 rounded-full text-[10px] flex items-center justify-center ${
              activeFilter === 'Semua' ? 'bg-neutral-900 text-white' : 'bg-emerald-800 text-white'
            }`}>
              4
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('Sedang diproses')}
            className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
              activeFilter === 'Sedang diproses'
                ? 'bg-brand-green text-ink shadow-sm'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>Sedang diproses</span>
            <span className={`size-4 rounded-full text-[10px] flex items-center justify-center ${
              activeFilter === 'Sedang diproses' ? 'bg-neutral-900 text-white' : 'bg-emerald-800 text-white'
            }`}>
              2
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('Menunggu ditimbang')}
            className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
              activeFilter === 'Menunggu ditimbang'
                ? 'bg-brand-green text-ink shadow-sm'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>Menunggu ditimbang</span>
            <span className={`size-4 rounded-full text-[10px] flex items-center justify-center ${
              activeFilter === 'Menunggu ditimbang' ? 'bg-neutral-900 text-white' : 'bg-emerald-800 text-white'
            }`}>
              2
            </span>
          </button>
        </div>

        {/* List of Shipments */}
        <div className="space-y-3.5 pt-1">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-extrabold text-xs text-neutral-900">
                  #{item.id}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-brand-green animate-ping" />
                  {item.status}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
                    <Package className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-neutral-900">{item.company}</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">{item.date}</p>
                  </div>
                </div>
                <span className="text-xl font-extrabold text-neutral-900 shrink-0">
                  {item.weight}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-neutral-100 text-neutral-600">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-neutral-400 shrink-0" />
                  <span>Estimasi tiba: {item.eta}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="size-4 text-neutral-400 shrink-0" />
                  <span>Kategori : {item.category}</span>
                </div>
              </div>

              <Link
                to={ROUTES.pengepulMaterialDistribusiLacak.replace(':id', item.id)}
                className="w-full flex items-center justify-center py-3 rounded-2xl border border-brand-green text-brand-green text-xs font-extrabold hover:bg-emerald-50 transition-colors"
              >
                Lacak
              </Link>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-md px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>&copy; {siteConfig.year} Hi-Clean App. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-4">
            <Link to="/kebijakan-privasi" className="hover:text-neutral-900">Kebijakan Privasi</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

