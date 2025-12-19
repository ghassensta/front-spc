import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import exclusive from "../../assets/exclusive.png";
import { CONFIG } from "src/config-global";
import { Link } from "react-router-dom";
import { paths } from "src/router/paths";

export default function CardItem({
  id,
  type_id,
  nom,
  slug,
  description,
  conditions_utilisation,
  offre_flash,
  date_debut,
  date_fin,
  access_spa,
  prix,
  prix_barre,
  prix_au_lieu_de,
  image,
  exclusivite_spc,
  gallery,
  ordre,
}) {

  const [remaining, setRemaining] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const dotsContainerRef = useRef(null);
  const dotRefs = useRef([]);

  useEffect(() => {
    const activeDot = dotRefs.current[currentSlide];
    if (activeDot && dotsContainerRef.current) {
      const container = dotsContainerRef.current;
      const containerWidth = container.offsetWidth;
      const dotLeft = activeDot.offsetLeft;
      const dotWidth = activeDot.offsetWidth;
      const scrollTo = dotLeft - containerWidth / 2 + dotWidth / 2;

      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  }, [currentSlide]);

  useEffect(() => {
    const newImages = [];
    if (image) {
      newImages.push(image);
    }
    if (Array.isArray(gallery)) {
      const filteredGallery = gallery.filter((img) => img && img.trim() !== "");
      newImages.push(...filteredGallery);
    }
    setImages(newImages);
  }, [image, gallery]);

  useEffect(() => {
    if (!date_fin) return;

    const updateCountdown = () => {
      const now = new Date();
      const end = new Date(date_fin);
      const diff = end - now;

      if (diff <= 0) {
        setRemaining("Expiré");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setRemaining(`${days}j ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [date_fin]);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const timerRef = useRef(null);

  // Auto-slide functionality
  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, 5000);
    };

    startTimer();

    return () => clearInterval(timerRef.current);
  }, [images.length]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetTimer();
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    resetTimer();
  };

  const dotsStyle = `
  .dots-container::-webkit-scrollbar {
    display: none;
  }
  .dots-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
  // Add this function to calculate visible dots range
  const getVisibleDots = (current, total, visibleCount = 5) => {
    let start = Math.max(
      0,
      Math.min(current - Math.floor(visibleCount / 2), total - visibleCount)
    );
    start = Math.max(0, Math.min(start, total - visibleCount));
    return Array.from(
      { length: Math.min(visibleCount, total) },
      (_, i) => start + i
    );
  };
  return (
    <motion.div className="flex flex-col gap-4 py-7 border-b border-gray-400 md:flex-row">
      {}
      <div className="relative w-full md:w-[30%]">
        <div className="w-full h-[190px] rounded-md relative overflow-hidden">
          {images.map((src, index) => (
            <img
              key={index}
              src={CONFIG.serverUrl + "/storage/" + src}
              alt={`Spa & Prestige Slide ${index + 1}`}
              className={`absolute top-0 h-[190px] left-0 w-full object-cover transition-transform duration-1000 ease-in-out ${
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
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 rounded-full transition-colors duration-300"
          aria-label="Previous slide"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 rounded-full transition-colors duration-300"
          aria-label="Next slide"
        >
          <FaChevronRight size={20} />
        </button>
        {}
        <style>{dotsStyle}</style>
        <div
          ref={dotsContainerRef}
          className="dots-container absolute bottom-2 left-0 right-0 flex justify-center items-center h-6"
        >
          <div className="flex items-center gap-2">
            {getVisibleDots(currentSlide, images.length).map((index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  resetTimer();
                }}
                className={`flex-shrink-0 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-3 h-3 bg-black"
                    : "w-2 h-2 bg-gray-400 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {}
      <div className="w-full md:w-[40%]">
        <h3 className="text-2xl text-left font-normal text-gray-900">{nom}</h3>

        <div className="text-left font-normal font-tahoma text-black mt-1">
          <div
            dangerouslySetInnerHTML={{
              __html: showFullDescription
                ? description
                : description?.length > 150
                ? description.slice(0, 175) + "..."
                : description || "",
            }}
          />

          {description && description.length > 150 && (
            <span
              className="font-semibold font-tahoma text-black cursor-pointer"
              onClick={toggleDescription}
            >
              {showFullDescription ? " (Voir moins)" : " (Lire la suite)"}
            </span>
          )}
        </div>

        <p className="text-left font-roboto text-base text-[#333] mt-2">
          {access_spa}
        </p>
      </div>

      {}
      <div className="hidden md:flex md:w-[10%] gap-2 md:gap-0 items-center justify-center md:flex-col font-tahoma">
        {prix &&
          !prix_au_lieu_de &&
          parseFloat(prix) !== 0 &&
          parseFloat(prix_barre) !== 0 &&
          parseFloat(prix_au_lieu_de) !== 0 && (
            <span className="text-base font-normal text-gray-900">
              {parseFloat(prix).toFixed(2)} €
            </span>
          )}
        {prix_barre &&
          parseFloat(prix_barre) !== 0 &&
          parseFloat(prix_barre) !== parseFloat(prix) && (
            <span className="text-gray-500 line-through text-base">
              {parseFloat(prix_barre).toFixed(2)} €
            </span>
          )}
        {prix_au_lieu_de &&
          parseFloat(prix_au_lieu_de) !== 0 &&
          parseFloat(prix_au_lieu_de) !== parseFloat(prix) && (
            <span className="text-center text-base text-gray-900">
              <div className="font-bold">{parseFloat(prix).toFixed(2)} €</div>
              <div className="text-sm">Au lieu de </div>
              <div className="text-sm">
                {parseFloat(prix_au_lieu_de).toFixed(2)} €
              </div>
            </span>
          )}
      </div>

      {}
      <div className="hidden md:flex md:w-[20%] flex-col items-center justify-center">
        {exclusivite_spc === 1 && (
          <img
            loading="lazy"
            src={exclusive}
            alt="Exclusivité"
            className="w-auto h-auto my-2"
          />
        )}
        {offre_flash === 1 && date_fin && (
          <div className="flex flex-col items-center px-1 py-2 border-dashed rounded-lg border-2 font-tahoma w-full">
            <span className="text-sm font-medium text-red-600">
              Offre flash
            </span>
            <div className="text-xs font-bold text-gray-800 mt-1">
              {remaining}
            </div>
          </div>
        )}
        {slug && (
          <>
            <div />
            <Link to={paths.product(slug)} className="w-full">
              <button className="w-auto mx-auto mt-4 px-4 py-3 bg-black leading-4 rounded-2xl text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma flex items-center justify-center gap-2">
                Commander
              </button>
            </Link>
          </>
        )}
      </div>

      {}
      <div className="flex md:hidden w-full items-center justify-between gap-3">
        {}
        <div className="flex flex-col items-center font-tahoma">
          {prix &&
            !prix_au_lieu_de &&
            parseFloat(prix) !== 0 &&
            parseFloat(prix_barre) !== 0 &&
            parseFloat(prix_au_lieu_de) !== 0 && (
              <span className="text-base font-normal text-gray-900">
                {parseFloat(prix).toFixed(2)} €
              </span>
            )}
          {prix_barre &&
            parseFloat(prix_barre) !== 0 &&
            parseFloat(prix_barre) !== parseFloat(prix) && (
              <span className="text-gray-500 line-through text-sm">
                {parseFloat(prix_barre).toFixed(2)} €
              </span>
            )}
          {prix_au_lieu_de &&
            parseFloat(prix_au_lieu_de) !== 0 &&
            parseFloat(prix_au_lieu_de) !== parseFloat(prix) && (
              <span className="text-center text-base text-gray-900">
                <div className="font-bold">{parseFloat(prix).toFixed(2)} €</div>
                <div className="text-xs">Au lieu de </div>
                <div className="text-xs">
                  {parseFloat(prix_au_lieu_de).toFixed(2)} €
                </div>
              </span>
            )}
        </div>
        {}
        <div className="flex flex-col gap-2">
          {exclusivite_spc === 1 && (
            <img
              loading="lazy"
              src={exclusive}
              alt="Exclusivité"
              className="w-auto h-auto max-w-[100px]"
            />
          )}
          {offre_flash === 1 && date_fin && (
            <div className="flex flex-col items-center px-2 py-1 border-dashed rounded-lg border-2 font-tahoma">
              <span className="text-xs font-medium text-red-600">
                Offre flash
              </span>
              <div className="text-xs font-bold text-gray-800">{remaining}</div>
            </div>
          )}
        </div>
        {}
        {slug && (
          <Link to={paths.product(slug)}>
            <button className="px-4 py-3 bg-black leading-4 rounded-2xl text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma whitespace-nowrap">
              Commander
            </button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
