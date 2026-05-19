import React from "react";
import { TranslatedText } from "src/components/translated-text/translated-text";
const GOLD = "#b8955a";

/**
 * SectionHeader — Bloc titre centré réutilisable
 *
 * Props :
 * @param {string}  label    - Petit texte doré uppercase au-dessus
 * @param {string}  title    - Titre principal
 * @param {boolean} asH1     - true = rendu en <h1>, défaut: false (<h2>)
 * @param {string}  className - Classes supplémentaires (optionnel)
 */
export default function SectionHeader({ label, title, asH1 = false, className = "" }) {
  const Tag = asH1 ? "h1" : "h2";

  return (
    <div className={`text-center mb-6 ${className}`}>

      {/* Label doré */}
      {label && (
        <p
          className="text-xs uppercase tracking-widest mb-3"
          style={{ color: GOLD, letterSpacing: "0.2em" }}
        >
          <TranslatedText text={label} />
        </p>
      )}

      {/* Titre — h1 ou h2 selon prop */}
      <Tag
        className="text-4xl md:text-5xl font-semibold leading-tight"
        style={{
          color: "#1a1a1a",
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          fontWeight: 400,
        }}
      >
        <TranslatedText text={title} />
      </Tag>

      {/* Séparateur doré centré */}
      <div
        className="mx-auto mt-4"
        style={{ width: "60px", height: "2px", background: GOLD }}
      />

    </div>
  );
}