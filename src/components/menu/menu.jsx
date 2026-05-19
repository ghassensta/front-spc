import React from "react";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useLayout } from "src/actions/layout";
import { Link } from "react-router-dom";
import {
  FaHome, FaMapMarkerAlt, FaGift, FaWallet,
  FaUsers, FaStar, FaNewspaper, FaUser,
  FaInfoCircle, FaEnvelope, FaHeart, FaBook,
  FaSpa, FaPhone, FaCalendarAlt, FaBriefcase,
  FaShoppingBag, FaTrophy, FaHandshake, FaLeaf,
  FaHeadset,
} from "react-icons/fa";
import logoMenu from "../../assets/SPC-logo-base.svg";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "src/context/translation-context";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";

// Fallback icône par titre ou URL si item.icon est vide
const getIcon = (item) => {
  if (item.icon && iconMap[item.icon]) return iconMap[item.icon];
  const title = (item.title || "").toLowerCase();
  if (title.includes("accueil"))                       return <FaHome />;
  if (title.includes("établissement") || title.includes("spa") || title.includes("adresse")) return <FaMapMarkerAlt />;
  if (title.includes("carte cadeau") || title.includes("cadeau")) return <FaGift />;
  if (title.includes("cagnotte"))                      return <FaWallet />;
  if (title.includes("parrainage"))                    return <FaUsers />;
  if (title.includes("fidélité") || title.includes("fidelite") || title.includes("récompense")) return <FaStar />;
  if (title.includes("actualité") || title.includes("actualite")) return <FaNewspaper />;
  if (title.includes("compte") || title.includes("profil"))       return <FaUser />;
  if (title.includes("contact") || title.includes("aide"))        return <FaHeadset />;
  if (title.includes("partenaire"))                    return <FaHandshake />;
  if (title.includes("référentiel") || title.includes("referentiel")) return <FaBook />;
  if (title.includes("collection"))                    return <FaSpa />;
  if (title.includes("qui sommes"))                    return <FaInfoCircle />;
  const url = (item.url || "").toLowerCase();
  if (url.includes("cadeau"))    return <FaGift />;
  if (url.includes("cagnotte"))  return <FaWallet />;
  if (url.includes("parrainage"))return <FaUsers />;
  if (url.includes("fidelite") || url.includes("recompense")) return <FaStar />;
  if (url.includes("actualite") || url.includes("news"))      return <FaNewspaper />;
  if (url.includes("compte") || url.includes("profil"))       return <FaUser />;
  if (url.includes("contact") || url.includes("aide"))        return <FaHeadset />;
  if (url.includes("spa") || url.includes("etablissement"))   return <FaMapMarkerAlt />;
  return <FaHome />;
};

const iconMap = {
  "fa-home":           <FaHome />,
  "fa-map-marker":     <FaMapMarkerAlt />,
  "fa-map-marker-alt": <FaMapMarkerAlt />,
  "fa-gift":           <FaGift />,
  "fa-wallet":         <FaWallet />,
  "fa-users":          <FaUsers />,
  "fa-star":           <FaStar />,
  "fa-newspaper":      <FaNewspaper />,
  "fa-user":           <FaUser />,
  "fa-info-circle":    <FaInfoCircle />,
  "fa-envelope":       <FaEnvelope />,
  "fa-heart":          <FaHeart />,
  "fa-book":           <FaBook />,
  "fa-spa":            <FaSpa />,
  "fa-phone":          <FaPhone />,
  "fa-calendar":       <FaCalendarAlt />,
  "fa-briefcase":      <FaBriefcase />,
  "fa-shopping-bag":   <FaShoppingBag />,
  "fa-trophy":         <FaTrophy />,
  "fa-handshake":      <FaHandshake />,
  "fa-leaf":           <FaLeaf />,
  "fa-headset":        <FaHeadset />,
};

// Détermine le groupe d'un item selon son URL
const getGroup = (item) => {
  // Si la BDD fournit un champ section/group, on l'utilise en priorité
  if (item.section) return item.section;
  if (item.group)   return item.group;

  const url = item.url || "";
  const monEspace = ["/compte", "/mon-compte", "/profil", "/auth", "/login", "/register", "/dashboard"];
  const infos     = ["/contact", "/aide", "/assistance", "/faq", "/mentions", "/conditions", "/cgv"];

  if (monEspace.some((p) => url.includes(p))) return "MON ESPACE";
  if (infos.some((p) => url.includes(p)))     return "INFORMATIONS";
  return "DÉCOUVRIR";
};

// Ordre d'affichage des sections
const SECTION_ORDER = ["DÉCOUVRIR", "MON ESPACE", "INFORMATIONS"];

const menuVariants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 20, staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: { x: "-100%", transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function Menu({ show, onClose }) {
  const { sidebar } = useLayout();
  const { translateSync } = useTranslation();

  // Grouper les items par section
  const grouped = {};
  SECTION_ORDER.forEach((s) => { grouped[s] = []; });

  if (sidebar && sidebar.length > 0) {
    sidebar
      .filter((item) => item.is_active)
      .sort((a, b) => a.order - b.order)
      .forEach((item) => {
        const group = getGroup(item);
        if (!grouped[group]) grouped[group] = [];
        grouped[group].push(item);
      });
  }

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed top-0 left-0 h-full w-72 z-50 flex flex-col shadow-xl"
            style={{ backgroundColor: "#FBF6EC", fontFamily: FONT }}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 border-b"
              style={{ borderColor: "#e8e0d4" }}
            >
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                <IoMdClose size={22} />
              </button>
              <span
                className="text-base font-semibold text-gray-700"
                style={{ fontFamily: FONT }}
              >
                <TranslatedText text="Menu" />
              </span>
            </div>

            {/* Items groupés */}
            <div className="flex-1 overflow-y-auto py-2">
              {SECTION_ORDER.map((groupName) => {
                const items = grouped[groupName] || [];
                if (items.length === 0) return null;
                return (
                  <div key={groupName} className="mb-1">

                    {/* Label section */}
                    <p
                      className="px-5 pt-4 pb-1 text-xs font-semibold uppercase tracking-widest"
                      style={{ color: GOLD, letterSpacing: "0.15em", fontFamily: FONT }}
                    >
                      {groupName}
                    </p>

                    {/* Items */}
                    {items.map((item) => (
                      <motion.div key={item.id} variants={itemVariants}>
                        <Link
                          to={item.url}
                          onClick={onClose}
                          className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                          style={{ fontFamily: FONT }}
                        >
                          <span
                            className="text-base shrink-0 w-5 flex justify-center"
                            style={{ color: GOLD }}
                          >
                            {getIcon(item)}
                          </span>
                          <TranslatedText text={item.title} />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                );
              })}

              {/* Fallback si aucun item */}
              {Object.values(grouped).every((g) => g.length === 0) && (
                <p className="text-center text-sm py-4 text-gray-400">
                  <TranslatedText text="Aucun élément de menu disponible" />
                </p>
              )}
            </div>

            {/* Logo bas */}
            <div
              className="px-5 py-5 border-t flex justify-center"
              style={{ borderColor: "#e8e0d4" }}
            >
              <img
                src={logoMenu}
                alt={translateSync("Spa & Prestige Collection")}
                className="w-24 opacity-60"
              />
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}