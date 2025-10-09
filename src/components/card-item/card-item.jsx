import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaShoppingBag } from "react-icons/fa";
import exclusive from "../../assets/exclusive.png";
import ButtonIcon from "../button-icon/button-icon";
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

  // Combine image and gallery into images state
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

  console.log(images);

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
        }, 5000); // Change slide every 5 seconds
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

  return (
    <motion.div className="flex flex-col md:flex-row gap-4 py-7 border-b border-gray-400">
      {/* Image */}
      <div className="relative w-full md:w-[30%]">
        <div className=" w-full  h-[190px] rounded-md relative overflow-hidden">
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
        {/* Navigation Dots */}
        <div className="absolute mt-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? "bg-black" : "bg-gray-400"
              } hover:bg-[#B6B498] transition-colors duration-300`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="md:w-[40%]">
        <h3 className="text-2xl text-left font-normal text-gray-900">{nom}</h3>
        <p className="text-left font-normal font-tahoma text-black mt-1">
          {showFullDescription
            ? description
            : description?.length > 150
            ? description.slice(0, 175) + "..."
            : description}
          {description && description.length > 150 && (
            <span
              className="font-semibold font-tahoma text-black cursor-pointer"
              onClick={toggleDescription}
            >
              {showFullDescription ? " (Voir moins)" : " (Lire la suite)"}
            </span>
          )}
        </p>
        <p className="text-left font-roboto text-base text-[#333]">
          {access_spa}
        </p>
      </div>
      <div className="md:w-[10%] flex gap-2 md:gap-0 items-center justify-center md:flex-col font-tahoma">
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
      <div className="md:w-[20%] flex flex-col items-center justify-center">
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
              <button className="w-auto mx-auto mt-4 px-4 py-3 bg-black leading-4 text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma flex items-center justify-center gap-2">
                Offrir
              </button>
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
}
