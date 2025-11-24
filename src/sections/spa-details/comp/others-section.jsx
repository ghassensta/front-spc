import { useState } from "react";
import { Link } from "react-router-dom";
import { CONFIG } from "src/config-global";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function TestimonialsSection({ testimonials = [] }) {
  console.log("AUTRE:", testimonials);
  if (testimonials.length === 0) return null;

  return (
    <section className="py-4 lg:py-16 px-2 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">– Autres établissements –</h2>
      
      {/* Navigation buttons below the title */}
      <div className="flex justify-start mb-6 space-x-4">
        <button className="swiper-button-prev-custom p-2 bg-gray-900 rounded-full hover:bg-gray-300 transition-colors">
          <FaArrowLeft className="w-5 h-5 text-gray-100" />
        </button>
        <button className="swiper-button-next-custom p-2 bg-gray-900 rounded-full hover:bg-gray-300 transition-colors">
          <FaArrowRight className="w-5 h-5 text-gray-100" />
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        slidesPerView={3}
        spaceBetween={24}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        loop={true}
        className="mySwiper"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="rounded-2xl border w-full">
              <div className="flex flex-col items-center">
                <img
                  loading="lazy"
                  src={
                    testimonial.logo
                      ? `${CONFIG.serverUrl}/storage/${testimonial?.image_avant}`
                      : "/images/default-logo.png"
                  }
                  alt={testimonial.slug}
                  style={{
                    width: "100%",
                    height: "240px",
                    objectFit: "cover",
                    borderRadius: "12px 12px 0 0",
                  }}
                />
                <Link
                  to={`/spa/${testimonial.slug}`}
                  className="flex flex-col items-center no-underline hover:underline p-6 pt-3 w-full"
                >
                  <h3 className="text-2xl font-bold text-center text-black">
                    {testimonial.nom}
                  </h3>
                  <span className="font-roboto text-sm text-center text-gray-600">
                    {testimonial.adresse}
                  </span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}