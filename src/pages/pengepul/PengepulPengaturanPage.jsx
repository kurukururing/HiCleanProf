import { useState } from 'react';
import { ArrowLeft, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { siteConfig } from '../../config/siteConfig';

export function PengepulPengaturanPage() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    statusPenjemputan: false,
    pengingatJadwal: true,
    infoPoin: true,
    tipsPemilahan: true,
    biometrik: false,
    verifikasi2Langkah: true
  });

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-16">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulProfile)}
            className="size-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green/90 transition-transform active:scale-95 shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>

          <h1 className="text-base font-extrabold text-neutral-900">Pengaturan</h1>

          <Link
            to={ROUTES.pengepulDashboard}
            className="size-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          >
            <Menu className="size-4" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow mx-auto w-full max-w-md px-4 py-5 space-y-6">
        
        {/* Notifikasi Section */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold text-neutral-900">Notifikasi</h2>

          <div className="space-y-3">
            {/* Status Penjemputan */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold text-neutral-900">Status Penjemputan</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Pembaruan real-time saat kurir sedang dalam perjalanan, tiba di lokasi, atau penjemputan selesai.
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggle('statusPenjemputan')}
                className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 mt-0.5 ${
                  settings.statusPenjemputan ? 'bg-brand-green' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`size-5 rounded-full bg-white shadow-md transition-transform ${
                    settings.statusPenjemputan ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Pengingat Jadwal */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold text-neutral-900">Pengingat Jadwal</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Pengingat agar pengguna menyiapkan dan memilah sampah sebelum jadwal penjemputan tiba.
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggle('pengingatJadwal')}
                className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 mt-0.5 ${
                  settings.pengingatJadwal ? 'bg-brand-green' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`size-5 rounded-full bg-white shadow-md transition-transform ${
                    settings.pengingatJadwal ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Info Poin & Hadiah */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold text-neutral-900">Info Poin & Hadiah</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Pemberitahuan ketika pengguna berhasil mendapatkan poin dari sampah yang disetor atau info promo penukaran
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggle('infoPoin')}
                className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 mt-0.5 ${
                  settings.infoPoin ? 'bg-brand-green' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`size-5 rounded-full bg-white shadow-md transition-transform ${
                    settings.infoPoin ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Tips Pemilahan */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold text-neutral-900">Tips Pemilahan</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Pembaruan berkala berisi edukasi singkat cara memilah jenis sampah tertentu.
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggle('tipsPemilahan')}
                className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 mt-0.5 ${
                  settings.tipsPemilahan ? 'bg-brand-green' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`size-5 rounded-full bg-white shadow-md transition-transform ${
                    settings.tipsPemilahan ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Autentikasi Section */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold text-neutral-900">Autentikasi</h2>

          <div className="space-y-3">
            {/* Biometrik */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold text-neutral-900">Biometrik</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Masuk cepat tanpa menggunakan password dan verifikasi instan
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggle('biometrik')}
                className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 mt-0.5 ${
                  settings.biometrik ? 'bg-brand-green' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`size-5 rounded-full bg-white shadow-md transition-transform ${
                    settings.biometrik ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Verifikasi 2 langkah */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold text-neutral-900">Verifikasi 2 langkah</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Kirimkan kode OTP melalui whatsapp kenomor yang sudah terdaftar saat ada perangkat tidak dikenal
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggle('verifikasi2Langkah')}
                className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 mt-0.5 ${
                  settings.verifikasi2Langkah ? 'bg-brand-green' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`size-5 rounded-full bg-white shadow-md transition-transform ${
                    settings.verifikasi2Langkah ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
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

