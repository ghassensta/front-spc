import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import theImage from "src/assets/images/SPC-Essence-1975x1318-02_(1).jpg";

export default function CardNews() {
  // Example: hardcoded date - you can make this dynamic if needed
  const postingDate = new Date("2025-04-20").toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link to="/spa/paris">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative rounded-xl shadow-lg mb-6 bg-white cursor-pointer hover:shadow-xl transition-all duration-300"
      >
       
        {}
        <img loading="lazy"
          src={theImage}
          alt="spa"
          className="w-full h-72 rounded-t-xl object-cover overflow-hidden"
        />

        {}
        <div className="p-3 space-y-2">
          <h5 className="text-xl md:text-2xl font-bold text-secondary">
            Le Spa by Sothys Paris République 5*
          </h5>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Le Spa Sothys, niché au sein du Renaissance Paris République Hotel,
            incarne l’exclusivité et le raffinement des rituels de bien-être.
          </p>

          {}
          <div className="mt-4 text-sm text-gray-500 font-bold">
            Publié le : <span className="font-semibold">{postingDate}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
