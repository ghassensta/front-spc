import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { CONFIG } from "src/config-global";

export default function ServiceCard({ details, avisTotals=0 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSection, setOpenSection] = useState(null); // 'general', 'utiles', 'partenaire'

  const toggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const roundedRating = Math.round(details?.avg_rating * 2) / 2;
  const DESCRIPTION_LIMIT = 300;
  const shouldTruncate = details?.description?.length > DESCRIPTION_LIMIT;
  const shortText = details?.description?.slice(0, DESCRIPTION_LIMIT) + "...";
  const fullText = details?.description;

  console.log("DETAILS =W",details)

  return (
    <div className="p-4 bg-white">
      {/* Header */}
      <div className="flex flex-col mb-4">
        <img src={details?.logo} alt="" className="max-w-24 mr-2" />
        <div>
          <h4 className="font-black text-5xl">{details?.nom}</h4>
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={18}
                fill={
                  i <= roundedRating
                    ? "#facc15"
                    : i - 0.5 === roundedRating
                    ? "#facc15"
                    : "none"
                }
                stroke="#facc15"
              />
            ))}
            <span className="text-sm text-gray-600 ml-2 font-roboto">
              ({avisTotals} avis)
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <motion.div layout transition={{ duration: 0.3, ease: "easeInOut" }}>
        <p className="leading-base text-2xl font-normal mb-2">
          {isExpanded || !shouldTruncate ? fullText : shortText}
        </p>
      </motion.div>

      <div className="flex w-full justify-center items-center">
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="font-roboto text-base font-bold text-gray-700 uppercase "
          >
            {isExpanded ? "Voir moins" : "Voir plus"}
          </button>
        )}
      </div>

      {/* Accordion Sections */}
      <div className="mt-6 flex flex-col gap-0 font-roboto">
        {/* Section Template */}
        {[
          {
            key: "general",
            title: "Inf. Générale",
            content: (
              <ul>
                <li className="mb-2">
                  <span className="font-bold">Adresse :</span>{" "}
                  {details?.adresse}
                </li>
                <li className="mb-2">
                  <span className="font-bold">Email :</span>{" "}
                  {details?.email || "Non renseigné"}
                </li>
                <li>
                  <span className="font-bold">Tél. :</span>{" "}
                  {details?.telephone || "Non renseigné"}
                </li>
              </ul>
            ),
          },
          {
            key: "utiles",
            title: "Inf. Utiles",
            content: (
              <p>
                <strong>Jours et Horaires d’ouverture :</strong>{" "}
                {details?.horaires_ouverture || "Non renseigné"}
              </p>
            ),
          },
          {
            key: "partenaire",
            title: "PORTRAIT DE L'EQUIPE",
            content: (
              <div className="flex border bg-white shadow-md rounded-xl flex-col gap-4">
                {details?.portrait_equipe?.map((person, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-center gap-4 p-1"
                  >
                    <img
                      src={
                        person.image
                          ? `${CONFIG.serverUrl}/storage/${person.image}`
                          : "/images/default-avatar.png"
                      }
                      alt={person.nom}
                      loading="lazy"
                      className="rounded-full w-20 h-20 object-cover"
                    />
                    <div>
                      <h6 className="text-2xl font-normal">{person.nom} <span className="text-base text-gray-500">
                        {person.poste}
                      </span></h6>
                      
                      {person.description && (
                        <p className="text-sm text-gray-600">
                          {person.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ),
          },
          {
            key: "marques",
            title: "Marques Partenaires",
            content: (
              <div className="flex flex-wrap gap-4">
                {details?.marques_partenaires?.length > 0 ? (
                  details.marques_partenaires.map((marque, index) => (
                    <div key={index} className="border p-2 rounded-md">
                      {marque.nom}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">Aucune marque partenaire</p>
                )}
              </div>
            ),
          },
        ].map((section) => (
          <motion.div
            key={section.key}
            layout
            className="border overflow-hidden"
          >
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full text-left text-base px-3 py-2 flex gap-3 items-center font-roboto"
            >
              {openSection === section.key ? (
                <Minus size={18} />
              ) : (
                <Plus size={18} />
              )}
              <span className="font-light uppercase">{section.title}</span>
            </button>
            <AnimatePresence initial={false}>
              {openSection === section.key && (
                <motion.div
                  key={section.key}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4 pt-2 text-lg font-normal"
                >
                  {section.content}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
