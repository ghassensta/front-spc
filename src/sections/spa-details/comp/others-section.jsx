import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const testimonials = [
  {
    name: "Le Spa by Sothys Paris République 5*",
    bg: 'bg-primary',
    text: 'text-secondary',
    adress: '69100 Lyon – Région sud – France'
  },
  {
    name: "Maison Blanche 1",
    bg: 'bg-secondary',
    text: 'text-primary',
    adress: '69100 Lyon – Région sud – France'
  },
  {
    name: "Maison Blanche 2",
    bg: 'bg-primary',
    text: 'text-secondary',
    adress: '69100 Lyon – Région sud – France'
  },
  {
    name: "Maison Blanche 3",
    bg: 'bg-secondary',
    text: 'text-primary',
    adress: '69100 Lyon – Région sud – France'
  },
  
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? testimonials.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev === testimonials.length - 3 ? 0 : prev + 1));
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
    <section className="py-4 lg:py-16 px-2 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">– Autres établissements –</h2>
          <div className="flex items-center space-x-4 mb-6">
        <button onClick={handlePrev} className="p-2 bg-white border rounded-full hover:bg-gray-100 transition">
          <FaArrowLeft size={20} />
        </button>
        <button onClick={handleNext} className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
          <FaArrowRight size={20} />
        </button>
      </div>

      <div className="flex lg:flex-row flex-col gap-6">
        {visibleTestimonials.map((testimonial, i) => (
          <AnimatePresence key={testimonial.quote} mode="wait" custom={direction}>
            <motion.div
              key={testimonial.quote}
              className={`w-full p-6 rounded-2xl border`}
              custom={direction}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="flex flex-col items-center">
                <img src="https://spa-prestige-collection.com/wp-content/uploads/2025/01/hotel3-1024x683.jpg" className='rounded mr-2' alt="" />
                <div className='flex flex-col items-center'>
                    <h3 className='text-2xl font-bold text-center'>{testimonial.name}</h3>
                    <span className='font-roboto text-sm text-center'>{testimonial.adress}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </section>
  );
}
