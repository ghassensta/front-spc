import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiClock,
  FiHome,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { paths } from "src/router/paths";
import theImage from "src/assets/images/SPC-Essence-1975x1318-02.jpg";
import theImage2 from "src/assets/images/6901d96653fb8_1761728870.webp";
import theImage3 from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-03.jpg";
import { useTranslation } from "src/context/translation-context";
import ButtonLink from "src/components/button-link/ButtonLink";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";

export default function InformationsSection() {
  const { translateSync } = useTranslation();

  const data = [
    {
      header: "L'Essence de Spa & Prestige Collection",
      link: paths.who,
      title: "Qui sommes-nous ?",
      description:
        "Spa & Prestige Collection réunit des établissements d'exception, soigneusement sélectionnés pour leur confort, leur ambiance singulière et leur service sur-mesure.",
      image: theImage3,
      ctaLabel: "En savoir plus",
      ctaVariant: "primary",
    },
    {
      header: "Récompenses Spa & Prestige Collection",
      link: paths.referentiel,
      title: "Points fidélité",
      description:
        "Accumulez des points à chaque commande et échangez-les contre des bons d'achat de 10 € et 25 €.",
      image: theImage2,
      ctaLabel: "En savoir plus",
      ctaVariant: "primary",
    },
    {
      header: "Carte Cadeau",
      link: paths.cadeau,
      title: "Un cadeau qui fait la différence",
      description:
        "Offrez un moment de sérénité immédiate, sans attente ni contrainte, grâce à des prestations variées pour toutes les occasions.",
      image: theImage,
      ctaLabel: "Ajouter au panier",
      ctaVariant: "primary",
      badges: [
        { icon: <FiMail />, label: "Envoi immédiat" },
        { icon: <FiClock />, label: "Valable 1 an" },
        { icon: <FiHome />, label: "Utilisable dans nos établissements" },
      ],
    },
  ];

  const timerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 4000);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
    resetTimer();
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    resetTimer();
  };

  useEffect(() => {
    if (data.length > 1) startTimer();
    return () => clearInterval(timerRef.current);
  }, [data.length]);

  const current = data[currentIndex];

  return (
    <div
      className="bg-white w-screen relative left-[calc(-50vw+50%)] overflow-hidden py-6 px-3"
      style={{ fontFamily: FONT }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-center">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-3xl overflow-hidden">
              <AnimatePresence mode="wait">
                <Link to={current.link}>
                  <motion.img
                    key={currentIndex}
                    src={current.image}
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full min-h-[300px] object-cover"
                    alt={translateSync(current.title)}
                  />
                </Link>
              </AnimatePresence>
            </div>
          </div>

          {/* Texte */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            {/* Boutons navigation */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="text-base border border-gray-300 rounded-full p-2 hover:border-gray-500 transition-colors"
                aria-label="Précédent"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="text-base border border-gray-300 rounded-full p-2 hover:border-gray-500 transition-colors"
                aria-label="Suivant"
              >
                <FiChevronRight />
              </button>
            </div>

            {/* Header — titre principal */}
            <h2
              className="leading-tight text-gray-900"
              style={{
                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                fontWeight: 400,
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              }}
            >
              {translateSync(current.header)}
            </h2>

            {/* Séparateur doré */}
            <div className="w-10 h-0.5" style={{ backgroundColor: GOLD }} />

            {/* Description */}
            <p
              className="text-sm text-gray-600 leading-relaxed"
              style={{ fontFamily: FONT }}
            >
              {translateSync(current.description)}
            </p>

            {/* Pictos (slide carte cadeau) */}
            {Array.isArray(current.badges) && current.badges.length > 0 && (
              <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-1">
                {current.badges.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-gray-700"
                    style={{ fontFamily: FONT }}
                  >
                    <span style={{ color: GOLD }} className="text-base">
                      {b.icon}
                    </span>
                    {translateSync(b.label)}
                  </li>
                ))}
              </ul>
            )}

            {/* CTA — système ButtonLink, variant par slide */}
            <ButtonLink
              to={current.link}
              text={current.ctaLabel}
              variant={current.ctaVariant}
              icon={<FiChevronRight className="text-sm" />}
              className="!mt-0 !justify-start"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
