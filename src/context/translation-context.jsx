import React, { createContext, useContext, useState, useEffect } from 'react';

const TranslationContext = createContext(undefined);

// Cache global (persistant même entre changements de langue)
const translationCache = new Map();

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = localStorage.getItem('preferredLanguage');
    return saved || 'fr'; // français par défaut
  });

  const [translations, setTranslations] = useState(new Map());
  const [translatingSet, setTranslatingSet] = useState(new Set()); // ← Éviter les traductions en double

  useEffect(() => {
    localStorage.setItem('preferredLanguage', currentLanguage);
  }, [currentLanguage]);

  const setLanguage = (lang) => {
    setCurrentLanguage(lang);
    setTranslations(new Map()); // on vide seulement l’état local
  };

  const translate = async (text) => {
    if (!text || text.trim() === '') return text;
    if (currentLanguage === 'fr') return text;

    const cacheKey = `${text}:${currentLanguage}`;

    // Cache par texte
    if (!translationCache.has(text)) {
      translationCache.set(text, new Map());
    }
    const textCache = translationCache.get(text);

    if (textCache.has(currentLanguage)) {
      return textCache.get(currentLanguage);
    }

    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=${currentLanguage}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network error');

      const data = await response.json();
      const translatedText = data[0].map((item) => item[0]).join('');

      textCache.set(currentLanguage, translatedText);
      setTranslations(prev => new Map(prev).set(cacheKey, translatedText));

      return translatedText;
    } catch (error) {
      console.warn('Translation error:', error);
      return text;
    }
  };

  const translateSync = (text) => {
    if (!text || text.trim() === '') return text;
    if (currentLanguage === 'fr') return text;

    const cacheKey = `${text}:${currentLanguage}`;

    // Priorité : état local, puis cache global
    if (translations.has(cacheKey)) return translations.get(cacheKey);
    if (translationCache.has(text) && translationCache.get(text).has(currentLanguage)) {
      return translationCache.get(text).get(currentLanguage);
    }

    // Éviter les traductions en double et les boucles
    if (translatingSet.has(cacheKey)) {
      return text;
    }

    // Pas encore traduit → on déclenche l'async en arrière-plan SEULEMENT si pas déjà en cours
    setTranslatingSet(prev => new Set(prev).add(cacheKey));
    
    // Timeout pour éviter les appels synchrones immédiats
    setTimeout(() => {
      translate(text).finally(() => {
        setTranslatingSet(prev => {
          const newSet = new Set(prev);
          newSet.delete(cacheKey);
          return newSet;
        });
      });
    }, 0);
    
    return text; // on retourne l'original immédiatement
  };

  return (
    <TranslationContext.Provider value={{
      currentLanguage,
      setLanguage,
      translate,
      translateSync,
    }}>
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