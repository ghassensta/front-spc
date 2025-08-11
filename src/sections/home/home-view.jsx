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

export default function HomeView() {
  const { etablissements } = useEtablissement();
  const { actualites } = useActualites();
  const { marques, loading, error } = useMarquePartenaires();
  const API_URL = "http://127.0.0.1:8000";

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
              description={etablissement.description}
              image={`${API_URL}/storage/${etablissement.logo}`}
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
          backgroundImage:
            "url(https://spa-prestige-collection.com/wp-content/uploads/2025/01/Piscine2.jpg)",
        }}
        className="bg-primary w-screen relative bg-center left-[calc(-50vw+50%)] mt-16 min-h-32 overflow-hidden"
      >
        <div className="w-full flex flex-col z-10 relative items-center p-4 lg:p-16">
          <div className="bg-white/80 text-center flex flex-col items-center py-8">
            <img src={carteCadeau} alt="" className="mb-4" />
            <p className="text-secondary font-tahoma text-base font-medium lg:w-1/2 uppercase mb-4">
              JE COMMANDE une CARTE cadeau à utiliser dans un établissement SPA
              & PRESTIGE COLLECTION et je cumule des avantages
            </p>
            <ButtonIcon title="OFFRIR" icon={<FaHandHoldingHeart />} />
          </div>
        </div>
      </div>
      <div className="bg-primary mb-12 left-[calc(-50vw+50%)] relative w-screen">
        <div className="max-w-6xl mx-auto py-4">
          <h2 className="text-4xl font-bold text-center">
            Prochainement disponible.{" "}
            <div className="text-[#777676]">
              Une parenthèse de quiétude au cœur d’un écrin de verdure...
            </div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            <Card
              to="/spa/paris"
              title="Le Spa by Sothys Paris République 5*"
              image="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg"
            />
            <Card
              to="/spa/paris"
              title="Le Spa by Sothys Paris République 5*"
              image="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg"
            />
            <Card
              to="/spa/paris"
              title="Le Spa by Sothys Paris République 5*"
              image="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg"
            />
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
                image={`${API_URL}/storage/${actualite.image}`}
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
        <h2 className="text-4xl font-bold text-center">
          Nos marques partenaires
        </h2>
        <div className="max-w-6xl m-auto py-12 flex justify-between">
          <Swiper
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {marques.map((marque, i) => (
              <SwiperSlide
                key={marque.id ?? i}
                className="flex justify-center w-full h-48"
              >
                <img
                  className="mx-auto max-h-full object-contain"
                  src={`${API_URL}/storage/${marque.logo}`}
                  alt={marque.name || "Marque partenaire"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
