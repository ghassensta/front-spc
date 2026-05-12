import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "src/router/paths";
import { TranslatedText } from "src/components/translated-text/translated-text";
import ImgCagnotte from "src/assets/images/SPC-cagnotte-1.jpg";
import ImgCagnotteCollectif from "src/assets/images/SPC-cagnotte-2.jpg";
import HeroImage from "src/components/hero-image/HeroImage";
import SectionHeader from "src/components/section-header/SectionHeader";
import ButtonLink from "src/components/button-link/ButtonLink";

import {
  FaUsers,
  FaHeart,
  FaShieldAlt,
  FaGift,
  FaShareAlt,
  FaChartLine,
  FaSpa,
  FaChevronRight,
  FaArrowRight,
} from "react-icons/fa";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";
const FONT_SERIF = "'Cormorant Garamond', 'Georgia', serif";

// ── Données ──────────────────────────────────────────────

const avantages = [
  {
    icon: <FaUsers />,
    title: "Participatif et solidaire",
    desc: "Chacun contribue librement pour créer ensemble un cadeau qui a du sens.",
  },
  {
    icon: <FaHeart />,
    title: "Personnalisé et attentionné",
    desc: "Ajoutez un message et laissez chaque participant exprimer ses mots.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Simple et sécurisé",
    desc: "Créez votre cagnotte en quelques clics et partagez-la facilement. Paiements 100% sécurisés.",
  },
];

const steps = [
  {
    icon: <FaGift />,
    num: 1,
    title: "Créez votre cagnotte",
    desc: "Donnez un titre, précisez l'occasion et personnalisez votre message. Ajoutez si vous le souhaitez une date de clôture et un objectif.",
  },
  {
    icon: <FaShareAlt />,
    num: 2,
    title: "Partagez avec vos proches",
    desc: "Envoyez votre lien par email, SMS ou réseaux sociaux. Chacun peut participer en toute simplicité.",
  },
  {
    icon: <FaChartLine />,
    num: 3,
    title: "Suivez les contributions",
    desc: "Consultez à tout moment le montant collecté et les messages laissés.",
  },
  {
    icon: <FaSpa />,
    num: 4,
    title: "Offrez l'expérience",
    desc: "Une fois la cagnotte clôturée, le bénéficiaire reçoit une carte cadeau valable dans nos établissements pendant 1 an.",
  },
];

const occasions = [
  { emoji: "🎂", label: "Anniversaire" },
  { emoji: "💍", label: "Mariage" },
  { emoji: "👶", label: "Naissance" },
  { emoji: "🎓", label: "Diplôme" },
  { emoji: "🏖️", label: "Retraite" },
  { emoji: "❤️", label: "Saint-Valentin" },
  { emoji: "🎄", label: "Noël" },
  { emoji: "🌟", label: "Juste pour le plaisir" },
];

const faqs = [
  {
    q: "Combien coûte la création d'une cagnotte ?",
    a: "La création d'une cagnotte est entièrement gratuite. Aucun frais n'est prélevé sur les contributions de vos proches.",
  },
  {
    q: "Y a-t-il un montant minimum ou maximum ?",
    a: "Chaque personne peut contribuer librement à partir de 5€. Il n'y a pas de montant maximum pour la cagnotte totale.",
  },
  {
    q: "Combien de temps reste ouverte une cagnotte ?",
    a: "Vous définissez vous-même la date de clôture lors de la création. Une cagnotte peut rester ouverte jusqu'à 6 mois maximum.",
  },
  {
    q: "Comment le bénéficiaire reçoit-il son cadeau ?",
    a: "À la clôture de la cagnotte, le bénéficiaire reçoit automatiquement par email une carte cadeau du montant total collecté, valable 1 an dans tous nos établissements partenaires.",
  },
  {
    q: "Les paiements sont-ils sécurisés ?",
    a: "Oui, tous les paiements sont traités par Stripe, leader mondial du paiement en ligne sécurisé. Aucune donnée bancaire n'est stockée sur nos serveurs.",
  },
];

// ── Composant ─────────────────────────────────────────────

