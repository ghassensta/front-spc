import React from "react";
import SwiperContent from "./swiper-content";
import { useTranslation } from "src/context/translation-context";
import ButtonLink from "src/components/button-link/ButtonLink";
import SectionHeader from "src/components/section-header/SectionHeader";
import { FaArrowRight } from "react-icons/fa";

export default function Section({
  bg = "white",
  header,
  link,
  subheader,
  data = [],
  max = 3,
}) {
  const { translateSync } = useTranslation();
  console.log("Section data:", data);
  return (
    <div
      className={`relative w-screen left-[calc(-50vw+50%)] overflow-hidden py-6 ${
        bg === "white" ? "bg-white" : "bg-[#f6f5e9]"
      }`}
    >
      <div className="max-w-6xl mx-auto relative">
        {/* HEADER */}
        <SectionHeader label="Sélection" title={header} />

        {/* SUBHEADER */}
        {!!subheader && (
          <div className="text-black text-3xl text-center">
            {translateSync(subheader)}
          </div>
        )}

        {link && (
          <div className="hidden md:block absolute top-0 right-0">
            <ButtonLink
              to={link}
              className="scale-75 origin-right"  
              text={
                <span className="flex items-center gap-2 text-xs whitespace-nowrap">
                  VOIR TOUTES LES OFFRES
                  <FaArrowRight className="text-xs" />
                </span>
              }
            />
          </div>
        )}

        <div className="md:mt-8 px-1">
          <SwiperContent slidesPerView={max} data={data} />
        </div>

        {/* BUTTON SOUS LES CARDS — Mobile uniquement */}
        {link && (
          <div className="flex justify-center mt-4 md:hidden">
            <ButtonLink
              to={link}
              text={
                <span className="flex items-center gap-1 text-sm whitespace-nowrap">
                  VOIR TOUTES LES OFFRES
                  <FaArrowRight className="text-xs" />
                </span>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}