import React, { useState, useEffect, useCallback } from "react";
import { CONFIG } from "src/config-global";
import { paths } from "src/router/paths";
import { useGetHomePage } from "src/actions/homepage";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useTranslation } from "src/context/translation-context";

// ─── HELPERS ────────────────────────────────────────────────────────────────

/**
 * FIX LCP/CLS — Génère un srcSet responsive pour les images du slider.
 * Les slides originales font ~957x1318 mais s'affichent en 850x567.
 * On demande au backend de servir les bonnes tailles via des suffixes d'URL
 * (adapter selon votre CDN / transformations d'images).
 *
 * Si vous n'avez pas de resize CDN, remplacez getImageSrcSet par :
 *   const getImageSrcSet = () => ({ src, srcSet: src, sizes: "100vw" });
 */
function getImageSrcSet(baseUrl) {
  // Adapter les suffixes selon votre CDN (Cloudinary, Imgix, Laravel intervention, etc.)
  // Exemple générique — à ajuster :
  return {
    src: baseUrl,                // fallback
    srcSet: [
      `${baseUrl}?w=400 400w`,
      `${baseUrl}?w=850 850w`,
      `${baseUrl}?w=1200 1200w`,
    ].join(", "),
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 850px",
  };
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function Header() {
  const { translateSync } = useTranslation();
  const { sections } = useGetHomePage();

  const section1 = sections?.find((s) => s.key === "section1");
  const etablissements = section1?.cards || [];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = useCallback((index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || etablissements.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % etablissements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, etablissements.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % etablissements.length);
    setIsAutoPlaying(true);
  }, [etablissements.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + etablissements.length) % etablissements.length);
    setIsAutoPlaying(true);
  }, [etablissements.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  }, []);

  const current = etablissements[currentSlide];

  return (
    /*
     * FIX CLS (score 0.060) — Le conteneur avait min-h-[500px] mais pas de
     * hauteur réservée au premier paint, causant un layout shift quand les
     * images arrivaient. On force un aspect-ratio ET un min-height pour que
     * l'espace soit réservé dès le premier rendu CSS, avant tout JS.
     *
     * AVANT : className="relative w-screen left-[calc(-50vw+50%)] h-full overflow-hidden min-h-[500px]"
     * APRÈS : ajout de style={{ aspectRatio: "16/9", ... }} + contain layout
     */
    <div
      className="relative w-screen left-[calc(-50vw+50%)] overflow-hidden"
      style={{
        minHeight: "500px",
        // Réserve l'espace vertical avant que les images se chargent → évite CLS
        aspectRatio: "16/9",
        // Isole le repaint des slides du reste du document
        contain: "layout",
      }}
    >
      {etablissements.map((s, index) => {
        const imageUrl = `${CONFIG.serverUrl}/storage/${s.image}`;
        // FIX LCP — srcSet responsive (voir helper en haut)
        const { src, srcSet, sizes } = getImageSrcSet(imageUrl);

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out z-10 ${
              index === currentSlide ? "opacity-100 z-20" : "opacity-0"
            }`}
          >
            {/*
             * FIX LCP / CLS / Accessibilité :
             *
             * AVANT :
             *   <img src="..." loading={index===0?"eager":"lazy"} fetchpriority="high|low" />
             *   Pas de width/height → CLS
             *   Pas de srcSet → image de 957x1318 servie pour un affichage 850x567
             *
             * APRÈS :
             *   width + height explicites → le navigateur réserve l'espace → CLS ↓
             *   srcSet + sizes → image redimensionnée par le navigateur → LCP ↓
             *   fetchpriority="high" uniquement sur la 1ère slide (déjà présent)
             *   decoding="async" sur les slides non visibles → thread principal libéré
             */}
            <img
              src={src}
              srcSet={srcSet}
              sizes={sizes}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              fetchpriority={index === 0 ? "high" : "low"}
              decoding={index === 0 ? "sync" : "async"}
              /*
               * FIX CLS — width/height correspondent aux dimensions AFFICHÉES
               * (850x567 selon le rapport Lighthouse), pas aux dimensions natives.
               * Le navigateur calcule ainsi le ratio avant de charger l'image.
               */
              width={850}
              height={567}
              onError={() => handleImageError(index)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {!imageErrors[index] && (
              <div className="absolute inset-0 bg-black/20 z-10" />
            )}
          </div>
        );
      })}

      {!!current && (
        <div className="absolute bottom-24 md:bottom-8 left-4 md:left-12 z-40 text-gray-900 rounded-md shadow-lg w-[90%] max-w-md backdrop-blur-sm">
          <Link
            to={paths.spa.details(current.slug)}
            className="block relative z-10 p-6 no-underline hover:no-underline"
          >
            {current.remise_offres > 0 && (
              <p className="absolute top-0 -translate-y-1/2 bg-[#B6B499] text-black font-bold font-roboto px-4 py-2 rounded-full text-sm z-10">
                {translateSync("Jusqu'à")} {current.remise_offres}%{" "}
                {translateSync("de remise")}
              </p>
            )}

            <p
              className="text-2xl md:text-3xl font-bold mb-1"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              {translateSync(current.title)}
            </p>

            <p className="text-base text-gray-900 mb-1 leading-snug font-bold">
              {translateSync(current.description)}
            </p>

            {current.prix_offres > 0 && (
              <p className="text-base text-gray-700 mb-4 font-bold">
                {translateSync("Offres exclusives à partir de")}{" "}
                <span className="font-semibold text-black">
                  {current.prix_offres}€
                </span>
              </p>
            )}

            <div className="flex items-center gap-2 bg-[#020100C9] text-white font-tahoma font-light uppercase tracking-[2px] w-fit py-2 px-2 rounded-full text-[10px]">
              {/*
               * FIX Accessibilité — MapPin est décoratif ici, on le cache
               * aux lecteurs d'écran avec aria-hidden
               */}
              <MapPin className="w-4 h-4 text-white" aria-hidden="true" />
              {current.adresse}
            </div>

            <p className="text-sm font-tahoma text-secondary font-bold hover:underline mt-3">
              {translateSync("En savoir plus")} →
            </p>
          </Link>

          <div
            className="absolute rounded-md top-0 left-0 bg-white/95 h-full w-[105%]"
            style={{
              clipPath: "polygon(95% 0, 100% 50%, 95% 100%, 0 100%, 0 0)",
            }}
          />
        </div>
      )}

      {/* Slider controls */}
      {etablissements.length > 0 && (
        <div className="absolute font-tahoma bottom-6 right-8 z-20 flex items-center gap-3 bg-white shadow-lg px-4 py-2 rounded-lg border border-gray-200">
          {/*
           * FIX Accessibilité — aria-label déjà présent sur ces boutons ✓
           * FIX Bonnes pratiques — taille minimum 44x44px pour les zones tactiles.
           * Les boutons ← → étaient trop petits (p-1 = ~28px).
           * AVANT : className="... p-1 ..."
           * APRÈS : className="... p-2 min-w-[44px] min-h-[44px] ..."
           */}
          <button
            onClick={prevSlide}
            className="text-lg font-semibold hover:bg-gray-100 p-2 rounded transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Slide précédent"
          >
            ←
          </button>

          <span className="text-xs font-semibold text-gray-700" aria-live="polite" aria-atomic="true">
            {/*
             * FIX Accessibilité — aria-live permet aux lecteurs d'écran
             * d'annoncer le changement de slide automatiquement
             */}
            {currentSlide + 1}/{etablissements.length}
          </span>

          <button
            onClick={nextSlide}
            className="text-lg font-semibold hover:bg-gray-100 p-2 rounded transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Slide suivant"
          >
            →
          </button>

          <div className="flex items-center gap-2 ml-2" role="tablist" aria-label="Navigation des slides">
            {etablissements.map((_, index) => (
              /*
               * FIX Bonnes pratiques — Les dots faisaient w-2.5 h-2.5 = 10px.
               * Trop petit pour les zones tactiles (minimum recommandé : 44px).
               * AVANT : className="w-2.5 h-2.5 rounded-full ..."
               * APRÈS : wrapper 44x44 transparent + point visuel centré dedans
               */
              <button
                key={index}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`Aller au slide ${index + 1}`}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded transition-colors hover:bg-gray-100"
              >
                <span
                  className={`block w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentSlide ? "bg-gray-900" : "bg-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}