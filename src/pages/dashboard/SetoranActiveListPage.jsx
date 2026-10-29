import { useState } from 'react';
import { ArrowLeft, Clock, MapPin, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import { ROUTES } from '../../routes';

export function SetoranActiveListPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Semua');

  const activePickups = [
    {
      id: '#HC-78664',
      date: '20 Sep 2026 - 10:00 WIB',
      status: 'Menuju lokasi',
      statusColor: 'bg-emerald-50 text-emerald-700',
      categories: ['Kardus', 'Plastik Botol'],
      driver: 'Pak Budi Amirudin',
      vehicle: 'Motor Roda Tiga Eco',
      rating: '4.9 (30 Setoran)'
    },
    {
      id: '#HC-78621',
      date: '22 Sep 2026 - 14:00 WIB',
      status: 'Menunggu konfirmasi',
      statusColor: 'bg-amber-50 text-amber-700',
      categories: ['Kaleng Aluminium', 'Kaca'],
      driver: 'Pak Rudi Santoso',
      vehicle: 'Pickup Box HiClean',
      rating: '4.8 (14 Setoran)'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button type="button" onClick={() => navigate(-1)} className="size-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors text-neutral-800">
            <ArrowLeft className="size-5" />
          </button>
          
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-8 w-auto" />
          </Link>

          <Link to="/dashboard" className="text-xs font-semibold text-brand-green hover:underline">
            Beranda
          </Link>
        </div>
      </header>

      <main className="flex-grow mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8 space-y-6 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 font-heading">Setoran Aktif Berjalan</h1>
            <p className="text-xs text-neutral-500 mt-1">Daftar pesanan penjemputan sampah yang sedang aktif atau dalam proses</p>
          </div>

          <div className="flex items-center gap-2">
            {['Semua', 'Dalam Perjalanan', 'Menunggu'].map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    active ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 border border-neutral-200'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          {activePickups.map((item, idx) => (
            <div key={idx} className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-medium flex items-center gap-1.5">
                  <Clock className="size-3.5" /> {item.date}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${item.statusColor}`}>
                  <span className="size-2 rounded-full bg-current animate-pulse" />
                  {item.status}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-base font-bold text-neutral-900 font-mono">ID : {item.id}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.categories.map((c, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-medium">
                      &bull; {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-100/80 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-neutral-200/60">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
                    alt="Kurir" 
                    className="size-12 rounded-full object-cover border shrink-0" 
                  />
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{item.driver}</p>
                    <p className="text-[11px] text-neutral-500">{item.vehicle}</p>
                    <p className="text-[11px] text-brand-green font-semibold mt-0.5">★ {item.rating} - Terverifikasi</p>
                  </div>
                </div>

                <Link 
                  to={ROUTES.activePickup}
                  className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-extrabold text-white bg-neutral-900 hover:bg-neutral-800 px-6 py-3.5 rounded-2xl shadow transition-colors active:scale-95"
                >
                  Lacak Detail &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>&copy; {siteConfig.year} Hi-Clean App. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-6">
            <Link to="/kebijakan-privasi" className="hover:text-neutral-900 transition-colors">Kebijakan Privasi</Link>
            <span>&bull;</span>
            <Link to="/syarat-ketentuan" className="hover:text-neutral-900 transition-colors">Syarat Ketentuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
