import React, { useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLink,
  FaShareAlt,
  FaUserCheck,
  FaCheck,
  FaGlobe,
  FaUser,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
import { paths } from "src/router/paths";
import theImage from "src/assets/SPC-Parrainage-1975x1318-01.jpg";
import { useTranslation } from "src/context/translation-context";
import HeroImage from "src/components/hero-image/HeroImage";
import SectionHeader from "src/components/section-header/SectionHeader";
import ButtonLink from "src/components/button-link/ButtonLink";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";

const steps = [
  {
    icon: FaShareAlt,
    title: "Invitez un proche",
    desc: "Envoyez votre lien de parrainage à un ami pour qu'il crée son compte.",
  },
  {
    icon: FaLink,
    title: "Tout commence dans votre espace client",
    desc: "Connectez-vous à votre compte pour retrouver votre lien de parrainage personnel.",
  },
  {
    icon: FaUserCheck,
    title: "Votre ami s'inscrit et en profite",
    desc: "Votre ami s'inscrit via votre lien et reçoit 5€ offerts sur sa première commande.",
  },
  {
    icon: GiTakeMyMoney,
    title: "Recevez 5€ en bon d'achat",
    desc: "Dès sa première commande validée, vous recevez à votre tour 5€ en bon d'achat.",
  },
];

const conditions = [
  { icon: FaCheck, label: "Valable 1 an" },
  { icon: FaGlobe, label: "Utilisable sur tout le site" },
  { icon: FaUser, label: "Parrainage illimité" },
];

export default function ProgrammePageView() {
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

  return (
    <div className="w-full" style={{ fontFamily: FONT }}>
      {/* ── Hero ── */}
      <HeroImage
        image={theImage}
        label="Programme de parrainage"
        title="Offrez 5€, recevez 5€"
        description="Invitez vos proches et profitez d'un avantage dès leur première commande."
        opacity={45}
      >
        <ButtonLink
          to={paths.auth.register}
          text="Se connecter / Créer un compte"
          variant="primary"
          icon={<FaArrowRight />}
          className="!mt-4 !justify-start"
        />
      </HeroImage>

      {/* ── Parrainage intro ── */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)]"
        style={{ backgroundColor: "#FBF6EC" }}
      >
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <SectionHeader
            label="Parrainage"
            title="Offrez 5€, et recevez 5€ en retour"
          />

          <p
            className="text-gray-600 mb-8 text-sm leading-relaxed"
            style={{ fontFamily: FONT }}
          >
            {translateSync(
              "Un instant de détente, une attention, une belle découverte… Invitez vos proches à rejoindre Spa & Prestige Collection et recevez un bon d'achat à chaque première commande validée.",
            )}
          </p>

          {/* Icônes partage */}
          <div className="flex items-center justify-center gap-5">
            {[
              { href: "https://facebook.com", icon: <FaFacebookF /> },
              { href: "mailto:?subject=Parrainage", icon: <MdOutlineEmail /> },
              { href: "https://instagram.com", icon: <FaInstagram /> },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
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
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Comment ça marche ── */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <SectionHeader label="Processus" title="Comment ça marche ?" />

        <p
          className="text-center text-gray-500 text-sm mb-12 -mt-6"
          style={{ fontFamily: FONT }}
        >
          {translateSync(
            "Un programme simple et généreux, pensé pour celles et ceux qui aiment partager leurs plus belles adresses bien-être.",
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#F3EBDD" }}
                >
                  <item.icon className="text-2xl" style={{ color: GOLD }} />
                </div>
                <span
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: GOLD }}
                >
                  {idx + 1}
                </span>
              </div>
              <h3
                className="text-base font-semibold text-gray-800"
                style={{ fontFamily: FONT }}
              >
                {translateSync(item.title)}
              </h3>
              <p
                className="text-sm text-gray-500 leading-relaxed"
                style={{ fontFamily: FONT }}
              >
                {translateSync(item.desc)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Conditions (pleine largeur) ── */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)] py-16 px-4"
        style={{ backgroundColor: "#FBF6EC" }}
      >
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Informations" title="Les conditions" />

          {/* Carte bouclier */}
          <div
            className="bg-white rounded-xl p-5 mb-6 shadow-sm flex items-center gap-4"
            style={{ border: `1px solid rgba(184,149,90,0.25)` }}
          >
            <div
              className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
              style={{ border: `2px solid ${GOLD}` }}
            >
              <FaShieldAlt style={{ color: GOLD, fontSize: "1.1rem" }} />
            </div>
            <p
              className="text-gray-700 text-sm leading-snug"
              style={{ fontFamily: FONT }}
            >
              {translateSync(
                "Code unique d'une valeur de 5 € à valoir sur le site Spa & Prestige Collection.",
              )}
            </p>
          </div>

          {/* 3 badges */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {conditions.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#F3EBDD" }}
                >
                  <c.icon style={{ color: GOLD }} />
                </div>
                <span
                  className="text-xs text-gray-500"
                  style={{ fontFamily: FONT }}
                >
                  {translateSync(c.label)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Newsletter (pleine largeur, bg blanc) ── */}
      <div className="w-screen relative left-[calc(-50vw+50%)] bg-white py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            label="Newsletter"
            title="Restez informé(e) de nos nouveautés et avantages"
          />
          <iframe
            data-w-type="embedded"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://srm3t.mjt.lu/wgt/srm3t/0wp5/form?c=31298976"
            width="100%"
            style={{ height: "420px" }}
            title="Newsletter"
          />
        </div>

        {/* ── Bouton CTA ── */}
        <div className="py-10 flex justify-center">
          <ButtonLink to={paths.spa.list} text="COUP DE CŒUR" />
        </div>
      </div>
    </div>
  );
}
