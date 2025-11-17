import React from "react";
import Header from "./comp/header";
import Section from "./comp/section";
import { paths } from "src/router/paths";
import { useLayout } from "src/actions/layout";
import { CONFIG } from "src/config-global";
import ProchainementSection from "./comp/prochainement-section";
import InformationsSection from "./comp/informations-section";
import { useGetLastNews } from "src/actions/actualites";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Section2 from "./comp/section2";
import { useGetHomePage } from "src/actions/homepage";
import "swiper/css";

export default function HomePageView() {
  const { sections } = useGetHomePage();
  const section4 = sections?.find((s) => s.key === "section4");
  const { actualites } = useGetLastNews(3);
  const { prochainement, marques } = useLayout();

  if (!section4) return null;

  const dynamicSections = section4.extra_data.categories.map((cat) => ({
    // Fond dynamique : "blanc" → white, "beige" → beige
    bg: cat.background === "beige" ? "beige" : "white",
    header: cat.title,
    subheader: cat.description || "",
    link: cat.button_url || "#",
    data: cat.cards.map((card) => ({
      price: card.prix ? `${card.prix} €` : "",
      duration: "",
      slug: card.adresse,
      name: card.title,
      image: card.image,
      adresse_etab: card.adresse_etab, 
      spaName: card.etablissement_name ?? "dddddddddd",  
      spaLocation: card.adresse_etab || "", 
      offre: card.remise ? `${card.remise}% de remise` : "",
      offreValue: card.remise ? parseInt(card.remise) : 0,
    })),
  }));

  return (
    <>
      <Header />
      <Section2 />

      {/* Sections dynamiques avec fond correct */}
      <div className="px-2">
        {dynamicSections.map((section, index) => (
          <div
            key={index}
            className={section.bg === "beige" ? "bg-[#FAF9F5]" : "bg-white"}
          >
            <Section {...section} />
          </div>
        ))}
      </div>

      {/* PROCHAINEMENT DISPONIBLE */}
      <ProchainementSection prochainement={prochainement} />
      <InformationsSection />

      {/* ACTUALITÉS */}
      {actualites.length > 0 && (
        <div className="bg-[#FAF9F5] rounded-lg left-[calc(-50vw+50%)] relative w-screen">
          <div className="max-w-6xl mx-auto py-4 px-3">
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
      )}

      {/* MARQUES PARTENAIRES */}
      {marques?.extra_data?.logos && (
        <div className="bg-white">
          <div className="max-w-6xl mx-auto py-12">
            <h2 className="text-3xl font-bold text-center">
              {marques.title || "Nos marques partenaires"}
            </h2>
            <p className="text-center text-gray-500 mt-2 mb-10">
              {marques.description}
            </p>

            {Object.keys(marques.extra_data.logos).length > 0 ? (
              <Swiper
                spaceBetween={20}
                modules={[Autoplay, Navigation]}
                autoplay={{ delay: 3000 }}
                loop
                breakpoints={{
                  320: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 5 },
                }}
              >
                {Object.values(marques.extra_data.logos || {}).map(
                  (marque, i) => (
                    <SwiperSlide
                      key={i}
                      className="flex justify-center items-center h-40"
                    >
                      <a
                        href={marque.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full flex items-center justify-center"
                      >
                        <img
                          loading="lazy"
                          src={
                            marque.image
                              ? `${CONFIG.serverUrl}/storage/${marque.image}`
                              : "/assets/img/placeholder.png"
                          }
                          alt={`Logo partenaire ${i + 1}`}
                          className="max-h-24 object-contain"
                        />
                      </a>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            ) : (
              <p className="text-center text-gray-400">
                Aucune marque partenaire disponible pour le moment.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
