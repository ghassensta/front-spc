import React, { useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronRight as FaArrow,
} from "react-icons/fa";
import { Shield, Mail, Star } from "lucide-react";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";
import theImage from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-02.jpg";
import theImage2 from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-01.jpg";
import theImage3 from "src/assets/images/SPA-images-1975x1318-Qui-Sommes-Nous-03.jpg";
import theImage4 from "src/assets/images/SPC-carte-cadeau-montant-3.jpg";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "src/context/translation-context";
import theImageFounder from "src/assets/images/SPC-qui-sommes-nous.jpg";

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
        stroke="#C7B892"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M18 30c0 0-6-5-10-11 2-4 6-5 10-3"
        stroke="#C7B892"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M18 30c0 0 6-5 10-11-2-4-6-5-10-3"
        stroke="#C7B892"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="18" cy="18" r="2" fill="#C7B892" />
    </svg>
  );
}

function FeatureItem({ Icon, title, desc }) {
  return (
    <div className="flex items-center gap-4 py-4 md:py-0">
      {/* Icône */}
      <div
        className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full"
        style={{ border: "1.5px solid #C7B892" }}
      >
        <Icon size={18} style={{ color: "#C7B892" }} />
      </div>
      {/* Texte */}
      <div className="flex-1">
        <p className="font-semibold text-sm" style={{ color: "#1a1a1a" }}>
          <TranslatedText text={title} />
        </p>
        <p className="font-tahoma text-xs mt-0.5" style={{ color: "#777" }}>
          <TranslatedText text={desc} />
        </p>
      </div>
    </div>
  );
}
export default function WhoPageView() {
  const { t } = useTranslation();
  const images = [theImage, theImage2, theImage3];

  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, 5000);
    };
    startTimer();
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
  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    resetTimer();
  };
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    resetTimer();
  };

  return (
    <div>
      {/* ══════════════════════════════════════════
          Section 1 : L'Essence
      ══════════════════════════════════════════ */}
      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)]">
        <div className="max-w-6xl mx-auto px-5 py-10">
          {/* Icône lotus — mobile uniquement */}
          <div className="md:hidden mb-2">
            <LotusIcon />
          </div>

          {/* Grille 2 colonnes desktop / 1 colonne mobile */}
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* ── Colonne gauche : texte ── */}
            <div className="w-full md:w-1/2">
              {/* Label */}
              <p
                className="text-xs uppercase tracking-widest font-semibold mb-3 text-center md:text-left"
                style={{ color: "#C7B892", letterSpacing: "0.2em" }}
              >
                <TranslatedText text="Notre Engagement" />
              </p>

              {/* Titre */}
              <h1
                className="text-4xl md:text-5xl font-bold mb-3 leading-tight text-center md:text-left"
                style={{ color: "#1a1a1a" }}
              >
                <TranslatedText text="L'Essence de Spa & Prestige Collection" />
              </h1>

              {/* Ligne dorée */}
              <div
                className="mb-6 mx-auto md:mx-0"
                style={{
                  width: "48px",
                  height: "2px",
                  background: "#C7B892",
                }}
              />

              {/* Paragraphes */}
              <div
                className="font-tahoma text-base text-center md:text-left space-y-3 mb-6"
                style={{ color: "#555" }}
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
                style={{ borderLeft: "3px solid #C7B892" }}
              >
                {/* Grand guillemet */}
                <span
                  className="absolute -top-2 left-4 text-5xl leading-none select-none"
                  style={{ color: "#C7B892", fontFamily: "Georgia, serif" }}
                >
                  ❝
                </span>
                <p
                  className="font-tahoma text-base italic pt-4"
                  style={{ color: "#555" }}
                >
                  <TranslatedText text="Nous avons imaginé Spa & Prestige Collection comme un réseau à taille humaine, où chaque adresse compte, et où chaque expérience doit être à la hauteur de ce qu'elle promet." />
                </p>
              </div>

              {/* Signature cursive */}
              <p
                className="text-xl italic text-center md:text-left"
                style={{
                  color: "#C7B892",
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
                alt="Fondateurs de Spa & Prestige Collection - expérience bien-être premium"
                className="w-full h-auto object-cover border rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
          </div>

          {/* ── 3 features en bas ── */}
          <div
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8"
            style={{ borderTop: "1px solid #e8e0d4" }}
          >
            {/* Séparateurs verticaux sur desktop */}
            <div
              className="md:pt-6 border-b md:border-b-0 md:border-r"
              style={{ borderColor: "#e8e0d4" }}
            >
              <FeatureItem
                Icon={Shield}
                title="Paiement sécurisé"
                desc="Vos transactions sont 100 % sécurisées"
              />
            </div>
            <div
              className="md:pt-6 md:px-6 border-b md:border-b-0 md:border-r"
              style={{ borderColor: "#e8e0d4" }}
            >
              <FeatureItem
                Icon={Mail}
                title="Envoi immédiat"
                desc="Recevez votre carte cadeau par email"
              />
            </div>
            <div className="md:pt-6">
              <FeatureItem
                Icon={Star}
                title="Adresses sélectionnées"
                desc="Des établissements de confiance, choisis avec soin"
              />
            </div>
          </div>

          {/* ── Bouton NOUS CONTACTER noir ── */}
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center justify-center my-6">
              <ButtonIcon
                link={paths.contact}
                title={<TranslatedText text="Nous Contacter" />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          Section 2 : Nos valeurs
      ══════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto py-10 px-5">
        <div className="text-center mb-10">
          {/* Petit label au-dessus */}
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "#C7B892", letterSpacing: "0.2em" }}
          >
            <TranslatedText text="Notre philosophie" />
          </p>

          {/* Titre principal */}
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "#1a1a1a" }}
          >
            <TranslatedText text="Nos valeurs" />
          </h2>

          {/* Ligne décorative */}
          <div
            className="mx-auto mt-4"
            style={{
              width: "60px",
              height: "2px",
              background: "#C7B892",
            }}
          />
        </div>

        {/* Grille des valeurs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
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
          ].map(({ title, text }, i) => (
            <div
              key={i}
              className="bg-[#FBF6EC] px-4 py-8 cursor-pointer duration-300 ease-in hover:text-white hover:bg-[#C7B892]"
            >
              <h3 className="mb-4 font-bold text-2xl">
                <TranslatedText text={title} />
              </h3>
              <p className="font-tahoma text-base">
                <TranslatedText text={text} />
              </p>
            </div>
          ))}

          <div className="flex items-center justify-center">
            <img
              loading="lazy"
              src={theImage4}
              alt="Carte Cadeau Spa & Prestige"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          Section 3 : Rejoignez la Communauté
      ══════════════════════════════════════════ */}
      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)]">
        <div className="max-w-6xl mx-auto py-10 px-5">
          <div className="text-center mb-10">
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "#C7B892", letterSpacing: "0.2em" }}
            >
              <TranslatedText text="Communauté privée" />
            </p>

            <h2
              className="text-4xl md:text-5xl font-semibold leading-tight"
              style={{ color: "#1a1a1a" }}
            >
              <TranslatedText text="Rejoignez la communauté privée de Spa & Prestige Collection" />
            </h2>

            <div
              className="mx-auto mt-4"
              style={{
                width: "60px",
                height: "2px",
                background: "#C7B892",
              }}
            />
          </div>
          <div
            className="font-tahoma text-xl text-center mb-10 w-full md:w-1/2 mx-auto"
            style={{ color: "#414244" }}
          >
            <TranslatedText text="Plongez dans un univers d'exception et laissez-vous séduire par des privilèges rares et uniques :" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="text-[#c8a96e] font-bold m-1">✓</span>
                  <TranslatedText text="Vivez" />
                </h3>
                <p className="font-bricolage">
                  <TranslatedText text="Des expériences personnalisées, créées spécialement pour vous" />
                </p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="text-[#c8a96e] font-bold m-1">✓</span>
                  <TranslatedText text="Accédez" />
                </h3>
                <p className="font-bricolage">
                  <TranslatedText text="A des établissements prestigieux, rigoureusement sélectionnés par nos équipes" />
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {[
                {
                  label: "Profitez",
                  desc: "De tarifs préférentiels pour des instants de bien-être inoubliables",
                },
                {
                  label: "Offrez",
                  desc: "Des cartes cadeaux élégantes, disponibles en version numérique ou physique",
                },
                {
                  label: "Partagez",
                  desc: "Ces moments d'exception en parrainant vos proches",
                },
                {
                  label: "Recevez",
                  desc: "Des conseils exclusifs de Spa & Prestige Collection pour enrichir votre expérience",
                },
              ].map(({ label, desc }) => (
                <div key={label} className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">
                    <span className="text-[#c8a96e] font-bold m-1">✓</span>{" "}
                    <TranslatedText text={label} />
                  </h3>
                  <p className="font-bricolage">
                    <TranslatedText text={desc} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <ButtonIcon link={paths.spa.list} title="COUP DE CŒUR" />
          </div>
        </div>
      </div>
    </div>
  );
}
