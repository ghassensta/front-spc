import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { CONFIG } from "src/config-global";

export default function LocationSection({ data }) {
  const iframeWrapperRef = useRef(null);

  useEffect(() => {
    const iframe = iframeWrapperRef.current?.querySelector("iframe");
    if (iframe) {
      // Remove hardcoded width/height
      iframe.removeAttribute("width");
      iframe.removeAttribute("height");

      // Apply responsive classes or styles
      iframe.classList.add("w-full", "h-full", "rounded-lg");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
    }
  }, [data?.iframeUrl]); // Re-run if iframe URL changes

  return (
    <div className="flex flex-col md:flex-row gap-3 items-start py-2 max-w-6xl mx-auto">
      {/* Map */}
      <motion.div
        className="w-full md:w-1/2 h-[300px] bg-white p-4 rounded-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div ref={iframeWrapperRef} className="w-full h-full overflow-hidden">
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
      </motion.div>

      {/* Info */}
      <motion.div
        className="w-full md:w-1/2 p-8 rounded-lg"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="text-gray-800 space-y-1">
          <h2 className="text-2xl font-semibold uppercase">{data?.nom}</h2>
          <div className="flex items-start gap-3 font-tahoma uppercase text-xl border-b text-black py-1">
            <FaMapMarkerAlt className="text-secondary" />
            <p className="text-base font-normal tracking-wide">
              {data?.adresse}
            </p>
          </div>
          <div className="flex items-start gap-3 font-tahoma uppercase text-xl border-b text-black py-1">
            <MdAccessTime className="text-secondary" />
            <p className="text-base font-normal tracking-wide">
              {data?.horaires_ouverture || "Horaires non spécifiés"}
            </p>
          </div>
          <div className="flex items-start gap-3 font-tahoma uppercase text-xl border-b text-black py-1">
            <FaPhone className="text-secondary" />
            <p className="text-base font-normal tracking-wide">
              {data?.telephone}
            </p>
          </div>
          <div className="flex items-start gap-3 font-tahoma uppercase text-xl border-b text-black py-1">
            <FaEnvelope className="text-secondary" />
            <p className="text-base font-normal tracking-wide">{data?.email}</p>
          </div>
          {data?.labellise_spa_a == 1 && (
            <div className="flex flex-col items-start mt-2 mb-2">
              <img
                src={`${CONFIG.serverUrl}/assets/img/SPC-logo-labellise-Spa-A-100x100.jpg`}
                alt="Label Spa-A"
                className="w-22 h-22 object-contain"
              />

              <p className="text-sm italic text-gray-600 mt-1">
                Labellisé Spa-A
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

const spaCarte = `<div style="width: 100%; height: 100%; background-color: rgb(156 163 175 / var(--tw-bg-opacity, 1)); border-radius: 12px; display: flex; align-items: center; justify-content: center" className="w-full h-full bg-gray-400 rounded flex items-center justify-center">Aucune Localisation Disponible</div>`;
