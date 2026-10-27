import { useState } from 'react';
import { 
  ArrowLeft, LayoutGrid, Sparkles, Droplets, 
  Lightbulb, AlertCircle, Info, Check 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { WargaStepHeader } from '../../components/layout/WargaStepHeader';

export function SetoranStep4Page() {
  const navigate = useNavigate();

  const [conditions, setConditions] = useState({
    sorted: true,
    clean: true,
    dry: true
  });

  const toggleCondition = (key) => {
    setConditions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNext = () => {
    navigate(ROUTES.setoranStep5);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-28">
      {/* 4 of 6 Step Header */}
      <WargaStepHeader
        stepBadge="Kondisi"
        stepNumber={4}
        totalSteps={6}
        backTo={ROUTES.setoranStep3}
      />

      <main className="flex-grow mx-auto w-full max-w-md px-4 space-y-4">
        {/* Title & Description */}
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 font-heading">
            Kondisi & Kriteria Higienitas
          </h1>
          <p className="text-xs text-neutral-500 leading-relaxed font-body">
            Pastikan 3 standar sirkular terpenuhi sebelum diserahkan ke mitra pengepul agar memudahkan proses selanjutnya
          </p>
        </div>

        {/* Condition 1 */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="size-11 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                <LayoutGrid className="size-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold text-neutral-900 font-heading">
                  Sudah Dipilah Sesuai Kategori
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                  Sampah plastik sudah dipisahkan dari kertas, kardus, dan bebas dari residu berbahaya
                </p>
              </div>
            </div>

            {/* iOS Switch Toggle */}
            <button
              type="button"
              onClick={() => toggleCondition('sorted')}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                conditions.sorted ? 'bg-brand-green' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`inline-block size-6 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out mt-0.5 ${
                  conditions.sorted ? 'translate-x-5.5 ml-0' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-100">
            <Info className="size-4 text-brand-green shrink-0" />
            <span>Mencegah kontaminasi silang material difasilitas pencacah</span>
          </div>
        </div>

        {/* Condition 2 */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="size-11 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="size-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold text-neutral-900 font-heading">
                  Kondisi Bersih & Terbilas
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                  Botol dan wadah telah dibilas dari sisa minuman manis atau minyak agar tidak berbau dan mengundang lalat
                </p>
              </div>
            </div>

            {/* iOS Switch Toggle */}
            <button
              type="button"
              onClick={() => toggleCondition('clean')}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                conditions.clean ? 'bg-brand-green' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`inline-block size-6 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out mt-0.5 ${
                  conditions.clean ? 'translate-x-5.5 ml-0' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-100">
            <Info className="size-4 text-brand-green shrink-0" />
            <span>Aman dan higienis untuk ditangani oleh petugas pengepul</span>
          </div>
        </div>

        {/* Condition 3 */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="size-11 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Droplets className="size-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold text-neutral-900 font-heading">
                  Kering Tanpa Genangan Air
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                  Sudah ditiriskan kering sempurna, berat murni material daur ulang tanpa manipulasi cairan pemberat
                </p>
              </div>
            </div>

            {/* iOS Switch Toggle */}
            <button
              type="button"
              onClick={() => toggleCondition('dry')}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                conditions.dry ? 'bg-brand-green' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`inline-block size-6 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out mt-0.5 ${
                  conditions.dry ? 'translate-x-5.5 ml-0' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-100">
            <Info className="size-4 text-brand-green shrink-0" />
            <span>Akurasi timbangan terjamin dengan nilai tukar optimal</span>
          </div>
        </div>

        {/* Info Card: Mengapa Higienitas Penting? */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-4.5 text-neutral-900" />
            <h3 className="text-sm font-extrabold text-neutral-900 font-heading">
              Mengapa higienitas penting?
            </h3>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Pabrik daur ulang otomatis menolak material berjamur atau berminyak. Menjaga kebersihan sampah akan mempertahankan nilai ekonomi tinggi.
          </p>

          <div className="p-3.5 rounded-2xl bg-red-100/70 border border-red-200/80 text-red-900 text-[11px] flex items-start gap-2.5 leading-relaxed">
            <AlertCircle className="size-4 text-red-600 shrink-0 mt-0.5" />
            <span>
              <strong>Peringatan verifikasi:</strong> Material basah atau kotor berpotensi mengalami penolakan saat penimbangan sehingga akan dialihkan ke status &quot;Diterima Sebagian&quot;.
            </span>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
        <div className="mx-auto max-w-md flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(ROUTES.setoranStep3)}
            className="text-xs font-bold text-neutral-700 hover:text-neutral-900 flex items-center gap-1.5 px-3 py-2 cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            <span>Kembali</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-4 px-6 rounded-full bg-neutral-900 hover:bg-black text-white text-xs sm:text-sm font-extrabold shadow-md active:scale-[0.99] transition-all cursor-pointer text-center"
          >
            Lanjut (Langkah 5 /6)
          </button>
        </div>
      </div>
    </div>
  );
}
