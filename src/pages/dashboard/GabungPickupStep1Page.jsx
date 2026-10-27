import { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, Check,
  Milk, FileText, Trash2, Wine, Info, AlertCircle 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import { ROUTES } from '../../routes';
import { PanduanPilahModal } from '../../components/ui/PanduanPilahModal';

export function GabungPickupStep1Page() {
  const navigate = useNavigate();
  const [selectedCats, setSelectedCats] = useState(['plastik']);
  const [activeModalCat, setActiveModalCat] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const categories = [
    { 
      id: 'plastik', 
      title: 'Plastik', 
      desc: 'Botol PET, gelas plastik, kantong kresek, kemasan makanan', 
      icon: Milk 
    },
    { 
      id: 'kertas', 
      title: 'Kertas & Karton', 
      desc: 'Kardus bekas, koran, majalah, kertas dokumen', 
      icon: FileText 
    },
    { 
      id: 'logam', 
      title: 'Logam & Kaleng', 
      desc: 'Kaleng minuman, aluminium foil, besi bekas, kuningan', 
      icon: Trash2 
    },
    { 
      id: 'kaca', 
      title: 'Kaca & Beling', 
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

    // Open pop up modal for clicked category
    setActiveModalCat(catId);
  };

  const handleModalConfirm = (catId) => {
    if (!selectedCats.includes(catId) && selectedCats.length < 2) {
      setSelectedCats([...selectedCats, catId]);
    }
    setActiveModalCat(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-neutral-900 flex flex-col font-sans relative pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-neutral-700 max-w-xs text-center">
          <AlertCircle className="size-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3 sm:px-6">
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="size-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors text-neutral-800 cursor-pointer"
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

      <main className="flex-grow mx-auto w-full max-w-md px-4 py-6 space-y-5">
        {/* Progress Bar Card */}
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-neutral-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-700">
            <span className="px-3 py-1 rounded-full bg-neutral-200 text-neutral-800">Kategori</span>
            <span>Langkah 1 dari 4</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 h-1.5">
            <div className="bg-brand-green rounded-full h-full" />
            <div className="bg-neutral-200 rounded-full h-full" />
            <div className="bg-neutral-200 rounded-full h-full" />
            <div className="bg-neutral-200 rounded-full h-full" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 font-heading">
              Pilih Kategori Sampah
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-neutral-900 text-white text-[11px] font-bold shrink-0 font-mono">
              {selectedCats.length}/2 Dipilih
            </span>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Pilih 1 atau maksimal 2 kategori sampah. Panduan ringkasan akan muncul saat kategori diklik.
          </p>
        </div>

        {/* Max 2 Notice Banner */}
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-900 font-medium">
          <Info className="size-4 text-brand-green shrink-0" />
          <span>Maksimal 2 kategori sampah yang dapat digabungkan pada pickup ini.</span>
        </div>

        {/* Category List */}
        <div className="space-y-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = selectedCats.includes(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`w-full text-left p-5 rounded-3xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  active 
                    ? 'bg-white border-brand-green shadow-md ring-2 ring-brand-green/20' 
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`size-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                    active ? 'bg-brand-green/15 text-brand-green' : 'bg-neutral-100 text-neutral-700'
                  }`}>
                    <Icon className="size-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-extrabold text-neutral-900 font-heading">
                        {cat.title}
                      </p>
                      {active && (
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

                <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${
                  active 
                    ? 'bg-brand-green border-brand-green text-white' 
                    : 'border-neutral-300 bg-white'
                }`}>
                  {active && <Check className="size-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-4 rounded-2xl bg-white text-neutral-800 border border-neutral-300 text-xs font-bold hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            &larr; Kembali
          </button>
          <button
            type="button"
            onClick={() => navigate(ROUTES.gabungPickupStep2)}
            className="flex-[2] py-4 rounded-2xl bg-neutral-900 hover:bg-black text-white text-xs font-bold transition-all shadow-lg cursor-pointer"
          >
            Lanjut (Langkah 1/4)
          </button>
        </div>
      </main>

      {/* Pop Up Ringkasan Panduan Pilah Sampah Modal */}
      <PanduanPilahModal
        isOpen={Boolean(activeModalCat)}
        categoryKey={activeModalCat}
        onClose={() => setActiveModalCat(null)}
        onConfirm={handleModalConfirm}
      />

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
