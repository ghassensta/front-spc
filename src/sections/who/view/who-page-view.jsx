import React, { useEffect, useRef, useState } from "react";
import { FaShieldAlt, FaEnvelope, FaStar, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";
import theImage from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";
import theImage2 from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-01.jpg";
import theImage3 from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-03.jpg";
import theImage4 from "src/assets/images/SPC-carte-cadeau-montant-3.jpg";
import { TranslatedText } from "src/components/translated-text/translated-text";
import theImageFounder from "src/assets/images/SPC-qui-sommes-nous.jpg";
import SectionHeader from "src/components/section-header/SectionHeader";
import ButtonLink from "src/components/button-link/ButtonLink";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";
const FONT_SERIF = "'Cormorant Garamond', 'Georgia', serif";

/* ── Icône lotus mobile ── */
function LotusIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-2"
    >
      <path
        d="M18 30c0 0-8-6-8-14a8 8 0 0 1 8-8 8 8 0 0 1 8 8c0 8-8 14-8 14z"
        stroke={GOLD}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M18 30c0 0-6-5-10-11 2-4 6-5 10-3"
        stroke={GOLD}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M18 30c0 0 6-5 10-11-2-4-6-5-10-3"
        stroke={GOLD}
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="18" cy="18" r="2" fill={GOLD} />
    </svg>
  );
}

/* ── Feature item ── */
function FeatureItem({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-4 py-4 md:py-0">
      <div
        className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full"
        style={{ border: `1.5px solid ${GOLD}` }}
      >
        <span style={{ color: GOLD, fontSize: "1rem" }}>{icon}</span>
      </div>
      <div className="flex-1">
        <p
          className="font-semibold text-sm"
          style={{ color: "#1a1a1a", fontFamily: FONT }}
        >
          <TranslatedText text={title} />
        </p>
        <p
          className="text-xs mt-0.5"
          style={{ color: "#777", fontFamily: FONT }}
        >
          <TranslatedText text={desc} />
        </p>
      </div>
    </div>
  );
}

