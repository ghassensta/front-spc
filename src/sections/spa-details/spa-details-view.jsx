import React, { useState } from "react";
import ImageCarousel from "./comp/image-carousel";
import DetailsCard from "./comp/details-card";
import logoD from "../../assets/logo-d.jpg";
import InfoCard from "./comp/info-card";
import Services from "./comp/services";
import CarteCadeau from "./comp/carte-cadeau";
import logoSpc from "../../assets/logo-small.png";
import LocationSection from "./comp/location-section";
import TestimonialsSection from "./comp/others-section";
import StarRatingInput from "src/components/star-rating-input/star-rating-input";
import ButtonIcon from "src/components/button-icon/button-icon";

const criteria = [
  "Practicien(ne)",
  "Accueil",
  "Vestiaires",
  "Cabine",
  "Soin",
  "Détente",
  "Équipements",
  "Boutique",
];

export default function SpaDetailsView() {
  const initialRatings = {};
  criteria.forEach((key) => {
    initialRatings[key] = 0;
  });

  const [ratings, setRatings] = useState(initialRatings);

  const handleRatingChange = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };
  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="">
          <ImageCarousel />
        </div>
        <DetailsCard
          details={{
            name: "David Grand Spa – Villerest",
            logo: logoD,
            avgRating: 4,
            description: `DaviD GranD Spa est un lieu de bien-être unique situé à Villerest, à proximité de Roanne. Il vous invite à vivre une véritable expérience de détente et de ressourcement, dans une parfaite harmonie entre le corps et l’esprit.
                    Conçu pour ceux qui recherchent une pause régénérante, notre spa vous propose une large gamme de soins sur mesure, adaptés à vos besoins : massages relaxants, soins du visage, gommages, rituels personnalisés... le tout dans une atmosphère apaisante et chaleureuse.
        
                    Notre équipe d’expert(e)s est à votre écoute pour vous offrir une expérience de bien-être inégalée, en utilisant des produits haut de gamme comme ceux de la marque Altéarah.
        
                    Notre mission : vous accompagner dans un véritable lâcher-prise. Grâce à notre savoir-faire et notre attention portée aux moindres détails, nous vous aidons à éliminer le stress, revitaliser votre corps et nourrir votre bien-être intérieur.
        
                    Réservez dès maintenant votre moment d’évasion et découvrez l’expérience DaviD GranD Spa.`,
          }}
        />
      </div>
      {/* <InfoCard /> */}
      <Services />
      <div className="bg-white p-4 rounded-lg border max-w-6xl m-auto mt-8">
        <h6 className="font-semibold text-lg mb-4">Laisser un avis</h6>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {criteria.map((criterion) => (
            <div key={criterion}>
              <label className="block text-sm font-medium mb-1 font-roboto">
                {criterion}
              </label>
              <StarRatingInput
                value={ratings[criterion]}
                onChange={(value) => handleRatingChange(criterion, value)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <ButtonIcon title="Envoyer l'avis" />
        </div>
      </div>
      <CarteCadeau />
      <div
        style={{
          backgroundImage:
            "url(https://spa-prestige-collection.com/wp-content/uploads/2025/07/1.png)",
        }}
        className="bg-primary w-screen relative left-[calc(-50vw+50%)] mb-16 min-h-32 overflow-hidden bg-center"
      >
        <div className="flex flex-col items-center p-12 text-center bg-slate-300/80  w-[60%] my-36 mx-auto">
          <img src={logoSpc} alt="" className="w-36 mb-4" />
          <h3 className="text-4xl font-bold mb-4">
            – Le conseil Spa & Prestige Collection –
          </h3>
          <p className="text-lg font-normal font-tahoma">
            Le Domaine de Rymska incarne à merveille l’équilibre entre
            raffinement, nature et quiétude. Nous vous recommandons d’y vivre
            une parenthèse de détente à deux, en conjuguant un soin bien-être
            personnalisé avec l’expérience gastronomique de la Table de Rymska,
            pour savourer pleinement l’essence de la Bourgogne dans un cadre
            confidentiel et inspirant.
          </p>
        </div>
      </div>

      <LocationSection />
      <TestimonialsSection />
    </div>
  );
}
