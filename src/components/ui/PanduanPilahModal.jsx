import { useEffect } from 'react';
import { 
  Recycle, Wine, FileText, Trash2, Milk, X, 
  CheckCircle2, Sparkles 
} from 'lucide-react';

export const PANDUAN_KATEGORI_DATA = {
  plastik: {
    id: 'plastik',
    title: 'Plastik',
    desc: 'Botol PET, gelas plastik, kemasan makanan',
    icon: Milk,
    rules: [
      'Kosongkan sisa cairan',
      'Bilas hingga bersih',
      'Keringkan sebelum disetor',
      'Pipihkan botol',
      'Pisahkan tutup dan label'
    ]
  },
  kertas: {
    id: 'kertas',
    title: 'Kertas',
    desc: 'Koran, karton, kertas dokumen',
    icon: FileText,
    rules: [
      'Simpan dalam keadaan kering',
      'Lipat atau gulung karton',
      'Ikat dengan rapi (jika memungkinkan)',
      'Pisahkan dari kertas yang kotor atau basah'
    ]
  },
  logam: {
    id: 'logam',
    title: 'Logam',
    desc: 'Kaleng minuman, aluminium foil, besi bekas',
    icon: Trash2,
    rules: [
      'Kosongkan sisa isi',
      'Bilas hingga bersih',
      'Pipihkan kaleng',
      'Jangan dicampur dengan bahan berbahaya'
    ]
  },
  kaca: {
    id: 'kaca',
    title: 'Kaca',
    desc: 'Botol sirup, toples beling, gelas kaca',
    icon: Wine,
    rules: [
      'Kosongkan sisa isi',
      'Pisahkan tutup logam dan plastik',
      'Jangan dicampur dengan kaca pecah atau berbahaya',
      'Simpan dengan hati-hati untuk menghindari kerusakan'
    ]
  }
};

export function PanduanPilahModal({
  isOpen,
  categoryKey, // 'plastik' | 'kertas' | 'logam' | 'kaca'
  onClose,
  onConfirm
}) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !categoryKey) return null;

  const data = PANDUAN_KATEGORI_DATA[categoryKey] || PANDUAN_KATEGORI_DATA.plastik;
  const CategoryIcon = data.icon;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(data.id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card matching the reference design */}
      <div className="relative w-full max-w-sm rounded-[32px] bg-white p-6 shadow-2xl border border-neutral-100 text-center space-y-4 animate-in zoom-in-95 duration-200 z-10">
        {/* Top Header Recycle Icon */}
        <div className="size-14 rounded-full bg-emerald-50 text-brand-green flex items-center justify-center mx-auto shadow-2xs border border-emerald-100">
          <Recycle className="size-7 stroke-[2.2]" />
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5 px-2">
          <h3 className="text-base sm:text-lg font-extrabold text-neutral-900 font-heading">
            Ringkasan Panduan Pilah Sampah
          </h3>
          <p className="text-xs text-neutral-500 font-body leading-relaxed">
            Pastikan setiap jenis sampah dipersiapkan dengan benar agar proses daur ulang berjalan lancar.
          </p>
        </div>

        {/* Inner Card */}
        <div className="rounded-2xl border border-neutral-200/90 bg-white p-4 text-left space-y-3.5 shadow-2xs">
          {/* Category Header Row */}
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0">
              <CategoryIcon className="size-5 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-extrabold text-neutral-900 font-heading">
                {data.title}
              </h4>
              <p className="text-[11px] text-neutral-500 leading-tight">
                {data.desc}
              </p>
            </div>
          </div>

          {/* Checklist Rules with Green Bullets */}
          <div className="space-y-2 pt-1 border-t border-neutral-100">
            {data.rules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700 leading-relaxed font-medium">
                <span className="size-1.5 rounded-full bg-brand-green shrink-0 mt-1.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Understanding text */}
        <p className="text-[11px] text-neutral-500 font-medium">
          Saya sudah memahami panduan di atas.
        </p>

        {/* Dark Button: Saya Mengerti */}
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full py-4 px-6 rounded-full bg-[#1a1d1b] hover:bg-black text-white text-xs sm:text-sm font-extrabold transition-all active:scale-[0.98] shadow-md cursor-pointer"
        >
          Saya Mengerti
        </button>
      </div>
    </div>
  );
}

