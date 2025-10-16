import React, { useState, useEffect } from "react";
import { CONFIG } from "src/config-global";
import { MapPin } from "lucide-react";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";
import { useGetEtablissements } from "src/actions/etablissements";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Header() {
    const { etablissements } = useGetEtablissements();
  
 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
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
    setCurrentSlide((prev) => (prev - 1 + etablissements.length) % etablissements.length);
    setIsAutoPlaying(true);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const current = etablissements[currentSlide];

  return (
    <>
      <div className="relative w-screen left-[calc(-50vw+50%)] h-[600px] overflow-hidden">
        {/* Background etablissements */}
        {etablissements.map((s, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${CONFIG.serverUrl}/storage/${s.image_avant})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Content Card */}
        <div className="absolute bottom-24 md:bottom-8  left-4 md:left-12 z-20 text-gray-900 rounded-md shadow-lg w-[90%] max-w-md backdrop-blur-sm">
          <div className="relative z-10 p-6 ">
            {!!current?.remise_offres && (<p className="text-xs absolute px-2 py-1 -translate-y-1/2 bg-[#B6B499] top-0 font-semibold text-gray-700 uppercase mb-2">
              Jusqu’à {current.remise_offres}% de remise
            </p>)}
            <h2
              className="text-2xl md:text-3xl font-bold mb-1"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              {current?.nom}
            </h2>
            <p className="text-base text-gray-900 mb-2 leading-snug font-bold">
              {current?.description_avant}
            </p>
            <p className="text-base text-gray-700 mb-4 font-bold">
              Offres exclusives à partir de{" "}
              <span className="font-semibold text-black">{current?.price}</span>
            </p>
              <div className="flex font-tahoma items-center gap-1 text-xs text-white uppercase px-4 py-2 mb-4 w-max  bg-secondary font-light">
                <MapPin className="w-4 h-4 text-gray-500" />
                {current?.adresse}
              </div>
            <Link to={paths.spa.details(current?.slug)} className="text-sm font-tahoma text-secondary font-bold hover:underline">
              En savoir plus →
            </Link>
          </div>
        <div className="absolute rounded-md top-0 left-0 bg-white/95 h-full w-[105%]" style={{clipPath: "polygon(95% 0, 100% 50%, 95% 100%, 0 100%, 0 0)"}}></div>
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
            {currentSlide + 1}/{etablissements.length}
          </span>

          <button
            onClick={nextSlide}
            className="text-gray-700 hover:text-black font-semibold text-lg"
          >
            →
          </button>

          <div className="flex items-center gap-2 ml-2">
            {etablissements.map((_, index) => (
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
     {/* Search Section */}
<div className="relative w-screen left-[calc(-50vw+50%)] bg-white py-12">
  <div className="max-w-4xl mx-auto text-center px-8">
    <h2
      className="text-2xl md:text-3xl font-semibold mb-2"
      style={{ fontFamily: "Cormorant Garamond" }}
    >
      Des Moments Sélectionnés pour Vous
    </h2>
    <p className="mb-8 font-light text-2xl md:text-3xl text-[#B6B499]">
      Une collection choisie avec soin, pour celles et ceux en quête d’exceptions.
    </p>

    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col md:flex-row justify-center items-center gap-4 font-tahoma"
    >
      {/* Location Input */}
      <div className="relative w-full md:w-64">
        <label className="block text-sm text-gray-700 mb-1 text-left">Où ?</label>
        <input
          type="text"
          placeholder="Pays, région, ville..."
          className="w-full border border-gray-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <MapPin className="absolute right-3 top-9 w-4 h-4 text-gray-400" />
      </div>

      {/* Type Input */}
      <div className="w-full md:w-64">
        <label className="block text-sm text-gray-700 mb-1 text-left">Quoi ?</label>
        <input
          type="text"
          placeholder="Spa, massage, duo..."
          className="w-full border border-gray-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      {/* Search Button */}
      <div className="flex flex-col items-start md:items-center justify-end">
        <label className="block text-sm text-gray-700 mb-1 text-left md:text-center">
          Rechercher
        </label>
        <button
          type="submit"
          className="bg-black text-white p-3 rounded-md hover:bg-gray-900 transition w-full flex items-center"
        >
          <span className="mx-auto">
            <FaSearch />
          </span>
        </button>
      </div>
    </form>
  </div>
</div>

    </>
  );
}
