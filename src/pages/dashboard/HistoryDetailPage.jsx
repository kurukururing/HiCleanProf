import { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, Trash2, ArrowRight
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function HistoryDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isPartial = id === '#HC-78647';

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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Detail Setoran</h1>
          <span className="text-xs font-mono font-medium text-neutral-600 bg-neutral-200 px-3 py-1 rounded-full">
            {id || '#HC-78647'}
          </span>
        </div>

        {/* Status Banner Card */}
        <div className={`p-6 rounded-3xl border shadow-sm space-y-2 ${
          isPartial ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-red-50 border-red-200 text-red-950'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isPartial ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
            }`}>
              <span className="size-2 rounded-full bg-white animate-pulse" />
              {isPartial ? 'Diterima Sebagian' : 'Ditolak'}
            </span>
            <span className="text-xs font-mono opacity-80">ID : {id || '#HC-78647'}</span>
          </div>

          <h2 className="text-lg font-bold mt-2">Penyesuaian Kualitas Setoran</h2>
          <p className="text-xs leading-relaxed opacity-90">
            Diperiksa oleh Petugas Armada <strong className="font-semibold">Budi Santoso</strong> di Jl. Medokan Asri Timur no. 14, Gunung Anyar pada <strong className="font-semibold">15 Sep 2026, 14:00 WIB</strong>
          </p>
          <p className="text-xs font-semibold pt-1">
            {isPartial ? '4.5 kg berhasil lolos inspeksi, sedangkan sisa 2.0 kg terpotong' : 'Kontaminasi minyak berat pada seluruh botol dan kaleng. Tidak memenuhi syarat daur ulang.'}
          </p>
        </div>

        {/* Bobot & Poin Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200">
            <p className="text-xs text-neutral-500 font-medium flex items-center justify-between">
              Bobot Sampah <Trash2 className="size-4 text-brand-green" />
            </p>
            <p className="text-3xl font-extrabold text-neutral-900 mt-2">4.5 <span className="text-sm font-normal text-neutral-500">kg</span></p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200">
            <p className="text-xs text-neutral-500 font-medium flex items-center justify-between">
              Poin Diterima <CheckCircle2 className="size-4 text-brand-green" />
            </p>
            <p className="text-3xl font-extrabold text-brand-green mt-2">+100 <span className="text-sm font-normal text-neutral-600">pts</span></p>
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

        {/* Catatan Pemeriksaan Sampah */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <AlertTriangle className="size-4 text-amber-500" /> Catatan Pemeriksaan Sampah
            </h2>
            <span className="text-xs text-neutral-400">2 temuan</span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-brand-green/10 border border-brand-green/20 text-xs text-neutral-800 space-y-1">
              <p className="font-bold text-neutral-900">Kardus & kertas terkontaminasi minyak</p>
              <p className="text-[11px] text-neutral-600">2.0 kg material tercampur basah dan tercampur dengan minyak makanan, sehingga tidak dapat diproses oleh pihak mitra daur ulang</p>
            </div>
            <div className="p-4 rounded-2xl bg-brand-green/10 border border-brand-green/20 text-xs text-neutral-800 space-y-1">
              <p className="font-bold text-neutral-900">Kertas & buku bekas lolos sortir</p>
              <p className="text-[11px] text-neutral-600">2.0 kg material tercampur basah dan tercampur dengan minyak makanan, sehingga tidak dapat diproses oleh pihak mitra daur ulang</p>
            </div>
          </div>
        </div>

        {/* Bukti Foto Petugas */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-900">Bukti Foto Petugas</h2>
            <span className="text-xs text-neutral-400">2 foto terlampir</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="h-32 rounded-2xl bg-neutral-200 overflow-hidden border border-neutral-100">
              <img src="https://images.unsplash.com/photo-1532996122724-e3c3fa9a0d35?w=300&auto=format&fit=crop&q=80" alt="Bukti 1" className="h-full w-full object-cover" />
            </div>
            <div className="h-32 rounded-2xl bg-neutral-200 overflow-hidden border border-neutral-100">
              <img src="https://images.unsplash.com/photo-1611288557565-d227b92f7204?w=300&auto=format&fit=crop&q=80" alt="Bukti 2" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        <div className="pt-2">
          {isPartial ? (
            <Link
              to="/dashboard/riwayat/ambil-ulang"
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white py-4 px-6 text-xs font-bold hover:bg-neutral-800 transition-colors shadow-lg"
            >
              Ambil & Perbaiki Pilihan <ArrowRight className="size-4 text-brand-green" />
            </Link>
          ) : (
            <Link
              to="/dashboard/riwayat/ambil-ulang"
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white py-4 px-6 text-xs font-bold hover:bg-neutral-800 transition-colors shadow-lg"
            >
              Setor Ulang <ArrowRight className="size-4 text-brand-green" />
            </Link>
          )}
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
