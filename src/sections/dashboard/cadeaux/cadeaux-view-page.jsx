import React from "react";
import { Gift, Star } from "lucide-react";
import { TranslatedText } from "src/components/translated-text/translated-text";

export default function CadeauxViewPage() {
  const items = [
    {
      icon: Gift,
      title: <TranslatedText text="Cadeau d'anniversaire" />,
      description: <TranslatedText text="Offrez à vos clients un bon d'achat de 5€ le jour de leur anniversaire." />,
    },
    {
      icon: Star,
      title: <TranslatedText text="Récompense Avis Client" />,
      description: <TranslatedText text="10 points ajoutés à chaque avis déposé sur un produit ou service." />,
    },
  ];

  return (
    <div className="p-6">
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white border rounded-xl shadow-sm p-6 flex flex-col items-center text-center"
            >
              <Icon className="w-8 h-8 text-[#b6b499] mb-3" />
              <h3 className="text-md font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <button className="text-sm text-[#fffffd] border border-[#b6b499] bg-[#b6b499] px-4 py-1 rounded-md font-medium">
                <TranslatedText text="Automatique" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
