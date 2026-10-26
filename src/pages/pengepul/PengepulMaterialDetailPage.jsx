import { ArrowLeft, Menu, Recycle, MapPin, Clock, Camera, ChevronRight } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';

export function PengepulMaterialDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-16">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulMaterial)}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>

          <h1 className="text-base font-extrabold text-neutral-900">Detail Material</h1>

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
        
        {/* Card: Berat Material */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-500">
            <svg className="size-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="16" rx="2"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <span>Berat Material</span>
          </div>
          <p className="text-3xl font-extrabold text-neutral-900">
            10.5 <span className="text-base font-normal text-neutral-400">kg</span>
          </p>
        </div>

        {/* Card: Spesifikasi Kualitas */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-4">
          <div className="flex items-start gap-3.5 pb-2 border-b border-neutral-100">
            <div className="size-11 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
              <Recycle className="size-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-neutral-900 leading-snug">
                Plastik PET Bening (Botol Air Mineral)
              </h2>
              <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                PET Grade A
              </span>
            </div>
          </div>

          {/* 4 Spek Sub-boxes */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100/80">
              <span className="text-[10px] text-emerald-800 font-semibold block">Tingkat Kemurnian</span>
              <p className="font-extrabold text-neutral-900 mt-0.5">Kering & Padat</p>
            </div>

            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100/80">
              <span className="text-[10px] text-emerald-800 font-semibold block">Bentuk Kemasan</span>
              <p className="font-extrabold text-neutral-900 mt-0.5">Kering & Padat</p>
            </div>

            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100/80">
              <span className="text-[10px] text-emerald-800 font-semibold block">Kondisi Bal</span>
              <p className="font-extrabold text-neutral-900 mt-0.5">Kering & Padat</p>
            </div>

            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100/80">
              <span className="text-[10px] text-emerald-800 font-semibold block">Kadar Air</span>
              <p className="font-extrabold text-neutral-900 mt-0.5">Kering & Padat</p>
            </div>
          </div>
        </div>

        {/* Card: Foto Bukti Sampah */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-neutral-900">Foto Bukti Sampah</h3>
              <p className="text-[11px] text-neutral-500">Verifikasi visual untuk percepatan sortir di bank sampah</p>
            </div>
            <Link
              to={ROUTES.pengepulMaterialFoto}
              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
              title="Ambil foto ulang"
            >
              <Camera className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="h-32 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&auto=format&fit=crop&q=80" 
                alt="Foto Bukti 1" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="h-32 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=300&auto=format&fit=crop&q=80" 
                alt="Foto Bukti 2" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>

        {/* Card: Mitra Tujuan */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <h3 className="text-sm font-extrabold text-neutral-900">Mitra Tujuan</h3>

          <div className="bg-neutral-100/70 p-4 rounded-2xl border border-neutral-200/60 space-y-2">
            <h4 className="text-sm font-extrabold text-neutral-900">
              PT Maharta Daur Plastik Indo
            </h4>

            <div className="flex items-start gap-2 text-xs text-neutral-600">
              <MapPin className="size-3.5 text-neutral-400 mt-0.5 shrink-0" />
              <span>Jl. Danau Limboto No.14, RT 02 / RW 05, Gunung Anyar, Surabaya</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 pt-1">
              <Clock className="size-3.5 text-brand-green shrink-0" />
              <span>Buka hari ini : 08:00 - 17:00 WIB</span>
            </div>
          </div>
        </div>

        <Link
          to={ROUTES.pengepulMaterialDistribusiPengajuan}
          className="w-full flex items-center justify-center py-4 rounded-2xl bg-brand-green text-ink text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-md active:scale-[0.99]"
        >
          Salurkan ke Mitra Ini
        </Link>
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

