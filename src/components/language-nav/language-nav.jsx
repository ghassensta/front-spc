import React, { useEffect } from "react";

export default function LanguageNav() {
  // Function to change language
  const changeLanguage = (lang) => {
    const translateElement = document.getElementById("google_translate_element");
    if (translateElement && window.google && window.google.translate) {
      const select = translateElement.querySelector(".goog-te-combo");
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
      }
    }
  };

  // Ensure Google Translate is initialized
  useEffect(() => {
    const checkTranslateReady = setInterval(() => {
      if (window.google && window.google.translate) {
        window.googleTranslateElementInit?.();
        clearInterval(checkTranslateReady);
      }
    }, 500);

    return () => clearInterval(checkTranslateReady);
  }, []);

  return (
    <div className="flex items-end gap-1 bg-[#F6F5E9] px-4 py-3 w-full justify-end">
      <div id="google_translate_element" style={{ display: "none" }}></div>
      <button
        className="text-lg font-tahoma text-[#33373D]"
        onClick={() => changeLanguage("en")}
      >
        <span className="fi fi-gb"></span>
      </button>
      <button
        className="text-lg font-tahoma text-[#33373D]"
        onClick={() => changeLanguage("fr")}
      >
        <span className="fi fi-fr"></span>
      </button>
      <button
        className="text-lg font-tahoma text-[#33373D]"
        onClick={() => changeLanguage("de")}
      >
        <span className="fi fi-de"></span>
      </button>
      <button
        className="text-lg font-tahoma text-[#33373D]"
        onClick={() => changeLanguage("it")}
      >
        <span className="fi fi-it"></span>
      </button>
      <button
        className="text-lg font-tahoma text-[#33373D]"
        onClick={() => changeLanguage("es")}
      >
        <span className="fi fi-es"></span>
      </button>
    </div>
  );
}