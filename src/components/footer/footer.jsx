import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok ,
  FaLinkedinIn,
} from "react-icons/fa";
import { paths } from "src/router/paths";
import { useLayout } from "src/actions/layout";
import { CONFIG } from "src/config-global";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "src/context/translation-context";

const iconMap = {
  "ti ti-brand-facebook": FaFacebookF,
  "ti ti-brand-instagram": FaInstagram ,
  "ti ti-brand-tiktok": FaTiktok ,
  "ti ti-brand-linkedin": FaLinkedinIn,
};

export default function Footer() {
  const { footer } = useLayout();
  const { translateSync } = useTranslation();

  const { settings, footer_about, footer_pro, social_links } = footer || {};

  const siteLogoPath = settings?.site_logo?.value || "";

  const siteDescription =
    settings?.site_description?.value || translateSync("Description par défaut du site.");

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
    <footer className="bg-secondary text-white pt-8 md:pt-12 left-[calc(-50vw+50%)] relative w-screen font-roboto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-10 md:gap-2 lg:gap-8 md:py-12">
        <div className="text-center flex flex-col items-center mx-auto lg:mr-12">
          {siteLogoPath ? (
            <img lazyload="lazy"
              src={`${CONFIG.serverUrl}/storage/${siteLogoPath}`}
              alt={translateSync("SPC Logo")}
              className="w-32 md:w-60 mb-4 d-block"
              width={150}
              onError={(e) => {}}
            />
          ) : (
            <div className="w-24 h-24 bg-gray-600 mb-4 rounded-full flex items-center justify-center">
              <TranslatedText text="Logo" />
            </div>
          )}
          <p className="text-sm leading-relaxed font-roboto mb-4 font-[300]">
            {siteDescription}
          </p>
          <a href="tel:0182350126" className="text-sm">
            <TranslatedText text="Tél." /> 01 82 35 01 26
          </a>{" "}
        </div>

        <div className="w-full">
          <h4 className="text-lg font-light mb-3">
            <TranslatedText text="À PROPOS" />
          </h4>
          <ul className="space-y-2 text-sm font-roboto">
            {aboutLinks.map((item) => (
              <li key={item.id}>
                <a href={item.url} className="duration-300 border-0 hover:border-b-2 hover:border-primary hover:text-primary hover:font-bold">
                  {item.title}
                </a>
              </li>
            ))}
            {aboutLinks.length === 0 && (
              <>
                <li>
                  <a href={paths.who} className="duration-300 border-0 hover:border-b-2 hover:border-primary hover:text-primary hover:font-bold">
                    <TranslatedText text="Qui sommes nous" />
                  </a>
                </li>
                <li>
                  <a href={paths.collection} className="duration-300 border-0 hover:border-b-2 hover:border-primary hover:text-primary hover:font-bold">
                    <TranslatedText text="Book Collection & Prestige" />
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="w-full">
          <h4 className="text-lg font-light mb-3">
            <TranslatedText text="PROFESSIONNEL" />
          </h4>
          <ul className="space-y-2 text-sm font-roboto">
            {proLinks.map((item) => (
              <li key={item.id}>
                <a href={item.url} className="duration-300 border-0 hover:border-b-2 hover:border-primary hover:text-primary hover:font-bold">
                  {item.title}
                </a>
              </li>
            ))}
            {proLinks.length === 0 && (
              <>
                <li>
                  <a href={paths.partenaire} className="duration-300 border-0 hover:border-b-2 hover:border-primary hover:text-primary hover:font-bold">
                    <TranslatedText text="Devenir partenaire" />
                  </a>
                </li>
                <li>
                  <a href={paths.referentiel} className="duration-300 border-0 hover:border-b-2 hover:border-primary hover:text-primary hover:font-bold">
                    <TranslatedText text="Référentiel de candidature" />
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="w-full">
          <h4 className="text-lg font-light mb-3">
            <TranslatedText text="NEWSLETTER" />
          </h4>
          <div className="bg-[#f4efe5] p-4 rounded">
            <label className="block text-sm mb-1 text-black">
              <TranslatedText text="Email" />
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 text-black px-2 py-1 rounded mb-3"
              placeholder={translateSync("Votre email")}
            />
            <label className="flex items-start text-xs text-black mb-3 gap-2">
              <input type="checkbox" className="mt-1" />
              <TranslatedText text="J'accepte l'inscription à la base de données Newsletter SPC." />
            </label>
            <button className="bg-black text-white w-full py-2 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
              <TranslatedText text="Valider" />
            </button>
            <div className="mt-4 text-center">
              <button className="bg-black text-white px-4 py-1 text-xs rounded-full hover:bg-gray-800 transition-colors">
                <TranslatedText text="Powered by" /> <strong>Mailjet</strong>
              </button>
            </div>
          </div>
          <div className="flex justify-center md:justify-start gap-2 mt-6 mb-4 text-white text-lg">
            {socialLinksFiltered.map((item) => {
              const IconComponent = iconMap[item.icon];
              if (!IconComponent) return null;
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 hover:bg-white p-1 rounded-full transition-colors font-light "
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-[#B6B498] text-base  text-black  font-roboto">
        <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row items-center justify-between">
          <p className="mb-2 md:mb-0">
            &copy; 2025 - 2026 – <TranslatedText text="Réalisation" />{" "}
            <span className="font-semibold">éCOM Design</span>
          </p>
          <div className="flex gap-4">
            <a href={paths.mentions} className="hover:underline">
              <TranslatedText text="Mentions légales" />
            </a>
            <span>•</span>
            <a href={paths.conditions} className="hover:underline">
              <TranslatedText text="CGV" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
