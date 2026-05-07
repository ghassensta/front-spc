import React, { useEffect } from "react";
import {
  FaShoppingCart,
  FaTrophy,
  FaExchangeAlt,
  FaRobot,
  FaStar,
  FaGift,
  FaUsers,
  FaCoins,
} from "react-icons/fa";
import { paths } from "src/router/paths";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "src/context/translation-context";
import theImage from "src/assets/images/SPC-images-1975x1318-Programme-Parrainage-01-1024x683.jpg";
import theImageContent from "src/assets/SPC-Fidelisation-1975x1318-01.jpg";
import { Link } from "react-router-dom";
import SectionHeader from "src/components/section-header/SectionHeader";
import HeroImage from "src/components/hero-image/HeroImage";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";
const FONT_LIGHT = "'Calibri Light', 'Segoe UI Light', 'Segoe UI', sans-serif";

export default function RecompensePageView() {
  const { translateSync } = useTranslation();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.mailjet.com/pas-nc-embedded-v1.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const recompenses = [
    { icon: <FaCoins />, text: "1 € dépensé = 1 point" },
    { icon: <FaGift />, text: "Échange possible dès 10 €" },
    { icon: <FaStar />, text: "Cartes cadeaux de 10 € et 25 €" },
  ];

  const steps = [
    {
      icon: <FaShoppingCart />,
      num: 1,
      title: "Commandez",
      desc: "Connectez-vous à votre compte et passez commande.",
    },
    {
      icon: <FaTrophy />,
      num: 2,
      title: "Gagnez",
      desc: "Vos points s'ajoutent automatiquement à chaque achat.",
    },
    {
      icon: <FaExchangeAlt />,
      num: 3,
      title: "Échangez",
      desc: "Utilisez vos points contre vos récompenses.",
    },
  ];

  const badges = [
    {
      icon: <FaRobot />,
      title: "Simple & automatique",
      desc: "Vos points sont ajoutés automatiquement",
    },
    {
      icon: <FaStar />,
      title: "Avantages exclusifs",
      desc: "Profitez d'offres réservées à nos membres",
    },
    {
      icon: <FaGift />,
      title: "Récompenses variées",
      desc: "Des cartes cadeaux de 10 € et 25 €",
    },
    {
      icon: <FaUsers />,
      title: "Accessible à tous",
      desc: "Le programme est gratuit et sans engagement",
    },
  ];

  return (
    <div style={{ fontFamily: FONT }}>
      <HeroImage
        image={theImageContent}
        label="Spa & Prestige Collection"
        title="Programme de fidélité"
        description="Cumulez 1 point par euro dépensé et échangez vos points contre des cartes cadeaux de 10 € et 25 €."
        opacity={50}
      >
        {/* Desktop — bordure blanche */}
        <Link
          to={paths.auth.register}
          className="hidden md:inline-block bg-transparent border border-white text-center text-white px-8 py-3 font-semibold rounded-md hover:bg-white hover:text-black transition"
        >
          {translateSync("Se connecter / Créer un compte")}
        </Link>

        {/* Mobile — fond noir */}
        <Link
          to={paths.auth.register}
          className="md:hidden inline-block bg-black text-center text-white px-8 py-3 font-semibold rounded-md hover:bg-[#b8955a] transition"
        >
          {translateSync("Se connecter / Créer un compte")}
        </Link>
      </HeroImage>

      {/* ══════════════════════════
          RÉCOMPENSES
          ══════════════════════════ */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)]"
        style={{ backgroundColor: "#FBF6EC" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 items-center">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              loading="lazy"
              src={theImage}
              alt="Récompenses Spa & Prestige Collection"
              className="w-full rounded-xl shadow-md object-cover"
              style={{ maxHeight: "320px" }}
            />
          </div>

          {/* Texte */}
          <div className="md:w-1/2">
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: GOLD, letterSpacing: "0.18em", fontFamily: FONT }}
            >
              {translateSync("Programme de récompenses")}
            </p>
            <h2
              className="text-gray-900 mb-2 leading-tight"
              style={{
                fontFamily: FONT_LIGHT,
                fontWeight: 300,
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              }}
            >
              <TranslatedText text="Récompenses Spa & Prestige Collection" />
            </h2>
            <div
              className="w-10 h-0.5 mb-4"
              style={{ backgroundColor: GOLD }}
            />

            <p
              className="text-sm text-gray-600 mb-4 leading-relaxed"
              style={{ fontFamily: FONT }}
            >
              <TranslatedText text="Cumulez des points à chaque commande et transformez-les en récompenses." />
            </p>

            {/* Liste avantages */}
            <ul className="space-y-3 mb-4">
              {recompenses.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-gray-700"
                  style={{ fontFamily: FONT }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#F3EBDD" }}
                  >
                    <span style={{ color: GOLD }}>{item.icon}</span>
                  </div>
                  <span>{translateSync(item.text)}</span>
                </li>
              ))}
            </ul>

            <p
              className="text-sm text-gray-500 italic"
              style={{ fontFamily: FONT }}
            >
              <TranslatedText text="Le programme est simple, automatique et accessible depuis votre compte." />
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════
          POINTS
          ══════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <SectionHeader
          label="Fidélité récompensée"
          title="Gagnez des points à chaque commande."
        />
        <p className="text-gray-600 mb-6 text-sm" style={{ fontFamily: FONT }}>
          <TranslatedText text="Vos points sont ajoutés automatiquement." />
        </p>
        <div
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full"
          style={{ backgroundColor: "#F3EBDD" }}
        >
          <FaCoins className="text-2xl" style={{ color: GOLD }} />
          <span
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: FONT_LIGHT }}
          >
            1 € = 1 point
          </span>
        </div>
      </div>

      {/* ══════════════════════════
          COMMENT ÇA MARCHE
          ══════════════════════════ */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)]"
        style={{ backgroundColor: "#FBF6EC" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-10">
          <SectionHeader label="En 3 étapes" title="Comment ça marche ?" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex flex-col items-center text-center gap-3"
              >
                {/* Icône cercle doré */}
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#F3EBDD" }}
                  >
                    <span className="text-2xl" style={{ color: GOLD }}>
                      {step.icon}
                    </span>
                  </div>
                  {/* Numéro cerclé */}
                  <span
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: GOLD }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3
                  className="text-lg font-semibold text-gray-800"
                  style={{ fontFamily: FONT }}
                >
                  {translateSync(step.title)}
                </h3>
                <p
                  className="text-sm text-gray-600 leading-relaxed"
                  style={{ fontFamily: FONT }}
                >
                  {translateSync(step.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════
          NEWSLETTER
          ══════════════════════════ */}
      <div className="w-screen relative left-[calc(-50vw+50%)] py-10 px-4">
        <SectionHeader
          label="Restez informé(e)"
          title="Restez informé(e) de nos nouveautés et avantages"
        />
        <p
          className="text-center text-sm text-gray-500 mb-6 -mt-6"
          style={{ fontFamily: FONT }}
        >
          <TranslatedText text="Inscrivez-vous à notre newsletter et recevez 10 € offerts sur votre première commande." />
        </p>

        <div className="max-w-xl mx-auto">
          <iframe
            data-w-type="embedded"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://srm3t.mjt.lu/wgt/srm3t/0wp5/form?c=31298976"
            width="100%"
            style={{ height: "420px" }}
            title="Mailjet Newsletter"
          />
        </div>

        {/* Bouton accueil */}
        <div className="flex justify-center mt-8">
          <Link
            to={paths.main}
            className="px-8 py-2.5 rounded-full text-sm font-semibold uppercase text-white transition-colors"
            style={{
              backgroundColor: GOLD,
              fontFamily: FONT,
              letterSpacing: "0.08em",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#a07a45")
            }
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
          >
            <TranslatedText text="Accueil" />
          </Link>
        </div>
      </div>

      {/* ══════════════════════════
          BADGES DU BAS
          ══════════════════════════ */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)] py-6 px-4"
        style={{ backgroundColor: "#FBF6EC" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#F3EBDD" }}
              >
                <span style={{ color: GOLD }}>{badge.icon}</span>
              </div>
              <div>
                <p
                  className="text-sm font-semibold text-gray-800"
                  style={{ fontFamily: FONT }}
                >
                  {translateSync(badge.title)}
                </p>
                <p
                  className="text-xs text-gray-500 leading-tight"
                  style={{ fontFamily: FONT }}
                >
                  {translateSync(badge.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
