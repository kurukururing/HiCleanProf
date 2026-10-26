import { useState } from 'react';
import { ArrowLeft, MapPin, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function AddAddressPage() {
  const navigate = useNavigate();
  const [label, setLabel] = useState('Rumah');
  const [access, setAccess] = useState('pickup');

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3 sm:px-6">
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

      <main className="flex-grow mx-auto w-full max-w-md px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Titik Penjemputan Sampah</h1>
          <p className="text-xs text-neutral-600 mt-1">Pastikan lokasi akurat agar armada pengangkut mudah menjangkau sampai terpilahmu</p>
        </div>

        {/* Map Card */}
        <div className="rounded-3xl bg-white p-4 shadow-sm border border-neutral-200 space-y-3">
          <div className="relative h-48 w-full rounded-2xl bg-neutral-200 overflow-hidden border border-neutral-100 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-mono font-semibold">
              📍 GPS-6.2168, 107.586
            </div>
            <div className="size-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-lg">
              <MapPin className="size-4 text-brand-green" />
            </div>
          </div>
          <div className="flex items-center justify-between px-1">
            <div>
              <p className="text-[11px] text-neutral-500">Titik GPS Terdeteksi</p>
              <p className="text-xs font-bold text-neutral-900">Waru, Kabupaten Sidoarjo</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-bold">Terverifikasi</span>
          </div>
        </div>

        {/* Label Alamat */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-800 block">Label Alamat</label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['Rumah', 'Kantor', 'Sekolah', 'Bank Sampah'].map((lb) => (
              <button
                key={lb}
                type="button"
                onClick={() => setLabel(lb)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold shrink-0 transition-colors ${
                  label === lb ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-700 border border-neutral-200'
                }`}
              >
                {lb}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Contoh: Rumah Utama"
            className="w-full rounded-2xl bg-neutral-200/60 border border-neutral-300/80 px-4 py-3 text-xs text-neutral-900"
          />
        </div>

        {/* Fields */}
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-800 block">Nama Penerima</label>
            <input type="text" placeholder="Contoh: Rudi" className="w-full rounded-2xl bg-neutral-200/60 border border-neutral-300/80 px-4 py-3 text-xs text-neutral-900" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-800 block">No. handphone</label>
            <input type="tel" placeholder="Contoh: 0812-1111-1111" className="w-full rounded-2xl bg-neutral-200/60 border border-neutral-300/80 px-4 py-3 text-xs text-neutral-900" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-800 block">Kode Pos</label>
            <input type="text" placeholder="Contoh: 61256" className="w-full rounded-2xl bg-neutral-200/60 border border-neutral-300/80 px-4 py-3 text-xs text-neutral-900" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-800 block">Alamat Lengkap</label>
            <textarea placeholder="Masukan alamat lengkap" rows={2} className="w-full rounded-2xl bg-neutral-200/60 border border-neutral-300/80 px-4 py-3 text-xs text-neutral-900" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-800 block">Patokan</label>
            <input type="text" placeholder="Contoh: Pagar Hitam" className="w-full rounded-2xl bg-neutral-200/60 border border-neutral-300/80 px-4 py-3 text-xs text-neutral-900" />
          </div>
        </div>

        {/* Aksesibilitas */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-800 block">Aksesibilitas</label>
          <div className="space-y-2">
            {[
              { id: 'pickup', title: 'Bisa truk / mobil pickup', desc: 'Lebar Jalan > 3 meter, muat kendaraan roda empat' },
              { id: 'bus', title: 'Bisa bus / kendaraan besar', desc: 'Lebar Jalan > 5 meter, muat kendaraan roda enam' },
              { id: 'motor', title: 'Bisa sepeda motor', desc: 'Lebar Jalan > 2 meter, muat kendaraan roda dua dan sepeda' }
            ].map((acc) => (
              <label key={acc.id} className={`flex items-start gap-3 p-4 rounded-3xl border cursor-pointer transition-colors ${access === acc.id ? 'bg-white border-brand-green ring-2 ring-brand-green/20' : 'bg-white border-neutral-200'}`}>
                <input type="radio" name="access" checked={access === acc.id} onChange={() => setAccess(acc.id)} className="mt-1" />
                <div>
                  <p className="text-xs font-bold text-neutral-900">{acc.title}</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">{acc.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard/profil/alamat')}
            className="w-full flex items-center justify-center rounded-2xl bg-neutral-900 text-white py-4 px-6 text-xs font-bold hover:bg-neutral-800 transition-colors shadow-lg"
          >
            Simpan Alamat
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center rounded-2xl bg-white text-neutral-800 border border-neutral-300 py-3.5 px-6 text-xs font-bold hover:bg-neutral-50 transition-colors"
          >
            Batal
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
