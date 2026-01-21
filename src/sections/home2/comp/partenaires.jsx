import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { CONFIG } from "src/config-global";
import { useTranslation } from "src/context/translation-context";

export default function Partenaires({ section }) {
  const { translateSync } = useTranslation();

  if (!section?.extra_data?.logos?.length) return null;

  return (
    <div className="bg-white py-2 md:py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          {translateSync(section.title)}
        </h2>

        {section.description && (
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            {translateSync(section.description)}
          </p>
        )}

        <Swiper
          modules={[Autoplay]}
          spaceBetween={40}
          slidesPerView={2}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            425: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          className="py-8"
        >
          {section.extra_data.logos.map((logo, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              {logo.link ? (
                <a
                  href={logo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 hover:scale-110 transition"
                >
                  <img
                    src={`${CONFIG.serverUrl}/storage/${logo.image}`}
                    alt={translateSync(`Partenaire ${index + 1}`)}
                    className="md:max-h-24 max-h-36 object-contain grayscale hover:grayscale-0 transition"
                    loading="lazy"
                  />
                </a>
              ) : (
                <img
                  src={`${CONFIG.serverUrl}/storage/${logo.image}`}
                  alt={translateSync(`Partenaire ${index + 1}`)}
                  className="md:max-h-24 max-h-36 object-contain opacity-70"
                  loading="lazy"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
