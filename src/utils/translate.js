const translationCache = {};

export const translateText = async (text, targetLang = 'fr') => {
  if (!text || targetLang === 'fr') return text;
  
  const cacheKey = `${text}_${targetLang}`;
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    const translatedText = data[0].map(item => item[0]).join('');
    translationCache[cacheKey] = translatedText;
    
    return translatedText;
  } catch (error) {
    return text; // Retourne le texte original en cas d'erreur
  }
};
