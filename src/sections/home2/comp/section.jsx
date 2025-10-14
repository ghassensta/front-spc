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
  max = 3
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
          {!!subheader && <div className="text-[#B6B499] mt-2">{subheader}</div>}
        </h2>

        <div className="mt-8">
          <SwiperContent slidesPerView={max} data={data}/>
        </div>

       
        {/* <div className="relative mt-8">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`,
              width: `${(data.length * 100) / visibleCount}%`,
            }}
          >
            {data.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-3 md:px-4"
                style={{ width: `${100 / data.length}%` }}
              >
                <Card
                  to={paths.product(item?.slug)}
                  title={item?.name}
                  image={`${CONFIG.serverUrl}/storage/${item?.image}`}
                  headTitle={item?.spaName}
                  buttonTitle="Offrir cette expérience"
                  location={item?.spaLocation}
                  bottomText={item?.offre}
                  offreValue={item?.offreValue}
                />
              </div>
            ))}
          </div>

          {data.length > visibleCount && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 shadow flex items-center justify-center"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 shadow flex items-center justify-center"
              >
                →
              </button>
            </>
          )}
        </div>

        {data.length > visibleCount && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? "bg-gray-900" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )} */}

        {/* CTA */}
        <div className="text-center mt-6">
          <ButtonIcon link={link} title="DÉCOUVRIR" />
        </div>
      </div>
    </div>
  );
}
