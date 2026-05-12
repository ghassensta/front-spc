import React from "react";
import { FaShieldAlt, FaEnvelopeOpenText, FaRegStar } from "react-icons/fa";
import { useTranslation } from "src/context/translation-context";

const GOLD = "#b8955a";
const BG_CIRCLE = "#F3EBDD";
const FONT = "Calibri, 'Segoe UI', sans-serif";

const TrustBar = () => {
  const { translateSync } = useTranslation();

  const trustItems = [
    {
      icon: <FaShieldAlt />,
      title: "Paiement sécurisé",
      desc: "Vos transactions sont 100 % sécurisées",
    },
    {
      icon: <FaEnvelopeOpenText />,
      title: "Envoi immédiat",
      desc: "Recevez votre carte cadeau directement par email",
    },
    {
      icon: <FaRegStar />,
      title: "Adresses sélectionnées",
      desc: "Des établissements de confiance, choisis avec soin",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-2 py-6">
      <div 
        className="grid grid-cols-3 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white"
        style={{ fontFamily: FONT }}
      >
        {trustItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-4 p-3 md:p-6 ${
              index !== trustItems.length - 1 ? "border-r border-gray-100" : ""
            }`}
          >
            {/* Icône avec cercle beige - Taille réduite sur mobile */}
            <div
              className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: BG_CIRCLE }}
            >
              <span 
                style={{ color: GOLD }} 
                className="text-base md:text-2xl"
              >
                {item.icon}
              </span>
            </div>

            {/* Texte - Taille ajustée pour mobile */}
            <div className="flex flex-col overflow-hidden">
              <h4 className="text-[10px] md:text-sm font-bold text-gray-800 leading-tight truncate sm:whitespace-normal">
                {translateSync(item.title)}
              </h4>
              <p className="hidden md:block text-xs text-gray-500 mt-1 leading-snug">
                {translateSync(item.desc)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;