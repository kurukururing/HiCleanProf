import { useState } from 'react';
import { 
  Bell, ArrowLeft, Menu, X, Truck, CheckCircle2, 
  Clock, MapPin, Sparkles, ShieldCheck, ChevronRight, Phone, MessageSquare
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';

export function NotificationsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Semua');

  const notifications = [
    {
      id: 1,
      type: 'Penjemputan',
      title: 'Kurir Menuju Rumah Anda',
      desc: 'Kurir HiClean sedang dalam perjalanan menjemput kiriman botol plastik Anda. Mohon siapkan sampah terpilah Anda di depan rumah.',
      time: '14:02 WIB',
      actionText: 'Lacak Kurir',
      actionUrl: '/dashboard/setoran-aktif'
    },
    {
      id: 2,
      type: 'Pengantaran',
      title: 'Kurir Dalam Perjalanan',
      desc: 'Kurir HiClean sedang dalam perjalanan untuk mengantarkan kiriman Anda. Pastikan Anda ada di lokasi untuk menerima paket.',
      time: '15:30 WIB',
      actionText: 'Lacak Pengiriman',
      actionUrl: '/dashboard/setoran-aktif'
    },
    {
      id: 3,
      type: 'Pemberitahuan',
      title: 'Pengambilan Selesai',
      desc: 'Pengambilan botol plastik Anda sudah selesai. Terima kasih telah berpartisipasi dalam program daur ulang kami!',
      time: '16:00 WIB',
      actionText: null,
      actionUrl: null
    }
  ];

  const filtered = activeTab === 'Semua' 
    ? notifications 
    : notifications.filter(n => n.type.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      {/* Header dengan tombol kembali */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
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

      <main className="flex-grow mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">Notifikasi</h1>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['Semua', 'Penjemputan', 'Promo', 'Transaksi'].map((tab) => {
            const count = tab === 'Semua' ? 3 : tab === 'Penjemputan' ? 2 : 0;
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  active 
                    ? 'bg-neutral-900 text-white shadow-md' 
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                {tab}
                {count > 0 && (
                  <span className={`size-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    active ? 'bg-brand-green text-ink' : 'bg-neutral-200 text-neutral-800'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Notification List */}
        {filtered.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center border border-neutral-200 my-8">
            <div className="size-16 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto mb-4">
              <Bell className="size-7" />
            </div>
            <h2 className="text-lg font-bold text-neutral-900">Belum ada notifikasi</h2>
            <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
              Notifikasi promo, penjemputan, dan transaksi akan muncul di sini.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div key={item.id} className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200/85 hover:shadow-md transition-shadow space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-bold tracking-wide">
                    &bull; {item.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">{item.time}</span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                    <Truck className="size-6" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-base font-bold text-neutral-900">{item.title}</h2>
                    <p className="text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                {item.actionText && (
                  <div className="pt-2">
                    <Link
                      to={item.actionUrl}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white px-6 py-3 text-xs font-bold hover:bg-neutral-800 transition-colors"
                    >
                      {item.actionText}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
