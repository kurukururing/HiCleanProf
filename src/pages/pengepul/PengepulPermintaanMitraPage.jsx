import { useState } from 'react';
import { ArrowLeft, Menu, CheckCircle2, XCircle, Calendar, Scale, Layers } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';

export function PengepulPermintaanMitraPage() {
  const navigate = useNavigate();
  const [activeScope, setActiveScope] = useState('Dalam Kota'); // 'Dalam Kota' | 'Luar Kota'
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'PT. Green Earth',
      city: 'Surabaya',
      scope: 'Dalam Kota',
      status: 'Diproses',
      statusColor: 'bg-amber-100 text-amber-800',
      date: 'Sel, 19 Okt',
      volume: '3.000 kg',
      material: 'Plastik',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=80',
      initial: 'MD'
    },
    {
      id: 2,
      name: 'PT. Sinar Daur',
      city: 'Bandung',
      scope: 'Luar Kota',
      status: 'Menunggu',
      statusColor: 'bg-amber-100 text-amber-800',
      date: 'Sab, 14 Okt',
      volume: '1.800 kg',
      material: 'Kaleng',
      img: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=500&auto=format&fit=crop&q=80',
      initial: 'SD'
    },
    {
      id: 3,
      name: 'PT. Bintang Jaya',
      city: 'Jakarta',
      scope: 'Luar Kota',
      status: 'Diterima',
      statusColor: 'bg-amber-100 text-amber-800',
      date: 'Sen, 16 Okt',
      volume: '2.200 kg',
      material: 'Karton',
      img: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=500&auto=format&fit=crop&q=80',
      initial: 'SM'
    }
  ]);

  const handleDecline = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const filtered = requests.filter((r) => r.scope === activeScope);

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

          <h1 className="text-base font-extrabold text-neutral-900">Permintaan Mitra</h1>

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
        
        {/* Scope Filter Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveScope('Dalam Kota')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeScope === 'Dalam Kota'
                ? 'bg-brand-green text-ink shadow-sm'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            Dalam Kota
          </button>
          <button
            type="button"
            onClick={() => setActiveScope('Luar Kota')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeScope === 'Luar Kota'
                ? 'bg-brand-green text-ink shadow-sm'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            Luar Kota
          </button>
        </div>

        {/* Section Heading */}
        <h2 className="text-sm font-extrabold text-neutral-900">
          Daftar Permintaan Mitra
        </h2>

        {/* List of Requests */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 text-center text-xs text-neutral-500 border border-neutral-200">
              Tidak ada permintaan aktif pada kategori ini.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl bg-white overflow-hidden shadow-sm border border-neutral-200/80 space-y-4 hover:shadow-md transition-shadow"
              >
                {/* Photo Header with Status Badge */}
                <div className="relative h-44 w-full bg-neutral-100">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-3 left-3 bg-amber-100/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-amber-900 flex items-center gap-1.5 shadow-sm">
                    <span className="size-2 rounded-full bg-amber-500" />
                    <span>{item.status}</span>
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-4">
                  {/* Factory Name & City */}
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                      {item.initial}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-neutral-900">{item.name}</h3>
                      <p className="text-xs text-neutral-400">{item.city}</p>
                    </div>
                  </div>

                  {/* 3 Metric Pills */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100/80">
                      <span className="text-[10px] text-neutral-500 block">Tanggal</span>
                      <p className="font-extrabold text-neutral-900 mt-0.5">{item.date}</p>
                    </div>

                    <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100/80">
                      <span className="text-[10px] text-neutral-500 block">Volume</span>
                      <p className="font-extrabold text-neutral-900 mt-0.5">{item.volume}</p>
                    </div>

                    <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100/80">
                      <span className="text-[10px] text-neutral-500 block">Material</span>
                      <p className="font-extrabold text-neutral-900 mt-0.5">{item.material}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => handleDecline(item.id)}
                      className="flex-1 py-3 rounded-2xl bg-white border border-neutral-300 text-neutral-700 text-xs font-extrabold hover:bg-neutral-50 transition-colors"
                    >
                      Tolak
                    </button>
                    <Link
                      to={ROUTES.pengepulMaterialPermintaanTerima.replace(':id', item.id)}
                      className="flex-1 py-3 rounded-2xl bg-brand-green text-ink text-xs font-extrabold hover:bg-brand-green/90 transition-all shadow flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="size-4 text-ink" />
                      <span>Terima</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
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

