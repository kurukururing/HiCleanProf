import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function GeneralSettingsPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    statusPickup: false,
    scheduleReminder: true,
    pointsInfo: true,
    tipsSorting: true,
    locationAccess: false,
    cameraAccess: true
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

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

      <main className="flex-grow mx-auto w-full max-w-md px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Pengaturan</h1>

        <div className="space-y-4">
          <p className="text-xs font-bold text-neutral-500">Notifikasi</p>
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200 space-y-4">
            {[
              { key: 'statusPickup', title: 'Status Penjemputan', desc: 'Pembaruan real-time saat kurir sedang dalam perjalanan, tiba di lokasi, atau penjemputan selesai.' },
              { key: 'scheduleReminder', title: 'Pengingat Jadwal', desc: 'Pengingat agar pengguna menyiapkan dan memilah sampah sebelum jadwal penjemputan tiba.' },
              { key: 'pointsInfo', title: 'Info Poin & Hadiah', desc: 'Pemberitahuan ketika pengguna berhasil mendapatkan poin dari sampah yang disetor atau info promo penukaran' },
              { key: 'tipsSorting', title: 'Tips Pemilahan', desc: 'Pembaruan berkala berisi edukasi singkat cara memilah jenis sampah tertentu.' }
            ].map((item, idx) => {
              const active = settings[item.key];
              return (
                <div key={item.key} className={`flex items-center justify-between ${idx > 0 ? 'pt-4 border-t border-neutral-100' : ''}`}>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{item.title}</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSetting(item.key)}
                    className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${active ? 'bg-brand-green' : 'bg-neutral-300'}`}
                  >
                    <span className={`inline-block size-5 transform rounded-full bg-white shadow transition-transform mt-0.5 ml-0.5 ${active ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              );
            })}
          </div>

          <p className="text-xs font-bold text-neutral-500 pt-2">Privasi</p>
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200 space-y-4">
            {[
              { key: 'locationAccess', title: 'Akses Lokasi Akurat', desc: 'Izin untuk menggunakan GPS guna mendeteksi titik penjemputan dengan tepat.' },
              { key: 'cameraAccess', title: 'Akses Kamera/Galeri', desc: 'Pengaturan izin kamera untuk memfoto kondisi sampah sebelum dipesan atau dijemput.' }
            ].map((item, idx) => {
              const active = settings[item.key];
              return (
                <div key={item.key} className={`flex items-center justify-between ${idx > 0 ? 'pt-4 border-t border-neutral-100' : ''}`}>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{item.title}</p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSetting(item.key)}
                    className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${active ? 'bg-brand-green' : 'bg-neutral-300'}`}
                  >
                    <span className={`inline-block size-5 transform rounded-full bg-white shadow transition-transform mt-0.5 ml-0.5 ${active ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              );
            })}
          </div>
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
