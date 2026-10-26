import { useLanguage } from '../../i18n/LanguageContext';

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button 
      onClick={toggleLang}
      aria-label="Toggle language"
      className="relative flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-green overflow-hidden select-none cursor-pointer"
    >
      {/* Sliding Pill Indicator */}
      <span 
        aria-hidden="true"
        className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] bg-ink rounded-full shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          lang === 'en' ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
      
      <span className={`relative z-10 px-3 py-1 rounded-full transition-colors duration-300 ${lang === 'id' ? 'text-white font-semibold' : 'text-neutral-500 hover:text-neutral-800'}`}>
        ID
      </span>
      <span className={`relative z-10 px-3 py-1 rounded-full transition-colors duration-300 ${lang === 'en' ? 'text-white font-semibold' : 'text-neutral-500 hover:text-neutral-800'}`}>
        EN
      </span>
    </button>
  );
}