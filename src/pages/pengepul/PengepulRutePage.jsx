import { useState } from 'react';
import { 
  ArrowLeft, MapPin, Navigation, Phone, CheckCircle2, 
  Clock, Package, ShieldCheck, ChevronRight, ArrowRight,
  TrendingUp, Sparkles, MessageSquare, ExternalLink, Menu, X, Copy, Check
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PengepulNavbar } from '../../components/pengepul/PengepulNavbar';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';
import { InteractiveMap } from '../../components/maps/InteractiveMap';

export function PengepulRutePage() {
  const navigate = useNavigate();
  const [contactModal, setContactModal] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = (phone) => {
    navigator.clipboard?.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pickups = [
    {
      id: 1,
      queue: 'Antrean 1',
      time: 'Estimasi 14:45 WIB',
      name: 'Ibu Ratna Dewi',
      address: 'Jl. Medokan Asri Timur No. 14, Gunung Anyar',
      distance: '450m',
      eta: 'Estimasi tiba 10 menit',
      weight: 'Estimasi 4.0 kg',
      material: 'Plastik & kardus',
      phone: '0812-3456-7890'
    },
    {
      id: 2,
      queue: 'Antrean 2',
      time: 'Estimasi 15:00 WIB',
      name: 'Bapak Joko Santoso',
      address: 'Jl. Candi Jago No. 7, Rungkut',
      distance: '300m',
      eta: 'Estimasi tiba 12 menit',
      weight: 'Estimasi 5.5 kg',
      material: 'Karton & bubble wrap',
      phone: '0813-8899-1122'
    },
    {
      id: 3,
      queue: 'Antrean 3',
      time: 'Estimasi 15:15 WIB',
      name: 'Ibu Siti Aisyah',
      address: 'Jl. Raya Darmo No. 56, Wonokromo',
      distance: '500m',
      eta: 'Estimasi tiba 8 menit',
      weight: 'Estimasi 3.2 kg',
      material: 'Kantong plastik',
      phone: '0821-7788-9900'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <PengepulNavbar activeName="Rute" />

      {/* Main Content */}
      <main className="flex-grow mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 space-y-5 pb-28 sm:pb-8">
        {/* Title Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">Rute</h1>
            <p className="text-xs text-neutral-500 mt-0.5">Pantau dan kelola jadwal perjalanan jemput sampah</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={ROUTES.pengepulRouteAtur}
              className="px-3.5 py-2 rounded-2xl bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-bold border border-neutral-200 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <span>Atur Urutan</span>
            </Link>
          </div>
        </div>

        {/* Card 1: Wilayah Tugas Penjemputan */}
        <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-neutral-200/80 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="size-12 rounded-2xl bg-brand-green/15 text-brand-green flex items-center justify-center shrink-0">
                <svg className="size-6 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2"/>
                  <line x1="2" x2="22" y1="10" y2="10"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium">Wilayah Tugas Penjemputan</p>
                <h2 className="text-base sm:text-lg font-extrabold text-neutral-900 mt-0.5">
                  RW 01 – RW 05 Medokan Asri
                </h2>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/15 text-emerald-800 text-xs font-bold shrink-0">
              <span className="size-2 rounded-full bg-brand-green animate-pulse" />
              2/5 Selesai
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-medium">Progres Muatan Hari Ini</span>
              <span className="font-extrabold text-neutral-900">40%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-neutral-100 overflow-hidden">
              <div 
                className="h-full rounded-full bg-brand-green transition-all duration-700" 
                style={{ width: '40%' }} 
              />
            </div>
          </div>
        </div>

        {/* Card 2: Peta Rute Preview */}
        <div className="rounded-3xl bg-white p-4 sm:p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-neutral-900">Peta Rute</h2>
            <span className="text-xs text-neutral-500">Kecamatan Gunung Anyar</span>
          </div>

          <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-neutral-200/60 bg-neutral-100">
            <InteractiveMap
              center={[-7.3205, 112.7845]}
              zoom={15}
              markers={[
                {
                  id: 'driver',
                  position: [-7.3180, 112.7820],
                  type: 'truck',
                  title: 'Posisi Anda (Truk Mitra)',
                  desc: 'Menuju Antrean 1'
                },
                {
                  id: 'stop-1',
                  position: [-7.3190, 112.7830],
                  type: 'stop',
                  number: '1',
                  active: true,
                  title: 'Antrean 1: Ibu Ratna Dewi',
                  desc: 'Jl. Medokan Asri Timur No. 14 • 4.0 kg'
                },
                {
                  id: 'stop-2',
                  position: [-7.3215, 112.7852],
                  type: 'stop',
                  number: '2',
                  title: 'Antrean 2: Bapak Joko Santoso',
                  desc: 'Jl. Candi Jago No. 7 • 5.5 kg'
                },
                {
                  id: 'stop-3',
                  position: [-7.3235, 112.7880],
                  type: 'stop',
                  number: '3',
                  title: 'Antrean 3: Ibu Siti Aisyah',
                  desc: 'Jl. Raya Darmo No. 56 • 3.2 kg'
                },
                {
                  id: 'stop-4',
                  position: [-7.3175, 112.7865],
                  type: 'stop',
                  number: '4',
                  completed: true,
                  title: 'Antrean 4: Pak Hendra',
                  desc: 'Selesai ditimbang'
                },
                {
                  id: 'stop-5',
                  position: [-7.3160, 112.7838],
                  type: 'stop',
                  number: '5',
                  completed: true,
                  title: 'Antrean 5: Ibu Mayangsari',
                  desc: 'Selesai ditimbang'
                }
              ]}
              routePath={[
                [-7.3180, 112.7820],
                [-7.3190, 112.7830],
                [-7.3215, 112.7852],
                [-7.3235, 112.7880]
              ]}
              height="100%"
            />

            {/* GPS Tag Top Left */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-neutral-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-neutral-800 font-mono z-10">
              <MapPin className="size-3.5 text-brand-green" />
              <span>GPS -7.3205, 112.7845</span>
            </div>

            {/* Button Lihat Detail Bottom Left */}
            <Link
              to={ROUTES.pengepulRouteNavigasi}
              className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md hover:bg-white text-neutral-900 px-4 py-2 rounded-2xl shadow-md border border-neutral-200/80 text-xs font-bold flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 z-10"
            >
              <span>Buka Navigasi Rute</span>
              <ChevronRight className="size-3.5 text-brand-green" />
            </Link>
          </div>
        </div>

        {/* Card 3: Rute Hari Ini Summary */}
        <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-neutral-200/80 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-green/15 text-emerald-800 text-[11px] font-bold">
              Rekomendasi rute searah
            </span>
            <span className="px-3 py-1 rounded-full bg-brand-green/15 text-emerald-800 text-[11px] font-bold">
              Hemat Waktu
            </span>
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-neutral-900">Rute Hari Ini</h3>
            <p className="text-xs text-neutral-500 mt-0.5">Jalur optimal yang searah untuk efisiensi</p>
          </div>

          {/* 3 Metric Columns */}
          <div className="grid grid-cols-3 divide-x divide-neutral-200 py-3 border-y border-neutral-100 text-center">
            <div className="px-2">
              <span className="text-[11px] text-neutral-500 block">Titik jemput</span>
              <span className="text-lg sm:text-xl font-extrabold text-neutral-900 mt-0.5 block">15 Titik</span>
            </div>
            <div className="px-2">
              <span className="text-[11px] text-neutral-500 block">Total jarak</span>
              <span className="text-lg sm:text-xl font-extrabold text-neutral-900 mt-0.5 block">13.2 km</span>
            </div>
            <div className="px-2">
              <span className="text-[11px] text-neutral-500 block">Estimasi Waktu</span>
              <span className="text-lg sm:text-xl font-extrabold text-neutral-900 mt-0.5 block">175 menit</span>
            </div>
          </div>

          {/* Atur Rute Button */}
          <Link
            to={ROUTES.pengepulRouteAtur}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-brand-green text-ink text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-md active:scale-[0.99]"
          >
            <span>Atur Rute Penjemputan</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Section: Urutan Pickup */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-neutral-900 tracking-tight">Urutan Pickup</h2>
            <span className="text-xs text-neutral-500">{pickups.length} antrean tersisa</span>
          </div>

          <div className="space-y-3">
            {pickups.map((item) => (
              <div 
                key={item.id} 
                className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-4 hover:shadow-md transition-shadow"
              >
                {/* Queue header */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-brand-green/15 text-emerald-800 text-xs font-bold">
                    {item.queue}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">
                    {item.time}
                  </span>
                </div>

                {/* Resident info */}
                <div>
                  <h3 className="text-base font-bold text-neutral-900">{item.name}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{item.address}</p>
                </div>

                {/* Light green summary sub-card */}
                <div className="bg-brand-green/10 rounded-2xl p-3.5 flex items-center justify-between border border-brand-green/20 text-xs">
                  <div className="flex items-center gap-2">
                    <Navigation className="size-4 text-emerald-800 rotate-45 shrink-0" />
                    <div>
                      <span className="font-extrabold text-neutral-900 text-sm">{item.distance}</span>
                      <p className="text-[11px] text-neutral-600">{item.eta}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-neutral-900 text-sm">{item.weight}</span>
                    <p className="text-[11px] text-neutral-600">{item.material}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-1">
                  <Link
                    to={ROUTES.pengepulRouteDetail.replace(':id', item.id)}
                    className="flex-1 py-3 rounded-2xl bg-white text-neutral-800 border border-neutral-300 text-xs font-extrabold hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Navigation className="size-3.5 text-neutral-600" />
                    <span>Navigasi</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setContactModal(item)}
                    className="flex-1 py-3 rounded-2xl bg-brand-green text-ink text-xs font-extrabold hover:bg-brand-green/90 transition-colors shadow flex items-center justify-center gap-1.5 active:scale-[0.99]"
                  >
                    <Phone className="size-3.5 text-ink" />
                    <span>Kontak</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal Hubungi Warga */}
      {contactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-neutral-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-extrabold text-neutral-900">Hubungi Warga</h3>
                <p className="text-xs text-neutral-500 mt-0.5">{contactModal.name}</p>
              </div>
              <button 
                type="button" 
                onClick={() => setContactModal(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-400 block font-medium">Nomor Handphone</span>
                <button
                  type="button"
                  onClick={() => handleCopyPhone(contactModal.phone)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-green hover:underline cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="size-3 text-brand-green" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-base font-mono font-extrabold text-neutral-900">{contactModal.phone}</p>
              <p className="text-xs text-neutral-500">{contactModal.address}</p>
            </div>

            <div className="space-y-2 pt-1">
              <a 
                href={`tel:${contactModal.phone}`}
                className="w-full py-3 rounded-2xl bg-brand-green text-ink text-xs font-extrabold flex items-center justify-center gap-2 shadow"
              >
                <Phone className="size-4" />
                <span>Panggil Sekarang</span>
              </a>
              <a 
                href={`https://wa.me/62${contactModal.phone.replace(/[^0-9]/g, '').replace(/^0/, '')}?text=Halo%20${encodeURIComponent(contactModal.name)},%20saya%20petugas%20Hi-Clean%20sedang%20menuju%20ke%20lokasi%20anda`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-2xl bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow active:scale-[0.99] transition-transform"
              >
                <MessageSquare className="size-4" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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

