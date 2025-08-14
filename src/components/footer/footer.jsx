import React from "react";
import logo from "../../assets/SPC-logo-cercle-blanc.png";
import { FaFacebookF, FaTiktok, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#2c2b29] text-white pt-12 left-[calc(-50vw+50%)] relative w-screen">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12">
        {/* Column 1: Logo + Description */}
        <div className="lg:col-span-2 text-center flex flex-col items-center max-w-3xl mx-auto">
  <img src={logo} alt="SPC Logo" className="w-24 mb-4" />
  <p className="text-sm leading-relaxed font-roboto mb-4">
    Spa & Prestige Collection vous invite à vivre des expériences uniques, avec des soins personnalisés, des offres spa exclusives, des séjours d’exception et des options de restauration raffinées. Découvrez également nos cartes cadeaux pour offrir ces moments d’exception.
  </p>
  <p className="text-sm">Tél. 01 82 35 01 26</p>
</div>

        {/* Column 2: À PROPOS */}
        <div>
          <h4 className="text-base font-semibold mb-3">À PROPOS</h4>
          <ul className="space-y-2 text-sm font-roboto">
            <li><Link to="#">Qui sommes nous</Link></li>
            <li><Link to="#">Book Collection & Prestige</Link></li>
            <li><Link to="#">Carte Cadeau</Link></li>
            <li><Link to="#">Glossaire des termes utilisés</Link></li>
            <li><Link to="#">Actualités</Link></li>
            <li><Link to="#">Parrainage</Link></li>
            <li><Link to="#">Fidélité</Link></li>
            <li><Link to="#">Aide et contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Professionnel */}
        <div>
          <h4 className="text-base font-semibold mb-3">PROFESSIONNEL</h4>
          <ul className="space-y-2 text-sm font-roboto">
            <li><Link to="#">Devenir partenaire</Link></li>
            <li><Link to="#">Référentiel de candidature</Link></li>
            <li><Link to="#">Solutions pour entreprises</Link></li>
            <li><Link to="#">Collaboration avec les marques</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h4 className="text-base font-semibold mb-3">NEWSLETTER</h4>
          <div className="bg-[#f4efe5] p-4 rounded">
            <label className="block text-sm mb-1 text-black">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 text-black px-2 py-1 rounded mb-3"
            />
            <label className="flex items-start text-xs text-black mb-3 gap-2">
              <input type="checkbox" className="mt-1" />
              J'accepte l'inscription à la base de données Newsletter SPC.
            </label>
            <button className="bg-[#c6c1a5] text-white w-full py-2 rounded font-semibold text-sm">
              Valider
            </button>
            <div className="mt-4 text-center">
              <button className="bg-black text-white px-4 py-1 text-xs rounded-full">
                Powered by <strong>Mailjet</strong>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="border-t border-gray-700 py-4">
        <div className="flex justify-center gap-6 text-white text-lg">
          <FaFacebookF />
          <FaTiktok />
          <FaInstagram />
          <FaLinkedinIn />
        </div>
      </div>
      <div className="bg-[#d6d4b4] text-sm text-black px-6 py-3 flex flex-col md:flex-row items-center justify-between font-roboto">
  <p className="mb-2 md:mb-0">
    © 2025 – Réalisation <span className="font-semibold">ÉCOM Design</span>
  </p>
  <div className="flex gap-4">
    <Link to="#" className="hover:underline">Mentions légales</Link>
    <span>•</span>
    <Link to="#" className="hover:underline">CGV</Link>
  </div>
</div>
    </footer>
  );
}
