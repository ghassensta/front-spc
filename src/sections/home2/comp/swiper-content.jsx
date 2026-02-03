import React, { useRef, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";
import Card from "src/components/card/card";
import { paths } from "src/router/paths";
import { CONFIG } from "src/config-global";
import { useTranslation } from "src/context/translation-context";

const SwiperContent = ({ slidesPerView = 3, data = [] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const { translateSync } = useTranslation();

  const shouldLoop = data.length > slidesPerView;

  const breakpoints = useMemo(
    () => ({
      320: { slidesPerView: 1, spaceBetween: 10, centeredSlides: true },
      768: { slidesPerView: 2, spaceBetween: 15, centeredSlides: true },
      1024: { slidesPerView, spaceBetween: 20, centeredSlides: false },
    }),
    [slidesPerView]
  );

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <div className="relative max-w-[1200px] mx-auto px-4 md:px-12">
      <Swiper
        ref={swiperRef}
        loop={shouldLoop}
        spaceBetween={20}
        slidesPerView={Math.min(slidesPerView, data.length)}
        initialSlide={Math.min(2, Math.max(0, data.length - 1))}
        centeredSlides={data.length <= 2}
        breakpoints={breakpoints}
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        preventClicksPropagation={false}
        preventInteractionOnTransition={true}
      >
        {data.map((item, index) => {
          if (!item) return null;

          return (
            <SwiperSlide
              className="pt-8"
              key={item.id ? `item-${item.id}` : `slide-${index}`}
            >
              <Card
                to={item.slug ? paths.product(item.slug) : "#"}
                title={translateSync(item.name || "Produit")}
                image={
                  item.image
                    ? `${CONFIG.serverUrl}/storage/${item.image}`
                    : "/placeholder.png"
                }
                headTitle={translateSync(item.spaName || "")}
                location={translateSync(item.spaLocation || "")}
                bottomText={translateSync(item.offre || "")}
                offreValue={item.offreValue || 0}
                price={item.price || ""}
                duration={translateSync(item.duration || "")}
                id={item.produit_id || item.id || null}
                exclusivite_image={item.exclusivite_image}
                remise_desc_produit={translateSync(item.remiseDescProduit || "")}
                offre_flash={item.offre_flash || ""}
                date_debut={item.date_debut || ""}
                date_fin={item.date_fin || ""}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Navigation buttons */}
      {data.length > 1 && (
        <>
          <button
            ref={prevRef}
            aria-label={translateSync("Précédent")}
            className="absolute left-0 top-[35%] -translate-y-1/2 bg-[#B6B499] hover:bg-[#9a977d] rounded-full w-8 h-8 z-10 cursor-pointer flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B6B499] focus:ring-opacity-50"
          >
            <FaChevronLeft className="text-black w-3 h-3" />
          </button>

          <button
            ref={nextRef}
            aria-label={translateSync("Suivant")}
            className="absolute right-0 top-[35%] -translate-y-1/2 bg-[#B6B499] hover:bg-[#9a977d] rounded-full w-8 h-8 z-10 cursor-pointer flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B6B499] focus:ring-opacity-50"
          >
            <FaChevronRight className="text-black w-3 h-3" />
          </button>
        </>
      )}

      <style>{`
        .swiper-button-prev:after,
        .swiper-button-next:after {
          display: none !important;
        }

        .swiper-slide:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

SwiperContent.propTypes = {
  slidesPerView: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      slug: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
      spaName: PropTypes.string,
      spaLocation: PropTypes.string,
      offre: PropTypes.string,
      offreValue: PropTypes.number,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      duration: PropTypes.string,
      produit_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      exclusivite_image: PropTypes.string,
      remiseDescProduit: PropTypes.string,
      offre_flash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      date_debut:PropTypes.string,
      date_fin:PropTypes.string,
    })
  ),
};

export default React.memo(SwiperContent);
