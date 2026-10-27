import { useState } from 'react';
import { ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export function GabungPickupStep3Page() {
  const navigate = useNavigate();
  const [checks, setChecks] = useState({
    clean: true,
    dry: true,
    sorted: true,
    noHazard: false
  });

  const toggle = (key) => setChecks({ ...checks, [key]: !checks[key] });

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
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-700">
            <span className="px-3 py-1 rounded-full bg-neutral-200 text-neutral-800">Higienitas</span>
            <span>Langkah 3 dari 4</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 h-1.5">
            <div className="bg-brand-green rounded-full h-full" />
            <div className="bg-brand-green rounded-full h-full" />
            <div className="bg-brand-green rounded-full h-full" />
            <div className="bg-neutral-200 rounded-full h-full" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">Cek Higienitas & Syarat</h1>
          <p className="text-xs text-neutral-600 mt-1">Sampah yang bersih & memenuhi syarat bernilai poin 2x lebih tinggi</p>
        </div>

        <div className="space-y-3">
          {[
            { id: 'clean', title: 'Bebas dari sisa makanan/cairan', desc: 'Sudah dibilas air bersih dan dikeringkan minimal 1 jam' },
            { id: 'dry', title: 'Kondisi kering & tidak berbau', desc: 'Tidak ada jamur atau potensi menarik serangga/lalat' },
            { id: 'sorted', title: 'Sudah dipisahkan per jenis', desc: 'Tidak tercampur bahan organik atau sampah rumah tangga' },
            { id: 'noHazard', title: 'Bebas jarum suntik, kaca tajam & B3', desc: 'Potensi bahaya telah disingkirkan dari kantong setoran' }
          ].map((item) => {
            const active = checks[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggle(item.id)}
                className={`w-full text-left p-4 rounded-3xl border transition-all flex items-start justify-between gap-3 ${
                  active ? 'bg-white border-brand-green shadow-sm ring-2 ring-brand-green/20' : 'bg-white border-neutral-200'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-neutral-900">{item.title}</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
                <div className={`size-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                  active ? 'bg-brand-green border-brand-green text-ink' : 'border-neutral-300'
                }`}>
                  {active && <CheckCircle2 className="size-4" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-800 text-xs">
          <ShieldAlert className="size-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Kurir berhak menolak atau mengurangi poin jika kedapatan sampah basah, bercampur, atau mengandung limbah B3 berbahaya.
          </p>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-4 rounded-2xl bg-white text-neutral-800 border border-neutral-300 text-xs font-bold hover:bg-neutral-50 transition-colors"
          >
            &larr; Kembali
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/gabung-pickup/langkah-4')}
            className="flex-[2] py-4 rounded-2xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-lg"
          >
            Lanjut (Langkah 3/4)
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
