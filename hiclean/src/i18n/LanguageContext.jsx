import { createContext, useState, useEffect, useContext } from 'react';
import { id } from './id';
import { en } from './en';

const LanguageContext = createContext();

const dictionaries = { id, en };

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('hiclean_lang');
      if (saved === 'id' || saved === 'en') return saved;
      return navigator.language.startsWith('id') ? 'id' : 'en';
    } catch {
      return 'id';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hiclean_lang', lang);
    } catch (e) {
      console.warn('Gagal menyimpan preferensi bahasa');
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang(prev => (prev === 'id' ? 'en' : 'id'));

  const t = (key) => {
    const dict = dictionaries[lang];
    if (dict[key]) return dict[key];
    
    // Fallback ke ID jika tidak ada di EN
    if (lang === 'en' && id[key]) {
      console.warn(`Missing translation for key: ${key}`);
      return id[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);