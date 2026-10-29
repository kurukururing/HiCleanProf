import { useState } from 'react';
import { 
  ArrowRight, Wallet, Sparkles, 
  Clock, History, Calendar, Filter
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';
import { WargaNavbar } from '../../components/layout/WargaNavbar';

export function PointsHistoryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Semua');

  const pointsList = [
    { title: 'Saldo E-Wallet Go-Pay', date: '20 Sep 2026, 14:10 WIB', pts: '-250pts', type: 'Keluar' },
    { title: 'Saldo E-Wallet OVO', date: '20 Sep 2026, 14:10 WIB', pts: '-300pts', type: 'Keluar' },
    { title: 'Saldo E-Wallet DANA', date: '20 Sep 2026, 14:10 WIB', pts: '-150pts', type: 'Keluar' },
    { title: 'Saldo E-Wallet DANA', date: '20 Sep 2026, 14:10 WIB', pts: '+150pts', type: 'Masuk' },
    { title: 'Saldo E-Wallet DANA', date: '20 Sep 2026, 14:10 WIB', pts: '+150pts', type: 'Masuk' }
  ];

  const filtered = activeTab === 'Semua' 
    ? pointsList 
    : pointsList.filter(p => p.type.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <WargaNavbar activeName="Penukaran" />

      <main className="flex-grow mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8 space-y-6 pb-28 sm:pb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 font-heading">Riwayat Poin</h1>

        <div className="rounded-3xl bg-neutral-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6">
          <div className="absolute -right-10 -bottom-10 size-48 rounded-full bg-brand-green/10 blur-2xl pointer-events-none" />
          
          <div>
            <h2 className="text-lg font-bold">Total Poin Terkumpul</h2>
            <p className="text-xs text-neutral-400 mt-1">Diperbarui otomatis setiap setoran selesai</p>
          </div>

          <p className="text-4xl sm:text-5xl font-extrabold text-white">1.430 <span className="text-lg font-normal text-brand-green">pts</span></p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-[11px] text-neutral-400 font-medium">Poin Masuk</p>
              <p className="text-xl font-bold text-brand-green mt-0.5">+1.250 pts</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">14x Setoran & Bonus</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-[11px] text-neutral-400 font-medium">Poin Keluar</p>
              <p className="text-xl font-bold text-red-400 mt-0.5">-180 pts</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Tiket & E-Wallet</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['Semua', 'Poin Masuk', 'Poin Keluar'].map(tab => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                    active ? 'bg-neutral-900 text-white shadow' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-700">
              <Calendar className="size-3.5 text-neutral-500" /> September 2026
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">September 2026</h2>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
            {filtered.map((item, idx) => {
              const isMasuk = item.type === 'Masuk';
              return (
                <div key={idx} className={`flex items-center justify-between ${idx > 0 ? 'pt-4 border-t border-neutral-100' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                      <Wallet className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900">{item.title}</p>
                      <p className="text-[11px] text-neutral-500">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${isMasuk ? 'text-brand-green' : 'text-red-600'}`}>{item.pts}</p>
                    <span className="text-[10px] text-neutral-400">{item.type}</span>
                  </div>
                </div>
              );
            })}
          </div>
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
