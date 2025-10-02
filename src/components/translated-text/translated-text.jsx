import React, { useEffect, useState } from 'react';
import { useTranslation } from 'src/context/translation-context';

export const TranslatedText = ({ text, as = 'span', className }) => {
  const { translate, currentLanguage } = useTranslation();
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    let isMounted = true;

    const performTranslation = async () => {
      const result = await translate(text);
      if (isMounted) {
        setTranslatedText(result);
      }
    };

    performTranslation();

    return () => {
      isMounted = false;
    };
  }, [text, currentLanguage, translate]);

  const Component = as;

  return <Component className={className}>{translatedText}</Component>;
};
