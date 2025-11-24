import React from "react";
import { motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ButtonIcon from "../button-icon/button-icon";
import { TranslatedText } from "../translated-text/translated-text";
import { FaRegHeart } from "react-icons/fa";
import { useAuthContext } from "src/auth/hooks/use-auth-context";

export default function Card({
  to = "/",
  image,
  title,
  location,
  headTitle,
  buttonTitle,
  bottomText,
  offreValue,
  price,
  duration,
}) {
  const { user } = useAuthContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative mb-2 cursor-pointer transition-all duration-300"
    >
      <div className="relative rounded-xl mb-6 cursor-pointer transition-all duration-300">
        {location && (
          <span className="bg-[#020100C9] z-10 text-white font-tahoma uppercase flex items-center justify-start w-max py-2 px-2 gap-2 absolute left-1/2 -translate-x-1/2 top-0 -translate-y-2 font-light text-[10px] tracking-[2px] max-w-[95%] rounded-full">
            <FiMapPin className="text-white" />
            {location}
          </span>
        )}
        {user && (
          <FaRegHeart className="absolute top-8 right-4 text-white text-xl z-10 cursor-pointer hover:text-red-500 transition" />
        )}
        {!!image && (
          <Link to={to}>
            <img
              src={image}
              alt={title || "spa"}
              loading="lazy"
              className="w-full h-full rounded-xl object-cover object-center"
            />
          </Link>
        )}

        {!!offreValue && (
          <span className="bg-[#B6B499] w-max text-black font-bold font-roboto px-2 py-1 absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 rounded-full text-s z-10">
            <TranslatedText text={`${offreValue}% de remise`} />
          </span>
        )}
      </div>

      {/* Content - INCHANGÉ */}
      <Link to={to} className="p-2 mt-3 space-y-1">
        {!!headTitle && (
          <p className="text-center text-xl md:text-2xl">{headTitle}</p>
        )}
        <h3 className="font-normal text-center text-lg">{title}</h3>

        {!!offreValue && (
          <div className="flex gap-1 items-center justify-center">
            {!!duration && (
              <>
                <TranslatedText text="Durée" as="p" className="text-center" />
                <strong className="mr-3">{duration}</strong>
              </>
            )}
            <strong>{price}</strong>
          </div>
        )}

        {buttonTitle && (
          <div className="mt-4 w-full flex items-center justify-center">
            <ButtonIcon
              title={buttonTitle}
              link={to}
              icon={<FaBagShopping className="text-lg" />}
              size=""
            />
          </div>
        )}
      </Link>
    </motion.div>
  );
}