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

  // Signal de fin de rendu pour vite-plugin-prerender (Puppeteer)
  // Déclenché après le premier paint pour laisser les composants async se résoudre.
  if (typeof window !== "undefined") {
    const fireRenderEvent = () => {
      setTimeout(() => {
        document.dispatchEvent(new Event("render-event"));
      }, 0);
    };
    if (document.readyState === "complete") {
      fireRenderEvent();
    } else {
      window.addEventListener("load", fireRenderEvent, { once: true });
    }
  }
}
