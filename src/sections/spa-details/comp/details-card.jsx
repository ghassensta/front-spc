import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { API_URL_base } from "src/api/data";

export default function ServiceCard({ details }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSection, setOpenSection] = useState(null); // 'general', 'utiles', 'partenaire'

  const toggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const roundedRating = Math.round(details.avgRating * 2) / 2;
  const DESCRIPTION_LIMIT = 200;
  const shouldTruncate = details?.description?.length > DESCRIPTION_LIMIT;
  const shortText = details?.description?.slice(0, DESCRIPTION_LIMIT) + "...";
  const fullText = details?.description;

  return (
    <div className="border rounded-sm p-4 shadow-sm hover:shadow-md transition duration-200 bg-white">
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
            <span className="text-sm text-gray-600 ml-2">
              ({parseFloat(details?.avgRating)?.toFixed(1)})
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

      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="font-roboto text-sm text-blue-600 hover:underline"
        >
          {isExpanded ? "Voir moins" : "Voir plus"}
        </button>
      )}

      {/* Accordion Sections */}
      <div className="mt-6 flex flex-col gap-4 font-roboto">
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
                {details?.horaires || "Non renseigné"}
              </p>
            ),
          },
          {
            key: "partenaire",
            title: "Marque(s) Partenaire(s)",
            content: (
              <div className="flex flex-col gap-4">
                {details.portrait_equipe?.map((person, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-center gap-4"
                  >
                    <img
                      src={
                        person.image
                          ? `${API_URL_base}/storage/${person.image}`
                          : "/images/default-avatar.png"
                      }
                      alt={person.nom} loading="lazy"
                      className="rounded-full w-20 h-20 object-cover"
                    />
                    <div>
                      <h6 className="text-2xl font-bold">{person.nom}</h6>
                      <span className="block text-gray-500">
                        {person.poste}
                      </span>
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
        ].map((section) => (
          <motion.div
            key={section.key}
            layout
            className="border rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full text-left px-4 py-3 flex justify-between items-center bg-gray-100"
            >
              <span className="font-semibold text-base">{section.title}</span>
              {openSection === section.key ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
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
