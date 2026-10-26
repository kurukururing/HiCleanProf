import { useState } from 'react';
import { ArrowLeft, Menu, Clock, Sunrise, Sun, Sunset, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../routes';

export function PengepulTerimaPermintaanPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedDate, setSelectedDate] = useState('19');
  const [selectedSession, setSelectedSession] = useState('pagi');
  const [note, setNote] = useState('');

  const handleConfirm = () => {
    navigate(ROUTES.pengepulMaterialSukses);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulMaterialPermintaan)}
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
        
        {/* Factory Card */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-extrabold text-base shrink-0">
              GE
            </div>
            <div>
              <h2 className="text-base font-extrabold text-neutral-900">PT. Green Earth</h2>
              <p className="text-xs text-neutral-500 mt-0.5">2.500 kg · Plastik Botol (PET)</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold shrink-0">
            ● Menunggu
          </span>
        </div>

        {/* Tanggal Pickup Card */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-brand-green" />
            <h3 className="text-sm font-extrabold text-neutral-900">Tanggal Pickup</h3>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { day: 'Hari ini', date: '18', status: 'Penuh', available: false },
              { day: 'Besok', date: '19', status: 'Tersedia', available: true },
              { day: 'Minggu', date: '20', status: 'Penuh', available: false },
              { day: 'Senin', date: '21', status: 'Penuh', available: false },
            ].map((d) => {
              const isSelected = selectedDate === d.date;
              return (
                <button
                  key={d.date}
                  type="button"
                  disabled={!d.available}
                  onClick={() => setSelectedDate(d.date)}
                  className={`p-3 rounded-2xl transition-all border ${
                    isSelected && d.available
                      ? 'bg-brand-green text-ink border-brand-green shadow-md'
                      : d.available
                      ? 'bg-white border-neutral-200 hover:border-brand-green'
                      : 'bg-neutral-100/60 border-neutral-200/50 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <span className="text-[10px] font-medium block">{d.day}</span>
                  <p className="text-lg font-extrabold mt-0.5">{d.date}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    isSelected && d.available
                      ? 'bg-ink text-white'
                      : d.available
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}>
                    {d.status}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sesi Pickup Card */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <h3 className="text-sm font-extrabold text-neutral-900">Sesi Pickup</h3>

          {[
            { id: 'pagi', title: 'Sesi Pagi', time: '08:30 – 10:30 WIB', icon: Sunrise },
            { id: 'siang', title: 'Sesi Siang', time: '12:00 – 14:00 WIB', icon: Sun },
            { id: 'sore', title: 'Sesi Sore', time: '15:00 – 17:00 WIB', icon: Sunset },
          ].map((ses) => {
            const Icon = ses.icon;
            const isSelected = selectedSession === ses.id;
            return (
              <div
                key={ses.id}
                onClick={() => setSelectedSession(ses.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected ? 'border-brand-green bg-emerald-50/50' : 'border-neutral-200/80 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center">
                    <Icon className="size-4 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-neutral-900">{ses.title}</p>
                    <p className="text-[11px] text-neutral-500">{ses.time}</p>
                  </div>
                </div>
                <div className={`size-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-brand-green bg-brand-green text-white' : 'border-neutral-300 bg-white'
                }`}>
                  {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Catatan Pengirim Card */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-2">
          <h3 className="text-sm font-extrabold text-neutral-900">Catatan Pengirim</h3>
          <textarea
            rows={2}
            placeholder="Contoh: Jangan dibanting"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-2xl bg-neutral-100/80 border border-neutral-200/80 p-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
          />
        </div>

      </main>

      {/* Floating Bottom Bar: Konfirmasi Pickup */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full flex items-center justify-center py-4 rounded-2xl bg-brand-green text-ink text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-lg active:scale-[0.99]"
          >
            Konfirmasi Pickup
          </button>
        </div>
      </div>
    </div>
  );
}

