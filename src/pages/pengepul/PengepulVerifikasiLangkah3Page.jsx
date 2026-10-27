import { useState } from 'react';
import { ArrowLeft, Upload, Check, Camera, Plus, X, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PengepulStepHeader } from '../../components/pengepul/PengepulStepHeader';
import { ROUTES } from '../../routes';

export function PengepulVerifikasiLangkah3Page() {
  const navigate = useNavigate();

  // Selected decision: 'penuh' | 'sebagian' | 'ditolak'
  const [keputusan, setKeputusan] = useState('penuh');

  // Multi-select reasons
  const [selectedReasons, setSelectedReasons] = useState([]);

  // Official notes
  const [catatan, setCatatan] = useState('');

  // Attached photo simulation
  const [attachedPhoto, setAttachedPhoto] = useState(null);

  const availableReasons = [
    'Kadar air tinggi',
    'Belum pipih',
    'Bekas minyak',
    'Tercampur sampah organik'
  ];

  const toggleReason = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAttachedPhoto(url);
    }
  };

  const handleNext = () => {
    // Pass state or navigate to Langkah 4
    navigate(ROUTES.pengepulVerifikasiLangkah4 || '/pengepul/verifikasi/langkah-4', {
      state: {
        keputusan,
        selectedReasons,
        catatan,
        attachedPhoto
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#1a1d1b] flex flex-col font-sans pb-28">
      <PengepulStepHeader backTo={ROUTES.pengepulVerifikasiLangkah2 || '/pengepul/verifikasi/langkah-2'} />

      <main className="mx-auto w-full max-w-md px-4 py-2 space-y-4">
        {/* Stepper Card */}
        <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-[#E5F8ED] text-emerald-800 text-xs font-semibold">
              Status
            </span>
            <span className="text-xs font-bold text-neutral-800 font-heading">
              Langkah 3 dari 4
            </span>
          </div>

          {/* 4 Segment Progress Bar (3 segments green) */}
          <div className="grid grid-cols-4 gap-2">
            <div className="h-1.5 rounded-full bg-brand-green" />
            <div className="h-1.5 rounded-full bg-brand-green" />
            <div className="h-1.5 rounded-full bg-brand-green" />
            <div className="h-1.5 rounded-full bg-neutral-200" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 font-heading">
            Status Penerimaan
          </h1>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Tentukan keputusan verifikasi mutu akhir yang diberikan pada sampah yang telah dicek.
          </p>
        </div>

        {/* Keputusan Verifikasi Mutu */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-900 font-heading">
              Keputusan Verifikasi Mutu
            </h2>
            <span className="text-[11px] text-neutral-400">Pilih 1 opsi</span>
          </div>

          <div className="space-y-2.5">
            {/* Opsi 1: Diterima Penuh */}
            <div
              onClick={() => setKeputusan('penuh')}
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-start gap-3 ${
                keputusan === 'penuh'
                  ? 'bg-white border-brand-green shadow-sm ring-1 ring-brand-green/30'
                  : 'bg-white border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div
                className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  keputusan === 'penuh'
                    ? 'border-brand-green'
                    : 'border-neutral-300'
                }`}
              >
                {keputusan === 'penuh' && (
                  <div className="size-2.5 rounded-full bg-brand-green" />
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold text-neutral-900">
                  Diterima Penuh
                </p>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Seluruh material lolos uji kelayakan, bersih, dan tanpa kontaminasi dari cairan lainnya.
                </p>
              </div>
            </div>

            {/* Opsi 2: Diterima Sebagian */}
            <div
              onClick={() => setKeputusan('sebagian')}
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-start gap-3 ${
                keputusan === 'sebagian'
                  ? 'bg-white border-brand-green shadow-sm ring-1 ring-brand-green/30'
                  : 'bg-white border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div
                className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  keputusan === 'sebagian'
                    ? 'border-brand-green'
                    : 'border-neutral-300'
                }`}
              >
                {keputusan === 'sebagian' && (
                  <div className="size-2.5 rounded-full bg-brand-green" />
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold text-neutral-900">
                  Diterima Sebagian
                </p>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Beberapa material memenuhi standar, namun ada yang memerlukan perbaikan atau pengujian lebih lanjut.
                </p>
              </div>
            </div>

            {/* Opsi 3: Ditolak */}
            <div
              onClick={() => setKeputusan('ditolak')}
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-start gap-3 ${
                keputusan === 'ditolak'
                  ? 'bg-white border-red-500 shadow-sm ring-1 ring-red-500/30'
                  : 'bg-white border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div
                className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  keputusan === 'ditolak'
                    ? 'border-red-500'
                    : 'border-neutral-300'
                }`}
              >
                {keputusan === 'ditolak' && (
                  <div className="size-2.5 rounded-full bg-red-500" />
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold text-neutral-900">
                  Ditolak
                </p>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Material tidak memenuhi kriteria yang ditetapkan dan harus dikembalikan untuk diperbaiki atau diganti.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Catatan Alasan Card */}
        <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-4">
          <h2 className="text-sm font-bold text-neutral-900 font-heading">
            Catatan Alasan
          </h2>

          {/* Multi-select Reason Pills */}
          <div className="space-y-2">
            <p className="text-[11px] text-neutral-500 font-medium">
              Pilih kategori Alasan (Multi pilih)
            </p>
            <div className="flex flex-wrap gap-2">
              {availableReasons.map((reason) => {
                const isSelected = selectedReasons.includes(reason);
                return (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => toggleReason(reason)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-brand-green text-ink shadow-2xs font-bold'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <span>{isSelected ? '✓' : '+'}</span>
                    <span>{reason}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lampiran Foto */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-neutral-500 font-medium">
                Lampiran Foto Bukti
              </p>
              <button
                type="button"
                onClick={() => navigate(ROUTES.pengepulVerifikasiFoto || '/pengepul/verifikasi/foto')}
                className="text-[11px] text-brand-green font-bold hover:underline flex items-center gap-1"
              >
                <Camera className="size-3.5" /> Buka Kamera
              </button>
            </div>

            {attachedPhoto ? (
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 aspect-video">
                <img
                  src={attachedPhoto}
                  alt="Lampiran"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setAttachedPhoto(null)}
                  className="absolute top-2 right-2 size-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-neutral-300 hover:border-brand-green/60 bg-neutral-50 hover:bg-emerald-50/30 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-center space-y-1.5">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="size-10 rounded-xl bg-neutral-200 text-neutral-600 flex items-center justify-center">
                  <Upload className="size-5" />
                </div>
                <span className="text-xs font-bold text-neutral-700">
                  Unggah foto atau file
                </span>
                <span className="text-[10px] text-neutral-400">
                  PNG, JPG hingga 5MB
                </span>
              </label>
            )}
          </div>

          {/* Catatan resmi petugas */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-neutral-700 font-bold block">
              Catatan resmi petugas:
            </label>
            <textarea
              rows={2}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Contoh: Barang bersih dan siap diproses"
              className="w-full rounded-2xl bg-neutral-100 border border-neutral-200 px-3.5 py-2.5 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 resize-none"
            />
          </div>
        </div>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="mx-auto max-w-md flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulVerifikasiLangkah2 || '/pengepul/verifikasi/langkah-2')}
            className="flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Kembali</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-3 px-5 rounded-2xl bg-brand-green text-ink text-xs sm:text-sm font-extrabold hover:bg-brand-green/90 transition-all shadow-md active:scale-[0.99] text-center"
          >
            Lanjut (Langkah 4 /4)
          </button>
        </div>
      </div>
    </div>
  );
}

