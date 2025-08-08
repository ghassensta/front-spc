import React from "react";
import { CATEGORIES, SERVICES_LIST } from "../../../_mock/categories";
import CategoryPuce from "../../../components/category-puce/categoryPuce";

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
      </div>
    </div>
  );
}
