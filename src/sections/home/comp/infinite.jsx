import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

// Reuse this miniCard component
const MiniCard = ({ title, img }) => (
  <div className="flex flex-col items-center min-w-[14rem] mx-2">
    <img
      className="h-60 w-56 object-cover rounded-xl mb-2"
      src={img}
      alt=""
    />
    <span className="text-xl font-bold text-center text-secondary">
      {title}
    </span>
  </div>
);

const slides = [
  {
    title: "Nos valeurs",
    img: "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg",
  },
  {
    title: "Notre vision",
    img: "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-slider-1975x1318-03.jpg",
  },
  {
    title: "Nos soins",
    img: "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-slider-1975x1318-02.jpg",
  },
  {
    title: "Nos destinations",
    img: "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg",
  },
  {
    title: "Bien-être",
    img: "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-slider-1975x1318-03.jpg",
  },
];

const InfiniteSlider = () => {
  const containerRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  const scroll = (dir) => {
    const container = containerRef.current;
    const scrollAmount = 250;
    if (dir === "left") {
      container.scrollLeft -= scrollAmount;
      setScrollX(container.scrollLeft - scrollAmount);
    } else {
      container.scrollLeft += scrollAmount;
      setScrollX(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <div className="my-16 max-w-6xl mx-auto">
      <h3 className="text-secondary text-4xl font-bold">
        L’essence de Spa & Prestige Collection
      </h3>
      <h3 className="text-[#777676] text-4xl font-bold">
        Une invitation à l’art du bien-être et de la découverte
      </h3>

      <div className="flex items-center gap-4 mt-12">
        {/* Button Controls */}
        <button
          onClick={() => scroll("left")}
          className="rounded-full bg-white text-secondary shadow-md p-2 text-4xl"
        >
          <MdOutlineNavigateBefore />
        </button>
        <button
          onClick={() => scroll("right")}
          className="rounded-full bg-secondary text-primary shadow-md p-2 text-4xl"
        >
          <MdOutlineNavigateNext />
        </button>
        <div
          ref={containerRef}
          className="w-full flex overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {slides.concat(slides).map((slide, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <MiniCard {...slide} />
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default InfiniteSlider;
