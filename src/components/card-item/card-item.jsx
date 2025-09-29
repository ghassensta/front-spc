import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingBag } from "react-icons/fa";
import exclusive from "../../assets/exclusive.png";
import ButtonIcon from "../button-icon/button-icon";
import { CONFIG } from "src/config-global";
import { Link } from "react-router-dom";
import { paths } from "src/router/paths";

export default function CardItem({
  id,
  type_id,
  nom,
  slug,
  description,
  conditions_utilisation,
  offre_flash,
  date_debut,
  date_fin,
  access_spa,
  prix,
  prix_barre,
  prix_au_lieu_de,
  image,
  exclusivite_spc,
  ordre,
}) {
  const [remaining, setRemaining] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (!date_fin) return;

    const updateCountdown = () => {
      const now = new Date();
      const end = new Date(date_fin);
      const diff = end - now;

      if (diff <= 0) {
        setRemaining("Expiré");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setRemaining(`${days}j ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [date_fin]);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  return (
    <motion.div className="flex flex-col md:flex-row gap-4 py-6 border-b border-gray-400 ">
      {/* Image */}
      <div className="flex-shrink-0 w-full md:w-1/3">
        <img lazyload="lazy"
          src={
            image
              ? `${CONFIG.serverUrl}/storage/${image}`
              : "/images/default-product.jpg"
          }
          alt={nom}
          className="w-full h-[250px] object-cover rounded"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row md:justify-between w-full gap-6">
        <div className="flex flex-col md:flex-row justify-between flex-1 gap-2 md:gap-8">
          <div>
            <h3 className="text-2xl text-left font-normal text-gray-900">
              {nom}
            </h3>
            <p className="text-left font-normal font-tahoma text-black mt-1">
              {showFullDescription
                ? description
                : description?.length > 150
                ? description.slice(0, 200) + "..."
                : description}
              {description && description.length > 150 && (
                <span
                  className="font-semibold font-tahoma text-black cursor-pointer"
                  onClick={toggleDescription}
                >
                  {showFullDescription ? " (Voir moins)" : " (Lire la suite)"}
                </span>
              )}
            </p>
          </div>
          <div className="flex flex-row items-center h-full justify-center font-roboto gap-2">
            {prix &&
              parseFloat(prix) !== 0 &&
              parseFloat(prix_barre) !== 0 &&
              parseFloat(prix_au_lieu_de) !== 0 && (
                <span className="text-lg font-normal text-gray-900">
                  {parseFloat(prix).toFixed(2)}€
                </span>
              )}
            {prix_barre &&
              parseFloat(prix_barre) !== 0 &&
              parseFloat(prix_barre) !== parseFloat(prix) && (
                <span className="text-gray-500 line-through text-sm w-full">
                  {parseFloat(prix_barre).toFixed(2)}€
                </span>
              )}

            {prix_au_lieu_de &&
              parseFloat(prix_au_lieu_de) !== 0 &&
              parseFloat(prix_au_lieu_de) !== parseFloat(prix) && (
                <span className="text-center text-base text-gray-900">
                  <div className="font-bold">
                    {parseFloat(prix_au_lieu_de).toFixed(2)}€
                  </div>
                  <div className="text-sm">Au lieu de </div>
                  <div className="text-sm">{parseFloat(prix).toFixed(2)}€</div>
                </span>
              )}
          </div>
          <div className="flex min-w-[100px] flex-col h-full justify-between items-center gap-4 md:gap-2">
            {exclusivite_spc === 1 && (
              <img lazyload="lazy"
                src={exclusive}
                alt="Exclusivité"
                className="w-16 h-auto my-2"
              />
            )}

            {offre_flash === 1 && date_fin && (
              <div className="flex flex-col items-center px-1 py-2 border-dashed rounded-lg border-2 font-tahoma w-full">
                <span className="text-sm font-medium text-red-600">
                  Offre flash
                </span>
                <div className="text-xs font-bold text-gray-800 mt-1">
                  {remaining}
                </div>
              </div>
            )}
            {slug && (
              <>
                <div className="flex-1" />
                <Link to={paths.product(slug)} className="w-full">
                  <button className="w-full px-4 py-3 bg-black leading-4 text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma flex items-center justify-center gap-2">
                    Offrir
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
