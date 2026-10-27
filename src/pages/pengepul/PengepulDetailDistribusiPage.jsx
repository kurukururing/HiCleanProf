import { ArrowLeft, Menu, CheckCircle2, MapPin, Truck, ShieldCheck, Scale, Check } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';
import { InteractiveMap } from '../../components/maps/InteractiveMap';

export function PengepulDetailDistribusiPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-16">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulMaterialDistribusi)}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>

          <h1 className="text-base font-extrabold text-neutral-900">Detail Distribusi</h1>

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
        
        {/* Map Preview Card with GPS Tag */}
        <div className="rounded-3xl overflow-hidden border border-neutral-200/80 bg-white shadow-sm space-y-0">
          <div className="relative h-56 sm:h-64 w-full bg-neutral-100">
            <InteractiveMap
              center={[-7.3380, 112.7680]}
              zoom={13}
              markers={[
                {
                  id: 'warehouse',
                  position: [-7.3205, 112.7845],
                  type: 'stop',
                  number: 'G',
                  title: 'Gudang Pengepul (Asal)',
                  desc: 'Bank Sampah Maju Jaya'
                },
                {
                  id: 'dist-truck',
                  position: [-7.3380, 112.7680],
                  type: 'truck',
                  title: 'Truk Pengantar Material #DST-881',
                  desc: 'Sedang menuju pabrik mitra'
                },
                {
                  id: 'dest-factory',
                  position: [-7.3550, 112.7500],
                  type: 'factory',
                  title: 'Pabrik Daur Ulang Mitra',
                  desc: 'PT Eco Plastik Lestari, Rungkut Industri'
                }
              ]}
              routePath={[
                [-7.3205, 112.7845],
                [-7.3280, 112.7780],
                [-7.3380, 112.7680],
                [-7.3480, 112.7580],
                [-7.3550, 112.7500]
              ]}
              height="100%"
            />
          </div>

          {/* Green GPS Detected Banner */}
          <div className="bg-brand-green text-ink p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="size-5 text-ink" />
              </div>
              <div>
                <p className="text-[11px] font-semibold opacity-90">Titik GPS Terdeteksi</p>
                <h3 className="text-sm font-extrabold">Waru, Kabupaten Sidoarjo</h3>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-neutral-900 text-white text-[10px] font-bold tracking-wider">
              Terverifikasi
            </span>
          </div>
        </div>

        {/* Company & Transit Card */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold inline-block">
            Sedang dikirim
          </span>

          <div>
            <h2 className="text-lg font-extrabold text-neutral-900">PT. Maju Sejahtera</h2>
            <p className="text-xs text-neutral-500 mt-0.5">Kawasan Industri KIIC Karawang Barat</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-100">
            <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100/80 flex items-center gap-3">
              <div className="size-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Truck className="size-4" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-800 font-semibold block">Berangkat</span>
                <p className="text-xs font-extrabold text-neutral-900">10 – 15 menit</p>
                <span className="text-[10px] text-neutral-400 block">Sekitar 14:25 WIB</span>
              </div>
            </div>

            <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100/80 flex items-center gap-3">
              <div className="size-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <MapPin className="size-4" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-800 font-semibold block">Estimasi Tiba</span>
                <p className="text-xs font-extrabold text-neutral-900">450 m</p>
                <span className="text-[10px] text-neutral-400 block">Menuju rute ke - 2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Spesifikasi Mutu & Material */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3.5">
          <h3 className="text-sm font-extrabold text-neutral-900">Spesifikasi Mutu & Material</h3>

          {/* Green highlight total weight */}
          <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-100/90 space-y-1">
            <span className="text-xs text-neutral-500 font-medium">Total berat</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900">300 kg</p>
            <p className="text-xs text-neutral-600">3 bal pres padat kawat baja</p>
          </div>

          {/* 3 Metric QC boxes */}
          <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
            <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100/80">
              <span className="text-[10px] text-neutral-500 block">Kadar Air</span>
              <p className="font-extrabold text-emerald-900 text-sm mt-1">&lt; 12 %</p>
            </div>

            <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100/80">
              <span className="text-[10px] text-neutral-500 block">Kontaminasi</span>
              <p className="font-extrabold text-emerald-900 text-sm mt-1">0%</p>
            </div>

            <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100/80">
              <span className="text-[10px] text-neutral-500 block">Status QC</span>
              <p className="font-extrabold text-brand-green text-sm mt-1">LOLOS</p>
            </div>
          </div>
        </div>

        {/* Rincian Muatan */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <h3 className="text-sm font-extrabold text-neutral-900">Rincian Muatan</h3>

          <div className="space-y-3 divide-y divide-neutral-100 text-xs">
            <div className="flex items-start justify-between gap-3 pt-1">
              <div>
                <p className="font-extrabold text-neutral-900 text-sm">Plastik PET (Bening)</p>
                <p className="text-neutral-500 text-[11px] mt-0.5">15 Botol kemasan - Tutup terpisah</p>
              </div>
              <span className="font-extrabold text-neutral-900 text-sm">4,5kg</span>
            </div>

            <div className="flex items-start justify-between gap-3 pt-3">
              <div>
                <p className="font-extrabold text-neutral-900 text-sm">Kardus Box Bersih</p>
                <p className="text-neutral-500 text-[11px] mt-0.5">3 Bundel pipih - Kering & Rapi</p>
              </div>
              <span className="font-extrabold text-neutral-900 text-sm">6.0kg</span>
            </div>
          </div>
        </div>

      </main>

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-md px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>&copy; {siteConfig.year} Hi-Clean App. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-4">
            <Link to="/kebijakan-privasi" className="hover:text-neutral-900">Kebijakan Privasi</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

