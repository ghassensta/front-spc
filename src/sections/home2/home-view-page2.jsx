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

      <ProchainementSection prochainement={section5} />

      <InformationsSection />

      {/* ACTUALITÉS */}
      {actualites.length > 0 && (
        <div className="bg-[#FAF9F5] rounded-lg left-[calc(-50vw+50%)] relative w-screen">
          <div className="max-w-6xl mx-auto py-4 px-3">
            <h2 className="text-3xl font-bold text-center">
              Actualités :{" "}
              <span className="text-[#B6B499]">Nos derniers articles</span>
            </h2>

            <div className={`grid grid-cols-1 md:grid-cols-${actualites.length} gap-4 mt-4`}>
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

      {/* === SECTION 6 : Marques partenaires === */}
      {section6 && section6.extra_data?.logos && section6.extra_data.logos.length > 0 && (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {section6.title}
            </h2>
            {section6.description && (
              <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
                {section6.description}
              </p>
            )}

            {/* CORRECTION 2 : Module Navigation retiré car tu ne l'utilises pas */}
            <Swiper
              modules={[Autoplay]} // ← Seulement Autoplay (pas Navigation = pas d'erreur)
              spaceBetween={40}
              slidesPerView={2}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 },
              }}
              className="py-8"
            >
              {section6.extra_data.logos.map((logo, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
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
                        className="max-h-24 object-contain filter grayscale hover:grayscale-0 transition-all"
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <img
                      src={`${CONFIG.serverUrl}/storage/${logo.image}`}
                      alt={`Partenaire ${index + 1}`}
                      className="max-h-24 object-contain opacity-70"
                      loading="lazy"
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}