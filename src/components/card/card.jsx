import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ButtonIcon from "../button-icon/button-icon";
import { TranslatedText } from "../translated-text/translated-text";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { useToggleWishlist, getIsWishlisted } from "src/actions/wishlists";
import { FaShoppingBag, FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "src/hooks";
import { paths } from "src/router/paths";
import { useTranslation } from "react-i18next";
import { CONFIG } from "src/config-global";
import OfferFlashSVG from "../offre-flash/offer-flash-badge";
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
  exclusivite_image,
  remise_desc_produit,
  date_fin,
  date_debut,
  offre_flash,
}) {
  

  const { user } = useAuthContext();
  const [isFav, setIsFav] = useState(inWishlist);
  const router = useRouter();
  const { t } = useTranslation();
  const [remainingTime, setRemainingTime] = useState("");

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

  const isOfferActive =offre_flash === 1 && date_fin && new Date(date_fin) > new Date();
  useEffect(() => {
    if (!isOfferActive) {
      setRemainingTime("");
      return;
    }

    const updateCountdown = () => {
      const diffMs = new Date(date_fin) - new Date();

      if (diffMs <= 0) {
        setRemainingTime(t("Expiré"));
        return;
      }

      const days = Math.floor(diffMs / 86400000);
      const hours = Math.floor((diffMs / 3600000) % 24);
      const minutes = Math.floor((diffMs / 60000) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      setRemainingTime(`${days}j ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [date_fin, isOfferActive, t]);

  const toggleFav = async () => {
    if (id === undefined || id === null) {
      toast.error(t("Produit introuvable"));
      return;
    }
    if (!user) {
      router.push(paths.auth.root);
      return;
    }

    setIsFav((prev) => !prev);

    const promise = useToggleWishlist(id);

    toast.promise(promise, {
      pending: isFav
        ? t(`Retrait de "${title}" de vos favoris...`)
        : t(`Ajout de "${title}" à vos favoris...`),
      success: isFav
        ? t(`"${title}" a été retiré de vos favoris !`)
        : t(`"${title}" a été ajouté à vos favoris !`),
      error: t(`Impossible de mettre à jour "${title}"`),
      autoClose: 10000,
    });

    try {
      await promise;
    } catch (err) {
      setIsFav((prev) => !prev);
    }
  };
  const showOfferFlash = isOfferActive;
  const showExclusivite = !!exclusivite_image;

  const offerPosition = showExclusivite
    ? "bottom-2 right-1 w-30 h-30"
    : "bottom-20 right-1 w-16 h-16";

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

        {id !== undefined && id !== null && (
          <button
            onClick={toggleFav}
            className="absolute z-10 text-red-500 top-12 right-3 text-xl bg-white/70 rounded-full p-1"
          >
            {isFav ? <FaHeart /> : <FaRegHeart />}
          </button>
        )}

        {!!image && (
          <Link to={to} className="block w-full h-64">
            <img
              src={image}
              alt={title || t("spa")}
              loading="lazy"
              className="w-full h-full rounded-xl object-cover object-center"
            />
          </Link>
        )}

        {(offreValue > 0 ||
          (remise_desc_produit && remise_desc_produit.trim() !== "")) && (
          <span className="bg-[#B6B499] w-max text-black font-bold font-roboto px-2 py-1 absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 rounded-full text-s z-10">
            <TranslatedText
              text={
                offreValue > 0
                  ? `${offreValue}% de remise`
                  : remise_desc_produit
              }
            />
          </span>
        )}

        {showOfferFlash && (
          <Link
            to={to}
            className={`absolute ${offerPosition} flex items-center justify-center  ${
              showExclusivite ? "" : "rounded-full"
            }`}
          >
        <OfferFlashSVG
          width={70}
          height={67}
          tailledetime={35}
          offre_flash={offre_flash}
          date_fin={date_fin}
          date_debut={date_debut}
        />
          </Link>
        )}

        {showExclusivite && (
          <Link
            to={to}
            className={`absolute ${
              showOfferFlash ? "bottom-20" : "bottom-1"
            } right-1 w-16 h-16 flex items-center justify-center rounded-full bg-[#f6f5e9]`}
          >
            <img
              src={`${CONFIG.serverUrl}/storage/${exclusivite_image}`}
              alt={t("Exclusivité")}
              className="w-14 h-14 object-contain"
              loading="lazy"
              draggable={false}
            />
          </Link>
        )}
      </div>

      <Link to={to} className="p-2 mt-3 space-y-1">
        {!!headTitle && (
          <p className="text-center text-xl md:text-2xl">{headTitle}</p>
        )}

        <h3 className="font-normal text-center text-lg">{title}</h3>

        <div className="flex gap-1 items-center justify-center">
          {!!duration && (
            <>
              <TranslatedText text="Durée" as="p" className="text-center" />
              <strong className="mr-3">{duration}</strong>
            </>
          )}
          <strong className="text-xl">{price ?? 0}€</strong>
        </div>

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
