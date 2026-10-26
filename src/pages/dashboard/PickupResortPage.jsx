import { useState } from 'react';
import { 
  ArrowLeft, Clock, MapPin, Building2, Trash2, ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function PickupResortPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
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

      <main className="flex-grow mx-auto w-full max-w-xl px-4 py-6 sm:px-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Ambil & Perbaiki Pilihan</h1>
          <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
            Material yang belum memenuhi standar akan disimpan dimitra pengepul dan dapat diambil lalu dipilah ulang secara mandiri agar memenuhi standar.
          </p>
        </div>

        {/* Batas Pengambilan Box */}
        <div className="flex items-center gap-3 p-4 rounded-3xl bg-neutral-200/80 border border-neutral-300 text-neutral-800">
          <Clock className="size-5 text-brand-green shrink-0" />
          <div>
            <p className="text-[11px] font-medium text-neutral-500">Batas Pengambilan</p>
            <p className="text-xs font-bold text-neutral-900">28 September 2026, 14:00 WIB</p>
          </div>
        </div>

        {/* Lokasi Pengambilan */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <h2 className="text-sm font-bold text-neutral-900">Lokasi Pengambilan</h2>
          
          <div className="space-y-3">
            <p className="text-xs font-bold text-neutral-800">TPS3R Medokan - Budi Arie</p>
            <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200 text-xs space-y-2">
              <p className="flex items-start gap-2 text-neutral-700">
                <MapPin className="size-4 text-brand-green shrink-0 mt-0.5" />
                Jl. Danau Limboto No.14, RT 02 / RW 05, Gunung Anyar, Surabaya
              </p>
              <p className="flex items-center gap-2 text-neutral-600">
                <Building2 className="size-4 text-brand-green shrink-0" />
                Buka hari ini : 08:00 - 17:00 WIB
              </p>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <p className="text-xs font-semibold text-neutral-700">Tunjukan kode berikut kepetugas:</p>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-100 border border-neutral-200">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
                alt="Petugas" 
                className="size-12 rounded-full object-cover border" 
              />
              <div>
                <p className="text-base font-extrabold text-neutral-900 font-mono">HCL - 98432</p>
                <p className="text-[11px] text-neutral-500">Kode Pengambilan Khusus</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rincian Sampah */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <h2 className="text-sm font-bold text-neutral-900">Rincian Sampah</h2>
          <div className="space-y-3 divide-y divide-neutral-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-neutral-900">Plastik PET (Bening)</p>
                <p className="text-[11px] text-neutral-500">15 Botol kemasan - Tutup terpisah</p>
              </div>
              <p className="text-xs font-bold text-neutral-900">4,5kg</p>
            </div>
            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="text-xs font-bold text-neutral-900">Kardus Box Bersih</p>
                <p className="text-[11px] text-neutral-500">3 Bundel pipih - Kering & Rapi</p>
              </div>
              <p className="text-xs font-bold text-neutral-900">6.0kg</p>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-medium">
            <span className="text-neutral-500">Total berat</span>
            <span className="font-bold text-neutral-900">10.5 kg</span>
          </div>
        </div>

        <div className="pt-2">
          <Link
            to="/dashboard/riwayat/berhasil"
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white py-4 px-6 text-xs font-bold hover:bg-neutral-800 transition-colors shadow-lg"
          >
            Ambil Sampah <ArrowRight className="size-4 text-brand-green" />
          </Link>
        </div>

      </main>

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
