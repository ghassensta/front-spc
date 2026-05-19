import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { CONFIG } from "src/config-global";
import { TranslatedText } from "../translated-text/translated-text";
import defaultImage from "../../assets/default-image-avant-etablissment.png";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";

export default function SpaCard({
  to,
  image,
  title,
  description,
  location,
  remise_offres,
  prix_offres,
}) {
  const imgSrc = image ? `${CONFIG.serverUrl}/storage/${image}` : defaultImage;

  return (
    <Link to={to}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="cursor-pointer group rounded-2xl overflow-hidden"
        style={{
          
          border: "1px solid rgba(184,149,90,0.2)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}
      >
        {/* ── Image ── */}
        <div
          className="relative rounded-2xl overflow-hidden flex-shrink-0"
          style={{ height: "256px" }}
        >
          <img
            loading="lazy"
            src={imgSrc}
            alt={title || "Établissement"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            width="400"
            height="256"
          />

          {/* Adresse — haut gauche dans l'image */}
          {location && (
            <div className="absolute top-3 left-3">
              <span
                className="inline-flex items-center gap-1.5 text-white text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "rgba(2,1,0,0.72)",
                  
                  letterSpacing: "0.02em",
                }}
              >
                <FiMapPin size={11} className="shrink-0" />
                {location}
              </span>
            </div>
          )}

          {(remise_offres || prix_offres) && (
            <div className="absolute bottom-3 left-3">
              <span
                className="inline-block text-white text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: GOLD, }}
              >
                {remise_offres
                  ? `Jusqu'à ${remise_offres}% de remise`
                  : `À partir de ${parseFloat(prix_offres)} €`}
              </span>
            </div>
          )}
        </div>

        {/* ── Contenu texte ── */}
        <div className="flex flex-col pt-4 px-1" style={{ height: "160px" }}>
          {/* Séparateur doré */}
          <div className="w-8 h-0.5 mb-3" style={{ backgroundColor: GOLD }} />

          {/* Titre — gauche */}
          {title && (
            <h3
              className="text-left text-xl md:text-2xl px-2 line-clamp-1"
              
            >
              {title}
            </h3>
          )}

          {/* Description — gauche */}
          {description && (
            <p
              className="font-normal text-left text-lg px-2 line-clamp-2"
              style={{
                
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </p>
          )}

          <button
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 m-3"
            style={{
              backgroundColor: "#f3ebdd",
              color: "#5a4a35",
              
              letterSpacing: "0.08em",
              border: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = GOLD;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f3ebdd";
              e.currentTarget.style.color = "#5a4a35";
            }}
          >
            <TranslatedText text="Découvrir l'établissement" />
            <FaArrowRight className="text-xs" />
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
