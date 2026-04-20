import React, { useState } from "react";
import { CONFIG } from "src/config-global";
import UniversalSpinner from "src/components/universal-spinner/universal-spinner";
import { useTranslation } from "src/context/translation-context";
import { Link } from "react-router-dom";
import { paths } from "src/router/paths";
import ButtonIcon from "src/components/button-icon/button-icon";
import { FaLink } from "react-icons/fa";

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  const { translateSync } = useTranslation();

  return (
    <div
      className="border-b transition-all duration-300"
      style={{ borderColor: "#e0d8cc" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span
          className="text-base font-semibold pr-8"
          style={{ color: "#1a1a1a" }}
        >
          {translateSync(question)}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 text-xl font-bold"
          style={{
            color: "#C7B892",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div className="pb-5 pr-10">
          <p
            className="font-tahoma text-sm leading-relaxed"
            style={{ color: "#555" }}
          >
            {translateSync(answer)}
          </p>
        </div>
      )}
    </div>
  );
}

export default function PageSeoShow({ pageseo, pageseoLoading }) {
  const { translateSync } = useTranslation();

  if (pageseoLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <UniversalSpinner size="lg" text={translateSync("Chargement...")} />
      </div>
    );
  }

  if (!pageseo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="font-tahoma" style={{ color: "#888" }}>
          {translateSync("Page introuvable.")}
        </p>
      </div>
    );
  }

  const {
    titre_hero,
    image_ouverture,
    sections = [],
    faq_json = [],
    cta_final_label,
    cta_final_url,
  } = pageseo;

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] mb-4">
        <div className="relative max-w-6xl mx-auto px-4 py-10">
          {/* Bouton retour */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm font-semibold mb-6 transition-all duration-300 hover:gap-3"
            style={{ color: "#C7B892" }}
          >
            ← {translateSync("Retour")}
          </button>

          <div className="text-center w-full md:w-3/5 mx-auto flex flex-col gap-4">
            <p
              className="text-4xl uppercase tracking-widest font-semibold"
              style={{ color: "#C7B892" }}
            >
              {translateSync("Spa & Prestige Collection")}
            </p>
            <h1 className="text-4xl font-bold" style={{ color: "#1a1a1a" }}>
              {translateSync(titre_hero)}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* ── IMAGE D'OUVERTURE ── */}
        {image_ouverture && (
          <div
            className="overflow-hidden"
            style={{ border: "1px solid #e0d8cc" }}
          >
            <img
              src={`${CONFIG.serverUrl}/storage/${image_ouverture}`}
              alt={translateSync(titre_hero)}
              className="w-full object-cover"
              style={{ maxHeight: "480px", display: "block" }}
            />
          </div>
        )}

        {/* ── SECTIONS TEXTE + BOUTON ── */}
        {sections.map((section, index) => (
          <div key={section.id}>
            <div
              className="prose max-w-none font-tahoma text-base leading-relaxed mb-6"
              style={{ color: "#333" }}
              dangerouslySetInnerHTML={{
                __html: translateSync(section.content_text),
              }}
            />

            {section.button_label && section.button_url && (
              <div className="flex justify-center mt-6">
                <a
                  href={section.button_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3 text-base font-semibold rounded-full transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: "#C7B892",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#b5a480")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#C7B892")
                  }
                >
                  {translateSync(section.button_label)}
                </a>
              </div>
            )}

            {index < sections.length - 1 && (
              <div
                className="mt-10"
                style={{ borderBottom: "1px solid #e0d8cc" }}
              />
            )}
          </div>
        ))}

        {faq_json && faq_json.length > 0 && (
          <div>
            <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] px-4 py-10 mb-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold mb-2 text-center">
                  {translateSync("Questions fréquentes")}
                </h2>
                <p
                  className="font-tahoma text-center mb-8"
                  style={{ color: "#555" }}
                >
                  {translateSync("FAQ")}
                </p>
                <div
                  className="bg-white max-w-3xl mx-auto"
                  style={{ border: "1px solid #e0d8cc", padding: "0 2rem" }}
                >
                  {faq_json.map((item, i) => (
                    <FaqItem
                      key={i}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── FOOTER CTA BANNER ── */}
      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] px-4 py-10">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center gap-4">
          <h2 className="text-3xl font-bold" style={{ color: "#1a1a1a" }}>
            {translateSync("Réservez Votre Expérience Premium")}
          </h2>
          <p className="font-tahoma text-sm" style={{ color: "#888" }}>
            {translateSync("Carte cadeau valable partout")} &nbsp;|&nbsp;
            {translateSync("Offres flash")} &nbsp;|&nbsp;
            {translateSync("Produits exclusifs")} &nbsp;|&nbsp;
            {translateSync("+10 nouveaux spas par mois")}
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <a
              href={cta_final_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg font-semibold transition-all hover:gap-3"
              style={{ color: "#C7B892", textDecoration: "none" }}
            >
              <FaLink size={14} />
              {translateSync(cta_final_label)}
            </a>
            <Link
              to={paths.cadeau}
              className="flex items-center gap-2 text-lg font-semibold transition-all hover:gap-3"
              style={{ color: "#C7B892", textDecoration: "none" }}
            >
              <FaLink size={14} />
              {translateSync("Offrir une carte cadeau")}
            </Link>
          </div>
        </div>
      </div>

      {/* ── BOUTON COUP DE CŒUR ── */}
      <div className="w-full flex items-center justify-center py-10">
        <ButtonIcon
          title={translateSync("COUP DE CŒUR")}
          link={paths.spa.list}
        />
      </div>
    </div>
  );
}
