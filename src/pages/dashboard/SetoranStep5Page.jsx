import { useState } from 'react';
import { 
  ArrowLeft, Calendar, Clock, ClipboardList, 
  Sun, Sunset, Sunrise, Check, Sparkles, X, User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { WargaStepHeader } from '../../components/layout/WargaStepHeader';

export function SetoranStep5Page() {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState('besok');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('pagi');
  const [picName, setPicName] = useState('');
  const [courierNotes, setCourierNotes] = useState('');

  const dates = [
    { id: 'hari-ini', day: 'Hari ini', date: '18', status: 'Penuh', available: false },
    { id: 'besok', day: 'Besok', date: '19', status: 'Tersedia', available: true },
    { id: 'minggu', day: 'Minggu', date: '20', status: 'Penuh', available: false },
    { id: 'senin', day: 'Senin', date: '21', status: 'Penuh', available: false }
  ];

  const timeSlots = [
    {
      id: 'pagi',
      title: 'Sesi Pagi',
      time: '08:30 – 10:30 WIB',
      icon: Sunrise
    },
    {
      id: 'siang',
      title: 'Sesi Siang',
      time: '12:00 – 14:00 WIB',
      icon: Sun
    },
    {
      id: 'sore',
      title: 'Sesi Sore',
      time: '15:00 – 17:00 WIB',
      icon: Sunset
    }
  ];

  const notePresets = [
    'Paket ditaruh di depan teras',
    'Hubungi sebelum tiba',
    'Jangan dibanting'
  ];

  const handleNext = () => {
    navigate(ROUTES.setoranStep6);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-28">
      {/* 5 of 6 Step Header */}
      <WargaStepHeader
        stepBadge="Jadwal"
        title="Waktu Penjemputan"
        stepNumber={5}
        totalSteps={6}
        backTo={ROUTES.setoranStep4}
      />

      <main className="flex-grow mx-auto w-full max-w-md px-4 space-y-5">
        {/* Title & Description */}
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 font-heading">
            Pilih Waktu Penjemputan
          </h1>
          <p className="text-xs text-neutral-500 leading-relaxed font-body">
            Tentukan hari dan jam pengambilan sampah oleh armada mitra HiClean terdekat di wilayahmu
          </p>
        </div>

        {/* Tanggal Penjemputan Section */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <Calendar className="size-4.5 text-neutral-800" />
            <h2 className="text-sm font-extrabold text-neutral-900 font-heading">
              Tanggal Penjemputan
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {dates.map((d) => {
              const isSelected = selectedDate === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => d.available && setSelectedDate(d.id)}
                  disabled={!d.available}
                  className={`p-3.5 rounded-3xl border flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-brand-green shadow-md ring-2 ring-brand-green/20'
                      : d.available
                      ? 'bg-white border-neutral-200 hover:border-neutral-300'
                      : 'bg-white/70 border-neutral-200/60 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <span className="text-[10px] font-bold text-neutral-600">
                    {d.day}
                  </span>
                  <span className="text-xl font-extrabold text-neutral-900 font-heading">
                    {d.date}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    d.available
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

        {/* Waktu Penjemputan Section */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <Clock className="size-4.5 text-neutral-800" />
            <h2 className="text-sm font-extrabold text-neutral-900 font-heading">
              Waktu Penjemputan
            </h2>
          </div>

          <div className="space-y-2.5">
            {timeSlots.map((slot) => {
              const Icon = slot.icon;
              const isSelected = selectedTimeSlot === slot.id;
              return (
                <div
                  key={slot.id}
                  onClick={() => setSelectedTimeSlot(slot.id)}
                  className={`p-4 rounded-3xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-brand-green shadow-sm ring-2 ring-brand-green/20'
                      : 'bg-white border-neutral-200/80 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="size-10 rounded-2xl bg-neutral-100 text-neutral-700 flex items-center justify-center">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-extrabold text-neutral-900 font-heading">
                        {slot.title}
                      </h3>
                      <p className="text-xs font-bold text-neutral-700 mt-0.5">
                        {slot.time}
                      </p>
                    </div>
                  </div>

                  <div className={`size-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? 'border-brand-green bg-brand-green text-white' : 'border-neutral-300 bg-white'
                  }`}>
                    {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instruksi & Penanggung Jawab Card */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="size-4.5 text-neutral-800" />
            <h2 className="text-sm font-extrabold text-neutral-900 font-heading">
              Instruksi & Penanggung Jawab
            </h2>
          </div>

          {/* Penanggung Jawab */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-neutral-800">
                Penanggung jawab di lokasi
              </label>
              {!picName && (
                <button
                  type="button"
                  onClick={() => setPicName('Budiman Sekti')}
                  className="text-[11px] font-bold text-brand-green hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="size-3" /> Pakai Nama Saya
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                value={picName}
                onChange={(e) => setPicName(e.target.value)}
                placeholder="Contoh: Budiman Sekti"
                className="w-full rounded-2xl bg-neutral-100/70 border border-neutral-200 px-4 py-3.5 pr-10 text-xs text-neutral-900 placeholder:text-neutral-400 font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:bg-white transition-all"
              />
              {picName && (
                <button
                  type="button"
                  onClick={() => setPicName('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                  title="Hapus Nama"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          {/* Catatan untuk petugas */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-800">
              Catatan untuk petugas kurir
            </label>
            <div className="relative">
              <input
                type="text"
                value={courierNotes}
                onChange={(e) => setCourierNotes(e.target.value)}
                placeholder="Contoh: Jangan dibanting, paket di depan teras"
                className="w-full rounded-2xl bg-neutral-100/70 border border-neutral-200 px-4 py-3.5 pr-10 text-xs text-neutral-900 placeholder:text-neutral-400 font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:bg-white transition-all"
              />
              {courierNotes && (
                <button
                  type="button"
                  onClick={() => setCourierNotes('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                  title="Hapus Catatan"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Quick Note Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {notePresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setCourierNotes(preset)}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-colors cursor-pointer active:scale-95 ${
                    courierNotes === preset
                      ? 'bg-brand-green/15 text-emerald-900 border-brand-green/40'
                      : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200'
                  }`}
                >
                  + {preset}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 px-4 pt-3.5 pb-[max(1rem,env(safe-area-inset-bottom))] z-40">
        <div className="mx-auto max-w-md flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(ROUTES.setoranStep4)}
            className="text-xs font-bold text-neutral-700 hover:text-neutral-900 flex items-center gap-1.5 px-3 py-2 cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            <span>Kembali</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-4 px-6 rounded-2xl bg-neutral-900 hover:bg-black text-white text-xs sm:text-sm font-extrabold shadow-md active:scale-[0.99] transition-all cursor-pointer text-center"
          >
            Lanjut (Langkah 6 /6)
          </button>
        </div>
      </div>
    </div>
  );
}
