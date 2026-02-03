import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "src/config-global";
import Viewer from "react-viewer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useTranslation } from "src/context/translation-context";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function ImageCarousel({ height, images = [] }) {
  const { translateSync } = useTranslation(); 
  const [[index, direction], setIndex] = useState([0, 0]);
  const [org, setOrg] = useState([]);
  const [visible, setVisible] = useState(false);
  const imgLength = images.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setOrg(
      images.map((img) => ({
        src: `${CONFIG.serverUrl}/storage/${img}`,
      }))
    );
  }, [images]);

  useEffect(() => {
    if (imgLength === 0) return;

    const timer = setInterval(() => {
      setIndex(([prev]) => [(prev + 1) % imgLength, 1]);
    }, 5000);

    return () => clearInterval(timer);
  }, [imgLength]);

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

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    resetTimer();
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
      <div
        className={`relative w-full mx-auto overflow-hidden rounded-xl flex shadow-lg h-full`}
      >
        <div className="w-full h-full relative overflow-hidden">
          {images.map((src, index) => (
            <img
              key={index}
              src={CONFIG.serverUrl + "/storage/" + src}
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

        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-white p-2 rounded-full z-10"
          aria-label={translateSync("Image précédente")}
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-white p-2 rounded-full z-10"
          aria-label={translateSync("Image suivante")}
        >
          <FaChevronRight size={20} />
        </button>

        <button
          onClick={() => setVisible(true)}
          className="absolute bottom-3 right-3 z-10 px-2 py-2 opacity-80 bg-white leading-2 text-black uppercase font-normal text-xs tracking-[2px] hover:bg-gray-200 transition font-tahoma flex items-center justify-center gap-2"
        >
          <IoImageOutline className="text-xl" />
          {translateSync("Voir les photos")}
        </button>
      </div>

      <div className="relative">
        <Viewer
          inline
          drag
          attribute
          rotatable={false}
          scalable={false}
          visible={visible}
          onClose={() => setVisible(false)}
          images={org}
        />
      </div>
    </>
  );
}
