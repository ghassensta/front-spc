import React, { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "src/config-global";

export default function ProchainementSection({ prochainement }) {
  if (
    !prochainement ||
    !prochainement.extra_data ||
    !prochainement.extra_data.cards ||
    prochainement.extra_data.cards.length === 0
  ) {
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = prochainement.extra_data.cards;
  const backgroundColor = prochainement.extra_data.background || "white";
  const timerRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    resetTimer();
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const startTimer = () => {
    if (cards.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 4000);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [cards.length]);

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/storage/")) return `${CONFIG.serverUrl}${path}`;
    return `${CONFIG.serverUrl}/storage/${path}`;
  };

  return (
    <div
      className={`bg-[${backgroundColor}] w-screen relative bg-center left-[calc(-50vw+50%)] min-h-32 overflow-hidden py-6 px-3`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-2 md:gap-6">

          {/* LEFT SECTION */}
          <div className="w-full md:w-1/2 py-8 px-3">
            <h2 className="text-3xl">{prochainement.title}</h2>
            <h3 className="text-[#B6B499] text-2xl mb-4">
              {prochainement.description}
            </h3>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl mt-3">{cards[currentIndex].title}</h3>
                <p className="font-tahoma text-sm">
                  {cards[currentIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SECTION */}
          <div className="w-full md:w-1/2 items-center justify-center">
            <div className="relative rounded-3xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  loading="lazy"
                  src={getImageUrl(cards[currentIndex]?.image)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-96 object-cover"   // ← ICI : toutes les images ont la même hauteur fixe
                  alt={cards[currentIndex]?.title || ""}
                />
              </AnimatePresence>

              <div className="absolute w-full bg-[#B6B499] left-0 bottom-0 text-center px-4 py-2 text-lg font-bold text-white">
                {cards[currentIndex].title}
              </div>
            </div>

            {/* BULLETS */}
            <div className="mt-5 mx-auto flex justify-center space-x-2">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === index
                      ? "bg-[#B6B498]"
                      : "bg-gray-400 hover:bg-[#B6B498]"
                  } transition-colors duration-300`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}