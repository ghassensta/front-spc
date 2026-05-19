import React from "react";
import { useTranslation } from "src/context/translation-context";

const GOLD = "#b8955a";

/**
 * HeroImage — Hero complet desktop + mobile dans un seul composant
 *
 * Props :
 * @param {string}   image        - URL image desktop (fond)
 * @param {string}   imageMobile  - URL image mobile (optionnel, fallback sur image)
 * @param {string}   label        - Petit texte doré uppercase
 * @param {string}   title        - Titre h1
 * @param {string}   titleLine2   - 2e ligne du titre (optionnel)
 * @param {string}   description  - Texte descriptif (optionnel)
 * @param {string}   descBold     - Partie en gras (optionnel)
 * @param {string}   descAfter    - Texte après le gras (optionnel)
 * @param {boolean}  darkText     - true = texte sombre (fond clair) — défaut: false
 * @param {boolean}  center       - true = texte centré — défaut: false (gauche)
 * @param {number}   opacity      - Opacité overlay noir 0-100 — défaut: 40
 * @param {string}   className    - Classes supplémentaires (optionnel)
 * @param {node}     children     - Contenu additionnel (bouton, lien...) sous la description
 */
export default function HeroImage({
  image,
  imageMobile,
  label,
  title,
  titleLine2,
  description,
  descBold,
  descAfter,
  darkText = false,
  center = false,
  opacity = 40,
  className = "",
  children,
}) {
  const { translateSync } = useTranslation();

  const mobileImg     = imageMobile || image;
  const textColor     = darkText ? "text-gray-900" : "text-white";
  const descColor     = darkText ? "text-gray-700" : "text-white/90";
  const descBoldColor = darkText ? "text-gray-900" : "text-white";
  const alignClass    = center ? "items-center text-center" : "items-start text-left";

  return (
    <>
      {/* ── Desktop (md+) ── */}
      <div
        className={`hidden md:block w-full h-96 bg-center bg-cover relative ${className}`}
        style={{ backgroundImage: `url(${image})` }}
      >
        {!darkText && (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(0,0,0,${opacity / 100})` }}
          />
        )}

        <div className={`absolute inset-0 flex flex-col justify-center px-10 md:px-16 ${alignClass}`}>
          <div className={`flex flex-col gap-3 max-w-lg ${center ? "mx-auto" : ""}`}>

            {label && (
              <p
                className="text-xs uppercase tracking-widest"
                style={{ color: GOLD, letterSpacing: "0.2em", fontFamily: "Calibri, 'Segoe UI', sans-serif" }}
              >
                {translateSync(label)}
              </p>
            )}

            <h1
              className={`${textColor} leading-tight`}
              style={{
                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              }}
            >
              {translateSync(title)}
              {titleLine2 && <><br />{translateSync(titleLine2)}</>}
            </h1>

            <div className={`w-10 h-0.5 ${center ? "mx-auto" : ""}`} style={{ backgroundColor: GOLD }} />

            {description && (
              <p
                className={`${descColor} leading-relaxed`}
                style={{ fontSize: "0.9rem", fontFamily: "Calibri, 'Segoe UI', sans-serif" }}
              >
                {translateSync(description)}
                {descBold && <strong className={descBoldColor}>{translateSync(descBold)}</strong>}
                {descAfter && translateSync(descAfter)}
              </p>
            )}

            {children}

          </div>
        </div>
      </div>

      {/* ── Mobile (< md) ── */}
      <div className="md:hidden px-4 pt-8 pb-4">

        {label && (
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: GOLD, letterSpacing: "0.2em", fontFamily: "Calibri, 'Segoe UI', sans-serif" }}
          >
            {translateSync(label)}
          </p>
        )}

        <h1
          className="text-gray-900 mb-3"
          style={{
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontWeight: 400,
            fontSize: "2rem",
            lineHeight: 1.25,
          }}
        >
          {translateSync(title)}
          {titleLine2 && <> {translateSync(titleLine2)}</>}
        </h1>

        <div className="w-10 h-0.5 mb-4" style={{ backgroundColor: GOLD }} />

        <img src={mobileImg} alt="" className="w-full rounded mb-4 object-cover h-48" />

        {description && (
          <p
            className="text-gray-700 leading-relaxed mb-4"
            style={{ fontSize: "0.875rem", fontFamily: "Calibri, 'Segoe UI', sans-serif" }}
          >
            {translateSync(description)}
            {descBold && <strong className="text-gray-900">{translateSync(descBold)}</strong>}
            {descAfter && translateSync(descAfter)}
          </p>
        )}

        {children}

      </div>
    </>
  );
}