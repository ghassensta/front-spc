import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "src/context/translation-context";
import UniversalSpinner from "src/components/universal-spinner/universal-spinner";
import { paths } from "src/router/paths";
import ButtonIcon from "src/components/button-icon/button-icon";
import { FaUserCheck, FaTrophy, FaLink } from "react-icons/fa";

const experiences = [
  {
    tag: "Soins Visage",
    title: "Soins visage professionnels et expertise esthétique",
    description:
      "Profitez de soins visage réalisés par des experts pour une expérience spa personnalisée et haut de gamme.",
    ctas: [
      { label: "Découvrir les soins visage", to: paths.categories("visage") },
    ],
  },
  {
    tag: "Soins Corps",
    title: "Soins corps et rituels sensoriels",
    description:
      "Massages, enveloppements et rituels holistiques pour une détente complète du corps et de l'esprit.",
    ctas: [
      { label: "Soins corps", to: paths.categories("corps") },
      { label: "Rituels bien-être", to: paths.categories("rituels") },
    ],
  },
  {
    tag: "Séjours",
    title: "Séjours spa et escapades détente",
    description:
      "Vivez des séjours bien-être complets, combinant hébergement, soins et moments de relaxation.",
    ctas: [{ label: "Découvrir les séjours", to: paths.categories("sejours") }],
  },
  {
    tag: "Gastronomie",
    title: "Gastronomie et bien-être",
    description:
      "Associez spa et gastronomie pour des expériences sensorielles inoubliables.",
    ctas: [
      {
        label: "Découvrir les offres restauration",
        to: paths.categories("restauration"),
      },
    ],
  },
  {
    tag: "Carte Cadeau",
    title: "Offrir une expérience bien-être avec la carte cadeau",
    description:
      "La carte cadeau SPC permet d'offrir une expérience personnalisée, incluant soins, séjours et gastronomie, idéale pour un cadeau unique.",
    ctas: [{ label: "Découvrir notre carte cadeau", to: paths.cadeau }],
  },
  {
    tag: "Explorer",
    title: "Explorer toutes les expériences spa et bien-être",
    description:
      "Grâce à nos contenus et pages spécialisées, explorez toutes les thématiques du spa et du bien-être : soins visage et corps, rituels, séjours, escapades et gastronomie.",
    ctas: [],
  },
];

