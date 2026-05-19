import React from "react";
import { TranslatedText } from "src/components/translated-text/translated-text";

const FONT = "Calibri, 'Segoe UI', sans-serif";

const IconEmail = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#b8955a"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
  </svg>
);

const IconGift = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#b8955a"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <rect x="3" y="8" width="18" height="14" rx="1" />
    <line x1="12" y1="8" x2="12" y2="22" />
    <path d="M12 8H7.5a2.5 2.5 0 010-5C11 3 12 8 12 8z" />
    <path d="M12 8h4.5a2.5 2.5 0 000-5C13 3 12 8 12 8z" />
    <rect x="3" y="5" width="18" height="3" rx="1" />
  </svg>
);

const IconShield = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#b8955a"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const badges = [
  {
    icon: <IconEmail />,
    title: "Envoi immédiat",
    desc: "Votre carte cadeau est envoyée par email, sans attente.",
  },
  {
    icon: <IconGift />,
    title: "Un large choix",
    desc: "Des expériences variées pour toutes les envies et tous les budgets.",
  },
  {
    icon: <IconShield />,
    title: "Valable 1 an",
    desc: "Une invitation à se détendre, utilisable pendant un an.",
  },
];

export default function CarteBadges() {
  return (
    <div
      className="w-full bg-white"
      style={{
        borderTop: "1px solid #f0ece4",
        borderBottom: "1px solid #f0ece4",
        fontFamily: FONT,
      }}
    >
      <div className="max-w-6xl mx-auto px-3 md:px-6">
        <div className="flex flex-row md:flex-row justify-between">
          {badges.map((badge, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 py-4 md:py-6 px-2 md:px-6 flex-1 text-center md:text-left">
                
                <div
                  className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#F3EBDD" }}
                >
                  {badge.icon}
                </div>

                <div>
                  <p
                    className="text-xs md:text-sm font-semibold text-gray-800 mb-1"
                    style={{ fontFamily: FONT }}
                  >
                    <TranslatedText text={badge.title} />
                  </p>

                  <p
                    className="hidden md:block text-xs text-gray-400 leading-relaxed"
                    style={{ fontFamily: FONT }}
                  >
                    <TranslatedText text={badge.desc} />
                  </p>
                </div>
              </div>

              {i < badges.length - 1 && (
                <div
                  className="hidden md:block w-px self-stretch"
                  style={{
                    backgroundColor: "#e8e4dc",
                    margin: "16px 0",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}