import React, { createContext, useContext, useState, useEffect } from 'react';

const TranslationContext = createContext(undefined);

const translationCache = new Map();

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = localStorage.getItem('preferredLanguage');
    return saved || 'fr';
  });

  const [translations, setTranslations] = useState(new Map());

  useEffect(() => {
    localStorage.setItem('preferredLanguage', currentLanguage);
  }, [currentLanguage]);

  const setLanguage = (lang) => {
    setCurrentLanguage(lang);
    setTranslations(new Map());
  };

  const translate = async (text) => {
    if (!text || text.trim() === '') return text;
    if (currentLanguage === 'fr') return text;

    const cacheKey = `${text}:${currentLanguage}`;

    if (!translationCache.has(text)) {
      translationCache.set(text, new Map());
    }

    const textCache = translationCache.get(text);
    if (textCache.has(currentLanguage)) {
      return textCache.get(currentLanguage);
    }

    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=${currentLanguage}&dt=t&q=${encodeURIComponent(text)}`;
      console.log(url)
      const response = await fetch(url);
      const data = await response.json();

      const translatedText = data[0]
        .map((item) => item[0])
        .join('');

      textCache.set(currentLanguage, translatedText);
      setTranslations(prev => new Map(prev).set(cacheKey, translatedText));

      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  const translateSync = (text) => {
    if (!text || text.trim() === '') return text;
    if (currentLanguage === 'fr') return text;

    const cacheKey = `${text}:${currentLanguage}`;

    if (translations.has(cacheKey)) {
      return translations.get(cacheKey);
    }

    if (translationCache.has(text) && translationCache.get(text).has(currentLanguage)) {
      return translationCache.get(text).get(currentLanguage);
    }

    translate(text);
    return text;
  };

  return (
    <TranslationContext.Provider value={{ currentLanguage, setLanguage, translate, translateSync }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
};
