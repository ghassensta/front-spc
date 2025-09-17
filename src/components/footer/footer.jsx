import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
} from "react-icons/fa";
import { paths } from "src/router/paths";
import { useLayout } from "src/actions/layout";
import { CONFIG } from "src/config-global";
import { IconBrandFacebookFilled, IconBrandInstagramFilled, IconBrandLinkedinFilled, IconBrandTiktokFilled } from "@tabler/icons-react";
const iconMap = {
  "ti ti-brand-facebook": IconBrandFacebookFilled,
  "ti ti-brand-instagram": IconBrandInstagramFilled,
  "ti ti-brand-tiktok": IconBrandTiktokFilled,
  "ti ti-brand-linkedin": IconBrandLinkedinFilled,
};

export default function Footer() {
  const { footer } = useLayout();

  const { settings, footer_about, footer_pro, social_links } = footer || {};

  const siteLogoPath = settings?.site_logo?.value || "";
  console.log("Footer menus data:aaaaaaaaa", footer);

  const siteDescription =
    settings?.site_description?.value || "Description par défaut du site.";

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

    console.log(socialLinksFiltered)

  return (
    <footer className="bg-secondary text-white pt-8 md:pt-12 left-[calc(-50vw+50%)] relative w-screen font-roboto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-10 md:gap-2 lg:gap-8 md:py-12">
        {/* Colonne 1: Logo + Description */}
        <div className="text-center flex flex-col items-center mx-auto lg:mr-12">
          {siteLogoPath ? (
            <img
              src={`${CONFIG.serverUrl}/storage/${siteLogoPath}`}
              alt="SPC Logo"
              className="w-32 md:w-60 mb-4 d-block"
              width={150}
              onError={(e) => {}}
            />
          ) : (
            <div className="w-24 h-24 bg-gray-600 mb-4 rounded-full flex items-center justify-center">
              Logo
            </div>
          )}
          <p className="text-sm leading-relaxed font-roboto mb-4 font-[300]">
            {siteDescription}
          </p>
          <p className="text-sm">Tél. 01 82 35 01 26</p>{" "}
          {/* Statique pour l'instant, rendez dynamique si besoin */}
        </div>

        {/* Colonne 2: À PROPOS - Dynamique */}
        <div className="w-full">
          <h4 className="text-lg font-light mb-3">À PROPOS</h4>
          <ul className="space-y-2 text-sm font-roboto">
            {aboutLinks.map((item) => (
              <li key={item.id}>
                <a href={item.url} className="duration-300 border-0 hover:border-b-2 hover:border-primary hover:text-primary hover:font-bold">
                  {item.title}
                </a>
              </li>
            ))}
            {/* Fallback si pas de liens dynamiques, ajoutez les statiques manquants si nécessaire */}
            {aboutLinks.length === 0 && (
              <>
                <li>
                  <a href={paths.who} className="duration-300 border-0 hover:border-b-2 hover:border-primary hover:text-primary hover:font-bold">Qui sommes nous</a>
                </li>
                <li>
                  <a href={paths.collection} className="duration-300 border-0 hover:border-b-2 hover:border-primary hover:text-primary hover:font-bold">Book Collection & Prestige</a>
                </li>
                {/* Ajoutez les autres */}
              </>
            )}
          </ul>
        </div>

        {/* Colonne 3: PROFESSIONNEL - Dynamique */}
        <div className="w-full">
          <h4 className="text-lg font-light mb-3">PROFESSIONNEL</h4>
          <ul className="space-y-2 text-sm font-roboto">
            {proLinks.map((item) => (
              <li key={item.id}>
                <a href={item.url} className="duration-300 border-0 hover:border-b-2 hover:border-primary hover:text-primary hover:font-bold">
                  {item.title}
                </a>
              </li>
            ))}
            {/* Fallback si pas de liens dynamiques */}
            {proLinks.length === 0 && (
              <>
                <li>
                  <a href={paths.partenaire} className="duration-300 border-0 hover:border-b-2 hover:border-primary hover:text-primary hover:font-bold">Devenir partenaire</a>
                </li>
                <li>
                  <a href={paths.referentiel} className="duration-300 border-0 hover:border-b-2 hover:border-primary hover:text-primary hover:font-bold">Référentiel de candidature</a>
                </li>
                {/* Ajoutez les autres */}
              </>
            )}
          </ul>
        </div>

        {/* Colonne 4: Newsletter - Statique pour l'instant */}
        <div className="w-full">
          <h4 className="text-lg font-light mb-3">NEWSLETTER</h4>
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
          <div className="flex justify-start gap-2 mt-10 text-white text-lg">
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
                  style={{ color: item.color || "inherit" }} // Utilise la couleur si fournie
                >
                  <i className={item.icon} ></i>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar - Statique */}
      <div className="bg-[#B6B498] text-base  text-black  font-roboto">
        <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row items-center justify-between">
          <p className="mb-2 md:mb-0">
            © 2025 – Réalisation{" "}
            <span className="font-semibold">éCOM Design</span>
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
      </div>
    </footer>
  );
}
