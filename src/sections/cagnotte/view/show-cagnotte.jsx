import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Calendar,
  Users,
  Heart,
  Gift,
  Banknote,
  Euro,
  MessageCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "react-i18next";
import { getCagnotte, contribuerCagnotte } from "src/actions/cagnotte";
import ShareButtons from "../components/show/ShareButtons";

export default function ShowCagnotte() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const searchParams = new URLSearchParams(location.search);
  const urlToken = searchParams.get("token");

  const [cagnotte, setCagnotte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedPublic, setCopiedPublic] = useState(false);
  const [copiedManage, setCopiedManage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [contributionData, setContributionData] = useState({
    nom: "",
    email: "",
    montant: "",
    message: "",
  });

  const [contributionErrors, setContributionErrors] = useState({});

  const cleanUrl = useMemo(() => `${window.location.origin}${window.location.pathname}`, []);

  const manageUrl = useMemo(
    () => (urlToken ? `${cleanUrl}?token=${urlToken}` : null),
    [cleanUrl, urlToken]
  );

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

  const montantCollecte = useMemo(() => {
    if (!cagnotte?.contributions) return 0;
    return cagnotte.contributions.reduce((sum, c) => sum + parseFloat(c.montant), 0);
  }, [cagnotte?.contributions]);

  const nombreContributeurs = cagnotte?.contributions?.length || 0;

  const joursRestants = useMemo(() => {
    if (!cagnotte?.date_limite) return 0;
    const today = new Date();
    const deadline = new Date(cagnotte.date_limite);
    const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [cagnotte?.date_limite]);

  const isClosed = cagnotte?.statut === "cloturee" || joursRestants === 0;

  const handleCopyPublic = useCallback(() => {
    navigator.clipboard.writeText(cleanUrl);
    setCopiedPublic(true);
    toast.success(t("Lien public copié !"));
    setTimeout(() => setCopiedPublic(false), 3000);
  }, [cleanUrl, t]);

  const handleCopyManage = useCallback(() => {
    if (!manageUrl) return;
    navigator.clipboard.writeText(manageUrl);
    setCopiedManage(true);
    toast.success(t("Lien de gestion copié !"));
    setTimeout(() => setCopiedManage(false), 3000);
  }, [manageUrl, t]);



  const handleContributionChange = (e) => {
    const { name, value } = e.target;
    setContributionData((prev) => ({ ...prev, [name]: value }));
    if (contributionErrors[name]) {
      setContributionErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateContribution = () => {
    const errors = {};

    if (!contributionData.nom.trim()) errors.nom = t("Le nom est requis");
    if (!contributionData.email.trim()) errors.email = t("L'email est requis");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contributionData.email))
      errors.email = t("L'email n'est pas valide");

    if (!contributionData.montant) errors.montant = t("Le montant est requis");
    else if (parseFloat(contributionData.montant) < 5)
      errors.montant = t("Le montant minimum est de 5€");

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
      const response = await contribuerCagnotte(cagnotte.id, {
        nom: contributionData.nom,
        email: contributionData.email,
        montant: contributionData.montant,
        description: contributionData.message || null,
      });

      if (response && response.url) {
        window.location.href = response.url;
      } else {
        throw new Error("URL de paiement manquante");
      }
    } catch (err) {
      console.error("Erreur paiement :", err);
      toast.error(err?.message || t("Une erreur est survenue lors du paiement"));
      setIsSubmitting(false); 
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#b8955a] mx-auto mb-4"></div>
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
            className="bg-[#b8955a] text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition"
          >
            <TranslatedText text="Retour à l'accueil" />
          </button>
        </div>
      </div>
    );
  }

  const Header = () => (
    <div className="bg-gradient-to-r from-[#b8955a] to-[#8B8970] w-screen relative left-[calc(-50vw+50%)] px-5 py-16">
      <div className="max-w-6xl mx-auto text-center text-white">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Gift size={36} />
          {isClosed && (
            <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              <TranslatedText text="Clôturée" />
            </span>
          )}
          {!isClosed && joursRestants <= 7 && joursRestants > 0 && (
            <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              <TranslatedText text="Bientôt clôturée" />
            </span>
          )}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{cagnotte.titre}</h1>
        {cagnotte.destinataire?.nom && (
          <p className="text-2xl opacity-90">
            Pour {cagnotte.destinataire.nom}
          </p>
        )}
      </div>
    </div>
  );

  const StatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cagnotte.prix_is_public && (
        <div className="bg-gradient-to-br from-[#b8955a] to-[#8B8970] text-white p-8 rounded-xl text-center">
          <Euro className="mx-auto mb-3" size={36} />
          <p className="text-4xl font-bold">{montantCollecte.toFixed(2)} €</p>
          <p className="text-sm opacity-90 mt-1"><TranslatedText text="Collectés" /></p>
        </div>
      )}
      <div className="bg-white border-2 border-[#b8955a] p-8 rounded-xl text-center">
        <Users className="mx-auto mb-3 text-[#b8955a]" size={36} />
        <p className="text-4xl font-bold">{nombreContributeurs}</p>
        <p className="text-sm text-gray-600 mt-1"><TranslatedText text="Contributeurs" /></p>
      </div>
      <div className="bg-white border-2 border-[#b8955a] p-8 rounded-xl text-center">
        <Calendar className="mx-auto mb-3 text-[#b8955a]" size={36} />
        <p className="text-4xl font-bold">{joursRestants}</p>
        <p className="text-sm text-gray-600 mt-1"><TranslatedText text="Jours restants" /></p>
      </div>
    </div>
  );

  const ContributionsList = () => (
    cagnotte.contributions_is_public &&
    nombreContributeurs > 0 && (
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <MessageCircle className="text-[#b8955a]" size={28} />
          <TranslatedText text="Contributions" />
        </h2>
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {cagnotte.contributions.map((contrib, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#b8955a]/20 rounded-full flex items-center justify-center">
                    <Heart className="text-[#b8955a]" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{contrib.nom}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(contrib.created_at).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
                {cagnotte.prix_is_public && (
                  <p className="font-bold text-[#b8955a] text-xl">
                    {parseFloat(contrib.montant).toFixed(2)} €
                  </p>
                )}
              </div>
              {contrib.description && (
                <p className="text-gray-700 italic pl-16 font-roboto">
                  "{contrib.description}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );


  

  const ContributeForm = () => (
    !isClosed ? (
      <form onSubmit={handleContribute} className="space-y-5">
        <h3 className="font-bold text-2xl mb-5 flex items-center gap-3">
          <Banknote  className="text-[#b8955a]" size={28} />
          <TranslatedText text="Contribuer" />
        </h3>

        <div>
          <label className="block text-sm font-medium mb-2">
            <TranslatedText text="Votre nom" /> <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nom"
            value={contributionData.nom}
            onChange={handleContributionChange}
            placeholder={t("Ex: Jean Dupont")}
            className={`w-full border ${contributionErrors.nom ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b8955a]`}
          />
          {contributionErrors.nom && <p className="text-red-500 text-sm mt-1">{contributionErrors.nom}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            <TranslatedText text="Votre email" /> <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={contributionData.email}
            onChange={handleContributionChange}
            placeholder={t("email@exemple.com")}
            className={`w-full border ${contributionErrors.email ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b8955a]`}
          />
          {contributionErrors.email && <p className="text-red-500 text-sm mt-1">{contributionErrors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            <TranslatedText text="Montant" /> <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              name="montant"
              value={contributionData.montant}
              onChange={handleContributionChange}
              min="5"
              step="0.01"
              placeholder="50"
              className={`flex-1 border ${contributionErrors.montant ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b8955a]`}
            />
            <span className="text-2xl font-bold">€</span>
          </div>
          {contributionErrors.montant && <p className="text-red-500 text-sm mt-1">{contributionErrors.montant}</p>}
          <p className="text-gray-500 text-xs mt-1"><TranslatedText text="Minimum 5€" /></p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2"><TranslatedText text="Message (optionnel)" /></label>
          <textarea
            name="message"
            value={contributionData.message}
            onChange={handleContributionChange}
            rows={4}
            maxLength={500}
            placeholder={t("Laissez un message...")}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b8955a] resize-none font-roboto"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#b8955a] to-[#8B8970] text-white py-4 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <TranslatedText text="Redirection vers Stripe..." />
            </>
          ) : (
            <>
              <Heart size={22} />
              <TranslatedText text="Contribuer maintenant" />
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center font-roboto">
          <TranslatedText text="Paiement 100% sécurisé par Stripe" />
        </p>
      </form>
    ) : (
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-5">
          <Calendar className="text-gray-400" size={48} />
        </div>
        <h3 className="font-bold text-2xl mb-3"><TranslatedText text="Cagnotte clôturée" /></h3>
        <p className="text-gray-600 font-roboto"><TranslatedText text="Cette cagnotte n'accepte plus de contributions." /></p>
      </div>
    )
  );

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <Heart className="text-[#b8955a]" size={28} />
                <TranslatedText text="À propos de cette cagnotte" />
              </h2>
              <p className="text-lg text-gray-700 whitespace-pre-line leading-relaxed font-roboto">
                {cagnotte.description}
              </p>
            </div>

            <StatsCards />
            <ContributionsList />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-6">
              <ShareButtons
              cagnotte={cagnotte}
              cleanUrl={cleanUrl}
              t={t}
            />

              <ContributeForm />

              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2 font-roboto">
                  <Calendar size={18} />
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