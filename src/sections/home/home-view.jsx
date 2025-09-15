import React, { useEffect, useRef } from "react";
import Header from "./comp/header";
import carteCadeau from "../../assets/SPC-icone-carte-cadeau.png";

import { FaHandHoldingHeart, FaRegArrowAltCircleRight } from "react-icons/fa";
import ButtonIcon from "../../components/button-icon/button-icon";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import { paths } from "../../router/paths";
import Card from "../../components/card/card";
import { useEtablissement } from "src/hooks/useEtablissement";
import { useActualites } from "src/hooks/useActualite";
import { useMarquePartenaires } from "src/hooks/useMarquePartenaire";
import { useSectionCarte } from "src/hooks/useSectionCarte";
import { API_URL_base } from "src/api/data";
import { useSectionProchainementDisponible } from "src/hooks/useProchainementDisponible";

export default function HomeView() {
  const { etablissements } = useEtablissement();
  const { actualites } = useActualites();
  const { marques, loading, error } = useMarquePartenaires();
  console.log("Marques partenaires data:", marques);
  const {
    section,
    loading: loadingSection,
    error: errorSection,
  } = useSectionProchainementDisponible();

  const { sectionCarte } = useSectionCarte();

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const renderMiniCard = (
    <div className="flex flex-col items-center">
      <img
        className="max-h-60 max-w-56 mb-2 rounded-md"
        src="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg"
        alt=""
      />
      <span className="text-xl font-bold text-center text-secondary">
        Nos valeurs{" "}
      </span>
    </div>
  );
  const logoUrl =
    "https://swissline-cosmetics.com/cdn/shop/files/swissline-logo.svg?v=1706103369&width=180";

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center">
          Des Moments Sélectionnés pour Vous.{" "}
          <div className="text-[#B6B499] text-2xl">
            Une collection choisie avec soin, pour celles et ceux en quête
            d’exceptions.
          </div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
          {etablissements.map((etablissement) => (
            <Card
              key={etablissement.id}
              type="large"
              to={`/spa/${etablissement.slug || etablissement.id}`}
              title={etablissement.nom || etablissement.id}
              description={etablissement.description_avant}
              image={`${API_URL_base}/storage/${etablissement.image_avant}`}
              location={etablissement.adresse}
            />
          ))}
        </div>
        <div className="text-center">
          <ButtonIcon title="Découvrir toutes les offres" />
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url("https://spa-prestige-collection.com/wp-content/uploads/2025/01/Piscine2.jpg")`,
        }}
        className="bg-primary w-screen relative bg-center left-[calc(-50vw+50%)] mt-16 min-h-32 overflow-hidden"
      >
        <div className="w-full flex flex-col z-10 relative items-center p-4 lg:p-16">
          <div className="bg-white/80 text-center flex flex-col items-center py-8 px-6 rounded-xl shadow-lg">
            {/* Vérifier que sectionCarte existe avant de lire ses propriétés */}
            {sectionCarte && sectionCarte.image && (
              <img
                src={`${API_URL_base}/storage/${sectionCarte.image}`}
                alt={sectionCarte.title || "Carte Cadeau"}
                className="mb-4 max-h-32 object-contain"
              />
            )}

            {/* Description (si sectionCarte existe) */}
            {sectionCarte && sectionCarte.description && (
              <p className="text-secondary font-tahoma text-base font-medium lg:w-1/2 uppercase mb-4">
                {sectionCarte.description}
              </p>
            )}

            {/* Bouton (si sectionCarte existe) */}
            {sectionCarte && sectionCarte.button_url && (
              <ButtonIcon
                title={sectionCarte.button_text || "DÉCOUVRIR"}
                to={sectionCarte.button_url}
                icon={<FaHandHoldingHeart />}
              />
            )}
          </div>
        </div>
      </div>

      <div
        className="mb-12 relative w-screen left-[calc(-50vw+50%)]"
        style={{ backgroundColor: section?.extra_data?.background || "beige" }}
      >
        <div className="max-w-6xl mx-auto py-4">
          <h2 className="text-4xl font-bold text-center">
            {section?.title || "L’univers Spa & Prestige Collection."}
            <div className="text-[#777676] mt-2">
              {section?.description ||
                "Un réseau confidentiel dédié aux lieux d’exception."}
            </div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            {section?.extra_data?.cards?.map((item, index) => (
              <Card
                key={index} // React nécessite une clé unique
                to={item.link ? `/produit/${item.link}` : "#"}
                title={item.title || "Sans titre"}
                image={
                  item.image
                    ? `${API_URL_base}${item.image}`
                    : "/assets/img/placeholder.png"
                }
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mb-12">
        <div className="max-w-6xl mx-auto py-4">
          <h2 className="text-4xl font-bold text-center">
            L’univers Spa & Prestige Collection.{" "}
            <div className="text-[#777676]">
              Un réseau confidentiel dédié aux lieux d’exception.
            </div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            <Card
              to="/spa/paris"
              title="Qui sommes-nous ?"
              image="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg"
            />
            <Card
              to="/spa/paris"
              title="Référentiel de candidature"
              image="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg"
            />
            <Card
              to="/spa/paris"
              title="Collection Prestige"
              image="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg"
            />
          </div>
        </div>
      </div>

      <div className="bg-primary rounded-lg my-12 left-[calc(-50vw+50%)] relative w-screen">
        <div className="max-w-6xl mx-auto py-4">
          <h2 className="text-4xl font-bold text-center">
            Actualités
            <div className="text-[#777676]">Nos derniers articles</div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {actualites.map((actualite) => (
              <Card
                key={actualite.id}
                type="news"
                to={`/actualites/${actualite.slug || actualite.id}`}
                title={actualite.title}
                description={actualite.petit_description}
                image={`${API_URL_base}/storage/${actualite.image}`}
                date={new Date(actualite.created_at).toLocaleDateString(
                  "fr-FR",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              />
            ))}
          </div>
          <div className="text-center">
            <ButtonIcon title="Tous nos articles" />
          </div>
        </div>
      </div>

      <div className="bg-white my-12 rounded-lg">
        <div className="max-w-6xl mx-auto py-12">
          <h2 className="text-4xl font-bold text-center">
            {marques.title || "Nos marques partenaires"}
          </h2>
          <p className="text-center text-gray-500 mt-2 mb-8">
            {marques.description || "Découvrez les marques prestigieuses que nous avons sélectionnées pour vous."}
          </p>

          {/* Gestion du loading et erreur */}
          {loading && <p className="text-center">Chargement...</p>}
          {error && <p className="text-center text-red-500">Erreur: {error}</p>}

          {!loading && !error && marques?.length > 0 && (
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
              {marques.map((marque, i) => (
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
                      className="mx-auto max-h-full object-contain"
                      src={
                        marque.image
                          ? `${API_URL_base}/storage/${marque.image}`
                          : "/assets/img/placeholder.png"
                      }
                      alt={`Logo partenaire ${i + 1}`}
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {!loading && !error && (!marques || marques.length === 0) && (
            <p className="text-center text-gray-400">
              Aucune marque partenaire disponible pour le moment.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
