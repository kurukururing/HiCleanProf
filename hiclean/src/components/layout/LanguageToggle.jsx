import { useLanguage } from '../../i18n/LanguageContext';

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button 
      onClick={toggleLang}
      aria-label="Toggle language"
      className="flex items-center p-1 bg-neutral-100 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-green"
    >
      <span className={`px-3 py-1 rounded-full transition-colors ${lang === 'id' ? 'bg-ink text-white shadow-sm' : 'text-neutral-500'}`}>ID</span>
      <span className={`px-3 py-1 rounded-full transition-colors ${lang === 'en' ? 'bg-ink text-white shadow-sm' : 'text-neutral-500'}`}>EN</span>
    </button>
  );
}