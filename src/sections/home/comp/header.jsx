import React, { useState, useEffect } from "react";
import ButtonIcon from "../../../components/button-icon/button-icon";
import { paths } from "src/router/paths";
import { CONFIG } from "src/config-global";
import theImage from "src/assets/images/Piscine2.jpg";
import theImage2 from "src/assets/images/SPC-Essence-1975x1318-02.jpg";

export default function Header() {
  const slides = [
    {
      image: theImage,
    },
    {
      image: theImage2,
    },
    {
      image: `${CONFIG.serverUrl}/storage/uploads/products/vsh20tkZbTBA0YuocmFb2TgIEmFaCamZibo0cmSY.jpg`,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

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

  return (
    <div className="relative w-screen left-[calc(-50vw+50%)] overflow-hidden h-96 md:h-[500px]">
      <div className="relative w-full h-full">
        {/* Slides */}
        {slides.map((s, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out transform bg-cover bg-center ${
              index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
            style={{ backgroundImage: `url(${s.image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Fixed Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-10">
          <p className="text-2xl md:text-3xl font-medium lg:w-3/4 mb-4 leading-relaxed">
            Rejoignez la Communauté Privée Spa & Prestige Collection ! Plongez dans
            un univers d’exception<br /> et{" "}
            <span className="underline">
              laissez-vous séduire par des privilèges rares et uniques…
            </span>
          </p>

          {/* Bouton vers la page carte cadeau */}
          <ButtonIcon title="CARTE CADEAU" link={paths.cadeau} variant="filled" size="md" />
        </div>

        {/* Dots Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
        >
          ›
        </button>
      </div>
    </div>
  );
}