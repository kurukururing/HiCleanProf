import { Bell, ArrowLeft, CheckCircle2, Clock, MapPin, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PengepulNavbar } from '../../components/pengepul/PengepulNavbar';
import { ROUTES } from '../../routes';

export function PengepulNotifikasiPage() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: 'Permintaan Pickup Baru Masuk',
      desc: 'Ibu Ratna Dewi mengajukan pickup sampah plastik & kardus (6 kg) di Jl. Medokan Asri Timur.',
      time: '5 menit yang lalu',
      unread: true,
      icon: Package
    },
    {
      id: 2,
      title: 'Rute Dioptimasi Otomatis',
      desc: 'Sistem telah memperbarui rute penjemputan dengan urutan paling efisien searah.',
      time: '25 menit yang lalu',
      unread: true,
      icon: MapPin
    },
    {
      id: 3,
      title: 'Penjemputan Berhasil Terverifikasi',
      desc: 'Setoran 10.5 kg dari Ibu Mayangsari telah selesai ditimbang dan poin sudah terkirim.',
      time: '2 jam yang lalu',
      unread: false,
      icon: CheckCircle2
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <PengepulNavbar activeName="" />

      <main className="flex-grow mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 space-y-5 pb-28 sm:pb-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="size-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-800 hover:bg-neutral-50 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="size-4.5" />
          </button>
          <h1 className="text-2xl font-extrabold text-neutral-900 font-heading">Notifikasi Mitra</h1>
        </div>

        <div className="space-y-3">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`rounded-3xl p-5 border transition-all ${
                  item.unread
                    ? 'bg-white border-brand-green/30 shadow-sm'
                    : 'bg-white/70 border-neutral-200/70'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="size-10 rounded-2xl bg-brand-green/15 text-brand-green flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-extrabold text-neutral-900">{item.title}</h3>
                      {item.unread && (
                        <span className="size-2 rounded-full bg-brand-green shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
                    <span className="text-[10px] text-neutral-400 block pt-1">{item.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

