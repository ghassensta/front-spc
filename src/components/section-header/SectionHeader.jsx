import React from "react";
import { TranslatedText } from "src/components/translated-text/translated-text";

const GOLD = "#b8955a";

/**
 * SectionHeader — Bloc titre centré réutilisable
 *
 * Props :
 * @param {string} label       - Petit texte doré uppercase au-dessus
 * @param {string} title       - Titre principal (h2)
 * @param {string} className   - Classes supplémentaires sur le wrapper (optionnel)
 */
export default function SectionHeader({ label, title, className = "" }) {
  return (
    <div className={`text-center mb-10 ${className}`}>

      {/* Label doré */}
      {label && (
        <p
          className="text-xs uppercase tracking-widest mb-3"
          style={{ color: GOLD, letterSpacing: "0.2em" }}
        >
          <TranslatedText text={label} />
        </p>
      )}

      {/* Titre */}
      <h2
        className="text-4xl md:text-5xl font-semibold leading-tight"
        style={{
          color: "#1a1a1a",
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          fontWeight: 400,
        }}
      >
        <TranslatedText text={title} />
      </h2>

      {/* Séparateur doré centré */}
      <div
        className="mx-auto mt-4"
        style={{ width: "60px", height: "2px", background: GOLD }}
      />

    </div>
  );
}