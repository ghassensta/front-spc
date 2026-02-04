import { StrictMode, Suspense } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "flag-icons/css/flag-icons.min.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { TranslationProvider } from "./context/translation-context";

// Éviter les appels multiples à createRoot en développement
const rootElement = document.getElementById("root");
if (!rootElement._reactRoot) {
  const root = createRoot(rootElement);
  rootElement._reactRoot = root;
  
  root.render(
    // <StrictMode>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <TranslationProvider>
          <Suspense fallback={
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100vh',
              fontSize: '18px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
                Initialisation...
            </div>
          }>
            <App />
          </Suspense>
        </TranslationProvider>
      </BrowserRouter>
    // </StrictMode>
  );
}
