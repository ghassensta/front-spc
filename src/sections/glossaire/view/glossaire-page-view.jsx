// GlossairePageView.jsx
import React, { useState } from "react";
import GlossaireItem from "../glossaire-item";

export default function GlossairePageView() {
  const [openIndex, setOpenIndex] = useState(null);

  const glossaryData = [
    {
      letter: "A",
      terms: [
        { keyword: "Aromathérapie", description: "Utilisation des huiles essentielles à des fins thérapeutiques." },
        { keyword: "Ayurveda", description: "Médecine traditionnelle indienne axée sur l'équilibre du corps et de l'esprit." }
      ]
    },
    {
      letter: "B",
      terms: [
        { keyword: "Balnéothérapie", description: "Utilisation de bains pour des bienfaits thérapeutiques." },
        { keyword: "Body Wrap", description: "Enveloppement corporel pour nourrir et hydrater la peau." }
      ]
    },
    {
      letter: "C",
      terms: [
        { keyword: "Cryothérapie", description: "Technique de traitement par le froid." },
        { keyword: "Chromo-thérapie", description: "Utilisation des couleurs pour rétablir l'équilibre énergétique." }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h6 className="text-5xl text-center mb-10">GLOSSAIRE</h6>

      <div className="flex flex-col divide-y font-bricolage">
        {glossaryData.map((group, index) => (
          <GlossaireItem
            key={index}
            letter={group.letter}
            data={group.terms}
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          />
        ))}
      </div>
    </div>
  );
}