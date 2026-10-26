import { useState } from 'react';
import { Bell, Menu, X, User, LogOut, Package, Clock, ShieldCheck, CheckCircle2, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PengepulNavbar } from '../../components/pengepul/PengepulNavbar';
import { siteConfig } from '../../config/siteConfig';

export function PengepulDashboardPage() {
  const navigate = useNavigate();
  const [incoming, setIncoming] = useState([
    {
      id: 1,
      name: 'Ibu Ratna Dewi',
      address: 'Jl. Medokan Asri Timur No. 14, Gunung Anyar',
      distance: '350m',
      time: '14:20 WIB',
      estWeight: '6.0 kg',
      material: 'Plastik (Botol minuman)'
    }
  ]);

  const handleAction = (id) => {
    setIncoming((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      <PengepulNavbar activeName="Beranda" />

      <main className="flex-grow mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">Halo, Pak Alexander Wijaya 👋</h1>
          <p className="text-xs text-neutral-500 mt-0.5">Siap melakukan penjemputan untuk hari ini?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-3xl bg-brand-green text-ink p-6 shadow-md flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold opacity-90">Pickup Aktif</p>
              <p className="text-3xl font-extrabold mt-1">2 <span className="text-base font-normal">tugas</span></p>
            </div>
            <div className="size-12 rounded-2xl bg-black/10 flex items-center justify-center">
              <Package className="size-6" />
            </div>
          </div>

          <div className="rounded-3xl bg-brand-green text-ink p-6 shadow-md flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold opacity-90">Pickup Menunggu</p>
              <p className="text-3xl font-extrabold mt-1">{incoming.length} <span className="text-base font-normal">perlu konfirmasi</span></p>
            </div>
            <div className="size-12 rounded-2xl bg-black/10 flex items-center justify-center">
              <Clock className="size-6" />
            </div>
          </div>

          <div className="rounded-3xl bg-brand-green text-ink p-6 shadow-md flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold opacity-90">Total Berat</p>
              <p className="text-3xl font-extrabold mt-1">42 kg</p>
            </div>
            <div className="size-12 rounded-2xl bg-black/10 flex items-center justify-center">
              <ShieldCheck className="size-6" />
            </div>
          </div>

          <div className="rounded-3xl bg-brand-green text-ink p-6 shadow-md flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold opacity-90">Pickup Selesai</p>
              <p className="text-3xl font-extrabold mt-1">2 <span className="text-base font-normal">tugas</span></p>
            </div>
            <div className="size-12 rounded-2xl bg-black/10 flex items-center justify-center">
              <CheckCircle2 className="size-6" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Pickup Masuk</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-green text-ink text-[10px] font-extrabold">{incoming.length} baru</span>
          </div>

          {incoming.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 text-center border border-neutral-200 text-xs text-neutral-500">
              Tidak ada pickup masuk saat ini.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {incoming.map((item) => (
                <div key={item.id} className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900">{item.name}</h3>
                      <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{item.address}</p>
                    </div>
                    <div className="bg-neutral-100 px-3 py-1.5 rounded-2xl text-right shrink-0">
                      <p className="text-xs font-bold text-neutral-900">{item.distance}</p>
                      <p className="text-[10px] text-neutral-500">{item.time}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-2 border-y border-neutral-100 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="size-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
                        <Package className="size-4 text-brand-green" />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Estimasi Berat</span>
                        <span className="font-bold text-neutral-900">{item.estWeight}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="size-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
                        <ShieldCheck className="size-4 text-brand-green" />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Material</span>
                        <span className="font-bold text-neutral-900">{item.material}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => handleAction(item.id)}
                      className="flex-1 py-3 rounded-2xl bg-white text-neutral-800 border border-neutral-300 text-xs font-bold hover:bg-neutral-50 transition-colors"
                    >
                      Lewati
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(item.id)}
                      className="flex-1 py-3 rounded-2xl bg-brand-green text-ink text-xs font-bold hover:bg-brand-green/90 transition-colors shadow"
                    >
                      Terima
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Pickup Aktif</h2>
            <Link to="/pengepul/rute" className="text-xs font-bold text-brand-green hover:underline">
              Lihat semua &rarr;
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold">
                Antrean 1
              </span>
              <span className="text-xs text-neutral-500 font-medium">Estimasi 14:45 WIB</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-neutral-900">Ibu Ratna Dewi</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Jl. Medokan Asri Timur No. 14, Gunung Anyar</p>
            </div>

            <div className="bg-neutral-100/80 p-4 rounded-2xl flex items-center justify-between border border-neutral-200/60 text-xs">
              <div className="flex items-center gap-2 font-bold text-neutral-900">
                <Phone className="size-4 text-brand-green" /> 450m
                <span className="text-neutral-400 font-normal">(Estimasi tiba 10 menit)</span>
              </div>
              <div className="font-bold text-brand-green">
                Estimasi 4.0 kg <span className="text-neutral-500 font-normal">(Plastik & kardus)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                className="flex-1 py-3.5 rounded-2xl bg-white text-neutral-800 border border-neutral-300 text-xs font-bold hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2"
              >
                Navigasi
              </button>
              <button
                type="button"
                className="flex-1 py-3.5 rounded-2xl bg-brand-green text-ink text-xs font-bold hover:bg-brand-green/90 transition-colors shadow flex items-center justify-center gap-2"
              >
                Kontak
              </button>
            </div>
          </div>
        </div>

      </main>

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
