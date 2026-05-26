import React, { useState } from "react";
import { useCheckoutContext } from "../checkout/context";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "src/router/paths";
import { toast } from "react-toastify";
import {
  useGetCarteCadeaux,
  createPersonalizedCarteCadeaux,
} from "src/actions/cartes-cadeaux";
import theImage from "src/assets/images/SPC-carte-cadeau-montant-4.png";
import theImage2 from "src/assets/images/SPC-Femme-cartes-square.jpg";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "react-i18next";
import SectionHeader from "src/components/section-header/SectionHeader";
import CarteBadges from "/src/sections/carte-cadeau/components/CarteBadges.jsx";
import CommentCaMarche from "src/sections/carte-cadeau/components/CommentCaMarche";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPaperPlane,
  FaSpa,
} from "react-icons/fa";
import ButtonLink from "src/components/button-link/ButtonLink";
const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";
const inputClass =
  "w-full border border-gray-300 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8955a] text-gray-700";

export default function CarteCadeau() {
  const checkout = useCheckoutContext();
  const navigate = useNavigate();
  const { cartes, loading } = useGetCarteCadeaux();
  const { t } = useTranslation();

  const [amount, setAmount] = useState(null);
  const [isCustom, setIsCustom] = useState(false);
  const [receiver, setReceiver] = useState([
    { fullName: "", email: "", date: new Date().toISOString().slice(0, 10) },
  ]);
  const [submitting, setSubmitting] = useState(false);

  const addProductToCheckout = async () => {
    if (!amount || isNaN(amount) || amount < 1 || amount > 1000) {
      toast.error(
        t(
          "Veuillez sélectionner ou entrer un montant valide entre 1 € et 1000 €.",
        ),
      );
      return;
    }
    if (!receiver[0].fullName || !receiver[0].email) {
      toast.error(t("Veuillez remplir les champs pour le destinataire."));
      return;
    }
    if (!checkout.expediteur.fullName) {
      toast.error(t("Veuillez remplir votre nom et prénom."));
      return;
    }
    try {
      let cardToUse = cartes.find((carte) => {
        const price =
          typeof carte.price === "string"
            ? parseFloat(carte.price)
            : carte.price;
        return Math.abs(price - amount) < 0.001;
      });
      if (!cardToUse) {
        const createdCard = await createPersonalizedCarteCadeaux(amount);
        cardToUse = {
          id: createdCard.id,
          name: createdCard.nom || `Carte cadeau de ${amount.toFixed(2)} €`,
          price: createdCard.prix,
          image: theImage,
        };
      }
      checkout.onAddToCart({
        id: cardToUse.id,
        name: cardToUse.name,
        price: cardToUse.price,
        image: cardToUse.image,
        destinataires: receiver,
        expediteur: checkout.expediteur,
        quantity: 1,
      });
      toast.success(t("Carte cadeau ajoutée au panier !"));
      navigate(paths.checkout);
    } catch (error) {
      toast.error(
        error.message ||
          t("Une erreur est survenue lors de l'ajout au panier."),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const howItWorks = [
    {
      icon: <FaMapMarkerAlt size={22} />,
      num: 1,
      title: "Choisissez votre carte cadeau",
      desc: "Sélectionnez le montant qui vous convient.",
    },
    {
      icon: <FaEnvelope size={22} />,
      num: 2,
      title: "Personnalisez votre envoi",
      desc: "Ajoutez les informations du destinataire et votre message.",
    },
    {
      icon: <FaPaperPlane size={22} />,
      num: 3,
      title: "Recevez la carte par email",
      desc: "La carte cadeau est envoyée à la date choisie.",
    },
    {
      icon: <FaSpa size={22} />,
      num: 4,
      title: "Profitez librement",
      desc: "Le bénéficiaire utilise sa carte dans l'un de nos établissements partenaires.",
    },
  ];
  return (
    <div style={{ fontFamily: FONT }}>
      <div className="w-full" style={{ backgroundColor: "#FBF6EC" }}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-1/2">
            
              <h1
                className="mb-3 leading-tight text-center md:text-left"
                style={{
                  color: "#1a1a1a",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  lineHeight: "1",
                }}
              >
                <TranslatedText text="Un cadeau qui fait la différence" />
              </h1>
              <div
                className="mb-6 mx-auto md:mx-0"
                style={{
                  width: "52px",
                  height: "2px",
                  background: "#b8955a",
                }}
              />

              {/* Paragraphes */}
              <div
                className="font-tahoma text-base text-center md:text-left space-y-3 mb-6"
                style={{ color: "#555" }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                    fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                    lineHeight: "1.5",
                    letterSpacing: "0.02em",
                    color: "#1a1a1a",
                  }}
                >
                  <TranslatedText text="Offrez une expérience bien-être unique, simple à envoyer, agréable à recevoir." />
                </p>
              </div>

              <ButtonLink
                to="#offrir-carte-cadeau"
                text="Offrir une carte cadeau"
                variant="primary"
                className="!mt-2 !justify-center md:!justify-start"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("offrir-carte-cadeau");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              />
            </div>

            {/* Image droite */}
            <div className="md:w-1/2">
              <img
                loading="lazy"
                src={theImage}
                alt="Carte Cadeau Spa & Prestige"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
      <CarteBadges />
      <div id="offrir-carte-cadeau" className="max-w-6xl mx-auto py-12 px-6 scroll-mt-24">
        <SectionHeader
          label="Offrir une carte cadeau"
          title="OFFRIR UNE CARTE CADEAU"
        />

        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Image gauche */}
          <div className="hidden md:block md:w-1/2">
            <img
              loading="lazy"
              src={theImage2}
              alt="Femme recevant une carte cadeau"
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
          </div>
          {/* Formulaire droite */}
          <div className="w-full md:w-1/2 space-y-8">
            {/* Étape 1 — Montant */}
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{
                  color: GOLD,
                  letterSpacing: "0.15em",
                  fontFamily: FONT,
                }}
              >
                <TranslatedText text="1. Choisissez le montant" />
              </p>
              <div
                className="w-6 h-0.5 mb-4"
                style={{ backgroundColor: GOLD }}
              />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {loading ? (
                  <p className="col-span-full text-center text-sm text-gray-500">
                    <TranslatedText text="Chargement des cartes..." />
                  </p>
                ) : (
                  <>
                    {cartes.map((carte) => {
                      const price =
                        typeof carte.price === "string"
                          ? parseFloat(carte.price)
                          : carte.price;
                      const selected = amount === price && !isCustom;
                      return (
                        <button
                          key={carte.id}
                          onClick={() => {
                            setAmount(price);
                            setIsCustom(false);
                          }}
                          className="py-2.5 px-4 text-sm font-semibold rounded-lg border transition-all duration-200"
                          style={{
                            backgroundColor: selected ? GOLD : "#fff",
                            borderColor: selected ? GOLD : "#d1d5db",
                            color: selected ? "#fff" : "#374151",
                          }}
                        >
                          {price.toFixed(2)} €
                        </button>
                      );
                    })}
                    <button
                      onClick={() => {
                        setIsCustom(true);
                        setAmount(null);
                      }}
                      className="py-2.5 px-4 text-sm font-semibold rounded-lg border transition-all duration-200 col-span-2 sm:col-span-4"
                      style={{
                        backgroundColor: isCustom ? GOLD : "#fff",
                        borderColor: isCustom ? GOLD : "#d1d5db",
                        color: isCustom ? "#fff" : "#374151",
                      }}
                    >
                      <TranslatedText text="Autre montant" />
                    </button>
                  </>
                )}
              </div>

              {isCustom && (
                <div className="mt-4 bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <p
                    className="text-sm font-semibold text-gray-700 mb-3"
                    style={{ fontFamily: FONT }}
                  >
                    <TranslatedText text="Entrez votre montant personnalisé" />
                  </p>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      step="0.01"
                      placeholder={t("ex. 150.00")}
                      className={inputClass}
                      value={amount ?? ""}
                      onChange={(e) =>
                        setAmount(
                          e.target.value === ""
                            ? null
                            : parseFloat(e.target.value),
                        )
                      }
                    />
                    <span className="text-lg font-bold text-gray-700">€</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    <TranslatedText text="Entre 1 € et 1 000 €." />
                  </p>
                  <button
                    onClick={() => {
                      setIsCustom(false);
                      setAmount(null);
                    }}
                    className="mt-3 text-xs underline text-gray-500 hover:text-gray-800 transition"
                  >
                    <TranslatedText text="Annuler" />
                  </button>
                </div>
              )}
            </div>

            {/* Étape 2 — Destinataire */}
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{
                  color: GOLD,
                  letterSpacing: "0.15em",
                  fontFamily: FONT,
                }}
              >
                <TranslatedText text="2. Informations du destinataire" />
              </p>
              <div
                className="w-6 h-0.5 mb-4"
                style={{ backgroundColor: GOLD }}
              />
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <label
                    className="sm:w-36 text-sm text-gray-600 shrink-0"
                    style={{ fontFamily: FONT }}
                  >
                    <TranslatedText text="Nom et prénom" />
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={receiver[0].fullName}
                    onChange={(e) =>
                      setReceiver([
                        { ...receiver[0], fullName: e.target.value },
                      ])
                    }
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <label
                    className="sm:w-36 text-sm text-gray-600 shrink-0"
                    style={{ fontFamily: FONT }}
                  >
                    <TranslatedText text="Email" />
                  </label>
                  <input
                    type="email"
                    className={inputClass}
                    value={receiver[0].email}
                    onChange={(e) =>
                      setReceiver([{ ...receiver[0], email: e.target.value }])
                    }
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <label
                    className="sm:w-36 text-sm text-gray-600 shrink-0"
                    style={{ fontFamily: FONT }}
                  >
                    <TranslatedText text="Date d'envoi" />
                  </label>
                  <input
                    type="date"
                    className={inputClass}
                    value={
                      receiver[0].date || new Date().toISOString().slice(0, 10)
                    }
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => {
                      const r = [...receiver];
                      r[0].date = e.target.value;
                      setReceiver(r);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Étape 3 — Expéditeur */}
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{
                  color: GOLD,
                  letterSpacing: "0.15em",
                  fontFamily: FONT,
                }}
              >
                <TranslatedText text="3. Informations de l'expéditeur" />
              </p>
              <div
                className="w-6 h-0.5 mb-4"
                style={{ backgroundColor: GOLD }}
              />
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <label
                    className="sm:w-36 text-sm text-gray-600 shrink-0"
                    style={{ fontFamily: FONT }}
                  >
                    <TranslatedText text="Nom et prénom" />
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={checkout.expediteur.fullName || ""}
                    onChange={(e) =>
                      checkout.onCreateExpediteur({
                        ...checkout.expediteur,
                        fullName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-start">
                  <label
                    className="sm:w-36 text-sm text-gray-600 shrink-0 pt-2"
                    style={{ fontFamily: FONT }}
                  >
                    <TranslatedText text="Message" />
                  </label>
                  <textarea
                    rows={4}
                    className={`${inputClass} resize-none`}
                    value={checkout.expediteur.message || ""}
                    onChange={(e) =>
                      checkout.onCreateExpediteur({
                        ...checkout.expediteur,
                        message: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Bouton Offrir — CTA primary du projet */}
            <div className="flex justify-end">
              <button
                onClick={addProductToCheckout}
                disabled={submitting || !amount}
                className="inline-flex items-center gap-2 uppercase tracking-widest rounded-full px-6 py-3 text-sm font-normal text-white transition-all duration-300 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "#1a1a1a",
                  fontFamily: FONT,
                }}
                onMouseEnter={(e) => {
                  if (!submitting && amount)
                    e.currentTarget.style.backgroundColor = GOLD;
                }}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1a1a1a")
                }
              >
                {submitting ? (
                  <TranslatedText text="Traitement en cours..." />
                ) : (
                  <TranslatedText text="Ajouter au panier" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          SECTION 4 — Comment ça marche
          ══════════════════════════════ */}
      <CommentCaMarche
        label="Utilisation"
        title="Comment ça marche ?"
        subtitle="Explorez notre site et sélectionnez l'établissement qui vous convient !"
        steps={howItWorks}
        ctaLabel="Découvrir nos établissements"
        ctaLink={paths.spa.list}
      />
    </div>
  );
}
