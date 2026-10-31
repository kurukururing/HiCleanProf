import { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Truck, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function GabungPickupStep4Page() {
  const navigate = useNavigate();
  const [slot, setSlot] = useState('09:00 - 10:30 WIB');

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white border-b-2 border-neutral-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3 sm:px-6">
          <button type="button" onClick={() => navigate(-1)} className="size-10 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 flex items-center justify-center transition-colors text-neutral-900 shadow-2xs font-bold cursor-pointer">
            <ArrowLeft className="size-5" />
          </button>
          
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logoDesc.png" alt="Hi-Clean" className="h-10 sm:h-11 w-auto object-contain" />
          </Link>

          <Link to="/dashboard" className="text-xs font-extrabold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-1.5 rounded-full border border-neutral-300 transition-colors">
            Beranda
          </Link>
        </div>
      </header>

      <main className="flex-grow mx-auto w-full max-w-md px-4 py-6 space-y-6">
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-700">
            <span className="px-3 py-1 rounded-full bg-neutral-200 text-neutral-800">Konfirmasi</span>
            <span>Langkah 4 dari 4</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 h-1.5">
            <div className="bg-brand-green rounded-full h-full" />
            <div className="bg-brand-green rounded-full h-full" />
            <div className="bg-brand-green rounded-full h-full" />
            <div className="bg-brand-green rounded-full h-full" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">Konfirmasi & Penjemputan</h1>
          <p className="text-xs text-neutral-600 mt-1">Periksa ringkasan setoran dan pilih waktu penjemputan armada</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <span className="text-xs font-bold text-neutral-500">ID Transaksi</span>
            <span className="text-xs font-mono font-bold text-neutral-900">#HC-78664</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-500">Kategori Sampah</span>
              <span className="font-bold text-neutral-900">Plastik PET & Kardus</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Perkiraan Berat</span>
              <span className="font-bold text-neutral-900">4.5 kg (15 Pcs)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Estimasi Poin Diperoleh</span>
              <span className="font-bold text-brand-green">+280 Pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Biaya Pengantaran</span>
              <span className="font-bold text-emerald-600">GRATIS</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500">Lokasi Penjemputan</span>
            <Link to="/dashboard/profil/alamat" className="text-xs font-bold text-brand-green hover:underline">Ubah</Link>
          </div>
          <div className="flex items-start gap-3">
            <div className="size-9 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
              <MapPin className="size-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-neutral-900">Rumah Utama (Medokan Asri)</p>
              <p className="text-[11px] text-neutral-600 leading-relaxed">Jl. Medokan Asri Barat No. 14, RT 04 / RW 08, Surabaya</p>
              <p className="text-[10px] text-neutral-400">Patokan: Pagar hitam samping warung Bu Siti</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-800 block">Pilih Jadwal Penjemputan Hari Ini</label>
          <div className="space-y-2">
            {[
              '09:00 - 10:30 WIB (Truk Siap 400m)',
              '13:00 - 14:30 WIB (Truk Siap 1.2km)',
              '16:00 - 17:30 WIB (Sore)'
            ].map((s) => {
              const active = slot === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSlot(s)}
                  className={`w-full text-left p-4 rounded-3xl border transition-all flex items-center justify-between ${
                    active ? 'bg-white border-brand-green shadow-sm ring-2 ring-brand-green/20' : 'bg-white border-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="size-4 text-brand-green" />
                    <span className="text-xs font-bold text-neutral-900">{s}</span>
                  </div>
                  <span className={`size-5 rounded-full border flex items-center justify-center ${active ? 'bg-brand-green border-brand-green text-ink' : 'border-neutral-300'}`}>
                    {active && <ShieldCheck className="size-3" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2 space-y-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard/gabung-pickup/sukses')}
            className="w-full flex items-center justify-center rounded-2xl bg-neutral-900 text-white py-4 px-6 text-xs font-bold hover:bg-neutral-800 transition-colors shadow-lg gap-2"
          >
            Pesan Penjemputan Sekarang <Sparkles className="size-4 text-brand-green" />
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center rounded-2xl bg-white text-neutral-800 border border-neutral-300 py-3.5 px-6 text-xs font-bold hover:bg-neutral-50 transition-colors"
          >
            &larr; Kembali
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
