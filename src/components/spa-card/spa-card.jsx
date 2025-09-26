import React from "react";
import { Link } from "react-router-dom";
import ButtonIcon from "../button-icon/button-icon";
import { motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { CONFIG } from "src/config-global";

export default function SpaCard({ to, image, title, description, location }) {
  const renderLocation = () => {
    if (!location) return null;
    return (
      <span className="bg-[#020100C9] text-white font-tahoma uppercase flex items-center justify-start w-max py-3 px-6 gap-2 absolute left-1/2 -translate-x-1/2 -top-1 font-medium text-xs tracking-[2px] max-w-[90%] -mr-6">
        <FiMapPin className="text-white" />
        {location}
      </span>
    );
  };

  const renderImage = () => {
    if (!image) return null;
    return (
      <img lazyload="lazy"
        src={CONFIG.serverUrl+'/storage/'+image}
        alt={title}
        className="w-full h-72 rounded-3xl object-cover overflow-hidden"
      />
    );
  };

  const renderTitle = () => {
    if (!title) return null;
    return (
      <h3 className="text-lg font-bold font-tahoma mt-4 text-center">{title}</h3>
    );
  };

  const renderDescription = () => {
    if (!description) return null;
    return (
      <p className="text-gray-600 font-tahoma text-sm mt-2 text-center">
        {description}
      </p>
    );
  };

  return (
    <Link to={to}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative rounded-xl mb-6 cursor-pointer transition-all duration-300"
      >
        {renderLocation()}

        {renderImage()}

        {renderTitle()}

        {renderDescription()}

        <div className="mt-2 w-full flex justify-center items-center">
            <button className="inline-flex mx-auto font-tahoma rounded-full items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 bg-[#B6B499] hover:bg-black text-white px-6 py-3 text-sm">Offrir une expérience</button>
        </div>
      </motion.div>
    </Link>
  );
}
