import "./App.css";
import { Router } from "./router";
import "swiper/css";
import { CheckoutProvider } from "./sections/checkout/context/checkout-provider";
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./auth/context/jwt/auth-provider";
import { useEffect } from "react";

function App() {
  useScrollToTop();

  // Load Google Translate script
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      // Check if script is already loaded
      if (!document.querySelector('script[src="//translate.google.com/translate_a/element.js"]')) {
        const script = document.createElement("script");
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        // Initialize Google Translate
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en", // Default language
              includedLanguages: "en,fr,de,it,es", // Supported languages
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element"
          );
        };
      }
    };

    // Load script and ensure initialization
    addGoogleTranslateScript();

    // Fallback to ensure script loads
    const checkScriptLoaded = setInterval(() => {
      if (window.google && window.google.translate) {
        window.googleTranslateElementInit();
        clearInterval(checkScriptLoaded);
      }
    }, 500);

    // Cleanup script and interval on component unmount
    return () => {
      clearInterval(checkScriptLoaded);
      const scripts = document.getElementsByTagName("script");
      for (let i = scripts.length - 1; i >= 0; i--) {
        if (scripts[i].src.includes("translate.google.com")) {
          scripts[i].remove();
        }
      }
      if (window.googleTranslateElementInit) {
        delete window.googleTranslateElementInit;
      }
    };
  }, []);

  return (
    <AuthProvider>
      <CheckoutProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
        <Router />
      </CheckoutProvider>
    </AuthProvider>
  );
}

export default App;