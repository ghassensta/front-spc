import React, { useState, useEffect } from "react";
import { CONFIG } from "src/config-global";
import { MapPin } from "lucide-react";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Header() {
  const slides = [
    {
      image:
        "https://spa-prestige-collection.com/wp-content/uploads/2025/01/Piscine2.jpg",
      title: "Les Granges d’Haillancourt",
      description:
        "Niché dans un écrin de verdure, ce havre de paix se trouve à quelques kilomètres de Paris.",
      price: "60,00 €",
      discount: "Jusqu’à 20% de remise",
      location: "60149 SAINT CRÉPIN-IBOUVILLERS",
    },
    {
      image:
        "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg",
      title: "Domaine de la Forêt Enchantée",
      description:
        "Un lieu magique où nature, luxe et sérénité s’unissent pour un séjour d’exception.",
      price: "85,00 €",
      discount: "Jusqu’à 15% de remise",
      location: "77200 TORCY",
    },
    {
      image: `${CONFIG.serverUrl}/storage/uploads/products/vsh20tkZbTBA0YuocmFb2TgIEmFaCamZibo0cmSY.jpg`,
      title: "Le Château des Rêves",
      description:
        "Séjournez dans un château d’époque revisité avec élégance et confort moderne.",
      price: "120,00 €",
      discount: "Offres exclusives",
      location: "78000 VERSAILLES",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(true);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(true);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const current = slides[currentSlide];

  return (
    <>
      <div className="relative w-screen left-[calc(-50vw+50%)] h-[600px] overflow-hidden">
        {/* Background Slides */}
        {slides.map((s, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${s.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Content Card */}
        <div className="absolute bottom-8 font-tahoma left-8 md:left-12 z-20 bg-white/95 text-gray-900 p-6 rounded-md shadow-lg w-[90%] max-w-md backdrop-blur-sm">
          <p className="text-xs absolute px-2 py-1 -translate-y-1/2 bg-[#B6B499] top-0 font-semibold text-gray-700 uppercase mb-2">
            {current.discount}
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold mb-1"
            style={{ fontFamily: "Cormorant Garamond" }}
          >
            {current.title}
          </h2>
          <p className="text-sm text-gray-900 mb-2 leading-snug">
            {current.description}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            Offres exclusives à partir de{" "}
            <span className="font-semibold text-black">{current.price}</span>
          </p>

          <div className="flex items-center gap-1 text-sm text-white uppercase px-2 py-1 w-max mb-4 bg-secondary">
            <MapPin className="w-4 h-4 text-gray-500" />
            {current.location}
          </div>

          <button className="text-sm text-secondary font-bold hover:underline">
            En savoir plus →
          </button>
        </div>

        {/* Navigation Control (like screenshot) */}
        <div className="absolute font-tahoma bottom-6 right-8 z-30 flex items-center gap-3 bg-white shadow px-4 py-2">
          <button
            onClick={prevSlide}
            className="text-gray-700 hover:text-black font-semibold text-lg"
          >
            ←
          </button>

          <span className="text-xs mx-6 font-semibold text-gray-800">
            {currentSlide + 1}/{slides.length}
          </span>

          <button
            onClick={nextSlide}
            className="text-gray-700 hover:text-black font-semibold text-lg"
          >
            →
          </button>

          <div className="flex items-center gap-2 ml-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === currentSlide ? "bg-gray-900" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="relative w-screen left-[calc(-50vw+50%)] py-10 overflow-hidden bg-[beige]">
        <div className="flex flex-col justify-center items-center text-center px-4 z-10">
          <p className="text-xl md:text-2xl font-medium lg:w-3/4 mb-4 leading-relaxed">
            Rejoignez la Communauté Privée Spa & Prestige Collection ! Plongez
            dans un univers d’exception
            <br /> et{" "}
            <span className="underline">
              laissez-vous séduire par des privilèges rares et uniques…
            </span>
          </p>

          {/* Bouton vers la page carte cadeau */}
          <ButtonIcon
            title="CARTE CADEAU"
            link={paths.cadeau}
            variant="filled"
            size="md"
          />
        </div>
      </div>
    </>
  );
}
