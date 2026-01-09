import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "src/context/translation-context";

export default function CategoryPuce({ slug, icon = null, name = "" }) {
  const { translateSync } = useTranslation();

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        to={slug ? `/categories/${slug}` : "#"}
        className="group flex flex-col items-center gap-1.5 md:py-2 md:px-3 rounded-full hover:bg-[#f6f5e9]/30 transition-all duration-300"
      >
        {icon && (
          <img
            loading="lazy"
            src={icon}
            alt={translateSync(name)}  
            className="w-9 h-9 md:w-12 md:h-7 object-contain"
          />
        )}

        <span className="text-black text-[10px] md:text-[10px] font-tahoma uppercase tracking-wider leading-none text-center">
          {translateSync(name)}       
        </span>

        <motion.span
          className="h-0.5 bg-primary w-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-1"
        />
      </Link>
    </motion.div>
  );
}
