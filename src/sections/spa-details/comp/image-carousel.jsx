import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "src/config-global";

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
  const imgLength = images.length;

  // Auto slide every 5 seconds
  useEffect(() => {
    if (imgLength === 0) return; // stop interval if no images

    const timer = setInterval(() => {
      setIndex(([prev]) => {
        const newIndex = (prev + 1) % imgLength;
        console.log("Carousel:", { prev, imgLength, newIndex });
        return [newIndex, 1];
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [imgLength]);

  const next = () =>
    setIndex(([prev]) => [(prev + 1) % imgLength, 1]);

  const prev = () =>
    setIndex(([prev]) => [prev === 0 ? imgLength - 1 : prev - 1, -1]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) next();
    else if (info.offset.x > 100) prev();
  };

  // 👉 Conditional rendering after hooks
  if (imgLength === 0) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 rounded-sm shadow-lg"
        style={{ height: height ?? "700px", width: height * 1.5 }}
      >
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full mx-auto overflow-hidden rounded-sm shadow-lg"
      style={{ height: height ?? "700px", width: height * 1.5 }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          src={`${CONFIG.serverUrl}/storage/${images[index]}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDragEnd={handleDragEnd}
          className="absolute w-full h-full object-cover cursor-grab active:cursor-grabbing"
        />
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-10"
      >
        ◀
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-10"
      >
        ▶
      </button>
    </div>
  );
}
