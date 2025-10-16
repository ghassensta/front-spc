import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CONFIG } from "src/config-global";
import { paths } from "src/router/paths";

export default function InformationsSection() {
  const data = [
    {
      link: paths.who,
      title: "Qui sommes-nous ?",
      description:
        "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua mundis estabien estrama lorium ispolium.",
      image:
        "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg",
    },
    {
      link: paths.referentiel,
      title: "Référentiel de candidature",
      description:
        "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua mundis estabien estrama lorium ispolium.",
      image:
        "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg",
    },
    {
      link: paths.collection,
      title: "Collection Prestige",
      description:
        "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua mundis estabien estrama lorium ispolium.",
      image:
        "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg",
    },
  ];

  const timerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    resetTimer();
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetTimer();
  };

  // --- Timer Handling ---
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 4000); // 4 seconds
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  useEffect(() => {
    if (data.length > 1) startTimer();
    return () => clearInterval(timerRef.current);
  }, [data.length]);

  return (
    <div
      className={`bg-[white] w-screen relative bg-center left-[calc(-50vw+50%)] min-h-32 overflow-hidden py-4 px-3`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-2 md:gap-24">
          <div className="w-full md:w-1/2 items-center justify-center">
            <div className="relative rounded-3xl overflow-hidden">
              <AnimatePresence mode="wait">
                <Link to={data[currentIndex]?.link}>
                  <motion.img
                    key={currentIndex}
                    lazyload="lazy"
                    src={data[currentIndex]?.image}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-auto min-h-[300px] object-cover"
                  />
                </Link>
              </AnimatePresence>
              {/* <div className="absolute w-full bg-[#B6B499] left-0 bottom-0 text-center px-4 py-2 text-lg font-bold">
                {data[currentIndex].title}
              </div> */}
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="flex gap-3 my-4">
              <button
                onClick={prevSlide}
                className="text-xl border border-black rounded-full p-2 cursor-pointer"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="text-xl border border-black rounded-full p-2 cursor-pointer"
              >
                <FiChevronRight />
              </button>
            </div>
            <h2 className="text-3xl">L’univers Spa & Prestige Collection.</h2>
            <h3 className="text-[#B6B499] text-3xl mt-4">
              {data[currentIndex].title}
            </h3>
            <p className="font-tahoma text-sm ">
              {data[currentIndex].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
