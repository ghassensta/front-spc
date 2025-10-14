import React from "react";
import { motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ButtonIcon from "../button-icon/button-icon"; // Optional for type "price"
import { TranslatedText } from "../translated-text/translated-text";

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
  headTitle,
  buttonTitle,
  bottomText,
  offreValue,
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
        {/* Image */}
        <div className="relative">
          {location && (
            <span className="bg-[#020100C9] z-10 text-white font-tahoma uppercase flex items-center justify-start w-max py-2 px-2 gap-2 absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 font-medium text-xs tracking-[2px] max-w-[90%] -mr-6">
              <FiMapPin className="text-white" />
              {location}
            </span>
          )}
          {!!image && (
            <img
              lazyload="lazy"
              src={image}
              alt="spa"
              className="w-full h-full rounded-md object-cover overflow-hidden"
            />
          )}

          {!!bottomText && (
            <span className="bg-[#B6B499] w-max text-black font-bold font-roboto px-2 py-1 absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2">
              <TranslatedText text={bottomText} />
            </span>
          )}
        </div>

        {/* Content */}
        <div className={`p-2 mt-3 ${type === "news" ? "p-3" : ""} space-y-1`}>
          {!!headTitle && <p className=" text-center text-xl md:text-2xl">{headTitle}</p>}
          <h5
            className={`font-normal text-center font-tahoma text-base`}>
            {title}
          </h5>

          {!!prestation && (
            <span className="text-lg md:text-lg font-bold m-0">
              {prestation}
            </span>
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

          {offreValue && (
            <div className="flex gap-1 items-center justify-center">
              <TranslatedText
                text="Offre exclusive"
                as="p"
                className="font-tahoma text-center"
              />{" "}
              <strong className="font-tahoma">
                {parseFloat(offreValue)} €
              </strong>
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
