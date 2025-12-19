import { useEffect, useState } from 'react';
import { translateText } from 'src/utils/translate';
import { useTranslation } from 'src/context/translation-context';

export const Translation = ({ 
  text, 
  className = '', 
  as: Component = 'span',
  ...props 
}) => {
  const { currentLanguage } = useTranslation();
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    const translate = async () => {
      if (currentLanguage !== 'fr') {
        const result = await translateText(text, currentLanguage);
        setTranslatedText(result);
      } else {
        setTranslatedText(text);
      }
    };

    translate();
  }, [text, currentLanguage]);

  return (
    <Component className={className} {...props}>
      {translatedText}
    </Component>
  );
};

export default Translation;
