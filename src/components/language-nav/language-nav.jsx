import React, { useEffect } from "react";
import { useTranslation } from "src/context/translation-context";

const languages = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'it', flag: '🇮🇹', label: 'Italiano' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
];

export default function LanguageNav() {
  const { currentLanguage, setLanguage } = useTranslation();

  return (
    <div className="flex items-end gap-1 bg-[#F6F5E9] px-4 py-3 w-full justify-end sm:justify-end">
    
      <button
        className="text-lg font-tahoma text-[#33373D]"
        onClick={() => setLanguage("en")}
      >
        <span className="fi fi-gb"></span>
      </button>
      <button
        className="text-lg font-tahoma text-[#33373D]"
        onClick={() => setLanguage("fr")}
      >
        <span className="fi fi-fr"></span>
      </button>
      <button
        className="text-lg font-tahoma text-[#33373D]"
        onClick={() => setLanguage("de")}
      >
        <span className="fi fi-de"></span>
      </button>
      <button
        className="text-lg font-tahoma text-[#33373D]"
        onClick={() => setLanguage("it")}
      >
        <span className="fi fi-it"></span>
      </button>
      <button
        className="text-lg font-tahoma text-[#33373D]"
        onClick={() => setLanguage("es")}
      >
        <span className="fi fi-es"></span>
      </button>
    </div>
  );
}