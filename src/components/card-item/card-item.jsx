import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import exclusiveImg from "../../assets/exclusive.png";
import { CONFIG } from "src/config-global";
import { Link } from "react-router-dom";
import { paths } from "src/router/paths";
import { TranslatedText } from "../translated-text/translated-text";
import { useTranslation } from "react-i18next";
import offre_flash_image from "../../assets/images/SPC-picto-offre-flash-2.svg";

export default function CardItem({
  nom,
  slug,
  description,
  offre_flash,
  date_debut,
  date_fin,
  access_spa,
  prix,
  prix_barre,
  prix_au_lieu_de,
  image,
  exclusivite_image,
  gallery,
}) {
  const { t } = useTranslation();

  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");

  const timerRef = useRef(null);
  const dotsContainerRef = useRef(null);

  const hasMultipleImages = images.length > 1;

  const isOfferActive =offre_flash === 1 && date_fin && new Date(date_fin) > new Date();

  useEffect(() => {
    const allImages = [];

    if (image) allImages.push(image);
    if (Array.isArray(gallery)) {
      allImages.push(...gallery.filter((img) => img?.trim()));
    }

    setImages(allImages);
  }, [image, gallery]);

  useEffect(() => {
    if (!isOfferActive) {
      setRemainingTime("");
      return;
    }

    const updateCountdown = () => {
      const diffMs = new Date(date_fin) - new Date();

      if (diffMs <= 0) {
        setRemainingTime(t("Expiré"));
        return;
      }

      const days = Math.floor(diffMs / 86400000);
      const hours = Math.floor((diffMs / 3600000) % 24);
      const minutes = Math.floor((diffMs / 60000) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      setRemainingTime(`${days}j ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [date_fin, isOfferActive, t]);

  // ─── Auto slider ───────────────────────────────────────────
  useEffect(() => {
    if (!hasMultipleImages) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timerRef.current);
  }, [hasMultipleImages, images.length]);

  // ─── Slider controls ───────────────────────────────────────
  const resetTimer = () => {
    if (!hasMultipleImages) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    resetTimer();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetTimer();
  };

  // ─── Dots visible range ────────────────────────────────────
  const getVisibleDots = (current, total, visibleCount = 5) => {
    let start = Math.max(0, current - Math.floor(visibleCount / 2));
    start = Math.min(start, total - visibleCount);
    return Array.from(
      { length: Math.min(visibleCount, total) },
      (_, i) => start + i,
    );
  };

  const dotsStyle = `
    .dots-container::-webkit-scrollbar { display: none; }
    .dots-container { -ms-overflow-style: none; scrollbar-width: none; }
  `;

  return (
    <motion.div className="flex flex-col gap-4 py-7 border-b border-gray-400 md:flex-row">
      <div className="relative w-full md:w-[30%]">
        <div className="w-full h-[190px] rounded-md relative overflow-hidden">
          {images.map((src, index) => (
            <img
              key={index}
              src={`${CONFIG.serverUrl}/storage/${src}`}
              alt={t(`Spa & Prestige Slide ${index + 1}`)}
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

        {hasMultipleImages && (
          <>
            <button
              onClick={goToPrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 rounded-full transition-colors duration-300"
              aria-label={t("Previous slide")}
            >
              <FaChevronLeft size={20} />
            </button>

            <button
              onClick={goToNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 rounded-full transition-colors duration-300"
              aria-label={t("Next slide")}
            >
              <FaChevronRight size={20} />
            </button>

            <style>{dotsStyle}</style>
            <div
              ref={dotsContainerRef}
              className="dots-container absolute bottom-2 left-0 right-0 flex justify-center items-center h-6"
            >
              <div className="flex items-center gap-2">
                {getVisibleDots(currentSlide, images.length).map((index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`flex-shrink-0 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "w-3 h-3 bg-black"
                        : "w-2 h-2 bg-gray-400 hover:bg-gray-500"
                    }`}
                    aria-label={t(`Go to slide ${index + 1}`)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-full md:w-[40%]">
        <h3 className="text-2xl text-left font-normal text-gray-900">{nom}</h3>

        <div className="text-left font-normal font-tahoma text-black mt-1">
          <div
            dangerouslySetInnerHTML={{
              __html: showFullDescription
                ? description || ""
                : description?.length > 150
                  ? description.slice(0, 175) + "..."
                  : description || "",
            }}
          />

          {description?.length > 150 && (
            <span
              className="font-semibold font-tahoma text-black cursor-pointer"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? t(" (Voir moins)") : t(" (Lire la suite)")}
            </span>
          )}
        </div>

        <p className="text-left font-roboto text-base text-[#333] mt-2">
          {access_spa}
        </p>
      </div>

      <div className="hidden md:flex md:w-[30%] flex-col items-center justify-center gap-4">
        {/* Prix */}
        <div className="flex flex-col items-center font-tahoma gap-1">
          {prix_barre && Number(prix_barre) !== Number(prix) && (
            <span className="text-gray-500 line-through text-base">
              {Number(prix_barre).toFixed(2)} €
            </span>
          )}

          {prix && (
            <span className="text-xl font-bold text-gray-900">
              {Number(prix).toFixed(2)} €
            </span>
          )}

          {prix_au_lieu_de && Number(prix_au_lieu_de) !== Number(prix) && (
            <div className="text-center text-sm">
              <div className="font-bold">{Number(prix).toFixed(2)} €</div>
              <div>
                <TranslatedText text="Au lieu de" />{" "}
                {Number(prix_au_lieu_de).toFixed(2)} €
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-3">
          {/* Image exclusivité */}
          {exclusivite_image && (
            <img
              loading="lazy"
              src={`${CONFIG.serverUrl}/storage/${exclusivite_image}`}
              alt="Exclusivité"
              className="w-auto h-auto my-2"
            />
          )}

          {/* Offre flash */}
          {isOfferActive && (
            <div className="flex items-center gap-2 px-3 py-2 border-dashed rounded-lg border-2 font-tahoma w-full justify-center">
              <div class="w-full border-t-4 border-b-4 border-black py-3 text-center">
                <span class="font-bold text-black tracking-[0.2em] uppercase">
                  OFFRE FLASH
                </span>

                <div class="text-xs font-bold text-gray-800 mt-1">
                  {remainingTime}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Button */}
        {slug && (
          <Link to={paths.product(slug)} className="w-full mt-2">
            <button className="w-auto mx-auto px-4 py-3 bg-black leading-4 rounded-2xl text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma flex items-center justify-center gap-2">
              <TranslatedText text="Découvrir" />
            </button>
          </Link>
        )}
      </div>

      {/* ====================== MOBILE BOTTOM BAR ====================== */}
      <div className="flex md:hidden w-full items-center justify-between gap-3 mt-2">
        {/* Prix mobile */}
        <div className="flex flex-col items-center font-tahoma">
          {prix_barre && Number(prix_barre) !== Number(prix) && (
            <span className="text-gray-500 line-through text-sm">
              {Number(prix_barre).toFixed(2)} €
            </span>
          )}

          {prix && (
            <span className="text-base font-bold text-gray-900">
              {Number(prix).toFixed(2)} €
            </span>
          )}
        </div>

        {/* Exclusivité + Flash mobile */}
        <div className="flex flex-col gap-2 items-center">
          {exclusivite_image && (
            <img
              loading="lazy"
              src={`${CONFIG.serverUrl}/storage/${exclusivite_image}`}
              alt={t("Exclusivité")}
              className="w-auto h-auto max-w-[100px]"
            />
          )}

          {isOfferActive && (
            <div className="w-full flex flex-col items-center justify-center gap-1 px-2 py-1 border-2 border-dashed rounded-lg font-tahoma">
              <div className="w-full border-t-2 border-b-2 border-black py-1 text-center">
                <span className="font-bold text-black text-xs tracking-[0.15em] uppercase">
                  <TranslatedText text="OFFRE FLASH" />
                </span>
                <div className="text-[10px] font-bold text-gray-800 mt-1">
                  {remainingTime}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Button mobile */}
        {slug && (
          <Link to={paths.product(slug)}>
            <button className="px-4 py-3 bg-black leading-4 rounded-2xl text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma whitespace-nowrap">
              <TranslatedText text="Commander" />
            </button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
