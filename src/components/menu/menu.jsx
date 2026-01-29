import React from "react";
import { IoMdClose,IoMdMenu } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useLayout } from "src/actions/layout";
import { Link } from "react-router-dom";
import { TranslatedText } from "src/components/translated-text/translated-text";

export default function Menu({ show, onClose }) {
  const { sidebar } = useLayout();

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
      {}
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

      {}
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed top-0 left-0 h-full bg-white w-96 z-50 "
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-4">
              <button className="text-black mb-4" onClick={onClose}>
                <IoMdClose size={28} />
              </button>

              <ul className="mt-8 space-y-0 text-base font-normal text-secondary font-tahoma">
                {sidebar && sidebar.length > 0 ? (
                  sidebar
                    .filter((item) => item.is_active)
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                      <motion.li
                        key={item.id}
                        variants={itemVariants}
                      >
                        <Link
                          to={item.url}
                          onClick={onClose} 
                          className="relative inline-block  hover:bg-[#B6B498] hover:text-white w-full p-2"
                        >
                          <TranslatedText text={item.title} />
                        </Link>
                      </motion.li>
                    ))
                ) : (
                  <li className="text-xl font-bold text-center">
                    <TranslatedText text="Aucun élément de menu disponible" />
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
