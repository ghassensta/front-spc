// src/sections/cagnotte/view/ShowCagnotte.jsx - Page d'affichage d'une cagnotte

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  Heart,
  Share2,
  Copy,
  Check,
  Gift,
  Sparkles,
  Euro,
  MessageCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "react-i18next";
import { getCagnotte, contribuerCagnotte } from "src/actions/cagnotte";

export default function ShowCagnotte() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // États
  const [cagnotte, setCagnotte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formulaire de contribution
  const [contributionData, setContributionData] = useState({
    nom: "",
    email: "",
    montant: "",
    message: "",
  });

  const [contributionErrors, setContributionErrors] = useState({});

  // Charger la cagnotte
  useEffect(() => {
    loadCagnotte();
  }, [slug]);

  const loadCagnotte = async () => {
    try {
      setLoading(true);
      const data = await getCagnotte(slug);
      setCagnotte(data);
    } catch (err) {
      console.error("Erreur chargement cagnotte:", err);
      setError(t("Cagnotte introuvable"));
      toast.error(t("Impossible de charger la cagnotte"));
    } finally {
      setLoading(false);
    }
  };

  // Calculer les statistiques
  const getMontantCollecte = () => {
    if (!cagnotte?.contributions) return 0;
    return cagnotte.contributions.reduce((sum, c) => sum + parseFloat(c.montant), 0);
  };

  const getNombreContributeurs = () => {
    return cagnotte?.contributions?.length || 0;
  };

  const getJoursRestants = () => {
    if (!cagnotte?.date_limite) return 0;
    const today = new Date();
    const deadline = new Date(cagnotte.date_limite);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const isClosed = () => {
    return cagnotte?.statut === "cloturee" || getJoursRestants() === 0;
  };

  // Copier le lien
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success(t("Lien copié dans le presse-papier !"));
    setTimeout(() => setCopied(false), 3000);
  };

  // Partager
  const handleShare = async () => {
    const url = window.location.href;
    const text = `Participez à la cagnotte "${cagnotte.titre}" pour ${cagnotte.destinataire?.nom || "un cadeau spécial"}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: cagnotte.titre,
          text: text,
          url: url,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleContributionChange = (e) => {
    const { name, value } = e.target;
    setContributionData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (contributionErrors[name]) {
      setContributionErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateContribution = () => {
    const errors = {};

    if (!contributionData.nom.trim()) {
      errors.nom = t("Le nom est requis");
    }

    if (!contributionData.email.trim()) {
      errors.email = t("L'email est requis");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contributionData.email)) {
      errors.email = t("L'email n'est pas valide");
    }

    if (!contributionData.montant) {
      errors.montant = t("Le montant est requis");
    } else if (parseFloat(contributionData.montant) < 5) {
      errors.montant = t("Le montant minimum est de 5€");
    }

    setContributionErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContribute = async (e) => {
    e.preventDefault();

    if (!validateContribution()) {
      toast.error(t("Veuillez corriger les erreurs du formulaire"));
      return;
    }

    setIsSubmitting(true);

    try {
      await contribuerCagnotte(cagnotte.id, contributionData);
      
      toast.success(t("Merci pour votre contribution !"));
      
      // Recharger la cagnotte
      await loadCagnotte();
      
      // Réinitialiser le formulaire
      setContributionData({
        nom: "",
        email: "",
        montant: "",
        message: "",
      });
    } catch (err) {
      console.error("Erreur contribution:", err);
      toast.error(err?.message || t("Une erreur est survenue"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // États de chargement et d'erreur
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#B6B498] mx-auto mb-4"></div>
          <p className="text-gray-600 font-roboto">
            <TranslatedText text="Chargement de la cagnotte..." />
          </p>
        </div>
      </div>
    );
  }

  if (error || !cagnotte) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            <TranslatedText text="Cagnotte introuvable" />
          </h2>
          <p className="text-gray-700 mb-6 font-roboto">
            <TranslatedText text="Cette cagnotte n'existe pas ou a été supprimée." />
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#B6B498] text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition"
          >
            <TranslatedText text="Retour à l'accueil" />
          </button>
        </div>
      </div>
    );
  }

  const montantCollecte = getMontantCollecte();
  const nombreContributeurs = getNombreContributeurs();
  const joursRestants = getJoursRestants();
  const closed = isClosed();

  return (
    <>

       {/* En-tête */}
            <div className="bg-gradient-to-r from-[#B6B498] to-[#8B8970] w-screen relative left-[calc(-50vw+50%)] px-5 py-16">
              <div className="max-w-4xl mx-auto text-center text-white">
                  <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="text-[#fcfcfc]" size={32} />
              {closed && (
                <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  <TranslatedText text="Clôturée" />
                </span>
              )}
              {!closed && joursRestants <= 7 && joursRestants > 0 && (
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  <TranslatedText text="Bientôt clôturée" />
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{cagnotte.titre}</h1>
            {cagnotte.destinataire && (
              <p className="text-xl md:text-2xl text-[#B6B498] font-medium">
                Pour {cagnotte.destinataire.nom}
              </p>
            )}
          </div>
              </div>
            </div>

      {/* Contenu principal */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Informations */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Heart className="text-[#B6B498]" size={28} />
                <TranslatedText text="À propos de cette cagnotte" />
              </h2>
              <p className="font-roboto text-lg text-gray-700 whitespace-pre-line leading-relaxed">
                {cagnotte.description}
              </p>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cagnotte.prix_is_public && (
                <div className="bg-gradient-to-br from-[#B6B498] to-[#8B8970] text-white p-6 rounded-xl text-center">
                  <Euro className="mx-auto mb-2" size={32} />
                  <p className="text-3xl font-bold mb-1">
                    {montantCollecte.toFixed(2)} €
                  </p>
                  <p className="text-sm opacity-90">
                    <TranslatedText text="Collectés" />
                  </p>
                </div>
              )}

              <div className="bg-white border-2 border-[#B6B498] p-6 rounded-xl text-center">
                <Users className="mx-auto mb-2 text-[#B6B498]" size={32} />
                <p className="text-3xl font-bold mb-1">{nombreContributeurs}</p>
                <p className="text-sm text-gray-600">
                  <TranslatedText text="Contributeurs" />
                </p>
              </div>

              <div className="bg-white border-2 border-[#B6B498] p-6 rounded-xl text-center">
                <Calendar className="mx-auto mb-2 text-[#B6B498]" size={32} />
                <p className="text-3xl font-bold mb-1">{joursRestants}</p>
                <p className="text-sm text-gray-600">
                  <TranslatedText text="Jours restants" />
                </p>
              </div>
            </div>

            {/* Liste des contributions */}
            {cagnotte.contributions_is_public && nombreContributeurs > 0 && (
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MessageCircle className="text-[#B6B498]" size={28} />
                  <TranslatedText text="Contributions" />
                </h2>
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {cagnotte.contributions.map((contribution, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#B6B498] bg-opacity-20 rounded-full flex items-center justify-center">
                            <Heart className="text-[#B6B498]" size={20} />
                          </div>
                          <div>
                            <p className="font-bold">{contribution.nom}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(contribution.created_at).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                        </div>
                        {cagnotte.prix_is_public && (
                          <p className="font-bold text-[#B6B498] text-lg">
                            {parseFloat(contribution.montant).toFixed(2)} €
                          </p>
                        )}
                      </div>
                      {contribution.message && (
                        <p className="text-gray-700 font-roboto italic mt-3 pl-13">
                          "{contribution.message}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Colonne droite - Formulaire de contribution */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              {/* Boutons de partage */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-bold text-lg mb-3">
                  <TranslatedText text="Partager cette cagnotte" />
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#B6B498] text-white py-3 px-4 rounded-lg hover:opacity-90 transition font-bold"
                  >
                    <Share2 size={20} />
                    <TranslatedText text="Partager" />
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center justify-center gap-2 border-2 border-[#B6B498] text-[#B6B498] py-3 px-4 rounded-lg hover:bg-[#B6B498] hover:text-white transition font-bold"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>

              {/* Formulaire de contribution */}
              {!closed ? (
                <form onSubmit={handleContribute} className="space-y-4">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Sparkles className="text-[#B6B498]" size={24} />
                    <TranslatedText text="Contribuer" />
                  </h3>

                  {/* Nom */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <TranslatedText text="Votre nom" />
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={contributionData.nom}
                      onChange={handleContributionChange}
                      placeholder={t("Ex: Jean Dupont")}
                      className={`w-full border ${
                        contributionErrors.nom ? "border-red-500" : "border-gray-300"
                      } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#B6B498]`}
                    />
                    {contributionErrors.nom && (
                      <p className="text-red-500 text-sm mt-1">{contributionErrors.nom}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <TranslatedText text="Votre email" />
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contributionData.email}
                      onChange={handleContributionChange}
                      placeholder={t("email@exemple.com")}
                      className={`w-full border ${
                        contributionErrors.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#B6B498]`}
                    />
                    {contributionErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{contributionErrors.email}</p>
                    )}
                  </div>

                  {/* Montant */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <TranslatedText text="Montant" />
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        name="montant"
                        value={contributionData.montant}
                        onChange={handleContributionChange}
                        placeholder="50"
                        min="5"
                        step="0.01"
                        className={`flex-1 border ${
                          contributionErrors.montant ? "border-red-500" : "border-gray-300"
                        } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#B6B498]`}
                      />
                      <span className="text-xl font-bold">€</span>
                    </div>
                    {contributionErrors.montant && (
                      <p className="text-red-500 text-sm mt-1">{contributionErrors.montant}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">
                      <TranslatedText text="Minimum 5€" />
                    </p>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <TranslatedText text="Message (optionnel)" />
                    </label>
                    <textarea
                      name="message"
                      value={contributionData.message}
                      onChange={handleContributionChange}
                      rows={3}
                      placeholder={t("Laissez un message...")}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#B6B498] resize-none font-roboto"
                      maxLength="500"
                    />
                  </div>

                  {/* Bouton de soumission */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#B6B498] to-[#8B8970] text-white py-4 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <TranslatedText text="Traitement..." />
                      </>
                    ) : (
                      <>
                        <Heart size={20} />
                        <TranslatedText text="Contribuer maintenant" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center font-roboto">
                    <TranslatedText text="Paiement 100% sécurisé par Stripe" />
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="text-gray-400" size={40} />
                  </div>
                  <h3 className="font-bold text-xl mb-2">
                    <TranslatedText text="Cagnotte clôturée" />
                  </h3>
                  <p className="text-gray-600 font-roboto">
                    <TranslatedText text="Cette cagnotte n'accepte plus de contributions." />
                  </p>
                </div>
              )}

              {/* Date limite */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 font-roboto flex items-center justify-center gap-2">
                  <Calendar size={16} />
                  <TranslatedText text="Date limite :" />
                  <span className="font-bold">
                    {new Date(cagnotte.date_limite).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
