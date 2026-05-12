import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLayout } from "src/actions/layout";
import { Link, useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
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

const getGroup = (item) => {
  if (item.section) return item.section;
  if (item.group)   return item.group;
  const url = item.url || "";
  const monEspace = ["/compte", "/mon-compte", "/profil", "/auth", "/login", "/register", "/dashboard"];
  const infos     = ["/contact", "/aide", "/assistance", "/faq", "/mentions", "/conditions", "/cgv"];
  if (monEspace.some((p) => url.includes(p))) return "MON ESPACE";
  if (infos.some((p) => url.includes(p)))     return "INFORMATIONS";
  return "DÉCOUVRIR";
};

const SECTION_ORDER = ["DÉCOUVRIR", "MON ESPACE", "INFORMATIONS"];

export default function MenuPopover({ anchorRef, open, onClose }) {
  const menuRef = useRef(null);
  const location = useLocation();
  const { sidebar } = useLayout();
  const { translateSync } = useTranslation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handler = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [anchorRef, onClose]);

  const popoverPosition = anchorRef.current
    ? { top: anchorRef.current.offsetTop + anchorRef.current.offsetHeight, left: 0 }
    : {};

  // Grouper les items
  const grouped = {};
  SECTION_ORDER.forEach((s) => { grouped[s] = []; });
  if (sidebar && sidebar.length) {
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
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          className="absolute z-50 shadow-xl border md:w-72 ml-6 rounded-xl overflow-hidden"
          style={{ backgroundColor: "#FBF6EC", borderColor: "#e8e0d4", fontFamily: FONT, ...popoverPosition }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 4 }}
          exit={{ opacity: 0, y: -8 }}
        >
          {/* Header */}
          <div
            className="px-5 py-3 border-b flex items-center gap-3"
            style={{ borderColor: "#e8e0d4" }}
          >
            <IoMdClose
              onClick={onClose}
              size={20}
              className="cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
            />
            <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: FONT }}>
              <TranslatedText text="Menu" />
            </span>
          </div>

          {/* Items groupés */}
          <div className="py-2 max-h-[70vh] overflow-y-auto">
            {SECTION_ORDER.map((groupName) => {
              const items = grouped[groupName] || [];
              if (items.length === 0) return null;
              return (
                <div key={groupName} className="mb-1">
                  {/* Label section */}
                  <p
                    className="px-5 pt-3 pb-1 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: GOLD, letterSpacing: "0.15em", fontFamily: FONT }}
                  >
                    {groupName}
                  </p>

                  {/* Items */}
                  {items.map((item) => (
                    <li key={item.id} className="list-none">
                      <Link
                        to={item.url}
                        onClick={onClose}
                        className="px-5 py-2.5 flex items-center gap-3 hover:bg-white/60 transition-colors text-sm"
                        style={{
                          fontFamily: FONT,
                          color: isActive(item.url) ? GOLD : "#374151",
                          fontWeight: isActive(item.url) ? 600 : 400,
                        }}
                      >
                        <span className="text-base shrink-0 w-5 flex justify-center" style={{ color: GOLD }}>
                          {getIcon(item)}
                        </span>
                        <TranslatedText text={item.title} />
                      </Link>
                    </li>
                  ))}
                </div>
              );
            })}

            {Object.values(grouped).every((g) => g.length === 0) && (
              <li className="text-center text-xs py-4 text-gray-400 list-none">
                <TranslatedText text="Aucun élément de menu" />
              </li>
            )}
          </div>

          {/* Logo bas */}
          <div className="px-5 py-4 border-t flex justify-start" style={{ borderColor: "#e8e0d4" }}>
            <img
              className="w-16 opacity-60"
              src={logoMenu}
              alt={translateSync("Collection Prestige")}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}