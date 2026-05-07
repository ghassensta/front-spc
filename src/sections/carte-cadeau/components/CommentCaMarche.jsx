import React from "react";
import { Link } from "react-router-dom";
import { TranslatedText } from "src/components/translated-text/translated-text";
import SectionHeader from "src/components/section-header/SectionHeader";
import { FaMapMarkerAlt, FaEnvelope, FaPaperPlane, FaSpa } from "react-icons/fa";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";

const DEFAULT_ICONS = [
  <FaMapMarkerAlt />,
  <FaEnvelope />,
  <FaPaperPlane />,
  <FaSpa />,
];

/**
 * CommentCaMarche — Section "Comment ça marche ?" réutilisable
 *
 * Props :
 * @param {string}  label    - Label doré (défaut: "En quelques étapes")
 * @param {string}  title    - Titre (défaut: "Comment ça marche ?")
 * @param {string}  subtitle - Sous-texte (optionnel)
 * @param {Array}   steps    - [{ icon?, title, desc }]
 * @param {string}  ctaLabel - Texte bouton CTA (optionnel)
 * @param {string}  ctaLink  - Lien bouton CTA (optionnel)
 * @param {string}  bgColor  - Fond (défaut: "#FBF6EC")
 */
export default function CommentCaMarche({
  label = "En quelques étapes",
  title = "Comment ça marche ?",
  subtitle,
  steps = [],
  ctaLabel,
  ctaLink,
  bgColor = "#FBF6EC",
}) {
  const cols = steps.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4";

  return (
    <div className="w-full" style={{ backgroundColor: bgColor, fontFamily: FONT }}>
      <div className="max-w-6xl mx-auto px-6 py-12">

        <SectionHeader label={label} title={title} />

        {subtitle && (
          <p className="text-center text-sm text-gray-500 -mt-6 mb-10" style={{ fontFamily: FONT }}>
            <TranslatedText text={subtitle} />
          </p>
        )}

        {/* ── Desktop : grille verticale classique ── */}
        <div className={`hidden md:grid gap-8 ${cols}`}>
          {steps.map((item, i) => {
            const icon = item.icon ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length];
            return (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#F3EBDD" }}
                >
                  <span style={{ color: GOLD, fontSize: "1.4rem" }}>{icon}</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: FONT }}>
                  <TranslatedText text={item.title} />
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: FONT }}>
                  <TranslatedText text={item.desc} />
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Mobile : une seule ligne, icônes + titre seulement, desc cachée ── */}
        <div className="flex md:hidden flex-row items-start justify-between gap-1">
          {steps.map((item, i) => {
            const icon = item.icon ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length];
            return (
              <div key={i} className="flex flex-col items-center text-center flex-1 min-w-0 gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#F3EBDD" }}
                >
                  <span style={{ color: GOLD, fontSize: "1rem" }}>{icon}</span>
                </div>
                <p className="text-xs font-semibold text-gray-800 leading-tight px-1" style={{ fontFamily: FONT }}>
                  <TranslatedText text={item.title} />
                </p>
                {/* desc cachée sur mobile */}
              </div>
            );
          })}
        </div>

        {/* CTA optionnel */}
        {ctaLabel && ctaLink && (
          <div className="flex justify-center mt-10">
            <Link
              to={ctaLink}
              className="px-8 py-3 rounded-full text-sm font-semibold uppercase text-white transition-colors"
              style={{ backgroundColor: "#1a1a1a", letterSpacing: "0.08em", fontFamily: FONT }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1a1a1a")}
            >
              <TranslatedText text={ctaLabel} />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}