import { useState } from 'react';
import { 
  ArrowRight, Wallet, Sparkles, 
  Clock, History, Calendar, Filter
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';
import { WargaNavbar } from '../../components/layout/WargaNavbar';

export function RedemptionHistoryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Semua');

  const historyList = [
    { type: 'Transportasi', title: '1x Tiket Feeder Wira Wiri', date: '20 Sep 2026, 14:10 WIB', pts: '-250pts', status: 'Siap Digunakan', validUntil: '21 Sep 2026, 14:10 WIB' },
    { type: 'E-Wallet', title: 'Saldo Go-Pay Rp25.000', date: '20 Sep 2026, 14:10 WIB', pts: '-500pts', status: 'Berhasil Masuk', validUntil: null },
    { type: 'Transportasi', title: '1x Tiket Bus Semanggi', date: '20 Sep 2026, 14:10 WIB', pts: '-300pts', status: 'Sudah Dipakai', validUntil: null }
  ];

  const filtered = activeTab === 'Semua' 
    ? historyList 
    : historyList.filter(h => h.type.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <WargaNavbar activeName="Penukaran" />

      <main className="flex-grow mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8 space-y-6 pb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 font-heading">Riwayat Penukaran</h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { label: 'Semua', count: 2 },
              { label: 'Transportasi', count: 3 },
              { label: 'E-Wallet', count: 1 }
            ].map(tab => {
              const active = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                    active ? 'bg-neutral-900 text-white shadow' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {tab.label}
                  <span className={`size-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    active ? 'bg-brand-green text-ink' : 'bg-neutral-200 text-neutral-800'
                  }`}>
                    {tab.count}
                  </span>
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
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">September</h2>

          {filtered.map((item, idx) => {
            const isTicket = item.type === 'Transportasi';
            return (
              <div key={idx} className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200/85 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                      <Wallet className="size-6" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-neutral-900">{item.title}</p>
                      <p className="text-xs text-neutral-500">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-red-600">{item.pts}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold mt-1 ${
                      item.status === 'Siap Digunakan' ? 'bg-brand-green/10 text-brand-green' : item.status === 'Berhasil Masuk' ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                {item.validUntil && (
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                    <span className="text-xs text-neutral-500 flex items-center gap-1.5">
                      <Clock className="size-3.5 text-amber-500" /> Berlaku s/d: <strong className="text-neutral-800">{item.validUntil}</strong>
                    </span>
                    <Link
                      to="/dashboard/penukaran/berhasil-tiket"
                      className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                    >
                      Lihat Kode QR
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
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
