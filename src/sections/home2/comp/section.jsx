import React from "react";
import SwiperContent from "./swiper-content";
import { useTranslation } from "src/context/translation-context";

export default function Section({
  bg = "white",
  header,
  link,
  subheader,
  data = [],
  max = 3,
}) {
  const { translateSync } = useTranslation();

  return (
    <div
      className={`relative w-screen left-[calc(-50vw+50%)] overflow-hidden py-6 ${
        bg === "white" ? "bg-white" : "bg-[#f6f5e9]"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center">
          {translateSync(header)}

          {!!subheader && (
            <div className="text-[#B6B499] text-3xl mt-2">
              {translateSync(subheader)}
            </div>
          )}
        </h2>

        <div className="md:mt-8 px-1">
          <SwiperContent slidesPerView={max} data={data} />
        </div>

        <div className="text-center">
          <a
            href={link}
            className="inline-flex font-tahoma rounded-full items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-black text-white"
          >
            {translateSync("Nos offres")} {translateSync(header)}
          </a>
        </div>
      </div>
    </div>
  );
}
