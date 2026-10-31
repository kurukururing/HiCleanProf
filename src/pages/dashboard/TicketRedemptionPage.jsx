import { useState } from 'react';
import { ArrowLeft, Ticket, ShieldCheck, ArrowRight, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function TicketRedemptionPage() {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState('WiraWiri - Koridor 1 (Joyoboyo - Lakarsantri)');
  const [ticketCount, setTicketCount] = useState(2);

  const costPerTicket = 250;
  const totalCost = ticketCount * costPerTicket;
  const currentPoints = 1430;
  const remainingPoints = currentPoints - totalCost;

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white border-b-2 border-neutral-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="size-10 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 flex items-center justify-center transition-colors text-neutral-900 shadow-2xs font-bold cursor-pointer"
          >
            <ArrowLeft className="size-5" />
          </button>
          
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-10 sm:h-11 w-auto object-contain" />
          </Link>

          <Link to="/dashboard" className="text-xs font-extrabold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-1.5 rounded-full border border-neutral-300 transition-colors">
            Beranda
          </Link>
        </div>
      </header>

      <main className="flex-grow mx-auto w-full max-w-xl px-4 py-6 sm:px-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Penukaran Tiket</h1>

        {/* Total Poin Card */}
        <div className="rounded-3xl bg-neutral-900 text-white p-6 shadow-xl relative overflow-hidden space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-xs font-semibold text-neutral-300">Total Poin</span>
            </div>
            <span className="text-[11px] font-mono bg-white/10 px-3 py-1 rounded-full text-neutral-300">Diperbarui otomatis</span>
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight">1.430 pts</p>
            <p className="text-[11px] text-neutral-400 mt-1">Dapat ditukarkan langsung dengan tiket perjalanan bus kota</p>
          </div>
        </div>

        {/* Pilih Rute */}
        <div className="space-y-2">
          <label htmlFor="bus-route-select" className="text-sm font-bold text-neutral-900 block">Pilih Rute</label>
          <select
            id="bus-route-select"
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            className="w-full rounded-2xl bg-white border border-neutral-200 px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
          >
            <option value="WiraWiri - Koridor 1 (Joyoboyo - Lakarsantri)">WiraWiri - Koridor 1 (Joyoboyo - Lakarsantri)</option>
            <option value="Trans Suroboyo - Koridor R1/R2">Trans Suroboyo - Koridor R1/R2</option>
            <option value="WiraWiri - Koridor 2 (Penjaringan Sari - Medokan)">WiraWiri - Koridor 2 (Penjaringan Sari - Medokan)</option>
          </select>
        </div>

        {/* Jumlah Tiket */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-900">Jumlah Tiket</h2>
            <span className="text-xs text-neutral-400">Maks. 5 tiket</span>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-neutral-900">Tiket Feeder</p>
                <p className="text-[11px] text-neutral-500">Masukan nominal tiket yang ditukar</p>
              </div>

              <div className="flex items-center gap-3 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200">
                <button
                  type="button"
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                  className="size-8 rounded-xl bg-white flex items-center justify-center shadow hover:bg-neutral-50 text-neutral-800"
                >
                  <Minus className="size-4" />
                </button>
                <span className="text-sm font-extrabold px-3 text-neutral-900">{ticketCount}</span>
                <button
                  type="button"
                  onClick={() => setTicketCount(Math.min(5, ticketCount + 1))}
                  className="size-8 rounded-xl bg-brand-green text-ink flex items-center justify-center shadow hover:bg-brand-green/90"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              {[1, 3, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTicketCount(num)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                    ticketCount === num ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {num} Tiket
                </button>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-brand-green/10 text-xs text-neutral-800 border border-brand-green/20">
              <p>Tiket dapat digunakakan bersama teman/keluarga secara bersamaan atau disimpan untuk lain waktu</p>
            </div>
          </div>
        </div>

        {/* Rincian Penukaran */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-3">
          <h2 className="text-sm font-bold text-neutral-900">Rincian Penukaran</h2>
          <div className="space-y-2 text-xs divide-y divide-neutral-100">
            <div className="flex items-center justify-between pt-1">
              <span className="text-neutral-500">Tarif bus ({costPerTicket}pts x {ticketCount} tiket)</span>
              <span className="font-bold text-neutral-900">{totalCost} pts</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-neutral-500">Poin Dibutuhkan</span>
              <span className="font-bold text-red-600">-{totalCost}pts</span>
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

        <div className="pt-2">
          <Link
            to="/dashboard/penukaran/berhasil-tiket"
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white py-4 px-6 text-sm font-extrabold hover:bg-neutral-800 transition-colors shadow-lg active:scale-[0.99]"
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
