import React from "react";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

export default function Menu({ show, onClose }) {
  const items = [
    "Accueil",
    "Offrir une carte cadeau",
    "Mon Compte / Commandes",
    "Favoris",
    "Avantages : Parrainage, fidélité, communauté privée",
    "Actualités",
    "Book Collection Prestige",
    "Aide et Contact",
  ];

  const menuVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      x: "-100%",
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Side Menu */}
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed top-0 left-0 h-full bg-white w-96 z-50"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-4">
              <button className="text-black mb-4" onClick={onClose}>
                <IoMdClose size={28} />
              </button>

              <ul className="mt-8 space-y-6 text-center text-secondary">
                {items.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="text-xl font-bold"
                  >
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                      className="relative inline-block after:block after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
