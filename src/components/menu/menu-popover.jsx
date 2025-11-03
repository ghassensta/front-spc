import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLayout } from "src/actions/layout";
import { Link } from "react-router-dom";
import exclusive from "../../assets/SPC-logo-exclusivite-gris.svg"

export default function MenuPopover({ anchorRef, open, onClose }) {
  const menuRef = useRef(null);
  const { sidebar } = useLayout();

  // ✅ close when clicking outside (popover or button)
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
          className="absolute z-50 bg-white shadow-xl border border-gray-200 w-80"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 4 }}
          exit={{ opacity: 0, y: -8 }}
          style={popoverPosition}
        >
          <ul className="text-lg text-secondary font-tahoma shadow-md shadow-[#787878]">
            {sidebar && sidebar.length ? (
              sidebar
                .filter((item) => item.is_active)
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.url}
                      onClick={() => {
                        onClose(); // ✅ closes popover BEFORE navigation
                      }}
                      className="block px-6 py-[5px] hover:bg-[#B6B498] hover:text-white"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))
            ) : (
              <li className="text-center text-xs">Aucun élément de menu</li>
            )}
            <li><img className="mx-auto w-20 py-6" src={exclusive}/></li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
