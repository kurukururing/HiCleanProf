import { useState } from 'react';
import { ArrowLeft, Wallet, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function WalletRedemptionPage() {
  const navigate = useNavigate();
  const [selectedWallet, setSelectedWallet] = useState('GoPay');
  const [phone, setPhone] = useState('');
  const [selectedNominal, setSelectedNominal] = useState({ label: 'Rp25.000', pts: 500, fee: 1000 });

  const nominals = [
    { label: 'Rp10.000', pts: 200, fee: 500 },
    { label: 'Rp20.000', pts: 400, fee: 1000 },
    { label: 'Rp25.000', pts: 500, fee: 1000 },
    { label: 'Rp50.000', pts: 1000, fee: 2000 },
  ];

  const currentPoints = 1430;
  const remainingPoints = currentPoints - selectedNominal.pts;

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="size-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors text-neutral-800"
          >
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

      <main className="flex-grow mx-auto w-full max-w-xl px-4 py-6 sm:px-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Penukaran Poin</h1>

        {/* Total Poin Card */}
        <div className="rounded-3xl bg-neutral-900 text-white p-6 shadow-xl relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-xs font-semibold text-neutral-300">Total Poin</span>
            </div>
            <span className="text-[11px] font-mono bg-white/10 px-3 py-1 rounded-full text-neutral-300">1pts = Rp50</span>
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight">1.430 pts <span className="text-sm font-normal text-brand-green">≈ Rp71.500</span></p>
            <p className="text-[11px] text-neutral-400 mt-1">Nominal penukaran maksimal Rp50.000</p>
          </div>
        </div>

        {/* Pilih E-Wallet */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-neutral-900">Pilih E-Wallet</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['GoPay', 'DANA', 'OVO', 'ShopeePay'].map((wallet) => {
              const active = selectedWallet === wallet;
              return (
                <button
                  key={wallet}
                  type="button"
                  onClick={() => setSelectedWallet(wallet)}
                  className={`p-4 rounded-3xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                    active ? 'bg-white border-brand-green shadow-md ring-2 ring-brand-green/20' : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="size-10 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center font-bold">
                    <Wallet className="size-5" />
                  </div>
                  <span className="text-xs font-bold text-neutral-900">{wallet}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-1.5 pt-2">
            <label htmlFor="phone-number" className="text-xs font-semibold text-neutral-700 block">Nomor Handphone E-Wallet</label>
            <input
              id="phone-number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Contoh: 0812-1234-1231"
              className="w-full rounded-2xl bg-white border border-neutral-200 px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
            />
          </div>
        </div>

        {/* Pilih Nominal Penukaran */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-neutral-900">Pilih Nominal Penukaran</h2>
          <div className="grid grid-cols-2 gap-3">
            {nominals.map((nom, i) => {
              const active = selectedNominal.label === nom.label;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedNominal(nom)}
                  className={`p-4 rounded-3xl border text-left transition-all space-y-1 ${
                    active ? 'bg-white border-brand-green shadow-md ring-2 ring-brand-green/20' : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <p className="text-base font-extrabold text-neutral-900">{nom.label}</p>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-500 font-medium">{nom.pts} pts</span>
                    <span className="text-brand-green font-semibold">Tersedia</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rincian Penukaran */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-3">
          <h2 className="text-sm font-bold text-neutral-900">Rincian Penukaran</h2>
          <div className="space-y-2 text-xs divide-y divide-neutral-100">
            <div className="flex items-center justify-between pt-1">
              <span className="text-neutral-500">Nominal Saldo E-Wallet</span>
              <span className="font-bold text-neutral-900">{selectedNominal.label}</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-neutral-500">Biaya Transaksi</span>
              <span className="font-bold text-neutral-900">Rp{selectedNominal.fee.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-neutral-500">Poin Dibutuhkan</span>
              <span className="font-bold text-red-600">-{selectedNominal.pts}pts</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-neutral-500">Poin Saat Ini</span>
              <span className="font-bold text-brand-green">{currentPoints}pts</span>
            </div>
            <div className="flex items-center justify-between pt-3 font-bold text-sm">
              <span className="text-neutral-900">Sisa Poin</span>
              <span className="text-brand-green">{remainingPoints}pts</span>
            </div>
          </div>
        </div>

        {/* Keamanan Terjamin Banner */}
        <div className="flex items-start gap-3 p-4 rounded-3xl bg-neutral-200/60 border border-neutral-300/60 text-xs text-neutral-700">
          <ShieldCheck className="size-5 text-brand-green shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Pastikan nomor ponsel anda aktif dan sudah terdaftar pada E-Wallet tujuan agar memudahkan dalam proses pencairan dana
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/dashboard/penukaran/berhasil"
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white py-4 px-6 text-xs font-bold hover:bg-neutral-800 transition-colors shadow-lg"
          >
            Tukar Poin <ArrowRight className="size-4 text-brand-green" />
          </Link>
        </div>

      </main>

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
