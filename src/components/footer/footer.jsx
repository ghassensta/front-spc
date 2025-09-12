import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaLinkedinIn } from "react-icons/fa";
import { paths } from "src/router/paths";
import { useMenuFooter } from "src/hooks/useMenuFooter"; 
import { API_URL_base } from "src/api/data";
const iconMap = {
  "ti ti-brand-facebook": FaFacebookF,
  "ti ti-brand-instagram": FaInstagram,
  "ti ti-brand-tiktok": FaTiktok,
  "ti ti-brand-linkedin": FaLinkedinIn,
};

export default function Footer() {
  const { menus, loading, error } = useMenuFooter();

  if (loading) {
    return (
      <footer className="bg-[#2c2b29] text-white pt-12 left-[calc(-50vw+50%)] relative w-screen">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">Chargement du footer...</div>
      </footer>
    );
  }

  if (error) {
    console.error("Erreur lors du chargement des données du footer:", error);
    return (
      <footer className="bg-[#2c2b29] text-white pt-12 left-[calc(-50vw+50%)] relative w-screen">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">Erreur de chargement du footer.</div>
      </footer>
    );
  }

  const { settings, footer_about, footer_pro, social_links } = menus || {};

  const siteLogoPath = settings?.site_logo?.value || "";
  console.log("Footer menus data:aaaaaaaaa", siteLogoPath);

  const siteDescription = settings?.site_description?.value || "Description par défaut du site.";

  const aboutLinks = footer_about
    ? footer_about
        .filter((item) => item.is_active)
        .sort((a, b) => a.order - b.order)
    : [];

  const proLinks = footer_pro
    ? footer_pro
        .filter((item) => item.is_active)
        .sort((a, b) => a.order - b.order)
    : [];

  const socialLinksFiltered = social_links
    ? social_links
        .filter((item) => item.is_active)
        .sort((a, b) => a.order - b.order)
    : [];

  return (
    <footer className="bg-[#2c2b29] text-white pt-12 left-[calc(-50vw+50%)] relative w-screen">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12">
        {/* Colonne 1: Logo + Description */}
        <div className="lg:col-span-2 text-center flex flex-col items-center max-w-3xl mx-auto">
          {siteLogoPath ? (
            <img

              src={`${API_URL_base}storage/${siteLogoPath}`} 
              alt="SPC Logo"
              className="w-24 mb-4 d-block"
              width={150}
              onError={(e) => {
              }}
            />
          ) : (
            <div className="w-24 h-24 bg-gray-600 mb-4 rounded-full flex items-center justify-center">
              Logo
            </div>
          )}
          <p className="text-sm leading-relaxed font-roboto mb-4">{siteDescription}</p>
          <p className="text-sm">Tél. 01 82 35 01 26</p> {/* Statique pour l'instant, rendez dynamique si besoin */}
        </div>

        {/* Colonne 2: À PROPOS - Dynamique */}
        <div>
          <h4 className="text-base font-semibold mb-3">À PROPOS</h4>
          <ul className="space-y-2 text-sm font-roboto">
            {aboutLinks.map((item) => (
              <li key={item.id}>
                <a href={item.url} className="hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
            {/* Fallback si pas de liens dynamiques, ajoutez les statiques manquants si nécessaire */}
            {aboutLinks.length === 0 && (
              <>
                <li><a href={paths.who}>Qui sommes nous</a></li>
                <li><a href={paths.collection}>Book Collection & Prestige</a></li>
                {/* Ajoutez les autres */}
              </>
            )}
          </ul>
        </div>

        {/* Colonne 3: PROFESSIONNEL - Dynamique */}
        <div>
          <h4 className="text-base font-semibold mb-3">PROFESSIONNEL</h4>
          <ul className="space-y-2 text-sm font-roboto">
            {proLinks.map((item) => (
              <li key={item.id}>
                <a href={item.url} className="hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
            {/* Fallback si pas de liens dynamiques */}
            {proLinks.length === 0 && (
              <>
                <li><a href={paths.partenaire}>Devenir partenaire</a></li>
                <li><a href={paths.referentiel}>Référentiel de candidature</a></li>
                {/* Ajoutez les autres */}
              </>
            )}
          </ul>
        </div>

        {/* Colonne 4: Newsletter - Statique pour l'instant */}
        <div>
          <h4 className="text-base font-semibold mb-3">NEWSLETTER</h4>
          <div className="bg-[#f4efe5] p-4 rounded">
            <label className="block text-sm mb-1 text-black">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 text-black px-2 py-1 rounded mb-3"
              placeholder="Votre email"
            />
            <label className="flex items-start text-xs text-black mb-3 gap-2">
              <input type="checkbox" className="mt-1" />
              J'accepte l'inscription à la base de données Newsletter SPC.
            </label>
            <button className="bg-[#c6c1a5] text-white w-full py-2 rounded font-semibold text-sm hover:bg-[#b4ad8f] transition-colors">
              Valider
            </button>
            <div className="mt-4 text-center">
              <button className="bg-black text-white px-4 py-1 text-xs rounded-full hover:bg-gray-800 transition-colors">
                Powered by <strong>Mailjet</strong>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Icônes Sociales - Dynamiques */}
      {socialLinksFiltered.length > 0 && (
        <div className="border-t border-gray-700 py-4">
          <div className="flex justify-center gap-6 text-white text-lg">
            {socialLinksFiltered.map((item) => {
              const IconComponent = iconMap[item.icon];
              if (!IconComponent) return null;
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                  style={{ color: item.color || 'inherit' }} // Utilise la couleur si fournie
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
            {/* Fallback statique si pas de liens dynamiques */}
            {socialLinksFiltered.length === 0 && (
              <>
                <FaFacebookF size={20} className="hover:text-gray-300 transition-colors" />
                <FaTiktok size={20} className="hover:text-gray-300 transition-colors" />
                <FaInstagram size={20} className="hover:text-gray-300 transition-colors" />
                <FaLinkedinIn size={20} className="hover:text-gray-300 transition-colors" />
              </>
            )}
          </div>
        </div>
      )}

      {/* Bottom bar - Statique */}
      <div className="bg-[#d6d4b4] text-sm text-black px-6 py-3 flex flex-col md:flex-row items-center justify-between font-roboto">
        <p className="mb-2 md:mb-0">
          © 2025 – Réalisation{" "}
          <span className="font-semibold">ÉCOM Design</span>
        </p>
        <div className="flex gap-4">
          <a href={paths.mentions} className="hover:underline">
            Mentions légales
          </a>
          <span>•</span>
          <a href={paths.conditions} className="hover:underline">
            CGV
          </a>
        </div>
      </div>
    </footer>
  );
}