import React from "react";
import { useGetHomePage } from "src/actions/homepage";
import { CONFIG } from "src/config-global";
import { useTranslation } from "src/context/translation-context";
import { FaGift } from "react-icons/fa";
import defaultBackground from "../../../assets/images/SPC-fond-beige-4.webp";
import {
  MdCheckCircleOutline,
  MdOutlineEmail,
  MdOutlineStarBorder,
} from "react-icons/md";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";

const Section3 = () => {
  const { sections } = useGetHomePage();
  const { translateSync } = useTranslation();

  const section = sections?.find((s) => s.key === "section3");
  if (!section) return null;

  const badges = [
    {
      icon: <MdCheckCircleOutline className="text-lg shrink-0 text-gray-900" />,
      label: "Valable 1 an",
    },
    {
      icon: <MdOutlineEmail className="text-lg shrink-0 text-gray-900" />,
      label: "Envoi immédiat",
    },
    {
      icon: <MdOutlineStarBorder className="text-lg shrink-0 text-gray-900" />,
      label: "Utilisable dans nos établissements",
    },
  ];

  return (
    <div
      className="w-screen relative left-[calc(-50vw+50%)] overflow-hidden"
      style={{
        background: `url(${defaultBackground}) center/cover no-repeat`,
        backgroundColor: "#f5f0e8",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center gap-8">
        {/* ── Colonne gauche : texte ── */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left items-center md:items-start">
          {/* Titre + label doré */}
          <div>
            <h2
              className="text-gray-900 leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              }}
            >
              {translateSync(section.title)}
            </h2>
            {section.extra_data?.sousTitre && (
              <p
                className="text-xs uppercase tracking-widest mt-1"
                style={{
                  color: GOLD,
                  letterSpacing: "0.18em",
                  fontFamily: FONT,
                }}
              >
                {translateSync(section.extra_data.sousTitre)}
              </p>
            )}
          </div>

          {/* Séparateur doré */}
          <div className="w-10 h-0.5" style={{ backgroundColor: GOLD }} />

          {/* Description principale */}
          <p
            className="text-gray-800 leading-snug"
            style={{
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
              fontWeight: 400,
              fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
            }}
          >
            {translateSync(section.description)}
          </p>

          {/* Sous-description */}
          {section.sous_descriptions && (
            <p
              className="text-sm text-gray-600 leading-relaxed"
              style={{ fontFamily: FONT }}
              dangerouslySetInnerHTML={{
                __html: translateSync(section.sous_descriptions),
              }}
            />
          )}

          {/* Bouton */}
          {section.button_text && (
            <a
              href={section.button_url}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider text-white transition-colors w-fit"
              style={{
                backgroundColor: "#1a1a1a",
                fontFamily: FONT,
                letterSpacing: "0.1em",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#333")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#1a1a1a")
              }
            >
              <FaGift style={{ color: GOLD }} />
              {translateSync(section.button_text)}
            </a>
          )}

          {/* ── Badges ── */}
          <div className="mt-2">
            {/* Desktop — une ligne avec séparateurs */}
            <div className="hidden md:flex items-center">
              <div
                className="flex items-center gap-2 text-xs text-gray-500 pr-4"
                style={{ fontFamily: FONT }}
              >
                <MdCheckCircleOutline className="text-lg shrink-0 text-gray-900" />
                <span className="whitespace-nowrap">
                  {translateSync("Valable 1 an")}
                </span>
              </div>
              <div
                className="w-px h-5 shrink-0"
                style={{ backgroundColor: GOLD }}
              />
              <div
                className="flex items-center gap-2 text-xs text-gray-500 px-4"
                style={{ fontFamily: FONT }}
              >
                <MdOutlineEmail className="text-lg shrink-0 text-gray-900" />
                <span className="whitespace-nowrap">
                  {translateSync("Envoi immédiat")}
                </span>
              </div>
              <div
                className="w-px h-5 shrink-0"
                style={{ backgroundColor: GOLD }}
              />
              <div
                className="flex items-center gap-2 text-xs text-gray-500 pl-4"
                style={{ fontFamily: FONT }}
              >
                <MdOutlineStarBorder className="text-lg shrink-0 text-gray-900" />
                <span className="whitespace-nowrap">
                  {translateSync("Utilisable dans nos établissements")}
                </span>
              </div>
            </div>

            {/* Mobile — centré, flex-wrap */}
            <div className="flex md:hidden justify-center gap-4 flex-wrap">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-xs text-gray-500"
                  style={{ fontFamily: FONT }}
                >
                  {b.icon}
                  <span>{translateSync(b.label)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Colonne droite : image ── */}
        <div className="w-full md:w-1/2 flex justify-center">
          {section.image && (
            <div className="w-full max-h-80 rounded-xl overflow-hidden">
              <img
                src={`${CONFIG.serverUrl}${section.image}`}
                alt={translateSync(section.title)}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section3;
