import React from "react";
import Header from "./comp/header";
import Section from "./comp/section";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";
import { useLayout } from "src/actions/layout";
import { CONFIG } from "src/config-global";
import { useGetEtablissements } from "src/actions/etablissements";
import ProchainementSection from "./comp/prochainement-section";
import InformationsSection from "./comp/informations-section";
import { useGetLastNews } from "src/actions/actualites";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

export default function HomePageView() {
  const { etablissements } = useGetEtablissements();
  const { actualites } = useGetLastNews(3);
  console.log(actualites)
  const sections = [
    {
      bg: "white",
      header: "Accès Spa",
      subheader:
        "Plongez dans un univers de détente et profitez librement de nos espaces bien-être.",
      link: "/offres",
      data: [
        {
          slug: "massage-deluxe",
          name: "Accès Spa privatisé 60 mn - Solo et Duo.",
          image:
            "products/thumbnails/vA3qP0AqNpUqf2kwexPYT1cwjgQCsa7J6Kbsjrkx.jpg",
          spaName: "Domaine de Rymska",
          spaLocation: "1490 SAINT-JEAN DE TRÉZY - FRANCE",
          offre: "15% de remise ",
          offreValue: 20,
        },
        {
          slug: "soin-visage",
          name: "Privatisation Spa 60mn - Duo.",
          image:
            "uploads/products/vsh20tkZbTBA0YuocmFb2TgIEmFaCamZibo0cmSY.jpg",
          spaName: "Domaine des Prés Verts",
          spaLocation: "1490 SAINT-JEAN DE TRÉZY - FRANCE ",
          offre: "13% de remise",
          offreValue: 70,
        },
        {
          slug: "spa-relax",
          name: "Accès Spa privatisé 60 mn - Solo et Duo (si réservation de soins).",
          image:
            "products/thumbnails/8XpFhMpcDYnO8ylgwSCGFrE4VX7jzfxS7lJcsOws.jpg",
          spaName: "Domaine de Rymska",
          spaLocation: "1490 SAINT-JEAN DE TRÉZY - FRANCE",
          offre: "11% de remise",
          offreValue: 40,
        },
        {
          slug: "spa-relax",
          name: "Privatisation Spa 60mn - Duo.",
          image:
            "products/thumbnails/8XpFhMpcDYnO8ylgwSCGFrE4VX7jzfxS7lJcsOws.jpg",
          spaName: "Domaine des Prés Verts",
          spaLocation: "1490 SAINT-JEAN DE TRÉZY - FRANCE",
          offre: "15% de remise",
          offreValue: 15,
        },
      ],
    },
    {
      bg: "beige",
      header: "Soins Visage",
      subheader:
        "Sublimez votre peau et révélez votre éclat grâce à nos soins experts.",
      link: "/soins-visage",
      data: [
        {
          slug: "bain-marocain",
          name: "Soin Visage Signature Maison Blanche - Solo",
          image:
            "products/thumbnails/vA3qP0AqNpUqf2kwexPYT1cwjgQCsa7J6Kbsjrkx.jpg",
          spaName: "Maison Blanche Ile Rousse",
          spaLocation: "1490 SAINT-JEAN DE TRÉZY - FRANCE ",
          offre: "Jusqu’à 20% de remise",
          offreValue: 250,
        },
        {
          slug: "yoga-session",
          name: "Soin Personalisé au Choix - 30 mn",
          image:
            "uploads/products/vsh20tkZbTBA0YuocmFb2TgIEmFaCamZibo0cmSY.jpg",
          spaName: "Domaine de Rymska",
          spaLocation: "1490 SAINT-JEAN DE TRÉZY - FRANCE",
          offre: "Jusqu’à 20% de remise",
          offreValue: 80,
        },
        {
          slug: "sauna-premium",
          name: "Soin Visage Vinésim au choix 60 mn - Solo.",
          image:
            "products/thumbnails/8XpFhMpcDYnO8ylgwSCGFrE4VX7jzfxS7lJcsOws.jpg",
          spaName: "Domaine des Prés Verts",
          spaLocation: "1490 SAINT-JEAN DE TRÉZY - FRANCE",
          offre: "Jusqu’à 20% de remise",
          offreValue: 90,
        },
        {
          slug: "sauna-premium",
          name: "Soin Personalisé au Choix - 30 mn",
          image:
            "products/thumbnails/8XpFhMpcDYnO8ylgwSCGFrE4VX7jzfxS7lJcsOws.jpg",
          spaName: "Domaine de Rymska",
          spaLocation: "1490 SAINT-JEAN DE TRÉZY - FRANCE",
          offre: "Jusqu’à 20% de remise",
          offreValue: 20,
        },
      ],
    },
    {
      bg: "white",
      header: "Soins Visage",
      subheader:
        "Sublimez votre peau et révélez votre éclat grâce à nos soins experts.",
      link: "/soins-visage",
      data: [
        {
          slug: "bain-marocain",
          name: "Soin Visage Signature Maison Blanche - Solo",
          image:
            "products/thumbnails/vA3qP0AqNpUqf2kwexPYT1cwjgQCsa7J6Kbsjrkx.jpg",
          spaName: "Maison Blanche Ile Rousse",
          spaLocation: "1490 SAINT-JEAN DE TRÉZY - FRANCE ",
          offre: "Jusqu’à 20% de remise",
          offreValue: 250,
        },
        {
          slug: "yoga-session",
          name: "Soin Personalisé au Choix - 30 mn",
          image:
            "uploads/products/vsh20tkZbTBA0YuocmFb2TgIEmFaCamZibo0cmSY.jpg",
          spaName: "Domaine de Rymska",
          spaLocation: "1490 SAINT-JEAN DE TRÉZY - FRANCE",
          offre: "Jusqu’à 20% de remise",
          offreValue: 80,
        },
        {
          slug: "sauna-premium",
          name: "Soin Visage Vinésim au choix 60 mn - Solo.",
          image:
            "products/thumbnails/8XpFhMpcDYnO8ylgwSCGFrE4VX7jzfxS7lJcsOws.jpg",
          spaName: "Domaine des Prés Verts",
          spaLocation: "1490 SAINT-JEAN DE TRÉZY - FRANCE",
          offre: "Jusqu’à 20% de remise",
          offreValue: 90,
        },
        {
          slug: "sauna-premium",
          name: "Soin Personalisé au Choix - 30 mn",
          image:
            "products/thumbnails/8XpFhMpcDYnO8ylgwSCGFrE4VX7jzfxS7lJcsOws.jpg",
          spaName: "Domaine de Rymska",
          spaLocation: "1490 SAINT-JEAN DE TRÉZY - FRANCE",
          offre: "Jusqu’à 20% de remise",
          offreValue: 20,
        },
      ],
    },
  ];

  const { carte, prochainement, marques } = useLayout();
  console.log(prochainement);

  return (
    <>
      <Header />
      <div className="bg-[beige] w-screen relative bg-center left-[calc(-50vw+50%)] min-h-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-3 flex flex-col md:flex-row gap-2 py-8">
          <div className="md:w-1/2">
            <h2 className="text-4xl  font-semibold">Rejoignez la Communauté</h2>
            <h1 className="text-[#B6B599] text-4xl font-semibold">
              SPA & PRESTIGE COLLECTION
            </h1>
            <p className="mt-2 text-3xl mb-8">
              Plongez dans un univers d’ exception laissez-vous séduire par des
              privilèges rares et uniques
            </p>
            <p className="text-lg font-tahoma uppercase hidden md:block">
              JE COMMANDE UNE CARTE CADEAU À UTILISER DANS UN ÉTABLISSEMENT SPA
              & PRESTIGE COLLECTION ET JE CUMULE DES AVANTAGES
            </p>
            <button className="inline-flex font-tahoma rounded-lg items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-black text-white mt-6">
              Offrir
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              lazyload="lazy"
              src={`https://spc.emc1001.online/storage/products/thumbnails/vA3qP0AqNpUqf2kwexPYT1cwjgQCsa7J6Kbsjrkx.jpg`}
              alt="Carte Cadeau Spa & Prestige Collection"
              className="mb-4 max-h-96 w-full object-contain rounded-xl overflow-hidden"
            />
          </div>
        </div>
      </div>
      <div className="px-2">
        {sections.map((section, index) => (
          <Section key={index} {...section} />
        ))}
      </div>

      {/* PROCHAINEMENT DISPONIBLE  */}
      <ProchainementSection prochainement={prochainement} />
      <InformationsSection />
        {/* ACTUALITES SECTION  */}
      {actualites.length > 0 && (
        <div className="bg-[beige] rounded-lg  left-[calc(-50vw+50%)] relative w-screen">
          <div className="max-w-6xl mx-auto py-4 px-3">
            <h2 className="text-3xl font-bold text-center">
              Actualités :
              <span className="text-[#B6B499]"> Nos derniers articles</span>
            </h2>

            <div className={`grid grid-cols-1 md:grid-cols-${actualites.length} gap-4 mt-4`}>
              {actualites.map((actualite) => (
                <div className="flex flex-col">
                  <Link
                  to={paths.actualitesDetails(actualite.slug)}  >
                    <div
                      className="mb-1 relative cursor-pointer rounded-2xl overflow-hidden"
                      key={actualite.id}
                    >
                      <img
                        lazyload="lazy"
                        src={`${CONFIG.serverUrl}/storage/${actualite.thumbnail_path}`}
                        alt={actualite.title}
                      />
                      <span className="absolute bg-black/25 w-full h-full top-0 left-0 " />
                    
                    </div>
                     <span
                        
                        className="text-black text-xl p-2 pb-5 font-normal"
                      >
                        {actualite.title}
                      </span>
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link to={paths.actualites} className="inline-flex font-tahoma rounded-full items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-black text-white mt-6" >Tous nos articles</Link>
            </div>
          </div>
        </div>
      )}

      {/* MARQUES PARTENAIRES SECTION  */}
      {marques?.extra_data?.logos && (
        <div className="bg-white rounded-lg">
          <div className="max-w-6xl mx-auto py-6">
            <h2 className="text-3xl font-bold text-center">
              {marques.title || "Nos marques partenaires"}
            </h2>
            <p className="text-center text-gray-500 mt-2 mb-8">
              {marques.description}
            </p>

            {/* Gestion du loading et erreur */}

            {Object.keys(marques?.extra_data?.logos || {}).length > 0 ? (
              <Swiper
                spaceBetween={20}
                modules={[Autoplay, Navigation]}
                autoplay={{ delay: 3000 }}
                navigation={{
                  prevEl: ".swiper-button-prev",
                  nextEl: ".swiper-button-next",
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {Object.values(marques?.extra_data?.logos || {}).map(
                  (marque, i) => (
                    <SwiperSlide
                      key={i}
                      className="flex justify-center w-full h-48"
                    >
                      <a
                        href={marque.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full h-full"
                      >
                        <img
                          lazyload="lazy"
                          className="mx-auto max-h-full object-contain"
                          src={
                            marque.image
                              ? `${CONFIG.serverUrl}/storage/${marque.image}`
                              : "/assets/img/placeholder.png"
                          }
                          alt={`Logo partenaire ${i + 1}`}
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
