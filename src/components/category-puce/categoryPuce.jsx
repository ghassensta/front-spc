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
        className="group w-full inline-block rounded-full min-w-24  pr-6 pl-1  duration-300 "
      >
        <div className="flex items-center gap-1 text-center text-black relative">
          {icon && (
            <span className="rounded-full p-0">
              <img lazyload="lazy" src={icon} alt={name} className="w-8 h-8 object-contain" />
            </span>
          )}
          <div className="relative flex-1">
            <span className="text-black text-sm text-left md:text-center font-tahoma uppercase">{name}</span>
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
