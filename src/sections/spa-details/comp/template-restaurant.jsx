import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageCarousel from './image-carousel';


export default function TemplateRestaurant() {
  const [expanded, setExpanded] = useState(false);

  const toggleText = () => setExpanded(!expanded);

  return (
    <div className="bg-[#f9f7ed] p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start rounded-lg shadow">
      
      {/* Carousel Section */}
      <div className="w-full md:w-1/2 relative">
        <ImageCarousel height="280px" images={sp}/>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-normal text-gray-900 md:text-3xl">
          Le château de Champlong
        </h2>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
          DOMAINE DE CHAMPLONG
        </h3>

        <p className="text-base font-normal font-tahoma text-gray-800 mt-1">
          Le Domaine de Champlong, où la passion du bien-être atteint son apogée.
          Situé entre le Lyonnais, la Bourgogne et l’Auvergne, au sein du pays Roannais,
          le Domaine de Champlong c’est un doux menuet poétique qui incite à flâner
          et suscite le bien-être tant l’endroit est unique et charmant,
          aux côtés du Spa David Grand.
        </p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="expandedText"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <p className="text-base font-normal font-tahoma text-gray-800 mt-1">
                Dans un cadre raffiné, ce lieu vous accueille pour une expérience immersive
                entre gastronomie, détente et nature. Que ce soit pour un week-end romantique
                ou une parenthèse de luxe, tout est réuni pour satisfaire vos sens.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleText}
          className="mt-4 text-sm font-tahoma font-normal"
        >
          {expanded ? 'FERMER' : 'LIRE PLUS'}
        </button>
      </div>
    </div>
  );
}
