import React, { useState, useEffect, useCallback } from "react";
import { CONFIG } from "src/config-global";
import { paths } from "src/router/paths";
import { useGetHomePage } from "src/actions/homepage";
import { Link } from "react-router-dom";
import { MapPin, Tag, Search, Gift } from "lucide-react";
import { useTranslation } from "src/context/translation-context";

// ─── HELPERS ────────────────────────────────────────────────────────────────

function getImageSrcSet(baseUrl) {
  return {
    src: baseUrl,
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
    setCurrentSlide(
      (prev) => (prev - 1 + etablissements.length) % etablissements.length,
    );
    setIsAutoPlaying(true);
  }, [etablissements.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  }, []);

  const current = etablissements[currentSlide];

  return (
    <div
      className="relative w-screen left-[calc(-50vw+50%)] overflow-hidden"
      style={{
        minHeight: "500px",
        maxHeight: "calc(100vh - 90px)",
        aspectRatio: "16/9",
        contain: "layout",
      }}
    >
      {/* ── Slides ── */}
      {etablissements.map((s, index) => {
        const imageUrl = `${CONFIG.serverUrl}/storage/${s.image}`;
        const { src, srcSet, sizes } = getImageSrcSet(imageUrl);

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out z-10 ${
              index === currentSlide ? "opacity-100 z-20" : "opacity-0"
            }`}
          >
            <img
              src={src}
              srcSet={srcSet}
              sizes={sizes}
              alt={`Slide ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
              fetchpriority={index === 0 ? "high" : "low"}
              decoding={index === 0 ? "sync" : "async"}
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
            {/* Dégradé gauche pour lisibilité du texte */}
            {!imageErrors[index] && (
              <div
                className="absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)",
                }}
              />
            )}
          </div>
        );
      })}

      {/* ── Overlay texte + boutons directement sur l'image ── */}
      {!!current && (
        <div className="absolute bottom-8 md:bottom-8 left-6 md:left-14 z-40 max-w-md">
          {/* Badge remise */}
          {current.remise_offres > 0 && (
            <span className="inline-flex items-center gap-1.5 bg-[#b8955a] text-white font-roboto font-bold px-4 py-1.5 rounded-full text-xs mb-2">
              <Tag className="w-3 h-3" aria-hidden="true" />
              {translateSync("Jusqu'à")} {current.remise_offres}%{" "}
              {translateSync("de remise")}
            </span>
          )}

          {/* Titre marque — statique */}
          <p
            className="text-4xl md:text-5xl font-medium text-white leading-[1.1] mb-2"
            style={{ fontFamily: "Cormorant Garamond" }}
          >
            {translateSync("Des expériences dédiées à votre bien-être")}
          </p>

          {/* Sous-titre marque — statique */}
          <p className="text-sm text-white/90 mb-3 leading-snug max-w-sm">
            {translateSync("Une sélection d'adresses d'exception pour vivre des expériences uniques.")}
          </p>

          {/* ── Deux boutons côte à côte ── */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3">
            {/* Bouton 1 — doré plein */}
            <Link
              to={paths.spa.list}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 sm:gap-3 bg-[#b8955a] text-white no-underline px-3 sm:px-5 py-2.5 sm:py-4 rounded-lg shadow-md hover:bg-[#a0814d] hover:shadow-xl hover:-translate-y-1 hover:scale-[1.03] active:scale-95 transition-all duration-200 ease-out max-w-fit"
            >
              <Search
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                aria-hidden="true"
              />

              <span className="flex flex-col gap-0.5">
                <span
                  className="font-bold uppercase tracking-[1px] sm:tracking-[2px] text-xs sm:text-sm leading-tight whitespace-nowrap"
                  style={{ fontFamily: "Cormorant Garamond" }}
                >
                  {translateSync("Trouver la prestation")}
                </span>

                <span
                  className="font-light text-[10px] sm:text-xs leading-tight opacity-90 normal-case tracking-wide whitespace-nowrap"
                  style={{ fontFamily: "Cormorant Garamond" }}
                >
                  {translateSync("Découvrez nos établissements")} →
                </span>
              </span>
            </Link>

            {/* Bouton 2 — blanc, contenu tout en noir (icône + textes) */}
            <Link
              to={paths.cadeau || "#"}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 sm:gap-3 bg-white/95 text-black no-underline px-3 sm:px-5 py-2.5 sm:py-4 rounded-lg shadow-md hover:bg-white hover:shadow-xl hover:-translate-y-1 hover:scale-[1.03] active:scale-95 transition-all duration-200 ease-out max-w-fit"
            >
              <Gift
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-black"
                aria-hidden="true"
              />

              <span className="flex flex-col gap-0.5">
                <span
                  className="font-bold uppercase tracking-[1px] sm:tracking-[2px] text-xs sm:text-sm leading-tight text-black whitespace-nowrap"
                  style={{ fontFamily: "Cormorant Garamond" }}
                >
                  {translateSync("Offrir une carte cadeau")}
                </span>

                <span
                  className="font-light text-[10px] sm:text-xs leading-tight text-black normal-case tracking-wide whitespace-nowrap"
                  style={{ fontFamily: "Cormorant Garamond" }}
                >
                  {translateSync("Le plaisir d'offrir")}
                </span>
              </span>
            </Link>
          </div>
          {/* Établissement actif + adresse */}
          <div className="flex items-start gap-2 mb-2 text-white font-tahoma">
            <MapPin
              className="w-3.5 h-3.5 text-white flex-shrink-0 mt-[3px]"
              aria-hidden="true"
            />
            <div className="leading-snug">
              <div className="text-xs font-bold uppercase tracking-[1.5px]">
                {translateSync(current.title)}
              </div>
              <div className="text-[11px] opacity-90">
                {current.adresse}
              </div>
            </div>
          </div>

          {/* En savoir plus — ligne dédiée sous l'établissement */}
          <Link
            to={paths.spa.details(current.slug)}
            className="inline-block text-sm font-tahoma font-bold text-white hover:underline no-underline"
          >
            {translateSync("En savoir plus")} →
          </Link>
        </div>
      )}

      {/* ── Slider controls ── */}
      {etablissements.length > 0 && (
        <div className="hidden md:flex absolute font-tahoma bottom-6 right-8 z-30 items-center gap-3 bg-white shadow-lg px-3 py-1 rounded-lg border border-gray-200">
          <button
            onClick={prevSlide}
            className="text-lg font-semibold hover:bg-gray-100 p-2 rounded transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Slide précédent"
          >
            ←
          </button>

          <span
            className="text-xs font-semibold text-gray-700"
            aria-live="polite"
            aria-atomic="true"
          >
            {currentSlide + 1}/{etablissements.length}
          </span>

          <button
            onClick={nextSlide}
            className="text-lg font-semibold hover:bg-gray-100 p-2 rounded transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Slide suivant"
          >
            →
          </button>

          <div
            className="flex items-center gap-2 ml-2"
            role="tablist"
            aria-label="Navigation des slides"
          >
            {etablissements.map((_, index) => (
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
