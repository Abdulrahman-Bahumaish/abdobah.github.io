import { useTranslation } from 'react-i18next';
import { useEffect, useCallback } from 'react';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();

  const isRTL = i18n.language === 'ar';

  const changeLanguage = useCallback((lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [i18n]);

  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng') || 'en';
    if (savedLang !== i18n.language) {
      changeLanguage(savedLang);
    }
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [i18n.language, isRTL, changeLanguage]);

  const toggleLanguage = useCallback(() => {
    const newLang = isRTL ? 'en' : 'ar';
    changeLanguage(newLang);
  }, [isRTL, changeLanguage]);

  return {
    t,
    i18n,
    isRTL,
    currentLanguage: i18n.language,
    changeLanguage,
    toggleLanguage,
  };
};

export default useLanguage;
