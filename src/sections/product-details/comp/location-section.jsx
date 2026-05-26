import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaAngleRight } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";
import { getGoogleMapsLink } from "src/utils/getGoogleMapsLink";

export default function LocationSection({ data }) {
  const iframeWrapperRef = useRef(null);

  if (!!!data) return;

  useEffect(() => {
    const iframe = iframeWrapperRef.current?.querySelector("iframe");
    if (iframe) {
      iframe.removeAttribute("width");
      iframe.removeAttribute("height");
      iframe.classList.add("w-full", "h-full", "rounded-lg");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
    }
  }, [data?.iframeUrl]);

  const googleMapsLink = getGoogleMapsLink(data?.iframeUrl);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-stretch py-2 max-w-6xl mx-auto ">

      {/* LEFT — Map */}


      {/* RIGHT — Info */}
      <motion.div
        className="flex-1 min-w-0 p-6 rounded-lg flex items-center "
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="text-gray-800 space-y-1 w-full font-tahoma">
          <h2 className="text-2xl mb-2 break-words">{data?.nom}</h2>

          <div className="flex items-start gap-3 uppercase border-b text-black py-2">
            <FaMapMarkerAlt className="text-secondary mt-1 flex-shrink-0" />
            <p className="text-base font-normal tracking-wide break-words min-w-0">{data?.adresse}</p>
          </div>

          <div className="flex items-start gap-3 uppercase border-b text-black py-2">
            <MdAccessTime className="text-secondary mt-1 flex-shrink-0" />
            <p className="text-base font-normal tracking-wide break-words min-w-0">
              {data?.horaires_ouverture || "Horaires non spécifiés"}
            </p>
          </div>

          <div className="flex items-start gap-3 uppercase border-b text-black py-2">
            <FaPhone className="text-secondary mt-1 flex-shrink-0" />
            <p className="text-base font-normal tracking-wide break-words min-w-0">{data?.telephone}</p>
          </div>

          <div className="flex items-start gap-3 uppercase border-b text-black py-2">
            <FaEnvelope className="text-secondary mt-1 flex-shrink-0" />
            <p className="text-base font-normal tracking-wide break-all min-w-0">{data?.email}</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="w-full md:w-2/5 h-[280px] bg-white p-3 rounded-lg flex-shrink-0"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div ref={iframeWrapperRef} className="w-full h-full overflow-hidden rounded-lg">
          {data?.iframeUrl ? (
            <div
              dangerouslySetInnerHTML={{ __html: data.iframeUrl }}
              className="w-full h-full"
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: spaCarte }}
              className="w-full h-full"
            />
          )}
        </div>

        <Link
          to={googleMapsLink || "https://maps.google.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-normal text-gray-800 mt-2"
        >
          {/* <span>Comment s'y rendre ?</span>
          <FaAngleRight className="text-gray-600" /> */}
        </Link>
      </motion.div>
    </div>
  );
}

const spaCarte = `<div style="width: 100%; height: 100%; background-color: rgb(156 163 175 / var(--tw-bg-opacity, 1)); border-radius: 12px; display: flex; align-items: center; justify-content: center">Aucune Localisation Disponible</div>`;