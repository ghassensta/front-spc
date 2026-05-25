import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CONFIG } from "src/config-global";

export default function ProductCarousel({ gallery = [], image = "" }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  // Préparation des images
  useEffect(() => {
    const newImages = [];
    if (image?.trim()) newImages.push(image.trim());
    if (Array.isArray(gallery)) {
      newImages.push(...gallery.filter((img) => img?.trim()));
    }
    setImages(newImages);
    // Reset au premier slide quand les images changent
    setCurrentSlide(0);
  }, [image, gallery]);

  // Nombre total d'images (très utile)
  const totalImages = images.length;
  const hasMultipleImages = totalImages > 1;

  // Défilement automatique uniquement si plusieurs images
  useEffect(() => {
    if (!hasMultipleImages) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalImages);
    }, 5000);

    return () => clearInterval(timerRef.current);
  }, [hasMultipleImages, totalImages]);

  // Reset du timer après action manuelle
  const resetTimer = () => {
    if (!hasMultipleImages) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalImages);
    }, 5000);
  };

  const goToPrev = () => {
    if (totalImages === 0) return;
    setCurrentSlide((prev) => (prev - 1 + totalImages) % totalImages);
    resetTimer();
  };

  const goToNext = () => {
    if (totalImages === 0) return;
    setCurrentSlide((prev) => (prev + 1) % totalImages);
    resetTimer();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetTimer();
  };

  // Si aucune image → on ne rend rien
  if (totalImages === 0) return null;

  return (
    <div className="relative w-auto rounded-md">
      {/* Conteneur des images */}
      <div className="w-full h-[300px] relative overflow-hidden rounded-md">
        {images.map((src, index) => (
          <img
            key={index}
            src={`${CONFIG.serverUrl}/storage/${src}`}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out ${
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

      {/* Compteur mobile : remplace les dots (1/5) */}
      {hasMultipleImages && (
        <div className="md:hidden absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/55 text-white text-xs font-tahoma tracking-wider backdrop-blur-sm">
          {currentSlide + 1} / {totalImages}
        </div>
      )}

      {/* Flèches : uniquement si + d'une image */}
      {hasMultipleImages && (
        <>
          <button
            onClick={goToPrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 rounded-full transition-colors duration-300 bg-black/40 hover:bg-black/70"
            aria-label="Previous slide"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 rounded-full transition-colors duration-300 bg-black/40 hover:bg-black/70"
            aria-label="Next slide"
          >
            <FaChevronRight size={20} />
          </button>
        </>
      )}

      {/* Points de navigation (max 6 visibles) — cachés sur mobile */}
      {hasMultipleImages && (
        <div className="hidden md:flex absolute bottom-4 left-1/2 transform -translate-x-1/2 space-x-2">
          {(() => {
            const maxDots = 6;

            if (totalImages <= maxDots) {
              return images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-white scale-125"
                      : "bg-white/60 hover:bg-white/90"
                  }`}
                />
              ));
            }

            let start = Math.max(0, currentSlide - 2);
            start = Math.min(start, totalImages - maxDots);
            const visible = images.slice(start, start + maxDots);

            return visible.map((_, i) => {
              const realIndex = start + i;

              return (
                <button
                  key={realIndex}
                  onClick={() => goToSlide(realIndex)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === realIndex
                      ? "bg-white scale-125"
                      : "bg-white/60 hover:bg-white/90"
                  }`}
                />
              );
            });
          })()}
        </div>
      )}
    </div>
  );
}
