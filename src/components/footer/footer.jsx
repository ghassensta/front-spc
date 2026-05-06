import React, { useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaPhone,
  FaChevronRight,
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

const GOLD = "#b8955a";

export default function Footer() {
  const { footer } = useLayout();
  const { translateSync } = useTranslation();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.mailjet.com/pas-nc-embedded-v1.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
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

  // Séparateur vertical doré
  const VDivider = () => (
    <div
      className="hidden md:block self-stretch w-px opacity-30 shrink-0"
      style={{ backgroundColor: GOLD }}
    />
  );

  return (
    <footer
      className="text-white pt-8 md:pt-12 left-[calc(-50vw+50%)] relative w-screen"
      style={{ backgroundColor: "#1e1e1e", fontFamily: "Calibri, 'Segoe UI', sans-serif" }}
    >
      {/* ── 4 colonnes avec séparateurs verticaux ── */}
      <div className="max-w-6xl mx-auto px-6 md:py-12">
        <div className="grid grid-cols-1 md:flex md:flex-row gap-10 md:gap-0">

          {/* Colonne 1 : Logo + description + tel */}
          <div className="flex flex-col items-center text-center md:pr-8" style={{ minWidth: 0, flex: "1 1 0" }}>
            {siteLogoPath ? (
              <img
                src={`${CONFIG.serverUrl}/storage/${siteLogoPath}`}
                alt={translateSync("SPC Logo")}
                className="w-32 md:w-44 mb-5 block"
                width={150}
              />
            ) : (
              <div className="w-24 h-24 bg-gray-600 mb-4 rounded-full flex items-center justify-center">
                {translateSync("Logo")}
              </div>
            )}
            <p className="text-sm leading-relaxed font-light mb-5 text-gray-300">
              {siteDescription}
            </p>
            <div className="w-8 h-0.5 mb-5" style={{ backgroundColor: GOLD }} />
            <a
              href="tel:0182350126"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <FaPhone className="text-xs" style={{ color: GOLD }} />
              {translateSync("Tél.")} 01 82 35 01 26
            </a>
          </div>

          <VDivider />

          {/* Colonne 2 : À PROPOS */}
          <div className="md:px-8" style={{ minWidth: 0, flex: "1 1 0" }}>
            <h4
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: GOLD, letterSpacing: "0.15em" }}
            >
              {translateSync("À PROPOS")}
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {aboutLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.url}
                    className="flex items-center justify-between group hover:text-white transition-colors"
                  >
                    <span>{translateSync(item.title)}</span>
                    <FaChevronRight className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: GOLD }} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <VDivider />

          {/* Colonne 3 : PROFESSIONNEL */}
          <div className="md:px-8" style={{ minWidth: 0, flex: "1 1 0" }}>
            <h4
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: GOLD, letterSpacing: "0.15em" }}
            >
              {translateSync("PROFESSIONNEL")}
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {proLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.url}
                    className="flex items-center justify-between group hover:text-white transition-colors"
                  >
                    <span>{translateSync(item.title)}</span>
                    <FaChevronRight className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: GOLD }} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <VDivider />

          {/* Colonne 4 : NEWSLETTER */}
          <div className="md:pl-8" style={{ minWidth: 0, flex: "1 1 0" }}>
            <h4
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: GOLD, letterSpacing: "0.15em" }}
            >
              {translateSync("NEWSLETTER")}
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {translateSync("Recevez nos actualités et profitez de 10 € offerts sur votre première commande.")}
            </p>
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
          </div>

        </div>
      </div>

      {/* ── SUIVEZ-NOUS — pleine largeur, centré ── */}
      <div className="w-full px-6 pb-8">
        <hr style={{ borderColor: GOLD, borderTopWidth: "1px", opacity: 0.4, marginBottom: "1.5rem" }} />
        <p
          className="text-xs uppercase tracking-widest text-center mb-4"
          style={{ color: GOLD, letterSpacing: "0.2em" }}
        >
          {translateSync("SUIVEZ-NOUS")}
        </p>
        <div className="flex justify-center gap-4">
          {socialLinksFiltered.map((item) => {
            const IconComponent = iconMap[item.icon];
            if (!IconComponent) return null;
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ border: `1px solid ${GOLD}`, color: GOLD }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = GOLD;
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = GOLD;
                }}
              >
                <IconComponent />
              </a>
            );
          })}
        </div>
      </div>

      {/* ── Barre du bas ── */}
      <div className="text-sm text-black" style={{ backgroundColor: "#B6B498" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <a href="https://www.ecom-design.fr/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            &copy; 2025 - 2026 – {translateSync("Réalisation")}{" "}
            <span className="font-semibold">éCOM Design</span>
          </a>
          <div className="flex gap-4 items-center">
            <a href={paths.mentions} className="hover:underline">{translateSync("Mentions légales")}</a>
            <span>•</span>
            <a href={paths.conditions} className="hover:underline">{translateSync("CGV")}</a>
            <span>•</span>
            <a href={CONFIG.serverUrl} target="_blank" className="hover:underline">{translateSync("Admin")}</a>
          </div>
        </div>
      </div>

    </footer>
  );
}