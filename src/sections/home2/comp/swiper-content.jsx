import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  FaCaretLeft,
  FaCaretRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Card from "src/components/card/card";
import { paths } from "src/router/paths";
import { CONFIG } from "src/config-global";

export default function SwiperContent({ slidesPerView = 3, data }) {
  return (
    <div className="relative max-w-[1200px] mx-auto px-12">
      {/* Added padding for arrows */}
      <Swiper
        rewind
        spaceBetween={20}
        slidesPerView={slidesPerView}
        breakpoints={{
          // Phone: 1 slide
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // Tablet: 2 slides
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          // Desktop: use prop value
          1024: {
            slidesPerView: slidesPerView,
            spaceBetween: 20,
          },
        }}
        modules={[Navigation]}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
          disabledClass: "swiper-button-disabled", // Handle disabled state
        }}
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
      {/* Custom Navigation Buttons - Positioned outside */}
      <div className="swiper-button-prev absolute left-[-48px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
        <FaCaretLeft className="text-black hover:text-gray-800 w-[12px!important]" />
      </div>
      <div className="swiper-button-next absolute right-[-48px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
        <FaCaretRight className="text-black hover:text-gray-800 w-[12px!important]" />
      </div>
      {/* Hide default Swiper navigation arrows */}
      <style jsx global>{`
        .swiper-button-prev:not(.swiper-button-prev),
        .swiper-button-next:not(.swiper-button-next),
        .swiper-button-prev:after,
        .swiper-button-next:after {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
