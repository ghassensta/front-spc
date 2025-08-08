import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import ButtonIcon from "../button-icon/button-icon";
import { FaBagShopping } from "react-icons/fa6";

export default function CardPrice() {
  return (
    <Link to="/spa/paris">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative rounded-xl shadow-lg mb-6 bg-white cursor-pointer hover:shadow-xl transition-all duration-300"
      >
        {/* Location badge */}
        <span className="bg-gray-200 flex items-center justify-start w-max py-2 px-4 gap-2 absolute left-4 -top-5 font-bold text-xs md:text-sm rounded-lg shadow">
          <FiMapPin className="text-secondary" />
          75011 PARIS - ÎLE-DE-FRANCE - FRANCE
        </span>

        {/* Image */}
        <img
          src="https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg"
          alt="spa"
          className="w-full h-72 rounded-t-xl object-cover overflow-hidden"
        />

        {/* Content */}
        <div className="p-6 space-y-2">
          <h5 className="text-xl md:text-2xl font-bold text-secondary">
            Le Spa by Sothys Paris République 5*
          </h5>
          <span className="text-lg md:text-lg font-bold">MASSAGE BALINAIS (85 min)</span>
          <p className="text-gray-600 text-sm leading-relaxed font-tahoma">
            Le Spa Sothys, niché au sein du Renaissance Paris République Hotel,
            incarne l’exclusivité et le raffinement des rituels de bien-être.
          </p>

          {/* Price and Button */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-secondary text-3xl font-extrabold">€120</span>
            <ButtonIcon title="Réserver" icon={<FaBagShopping className="text-lg" />} size="sm" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
