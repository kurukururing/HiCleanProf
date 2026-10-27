import { useState, useRef } from 'react';
import { 
  ArrowLeft, Scale, Plus, Minus, Upload, 
  CheckCircle2, Image as ImageIcon, ChevronDown, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { WargaStepHeader } from '../../components/layout/WargaStepHeader';

export function SetoranStep3Page() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [subMaterial, setSubMaterial] = useState('Plastik PET (Bening)');
  const [weight, setWeight] = useState(4.5);
  const [itemCount, setItemCount] = useState(15);
  const [photoPreview, setPhotoPreview] = useState(null);

  const subMaterialOptions = [
    'Plastik PET (Bening)',
    'Plastik HDPE (Botol Shampo / Detergen)',
    'Kardus Box Bersih',
    'Kertas Arsip & HVS',
    'Kaleng Minuman Aluminium',
    'Botol Kaca & Beling'
  ];

  const handleWeightChange = (delta) => {
    setWeight((prev) => Math.max(1, +(prev + delta).toFixed(1)));
  };

  const handleItemCountChange = (delta) => {
    setItemCount((prev) => Math.max(1, prev + delta));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const handleNext = () => {
    navigate(ROUTES.setoranStep4);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-28">
      {/* 3 of 6 Step Header */}
      <WargaStepHeader
        stepBadge="Detail"
        stepNumber={3}
        totalSteps={6}
        backTo={ROUTES.setoranStep2}
      />

      <main className="flex-grow mx-auto w-full max-w-md px-4 space-y-4">
        {/* Card 1: Detail & Spesifikasi Material */}
        <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-neutral-200/80 space-y-5">
          {/* Sub Material Dropdown */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-extrabold text-neutral-900 font-heading">
              Jenis Sub–Material
            </h2>
            <p className="text-xs text-neutral-500">
              Pilih spesifikasi plastik agar estimasi daur ulang tepat
            </p>
            <div className="relative pt-1">
              <select
                value={subMaterial}
                onChange={(e) => setSubMaterial(e.target.value)}
                className="w-full appearance-none rounded-2xl bg-neutral-50 border border-neutral-200 px-4 py-3.5 text-xs font-bold text-neutral-800 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
              >
                {subMaterialOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-neutral-500 mt-0.5" />
            </div>
          </div>

          {/* Perkiraan Berat Total */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-extrabold text-neutral-900 font-heading">
                Perkiraan Berat Total
              </label>
              <span className="text-neutral-500 text-[11px] font-medium">
                Minimal 1 kg
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-200/70 border border-neutral-200/80">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-white text-neutral-700 flex items-center justify-center shadow-2xs">
                  <Scale className="size-5 text-neutral-700" />
                </div>
                <span className="text-base font-extrabold text-neutral-900 font-heading">
                  {weight} kg
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleWeightChange(-0.5)}
                  className="size-8 rounded-full bg-white hover:bg-neutral-100 text-neutral-800 flex items-center justify-center shadow-2xs transition-transform active:scale-90 cursor-pointer"
                >
                  <Minus className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleWeightChange(0.5)}
                  className="size-8 rounded-full bg-neutral-900 hover:bg-black text-white flex items-center justify-center shadow-2xs transition-transform active:scale-90 cursor-pointer"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Estimasi Jumlah Satuan */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-200/70 border border-neutral-200/80">
            <div>
              <p className="text-xs font-extrabold text-neutral-900">
                Estimasi Jumlah
              </p>
              <p className="text-[11px] text-neutral-500">
                Membantu kalkulasi daya muat
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleItemCountChange(-1)}
                className="size-7 rounded-full bg-white text-neutral-800 flex items-center justify-center shadow-2xs transition-transform active:scale-90 cursor-pointer"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-10 text-center font-extrabold text-sm text-neutral-900 font-mono">
                {itemCount}
              </span>
              <button
                type="button"
                onClick={() => handleItemCountChange(1)}
                className="size-7 rounded-full bg-white text-neutral-800 flex items-center justify-center shadow-2xs transition-transform active:scale-90 cursor-pointer"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Foto Bukti Sampah */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-extrabold text-neutral-900 font-heading">
              Foto Bukti Sampah
            </h3>
            <p className="text-[11px] text-neutral-500">
              Verifikasi visual untuk percepatan sortir di bank sampah
            </p>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 rounded-2xl bg-neutral-200/60 border-2 border-dashed border-neutral-300 hover:border-brand-green/60 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden p-2"
            >
              {photoPreview ? (
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <img
                    src={photoPreview}
                    alt="Bukti Sampah"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xs font-bold">
                    Klik untuk ubah foto
                  </div>
                </div>
              ) : (
                <>
                  <div className="size-10 rounded-2xl bg-white text-neutral-600 flex items-center justify-center shadow-2xs">
                    <Upload className="size-5" />
                  </div>
                  <span className="text-xs font-bold text-neutral-700">
                    Unggah foto atau file
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: Kondisi Material (3 Green Badges) */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200/80 space-y-3">
          <div>
            <h3 className="text-xs font-extrabold text-neutral-900 font-heading">
              Kondisi Material
            </h3>
            <p className="text-[11px] text-neutral-500">
              Pastikan 3 syarat higienitas sebelum dijemput pengepul:
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Syarat 1 */}
            <div className="p-3 rounded-2xl bg-brand-green text-ink flex flex-col items-center justify-center text-center gap-1.5 shadow-2xs">
              <div className="size-6 rounded-full bg-white text-brand-green flex items-center justify-center shadow-2xs">
                <Check className="size-3.5 stroke-[3]" />
              </div>
              <p className="text-[11px] font-extrabold leading-tight">Sudah Dipilah</p>
              <p className="text-[9px] opacity-90">Bebas Campur</p>
            </div>

            {/* Syarat 2 */}
            <div className="p-3 rounded-2xl bg-brand-green text-ink flex flex-col items-center justify-center text-center gap-1.5 shadow-2xs">
              <div className="size-6 rounded-full bg-white text-brand-green flex items-center justify-center shadow-2xs">
                <Check className="size-3.5 stroke-[3]" />
              </div>
              <p className="text-[11px] font-extrabold leading-tight">Bersih</p>
              <p className="text-[9px] opacity-90">Dibilas tuntas</p>
            </div>

            {/* Syarat 3 */}
            <div className="p-3 rounded-2xl bg-brand-green text-ink flex flex-col items-center justify-center text-center gap-1.5 shadow-2xs">
              <div className="size-6 rounded-full bg-white text-brand-green flex items-center justify-center shadow-2xs">
                <Check className="size-3.5 stroke-[3]" />
              </div>
              <p className="text-[11px] font-extrabold leading-tight">Kering</p>
              <p className="text-[9px] opacity-90">Tanpa sisa air</p>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-40">
        <div className="mx-auto max-w-md flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(ROUTES.setoranStep2)}
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
            Lanjut (Langkah 4 /6)
          </button>
        </div>
      </div>
    </div>
  );
}
