// LocationSection.jsx
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

export default function LocationSection({ data }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-start py-8 max-w-6xl mx-auto">
      {/* Map */}
      <motion.div
        className="w-full md:w-2/3 h-[300px] bg-white p-4 rounded-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <iframe
          src={data?.iframeUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Google Map"
          className="rounded-lg"
        />
      </motion.div>

      {/* Info */}
      <motion.div
        className="w-full md:w-1/3 p-8 rounded-lg"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="text-gray-800 space-y-4">
          <h2 className="text-2xl font-semibold">{data?.nom}</h2>
          <div className="flex items-start gap-3 font-roboto border-b pb-2">
            <FaMapMarkerAlt className="text-secondary mt-1" />
            <p className="text-sm font-medium">{data?.adresse}</p>
          </div>
          <div className="flex items-start gap-3 font-roboto border-b pb-2">
            <MdAccessTime className="text-secondary mt-1" />
            <p className="text-sm font-medium">
              {data?.horaires_ouverture || "Horaires non spécifiés"}
            </p>
          </div>
          <div className="flex items-start gap-3 font-roboto border-b pb-2">
            <FaPhone className="text-secondary mt-1" />
            <p className="text-sm font-medium">{data?.telephone}</p>
          </div>
          <div className="flex items-start gap-3 font-roboto border-b pb-2">
            <FaEnvelope className="text-secondary mt-1" />
            <p className="text-sm font-medium">{data?.email}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
