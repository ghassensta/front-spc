import React from "react";
import { Link } from "react-router-dom";
import { TranslatedText } from "src/components/translated-text/translated-text";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";

/**
 * ButtonLink — Bouton lien réutilisable
 *
 * Props :
 * @param {string}  to          - Lien de destination (react-router)
 * @param {string}  text        - Texte du bouton
 * @param {string}  bgColor     - Couleur de fond (défaut: "#1a1a1a")
 * @param {string}  hoverColor  - Couleur au hover (défaut: "#b8955a")
 * @param {string}  textColor   - Couleur du texte (défaut: "#ffffff")
 * @param {node}    icon        - Icône optionnelle (react-icons)
 * @param {string}  className   - Classes supplémentaires (optionnel)
 */
export default function ButtonLink({
  to,
  text,
  bgColor = "#1a1a1a",
  hoverColor = GOLD,
  textColor = "#ffffff",
  icon,
  className = "",
}) {
  return (
    <div className={`mt-10 flex justify-center ${className}`}>
      <Link
        to={to}
        className="inline-flex items-center gap-2 uppercase tracking-widest rounded-full px-6 py-3 text-sm font-normal transition-all duration-300"
        style={{ backgroundColor: bgColor, color: textColor, fontFamily: FONT }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
      >
        {icon && <span>{icon}</span>}
        <TranslatedText text={text} />
      </Link>
    </div>
  );
}