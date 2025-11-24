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
  const uniqueId = useId();
  const prevId = `prev-${uniqueId}`;
  const nextId = `next-${uniqueId}`;

  return (
    <div className="relative max-w-[1200px] mx-auto px-12">
      <Swiper
        rewind
        spaceBetween={20}
        slidesPerView={slidesPerView}
        initialSlide={2}                     
        centeredSlides={true}                
        breakpoints={{
          320: { 
            slidesPerView: 1, 
            spaceBetween: 10,
            initialSlide: 1,
            centeredSlides: true 
          },
          768: { 
            slidesPerView: 2, 
            spaceBetween: 15,
            initialSlide: 1,
            centeredSlides: true 
          },
          1024: { 
            slidesPerView, 
            spaceBetween: 20,
            initialSlide: 0,                 
            centeredSlides: false 
          },
        }}
        modules={[Navigation]}
        navigation={{
          prevEl: `#${prevId}`,
          nextEl: `#${nextId}`,
        }}
        className=""
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
              price={item.price}
              duration={item.duration}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        id={prevId}
        className="absolute left-0 top-1/3 transform bg-[#B6B499] rounded-full w-[30px!important] h-[30px!important] -translate-y-3/4 z-10 cursor-pointer flex items-center justify-center"
      >
        <FaChevronLeft className="text-black w-[12px!important]" />
      </div>
      <div
        id={nextId}
        className="absolute right-0 top-1/3 transform bg-[#B6B499] rounded-full w-[30px!important] h-[30px!important] -translate-y-3/4 z-10 cursor-pointer flex items-center justify-center"
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