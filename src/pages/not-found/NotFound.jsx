import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import SeoHead from "src/components/seo/SeoHead";
import ButtonLink from "src/components/button-link/ButtonLink";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { paths } from "src/router/paths";

const GOLD = "#b8955a";
const CREAM = "#F9E6D0";
const BEIGE_SOFT = "#FBF6EE";
const TEXT_FONT = "Calibri, 'Segoe UI', sans-serif";
const SERIF_FONT = "'Cormorant Garamond', 'Georgia', serif";

export default function NotFound() {
  const location = useLocation();

  return (
    <>
      <SeoHead
        title="Page introuvable"
        description="La page que vous recherchez n'existe pas ou a été déplacée. Revenez à l'accueil de Spa & Prestige Collection pour découvrir nos spas d'exception."
        canonical={location.pathname}
        noindex
      />

      <section
        className="relative w-full overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 md:py-28"
        style={{
          minHeight: "calc(100vh - 200px)",
          background: `linear-gradient(180deg, #ffffff 0%, ${BEIGE_SOFT} 55%, #ffffff 100%)`,
        }}
      >
        {/* ── Décors flottants ── */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: CREAM, opacity: 0.55 }}
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: CREAM, opacity: 0.45 }}
          animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 right-1/4 w-3 h-3 rounded-full"
          style={{ backgroundColor: GOLD, opacity: 0.7 }}
          animate={{ y: [0, -18, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full"
          style={{ backgroundColor: GOLD, opacity: 0.6 }}
          animate={{ y: [0, 14, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* ── Contenu central ── */}
        <div className="relative z-10 w-full max-w-3xl mx-auto text-center">

          {/* "404" géant en arrière-plan */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <span
              className="select-none leading-none"
              style={{
                fontFamily: SERIF_FONT,
                fontWeight: 400,
                fontSize: "clamp(9rem, 26vw, 18rem)",
                background: `linear-gradient(180deg, ${CREAM} 0%, ${GOLD} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}
            >
              404
            </span>
          </motion.div>

          {/* Label doré */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs uppercase mb-3 -mt-4"
            style={{
              color: GOLD,
              letterSpacing: "0.25em",
              fontFamily: TEXT_FONT,
            }}
          >
            <TranslatedText text="Erreur 404" />
          </motion.p>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-gray-900 leading-tight mb-4"
            style={{
              fontFamily: SERIF_FONT,
              fontWeight: 400,
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
            }}
          >
            <TranslatedText text="Cette page s'est égarée" />
          </motion.h1>

          {/* Séparateur doré */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mb-6"
            style={{
              width: "60px",
              height: "2px",
              background: GOLD,
              transformOrigin: "center",
            }}
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-gray-600 leading-relaxed max-w-xl mx-auto mb-2"
            style={{
              fontFamily: TEXT_FONT,
              fontSize: "1rem",
            }}
          >
            <TranslatedText
              text="Le chemin que vous suivez ne mène à aucune adresse de notre collection."
            />
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="text-gray-500 leading-relaxed max-w-xl mx-auto"
            style={{
              fontFamily: TEXT_FONT,
              fontSize: "0.95rem",
            }}
          >
            <TranslatedText
              text="Laissez-vous guider vers nos établissements de prestige."
            />
          </motion.p>

          {/* CTA principal */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <ButtonLink
              to={paths.main}
              text="Retour à l'accueil"
              variant="primary"
              icon={<FiArrowLeft size={16} />}
              iconPosition="before"
            />
          </motion.div>

          {/* Liens secondaires */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            <Link
              to={paths.spa.list}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest transition-colors duration-300 hover:text-[#b8955a]"
              style={{
                color: "#444",
                fontFamily: TEXT_FONT,
                letterSpacing: "0.18em",
              }}
            >
              <FiSearch size={14} />
              <TranslatedText text="Découvrir nos spas" />
            </Link>
            <span aria-hidden="true" className="hidden sm:inline-block w-px h-3 bg-gray-300" />
            <Link
              to={paths.contact}
              className="text-sm uppercase tracking-widest transition-colors duration-300 hover:text-[#b8955a]"
              style={{
                color: "#444",
                fontFamily: TEXT_FONT,
                letterSpacing: "0.18em",
              }}
            >
              <TranslatedText text="Nous contacter" />
            </Link>
          </motion.div>

        </div>
      </section>
    </>
  );
}
