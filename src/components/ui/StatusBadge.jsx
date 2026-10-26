import { Check, PencilRuler, Lightbulb } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export function StatusBadge({ status, className = '' }) {
  const { t } = useLanguage();
  
  const config = {
    available: { icon: Check, color: 'bg-brand-green text-ink', key: 'badge.available' },
    prototype: { icon: PencilRuler, color: 'bg-orange-100 text-orange-800', key: 'badge.prototype' },
    concept: { icon: Lightbulb, color: 'bg-neutral-100 text-neutral-700', key: 'badge.concept' }
  };

  const current = config[status];
  if (!current) return null;
  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${current.color} ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      {t(current.key)}
    </span>
  );
}