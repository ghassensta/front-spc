import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageCarousel from "./image-carousel";
import CardItem from "../../../components/card-item/card-item";

export default function TemplateRestaurant({ data = [] }) {
  const imagesCarousel = data.type_media?.map((media) => `${media.path}`) || [];
  const [expanded, setExpanded] = useState(false);

  const toggleText = () => setExpanded(!expanded);

  // Check if extra_description exists and is non-empty
  const hasExtraDescription = data?.extra_description && data.extra_description.trim() !== "";

  return (
    <>
      {/* Bloc principal */}
      <div className="bg-[#f9f7ed] p-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start rounded-xl">
        {/* Carousel Section */}
        {imagesCarousel.length > 0 && (
          <div className="w-full h-[400px] md:h-[300px]">
            <ImageCarousel images={imagesCarousel} />
          </div>
        )}

        {/* Content Section */}
        <div className="w-full">
          <span className="text-lg md:text-xl font-bold text-gray-900 mb-2">
            {data.title || "Nom du Restaurant"}
          </span>

          <p className="text-base font-normal font-tahoma text-gray-800 mt-1">
            {data.description || "Description du restaurant. Un lieu d'exception pour vos repas."}
          </p>

          <AnimatePresence initial={false}>
            {expanded && hasExtraDescription && (
              <motion.div
                key="expandedText"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-base font-normal font-tahoma text-gray-800 mt-1">
                  {data.extra_description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show button only if extra_description exists */}
          {hasExtraDescription && (
            <button
              onClick={toggleText}
              className="mt-4 text-sm font-tahoma font-normal text-blue-600 hover:underline"
              aria-expanded={expanded}
              aria-controls="expanded-text"
            >
              {expanded ? "FERMER" : "LIRE PLUS"}
            </button>
          )}
        </div>
      </div>

      {/* Bloc des cartes en dessous du bloc principal */}
        {data.type_produit?.length > 0 && (
      <div className="bg-[#f9f7ed] p-6 grid-cols-1 md:grid-cols-3 gap-6 mt-6 rounded-xl">
          {data.type_produit.map((prod) => (
            <CardItem
              key={prod.id}
              id={prod.id}
              image={prod.image}
              nom={prod.nom}
              slug={prod.slug}
              description={prod.description}
              access_spa={prod.access_spa}
              prix={prod.prix}
              exclusivite_spc={prod.exclusivite_spc}
              date_fin={prod.date_fin}
              type_id={prod.type_id}
              conditions_utilisation={prod.conditions_utilisation}
              offre_flash={prod.offre_flash}
              date_debut={prod.date_debut}
              prix_barre={prod.prix_barre}
              prix_au_lieu_de={prod.prix_au_lieu_de}
              ordre={prod.ordre}
            />
          ))}
        
      </div>
      )}
    </>
  );
}