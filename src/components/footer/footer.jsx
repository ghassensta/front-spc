import React, { useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
} from "react-icons/fa";
import { paths } from "src/router/paths";
import { useLayout } from "src/actions/layout";
import { CONFIG } from "src/config-global";
import { useTranslation } from "src/context/translation-context";
import { Link } from "react-router-dom";

const iconMap = {
  "ti ti-brand-facebook": FaFacebookF,
  "ti ti-brand-instagram": FaInstagram,
  "ti ti-brand-tiktok": FaTiktok,
  "ti ti-brand-linkedin": FaLinkedinIn,
};

export default function Footer() {
  const { footer } = useLayout();
  const { translateSync } = useTranslation();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.mailjet.com/pas-nc-embedded-v1.js";
    script.type = "text/javascript";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!footer) return null;

  const { settings, footer_about, footer_pro, social_links } = footer;

  const siteLogoPath = settings?.site_logo?.value || "";
  const siteDescription =
    settings?.site_description?.value ||
    translateSync("Description par défaut du site.");

  const aboutLinks = Array.isArray(footer_about)
    ? footer_about.filter((i) => i.is_active).sort((a, b) => a.order - b.order)
    : [];

  const proLinks = Array.isArray(footer_pro)
    ? footer_pro.filter((i) => i.is_active).sort((a, b) => a.order - b.order)
    : [];

  const socialLinksFiltered = Array.isArray(social_links)
    ? social_links.filter((i) => i.is_active).sort((a, b) => a.order - b.order)
    : [];

  return (
    <footer className="bg-secondary text-white pt-8 md:pt-12 left-[calc(-50vw+50%)] relative w-screen font-roboto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-10 md:gap-2 lg:gap-8 md:py-12">

        <div className="text-center flex flex-col items-center mx-auto lg:mr-12">
          {siteLogoPath ? (
            <img
              src={`${CONFIG.serverUrl}/storage/${siteLogoPath}`}
              alt={translateSync("SPC Logo")}
              className="w-32 md:w-60 mb-4 block"
              width={150}
            />
          ) : (
            <div className="w-24 h-24 bg-gray-600 mb-4 rounded-full flex items-center justify-center">
              {translateSync("Logo")}
            </div>
          )}
          <p className="text-sm leading-relaxed font-[300] mb-4">
            {siteDescription}
          </p>
          <a href="tel:0182350126" className="text-sm">
            {translateSync("Tél.")} 01 82 35 01 26
          </a>
        </div>

        <div className="w-full">
          <h4 className="text-lg font-light mb-3">
            {translateSync("À PROPOS")}
          </h4>
          <ul className="space-y-2 text-sm">
            {aboutLinks.length
              ? aboutLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.url}
                    className="hover:border-b-2 hover:border-primary hover:text-primary hover:font-bold duration-300"
                  >
                    {translateSync(item.title)}
                  </Link>
                </li>
              ))
              : null}
          </ul>
        </div>

        {/* Professionnel */}
        <div className="w-full">
          <h4 className="text-lg font-light mb-3">
            {translateSync("PROFESSIONNEL")}
          </h4>
          <ul className="space-y-2 text-sm">
            {proLinks.length
              ? proLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.url}
                    className="hover:border-b-2 hover:border-primary hover:text-primary hover:font-bold duration-300"
                  >
                    {translateSync(item.title)}
                  </Link>
                </li>
              ))
              : null}
          </ul>
        </div>

        <div className="w-full">
          <h4 className="text-lg font-light mb-3">
            {translateSync("NEWSLETTER")}
          </h4>

          <div className="bg-[#f4efe5] p-4 rounded overflow-hidden">
            <iframe
              data-w-type="embedded"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://srm3t.mjt.lu/wgt/srm3t/0wp5/form?c=31298976"
              style={{ width: "100%", height: "0" }}
              title="Mailjet Newsletter"
            />
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
                  className="hover:text-gray-900 hover:bg-white p-1 rounded-full transition-colors"
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-[#B6B498] text-base text-black">
        <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row items-center justify-between">
          <p>
            &copy; 2025 - 2026 – {translateSync("Réalisation")}{" "}
            <span className="font-semibold">éCOM Design</span>
          </p>
          <div className="flex gap-4 items-center">
            <a href={paths.mentions} className="hover:underline">
              {translateSync("Mentions légales")}
            </a>
            <span>•</span>
            <a href={paths.conditions} className="hover:underline">
              {translateSync("CGV")}
            </a>
            <span>•</span>
            <a href={CONFIG.serverUrl} target="_blank" className="hover:underline">
              {translateSync("Admin")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
