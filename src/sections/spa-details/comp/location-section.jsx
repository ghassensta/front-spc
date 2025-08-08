import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

export default function LocationSection() {
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
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d354763.3592293863!2d4.01975!3d45.99944!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f405246498f805%3A0x7566dacf927d37de!2sDavid%20GRAND!5e0!3m2!1sen!2sus!4v1745410814942!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d354763.3592293863!2d4.01975!3d45.99944!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f405246498f805%3A0x7566dacf927d37de!2sDavid%20GRAND!5e0!3m2!1sen!2sus!4v1745410814942!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
          className="rounded-lg"
        ></iframe>
      </motion.div>

      {/* Info */}
      <motion.div
        className="w-full md:w-1/2 p-8 rounded-lg"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="text-gray-800 space-y-4">
          <h2 className="text-2xl font-semibold">DAVID GRAND SPA – VILLEREST</h2>
          <div className="flex items-start gap-3 font-roboto border-b pb-2">
            <FaMapMarkerAlt className="text-secondary mt-1" />
            <p className="text-sm font-medium">100 CHEMIN DE LA CHAPELLE 42300 VILLEREST</p>
          </div>
          <div className="flex items-start gap-3 font-roboto border-b pb-2">
            <MdAccessTime className="text-secondary mt-1" />
            <p className="text-sm font-medium">
              LUNDI : FERMÉ ; MARDI À JEUDI : 9H À 19H ;<br />
              VENDREDI : 9H À 20H ; SAMEDI 9H À 20H ;<br />
              DIMANCHE DE 9H À 14H (SUR RÉSERVATION)
            </p>
          </div>
          <div className="flex items-start gap-3 font-roboto border-b pb-2">
            <FaPhone className="text-secondary mt-1" />
            <p className="text-sm font-medium">+33 (0)4 77 23 01 98</p>
          </div>
          <div className="flex items-start gap-3 font-roboto border-b pb-2">
            <FaEnvelope className="text-secondary mt-1" />
            <p className="text-sm font-medium">CONTACT@DAVIDGRANDSPA.FR</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
