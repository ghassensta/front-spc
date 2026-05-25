import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { TranslatedText } from "src/components/translated-text/translated-text";

/**
 * ContactInfo — Bloc "Besoin d'un renseignement ?"
 *
 * Props :
 * @param {string} phone      - Numéro de téléphone (ex: "+33182350126")
 * @param {string} phoneLabel - Numéro affiché (ex: "+33 (0)1 82 35 01 26")
 * @param {string} email      - Adresse e-mail
 * @param {string} hours      - Horaires d'ouverture (optionnel)
 * @param {string} className  - Classes supplémentaires (optionnel)
 */
export default function ContactInfo({
  phone = "+33182350126",
  phoneLabel = "+33 (0)1 82 35 01 26",
  email = "contact@spa-prestige-collection.com",
  hours = "Notre équipe est à votre écoute du lundi au vendredi de 9h à 18h.",
  className = "",
}) {
  return (
    <div
      className={`mt-10 flex items-start gap-4 pt-8 border-t border-[#E8DCC8] ${className}`}
    >
      {/* Icône cercle */}
      <div className="shrink-0 w-11 h-11 rounded-full bg-[#F3EBDD] flex items-center justify-center">
        <FaPhone className="text-[#b8955a] text-base" />
      </div>

      <div>
        <p className="font-semibold text-gray-800 mb-0.5">
          <TranslatedText text="Besoin d'un renseignement ?" />
        </p>

        {hours && (
          <p className="text-sm text-gray-500 mb-2">
            <TranslatedText text={hours} />
          </p>
        )}

        <div className="flex flex-col gap-1.5">
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#b8955a] transition-colors"
          >
            <FaPhone className="text-[#b8955a] text-xs shrink-0" />
            {phoneLabel}
          </a>

          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#b8955a] transition-colors"
          >
            <FaEnvelope className="text-[#b8955a] text-xs shrink-0" />
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}