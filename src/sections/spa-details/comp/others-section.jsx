import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CONFIG } from "src/config-global";

// Définis bien ta constante API_URL ici ou importe-la depuis ta config

export default function TestimonialsSection({ testimonials = [] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 pour next, -1 pour prev
  console.log(testimonials)
  if (testimonials.length === 0) return null;

  const length = testimonials.length;

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? Math.max(length - 3, 0) : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev >= Math.max(length - 3, 0) ? 0 : prev + 1));
  };

  const visibleTestimonials = testimonials.slice(index, index + 3);

  const cardVariants = {
    initial: (dir) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <section className="py-4 lg:py-16 px-2 max-w-7xl mx-auto  ">
      <h2 className="text-3xl font-bold mb-6">– Autres établissements –</h2>

      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={handlePrev}
          className="p-2 bg-white border rounded-full hover:bg-gray-100 transition"
          disabled={length <= 3}
          aria-label="Précédent"
        >
          <FaArrowLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
          disabled={length <= 3}
          aria-label="Suivant"
        >
          <FaArrowRight size={20} />
        </button>
      </div>

      <div className="flex lg:flex-row flex-col gap-6">
        <AnimatePresence mode="wait" custom={direction}>
          {visibleTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="md:w-1/3 w-full rounded-2xl border"
              custom={direction}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="flex flex-col items-center">
                <img lazyload="lazy"
                  src={
                    testimonial.logo
                      ? `${CONFIG.serverUrl}/storage/${testimonial?.image_avant}`
                      : "/images/default-logo.png"
                  }
                  alt={testimonial.slug}
                  style={{
                    width: "100%",
                    height: "240px",
                    objectFit: "cover",
                    borderRadius: "12px 12px 0 0",
                    // marginRight: "0.5rem", // équivalent mr-2 en Tailwind
                  }}
                />

                <Link
                  to={`/spa/${testimonial.slug}`}
                  className="flex flex-col items-center no-underline hover:underline p-6 pt-3"
                >
                  <h3 className="text-2xl font-bold text-center text-black">
                    {testimonial.nom}
                  </h3>
                  <span className="font-roboto text-sm text-center text-gray-600">
                    {testimonial.adresse}
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
