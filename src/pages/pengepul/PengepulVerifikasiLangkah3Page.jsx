import { useState, useEffect } from 'react';
import { ArrowLeft, Upload, Check, Camera, Plus, X, Image as ImageIcon, Eye, RefreshCw } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PengepulStepHeader } from '../../components/pengepul/PengepulStepHeader';
import { Lightbox } from '../../components/ui/Lightbox';
import { ROUTES } from '../../routes';

export function PengepulVerifikasiLangkah3Page() {
  const navigate = useNavigate();
  const location = useLocation();

  // Selected decision: 'penuh' | 'sebagian' | 'ditolak'
  const [keputusan, setKeputusan] = useState(location.state?.keputusan || 'penuh');

  // Multi-select reasons
  const [selectedReasons, setSelectedReasons] = useState(location.state?.selectedReasons || []);

  // Official notes
  const [catatan, setCatatan] = useState(location.state?.catatan || '');

  // Attached photo: preserve from camera page or upload
  const [attachedPhoto, setAttachedPhoto] = useState(
    location.state?.attachedPhoto || '/verifikasi_pengepul/Foto.jpg'
  );

  // Lightbox view
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (location.state?.attachedPhoto) {
      setAttachedPhoto(location.state.attachedPhoto);
    }
  }, [location.state?.attachedPhoto]);

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

  const handleOpenCamera = () => {
    navigate(ROUTES.pengepulVerifikasiFoto || '/pengepul/verifikasi/foto', {
      state: {
        from: ROUTES.pengepulVerifikasiLangkah3 || '/pengepul/verifikasi/langkah-3',
        keputusan,
        selectedReasons,
        catatan,
        attachedPhoto
      }
    });
  };

  const handleNext = () => {
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
      <PengepulStepHeader 
        title="Verifikasi Mutu"
        backTo={ROUTES.pengepulVerifikasiLangkah2 || '/pengepul/verifikasi/langkah-2'} 
      />

      <main className="mx-auto w-full max-w-md px-4 py-2 space-y-4">
        {/* Stepper Card */}
        <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-[#E5F8ED] text-emerald-800 text-xs font-semibold">
              Status Penerimaan
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
            Tentukan keputusan verifikasi mutu akhir dan lampirkan foto bukti kondisi fisik sampah.
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
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                keputusan === 'penuh'
                  ? 'bg-white border-brand-green shadow-sm ring-2 ring-brand-green/20'
                  : 'bg-white border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div
                className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  keputusan === 'penuh'
                    ? 'border-brand-green bg-brand-green'
                    : 'border-neutral-300'
                }`}
              >
                {keputusan === 'penuh' && (
                  <Check className="size-3 text-ink stroke-[3]" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs sm:text-sm font-bold text-neutral-900">
                    Diterima Penuh
                  </p>
                  <span className="px-2 py-0.5 rounded-full bg-brand-green/15 text-emerald-800 text-[10px] font-extrabold">
                    Rekomendasi
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Seluruh material lolos uji kelayakan, bersih, dan tanpa kontaminasi dari cairan lainnya.
                </p>
              </div>
            </div>

            {/* Opsi 2: Diterima Sebagian */}
            <div
              onClick={() => setKeputusan('sebagian')}
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                keputusan === 'sebagian'
                  ? 'bg-white border-amber-500 shadow-sm ring-2 ring-amber-500/20'
                  : 'bg-white border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div
                className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  keputusan === 'sebagian'
                    ? 'border-amber-500 bg-amber-500'
                    : 'border-neutral-300'
                }`}
              >
                {keputusan === 'sebagian' && (
                  <Check className="size-3 text-white stroke-[3]" />
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
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                keputusan === 'ditolak'
                  ? 'bg-white border-red-500 shadow-sm ring-2 ring-red-500/20'
                  : 'bg-white border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div
                className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  keputusan === 'ditolak'
                    ? 'border-red-500 bg-red-500'
                    : 'border-neutral-300'
                }`}
              >
                {keputusan === 'ditolak' && (
                  <Check className="size-3 text-white stroke-[3]" />
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
            Catatan Alasan Mutu
          </h2>

          {/* Multi-select Reason Pills */}
          <div className="space-y-2">
            <p className="text-[11px] text-neutral-500 font-medium">
              Pilih kategori alasan (bisa pilih lebih dari satu):
            </p>
            <div className="flex flex-wrap gap-2">
              {availableReasons.map((reason) => {
                const isSelected = selectedReasons.includes(reason);
                return (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => toggleReason(reason)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-brand-green text-ink shadow-2xs font-extrabold ring-1 ring-brand-green/40'
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

          {/* Lampiran Foto Bukti */}
          <div className="space-y-2.5 pt-1 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-neutral-700 font-bold block">
                Lampiran Foto Bukti Fisik
              </span>
              <button
                type="button"
                onClick={handleOpenCamera}
                className="text-xs text-emerald-800 bg-brand-green/15 hover:bg-brand-green/25 font-bold px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors"
              >
                <Camera className="size-3.5 text-brand-green" /> 
                <span>{attachedPhoto ? 'Ambil Ulang' : 'Buka Kamera'}</span>
              </button>
            </div>

            {attachedPhoto ? (
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 shadow-sm aspect-video group">
                <img
                  src={attachedPhoto}
                  alt="Lampiran Bukti Fisik"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                />

                {/* Top overlay info badge */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold flex items-center gap-1">
                  <Check className="size-3 text-brand-green stroke-[3]" /> Terlampir
                </div>

                {/* Floating action buttons */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="size-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                    title="Lihat Penuh"
                  >
                    <Eye className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttachedPhoto(null)}
                    className="size-8 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                    title="Hapus Foto"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Bottom re-take banner */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 flex items-center justify-between text-white text-xs">
                  <span className="text-[11px] text-neutral-300 font-medium truncate">
                    Foto sampel verifikasi siap disetor
                  </span>
                  <button
                    type="button"
                    onClick={handleOpenCamera}
                    className="text-[11px] font-bold text-brand-green hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="size-3" /> Foto Ulang
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleOpenCamera}
                  className="border-2 border-dashed border-neutral-300 hover:border-brand-green bg-neutral-50 hover:bg-emerald-50/30 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors text-center space-y-1"
                >
                  <div className="size-9 rounded-xl bg-brand-green/15 text-brand-green flex items-center justify-center">
                    <Camera className="size-4.5" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800">
                    Buka Kamera
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    Jepret langsung
                  </span>
                </button>

                <label className="border-2 border-dashed border-neutral-300 hover:border-brand-green bg-neutral-50 hover:bg-emerald-50/30 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors text-center space-y-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="size-9 rounded-xl bg-neutral-200 text-neutral-700 flex items-center justify-center">
                    <Upload className="size-4.5" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800">
                    Unggah File
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    Dari galeri HP
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Catatan resmi petugas */}
          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] text-neutral-700 font-bold block">
              Catatan Resmi Petugas Lapangan:
            </label>
            <textarea
              rows={2}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Contoh: Barang bersih dan siap diproses"
              className="w-full rounded-2xl bg-neutral-50 border border-neutral-200 px-3.5 py-2.5 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 resize-none transition-all"
            />
          </div>
        </div>
      </main>

      {/* Lightbox for Previewing Attached Photo */}
      {isLightboxOpen && attachedPhoto && (
        <Lightbox
          src={attachedPhoto}
          alt="Foto Sampel Terverifikasi"
          onClose={() => setIsLightboxOpen(false)}
        />
      )}

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