export default function WhoPageView() {
  const images = [theImage, theImage2, theImage3];
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [images.length]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetTimer();
  };

  const valeurs = [
    {
      title: "Sincérité",
      text: "Nous privilégions des expériences authentiques, où chaque établissement et chaque moment reflètent l'essence même du lieu. Cette approche repose sur une transparence et une confiance constantes, assurant une immersion véritable et sincère.",
    },
    {
      title: "Élégance",
      text: "L'élégance, pour nous, se révèle dans l'attention minutieuse portée aux gestes subtils et aux détails soigneusement pensés. Chaque prestation incarne un équilibre parfait entre simplicité et raffinement, pour des moments remplis de charme et de quiétude.",
    },
    {
      title: "Proximité",
      text: "L'humain est au cœur de notre démarche. Que ce soit avec nos partenaires ou nos membres, nous cultivons des relations fondées sur l'écoute et la bienveillance. Cela nous permet de répondre aux besoins spécifiques de chacun et de bâtir des liens solides et durables.",
    },
    {
      title: "Durabilité",
      text: "Nous sommes convaincus que la beauté du monde réside dans sa préservation. Chaque établissement de notre réseau s'engage à adopter des pratiques respectueuses de l'environnement, créant un impact positif et responsable pour les générations à venir.",
    },
    {
      title: "Engagement",
      text: "Nous nous engageons à soutenir le succès de nos partenaires et à partager notre savoir-faire avec nos membres, afin que chaque projet se développe en harmonie avec nos valeurs communes, tout en favorisant la transmission et l'innovation.",
    },
  ];

  const privileges = [
    {
      label: "Vivez",
      subtitle: "Des expériences pensées pour vous, au cœur de nos établissements.",
      desc: "Des expériences personnalisées, créées spécialement pour vous",
      link: paths.spa.list,
      linkLabel: "Page établissements",
    },
    {
      label: "Accédez",
      subtitle: "A des adresses sélectionnées avec attention par nos équipes.",
      desc: "A des établissements prestigieux, rigoureusement sélectionnés par nos équipes",
      link: paths.spa.list,
      linkLabel: "Page établissements",
    },
    {
      label: "Cumulez",
      subtitle: "Gagnez des points à chaque commande et transformez-les en récompenses.",
      desc: "De tarifs préférentiels pour des instants de bien-être inoubliables",
      link: paths.recompense,
      linkLabel: "Page fidélité",
    },
    {
      label: "Offrez",
      subtitle: "Des cartes cadeaux élégantes, à offrir en toute simplicité.",
      desc: "Des cartes cadeaux élégantes, disponibles en version numérique ou physique",
      link: paths.cadeau,
      linkLabel: "Page carte cadeau",
    },
    {
      label: "Partagez",
      subtitle: "Invitez vos proches à découvrir ces moments en les parrainant.",
      desc: "Ces moments d'exception en parrainant vos proches",
      link: paths.programme,
      linkLabel: "Page parrainage",
    },
    {
      label: "Recevez",
      subtitle: "Restez informé(e) de nos nouveautés et avantages",
      desc: "Des conseils exclusifs de Spa & Prestige Collection pour enrichir votre expérience",
      link: paths.programme,
      linkLabel: "Page newsletter",
    },
  ];

  return (
    <div style={{ fontFamily: FONT }}>
      {/* ══════════════════════════════════════════
          Section 1 : L'Essence
      ══════════════════════════════════════════ */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)]"
        style={{ backgroundColor: "#FBF6EC" }}
      >
        <div className="max-w-6xl mx-auto px-5 py-10">
          {/* Icône lotus — mobile uniquement */}
          <div className="md:hidden mb-2">
            <LotusIcon />
          </div>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* ── Colonne gauche : texte ── */}
            <div className="w-full md:w-1/2">
              <p
                className="text-xs uppercase tracking-widest font-semibold mb-3 text-center md:text-left"
                style={{
                  color: GOLD,
                  letterSpacing: "0.2em",
                  fontFamily: FONT,
                }}
              >
                <TranslatedText text="Notre Engagement" />
              </p>

              <h1
                className="mb-3 leading-tight text-center md:text-left"
                style={{
                  color: "#1a1a1a",
                  fontFamily: FONT_SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                }}
              >
                <TranslatedText text="L'Essence de Spa & Prestige Collection" />
              </h1>

              <div
                className="mb-6 mx-auto md:mx-0"
                style={{ width: "48px", height: "2px", background: GOLD }}
              />

              <div
                className="text-base text-center md:text-left space-y-3 mb-6"
                style={{ color: "#555", fontFamily: FONT }}
              >
                <p>
                  <TranslatedText text="Spa & Prestige Collection, c'est avant tout une rencontre." />
                </p>
                <p>
                  <TranslatedText text="Celle de lieux singuliers, choisis avec attention, et d'une vision commune : proposer des expériences de bien-être qui ont du sens." />
                </p>
                <p>
                  <TranslatedText text="Nous travaillons main dans la main avec chaque établissement pour mettre en lumière leur identité, valoriser leur savoir-faire et offrir une expérience fluide, du premier clic jusqu'au moment vécu." />
                </p>
              </div>

              {/* Bloc citation */}
              <div
                className="relative bg-white px-6 py-5 mb-4"
                style={{ borderLeft: `3px solid ${GOLD}` }}
              >
                <span
                  className="absolute -top-2 left-4 text-5xl leading-none select-none"
                  style={{ color: GOLD, fontFamily: "Georgia, serif" }}
                >
                  ❝
                </span>
                <p
                  className="text-base italic pt-4"
                  style={{ color: "#555", fontFamily: FONT }}
                >
                  <TranslatedText text="Nous avons imaginé Spa & Prestige Collection comme un réseau à taille humaine, où chaque adresse compte, et où chaque expérience doit être à la hauteur de ce qu'elle promet." />
                </p>
              </div>

              {/* Signature */}
              <p
                className="text-xl italic text-center md:text-left"
                style={{
                  color: GOLD,
                  fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                }}
              >
                Noélie &amp; Romain
              </p>
            </div>

            {/* ── Colonne droite : photo fondateurs ── */}
            <div className="hidden md:block md:w-1/2">
              <img
                src={theImageFounder}
                alt="Fondateurs de Spa & Prestige Collection"
                className="w-full h-auto object-cover rounded-xl shadow-md"
                loading="lazy"
              />
            </div>
          </div>

          {/* ── 3 features en bas ── */}
          <div
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8"
            style={{ borderTop: `1px solid #e8e0d4` }}
          >
            <div
              className="md:pt-6 border-b md:border-b-0 md:border-r"
              style={{ borderColor: "#e8e0d4" }}
            >
              <FeatureItem
                icon={<FaShieldAlt />}
                title="Paiement sécurisé"
                desc="Vos transactions sont 100 % sécurisées"
              />
            </div>
            <div
              className="md:pt-6 md:px-6 border-b md:border-b-0 md:border-r"
              style={{ borderColor: "#e8e0d4" }}
            >
              <FeatureItem
                icon={<FaEnvelope />}
                title="Envoi immédiat"
                desc="Recevez votre carte cadeau par email"
              />
            </div>
            <div className="md:pt-6">
              <FeatureItem
                icon={<FaStar />}
                title="Adresses sélectionnées"
                desc="Des établissements de confiance, choisis avec soin"
              />
            </div>
          </div>

          {/* Bouton */}
          <div className="flex items-center justify-center mt-8">
            <ButtonLink to={paths.contact} text="Nous Contacter" />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          Section 2 : Nos valeurs
      ══════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto py-10 px-5">
        <SectionHeader label="Notre philosophie" title="Nos valeurs" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valeurs.map(({ title, text }, i) => (
            <div
              key={i}
              className="px-4 py-8 rounded-xl cursor-pointer duration-300 ease-in bg-[#FBF6EC] hover:bg-[#b8955a] group"
            >
              <h3
                className="mb-4 font-semibold text-xl text-gray-800 group-hover:text-white transition-colors"
                style={{ fontFamily: FONT_SERIF }}
              >
                <TranslatedText text={title} />
              </h3>
              <p
                className="text-sm leading-relaxed text-gray-600 group-hover:text-white transition-colors"
                style={{ fontFamily: FONT }}
              >
                <TranslatedText text={text} />
              </p>
            </div>
          ))}

          <div className="flex items-center justify-center">
            <img
              loading="lazy"
              src={theImage4}
              alt="Carte Cadeau Spa & Prestige"
              className="max-w-full h-auto rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          Section 3 : Rejoignez la Communauté
      ══════════════════════════════════════════ */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)]"
        style={{ backgroundColor: "#FBF6EC" }}
      >
        <div className="max-w-6xl mx-auto py-10 px-5">
          <SectionHeader
            label="Communauté privée"
            title="Rejoignez la communauté privée de Spa & Prestige Collection"
          />

          <p
            className="text-base text-center mb-10 w-full md:w-1/2 mx-auto"
            style={{ color: "#414244", fontFamily: FONT }}
          >
            <TranslatedText text="Plongez dans un univers d'exception et laissez-vous séduire par des privilèges rares et uniques :" />
          </p>

          {/* 3 colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {privileges.map(({ label, subtitle, desc, link, linkLabel }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center md:items-start md:text-left"
              >
                <h3
                  className="font-semibold mb-1"
                  style={{ fontSize: "1.2rem", fontFamily: FONT_SERIF }}
                >
                  <FaCheckCircle
                    className="inline mr-2 mb-0.5"
                    style={{ color: GOLD }}
                  />
                  <TranslatedText text={label} />
                </h3>

                <p
                  className="text-sm italic mb-2 text-gray-500"
                  style={{ fontFamily: FONT }}
                >
                  <TranslatedText text={subtitle} />
                </p>

                <p
                  className="text-sm text-gray-700 leading-relaxed mb-3"
                  style={{ fontFamily: FONT }}
                >
                  <TranslatedText text={desc} />
                </p>

                <Link
                  to={link}
                  className="mt-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest hover:underline"
                  style={{ color: GOLD, letterSpacing: "0.12em", fontFamily: FONT }}
                >
                  <TranslatedText text={linkLabel} />
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <ButtonLink
              to={paths.spa.list}
              text="Découvrir nos établissements"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
