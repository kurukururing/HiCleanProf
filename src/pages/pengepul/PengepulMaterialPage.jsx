import { useState } from 'react';
import { 
  Package, CheckCircle2, ArrowRight, ShieldCheck, 
  Clock, ArrowUpRight, Search, ChevronRight, Layers,
  Check, AlertCircle, Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PengepulNavbar } from '../../components/pengepul/PengepulNavbar';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';

export function PengepulMaterialPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Semua'); // 'Semua' | 'Siap kirim'

  const allBatches = [
    {
      id: 'MAT-312-33',
      name: 'Kaleng Minum Aluminium',
      weight: '40.2 kg',
      kondisi: 'Kering danTerikat Tali',
      kesesuaian: '100% (Grade A Sempurna)',
      percent: 100,
      note: 'Kadar air < 12%, bebas selotip, lolos verifikasi pabrik',
      ready: true,
    },
    {
      id: 'MAT-415-22',
      name: 'Botol Plastik PET',
      weight: '30.5 kg',
      kondisi: 'Kering dan Terikat Tali',
      kesesuaian: '95% (Grade B Baik)',
      percent: 95,
      note: 'Kadar air < 10%, bebas selotip, lolos verifikasi pabrik',
      ready: true,
    },
    {
      id: 'MAT-529-19',
      name: 'Kotak Kertas Daur Ulang',
      weight: '25.0 kg',
      kondisi: 'Kering dan Rapi',
      kesesuaian: '90% (Grade B Baik)',
      percent: 90,
      note: 'Kadar air < 8%, bebas selotip, lolos verifikasi pabrik',
      ready: true,
    },
    {
      id: 'MAT-612-45',
      name: 'Kaca Keras',
      weight: '50.0 kg',
      kondisi: 'Kering dan Tanpa Retak',
      kesesuaian: '67% (Grade C Cukup)',
      percent: 67,
      note: 'Kadar air < 5%, bebas selotip, lolos verifikasi pabrik',
      ready: false,
    }
  ];

  const displayedBatches = activeTab === 'Semua' 
    ? allBatches 
    : allBatches.filter((b) => b.ready);

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-16">
      <PengepulNavbar activeName="Material" />

      <main className="flex-grow mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 space-y-6">
        
        {/* Title Heading */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Material
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manajemen stok akumulasi sampah dan jalur distribusi pabrik daur ulang
          </p>
        </div>

        {/* Card 1: Kapasitas Gudang Lapak */}
        <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-neutral-200/80 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900">342.2</span>
              <span className="text-sm font-semibold text-neutral-400">/ 500kg</span>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold">
              Kapasitas 50%
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 rounded-full bg-neutral-100 overflow-hidden">
            <div 
              className="h-full rounded-full bg-brand-green transition-all duration-700"
              style={{ width: '68%' }}
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-600 font-medium pt-0.5">
            <CheckCircle2 className="size-4 text-brand-green" />
            <span>Sisa ruang aman : 200 kg</span>
          </div>
        </div>

        {/* Section: Stok Material */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-neutral-900">Stok Material</h2>
              <p className="text-xs text-neutral-500">Status akumulasi siap salur ke pabrik daur ulang</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              4 kategori
            </span>
          </div>

          {/* Grid 2x2 Category Cards */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Plastik */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-2 hover:shadow-md transition-shadow">
              <div className="size-10 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center">
                <Package className="size-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium">Plastik</p>
                <p className="text-xl sm:text-2xl font-extrabold text-neutral-900 mt-0.5">
                  148.5 <span className="text-xs font-normal text-neutral-500">kg</span>
                </p>
              </div>
            </div>

            {/* Kertas & Karton */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-2 hover:shadow-md transition-shadow">
              <div className="size-10 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center">
                <Package className="size-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium">Kertas & Karton</p>
                <p className="text-xl sm:text-2xl font-extrabold text-neutral-900 mt-0.5">
                  112 <span className="text-xs font-normal text-neutral-500">kg</span>
                </p>
              </div>
            </div>

            {/* Logam & Kaleng */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-2 hover:shadow-md transition-shadow">
              <div className="size-10 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center">
                <Package className="size-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium">Logam & Kaleng</p>
                <p className="text-xl sm:text-2xl font-extrabold text-neutral-900 mt-0.5">
                  54.8 <span className="text-xs font-normal text-neutral-500">kg</span>
                </p>
              </div>
            </div>

            {/* Kaca & Beling */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-2 hover:shadow-md transition-shadow">
              <div className="size-10 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center">
                <Package className="size-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium">Kaca & Beling</p>
                <p className="text-xl sm:text-2xl font-extrabold text-neutral-900 mt-0.5">
                  27.2 <span className="text-xs font-normal text-neutral-500">kg</span>
                </p>
              </div>
            </div>
          </div>

          {/* Pengajuan Distribusi CTA Button */}
          <Link
            to={ROUTES.pengepulMaterialDistribusiPengajuan}
            className="w-full flex items-center justify-center py-4 rounded-2xl bg-brand-green text-ink text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-md active:scale-[0.99]"
          >
            Pengajuan Distribusi
          </Link>
        </div>

        {/* Section: Detail Material */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-neutral-900">Detail Material</h2>
              <p className="text-xs text-neutral-500">Pengecekan kualitas & spesifikasi material</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              {allBatches.length} batch masuk
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('Semua')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'Semua'
                  ? 'bg-brand-green text-ink shadow-sm'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              Semua
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('Siap kirim')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'Siap kirim'
                  ? 'bg-brand-green text-ink shadow-sm'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              Siap kirim
            </button>
          </div>

          {/* Batch Cards */}
          <div className="space-y-3">
            {displayedBatches.map((batch) => (
              <div
                key={batch.id}
                className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                      <Package className="size-5" />
                    </div>
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[10px] font-bold">
                        #{batch.id}
                      </span>
                      <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 mt-1">
                        {batch.name}
                      </h3>
                    </div>
                  </div>
                  <span className="text-base sm:text-lg font-extrabold text-neutral-900 shrink-0">
                    {batch.weight}
                  </span>
                </div>

                {activeTab === 'Siap kirim' ? (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Status</span>
                      <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                        Siap Kirim
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Kesesuaian Pabrik:</span>
                      <span className="font-extrabold text-brand-green">{batch.kesesuaian}</span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-brand-green transition-all"
                        style={{ width: `${batch.percent}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-neutral-500 pt-1 leading-relaxed">{batch.note}</p>

                    <div className="pt-2 text-right">
                      <Link
                        to={ROUTES.pengepulMaterialDetail.replace(':id', batch.id)}
                        className="inline-flex items-center gap-1 text-xs font-extrabold text-neutral-800 hover:text-brand-green transition-colors"
                      >
                        <span>Selengkapnya</span>
                        <ChevronRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Kondisi:</span>
                      <span className="px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
                        {batch.kondisi}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Kesesuaian Pabrik:</span>
                      <span className="font-extrabold text-brand-green">{batch.kesesuaian}</span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-brand-green transition-all"
                        style={{ width: `${batch.percent}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-neutral-500 pt-1 leading-relaxed">{batch.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section: Distribusi Material */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-neutral-900">Distribusi Material</h2>
              <p className="text-xs text-neutral-500">Penyaluran sampah ke mitra pengolah sampah</p>
            </div>
            <Link 
              to={ROUTES.pengepulMaterialDistribusi}
              className="text-xs font-extrabold text-brand-green hover:underline flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="size-3.5" />
            </Link>
          </div>

          {/* Active Distribution Card */}
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono font-extrabold text-xs text-neutral-900">#MAT-529-19</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-brand-green animate-ping" />
                Sedang dikirim
              </span>
            </div>

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
                  <Package className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900">PT. Maju Sejahtera</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">18 Sep 2026, 14:00 WIB</p>
                </div>
              </div>
              <span className="text-xl font-extrabold text-neutral-900 shrink-0">300<span className="text-xs font-normal">kg</span></span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-neutral-100 text-neutral-600">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-neutral-400 shrink-0" />
                <span>Estimasi tiba: 20 Sep 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-neutral-400 shrink-0" />
                <span>Kategori : Kaca & botol</span>
              </div>
            </div>

            <Link
              to={ROUTES.pengepulMaterialDistribusiLacak.replace(':id', 'MAT-529-19')}
              className="w-full flex items-center justify-center py-3 rounded-2xl border border-brand-green text-brand-green text-xs font-extrabold hover:bg-emerald-50 transition-colors"
            >
              Lacak Pengiriman
            </Link>
          </div>
        </div>

        {/* Section: Permintaan Mitra */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-neutral-900">Permintaan Mitra</h2>
              <p className="text-xs text-neutral-500">Daftar permintaan material aktif dari mitra pengolah</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              3 permintaan
            </span>
          </div>

          <div className="space-y-3">
            {[
              { id: 1, name: 'PT. Maju Sejahtera', cat: 'Kaca & Botol', qty: '300 kg', date: '20 Sep 2026' },
              { id: 2, name: 'CV. Hijau Bersih', cat: 'Plastik & Karton', qty: '250 kg', date: '21 Sep 2026' },
              { id: 3, name: 'PT. Daur Ulang Nusantara', cat: 'Logam & Kaleng', qty: '150 kg', date: '22 Sep 2026' }
            ].map((p) => (
              <div
                key={p.id}
                className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
                      <Package className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-neutral-900">{p.name}</h3>
                      <p className="text-xs text-neutral-400">{p.cat}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    ● Baru
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-neutral-100">
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-medium">Jumlah</span>
                    <span className="font-extrabold text-neutral-900">{p.qty}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-medium">Estimasi tiba</span>
                    <span className="font-extrabold text-neutral-900">{p.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-neutral-500 pt-1">
                  <CheckCircle2 className="size-3.5 text-brand-green" />
                  <span>Permintaan sesuai standar pabrik</span>
                </div>
              </div>
            ))}
          </div>

          <Link
            to={ROUTES.pengepulMaterialPermintaan}
            className="w-full flex items-center justify-center py-3.5 rounded-2xl border border-brand-green text-brand-green text-xs font-extrabold hover:bg-emerald-50 transition-colors"
          >
            Lihat Semua Permintaan
          </Link>
        </div>

      </main>

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
