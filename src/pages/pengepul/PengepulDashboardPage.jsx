import { useState } from 'react';
import { 
  Package, Clock, ShieldCheck, CheckCircle2, Phone, 
  MapPin, Navigation, ArrowRight, TrendingUp, Sparkles, 
  ChevronRight, MessageSquare, AlertCircle, X, Check,
  Truck, BarChart3
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PengepulNavbar } from '../../components/pengepul/PengepulNavbar';
import { siteConfig } from '../../config/siteConfig';
import { ROUTES } from '../../routes';

export function PengepulDashboardPage() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(null);
  const [contactModal, setContactModal] = useState(null);

  const [incoming, setIncoming] = useState([
    {
      id: 1,
      name: 'Ibu Ratna Dewi',
      address: 'Jl. Medokan Asri Timur No. 14, Gunung Anyar',
      distance: '350m',
      time: '14:20 WIB',
      estWeight: '6.0 kg',
      material: 'Plastik (Botol minuman)',
      phone: '0812-3456-7890'
    },
    {
      id: 2,
      name: 'Bapak Hendra Pratama',
      address: 'Jl. Rungkut Madya No. 45, Rungkut',
      distance: '620m',
      time: '14:35 WIB',
      estWeight: '9.5 kg',
      material: 'Kardus & Kertas Arsip',
      phone: '0813-9988-2211'
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAccept = (item) => {
    setIncoming((prev) => prev.filter((i) => i.id !== item.id));
    showToast(`Pesanan ${item.name} berhasil diterima!`);
  };

  const handleDecline = (item) => {
    setIncoming((prev) => prev.filter((i) => i.id !== item.id));
    showToast(`Pesanan ${item.name} telah dilewati.`);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <PengepulNavbar activeName="Beranda" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold max-w-xs text-center animate-in slide-in-from-top-4 duration-300 border-l-4 border-brand-green">
          <CheckCircle2 className="size-4 text-brand-green shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-grow mx-auto w-full max-w-4xl px-4 py-5 sm:px-6 lg:px-8 space-y-5 pb-8">
        
        {/* ── GREETING SECTION ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-brand-green text-ink font-extrabold flex items-center justify-center shadow-sm shrink-0">AW</div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900">
                Halo, Pak Alexander 👋
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                Siap melakukan penjemputan daur ulang hari ini?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/60">
            <ShieldCheck className="size-4 text-brand-green" />
            <span>Mitra Terverifikasi</span>
          </div>
        </div>

        {/* ── HERO: ACTIVE ROUTE BANNER ── */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-green/20 to-transparent pointer-events-none z-0" />
          <div className="rounded-3xl bg-neutral-900 text-white p-5 sm:p-7 shadow-xl relative overflow-hidden border border-neutral-800">
          <div className="absolute -right-6 -bottom-6 size-40 rounded-full bg-brand-green/15 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-3">
            {/* Status Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-brand-green text-xs font-bold flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-brand-green animate-ping" />
                Rute Aktif Berjalan
              </span>
              <span className="text-[11px] text-neutral-400 font-mono">RW 01 – RW 05 Medokan Asri</span>
            </div>

            {/* Progress info */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1">
              <div>
                <p className="text-[11px] text-neutral-400">Progres Muatan Hari Ini</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">40%</span>
                  <span className="text-xs text-brand-green font-semibold">2 dari 5 Titik Selesai</span>
                </div>
              </div>

              <Link
                to={ROUTES.pengepulRoute}
                className="sm:shrink-0 flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-brand-green text-ink text-xs font-extrabold hover:bg-brand-green/90 transition-all shadow-lg active:scale-95"
              >
                Buka Rute & Navigasi
                <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-white/15 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-green to-emerald-400 transition-all duration-700" style={{ width: '40%' }} />
            </div>
          </div>
        </div>
        </div>

        {/* ── 4 METRIC CARDS ── */}
        {/* Mobile: 2x2 grid | Desktop: 4 in a row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Pickup Aktif', value: '2', unit: 'tugas', color: 'brand-green', bg: 'bg-brand-green/10 text-brand-green', sub: 'Sedang dalam antrean', subColor: 'text-emerald-700', Icon: Package },
            { label: 'Menunggu', value: incoming.length.toString(), unit: 'warga', color: 'amber', bg: 'bg-amber-500/15 text-amber-600', sub: 'Perlu konfirmasi', subColor: 'text-amber-600', Icon: Clock },
            { label: 'Total Berat', value: '42', unit: 'kg', color: 'blue', bg: 'bg-blue-500/15 text-blue-600', sub: 'Kapasitas 100 kg', subColor: 'text-blue-600', Icon: BarChart3 },
            { label: 'Selesai', value: '2', unit: 'tugas', color: 'purple', bg: 'bg-purple-500/15 text-purple-600', sub: 'Berhasil ditimbang', subColor: 'text-purple-600', Icon: CheckCircle2 },
          ].map((card) => (
            <div key={card.label} className="rounded-3xl bg-white p-4 sm:p-5 shadow-xs border border-neutral-200/80 flex flex-col justify-between space-y-2 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-neutral-500">{card.label}</span>
                <div className={`size-8 sm:size-9 rounded-xl sm:rounded-2xl flex items-center justify-center ${card.bg}`}>
                  <card.Icon className="size-3.5 sm:size-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-none tabular-nums">
                  {card.value} <span className="text-[11px] font-semibold text-neutral-500">{card.unit}</span>
                </p>
                <p className={`text-[10px] sm:text-[11px] font-semibold mt-1 ${card.subColor}`}>{card.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── PICKUP MASUK (PERLU KONFIRMASI) ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-neutral-900 tracking-tight">Pickup Masuk</h2>
              {incoming.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-brand-green/15 text-emerald-800 text-[10px] font-extrabold">
                  {incoming.length} baru
                </span>
              )}
            </div>
            {incoming.length > 0 && (
              <span className="text-[11px] text-neutral-400">Terima untuk masuk rute</span>
            )}
          </div>

          {incoming.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 text-center border border-neutral-200/80 space-y-2">
              <div className="size-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto">
                <CheckCircle2 className="size-6" />
              </div>
              <p className="font-bold text-neutral-700 text-sm">Semua pesanan telah diproses</p>
              <p className="text-[11px] text-neutral-500">Permintaan baru dari warga akan muncul otomatis di sini.</p>
            </div>
          ) : (
            <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0">
              {incoming.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-white p-4 sm:p-5 shadow-xs border border-neutral-200/80 border-l-4 border-l-amber-400 space-y-3 hover:shadow-md transition-all duration-200"
                >
                  {/* Header: Name + Distance */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-extrabold text-neutral-900">{item.name}</h3>
                      <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">{item.address}</p>
                    </div>
                    <div className="bg-neutral-100 px-2.5 py-1.5 rounded-xl text-right shrink-0">
                      <p className="text-xs font-extrabold text-neutral-900">{item.distance}</p>
                      <p className="text-[10px] text-neutral-500">{item.time}</p>
                    </div>
                  </div>

                  {/* Meta: Weight + Material */}
                  <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-neutral-100">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                        <Package className="size-3.5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Est. Berat</span>
                        <span className="text-xs font-extrabold text-neutral-900">{item.estWeight}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                        <ShieldCheck className="size-3.5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Material</span>
                        <span className="text-xs font-extrabold text-neutral-900 truncate block max-w-[100px]">{item.material}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2.5 pt-0.5">
                    <button
                      type="button"
                      onClick={() => handleDecline(item)}
                      className="flex-1 py-2.5 rounded-2xl bg-neutral-100 text-neutral-700 border border-neutral-200 text-xs font-extrabold hover:bg-neutral-200 transition-colors"
                    >
                      Lewati
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAccept(item)}
                      className="flex-1 py-2.5 rounded-2xl bg-brand-green text-ink text-xs font-extrabold hover:bg-brand-green/90 transition-all shadow-sm active:scale-95"
                    >
                      Terima
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── PICKUP AKTIF SAAT INI ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-extrabold text-neutral-900 tracking-tight">Pickup Aktif</h2>
            <Link to={ROUTES.pengepulRoute} className="text-xs font-bold text-brand-green hover:underline flex items-center gap-1">
              Lihat Semua <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-4 sm:p-5 shadow-xs border border-neutral-200/80 space-y-3">
            {/* Status header */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-brand-green/10 text-emerald-800 text-xs font-bold">
                Antrean 1 – Prioritas
              </span>
              <span className="text-[11px] text-neutral-500 font-medium">Est. 14:45 WIB</span>
            </div>

            {/* Name & address */}
            <div>
              <h3 className="text-sm font-extrabold text-neutral-900">Ibu Ratna Dewi</h3>
              <p className="text-[11px] text-neutral-500 mt-0.5">Jl. Medokan Asri Timur No. 14, Gunung Anyar</p>
            </div>

            {/* Route info chip */}
            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-neutral-900">
                <Navigation className="size-4 text-emerald-700 rotate-45 shrink-0" />
                <span>450m</span>
                <span className="text-neutral-500 font-normal">(~10 menit)</span>
              </div>
              <div className="font-bold text-emerald-900">
                Est. 4.0 kg <span className="text-neutral-500 font-normal">(Plastik & kardus)</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2.5 pt-0.5">
              <Link
                to={ROUTES.pengepulRouteNavigasi}
                className="flex-1 py-3 rounded-2xl bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-extrabold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Navigation className="size-4 text-neutral-600" />
                Navigasi
              </Link>
              <button
                type="button"
                onClick={() => setContactModal({ name: 'Ibu Ratna Dewi', phone: '0812-3456-7890', address: 'Jl. Medokan Asri Timur No. 14' })}
                className="flex-1 py-3 rounded-2xl bg-brand-green text-ink text-xs font-extrabold hover:bg-brand-green/90 transition-all shadow flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Phone className="size-4" />
                Kontak
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* ── MODAL KONTAK ── */}
      {contactModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl border border-neutral-200 space-y-4 p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-extrabold text-neutral-900">Hubungi Warga</h3>
                <p className="text-xs text-neutral-500 mt-0.5">{contactModal.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setContactModal(null)}
                className="flex items-center justify-center size-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500"
              >
                <X className="size-4.5" />
              </button>
            </div>

            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 space-y-0.5">
              <span className="text-[11px] text-neutral-400 font-medium">Nomor Handphone</span>
              <p className="text-base font-mono font-extrabold text-neutral-900">{contactModal.phone}</p>
              <p className="text-xs text-neutral-500">{contactModal.address}</p>
            </div>

            <div className="space-y-2">
              <a
                href={`tel:${contactModal.phone}`}
                className="w-full py-3 rounded-2xl bg-brand-green text-ink text-xs font-extrabold flex items-center justify-center gap-2 shadow"
              >
                <Phone className="size-4" />
                Panggil Sekarang
              </a>
              <a
                href={`https://wa.me/6281234567890?text=Halo%20${encodeURIComponent(contactModal.name)},%20saya%20petugas%20Hi-Clean%20sedang%20menuju%20ke%20lokasi%20anda`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-2xl bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow"
              >
                <MessageSquare className="size-4" />
                Chat via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="hidden md:block bg-white border-t border-neutral-200 py-6 text-neutral-500 text-xs mt-auto">
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
