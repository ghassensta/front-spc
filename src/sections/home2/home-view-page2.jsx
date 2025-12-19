import React from "react";
import Header from "./comp/header";
import Section from "./comp/section";
import { paths } from "src/router/paths";
import { CONFIG } from "src/config-global";
import ProchainementSection from "./comp/prochainement-section";
import InformationsSection from "./comp/informations-section";
import { useGetLastNews } from "src/actions/actualites";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Section2 from "./comp/section2";
import { useGetHomePage } from "src/actions/homepage";
import "swiper/css";
import Serach from "src/components/header/serach";

export default function HomePageView() {
  const { sections } = useGetHomePage();
  const { actualites } = useGetLastNews(3);

  const section4 = sections?.find((s) => s.key === "section4");
  const section5 = sections?.find((s) => s.key === "section5");
  const section6 = sections?.find((s) => s.key === "section6");

  if (!sections || !section4 || !section5) return null;

  const dynamicSections = section4.extra_data.categories.map((cat) => ({
    bg: cat.background === "beige" ? "beige" : "white",
    header: cat.title,
    subheader: cat.description || "",
    link: cat.button_url || "#",
    data: cat.cards.map((card) => ({
      price: card.prix || 0,
      duration: "",
      slug: card.adresse,
      name: card.title,
      image: card.image,
      adresse_etab: card.adresse_etab,
      spaName: card.etablissement_name || "Inconnu",
      spaLocation: card.adresse_etab || "",
      offre: card.remise != null ? `${card.remise}% de remise` : "",
      offreValue: card.remise != null ? parseInt(card.remise) : 0,
      exclusivite_spc: card.exclusivite_spc || false,
      remiseDescProduit: card.remise_desc_produit || "",
      id: card.produit_id || null,
    })),
  }));

  return (
    <div>
      <Serach />
      <Section2 />

      <div className="px-2">
        {dynamicSections.map((section, index) => (
          <div
            key={index}
            className={section.bg === "beige" ? "bg-[#f6f5e9]" : "bg-white"}
          >
            <Section {...section} />
          </div>
        ))}
      </div>

      <ProchainementSection prochainement={section5} />
      <InformationsSection />

      {actualites.length > 0 && (
        <>
          {}
          <div className="hidden md:block bg-[#f6f5e9] rounded-lg left-[calc(-50vw+50%)] relative w-screen">
            <div className="max-w-6xl mx-auto py-6 px-3">
              <h2 className="text-3xl font-bold text-center">
                Actualités :{" "}
                <span className="text-[#B6B499]">Nos derniers articles</span>
              </h2>
              <div
                className={`grid grid-cols-1 md:grid-cols-${actualites.length} gap-4 mt-4`}
              >
                {actualites.map((actualite) => (
                  <div className="flex flex-col" key={actualite.id}>
                    <Link to={paths.actualitesDetails(actualite.slug)}>
                      <div className="mb-1 relative cursor-pointer rounded-2xl overflow-hidden">
                        <img
                          loading="lazy"
                          src={`${CONFIG.serverUrl}/storage/${actualite.thumbnail_path}`}
                          alt={actualite.title}
                          className="w-full h-64 object-cover"
                        />
                        <span className="absolute inset-0 bg-black/25" />
                      </div>
                      <span className="text-black text-xl p-2 pb-5 font-normal">
                        {actualite.title}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  to={paths.actualites}
                  className="inline-flex font-tahoma rounded-full items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-black text-white"
                >
                  Tous nos articles
                </Link>
              </div>
            </div>
          </div>

          {}
          <div className="md:hidden py-6 md:py-16 bg-[#f6f5e9]">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-6 md:mb-12">
                Actualités
              </h2>
              <Swiper
                spaceBetween={30}
                slidesPerView={1.3}
                centeredSlides={true}
                initialSlide={1}
                loop={false}
              >
                {actualites.map((actualite) => (
                  <SwiperSlide key={actualite.id}>
                    <Link
                      to={paths.actualitesDetails(actualite.slug)}
                      className="block"
                    >
                      <div className="text-center">
                        <div className="w-64 h-64 mx-auto overflow-hidden rounded-2xl shadow-xl">
                          <img
                            loading="lazy"
                            src={`${CONFIG.serverUrl}/storage/${actualite.thumbnail_path}`}
                            alt={actualite.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-6 px-8">
                          <h3 className="text-lg font-normal leading-snug line-clamp-3">
                            {actualite.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="text-center mt-6 md:mt-12">
                <Link
                  to={paths.actualites}
                  className="inline-block bg-black text-white px-8 py-4 rounded-full text-sm font-normal uppercase tracking-widest font-tahoma hover:bg-gray-800 transition"
                >
                  Tous nos articles
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {}
      {section6 &&
        section6.extra_data?.logos?.length > 0 && (
          <div className="bg-white py-2 md:py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {section6.title}
              </h2>
              {section6.description && (
                <p className="text-gray-600 text-lg max-w-3xl mx-auto md:mb-12">
                  {section6.description}
                </p>
              )}
              <Swiper
                modules={[Autoplay]}
                spaceBetween={40}
                slidesPerView={2}
                loop={true}
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
                {section6.extra_data.logos.map((logo, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex items-center justify-center"
                  >
                    {logo.link ? (
                      <a
                        href={logo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-6 hover:scale-110 transition-all duration-300"
                      >
                        <img
                          src={`${CONFIG.serverUrl}/storage/${logo.image}`}
                          alt={`Partenaire ${index + 1}`}
                          className="md:max-h-24 max-h-36 object-contain filter grayscale hover:grayscale-0 transition-all"
                          loading="lazy"
                        />
                      </a>
                    ) : (
                      <img
                        src={`${CONFIG.serverUrl}/storage/${logo.image}`}
                        alt={`Partenaire ${index + 1}`}
                        className="md:max-h-24 max-h-36 object-contain opacity-70"
                        loading="lazy"
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
    </div>
  );
}
