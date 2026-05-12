import React from "react";
import { paths } from "src/router/paths";
import theImage from "src/assets/SPC-Book-Collection-prestige-1975x1318-01.jpg";
import theImage2 from "src/assets/images/SPC-Catalogue-1975x1318-1.jpg";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "src/context/translation-context";
import HeroImage from "src/components/hero-image/HeroImage";
import SectionHeader from "src/components/section-header/SectionHeader";
import ButtonLink from "src/components/button-link/ButtonLink";
import { FaCheckCircle } from "react-icons/fa";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";
const FONT_SERIF = "'Cormorant Garamond', 'Georgia', serif";

const avantages = [
  "Une visibilité sélective et qualitative",
  "Un accès direct à une audience affinitaire",
  "Une mise en lumière cohérente et raffinée de votre établissement",
  "Un levier d'image, de notoriété et d'opportunités concrètes",
  "Une vitrine de choix pour être vu… là où il faut, par ceux qu'il faut",
  "Une édition limitée à fort impact",
  "Une opportunité à ne pas manquer.",
];

export default function CollectionPrestigePage() {
  const { translateSync } = useTranslation();

  return (
    <div style={{ fontFamily: FONT }}>

      {/* ── Hero ── */}
      <HeroImage
        image={theImage}
        label="Spa & Prestige Collection"
        title="Collection Prestige — bien plus qu'un guide, une vitrine d'exception"
        opacity={45}
      />

      {/* ── Intro ── */}
      <div className="my-8 px-4">
        <p
          className="text-center mb-6 mx-auto md:max-w-[70%] leading-relaxed italic"
          style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 400, color: "#1a1a1a" }}
        >
          <TranslatedText text="Bientôt disponible, Collection Prestige revient avec une nouvelle édition dédiée aux plus belles adresses bien-être de notre réseau." />
        </p>

        {/* Bloc beige */}
        <div className="w-screen relative left-[calc(-50vw+50%)] py-10" style={{ backgroundColor: "#FBF6EC" }}>
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-base text-gray-700 leading-relaxed mb-6 text-center" style={{ fontFamily: FONT }}>
              <TranslatedText text="Imprimé avec soin et diffusé chaque année, ce guide haut de gamme devient un" />{" "}
              <strong><TranslatedText text="véritable passeport d'inspiration" /></strong>{" "}
              <TranslatedText text="pour une clientèle en quête d'expériences uniques et de lieux soigneusement sélectionnés." />
            </p>

            <ul className="space-y-4">
              {[
                { bold: "Présenté lors des grands rendez-vous du secteur", rest: " (Thermalies, Hôtel & Restaurant Meetings, EquipHôtel…)," },
                { bold: "Distribué dans nos établissements partenaires", rest: ", intégré à nos coffrets cadeaux, remis lors de nos rencontres professionnelles — Ce support élégant s'impose comme un outil stratégique de visibilité ciblée." },
                { bold: "Conçu et valorisé par Isabelle Charrier", rest: ", experte reconnue du bien-être et fondatrice du magazine Sense of Wellness, il incarne une vision contemporaine, exigeante et inspirée du monde du spa et de l'hôtellerie bien-être." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700" style={{ fontFamily: FONT }}>
                  <FaCheckCircle className="shrink-0 mt-0.5" style={{ color: GOLD, fontSize: "1rem" }} />
                  <span><strong>{item.bold}</strong>{item.rest}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Avantages ── */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <SectionHeader
          label="Pourquoi rejoindre"
          title="Intégrez la Collection Prestige"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {avantages.map((text, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-gray-700" style={{ fontFamily: FONT }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "#F3EBDD" }}>
                <FaCheckCircle style={{ color: GOLD, fontSize: "0.8rem" }} />
              </div>
              <TranslatedText text={text} />
            </div>
          ))}
        </div>

        <p
          className="italic text-center mt-6"
          style={{ fontFamily: FONT_SERIF, fontSize: "1.6rem", fontWeight: 400, color: "#1a1a1a" }}
        >
          <TranslatedText text="Et si votre établissement en faisait partie ?" />
        </p>
      </div>

      {/* ── Modalités ── */}
      <div className="w-screen relative left-[calc(-50vw+50%)] py-10" style={{ backgroundColor: "#FBF6EC" }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Texte */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: GOLD, letterSpacing: "0.18em", fontFamily: FONT }}>
              <TranslatedText text="Rejoindre le réseau" />
            </p>
            <h3
              className="mb-2 leading-tight"
              style={{ fontFamily: FONT_SERIF, fontWeight: 400, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#1a1a1a" }}
            >
              <TranslatedText text="Modalités d'adhésion – Spa & Prestige Collection" />
            </h3>
            <div className="w-10 h-0.5 mb-5" style={{ backgroundColor: GOLD }} />
            <p className="text-sm text-gray-600 leading-relaxed mb-8" style={{ fontFamily: FONT }}>
              <TranslatedText text="Les établissements souhaitant rejoindre Spa & Prestige Collection doivent fournir une documentation détaillant leur conformité aux critères de ce référentiel (certifications, photos, etc.). Ce référentiel garantit que les établissements respectent des standards élevés, assurant ainsi une expérience client d'exception et une qualité cohérente au sein du réseau." />
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <ButtonLink
                to={paths.partenaire}
                text="Devenir partenaire"
                bgColor={GOLD}
                hoverColor="#1a1a1a"
                className="mt-0"
              />
              <ButtonLink
                to={paths.contact}
                text="Nous contacter"
                bgColor="#1a1a1a"
                hoverColor={GOLD}
                className="mt-0"
              />
            </div>
          </div>

          {/* Image */}
          <div className="hidden md:block">
            <img
              loading="lazy"
              src={theImage2}
              alt="Spa & Prestige Collection"
              className="w-full rounded-xl shadow-md object-cover"
              style={{ maxHeight: "320px" }}
            />
          </div>

        </div>
      </div>

    </div>
  );
}