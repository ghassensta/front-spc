import React from "react";
import { motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ButtonIcon from "../button-icon/button-icon"; // Optional for type "price"

export default function Card({
  type = "large", // 'large', 'news', or 'price'
  to = "/",
  image,
  title,
  description,
  location,
  date,
  price,
  prestation,
}) {
  return (
    <Link to={to}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative  mb-6 cursor-pointer transition-all duration-300"
      >
        {/* Location badge */}
        {(type === "large" || type === "price") && location && (
          <span className="bg-[#020100C9] text-white font-tahoma uppercase flex items-center justify-start w-max py-3 px-6 gap-2 absolute left-4 -top-1 font-medium text-xs tracking-[2px]">
            <FiMapPin className="text-white" />
            {location}
          </span>
        )}

        {/* Image */}
        {image && (
          <img
            src={image}
            alt="spa"
            className="w-full h-72 rounded-none object-cover overflow-hidden"
          />
        )}

        {/* Content */}
        <div className={`p-2 ${type === "news" ? "p-3" : ""} space-y-1`}>
          <h5 className={`font-bold text-center ${type === "news" || type === "price" ? "text-secondary" : "text-gray-800"} text-xl md:text-2xl`}>
            {title}
          </h5>

          {prestation && (
            <span className="text-lg md:text-lg font-bold m-0">{prestation}</span>
          )}

          <p className="text-gray-800 text-center text-sm md:text-base leading-relaxed font-tahoma m-0">
            {description}
          </p>

          {/* News Date */}
          {type === "news" && date && (
            <div className="mt-4 text-xs text-gray-500 font-medium font-tahoma">
              Publié le : <span className="font-semibold">{date}</span>
            </div>
          )}

          {/* Price with button */}
          {type === "price" && (
            <div className="mt-4 flex items-center justify-between">
              <span className="text-secondary text-3xl font-extrabold">
                €{price}
              </span>
              <ButtonIcon
                title="Réserver"
                icon={<FaBagShopping className="text-lg" />}
                size="lg"
              />
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
