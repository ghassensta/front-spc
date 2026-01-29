import "./App.css";
import { Router } from "./router";
import "swiper/css";
import { CheckoutProvider } from "./sections/checkout/context/checkout-provider";
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./auth/context/jwt/auth-provider";
import { useEffect } from "react";
import MailjetNewsletterIframe from "./components/mailjetpopIn/MailjetPopIn";

function App() {
  useScrollToTop();

  useEffect(() => {
    // Only add once
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "fr",
          includedLanguages: "fr,it,es,de,en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.defer = true;
    document.body.appendChild(script);
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

