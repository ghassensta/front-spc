import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "flag-icons/css/flag-icons.min.css";
import "./i18n";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { TranslationProvider } from "./context/translation-context";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <TranslationProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense>
          <App />
        </Suspense>
      </BrowserRouter>
    </TranslationProvider>
  // </StrictMode>
);
