import React from "react";
import Header from "./comp/header";
import Section from "./comp/section";
import Section2 from "./comp/section2";
import ProchainementSection from "./comp/prochainement-section";
import InformationsSection from "./comp/informations-section";
import Serach from "src/components/header/serach";
import { useGetHomePage } from "src/actions/homepage";
import { useGetLastNews } from "src/actions/actualites";
import { paths } from "src/router/paths";
import { CONFIG } from "src/config-global";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
import { useTranslation } from "src/context/translation-context";
import Partenaires from "./comp/partenaires";

export default function HomePageView() {
  const { sections } = useGetHomePage();
  const { actualites } = useGetLastNews(3);
  const { translateSync } = useTranslation();

  if (!sections || !Array.isArray(sections) || sections.length === 0)
    return null;

  const section4 = sections.find((s) => s.key === "section4");
  const section5 = sections.find((s) => s.key === "section5");
  const section6 = sections.find((s) => s.key === "section6");

  if (!section4 || !section5) return null;

  const dynamicSections =
    Array.isArray(section4.extra_data?.categories) &&
    section4.extra_data.categories.length > 0
      ? section4.extra_data.categories.map((cat, idx) => ({
          bg: cat.background === "beige" ? "beige" : "white",
          header: cat.title || "",
          subheader: cat.description || "",
          link: cat.button_url || "#",
          data:
            Array.isArray(cat.cards) && cat.cards.length > 0
              ? cat.cards.map((card) => ({
                  price: card.prix || 0,
                  duration: "",
                  slug: card.adresse || "#",
                  name: card.title || "",
                  image: card.image || "",
                  adresse_etab: card.adresse_etab || "",
                  spaName: card.etablissement_name || translateSync("Inconnu"),
                  spaLocation: card.adresse_etab || "",
                  offre:
                    card.remise != null
                      ? translateSync(`${card.remise}% de remise`)
                      : "",
                  offreValue: card.remise != null ? parseInt(card.remise) : 0,
                  exclusivite_image: card.exclusivite_image || null,
                  remiseDescProduit: card.remise_desc_produit || "",
                  id: card.produit_id || null,
                }))
              : [],
        }))
      : [];

  return (
    <div>
      <Serach />
      <Section2 />

      {/* Sections dynamiques */}
      {dynamicSections.length > 0 && (
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
      )}

      {/* Section Prochainement */}
      <ProchainementSection prochainement={section5} />

      {/* Section Informations */}
      <InformationsSection />

      {Array.isArray(actualites) && actualites.length > 0 && (
        <>
          {/* Desktop */}
          <div className="hidden md:block bg-[#f6f5e9] rounded-lg left-[calc(-50vw+50%)] relative w-screen">
            <div className="max-w-6xl mx-auto py-6 px-3">
              <h2 className="text-3xl font-bold text-center">
                {translateSync("Actualités :")}{" "}
                <span className="text-[#B6B499]">
                  {translateSync("Nos derniers articles")}
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {actualites.map((actualite) => (
                  <div className="flex flex-col" key={actualite.id}>
                    <Link to={paths.actualitesDetails(actualite.slug)}>
                      <div className="mb-1 relative cursor-pointer rounded-2xl overflow-hidden">
                        <img
                          loading="lazy"
                          src={`${CONFIG.serverUrl}/storage/${actualite.thumbnail_path}`}
                          alt={translateSync(actualite.title)}
                          className="w-full h-64 object-cover"
                        />
                        <span className="absolute inset-0 bg-black/25" />
                      </div>

                      <span className="text-black text-xl p-2 pb-5 font-normal block">
                        {translateSync(actualite.title)}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  to={paths.actualites}
                  className="inline-flex font-tahoma rounded-full items-center gap-2 uppercase tracking-widest px-6 py-3 text-sm bg-black text-white"
                >
                  {translateSync("Tous nos articles")}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden py-6 bg-[#f6f5e9]">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-6">
                {translateSync("Actualités")}
              </h2>

              <Swiper
                spaceBetween={30}
                slidesPerView={1.3}
                centeredSlides
                loop={false}
              >
                {actualites.map((actualite) => (
                  <SwiperSlide key={actualite.id}>
                    <Link to={paths.actualitesDetails(actualite.slug)}>
                      <div className="text-center">
                        <div className="w-64 h-64 mx-auto overflow-hidden rounded-2xl shadow-xl">
                          <img
                            loading="lazy"
                            src={`${CONFIG.serverUrl}/storage/${actualite.thumbnail_path}`}
                            alt={translateSync(actualite.title)}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="mt-6 px-8">
                          <h3 className="text-lg font-normal leading-snug line-clamp-3">
                            {translateSync(actualite.title)}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="text-center mt-6">
                <Link
                  to={paths.actualites}
                  className="inline-block bg-black text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest font-tahoma"
                >
                  {translateSync("Tous nos articles")}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ===== LOGOS PARTENAIRES ===== */}
      <Partenaires section={section6} />
    </div>
  );
}
