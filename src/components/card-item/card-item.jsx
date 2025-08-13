import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingBag } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";
import exclusive from "../../assets/exclusive.png";
import ButtonIcon from "../button-icon/button-icon";
import { paths } from "../../router/paths";

export default function CardItem({
  id,
  image,
  title,
  description,
  spaNote,
  price,
  exclusiveExist,
  flashDeadline, // expecting full date + time
}) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    if (!flashDeadline) return;

    const updateCountdown = () => {
      const now = new Date();
      const end = new Date(flashDeadline);
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
  }, [flashDeadline]);

  return (
    <motion.div className="flex flex-col md:flex-row gap-4 py-6 border-b border-gray-300">
      {/* Image */}
      <div className="flex-shrink-0 w-full md:w-1/3">
        <img
          src={image ? image : "/images/default-product.jpg"}
          alt={title}
          className="w-full h-auto object-cover rounded"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row md:justify-between w-full gap-6">
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-3xl font-normal text-gray-900">{title}</h3>
            <p className="text-base font-normal font-tahoma text-gray-800 mt-1">
              {description}
              {description && description.length > 100 && (
                <span className="font-bold text-black cursor-pointer">
                  {" "} (Lire la suite)
                </span>
              )}
            </p>
          </div>
          <div className="flex text-sm font-normal font-tahoma items-center mt-4 text-gray-600 gap-2">
            <span className="text-3xl">
              <IoAlertCircle />
            </span>
            <p>{spaNote}</p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col items-center justify-between min-w-[120px]">
          {flashDeadline && (
            <div className="flex flex-col items-center p-2 border-dashed rounded-lg border-2">
              <span className="text-sm font-medium text-red-600">
                Offre flash
              </span>
              <div className="text-lg font-bold text-gray-800 mt-1">
                {remaining}
              </div>
            </div>
          )}

          {exclusiveExist && (
            <img src={exclusive} alt="" className="w-16 h-auto" />
          )}

          {id && (
            <ButtonIcon
              title="Offrir"
              icon={<FaShoppingBag />}
              link={paths.spa.details(id)}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
