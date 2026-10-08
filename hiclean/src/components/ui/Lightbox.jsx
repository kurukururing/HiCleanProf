import { X } from 'lucide-react';
import { useEffect } from 'react';

export function Lightbox({ isOpen, onClose, imageSrc, altText }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-ink/90 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button onClick={onClose} className="absolute top-6 right-6 p-2 text-white hover:text-brand-green bg-ink/50 rounded-full focus:ring-2 focus:ring-brand-green">
        <X className="w-6 h-6" />
      </button>
      <div className="max-w-5xl max-h-[90vh] w-full rounded-2xl overflow-hidden bg-white relative">
        <img src={imageSrc} alt={altText} className="w-full h-full object-contain" />
      </div>
    </div>
  );
}