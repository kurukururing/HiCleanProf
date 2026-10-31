import { useState } from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function AddressListPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white border-b-2 border-neutral-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3 sm:px-6">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="size-10 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 flex items-center justify-center transition-colors text-neutral-900 shadow-2xs font-bold cursor-pointer"
          >
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

      <main className="flex-grow mx-auto w-full max-w-xl px-4 py-6 space-y-6">
        <div className="space-y-4">
          {/* Alamat Utama */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-[11px] font-bold">
                Alamat Utama
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-bold text-neutral-900">Rumah Utama (Medokan Asri)</h2>
              <p className="text-xs text-neutral-500">Budiman Sekti - 081223455575</p>
              <p className="text-xs text-neutral-600 pt-1 leading-relaxed">
                Jl. Medokan Asri Barat No. 14, RT 04 / RW 08, Gunung Anyar, Surabaya, Jawa Timur, 61256.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-neutral-100 text-xs text-neutral-700 space-y-1">
              <p className="font-semibold">Patokan: Pagar hitam samping warung Bu Siti, ada banner dijual dipagar</p>
              <p className="text-[11px] text-neutral-500">Akses truk besar & pickup untuk penjemputan</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
              <button type="button" className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600">
                <Trash2 className="size-4" /> Hapus
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/dashboard/profil/alamat/tambah')}
                className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
              >
                Edit Alamat
              </button>
            </div>
          </div>

          {/* Alamat Sekunder */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[11px] font-bold">
                Sekunder
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-bold text-neutral-900">Rumah Nenek (Rungkut Asri)</h2>
              <p className="text-xs text-neutral-500">Ibu Siti Fatimah - 08125312475</p>
              <p className="text-xs text-neutral-600 pt-1 leading-relaxed">
                Jl. Rungkut Asri Timur No. 14, RT 04 / RW 08, Gunung Anyar, Surabaya, Jawa Timur, 61256.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-neutral-100 text-xs text-neutral-700 space-y-1">
              <p className="font-semibold">Patokan: Pagar hitam samping warung Bu Siti, ada banner dijual dipagar</p>
              <p className="text-[11px] text-neutral-500">Akses truk besar & pickup untuk penjemputan</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
              <button type="button" className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600">
                <Trash2 className="size-4" /> Hapus
              </button>
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={() => navigate('/dashboard/profil/alamat/tambah')}
                  className="px-3 py-2 rounded-xl bg-neutral-100 text-neutral-800 text-xs font-bold hover:bg-neutral-200 transition-colors"
                >
                  Edit Alamat
                </button>
                <button type="button" className="px-3 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors">
                  Jadikan Utama
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Link
            to="/dashboard/profil/alamat/tambah"
            className="w-full flex items-center justify-center rounded-2xl bg-neutral-900 text-white py-4 px-6 text-xs font-bold hover:bg-neutral-800 transition-colors shadow-lg"
          >
            Tambah Alamat
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
