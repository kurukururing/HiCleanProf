import { useState } from 'react';
import { 
  ArrowLeft, Check, CheckCircle2, 
  Wine, FileText, Trash2, Milk, Info, AlertCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { WargaStepHeader } from '../../components/layout/WargaStepHeader';
import { PanduanPilahModal } from '../../components/ui/PanduanPilahModal';

export function SetoranStep2Page() {
  const navigate = useNavigate();
  const [selectedCats, setSelectedCats] = useState(['plastik']);
  const [activeModalCat, setActiveModalCat] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const categories = [
    {
      id: 'plastik',
      name: 'Plastik',
      desc: 'Botol PET, gelas plastik, kantong kresek, kemasan makanan',
      icon: Milk
    },
    {
      id: 'kertas',
      name: 'Kertas & Karton',
      desc: 'Kardus bekas, koran, majalah, kertas dokumen',
      icon: FileText
    },
    {
      id: 'logam',
      name: 'Logam & Kaleng',
      desc: 'Kaleng minuman, aluminium foil, besi bekas, kuningan',
      icon: Trash2
    },
    {
      id: 'kaca',
      name: 'Kaca & Beling',
      desc: 'Botol sirup, toples beling, cermin pecah, gelas kaca',
      icon: Wine
    }
  ];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCategoryClick = (catId) => {
    // If already selected, allow toggling off (min 1)
    if (selectedCats.includes(catId)) {
      if (selectedCats.length > 1) {
        setSelectedCats(selectedCats.filter((c) => c !== catId));
      } else {
        showToast('Minimal pilih 1 kategori sampah.');
      }
      return;
    }

    // Check max 2 categories rule
    if (selectedCats.length >= 2) {
      showToast('Maksimal memilih 2 kategori sampah.');
      return;
    }

    // Open pop up guide modal for the clicked category
    setActiveModalCat(catId);
  };

  const handleModalConfirm = (catId) => {
    if (!selectedCats.includes(catId) && selectedCats.length < 2) {
      setSelectedCats([...selectedCats, catId]);
    }
    setActiveModalCat(null);
  };

  const handleNext = () => {
    navigate(ROUTES.setoranStep3);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans pb-28 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-neutral-700 max-w-xs text-center">
          <AlertCircle className="size-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2 of 6 Step Header */}
      <WargaStepHeader
        stepBadge="Kategori"
        stepNumber={2}
        totalSteps={6}
        backTo={ROUTES.setoranStep1}
      />

      <main className="flex-grow mx-auto w-full max-w-md px-4 space-y-4">
        {/* Title & Description */}
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 font-heading">
              Pilih Kategori Sampah
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-neutral-900 text-white text-[11px] font-bold shrink-0 font-mono">
              {selectedCats.length}/2 Dipilih
            </span>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed font-body">
            Pilih 1 atau maksimal 2 kategori sampah yang sudah dipisah. Panduan pilah akan tampil saat kategori dipilih.
          </p>
        </div>

        {/* Max 2 Notice Banner */}
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-900 font-medium">
          <Info className="size-4 text-brand-green shrink-0" />
          <span>Maksimal 2 jenis kategori sampah dalam satu sesi penjemputan armada.</span>
        </div>

        {/* Category List Cards */}
        <div className="space-y-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCats.includes(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`w-full p-5 rounded-3xl border transition-all flex items-center justify-between gap-4 cursor-pointer relative ${
                  isSelected
                    ? 'bg-white border-brand-green shadow-sm ring-2 ring-brand-green/20'
                    : 'bg-white border-neutral-200/80 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'bg-brand-green/15 text-brand-green' : 'bg-neutral-100/90 text-neutral-700'
                  }`}>
                    <Icon className="size-6 stroke-[1.8]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-extrabold text-neutral-900 font-heading">
                        {cat.name}
                      </p>
                      {isSelected && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalCat(cat.id);
                          }}
                          className="text-[10px] text-brand-green font-bold bg-brand-green/10 hover:bg-brand-green/20 px-2 py-0.5 rounded-full transition-colors"
                        >
                          Lihat Panduan
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                {/* Circular Indicator */}
                <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'border-brand-green bg-brand-green text-ink'
                    : 'border-neutral-300 bg-white'
                }`}>
                  {isSelected && <Check className="size-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Pop Up Ringkasan Panduan Pilah Sampah Modal */}
      <PanduanPilahModal
        isOpen={Boolean(activeModalCat)}
        categoryKey={activeModalCat}
        onClose={() => setActiveModalCat(null)}
        onConfirm={handleModalConfirm}
      />

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 px-4 pt-3.5 pb-[max(1rem,env(safe-area-inset-bottom))] z-40">
        <div className="mx-auto max-w-md flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(ROUTES.setoranStep1)}
            className="text-xs font-bold text-neutral-700 hover:text-neutral-900 flex items-center gap-1.5 px-3 py-2 cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            <span>Kembali</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-4 px-6 rounded-2xl bg-neutral-900 hover:bg-black text-white text-xs sm:text-sm font-extrabold shadow-md active:scale-[0.99] transition-all cursor-pointer text-center"
          >
            Lanjut (Langkah 3 /6)
          </button>
        </div>
      </div>
    </div>
  );
}
