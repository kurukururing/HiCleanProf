import { useState } from 'react';
import { 
  ArrowRight, Sparkles, Clock, Calendar, Filter,
  Trash2, ChevronRight, AlertCircle, CheckCircle2, XCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { WargaNavbar } from '../../components/layout/WargaNavbar';
import { siteConfig } from '../../config/siteConfig';

export function HistoryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Semua');

  const historyItems = [
    {
      id: '#HC-78654',
      date: '20 Sep 2026 - 10:00 WIB',
      status: 'Diterima Penuh',
      statusType: 'success',
      tags: ['Kaleng & Logam Aluminium', 'Plastik Botol'],
      weight: '4.5 kg',
      estimateWeight: 'Estimasi 6 kg'
    },
    {
      id: '#HC-78664',
      date: '20 Sep 2026 - 10:00 WIB',
      status: 'Diterima Penuh',
      statusType: 'success',
      tags: ['Kardus', 'Plastik Botol'],
      weight: '6 kg',
      estimateWeight: 'Estimasi 6 kg'
    },
    {
      id: '#HC-78647',
      date: '15 Sep 2026 - 14:00 WIB',
      status: 'Diterima Sebagian',
      statusType: 'warning',
      tags: ['Plastik Botol'],
      weight: '4.5 kg',
      estimateWeight: 'Estimasi 6 kg',
      note: 'Catatan Petugas\n2.0 kg material tercampur basah dan tercampur dengan minyak makanan, sehingga tidak dapat diproses oleh pihak mitra daur ulang'
    },
    {
      id: '#HC-787413',
      date: '5 Sep 2026 - 17:00 WIB',
      status: 'Ditolak',
      statusType: 'danger',
      tags: ['Plastik Botol', 'Kaleng'],
      weight: '4.5 kg',
      estimateWeight: 'Estimasi 6 kg',
      note: 'Catatan Penolakan\nKontaminasi minyak pada botol dan kaleng sangat banyak dan tidak bisa ditoleran. Semuanya masih belum dibilas dengan benar'
    }
  ];

  const filtered = activeTab === 'Semua' 
    ? historyItems 
    : activeTab === 'Diterima Penuh'
      ? historyItems.filter(i => i.status === 'Diterima Penuh')
      : activeTab === 'Diterima Sebagian'
        ? historyItems.filter(i => i.status === 'Diterima Sebagian')
        : historyItems.filter(i => i.status === 'Ditolak');

  const tabOptions = [
    { label: 'Semua', count: historyItems.length },
    { label: 'Diterima Penuh', count: historyItems.filter(i => i.status === 'Diterima Penuh').length },
    { label: 'Diterima Sebagian', count: historyItems.filter(i => i.status === 'Diterima Sebagian').length },
    { label: 'Ditolak', count: historyItems.filter(i => i.status === 'Ditolak').length }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <WargaNavbar activeName="Riwayat" />

      <main className="flex-grow mx-auto w-full max-w-4xl px-4 py-5 sm:px-6 lg:px-8 space-y-5 pb-28 sm:pb-8">
        
        {/* Header Title */}
        <div className="pt-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900">
            Riwayat Setoran
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Jejak terverifikasi dari rumah Anda hingga pusat daur ulang mitra
          </p>
        </div>

        {/* Top Summary Dark Card */}
        <div className="rounded-3xl bg-neutral-900 text-white p-5 sm:p-7 shadow-xl relative overflow-hidden border border-neutral-800 space-y-4">
          <div className="absolute -right-8 -bottom-8 size-48 rounded-full bg-brand-green/15 blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold">Ringkasan Kontribusi</h2>
            <span className="text-[10px] font-bold bg-white/10 text-brand-green px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Terverifikasi
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-[11px] text-neutral-400 font-medium">Total Sampah Terdaur</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                48.2 <span className="text-xs sm:text-sm font-normal text-brand-green">kg</span>
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-[11px] text-neutral-400 font-medium">Total Poin Diperoleh</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-brand-green mt-1">
                2.750 <span className="text-xs sm:text-sm font-normal text-white">pts</span>
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="space-y-2">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {tabOptions.map((tab) => {
              const active = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                    active 
                      ? 'bg-neutral-900 text-white shadow-xs' 
                      : 'bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`size-4.5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    active ? 'bg-brand-green text-ink' : 'bg-neutral-100 text-neutral-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Date & Filter Chips */}
          <div className="flex items-center gap-2 pt-0.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200/80 text-[11px] font-medium text-neutral-700 shadow-2xs">
              <Calendar className="size-3 text-neutral-400" />
              <span>Bulan September 2026</span>
            </div>
          </div>
        </div>

        {/* History Cards List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 text-center border border-neutral-200/80">
              <p className="text-sm font-bold text-neutral-700">Tidak ada riwayat untuk status ini</p>
              <p className="text-xs text-neutral-400 mt-1">Coba pilih tab filter lainnya</p>
            </div>
          ) : (
            filtered.map((item) => {
              const isSuccess = item.statusType === 'success';
              const isWarning = item.statusType === 'warning';
              const isDanger = item.statusType === 'danger';

              return (
                <div key={item.id} className="rounded-3xl bg-white p-4 sm:p-5 shadow-xs border border-neutral-200/80 hover:shadow-md transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500 font-medium flex items-center gap-1">
                      <Clock className="size-3 text-neutral-400" /> {item.date}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      isSuccess 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200/60' 
                        : isWarning 
                          ? 'bg-amber-50 text-amber-800 border-amber-200/60' 
                          : 'bg-red-50 text-red-800 border-red-200/60'
                    }`}>
                      <span className={`size-1.5 rounded-full ${
                        isSuccess ? 'bg-emerald-500' : isWarning ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                      {item.status}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-xs sm:text-sm font-bold text-neutral-900 font-mono">ID: {item.id}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tg, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-medium">
                          &bull; {tg}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Weight Box */}
                  <div className="bg-neutral-50 p-3 rounded-2xl flex items-center justify-between border border-neutral-100">
                    <div className="flex items-center gap-2.5">
                      <div className="size-9 rounded-xl bg-white text-neutral-800 flex items-center justify-center font-bold shadow-2xs">
                        <Trash2 className="size-4 text-brand-green" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-neutral-900">{item.weight}</p>
                        <p className="text-[10px] text-neutral-500">{item.estimateWeight}</p>
                      </div>
                    </div>

                    <Link 
                      to={`/dashboard/riwayat/detail/${encodeURIComponent(item.id)}`}
                      state={{ item }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 hover:text-brand-green bg-white px-3 py-1.5 rounded-xl shadow-2xs border border-neutral-200/80 transition-colors"
                    >
                      Detail <ChevronRight className="size-3.5" />
                    </Link>
                  </div>

                  {item.note && (
                    <div className={`p-3 rounded-2xl border text-[11px] leading-relaxed ${
                      isWarning ? 'bg-amber-50/70 border-amber-200 text-amber-900' : 'bg-red-50/70 border-red-200 text-red-900'
                    }`}>
                      <div className="flex items-start gap-1.5">
                        <AlertCircle className="size-3.5 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">{item.note.split('\n')[0]}</p>
                          <p className="opacity-90 mt-0.5">{item.note.split('\n')[1]}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </main>

      <footer className="hidden sm:block bg-white border-t border-neutral-200 py-6 text-neutral-500 text-xs mt-auto">
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
