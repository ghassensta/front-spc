import React, { useState, useEffect, useRef } from "react";
import { CONFIG } from "src/config-global";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useTranslation } from "src/context/translation-context";

export default function ImageCarousel({ images = [] }) {
  const { translateSync } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);   // modal masonry
  const [lightboxOpen, setLightboxOpen] = useState(false); // lightbox zoom
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const timerRef = useRef(null);
  const imgLength = images.length;

  const slides = images.map((img) => ({
    src: `${CONFIG.serverUrl}/storage/${img}`,
  }));

  useEffect(() => {
    if (imgLength === 0) return;
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imgLength);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [imgLength]);

  // Bloquer le scroll body quand la galerie est ouverte
  useEffect(() => {
    document.body.style.overflow = galleryOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [galleryOpen]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imgLength);
    }, 5000);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + imgLength) % imgLength);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % imgLength);
    resetTimer();
  };

  const openImageFromGallery = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (imgLength === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-xl shadow-lg">
        <p className="text-gray-500">{translateSync("Aucune image disponible")}</p>
      </div>
    );
  }

  return (
    <>
      {/* ── CAROUSEL ─────────────────────────────────────────────────────── */}
      <div className="relative w-full mx-auto overflow-hidden rounded-xl flex shadow-lg h-full">
        <div className="w-full h-full relative overflow-hidden">
          {images.map((src, index) => (
            <img
              key={index}
              src={`${CONFIG.serverUrl}/storage/${src}`}
              alt={translateSync(`Image Spa & Prestige ${index + 1}`)}
              className={`absolute top-0 h-full left-0 w-full object-cover transition-transform duration-1000 ease-in-out ${
                currentSlide === index
                  ? "translate-x-0"
                  : index < currentSlide
                  ? "-translate-x-full"
                  : "translate-x-full"
              }`}
              loading="lazy"
            />
          ))}
        </div>

        <button onClick={goToPrev}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-white p-2 rounded-full z-10 bg-black/40 hover:bg-black/70 transition-colors duration-300"
          aria-label={translateSync("Image précédente")}
        >
          <FaChevronLeft size={20} />
        </button>

        <button onClick={goToNext}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-white p-2 rounded-full z-10 bg-black/40 hover:bg-black/70 transition-colors duration-300"
          aria-label={translateSync("Image suivante")}
        >
          <FaChevronRight size={20} />
        </button>

        <button
          onClick={() => setGalleryOpen(true)}
          className="absolute bottom-3 right-3 z-10 px-2 py-2 opacity-80 bg-white text-black uppercase font-normal text-xs tracking-[2px] hover:bg-gray-200 transition font-tahoma flex items-center gap-2"
        >
          <IoImageOutline className="text-xl" />
          {translateSync("Voir les photos")}
        </button>
      </div>

      {/* ── MODAL GALERIE MASONRY ─────────────────────────────────────────── */}
      {galleryOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">

          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
            <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">
              {imgLength} {translateSync("photos")}
            </p>
            <button
              onClick={() => setGalleryOpen(false)}
              className="flex items-center gap-2 text-sm font-medium hover:text-gray-600 transition"
            >
              <FaTimes size={16} />
              {translateSync("Fermer")}
            </button>
          </div>

          {/* Grille masonry (2 colonnes comme ta capture) */}
          <div className="max-w-5xl mx-auto px-4 py-6 columns-2 gap-3 space-y-3">
            {images.map((src, index) => (
              <img
                key={index}
                src={`${CONFIG.serverUrl}/storage/${src}`}
                alt={translateSync(`Photo ${index + 1}`)}
                className="w-full break-inside-avoid rounded-sm cursor-zoom-in hover:opacity-90 transition-opacity duration-200 object-cover"
                loading="lazy"
                onClick={() => openImageFromGallery(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── LIGHTBOX ZOOM (clic sur une image dans la galerie) ───────────── */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 4,
          scrollToZoom: true,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
        }}
      />
    </>
  );
}