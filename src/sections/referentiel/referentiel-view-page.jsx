import React from "react";
import { paths } from "src/router/paths";
import theImageWeb from "src/assets/images/referentiel-de-candidature-image.webp";
import theImageMobile from "src/assets/images/referentiel-de-candidature-image.webp";
import theImage2 from "src/assets/images/SPC-Catalogue-1975x1318-1.jpg";
import { useTranslation } from "src/context/translation-context";
import HeroImage from "src/components/hero-image/HeroImage";
import SectionHeader from "src/components/section-header/SectionHeader";
import { FaFileAlt, FaArrowRight } from "react-icons/fa";
import ContactInfo from "src/components/contact-info/ContactInfo";
import ButtonLink from "src/components/button-link/ButtonLink";
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

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";

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

  const col1 = criteria.slice(0, 4);
  const col2 = criteria.slice(4, 8);

  return (
    <div style={{ fontFamily: FONT }}>
      {/* ── Hero ── */}
      <HeroImage
        image={theImageWeb}
        imageMobile={theImageMobile}
        label="Référentiel de candidature"
        title="Rejoignez l'excellence"
        titleLine2="Spa & Prestige Collection"
        description="Notre référentiel de candidature définit les critères d'excellence attendus pour intégrer notre collection. "
        descBold="Il garantit une expérience"
        descAfter=" cliente d'exception et une qualité cohérente au sein de notre réseau."
      >
        <ButtonLink
          to={paths.contact}
          text="Nous contacter"
          variant="primary"
          icon={<FaArrowRight />}
          className="!mt-4 !justify-start"
        />
      </HeroImage>

      {/* ── Section critères ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <SectionHeader
          label="Nos standards"
          title="Les critères d'évaluation"
        />

        {/* Desktop : 2 colonnes */}
        <div className="hidden md:grid grid-cols-2 gap-x-12 gap-y-8">
          {[col1, col2].map((col, ci) =>
            col.map((item, i) => {
              const num = ci * 4 + i + 1;
              return (
                <div key={num} className="flex items-start gap-4">
                  {/* Icône cercle beige */}
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-full shrink-0 mt-1"
                    style={{ backgroundColor: "#F3EBDD" }}
                  >
                    <span style={{ color: GOLD, fontSize: "1.2rem" }}>
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {/* Numéro cerclé doré */}
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ backgroundColor: GOLD }}
                      >
                        {num}
                      </span>
                      <h3
                        className="text-base font-semibold text-gray-800"
                        style={{ fontFamily: FONT }}
                      >
                        {translateSync(item.title)}
                      </h3>
                    </div>
                    <p
                      className="text-sm text-gray-600 leading-relaxed"
                      style={{ fontFamily: FONT }}
                    >
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
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full shrink-0"
                style={{ backgroundColor: "#F3EBDD" }}
              >
                <span style={{ color: GOLD }}>{item.icon}</span>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: GOLD }}
                >
                  {i + 1}
                </span>
                <span
                  className="text-sm font-semibold text-gray-800"
                  style={{ fontFamily: FONT }}
                >
                  {translateSync(item.title)}
                </span>
              </div>
              <span style={{ color: GOLD }} className="text-lg">
                ›
              </span>
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
          <div>
            <div className="flex items-start gap-4 mb-4">
              {/* Icône document — react-icons */}
              <div
                className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#F3EBDD" }}
              >
                <FaFileAlt style={{ color: GOLD, fontSize: "1.1rem" }} />
              </div>
              <div>
                <h3
                  className="text-lg font-semibold text-gray-800 mb-2"
                  style={{ fontFamily: FONT }}
                >
                  {translateSync("Modalités d'adhésion")}
                </h3>
                {/* Séparateur doré */}
                <div
                  className="w-8 h-0.5 mb-3"
                  style={{ backgroundColor: GOLD }}
                />
                <p
                  className="text-sm text-gray-600 leading-relaxed"
                  style={{ fontFamily: FONT }}
                >
                  {translateSync(
                    "Les établissements souhaitant rejoindre Spa & Prestige Collection doivent fournir une documentation détaillée attestant de leur conformité à ces critères (certifications, photos, descriptifs, etc.). Chaque candidature est étudiée avec soin par notre équipe.",
                  )}
                </p>
              </div>
            </div>

            {/* Boutons — CTAs du système ButtonLink */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <ButtonLink
                to={paths.partenaire}
                text="Devenir partenaire"
                variant="primary"
                icon={<FaArrowRight />}
                className="!mt-0 !justify-start"
              />
              <ButtonLink
                to={paths.contact}
                text="Nous contacter"
                variant="secondary"
                icon={<FaArrowRight />}
                className="!mt-0 !justify-start"
              />
            </div>
          </div>

          {/* Image */}
          <div className="hidden md:block">
            <img
              loading="lazy"
              src={theImage2}
              alt={translateSync("Spa & Prestige Collection")}
              className="w-full rounded-xl shadow-md object-cover"
              style={{ maxHeight: "280px" }}
            />
          </div>
          <ContactInfo
          phone="+33182350126"
          phoneLabel="+33 (0)1 82 35 01 26"
          email="contact@spa-prestige-collection.com"
        />
        </div>
        
      </div>
    </div>
  );
}
