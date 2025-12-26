import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLayout } from "src/actions/layout";
import { Link, useLocation } from "react-router-dom";
import { Gift, Menu as MenuIcon } from "lucide-react";
import exclusive from "../../assets/SPC-logo-exclusivite-gris.svg"
import { IoMdClose } from "react-icons/io";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "src/context/translation-context";

export default function MenuPopover({ anchorRef, open, onClose }) {
  const menuRef = useRef(null);
  const location = useLocation();
  const { sidebar } = useLayout();
  const { translateSync } = useTranslation();

  const isActive = (path) => {
    return location.pathname === path;
  };

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
    ? {
        top: anchorRef.current.offsetTop + anchorRef.current.offsetHeight,
        left: 0,
      }
    : {};

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          className="absolute z-50 bg-white shadow-xl border border-gray-200 md:w-80 ml-6 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 4 }}
          exit={{ opacity: 0, y: -8 }}
          style={popoverPosition}
        >
          <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex items-center gap-3">
            <IoMdClose onClick={() => onClose()} size={22} className="text-secondary" />
            <span className="text-lg font-tahoma font-semibold text-secondary">
              <TranslatedText text="Menu" />
            </span>
          </div>
          <ul className="text-lg text-secondary font-tahoma">
            {sidebar && sidebar.length ? (
              sidebar
                .filter((item) => item.is_active)
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.url}
                      onClick={() => {
                        onClose();
                      }}
                      className={`px-6 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                        isActive(item.url) ? 'font-bold ' : ''
                      }`}
                    >
                      <span>
                        <TranslatedText text={item.title} />
                      </span>
                      {item.title === "Offrir une carte cadeau" && (
                        <Gift size={20} className="flex-shrink-0 ml-2" />
                      )}
                    </Link>
                  </li>
                ))
            ) : (
              <li className="text-center text-xs py-4">
                <TranslatedText text="Aucun élément de menu" />
              </li>
            )}
            <li>
              <img
                className="mx-6 w-20 py-6"
                src={exclusive}
                alt={translateSync("Collection Prestige")}
              />
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
