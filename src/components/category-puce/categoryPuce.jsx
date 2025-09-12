import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategoryPuce({ slug = "#", icon = null, name = "" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        to={`/categories/${slug}`}
        className="group inline-block rounded-full min-w-24 bg-[#B6B499] px-2 py-1"
      >
        <div className="flex items-center gap-2 text-center text-white relative">
          {icon && (
            <span className="rounded-full p-0">
              <img src={icon} alt={name} className="w-8 h-8 object-contain" />
            </span>
          )}
          <div className="relative">
            <span className="text-white text-lg">{name}</span>
            {/* Underline animation */}
            <motion.span
              className="block h-0.5 bg-primary absolute left-0 -bottom-1 origin-left scale-x-0 group-hover:scale-x-100"
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
