import React from "react";
import { Link } from "react-router-dom";
import { TranslatedText } from "src/components/translated-text/translated-text";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";

/**
 * Système de CTA — Spa & Prestige Collection
 *
 * Hiérarchie (1 seul "primary" par écran) :
 *   - primary   → bouton noir / texte blanc      → conversion (Ajouter au panier, Voir toutes les offres…)
 *   - secondary → fond beige / texte foncé       → navigation, cartes (Voir l'expérience, Découvrir…)
 *   - tertiary  → fond gris très clair / gris    → éditorial (En savoir plus…)
 *
 * Toutes les variantes partagent :
 *   - même forme (rounded-full, px-6 py-3, uppercase, tracking-widest)
 *   - même style de hover (transition vers le doré GOLD)
 */
export const BUTTON_VARIANTS = {
  primary: {
    bgColor: "#1a1a1a",
    hoverColor: GOLD,
    textColor: "#ffffff",
  },
  secondary: {
    bgColor: "#F3EBDD",
    hoverColor: GOLD,
    textColor: "#1a1a1a",
  },
  tertiary: {
    bgColor: "#F5F5F5",
    hoverColor: "#E5E5E5",
    textColor: "#444444",
  },
};

/**
 * ButtonLink — Bouton lien réutilisable (système de design SPC)
 *
 * Props :
 * @param {string}  to          - Lien de destination (react-router)
 * @param {string}  text        - Texte du bouton
 * @param {"primary"|"secondary"|"tertiary"} variant - Niveau hiérarchique (défaut: "primary")
 * @param {string}  bgColor     - Override couleur de fond (optionnel)
 * @param {string}  hoverColor  - Override couleur au hover (optionnel)
 * @param {string}  textColor   - Override couleur du texte (optionnel)
 * @param {node}    icon        - Icône optionnelle (react-icons)
 * @param {string}  className   - Classes supplémentaires (optionnel)
 */
export default function ButtonLink({
  to,
  text,
  variant = "primary",
  bgColor,
  hoverColor,
  textColor,
  icon,
  iconPosition = "after",
  className = "",
}) {
  const v = BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.primary;
  const finalBg = bgColor ?? v.bgColor;
  const finalHover = hoverColor ?? v.hoverColor;
  const finalText = textColor ?? v.textColor;

  return (
    <div className={`mt-10 flex justify-center ${className}`}>
      <Link
        to={to}
        className="inline-flex items-center gap-2 uppercase tracking-widest rounded-full px-6 py-3 text-sm font-normal transition-all duration-300"
        style={{ backgroundColor: finalBg, color: finalText, fontFamily: FONT }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = finalHover)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = finalBg)}
      >
        {icon && iconPosition === "before" && <span>{icon}</span>}
        <TranslatedText text={text} />
        {icon && iconPosition === "after" && <span>{icon}</span>}
      </Link>
    </div>
  );
}
