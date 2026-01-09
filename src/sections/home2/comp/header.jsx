import React, { useState, useEffect } from "react";
import { CONFIG } from "src/config-global";
import { paths } from "src/router/paths";
import { useGetHomePage } from "src/actions/homepage";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useTranslation } from "src/context/translation-context";

export default function Header() {
  const { translateSync } = useTranslation();
  const { sections } = useGetHomePage();

  const section1 = sections?.find((s) => s.key === "section1");
  const etablissements = section1?.cards || [];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying || etablissements.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % etablissements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, etablissements.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % etablissements.length);
    setIsAutoPlaying(true);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + etablissements.length) % etablissements.length
    );
    setIsAutoPlaying(true);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const current = etablissements[currentSlide];

  return (
    <div className="relative w-screen left-[calc(-50vw+50%)] h-full overflow-hidden">
      {/* Background slider */}
      {etablissements.map((s, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          style={{
            backgroundImage: `url(${CONFIG.serverUrl}${s.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Card content */}
      {!!current && (
        <div className="absolute bottom-24 md:bottom-8 left-4 md:left-12 z-20 text-gray-900 rounded-md shadow-lg w-[90%] max-w-md backdrop-blur-sm">
          <Link
            to={paths.spa.details(current.slug)}
            className="block relative z-10 p-6 no-underline hover:no-underline"
          >
            {current.remise_offres > 0 && (
              <p className="absolute top-0 -translate-y-1/2 bg-[#B6B499] text-black font-bold font-roboto px-4 py-2 rounded-full text-sm z-10">
                {translateSync("Jusqu’à")} {current.remise_offres}%{" "}
                {translateSync("de remise")}
              </p>
            )}

            <p
              className="text-2xl md:text-3xl font-bold mb-1"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              {translateSync(current.title)}
            </p>

            <p className="text-base text-gray-900 mb-1 leading-snug font-bold">
              {translateSync(current.description)}
            </p>


            {current.prix_offres > 0 && (
              <p className="text-base text-gray-700 mb-4 font-bold">
                {translateSync("Offres exclusives à partir de")}{" "}
                <span className="font-semibold text-black">
                  {current.prix_offres}€
                </span>
              </p>
            )}

            <div className="flex items-center gap-2 bg-[#020100C9] text-white font-tahoma font-light uppercase tracking-[2px] w-fit py-2 px-2 rounded-full text-[10px]">
              <MapPin className="w-4 h-4 text-white" />
              {current.adresse}
            </div>

            <p className="text-sm font-tahoma text-secondary font-bold hover:underline mt-3">
              {translateSync("En savoir plus")} →
            </p>
          </Link>

          <div
            className="absolute rounded-md top-0 left-0 bg-white/95 h-full w-[105%]"
            style={{
              clipPath: "polygon(95% 0, 100% 50%, 95% 100%, 0 100%, 0 0)",
            }}
          />
        </div>
      )}

      {/* Slider controls */}
      {etablissements.length > 0 && (
        <div className="absolute font-tahoma bottom-6 right-8 z-30 flex items-center gap-3 bg-white shadow px-4 py-2">
          <button onClick={prevSlide} className="text-lg font-semibold">
            ←
          </button>

          <span className="text-xs font-semibold">
            {currentSlide + 1}/{etablissements.length}
          </span>

          <button onClick={nextSlide} className="text-lg font-semibold">
            →
          </button>

          <div className="flex items-center gap-2 ml-2">
            {etablissements.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full ${index === currentSlide ? "bg-gray-900" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
