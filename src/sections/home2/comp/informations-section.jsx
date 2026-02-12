import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { paths } from "src/router/paths";
import theImage from "src/assets/images/SPC-Essence-1975x1318-02.jpg";
import theImage2 from "src/assets/images/6901d96653fb8_1761728870.webp";
import theImage3 from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-03.jpg";
import { useTranslation } from "src/context/translation-context";

export default function InformationsSection() {
  const { translateSync } = useTranslation();

  const data = [
    {
      link: paths.who,
      title: "Qui sommes-nous ?",
      description:
        "Spa & Prestige Collection réunit des établissements d’exception, soigneusement sélectionnés pour leur confort, leur ambiance singulière et leur service sur-mesure.",
      image: theImage3,
    },
    {
      link: paths.referentiel,
      title: "Points fidélité",
      description:
        "Accumulez des points à chaque commande et échangez-les contre des bons d'achat de 10 € et 25 €.",
      image: theImage2,
    },
    {
      link: paths.collection,
      title: "Collection Prestige",
      description:
        "Bientôt disponible, Collection Prestige revient avec une nouvelle édition dédiée aux plus belles adresses bien-être.",
      image: theImage,
    },
  ];

  const timerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    resetTimer();
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 4000);
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
    <div className="bg-white w-screen relative left-[calc(-50vw+50%)] overflow-hidden py-6 px-3">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-24">
          
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-3xl overflow-hidden">
              <AnimatePresence mode="wait">
                <Link to={data[currentIndex].link}>
                  <motion.img
                    key={currentIndex}
                    src={data[currentIndex].image}
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full min-h-[300px] object-cover"
                    alt={translateSync(data[currentIndex].title)}
                  />
                </Link>
              </AnimatePresence>
            </div>
          </div>

          {/* Texte */}
          <div className="w-full md:w-1/3">
            <div className="flex gap-3 my-4">
              <button
                onClick={prevSlide}
                className="text-xl border border-black rounded-full p-2"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="text-xl border border-black rounded-full p-2"
              >
                <FiChevronRight />
              </button>
            </div>

            <h2 className="text-3xl">
              {translateSync("Récompenses Spa & Prestige Collection")}
            </h2>

            <h3 className="text-[#B6B499] text-3xl mt-4">
              {translateSync(data[currentIndex].title)}
            </h3>

            <p className="font-tahoma text-sm">
              {translateSync(data[currentIndex].description)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
