import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingBag } from "react-icons/fa";
import exclusive from "../../assets/exclusive.png";
import ButtonIcon from "../button-icon/button-icon";
import { paths } from "../../router/paths";
import { API_URL_base } from "src/api/data";

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
    <motion.div className="flex flex-col md:flex-row gap-4 py-6 border-b border-gray-300 ">
      {/* Image */}
      <div className="flex-shrink-0 w-full md:w-1/3">
        <img
          src={
            image
              ? `${API_URL_base}/storage/${image}`
              : "/images/default-product.jpg"
          }
          alt={nom}
          className="w-full h-[250px] object-cover rounded"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row md:justify-between w-full gap-6">
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-2xl font-normal text-gray-900">{nom}</h3>
            <p className="text-left font-normal font-tahoma text-gray-800 mt-1">
              {showFullDescription
                ? description
                : description?.length > 150
                ? description.slice(0, 500) + "..."
                : description}
              {description && description.length > 150 && (
                <span
                  className="font-bold text-black cursor-pointer"
                  onClick={toggleDescription}
                >
                  {showFullDescription ? " (Voir moins)" : " (Lire la suite)"}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col items-center justify-between min-w-[140px]">
          {offre_flash === 1 && date_fin && (
            <div className="flex flex-col items-center p-2 border-dashed rounded-lg border-2">
              <span className="text-sm font-medium text-red-600">
                Offre flash
              </span>
              <div className="text-lg font-bold text-gray-800 mt-1">
                {remaining}
              </div>
            </div>
          )}

          {exclusivite_spc === 1 && (
            <img
              src={exclusive}
              alt="Exclusivité"
              className="w-16 h-auto my-2"
            />
          )}

          {/* Prix */}
          <div className="flex flex-col items-center mb-2">
            {/* Prix barré */}
            {prix_barre &&
              parseFloat(prix_barre) !== 0 &&
              parseFloat(prix_barre) !== parseFloat(prix) && (
                <span className="text-gray-500 line-through text-sm">
                  {parseFloat(prix_barre).toFixed(2)} €
                </span>
              )}

            {/* Prix principal */}
            {prix &&
              parseFloat(prix) !== 0 &&
              parseFloat(prix_barre) !== 0 &&
              parseFloat(prix_au_lieu_de) !== 0 && (
                <span className="text-lg font-bold text-gray-900">
                  {parseFloat(prix).toFixed(2)} €
                </span>
              )}

            {/* Prix alternatif "Au lieu de" */}
            {prix_au_lieu_de &&
              parseFloat(prix_au_lieu_de) !== 0 &&
              parseFloat(prix_au_lieu_de) !== parseFloat(prix) && (
                <span className="text-sm text-gray-700">
                  {" "}
                  <br />
                  {parseFloat(prix_au_lieu_de).toFixed(2)} € <br /> Au lieu de{" "}
                  <br />
                  {parseFloat(prix).toFixed(2)} €
                </span>
              )}
          </div>

          {slug && (
            <ButtonIcon
            class
              title="Offrir"
              icon={<FaShoppingBag />}
              link={`/produit/${slug}`}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
