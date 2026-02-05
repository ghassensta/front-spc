import React, { useRef, useMemo, useState, useEffect } from "react";
import { paths } from "src/router/paths";
import { CONFIG } from "src/config-global";
import { useTranslation } from "src/context/translation-context";
import PropTypes from "prop-types";
import Card from "src/components/card/card";

const SwiperContent = ({ slidesPerView = 3, data = [] }) => {
  const [Swiper, setSwiper] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const { translateSync } = useTranslation();

  // Lazy charger Swiper seulement si nécessaire
  useEffect(() => {
    if (data.length > 1) {
      import("swiper/react").then((swiperModule) => {
        import("swiper/modules").then((modules) => {
          setSwiper({
            ...swiperModule,
            Navigation: modules.Navigation
          });
        });
      });
    }
  }, [data.length]);

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

  // Afficher un fallback simple si Swiper n'est pas encore chargé
  if (!Swiper && data.length > 1) {
    return (
      <div className="relative max-w-[1200px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.slice(0, slidesPerView).map((item, index) => (
            <div key={item.id ? `item-${item.id}` : `slide-${index}`} className="pt-8">
              {/* Card component here - simplifié pour le fallback */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">{translateSync(item.name || "Produit")}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 1) {
    // Single item - no Swiper needed
    const item = data[0];
    return (
      <div className="relative max-w-[1200px] mx-auto px-4 md:px-12">
        <div className="pt-8">
          {/* Card component here */}
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
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-[1200px] mx-auto px-4 md:px-12">
      <Swiper.Swiper
        ref={swiperRef}
        loop={shouldLoop}
        spaceBetween={20}
        slidesPerView={Math.min(slidesPerView, data.length)}
        initialSlide={Math.min(2, Math.max(0, data.length - 1))}
        centeredSlides={data.length <= 2}
        breakpoints={breakpoints}
        modules={[Swiper.Navigation]}
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
            <Swiper.SwiperSlide
              className="pt-8"
              key={item.id ? `item-${item.id}-${index}` : `slide-${index}-${Math.random().toString(36).substr(2, 9)}`}
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
            </Swiper.SwiperSlide>
          );
        })}
      </Swiper.Swiper>

      {/* Navigation buttons */}
      {data.length > 1 && (
        <>
          <button
            ref={prevRef}
            aria-label={translateSync("Précédent")}
            className="absolute left-0 top-[35%] -translate-y-1/2 bg-[#B6B499] hover:bg-[#9a977d] rounded-full w-8 h-8 z-10 cursor-pointer flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B6B499] focus:ring-opacity-50"
          >
            ←
          </button>

          <button
            ref={nextRef}
            aria-label={translateSync("Suivant")}
            className="absolute right-0 top-[35%] -translate-y-1/2 bg-[#B6B499] hover:bg-[#9a977d] rounded-full w-8 h-8 z-10 cursor-pointer flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B6B499] focus:ring-opacity-50"
          >
            →
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