export default function PageCagnotte() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ fontFamily: FONT }}>
      {/* ── Hero ── */}
      <HeroImage
        image={ImgCagnotte}
        label="Spa & Prestige Collection"
        title="La Cagnotte Bien-Être"
        description="Offrez ensemble un moment qui compte à vos proches."
        opacity={45}
      >
        <div className="flex flex-col gap-3 mt-2">
          <Link
            to={paths.cagnotte.create}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold uppercase text-white transition-colors w-fit"
            style={{
              backgroundColor: GOLD,
              letterSpacing: "0.08em",
              fontFamily: FONT,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#1a1a1a")
            }
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
          >
            <TranslatedText text="Créer ma cagnotte" />
            <FaArrowRight className="text-xs" />
          </Link>

          {/* 3 badges sur la même ligne — cachés sur mobile */}
          <div className="hidden md:flex items-center gap-4">
            {[
              { icon: <FaGift />, label: "Gratuite" },
              { icon: <FaShieldAlt />, label: "Sécurisée" },
              { icon: <FaHeart />, label: "Sans engagement" },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-white/80 text-xs"
                style={{ fontFamily: FONT }}
              >
                <span style={{ color: GOLD }}>{badge.icon}</span>
                <TranslatedText text={badge.label} />
              </div>
            ))}
          </div>
        </div>
      </HeroImage>

      <div
        className="w-screen relative left-[calc(-50vw+50%)]"
        style={{ backgroundColor: "#FBF6EC" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{
                  color: GOLD,
                  letterSpacing: "0.18em",
                  fontFamily: FONT,
                }}
              >
                <TranslatedText text="Le cadeau collectif" />
              </p>
              <h2
                className="text-gray-900 mb-4 leading-tight"
                style={{
                  fontFamily: FONT_SERIF,
                  fontWeight: 400,
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                }}
              >
                <TranslatedText text="Un cadeau collectif qui crée des souvenirs" />
              </h2>
              <div
                className="w-10 h-0.5 mb-5"
                style={{ backgroundColor: GOLD }}
              />
              <p
                className="text-sm text-gray-600 leading-relaxed mb-5"
                style={{ fontFamily: FONT }}
              >
                <TranslatedText text="La cagnotte Spa & Prestige Collection permet à plusieurs personnes de participer à un moment de bien-être à offrir." />
              </p>
              <ul className="space-y-3">
                {[
                  "Pour toutes les occasions : anniversaire, mariage, naissance, retraite ou simplement pour faire plaisir",
                  "Simple, conviviale et sécurisée, elle transforme chaque participation en une attention partagée",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-600"
                    style={{ fontFamily: FONT }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: "#F3EBDD" }}
                    >
                      <FaChevronRight
                        style={{ color: GOLD, fontSize: "0.5rem" }}
                      />
                    </div>
                    <TranslatedText text={item} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:w-1/2">
              <img
                loading="lazy"
                src={ImgCagnotteCollectif}
                alt="Groupe d'amis célébrant ensemble"
                className="w-full h-auto object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Pourquoi choisir ── */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <SectionHeader
          label="Nos avantages"
          title="Pourquoi choisir une cagnotte ?"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {avantages.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
              style={{ backgroundColor: "#FBF6EC" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "#F3EBDD" }}
              >
                <span style={{ color: GOLD, fontSize: "1.4rem" }}>
                  {item.icon}
                </span>
              </div>
              <h3
                className="text-base font-semibold text-gray-800 mb-2"
                style={{ fontFamily: FONT }}
              >
                <TranslatedText text={item.title} />
              </h3>
              <p
                className="text-sm text-gray-500 leading-relaxed"
                style={{ fontFamily: FONT }}
              >
                <TranslatedText text={item.desc} />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Comment ça marche ── */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)]"
        style={{ backgroundColor: "#FBF6EC" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-14">
          <SectionHeader label="En 4 étapes" title="Comment ça marche ?" />
          <p
            className="text-center text-sm text-gray-500 -mt-6 mb-10"
            style={{ fontFamily: FONT }}
          >
            <TranslatedText text="En 4 étapes simples, créez votre cagnotte et offrez un cadeau mémorable" />
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex items-start gap-5 bg-white p-6 rounded-xl"
                style={{ border: `1px solid rgba(184,149,90,0.15)` }}
              >
                <div
                  className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#F3EBDD" }}
                >
                  <span style={{ color: GOLD, fontSize: "1.2rem" }}>
                    {step.icon}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: GOLD }}
                    >
                      {step.num}
                    </span>
                    <h3
                      className="text-sm font-semibold text-gray-800"
                      style={{ fontFamily: FONT }}
                    >
                      <TranslatedText text={step.title} />
                    </h3>
                  </div>
                  <p
                    className="text-xs text-gray-500 leading-relaxed"
                    style={{ fontFamily: FONT }}
                  >
                    <TranslatedText text={step.desc} />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <ButtonLink
              to={paths.cagnotte.create}
              text="Créer ma cagnotte"
              hoverColor={GOLD}
              icon={<FaArrowRight className="text-xs" />}
            />
          </div>
        </div>
      </div>

      {/* ── Occasions ── */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <SectionHeader label="Occasions" title="Pour toutes les occasions" />
        <p
          className="text-center text-sm text-gray-500 -mt-6 mb-10"
          style={{ fontFamily: FONT }}
        >
          <TranslatedText text="La cagnotte bien-être s'adapte à tous vos moments importants" />
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {occasions.map((item, i) => (
            <div
              key={i}
              className="text-center p-5 rounded-xl hover:shadow-md transition-shadow cursor-default"
              style={{ backgroundColor: "#FBF6EC" }}
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <p
                className="text-sm font-semibold text-gray-700"
                style={{ fontFamily: FONT }}
              >
                <TranslatedText text={item.label} />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)]"
        style={{ backgroundColor: "#FBF6EC" }}
      >
        <div className="max-w-4xl mx-auto px-6 py-14">
          <SectionHeader label="Informations" title="Questions fréquentes" />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden"
                style={{ border: `1px solid rgba(184,149,90,0.2)` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span
                    className="text-sm font-semibold text-gray-800"
                    style={{ fontFamily: FONT }}
                  >
                    <TranslatedText text={faq.q} />
                  </span>
                  <FaChevronRight
                    className="shrink-0 transition-transform duration-200"
                    style={{
                      color: GOLD,
                      transform:
                        openFaq === i ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p
                      className="text-sm text-gray-500 leading-relaxed"
                      style={{ fontFamily: FONT }}
                    >
                      <TranslatedText text={faq.a} />
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Redirections ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Découvrir nos spas",
              desc: "Explorez notre sélection d'établissements partenaires de prestige.",
              link: paths.spa.list,
            },
            {
              title: "Cartes cadeaux",
              desc: "Offrez une carte cadeau individuelle pour un moment de bien-être.",
              link: paths.cadeau,
            },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.link || "#"}
              className="group flex items-center justify-between p-8 bg-white rounded-xl hover:shadow-md transition-shadow"
              style={{ border: `1px solid rgba(184,149,90,0.2)` }}
            >
              <div>
                <h3
                  className="text-base font-semibold text-gray-800 mb-1 group-hover:text-[#b8955a] transition-colors"
                  style={{ fontFamily: FONT }}
                >
                  <TranslatedText text={item.title} />
                </h3>
                <p
                  className="text-sm text-gray-500"
                  style={{ fontFamily: FONT }}
                >
                  <TranslatedText text={item.desc} />
                </p>
              </div>
              <FaArrowRight
                className="shrink-0 ml-4 group-hover:translate-x-1 transition-transform"
                style={{ color: GOLD }}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* ── CTA final ── */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)] py-16 px-6"
        style={{ backgroundColor: GOLD }}
      >
        <div className="max-w-3xl mx-auto text-center text-white">
          <p
            className="text-xs uppercase tracking-widest mb-4 opacity-80"
            style={{ letterSpacing: "0.2em", fontFamily: FONT }}
          >
            <TranslatedText text="Commencez maintenant" />
          </p>
          <h2
            className="mb-4 leading-tight"
            style={{
              fontFamily: FONT_SERIF,
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
            }}
          >
            <TranslatedText text="Prêt à créer votre cagnotte ?" />
          </h2>
          <div
            className="w-10 h-0.5 mx-auto mb-5"
            style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
          />
          <p className="text-sm mb-8 opacity-90" style={{ fontFamily: FONT }}>
            <TranslatedText text="Quelques clics suffisent pour offrir ensemble un moment d'exception" />
          </p>
          <Link
            to={paths.cagnotte.create}
            className="inline-flex items-center gap-3 px-10 py-3 rounded-full text-sm font-semibold uppercase transition-colors"
            style={{
              backgroundColor: "#1a1a1a",
              color: "#fff",
              letterSpacing: "0.08em",
              fontFamily: FONT,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#333")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#1a1a1a")
            }
          >
            <TranslatedText text="Créer ma cagnotte" />
            <FaArrowRight className="text-xs" />
          </Link>
          <p className="mt-5 text-xs opacity-70" style={{ fontFamily: FONT }}>
            <TranslatedText text="Gratuit • Sans engagement • Sécurisé" />
          </p>
        </div>
      </div>
    </div>
  );
}
