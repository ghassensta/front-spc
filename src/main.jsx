import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "flag-icons/css/flag-icons.min.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { TranslationProvider } from "./context/translation-context";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <TranslationProvider>
      <BrowserRouter>
        <Suspense>
          <App />
        </Suspense>
      </BrowserRouter>
    </TranslationProvider>
  // </StrictMode>
);
