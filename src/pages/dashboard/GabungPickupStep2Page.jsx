import { useState } from 'react';
import { ArrowLeft, Plus, Minus, Camera, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function GabungPickupStep2Page() {
  const navigate = useNavigate();
  const [weight, setWeight] = useState(4.5);
  const [count, setCount] = useState(15);

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3 sm:px-6">
          <button type="button" onClick={() => navigate(-1)} className="size-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors text-neutral-800">
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

      <main className="flex-grow mx-auto w-full max-w-md px-4 py-6 space-y-6">
        {/* Progress Bar Card */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-700">
            <span className="px-3 py-1 rounded-full bg-neutral-200 text-neutral-800">Kategori</span>
            <span>Langkah 2 dari 4</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 h-1.5">
            <div className="bg-brand-green rounded-full h-full" />
            <div className="bg-brand-green rounded-full h-full" />
            <div className="bg-neutral-200 rounded-full h-full" />
            <div className="bg-neutral-200 rounded-full h-full" />
          </div>
        </div>

        {/* Pilih Material */}
        <div className="space-y-2">
          <select className="w-full rounded-2xl bg-white border border-neutral-200 px-4 py-3.5 text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-green/30">
            <option>Plastik PET (Bening)</option>
            <option>Kardus Box Bersih</option>
            <option>Kaleng Aluminium</option>
          </select>
          <p className="text-[11px] text-neutral-500 px-1">Pilih spesifikasi plastik agar estimasi daur ulang tepat</p>
        </div>

        {/* Perkiraan Berat Total */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-900">Perkiraan Berat Total</span>
            <span className="text-[11px] text-neutral-400">Minimal 1 kg</span>
          </div>

          <div className="flex items-center justify-between bg-neutral-100 p-2 rounded-2xl border border-neutral-200">
            <button
              type="button"
              onClick={() => setWeight(Math.max(1, weight - 0.5))}
              className="size-10 rounded-xl bg-white flex items-center justify-center shadow hover:bg-neutral-50 text-neutral-800 font-bold"
            >
              <Minus className="size-4" />
            </button>
            <span className="text-xl font-extrabold text-neutral-900">{weight} kg</span>
            <button
              type="button"
              onClick={() => setWeight(weight + 0.5)}
              className="size-10 rounded-xl bg-brand-green text-ink flex items-center justify-center shadow hover:bg-brand-green/90 font-bold"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>

        {/* Estimasi Jumlah Satuan */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-3">
          <div>
            <p className="text-xs font-bold text-neutral-900">Estimasi Jumlah Satuan</p>
            <p className="text-[11px] text-neutral-500">Membantu kalkulasi daya muat</p>
          </div>
          <div className="flex items-center justify-between bg-neutral-100 p-3 rounded-2xl border border-neutral-200">
            <span className="text-xs text-neutral-500 font-medium">Jumlah botol / pcs</span>
            <span className="text-sm font-extrabold text-neutral-900">{count}</span>
          </div>
        </div>

        {/* Foto Bukti Sampah */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-3">
          <div>
            <p className="text-xs font-bold text-neutral-900">Foto Bukti Sampah</p>
            <p className="text-[11px] text-neutral-500">Verifikasi visual untuk percepatan sortir di bank sampah</p>
          </div>

          <Link
            to="/dashboard/setoran/foto-kamera"
            className="h-36 w-full rounded-2xl bg-neutral-100 border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center gap-2 hover:bg-neutral-200/50 transition-colors"
          >
            <Camera className="size-7 text-neutral-500" />
            <span className="text-xs font-bold text-neutral-700">Unggah foto atau file</span>
          </Link>
        </div>

        {/* Kondisi Material */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-neutral-800">Kondisi Material</p>
          <p className="text-[11px] text-neutral-500">Pastikan 3 syarat higienitas sebelum dijemput pengepul:</p>
          
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { label: 'Sudah Dipilah', desc: 'Bebas Campur' },
              { label: 'Bersih', desc: 'Dibilas tuntas' },
              { label: 'Kering', desc: 'Tanpa sisa air' }
            ].map((cond, i) => (
              <div key={i} className="p-3 rounded-2xl bg-brand-green text-ink text-center space-y-1 shadow-sm">
                <Check className="size-4 mx-auto" />
                <p className="text-[11px] font-bold">{cond.label}</p>
                <p className="text-[9px] opacity-90">{cond.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-4 rounded-2xl bg-white text-neutral-800 border border-neutral-300 text-xs font-bold hover:bg-neutral-50 transition-colors"
          >
            &larr; Kembali
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/gabung-pickup/langkah-3')}
            className="flex-[2] py-4 rounded-2xl bg-neutral-900 text-white text-xs sm:text-sm font-extrabold hover:bg-neutral-800 transition-colors shadow-lg"
          >
            Lanjut (Langkah 2/4)
          </button>
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
