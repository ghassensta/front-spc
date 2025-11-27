import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Minus, Plus } from "lucide-react";
import { CONFIG } from "src/config-global";
import defaultAvatar from "../../../assets/default-avatar.png";
import { Link } from "react-router-dom";

export default function ServiceCard({
  details,
  avisTotals = 0,
  marquesPartenaires,
}) {
  console.log(details);
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  // Helpers
  const notEmpty = (val) =>
    val !== null && val !== undefined && String(val).trim() !== "";

  const roundedRating = Math.round((details?.avg_rating || 0) * 2) / 2;
  const DESCRIPTION_LIMIT = 300;
  const fullText = details?.description || "";
  const shouldTruncate = fullText.length > DESCRIPTION_LIMIT;
  const shortText = fullText.slice(0, DESCRIPTION_LIMIT) + "...";

  // Sections config
  const sections = [];

  if (
    notEmpty(details?.adresse) ||
    notEmpty(details?.email) ||
    notEmpty(details?.telephone)
  ) {
    sections.push({
      key: "general",
      title: "Informations Générale",
      content: (
        <ul>
          {notEmpty(details?.avant_adresse) && (
            <li className="mb-2">
              <span className="font-bold">Adresse :</span> {details.avant_adresse}
            </li>
          )}
          {notEmpty(details?.email) && (
            <li className="mb-2">
              <span className="font-bold">Email :</span> {details.email}
            </li>
          )}
          {notEmpty(details?.telephone) && (
            <li>
              <span className="font-bold">Tél. :</span> {details.telephone}
            </li>
          )}
        </ul>
      ),
    });
  }

  if (notEmpty(details?.horaires_ouverture)) {
    sections.push({
      key: "utiles",
      title: "Informations Utiles",
      content: (
        <p>
          <strong>Jours et Horaires d’ouverture :</strong>{" "}
          {details.horaires_ouverture}
        </p>
      ),
    });
  }

  if (
    Array.isArray(details?.portrait_equipe) &&
    details.portrait_equipe.length > 0
  ) {
    sections.push({
      key: "partenaire",
      title: "PORTRAIT DE L'EQUIPE",
      content: (
        <div className="flex border bg-white shadow-md rounded-xl flex-col gap-4">
          {details.portrait_equipe.map((person, index) => (
            <div
              key={index}
              className="flex justify-start items-center gap-4 p-1"
            >
              <img
                lazyload="lazy"
                src={
                  person?.image
                    ? `${CONFIG.serverUrl}/storage/${person.image}`
                    : defaultAvatar
                }
                alt={person.nom}
                loading="lazy"
                className="rounded-full w-20 h-20 object-cover"
              />
              <div>
                <h6 className="text-2xl font-normal">
                  {person.nom}{" "}
                  <span className="text-base text-gray-500">
                    {person.poste}
                  </span>
                </h6>
                {notEmpty(person.description) && (
                  <p className="text-sm text-gray-600">{person.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ),
    });
  }

  if (Array.isArray(marquesPartenaires) && marquesPartenaires.length > 0) {
    sections.push({
      key: "marques",
      title: "Marques Partenaires",
      content: (
        <div className="flex flex-wrap">
          {marquesPartenaires.map((marque, index) => (
            <div key={index} className="text-sm text-secondary mr-1">
              {marque.name}
              {index < marquesPartenaires.length - 1 && ","}
            </div>
          ))}
        </div>
      ),
    });
  }

  return (
    <div className="p-4 bg-white">
      {/* Header */}
      <div className="flex flex-col mb-4">
        { !!details?.remise_offres && <span className="bg-[#B6B499] w-max mb-2 text-black font-bold font-roboto px-2 py-1 rounded-2xl">Jusqu'à {details.remise_offres}% de remise</span>}
        {notEmpty(details?.logo) && (
          <img
            lazyload="lazy"
            src={
              details.logo
                ? `${CONFIG.serverUrl}/storage/${details.logo}`
                : "/images/default-avatar.png"
            }
            alt=""
            className="max-w-[150px] mr-2"
          />
        )}
        <div>
          <h1 className="font-black text-5xl">{details?.nom}</h1>
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
            <a href="#avis" className="text-sm text-gray-600 ml-2 font-roboto">
              ({avisTotals} avis)
            </a>
          </div>
        </div>
      </div>

      {/* Description */}
      {notEmpty(fullText) && (
        <>
          <motion.div layout transition={{ duration: 0.3, ease: "easeInOut" }}>
            <p className="leading-base text-2xl font-normal mb-2">
              {isExpanded || !shouldTruncate ? fullText : shortText}
            </p>
          </motion.div>

          {shouldTruncate && (
            <div className="flex w-full justify-center items-center">
              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                className="font-roboto text-base font-bold text-gray-700 uppercase"
              >
                {isExpanded ? "Voir moins" : "Voir plus"}
              </button>
            </div>
          )}
        </>
      )}

      {/* Accordion Sections */}
      {sections.length > 0 && (
        <div className="mt-6 flex flex-col gap-0 font-roboto">
          {sections.map((section) => (
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
                <span className="font-[400] uppercase">{section.title}</span>
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
      )}
    </div>
  );
}
