import { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, XCircle, Sparkles, BookOpen, ShieldCheck, ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

export class TipsPage {}

export function TipsPageImpl() {
  const navigate = useNavigate();

  const tipDetail = {
    categoryBadge: 'Kategori Plastik - Kode #1 PET',
    headline: 'Panduan Pilah : Botol Plastik & PET',
    subDesc: 'Daur ulang bernilai tinggi di Bank Sampah HiClean. Pastikan bersih & pipih agar diterima 100% tanpa adanya pengurangan',
    anatomy: {
      title: 'Anatomi Botol Plastik',
      parts: [
        { name: 'Badan', desc: 'Bersihkan, dan bilas sampe bersih', bg: 'bg-brand-green text-ink' },
        { name: 'Tutup botol', desc: 'Boleh dibiarkan atau dicopot', bg: 'bg-brand-green text-ink' },
        { name: 'Label', desc: 'Lepaskan untuk kemudahan proses', bg: 'bg-brand-green text-ink' }
      ]
    },
    criteria: {
      title: 'Kriteria Pemeriksaan Pengepul',
      accepted: [
        { title: 'Botol Air Mineral Bening', desc: 'Wadah air minuman kemasan polos, bebas pasir, dan lumpur' },
        { title: 'Botol Air Mineral Berwarna', desc: 'Wadah air minuman kemasan dengan variasi warna, menambah daya tarik visual.' },
        { title: 'Botol Air Mineral Resealable', desc: 'Wadah air minuman kemasan yang dapat ditutup kembali, menjaga kesegaran air lebih lama.' }
      ],
      rejected: [
        { title: 'Botol Bekas Minyak Goreng', desc: 'Minyak jelantah akan merusak mesin pencacah plastik daur ulang' },
        { title: 'Kardus Bekas', desc: 'Kardus dapat didaur ulang menjadi produk kertas baru dan membantu mengurangi limbah.' },
        { title: 'Kaca Bekas', desc: 'Botol dan gelas kaca dapat didaur ulang tanpa mengurangi kualitasnya, menghemat energi dan sumber daya.' }
      ]
    },
    steps: [
      { num: 1, title: 'Kosongkan Sisa Cairan', desc: 'Tuang tuntas tetesan air. Pengepul tidak akan menghitung volume tambahan dari cairan yang masih tersisa' },
      { num: 2, title: 'Bersihkan Area Kerja', desc: 'Pastikan area kerja bebas dari kotoran dan bahan berbahaya sebelum memulai pengumpulan.' },
      { num: 3, title: 'Periksa Kualitas Cairan', desc: 'Lakukan pemeriksaan untuk memastikan cairan memenuhi standar yang ditetapkan.' },
      { num: 4, title: 'Simpan dalam Wadah yang Sesuai', desc: 'Gunakan wadah yang sudah disetujui dan sesuai untuk penyimpanan cairan.' }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
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

      <main className="flex-grow mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 space-y-6">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-neutral-200 text-neutral-800 text-[11px] font-bold mb-2">
            {tipDetail.categoryBadge}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">{tipDetail.headline}</h1>
          <p className="text-xs text-neutral-600 mt-2 leading-relaxed">{tipDetail.subDesc}</p>
        </div>

        {/* Anatomi Botol Plastik Card */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <h2 className="text-base font-bold text-neutral-900">{tipDetail.anatomy.title}</h2>
          
          <div className="relative h-60 sm:h-72 w-full rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center p-4">
            {/* Bottle Mockup Illustration */}
            <div className="relative h-full flex flex-col items-center justify-center">
              <div className="w-6 h-8 bg-blue-300 rounded-t-md border border-blue-400" />
              <div className="w-10 h-16 bg-blue-100/80 rounded-lg border border-blue-200 shadow-inner flex items-center justify-center text-[10px] text-neutral-400 font-mono">PET</div>
              <div className="w-16 h-32 bg-blue-100/50 rounded-xl border border-blue-200/80 shadow-md" />
            </div>

            {/* Floating annotations matching the reference image layout */}
            <div className="absolute top-6 right-4 bg-brand-green text-ink px-3 py-2 rounded-2xl shadow text-xs font-bold max-w-[140px]">
              Tutup botol <span className="block text-[10px] font-normal opacity-90">Boleh dibiarkan atau dicopot</span>
            </div>

            <div className="absolute bottom-6 left-4 bg-brand-green text-ink px-3 py-2 rounded-2xl shadow text-xs font-bold max-w-[140px]">
              Badan <span className="block text-[10px] font-normal opacity-90">Bersihkan, dan bilas sampe bersih</span>
            </div>

            <div className="absolute bottom-16 right-4 bg-brand-green text-ink px-3 py-2 rounded-2xl shadow text-xs font-bold max-w-[140px]">
              Label <span className="block text-[10px] font-normal opacity-90">Lepaskan untuk kemudahan proses</span>
            </div>
          </div>
        </div>

        {/* Kriteria Pemeriksaan Pengepul */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-neutral-200 space-y-4">
          <h2 className="text-base font-bold text-neutral-900">{tipDetail.criteria.title}</h2>

          <div className="space-y-3">
            {tipDetail.criteria.accepted.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-brand-green/5 border border-brand-green/20">
                <CheckCircle2 className="size-5 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-neutral-900">{item.title}</p>
                  <p className="text-[11px] text-neutral-600 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}

            {tipDetail.criteria.rejected.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-red-50/50 border border-red-200/60">
                <XCircle className="size-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-neutral-900">{item.title}</p>
                  <p className="text-[11px] text-neutral-600 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Langkah Olah di Rumah */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-neutral-900 tracking-tight">4 Langkah Olah di Rumah</h2>

          <div className="space-y-3">
            {tipDetail.steps.map((st) => (
              <div key={st.num} className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/85 flex items-start gap-4">
                <div className="size-10 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center font-bold text-sm shrink-0">
                  {st.num}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">{st.title}</h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <footer className="bg-white border-t border-neutral-200 mt-12 py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
