// src/components/carte-cadeau/CarteCadeau.jsx (ou .tsx) - Code complet, propre et corrigé

import React, { useState } from "react";
import { MapPin, BookOpen, PhoneCall, Sparkles } from "lucide-react";
import { useCheckoutContext } from "../checkout/context";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "src/router/paths";
import { toast } from "react-toastify";
import {
  useGetCarteCadeaux,
  createPersonalizedCarteCadeaux,
} from "src/actions/cartes-cadeaux";
import theImage from "src/assets/images/SPC-carte-cadeau-montant-3.jpg";
import theImage2 from "src/assets/images/SPC-Femme-cartes-square.jpg";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "react-i18next";

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
    // Validation du montant
    if (!amount || isNaN(amount) || amount < 1 || amount > 1000) {
      toast.error(
        t(
          "Veuillez sélectionner ou entrer un montant valide entre 1 € et 1000 €.",
        ),
      );
      return;
    }

   

    // Validation des champs
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

      const cartData = {
        id: cardToUse.id,
        name: cardToUse.name,
        price: cardToUse.price,
        image: cardToUse.image,
        destinataires: receiver,
        expediteur: checkout.expediteur,
        quantity: 1,
      };

      checkout.onAddToCart(cartData);
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

  return (
    <>
      {/* ... */}
      <div className="flex bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] px-5">
        <div className="max-w-6xl mx-auto py-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold mb-4">
                <TranslatedText text="Un cadeau qui fait la différence" />
              </h1>
              <p className="font-roboto pr-6 text-[#5E5E5E]">
                <TranslatedText text="Instantanée. Attentionnée. La carte cadeau Spa & Prestige Collection vous permet d'offrir une expérience bien-être unique à vos proches, en toute simplicité." />
                <br />
                <TranslatedText text="Un choix varié de prestations exceptionnelles, à savourer en un clic. Un cadeau facile à offrir, agréable à recevoir, pour des moments de pure détente et d'évasion." />
                <br />
                <TranslatedText text="La carte cadeau Spa Prestige Collection est valable dans l'ensemble de nos partenaires Spas pour une période de un an à partir de la date de commande." />
                <br />
                <TranslatedText text="Vous pouvez aussi offrir directement un soin (avec nos remises prix) en consultant les offres de nos partenaires Spas." />
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                loading="lazy"
                src={theImage}
                alt="Carte Cadeau Spa & Prestige"
                className="w-full h-auto object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ... */}
      <div className="max-w-6xl mx-auto gap-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 items-start">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-center text-2xl mb-4 font-bold">
              <TranslatedText text="Un cadeau instantané et pratique" />
            </h2>
            <p className="font-roboto text-center">
              <TranslatedText text="Offrez un moment de sérénité immédiate, sans attente ni contrainte." />
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-center text-2xl mb-4 font-bold">
              <TranslatedText text="Un choix infini" />
            </h2>
            <p className="font-roboto text-center">
              <TranslatedText text="Des prestations variées pour toutes les occasions et tous les budgets." />
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-center text-2xl mb-4 font-bold">
              <TranslatedText text="Un bien-être sur mesure" />
            </h2>
            <p className="font-roboto text-center">
              <TranslatedText text="Une invitation à se détendre, valable 1 an." />
            </p>
          </div>
        </div>
      </div>

      {/* ... */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          <TranslatedText text="OFFRIR UNE CARTE CADEAU :" />
          <br />
          <TranslatedText text="UNE ATTENTION QUI A DU SENS." />
        </h2>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          {/* ... */}
          <div className="w-full md:w-1/2 order-1 md:order-1">
            <img
              loading="lazy"
              src={theImage2}
              alt="Femme recevant une carte cadeau Spa & Prestige Collection"
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* ... */}
          <div className="w-full md:w-1/2 order-2 md:order-2 font-roboto space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                <TranslatedText text="Sélectionnez le montant" />
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {loading ? (
                  <p className="col-span-full text-center text-gray-500">
                    <TranslatedText text="Chargement des cartes..." />
                  </p>
                ) : (
                  <>
                    {cartes.map((carte) => {
                      const price =
                        typeof carte.price === "string"
                          ? parseFloat(carte.price)
                          : carte.price;
                      return (
                        <button
                          key={carte.id}
                          onClick={() => {
                            setAmount(price);
                            setIsCustom(false);
                          }}
                          className={`border border-black py-3 px-4 font-bold rounded-lg transition-all duration-200
                      ${
                        amount === price && !isCustom
                          ? "bg-black text-white"
                          : "bg-gray-100 hover:bg-black hover:text-white"
                      }
                    `}
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
                      className={`border border-black py-3 px-4 font-bold rounded-lg transition-all duration-200 col-span-2 sm:col-span-3 md:col-span-1
                  ${
                    isCustom
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-black hover:text-white"
                  }
                `}
                    >
                      <TranslatedText text="Montant personnalisé" />
                    </button>
                  </>
                )}
              </div>

              {/* ... */}
              {isCustom && (
                <div className="mt-8 bg-gray-50 p-6 rounded-xl border">
                  <h4 className="text-xl font-bold mb-4">
                    <TranslatedText text="Entrez votre montant personnalisé" />
                  </h4>
                  <div className="flex items-center gap-4 max-w-md">
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      step="0.01"
                      placeholder={t("ex. 150.00")}
                      className="w-full border border-gray-400 rounded-lg py-3 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-black"
                      value={amount ?? ""}
                      onChange={(e) => {
                        const val =
                          e.target.value === ""
                            ? null
                            : parseFloat(e.target.value);
                        setAmount(val);
                      }}
                    />
                    <span className="text-2xl font-bold">€</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    <TranslatedText text="Montant compris entre 1 € et 1 000 € (deux décimales autorisées)." />
                  </p>
                  <button
                    onClick={() => {
                      setIsCustom(false);
                      setAmount(null);
                    }}
                    className="mt-4 text-sm underline hover:text-black transition"
                  >
                    <TranslatedText text="Annuler" />
                  </button>
                </div>
              )}
            </div>

            {/* ... */}
            <div>
              <h3 className="text-xl font-tahoma font-normal mb-4">
                <TranslatedText text="Nom et prénom de la personne qui recevra la carte cadeau" />
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
                  <label className="sm:w-40 text-sm font-tahoma font-medium">
                    <TranslatedText text="Nom et prénom" />
                  </label>
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                    value={receiver[0].fullName}
                    onChange={(e) =>
                      setReceiver([
                        { ...receiver[0], fullName: e.target.value },
                      ])
                    }
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
                  <label className="sm:w-40 text-sm font-tahoma font-medium">
                    <TranslatedText text="Email" />
                  </label>
                  <input
                    type="email"
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                    value={receiver[0].email}
                    onChange={(e) =>
                      setReceiver([{ ...receiver[0], email: e.target.value }])
                    }
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
                  <label className="sm:w-40 text-sm font-tahoma font-medium">
                    <TranslatedText text="Date d'envoi" />
                  </label>
                  <input
                    type="date"
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                    value={
                      receiver[0].date || new Date().toISOString().slice(0, 10)
                    }
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => {
                      const updatedReceiver = [...receiver];
                      updatedReceiver[0].date = e.target.value;
                      setReceiver(updatedReceiver);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ... */}
            <div>
              <h3 className="text-xl font-tahoma font-normal mb-4">
                <TranslatedText text="Nom et prénom de la personne qui commande" />
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
                  <label className="sm:w-40 text-sm font-tahoma font-medium">
                    <TranslatedText text="Nom et prénom" />
                  </label>
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                    value={checkout.expediteur.fullName || ""}
                    onChange={(e) =>
                      checkout.onCreateExpediteur({
                        ...checkout.expediteur,
                        fullName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-start">
                  <label className="sm:w-40 text-sm font-tahoma font-medium">
                    <TranslatedText text="Message" />
                  </label>
                  <textarea
                    rows={4}
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
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

            {/* ... */}
            <div className="flex justify-start sm:justify-end">
              <button
                onClick={addProductToCheckout}
                disabled={submitting || !amount}
                className="px-10 py-4 bg-black text-white uppercase font-tahoma text-sm tracking-[3px] rounded-full hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {submitting ? (
                  <TranslatedText text="Traitement en cours..." />
                ) : (
                  <TranslatedText text="Offrir" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ... */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          <TranslatedText text="Comment ça marche ?" />
        </h2>
        <h2 className="text-3xl text-center mb-10">
          <TranslatedText text="Explorez notre site et sélectionnez l'établissement ou la prestation qui vous convient !" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <MapPin className="mx-auto mb-4 text-[#B6B498]" size={32} />
            <h3 className="font-bold text-lg mb-2">
              <TranslatedText text="Sélectionnez votre adresse bien-être" />
            </h3>
            <p className="text-sm text-gray-700 font-roboto">
              <TranslatedText text="Parcourez notre page" />
              <strong>
                <TranslatedText text="Tous nos spas" />
              </strong>
              <TranslatedText text="et choisissez l'établissement qui vous correspond." />
            </p>
          </div>
          <div>
            <BookOpen className="mx-auto mb-4 text-[#B6B498]" size={32} />
            <h3 className="font-bold text-lg mb-2">
              <TranslatedText text="Plongez dans l'univers du Spa" />
            </h3>
            <p className="text-sm text-gray-700 font-roboto">
              <TranslatedText text="Découvrez en détail les soins et installations de chaque établissement." />
            </p>
          </div>
          <div>
            <PhoneCall className="mx-auto mb-4 text-[#B6B498]" size={32} />
            <h3 className="font-bold text-lg mb-2">
              <TranslatedText text="Réservez votre moment privilégié" />
            </h3>
            <p className="text-sm text-gray-700 font-roboto">
              <TranslatedText text="Contactez directement l'établissement en indiquant votre numéro de carte cadeau." />
            </p>
          </div>
          <div>
            <Sparkles className="mx-auto mb-4 text-[#B6B498]" size={32} />
            <h3 className="font-bold text-lg mb-2">
              <TranslatedText text="Vivez l'instant" />
            </h3>
            <p className="text-sm text-gray-700 font-roboto">
              <TranslatedText text="Profitez d'une parenthèse de bien-être unique." />
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Link
            to={paths.spa.list}
            className="bg-[#B6B498] text-white rounded-full py-3 px-8 hover:bg-black transition font-roboto"
          >
            <TranslatedText text="Accueil" />
          </Link>
        </div>
      </div>
    </>
  );
}
