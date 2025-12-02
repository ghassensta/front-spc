import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ButtonIcon from "../button-icon/button-icon";
import { TranslatedText } from "../translated-text/translated-text";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { useToggleWishlist, getIsWishlisted } from "src/actions/wishlists";
import { toast } from "react-toastify";
import { useRouter } from "src/hooks";
import { paths } from "src/router/paths";

export default function Card({
  to = "/",
  id,
  image,
  title,
  location,
  headTitle,
  buttonTitle,
  bottomText,
  offreValue,
  price,
  duration,
  inWishlist,
  exclusivite_spc,
}) {
  console.log("exclusivite_spc", exclusivite_spc);
  const { user } = useAuthContext();
  const [isFav, setIsFav] = useState(inWishlist);
  const router = useRouter();
  useEffect(() => {
    let isMounted = true;

    const loadInitialState = async () => {
      if (!inWishlist) {
        const status = await getIsWishlisted(id);
        if (isMounted) setIsFav(status);
      }
    };

    loadInitialState();

    return () => {
      isMounted = false;
    };
  }, [id, inWishlist]);

  const toggleFav = async () => {
    if (!user) {
      router.push(paths.auth.root);
      return;
    }

    setIsFav((prev) => !prev);

    const promise = useToggleWishlist(id);

    toast.promise(promise, {
      pending: isFav
        ? `Retrait de "${title}" de vos favoris...`
        : `Ajout de "${title}" à vos favoris...`,
      success: isFav
        ? `"${title}" a été retiré de vos favoris !`
        : `"${title}" a été ajouté à vos favoris !`,
      error: `Impossible de mettre à jour "${title}"`,
      autoClose: 10000,
    });

    try {
      await promise;
    } catch (err) {
      console.error(err);
      setIsFav((prev) => !prev);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative mb-2 cursor-pointer transition-all duration-300"
    >
      <div className="relative rounded-xl  cursor-pointer transition-all duration-300">
        {location && (
          <span className="bg-[#020100C9] z-10 text-white font-tahoma uppercase flex items-center justify-start w-max py-2 px-2 gap-2 absolute left-1/2 -translate-x-1/2 top-0 -translate-y-2 font-light text-[10px] tracking-[2px] max-w-[95%] rounded-full">
            <FiMapPin className="text-white" />
            {location}
          </span>
        )}

        <button
          onClick={toggleFav}
          className="absolute z-10 text-red-500 top-12 right-3 text-xl bg-white/70 rounded-full p-1"
        >
          {isFav ? <FaHeart /> : <FaRegHeart />}
        </button>

        {!!image && (
          <Link to={to} className="block w-full h-64">
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

        {(exclusivite_spc === true || exclusivite_spc === 1) && (
          <img
            src="/spa-prestige-logo.png"
            alt="Exclusivité"
            className="absolute z-10 bottom-0 right-0 mr-3 mb-2 w-16 h-16 object-contain translate-y-1/5 ml-2
               rounded-full p-2"
            style={{ backgroundColor: "#f6f5e9" }}
          />
        )}
      </div>

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
            <strong className="text-xl">{price}</strong>
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
