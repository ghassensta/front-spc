import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "src/config-global";
import Viewer from "react-viewer";

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
  const [[index, direction], setIndex] = useState([0, 0]);
  const [org, setOrg] = useState([]);
  const [visible, setVisible] = useState(false);
  const imgLength = images.length;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setOrg(
      images.map((img) => ({
        src: `${CONFIG.serverUrl}/storage/${img}`,
      }))
    );
  }, [images]);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (imgLength === 0) return; // stop interval if no images

    const timer = setInterval(() => {
      setIndex(([prev]) => {
        const newIndex = (prev + 1) % imgLength;
        return [newIndex, 1];
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [imgLength]);

  // 👉 Conditional rendering after hooks
  if (imgLength === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-xl shadow-lg">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

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

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    resetTimer();
  };

  return (
    <>
      <div
        className={`relative w-full mx-auto overflow-hidden rounded-xl flex shadow-lg h-${height || " h-[300px] md:h-[600px]"}`}
        // style={{ height: height ?? "500px", width: height * 1.5 }}
      >
        <div className=" w-full h-[300px] md:h-[600px] relative overflow-hidden">
          {images.map((src, index) => (
            <img
              key={index}
              src={CONFIG.serverUrl + "/storage/" + src}
              alt={`Spa & Prestige Slide ${index + 1}`}
              className={`absolute top-0 h-[300px] md:h-[600px] left-0 w-full object-cover transition-transform duration-1000 ease-in-out ${
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
        {/* Controls */}
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-10"
        >
          ◀
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-10"
        >
          ▶
        </button>

        <button
          onClick={() => setVisible(true)}
          className="absolute bottom-3 right-3 z-10 px-2 py-2 opacity-80 bg-white leading-2 text-black uppercase font-normal text-xs tracking-[2px] hover:bg-gray-200 transition font-tahoma flex items-center justify-center gap-2"
        >
          Voir les photos
        </button>
      </div>
      <Viewer
        drag
        attribute
        rotatable={false}
        scalable={false}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        images={org}
      />
    </>
  );
}
