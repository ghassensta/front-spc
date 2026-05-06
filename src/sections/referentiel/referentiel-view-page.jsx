import React from "react";
import { Link } from "react-router-dom";
import { paths } from "src/router/paths";
import theImageWeb from "src/assets/images/referentiel-de-candidature.webp";
import theImageMobile from "src/assets/images/referentiel-de-candidature.png";
import theImage2 from "src/assets/images/SPC-Catalogue-1975x1318-1.jpg";
import { useTranslation } from "src/context/translation-context";
import {
  FaLeaf,
  FaUserFriends,
  FaBed,
  FaShieldAlt,
  FaStar,
  FaLock,
  FaSeedling,
  FaUsers,
} from "react-icons/fa";

export default function ReferentielViewPage() {
  const { translateSync } = useTranslation();

  const criteria = [
    {
      icon: <FaLeaf />,
      title: "Atmosphère & Ambiance",
      description:
        "Un cadre apaisant, une décoration soignée, une lumière et une atmosphère propices à la détente et au ressourcement.",
    },
    {
      icon: <FaStar />,
      title: "Qualité des Soins & Prestations",
      description:
        "Des soins d'excellence, des protocoles maîtrisés et des prestations uniques, adaptées à chaque client.",
    },
    {
      icon: <FaBed />,
      title: "Installations & Aménagements",
      description:
        "Des espaces modernes, accessibles et parfaitement entretenus pour une expérience de bien-être optimale.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Hygiène & Propreté",
      description:
        "Une hygiène irréprochable et un entretien rigoureux pour garantir un environnement sain et serein.",
    },
    {
      icon: <FaUserFriends />,
      title: "Service Client & Expérience",
      description:
        "Un accueil chaleureux, un service réactif et une expérience personnalisée à chaque étape du parcours client.",
    },
    {
      icon: <FaLock />,
      title: "Confidentialité & Respect de l'intimité",
      description:
        "Le respect de l'intimité et la confidentialité des clients à chaque instant de leur expérience.",
    },
    {
      icon: <FaSeedling />,
      title: "Démarche Durable & Responsable",
      description:
        "Des engagements concrets pour limiter l'impact environnemental et promouvoir le bien-être durable.",
    },
    {
      icon: <FaUsers />,
      title: "Équipe & Savoir-faire",
      description:
        "Une équipe qualifiée, bienveillante et engagée, passionnée par l'art du bien-être.",
    },
  ];

  // Split into two columns of 4
  const col1 = criteria.slice(0, 4);
  const col2 = criteria.slice(4, 8);

  return (
    <div>
      <div
        className="hidden md:block w-full h-96 bg-center bg-cover relative"
        style={{ backgroundImage: `url(${theImageWeb})` }}
      >
        <div className="absolute inset-0" />

        {/* Tous les textes alignés à gauche */}
        <div className="absolute inset-0 flex items-center px-10 md:px-16">
          <div className="flex flex-col gap-3 max-w-lg">
            {/* Label */}
            <p
              className="text-xs uppercase tracking-widest"
              style={{
                color: "#b8955a",
                letterSpacing: "0.2em",
                fontFamily: "Calibri, 'Segoe UI', sans-serif",
              }}
            >
              {translateSync("Référentiel de candidature")}
            </p>

            {/* Titre */}
            <h1
              className="text-gray-900 leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                fontWeight: 400,
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
              }}
            >
              {translateSync("Rejoignez l'excellence")}
              <br />
              {translateSync("Spa & Prestige Collection")}
            </h1>

            {/* Séparateur doré */}
            <div
              className="w-10 h-0.5"
              style={{ backgroundColor: "#b8955a" }}
            />

            {/* Description */}
            <p
              className="text-gray-700 leading-relaxed"
              style={{
                fontSize: "0.9rem",
                fontFamily: "Calibri, 'Segoe UI', sans-serif",
              }}
            >
              {translateSync(
                "Notre référentiel de candidature définit les critères d'excellence attendus pour intégrer notre collection. ",
              )}
              <strong className="text-gray-900">
                {translateSync("Il garantit une expérience")}
              </strong>
              {translateSync(
                " cliente d'exception et une qualité cohérente au sein de notre réseau.",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Hero mobile */}
      <div className="md:hidden px-4 pt-8 pb-4">
        <p
          className="text-xs uppercase tracking-widest mb-3"
          style={{
            color: "#b8955a",
            letterSpacing: "0.2em",
            fontFamily: "Calibri, 'Segoe UI', sans-serif",
          }}
        >
          {translateSync("Référentiel de candidature")}
        </p>
        <h1
          className="text-gray-900 mb-3"
          style={{
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontWeight: 400,
            fontSize: "2rem",
            lineHeight: 1.25,
          }}
        >
          {translateSync("Rejoignez l'excellence Spa & Prestige Collection")}
        </h1>
        <div
          className="w-10 h-0.5 mb-4"
          style={{ backgroundColor: "#b8955a" }}
        />
        <img
          src={theImageMobile}
          alt=""
          className="w-full rounded mb-4 object-cover h-48"
        />
        <p
          className="text-gray-700 leading-relaxed"
          style={{
            fontSize: "0.875rem",
            fontFamily: "Calibri, 'Segoe UI', sans-serif",
          }}
        >
          {translateSync(
            "Notre référentiel de candidature définit les critères d'excellence attendus pour intégrer notre collection. ",
          )}
          <strong className="text-gray-900">
            {translateSync("Il garantit une expérience")}
          </strong>
          {translateSync(
            " cliente d'exception et une qualité cohérente au sein de notre réseau.",
          )}
        </p>
      </div>

      {/* ── Section critères ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1">
          {translateSync("Les critères d'évaluation")}
        </h2>
        {/* ligne décorative */}
        <div className="w-8 h-0.5 bg-[#c4c0a1] mb-8" />

        {/* Desktop : 2 colonnes */}
        <div className="hidden md:grid grid-cols-2 gap-x-12 gap-y-8">
          {[col1, col2].map((col, ci) =>
            col.map((item, i) => {
              const num = ci * 4 + i + 1;
              return (
                <div key={num} className="flex items-start gap-4">
                  {/* icône */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F3EBDD] shrink-0 mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {/* numéro cerclé */}
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ backgroundColor: "#c4c0a1" }}
                      >
                        {num}
                      </span>
                      <h3 className="text-base font-semibold text-gray-800">
                        {translateSync(item.title)}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {translateSync(item.description)}
                    </p>
                  </div>
                </div>
              );
            }),
          )}
        </div>

        {/* Mobile : liste verticale avec chevron */}
        <div className="md:hidden divide-y divide-gray-100">
          {criteria.map((item, i) => (
            <div key={i} className="flex items-center gap-4 py-4">
              <div className="shrink-0 text-[#c4c0a1] text-xl w-8 flex justify-center">
                {item.icon}
              </div>
              <div className="flex items-center gap-2 flex-1">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: "#c4c0a1" }}
                >
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  {translateSync(item.title)}
                </span>
              </div>
              <span className="text-gray-400 text-lg">›</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Modalités d'adhésion ── */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)] py-10"
        style={{ backgroundColor: "#FBF6EC" }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Texte + boutons */}
          <div>
            <div className="flex items-start gap-4 mb-4">
              {/* icône document */}
              <div
                className="shrink-0 w-10 h-10 rounded flex items-center justify-center text-white text-lg"
                style={{ backgroundColor: "#c4c0a1" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {translateSync("Modalités d'adhésion")}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {translateSync(
                    "Les établissements souhaitant rejoindre Spa & Prestige Collection doivent fournir une documentation détaillée attestant de leur conformité à ces critères (certifications, photos, descriptifs, etc.). Chaque candidature est étudiée avec soin par notre équipe.",
                  )}
                </p>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              {/* DEVENIR PARTENAIRE — NOIR */}
              <Link
                to={paths.partenaire}
                className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-wider text-white transition-colors"
                style={{
                  backgroundColor: "#1a1a1a",
                  letterSpacing: "0.08em",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#333")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1a1a1a")
                }
              >
                {translateSync("Devenir partenaire")}
              </Link>

              {/* NOUS CONTACTER — bordure */}
              <Link
                to={paths.contact}
                className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-colors border-2"
                style={{
                  borderColor: "#1a1a1a",
                  color: "#1a1a1a",
                  backgroundColor: "transparent",
                  letterSpacing: "0.08em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1a1a1a";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#1a1a1a";
                }}
              >
                {translateSync("Nous contacter")}
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="hidden md:block">
            <img
              loading="lazy"
              src={theImage2}
              alt={translateSync("Spa & Prestige Collection")}
              className="w-full rounded shadow-md object-cover"
              style={{ maxHeight: "280px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
