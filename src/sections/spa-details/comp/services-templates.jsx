import React from "react";
import { CATEGORIES, SERVICES_LIST } from "../../../_mock/categories";
import CategoryPuce from "../../../components/category-puce/categoryPuce";
import CardItem from "src/components/card-item/card-item";

const cards = [
  {
    id: 1,
    image:
      "https://spa-prestige-collection.com/wp-content/uploads/2025/02/SPC-Massage-corps-1975x1318-02.jpg",
    title: "Massage evasion sensorielle – 1h – en Solo",
    description:
      "Massage evasion sensorielle : Le massage Évasion Sensorielle est une expérience holistique unique qui combine des techniques de massage traditionnelles avec des éléments d",
    spaNote: "Accès Spa (valeur 40 €) offert avec cette offre.",
    price: "99,00 €",
    exclusiveExist: true,
    flashDeadline: "2025-05-01T20:30:00",
  },
  {
    id: 2,
    image:
      "https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPA-visage-1975x1318-04.jpg",
    title: "Pass Paradis 1h + Traditionnel Indien du Visage 30 mn – Solo",
    description:
      "Accès à l’espace Réveil des Sens et au Concept du Bonheur ET « Un masseur bien-être écoute avec ses mains, et son cœur » Le massage Indien du visage est originaire d",
    spaNote: "Accès Spa (valeur 40 €) offert avec cette offre.",
    price: "69,00 €",
    exclusiveExist: false,
  },
];
export default function ServicesTemplates() {
  return (
    <div className="bg-[#f9f7ed] p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start rounded-lg shadow">
      {/* Content Section */}
      <div className="w-full text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Listing Equipements
        </h3>

        <p className="text-gray-700 font-tahoma text-sm md:text-base leading-relaxed mb-3">
          Sauna Bain de chaleur sèche entre 70° et 100°C, issu de la tradition
          scandinave, favorise l'élimination des toxines par la sudation.
          Hammam. Bain de chaleur humide entre 45° et 70°C, issu de la tradition
          orientale, favorise la dilatation des pores pour un nettoyage en
          profondeur Fontaine à glace Idéal pour les sensations de jambes
          lourdes, rafraichir l'épiderme, éliminer les toxines. Piscine A
          l'extérieur aux beaux jours, transats à disposition autour du bassin,
          espace repos et salon de thé a l'intérieur. Spa Ce bain à remous
          efface le stress, la fatigue et améliore la qualité du sommeil, dans
          une température d'eau entre 33° et 40°. Spa la santé par l'eau. Bain
          Nordique de tradition finlandaise chauffé au feu de bois Bain d'eau
          froide de tradition finlandaise Sauna Nordique de tradition
          finlandaise chauffé au feu de bois à 100°.
        </p>

        <div className="flex flex-wrap gap-4 mx-auto items-center justify-center">
          {SERVICES_LIST.map((category) => (
            <CategoryPuce
              title={category.title}
              icon={category.icon}
              link={category.link}
            />
          ))}
        </div>
        <div className="bg-[#f6f4ec] p-6 grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {cards.map((card, index) => (
            <CardItem key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
