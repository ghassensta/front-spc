import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategoryPuce({ slug, icon = null, name = "" }) {
  return (
    <motion.div whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 300 }}>
      <Link
        to={slug ? `/categories/${slug}` : "#"}
        className="group flex flex-col items-center gap-1.5 py-2 px-3 rounded-full hover:bg-beige/30 transition-all duration-300"
      >
        {icon && (
          <img
            loading="lazy"
            src={icon}
            alt={name}
            className="w-9 h-9 md:w-12 md:h-7 object-contain"
          />
        )}
        <span className="text-black text-[10px] md:text-[10px] font-tahoma uppercase tracking-wider leading-none text-center">
          {name}
        </span>
        <motion.span className="h-0.5 bg-primary w-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-1" />
      </Link>
    </motion.div>
  );
}