import { useState } from 'react';
import { 
  ArrowRight, Wallet, Sparkles, ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { WargaNavbar } from '../../components/layout/WargaNavbar';
import { siteConfig } from '../../config/siteConfig';

export function RedemptionPage() {
  const navigate = useNavigate();
  const [activeCategoryTab, setActiveCategoryTab] = useState('Semua');

  const historyList = [
    { title: 'Saldo E-Wallet Go-Pay', desc: 'Tukarkan poin menjadi saldo Go-Pay', pts: '-250pts', status: 'Berhasil' },
    { title: 'Saldo E-Wallet OVO', desc: 'Tukarkan poin menjadi saldo OVO', pts: '-300pts', status: 'Berhasil' },
    { title: 'Saldo E-Wallet DANA', desc: 'Tukarkan poin menjadi saldo DANA', pts: '-150pts', status: 'Berhasil' }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <WargaNavbar activeName="Penukaran" />

      <main className="flex-grow mx-auto w-full max-w-4xl px-4 py-5 sm:px-6 lg:px-8 space-y-5 pb-8">
        
        {/* Header */}
        <div className="pt-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900">
            Penukaran Poin
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Tukar poin reward menjadi saldo atau tiket perjalanan
          </p>
        </div>

        {/* Total Poin Card */}
        <div className="rounded-3xl bg-neutral-900 text-white p-5 sm:p-7 shadow-xl relative overflow-hidden border border-neutral-800 space-y-4">
          <div className="absolute -right-8 -bottom-8 size-48 rounded-full bg-brand-green/15 blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-xs font-semibold text-neutral-300">Total Poin Kamu</span>
            </div>
            <Link
              to={ROUTES.pointsHistory}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all"
            >
              Riwayat <ChevronRight className="size-3" />
            </Link>
          </div>

          <div>
            <p className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              1.430 <span className="text-base sm:text-lg font-normal text-brand-green">pts</span>
            </p>
            <p className="text-[11px] text-neutral-400 mt-1">Diperbarui otomatis setiap setoran selesai</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 p-3 sm:p-4 rounded-2xl border border-white/10">
              <p className="text-[11px] text-neutral-400">Bisa Ditukar</p>
              <p className="text-lg sm:text-xl font-bold text-white mt-0.5">1.250 pts</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Siap diklaim sekarang</p>
            </div>
            <div className="bg-white/5 p-3 sm:p-4 rounded-2xl border border-white/10">
              <p className="text-[11px] text-neutral-400">Tertahan</p>
              <p className="text-lg sm:text-xl font-bold text-amber-400 mt-0.5">180 pts</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Dalam proses verifikasi</p>
            </div>
          </div>
        </div>

        {/* Pilih Kategori Penukaran */}
        <div className="space-y-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">Pilih Kategori Penukaran</h2>
            <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">Pilih jenis reward sesuai kebutuhan Anda</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* E-Wallet Card */}
            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-xs border border-neutral-200/80 hover:border-brand-green transition-all flex flex-col justify-between">
              <div>
                <div className="size-10 sm:size-11 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-3 sm:mb-4">
                  <Wallet className="size-5 sm:size-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900">Saldo E-Wallet</h3>
                <p className="text-[11px] sm:text-xs text-neutral-500 mt-1">Gopay, Dana, OVO, dan ShopeePay</p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Mulai dari <strong className="text-neutral-900">500 pts</strong>
                </span>
                <Link
                  to={ROUTES.redemptionWallet}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline"
                >
                  Tukar <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>

            {/* Tiket Bus Card */}
            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-xs border border-neutral-200/80 hover:border-brand-green transition-all flex flex-col justify-between">
              <div>
                <div className="size-10 sm:size-11 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-3 sm:mb-4">
                  <Sparkles className="size-5 sm:size-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900">Tiket Bus</h3>
                <p className="text-[11px] sm:text-xs text-neutral-500 mt-1">WiraWiri & Trans Suroboyo Bus</p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Mulai dari <strong className="text-neutral-900">250 pts</strong>
                </span>
                <Link
                  to={ROUTES.redemptionTicket}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline"
                >
                  Tukar <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Rekomendasi Reward */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">Rekomendasi Reward</h2>
              <p className="text-[11px] sm:text-xs text-neutral-500">Reward populer pilihan pengguna</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['Semua', 'Transportasi', 'E-Wallet'].map((tab) => {
              const active = activeCategoryTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveCategoryTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                    active ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-100'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="space-y-2.5">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-3xl bg-white p-4 sm:p-5 shadow-xs border border-neutral-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="size-10 sm:size-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                    <Wallet className="size-5 sm:size-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-bold mb-1">
                      Rekomendasi
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 truncate">Saldo E-Wallet Go-Pay</h3>
                    <p className="text-[10px] sm:text-[11px] text-neutral-500">500 pts = Rp 10.000</p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-xs font-bold text-neutral-900 mb-1.5">500 pts</p>
                  <Link
                    to={ROUTES.redemptionWallet}
                    className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-neutral-900 text-white text-[11px] sm:text-xs font-bold hover:bg-neutral-800 transition-colors"
                  >
                    Tukar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Riwayat Penukaran */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">Riwayat Penukaran</h2>
            <Link to={ROUTES.redemptionHistory} className="text-xs font-bold text-brand-green hover:underline">
              Lihat Semua &rarr;
            </Link>
          </div>

          <div className="rounded-3xl bg-white shadow-xs border border-neutral-200/80 divide-y divide-neutral-100 overflow-hidden">
            {historyList.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="size-9 sm:size-10 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                    <Wallet className="size-4 sm:size-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-neutral-900">{item.title}</p>
                    <p className="text-[10px] sm:text-[11px] text-neutral-500">{item.desc}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-red-500">{item.pts}</p>
                  <span className="text-[10px] text-brand-green font-semibold">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
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
