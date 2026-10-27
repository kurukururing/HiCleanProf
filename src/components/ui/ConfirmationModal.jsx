import { useEffect } from 'react';
import { LogOut, AlertTriangle, X, AlertCircle, Trash2, ArrowLeft } from 'lucide-react';

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi Tindakan',
  description = 'Apakah Anda yakin ingin melanjutkan tindakan ini?',
  confirmText = 'Ya, Lanjutkan',
  cancelText = 'Batal',
  type = 'danger', // 'danger' | 'warning' | 'info'
  icon = null,
  isLoading = false
}) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  // Icon selector based on type
  const renderIcon = () => {
    if (icon) return icon;
    if (type === 'danger') {
      return <LogOut className="size-6 text-red-600 stroke-[2.2]" />;
    }
    if (type === 'warning') {
      return <AlertTriangle className="size-6 text-amber-600 stroke-[2.2]" />;
    }
    return <AlertCircle className="size-6 text-brand-green stroke-[2.2]" />;
  };

  const getIconWrapperClass = () => {
    if (type === 'danger') {
      return 'bg-red-50 text-red-600 border border-red-100/90';
    }
    if (type === 'warning') {
      return 'bg-amber-50 text-amber-600 border border-amber-200/80';
    }
    return 'bg-[#E5F8ED] text-brand-green border border-emerald-200/80';
  };

  const getConfirmButtonClass = () => {
    if (type === 'danger') {
      return 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20';
    }
    if (type === 'warning') {
      return 'bg-amber-500 hover:bg-amber-600 text-neutral-900 shadow-md shadow-amber-500/20';
    }
    return 'bg-brand-green hover:bg-brand-green/90 text-ink shadow-md shadow-emerald-500/20';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => !isLoading && onClose()}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-neutral-100 text-center space-y-4 animate-in zoom-in-95 duration-200 z-10">
        {/* Close Button top-right */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Tutup"
          className="absolute top-4 right-4 size-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-400 hover:text-neutral-700 flex items-center justify-center transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Icon Header */}
        <div className={`size-16 rounded-3xl flex items-center justify-center mx-auto shadow-2xs ${getIconWrapperClass()}`}>
          {renderIcon()}
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5 px-2">
          <h3 className="text-base sm:text-lg font-extrabold text-neutral-900 font-heading">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 font-body leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3.5 px-5 rounded-2xl border-2 border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 py-3.5 px-5 rounded-2xl text-sm font-extrabold transition-all active:scale-[0.98] cursor-pointer ${getConfirmButtonClass()}`}
          >
            {isLoading ? 'Memproses...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

