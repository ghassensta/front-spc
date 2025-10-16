import React, { useState } from "react";
import ButtonIcon from "src/components/button-icon/button-icon";
import Card from "src/components/card/card";
import { CONFIG } from "src/config-global";
import { paths } from "src/router/paths";
import SwiperContent from "./swiper-content";

export default function Section({
  bg = "white",
  header,
  link,
  subheader,
  data = [],
  max = 3,
}) {
  return (
    <div
      className={`relative w-screen left-[calc(-50vw+50%)] overflow-hidden py-10 ${
        bg === "white" ? "bg-white" : "bg-[beige]"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center">
          {header}
          {!!subheader && (
            <div className="text-[#B6B499] text-3xl mt-2">{subheader}</div>
          )}
        </h2>

        <div className="mt-8 px-12">
          <SwiperContent slidesPerView={max} data={data} />
        </div>

        <div className="text-center mt-1">
          <a
            href={link}
            className="inline-flex font-tahoma rounded-full items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-black text-white mt-6"
          >
            Nos offres {header}
          </a>
        </div>
      </div>
    </div>
  );
}
