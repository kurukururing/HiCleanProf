import { useState } from 'react';
import { ArrowLeft, Check, Recycle, Info, AlertTriangle, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PengepulStepHeader } from '../../components/pengepul/PengepulStepHeader';
import { Lightbox } from '../../components/ui/Lightbox';
import { ROUTES } from '../../routes';

export function PengepulVerifikasiLangkah1Page() {
  const navigate = useNavigate();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Checklist state
  const [checks, setChecks] = useState({
    pipih: true,
    tutup: true,
    kering: true
  });

  const toggleCheck = (key) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecked = checks.pipih && checks.tutup && checks.kering;
  const anyChecked = checks.pipih || checks.tutup || checks.kering;

  const handleNext = () => {
    navigate(ROUTES.pengepulVerifikasiLangkah2 || '/pengepul/verifikasi/langkah-2');
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#1a1d1b] flex flex-col font-sans pb-28">
      <PengepulStepHeader 
        title="Verifikasi Fisik"
        backTo={ROUTES.pengepulVerifikasi || '/pengepul/verifikasi'} 
      />

      <main className="mx-auto w-full max-w-md px-4 py-2 space-y-4">
        {/* Stepper Card */}
        <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-[#E5F8ED] text-emerald-800 text-xs font-semibold">
              Kondisi Material
            </span>
            <span className="text-xs font-bold text-neutral-800 font-heading">
              Langkah 1 dari 4
            </span>
          </div>

          {/* 4 Segment Progress Bar */}
          <div className="grid grid-cols-4 gap-2">
            <div className="h-1.5 rounded-full bg-brand-green" />
            <div className="h-1.5 rounded-full bg-neutral-200" />
            <div className="h-1.5 rounded-full bg-neutral-200" />
            <div className="h-1.5 rounded-full bg-neutral-200" />
          </div>
        </div>

        {/* Header Text */}
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 font-heading">
            Kondisi Fisik Sampah
          </h1>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Periksa kecocokan fisik sampel sampah dengan foto bukti yang diunggah warga
          </p>
        </div>

        {/* Main Verification Card */}
        <div className="rounded-3xl bg-white p-5 shadow-xs border border-neutral-200/80 space-y-4">
          {/* Material Category Header */}
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-[#E5F8ED] text-brand-green flex items-center justify-center shrink-0">
              <Recycle className="size-6 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-neutral-900">
                Botol Plastik PET
              </h2>
              <p className="text-[11px] text-neutral-500">
                Botol plastik air mineral dan minyak bekas
              </p>
            </div>
          </div>

          {/* Material Image with Lightbox preview */}
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="relative rounded-2xl overflow-hidden aspect-video border border-neutral-200 shadow-2xs cursor-pointer group"
          >
            <img
              src="/verifikasi_pengepul/Foto.jpg"
              alt="Botol Plastik PET"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=600&auto=format&fit=crop&q=80';
              }}
            />
            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1">
              <Eye className="size-3" /> Foto Bukti Warga
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold">
                Perbesar Foto
              </span>
            </div>
          </div>

          {/* Physical Verification Checklist */}
          <div className="space-y-2.5 pt-1">
            <p className="text-xs font-bold text-neutral-800">
              Hasil Verifikasi Fisik:
            </p>

            {/* Checkbox 1 */}
            <button
              type="button"
              onClick={() => toggleCheck('pipih')}
              className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                checks.pipih
                  ? 'bg-[#E5F8ED] border-brand-green/40 text-neutral-900'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600'
              }`}
            >
              <div
                className={`size-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                  checks.pipih
                    ? 'bg-brand-green border-brand-green text-ink'
                    : 'bg-white border-neutral-300'
                }`}
              >
                {checks.pipih && <Check className="size-3.5 stroke-[3]" />}
              </div>
              <span className="text-xs font-semibold">
                Botol Sudah dipipihkan
              </span>
            </button>

            {/* Checkbox 2 */}
            <button
              type="button"
              onClick={() => toggleCheck('tutup')}
              className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                checks.tutup
                  ? 'bg-[#E5F8ED] border-brand-green/40 text-neutral-900'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600'
              }`}
            >
              <div
                className={`size-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                  checks.tutup
                    ? 'bg-brand-green border-brand-green text-ink'
                    : 'bg-white border-neutral-300'
                }`}
              >
                {checks.tutup && <Check className="size-3.5 stroke-[3]" />}
              </div>
              <span className="text-xs font-semibold">
                Tutup botol sudah dipisahkan
              </span>
            </button>

            {/* Checkbox 3 */}
            <button
              type="button"
              onClick={() => toggleCheck('kering')}
              className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                checks.kering
                  ? 'bg-[#E5F8ED] border-brand-green/40 text-neutral-900'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600'
              }`}
            >
              <div
                className={`size-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                  checks.kering
                    ? 'bg-brand-green border-brand-green text-ink'
                    : 'bg-white border-neutral-300'
                }`}
              >
                {checks.kering && <Check className="size-3.5 stroke-[3]" />}
              </div>
              <span className="text-xs font-semibold">
                Kering & bebas dari sisa cairan manis/minyak
              </span>
            </button>
          </div>

          {/* Validation Feedback */}
          {!allChecked && (
            <div className="flex items-start gap-2 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
              <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Catatan: Kriteria fisik yang belum terpenuhi dapat memengaruhi status penerimaan mutu pada langkah berikutnya.
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox for citizen photo */}
      {isLightboxOpen && (
        <Lightbox
          src="/verifikasi_pengepul/Foto.jpg"
          alt="Foto Bukti Warga"
          onClose={() => setIsLightboxOpen(false)}
        />
      )}

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 px-4 pt-3.5 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="mx-auto max-w-md flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(ROUTES.pengepulVerifikasi || '/pengepul/verifikasi')}
            className="flex items-center gap-1.5 px-4 py-3 rounded-2xl text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            <span>Kembali</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-3.5 px-5 rounded-2xl bg-brand-green text-ink text-xs sm:text-sm font-extrabold hover:brightness-105 transition-all shadow-md active:scale-[0.99] text-center cursor-pointer"
          >
            Lanjut (Langkah 2 /4)
          </button>
        </div>
      </div>
    </div>
  );
}

