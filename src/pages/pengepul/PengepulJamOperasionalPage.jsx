import { useState } from 'react';
import { ArrowLeft, Menu, Clock, Calendar, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

export function PengepulJamOperasionalPage() {
  const navigate = useNavigate();

  const [startTime, setStartTime] = useState('08:00 WIB');
  const [endTime, setEndTime] = useState('17:00 WIB');

  const [days, setDays] = useState([
    { id: 'senin', name: 'Senin', time: '08:00 - 17:00 WIB', enabled: true },
    { id: 'selasa', name: 'Selasa', time: '08:00 - 17:00 WIB', enabled: true },
    { id: 'rabu', name: 'Rabu', time: '08:00 - 17:00 WIB', enabled: true },
    { id: 'kamis', name: 'Kamis', time: '08:00 - 17:00 WIB', enabled: true },
    { id: 'jumat', name: 'Jumat', time: '08:00 - 17:00 WIB', enabled: true },
    { id: 'sabtu', name: 'Sabtu', time: '09:00 - 15:00 WIB', enabled: true },
    { id: 'minggu', name: 'Minggu', time: '08:00 - 17:00 WIB', enabled: true },
  ]);

  const toggleDay = (id) => {
    setDays((prev) =>
      prev.map((d) => (d.id === id ? { ...d, enabled: !d.enabled } : d))
    );
  };

  const handleSave = () => {
    navigate(ROUTES.pengepulProfile);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-36">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulProfile)}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>

          <h1 className="text-base font-extrabold text-neutral-900">Jam Operasional</h1>

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
        
        {/* Card: Jam Operasional */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-4">
          <div className="flex items-start gap-2.5">
            <Clock className="size-5 text-neutral-900 mt-0.5 shrink-0" />
            <div>
              <h2 className="text-sm font-extrabold text-neutral-900">Jam Operasional</h2>
              <p className="text-[11px] text-neutral-500">Jendela waktu keberangkatan untuk penjemputan sampah</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Jam Mulai */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-neutral-600 block">Jam Mulai</label>
              <div className="relative">
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full appearance-none rounded-2xl bg-neutral-200/60 border border-neutral-300/80 px-4 py-3.5 text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-green/30 cursor-pointer"
                >
                  <option value="07:00 WIB">07:00 WIB</option>
                  <option value="08:00 WIB">08:00 WIB</option>
                  <option value="09:00 WIB">09:00 WIB</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-neutral-500 pointer-events-none" />
              </div>
            </div>

            {/* Jam Selesai */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-neutral-600 block">Jam Selesai</label>
              <div className="relative">
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full appearance-none rounded-2xl bg-neutral-200/60 border border-neutral-300/80 px-4 py-3.5 text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-green/30 cursor-pointer"
                >
                  <option value="16:00 WIB">16:00 WIB</option>
                  <option value="17:00 WIB">17:00 WIB</option>
                  <option value="18:00 WIB">18:00 WIB</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-neutral-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Card: Hari Operasional */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-neutral-900" />
            <h3 className="text-sm font-extrabold text-neutral-900">Hari Operasional</h3>
          </div>

          <div className="space-y-2.5 pt-1">
            {days.map((d) => (
              <div
                key={d.id}
                className="rounded-2xl bg-neutral-200/50 border border-neutral-300/60 p-3.5 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-extrabold text-neutral-900">{d.name}</h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">{d.time}</p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleDay(d.id)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 ${
                    d.enabled ? 'bg-brand-green' : 'bg-neutral-300'
                  }`}
                >
                  <div
                    className={`size-5 rounded-full bg-white shadow-md transition-transform ${
                      d.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Floating Bottom Bar: Simpan and Batal */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
        <div className="mx-auto max-w-md space-y-2.5">
          <button
            type="button"
            onClick={handleSave}
            className="w-full flex items-center justify-center py-4 rounded-2xl bg-brand-green text-ink text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-lg active:scale-[0.99]"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulProfile)}
            className="w-full flex items-center justify-center py-3.5 rounded-2xl bg-white border border-brand-green text-brand-green text-sm font-extrabold hover:bg-emerald-50 transition-all active:scale-[0.99]"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

