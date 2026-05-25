import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import "flag-icons/css/flag-icons.min.css";
import App from "./App.jsx";
import { TranslationProvider } from "./context/translation-context";
import "./i18n";

const rootElement = document.getElementById("root");

if (!rootElement._reactRoot) {
  const root = createRoot(rootElement);
  rootElement._reactRoot = root;

  root.render(
    <HelmetProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <TranslationProvider>
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  fontSize: "18px",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  color: "#b8955a",
                }}
              >
                Spa &amp; Prestige Collection
              </div>
            }
          >
            <App />
          </Suspense>
        </TranslationProvider>
      </BrowserRouter>
    </HelmetProvider>
  );

  // Fallback prérendu : si une page n'appelle pas usePrerenderReady,
  // on dispatche quand même render-event après 4s pour ne pas bloquer
  // Puppeteer indéfiniment. Les pages SEO-critiques utilisent le hook
  // pour fire immédiatement après leur fetch.
  if (typeof window !== "undefined") {
    setTimeout(() => {
      if (!window.__PRERENDER_FIRED__) {
        window.__PRERENDER_FIRED__ = true;
        document.dispatchEvent(new Event("render-event"));
      }
    }, 12000);
  }
}