function ExperienceCard({ tag, title, description, ctas }) {
  const { translateSync } = useTranslation();

  return (
    <div className="flex flex-col items-center text-center px-4 py-6">
      <p
        className="text-xl uppercase tracking-widest mb-1 font-semibold"
        style={{ color: "#C7B892" }}
      >
        {translateSync(tag)}
      </p>
      <h3 className="text-xl font-bold mb-3" style={{ color: "#1a1a1a" }}>
        {translateSync(title)}
      </h3>
      <p className="font-tahoma text-base mb-4" style={{ color: "#555" }}>
        {translateSync(description)}
      </p>
      {ctas.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mt-auto">
          {ctas.map((cta, i) => {
            return cta.to && cta.to.startsWith("/") ? (
              <Link
                key={i}
                to={cta.to}
                className="flex items-center gap-2 text-lg font-semibold transition-all hover:gap-3"
                style={{ color: "#C7B892", textDecoration: "none" }}
              >
                <FaLink size={14} />
                {translateSync(cta.label)}
              </Link>
            ) : (
              <a
                key={i}
                href={cta.to}
                className="flex items-center gap-2 text-lg font-semibold transition-all hover:gap-3"
                style={{ color: "#C7B892", textDecoration: "none" }}
              >
                <FaLink size={14} />
                {translateSync(cta.label)}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TagItem({ label, slug, onClick }) {
  const [hovered, setHovered] = useState(false);
  const { translateSync } = useTranslation();

  return (
    <span
      onClick={() => onClick(slug)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="px-4 py-2 text-xs cursor-pointer transition-all duration-300 text-center block font-tahoma"
      style={{
        border: `1px solid ${hovered ? "#C7B892" : "#d0c8bc"}`,
        color: hovered ? "#C7B892" : "#555",
        background: hovered ? "#FBF6EC" : "#fff",
        transform: hovered ? "translateY(-1px)" : "none",
      }}
    >
      {translateSync(label)}
    </span>
  );
}

export default function PageSeoSList({ pageseo, pageseoLoading }) {
  const navigate = useNavigate();
  const { translateSync } = useTranslation();

  const handleTagClick = (slug) => {
    navigate(`${paths.pageseo.show(slug)}`);
  };

  if (pageseoLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <UniversalSpinner size="lg" text={translateSync("Chargement...")} />
      </div>
    );
  }

  // Construire les tags depuis pageseo (données API)
  const dynamicTags = Array.isArray(pageseo)
    ? pageseo.map((page) => ({
        label: page.titre_hero || page.meta_title || `Page ${page.id}`,
        slug: page.slug || String(page.id),
      }))
    : [];

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] mb-4">
        <div className="flex flex-col justify-center gap-4 max-w-6xl mx-auto px-4 py-10 text-center w-full md:w-3/5">
          <p
            className="text-4xl uppercase tracking-widest font-semibold"
            style={{ color: "#C7B892", letterSpacing: "0.23em" }}
          >
            {translateSync("Spa & Prestige Collection")}
          </p>
          <h1 className="text-3xl font-bold" style={{ color: "#1a1a1a" }}>
            {translateSync(
              "La référence des spas et établissements bien-être d'exception",
            )}
          </h1>
          <p className="font-tahoma text-center" style={{ color: "#555" }}>
            {translateSync(
              "Spa Prestige Collection sélectionne les meilleurs établissements spa et hôtels bien-être, alliant qualité des soins, environnement privilégié et hospitalité haut de gamme. Découvrez nos partenaires et spas soigneusement sélectionnés pour offrir des expériences de détente et d'évasion uniques.",
            )}
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link
              to={paths.spa.list}
              className="flex items-center gap-2 text-xl font-semibold"
              style={{ color: "#C7B892", textDecoration: "none" }}
            >
              <FaUserCheck size={18} />
              {translateSync("Établissements")}
            </Link>

            <Link
              to={paths.categories("spa")}
              className="flex items-center gap-2 text-xl font-semibold"
              style={{ color: "#C7B892", textDecoration: "none" }}
            >
              <FaTrophy size={18} />
              {translateSync("Spas")}
            </Link>
          </div>
        </div>
      </div>

      {/* ── EXPÉRIENCES ── */}
      <div className="bg-white w-screen relative left-[calc(-50vw+50%)] mb-4 px-4 py-8">
        <h2 className="text-4xl mb-4 font-bold text-center">
          {translateSync(
            "Des expériences bien-être uniques : soins, rituels, séjours et gastronomie",
          )}
        </h2>
        <p
          className="font-tahoma text-center mb-10 w-full md:w-1/2 mx-auto"
          style={{ color: "#555" }}
        >
          {translateSync(
            "Plongez dans l'univers du spa et du bien-être à travers nos pages thématiques. Des contenus soigneusement conçus pour inspirer, informer et mettre en valeur les établissements.",
          )}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} {...exp} />
          ))}
        </div>
      </div>

      {/* ── RÉFÉRENTIEL & PARTENAIRE ── */}
      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] mb-4 px-4 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              {translateSync("Découvrir le référentiel et devenir partenaire")}
            </h2>
            <p className="font-tahoma mb-6" style={{ color: "#555" }}>
              {translateSync(
                "Les établissements souhaitant rejoindre Spa Prestige Collection sont évalués selon un référentiel exigeant, garantissant qualité et expérience client premium.",
              )}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to={paths.referentiel}
                className="flex items-center gap-2 text-lg font-semibold transition-all hover:gap-3"
                style={{ color: "#C7B892", textDecoration: "none" }}
              >
                <FaLink size={14} />
                {translateSync("Notre référentiel candidature")}
              </Link>
              <Link
                to={paths.partenaire}
                className="flex items-center gap-2 text-lg font-semibold transition-all hover:gap-3"
                style={{ color: "#C7B892", textDecoration: "none" }}
              >
                <FaLink size={14} />

                {translateSync("Devenir partenaire")}
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">
              {translateSync(
                "Solutions bien-être pour entreprises et comités d'entreprise",
              )}
            </h2>
            <p className="font-tahoma mb-6" style={{ color: "#555" }}>
              {translateSync(
                "Offrez à vos collaborateurs ou clients des expériences bien-être sur mesure, grâce à nos solutions dédiées aux entreprises et comités d'entreprise.",
              )}
            </p>
            <Link
              to={paths.solutions}
              className="flex items-center gap-2 text-lg font-semibold transition-all hover:gap-3"
              style={{ color: "#C7B892", textDecoration: "none" }}
            >
              <FaLink size={14} />
              {translateSync("Découvrir les solutions CE")}
            </Link>
          </div>
        </div>
      </div>

      {/* ── MARQUE PARTENAIRE ── */}
      <div className="bg-white w-screen relative left-[calc(-50vw+50%)] mb-4 px-4 py-10">
        <div className="max-w-6xl mx-auto text-center w-full md:w-1/2 flex flex-col items-center gap-4">
          <h2 className="text-3xl font-bold">
            {translateSync(
              "Une marque partenaire engagée dans la valorisation du spa et du bien-être",
            )}
          </h2>
          <p className="font-tahoma" style={{ color: "#555" }}>
            {translateSync(
              "La marque partenaire SPC met en lumière les acteurs du spa et du bien-être, garantissant visibilité et reconnaissance pour les établissements d'exception.",
            )}
          </p>
          <Link
            to={paths.partenaire}
            className="flex items-center gap-2 text-lg font-semibold transition-all hover:gap-3"
            style={{ color: "#C7B892", textDecoration: "none" }}
          >
            <FaLink size={14} />
            {translateSync("Découvrir comment devenir une marque partenaire")}
          </Link>
        </div>
      </div>

      {/* ── THÉMATIQUES DYNAMIQUES — NE PAS TOUCHER ── */}
      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] px-4 py-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">
            {translateSync("Thématiques & Ressources")}
          </h2>
          <p className="font-tahoma text-sm mb-8" style={{ color: "#888" }}>
            {dynamicTags.length} {translateSync("page")}
            {dynamicTags.length > 1 ? translateSync("s") : ""}{" "}
            {translateSync("disponible")}
            {dynamicTags.length > 1 ? translateSync("s") : ""}
          </p>

          {dynamicTags.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
              {dynamicTags.map((tag, i) => (
                <TagItem
                  key={i}
                  label={tag.label}
                  slug={tag.slug}
                  onClick={handleTagClick}
                />
              ))}
            </div>
          ) : (
            <p className="font-tahoma text-sm" style={{ color: "#888" }}>
              {translateSync("Aucune thématique disponible pour le moment.")}
            </p>
          )}
        </div>
      </div>

      {/* ── FOOTER CTA ── */}
      <div className="w-full flex items-center justify-center py-10">
        <ButtonIcon
          title={translateSync("COUP DE CŒUR")}
          link={paths.spa.list}
        />
      </div>
    </div>
  );
}
