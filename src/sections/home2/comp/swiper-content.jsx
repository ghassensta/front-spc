import React, { useId } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from "src/components/card/card";
import { paths } from "src/router/paths";
import { CONFIG } from "src/config-global";

export default function SwiperContent({ slidesPerView = 3, data }) {
  // Generate a unique ID for each Swiper instance
  const uniqueId = useId();
  const prevId = `prev-${uniqueId}`;
  const nextId = `next-${uniqueId}`;

  return (
    <div className="relative max-w-[1200px] mx-auto px-12">
      <Swiper
      
        rewind
        spaceBetween={20}
        slidesPerView={slidesPerView}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView, spaceBetween: 20 },
        }}
        modules={[Navigation]}
        navigation={{
          prevEl: `#${prevId}`,
          nextEl: `#${nextId}`,
        }}
        className=""
        // style={{ overflow: "visible"}}
      >
        {data.map((item) => (
          <SwiperSlide className="pt-8" key={item.slug}>
            <Card
              to={paths.product(item.slug)}
              title={item.name}
              image={`${CONFIG.serverUrl}/storage/${item.image}`}
              headTitle={item.spaName}
              location={item.spaLocation}
              bottomText={item.offre}
              offreValue={item.offreValue}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom unique navigation buttons */}
      <div
        id={prevId}
        className="absolute left-0 top-1/2 transform bg-[#B6B499] rounded-full w-[30px!important] h-[30px!important] -translate-y-3/4 z-10 cursor-pointer flex items-center justify-center"
      >
        <FaChevronLeft className="text-black w-[12px!important]" />
      </div>
      <div
        id={nextId}
        className="absolute right-0 top-1/2 transform bg-[#B6B499] rounded-full w-[30px!important] h-[30px!important] -translate-y-3/4 z-10 cursor-pointer flex items-center justify-center"
      >
        <FaChevronRight className="text-black w-[12px!important]" />
      </div>

      <style jsx global>{`
        .swiper-button-prev:after,
        .swiper-button-next:after {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
