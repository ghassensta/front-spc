import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, Mail, FileText, Sparkles, ArrowRight, Copy, Check } from "lucide-react";
import { toast } from "react-toastify";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "react-i18next";
import { createCagnotte } from "src/actions/cagnotte";

export default function CreerCagnotte() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    titre: "",
    destinataire_nom: "",
    destinataire_email: "",
    email_founder: "",
    description: "",
    date_limite: "",
    prix_is_public: true,
    contributions_is_public: true,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleToggle = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.checked,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titre.trim()) {
      newErrors.titre = t("Le titre est requis");
    } else if (formData.titre.length < 5) {
      newErrors.titre = t("Le titre doit contenir au moins 5 caractères");
    }

    if (!formData.destinataire_nom.trim()) {
      newErrors.destinataire_nom = t("Le nom du destinataire est requis");
    } else if (formData.destinataire_nom.trim().length < 3) {
      newErrors.destinataire_nom = t("Le nom doit contenir au moins 3 caractères");
    }

    if (!formData.destinataire_email.trim()) {
      newErrors.destinataire_email = t("L'email du destinataire est requis");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.destinataire_email)) {
      newErrors.destinataire_email = t("L'email du destinataire n'est pas valide");
    }

    if (!formData.email_founder.trim()) {
      newErrors.email_founder = t("Votre email est requis");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_founder)) {
      newErrors.email_founder = t("Votre email n'est pas valide");
    }

    if (!formData.description.trim()) {
      newErrors.description = t("La description est requise");
    } else if (formData.description.length < 20) {
      newErrors.description = t("La description doit contenir au moins 20 caractères");
    }

    if (!formData.date_limite) {
      newErrors.date_limite = t("La date limite est requise");
    } else {
      const selectedDate = new Date(formData.date_limite);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate <= today) {
        newErrors.date_limite = t("La date doit être dans le futur");
      }

      const sixMonthsLater = new Date();
      sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
      if (selectedDate > sixMonthsLater) {
        newErrors.date_limite = t("La date ne peut pas dépasser 6 mois");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error(t("Veuillez corriger les erreurs du formulaire"));
    return;
  }

  setIsSubmitting(true);

  try {
    const data = await createCagnotte(formData);

    toast.success(t("Cagnotte créée avec succès !"));

    navigate(`/cagnotte/${data.slug}/gerer?token=${data.manage_token}`);
  } catch (error) {
    console.error("Erreur:", error);

    toast.error(
      error?.message || t("Une erreur est survenue. Veuillez réessayer.")
    );
  } finally {
    setIsSubmitting(false);
  }
};


  const today = new Date().toISOString().split("T")[0];
  const sixMonthsLater = new Date();
  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
  const maxDate = sixMonthsLater.toISOString().split("T")[0];

  return (
    <>
      {/* En-tête */}
      <div className="bg-gradient-to-r from-[#B6B498] to-[#8B8970] w-screen relative left-[calc(-50vw+50%)] px-5 py-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            <TranslatedText text="Créer une cagnotte" />
          </h1>
          <p className="text-xl font-roboto opacity-95">
            <TranslatedText text="Offrez ensemble un moment d'exception à vos proches" />
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Conseils */}
          <div className="lg:col-span-1">
            <div className="bg-[#FBF6EC] p-6 rounded-xl sticky top-4">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TranslatedText text="Conseils" />
              </h3>
              <div className="space-y-4 font-roboto text-sm text-gray-700">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#B6B498] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <p>
                    <TranslatedText text="Choisissez un titre accrocheur qui reflète l'occasion" />
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#B6B498] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <p>
                    <TranslatedText text="Indiquez le nom et l'email du destinataire" />
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#B6B498] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <p>
                    <TranslatedText text="Décrivez pourquoi cette personne mérite ce cadeau" />
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#B6B498] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </div>
                  <p>
                    <TranslatedText text="Masquer le montant collecté pour une surprise totale" />
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-300">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Check className="text-green-600" size={20} />
                  <TranslatedText text="C'est gratuit !" />
                </h4>
                <p className="text-sm text-gray-600 font-roboto">
                  <TranslatedText text="Aucun frais de création. Paiements 100% sécurisés par Stripe." />
                </p>
              </div>
            </div>
          </div>

          {/* Colonne droite - Formulaire */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Titre */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <label className="flex items-center gap-2 text-xl font-bold mb-3">
                  <FileText className="text-[#B6B498]" size={24} />
                  <TranslatedText text="Titre de la cagnotte" />
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  placeholder={t("Ex: Journée spa pour l'anniversaire de Marie")}
                  className={`w-full border ${
                    errors.titre ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#B6B498]`}
                  maxLength="100"
                />
                {errors.titre && (
                  <p className="text-red-500 text-sm mt-2">{errors.titre}</p>
                )}
                <p className="text-gray-500 text-sm mt-2 font-roboto">
                  {formData.titre.length}/100 caractères
                </p>
              </div>

              {/* Destinataire */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-2 text-xl font-bold mb-4">
                  <Users className="text-[#B6B498]" size={24} />
                  <TranslatedText text="Destinataire du cadeau" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium mb-2">
                      <TranslatedText text="Nom complet" />
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="destinataire_nom"
                      value={formData.destinataire_nom}
                      onChange={handleChange}
                      placeholder={t("Ex: Marie Dupont")}
                      className={`w-full border ${
                        errors.destinataire_nom ? "border-red-500" : "border-gray-300"
                      } rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#B6B498]`}
                      maxLength="100"
                    />
                    {errors.destinataire_nom && (
                      <p className="text-red-500 text-sm mt-2">{errors.destinataire_nom}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-medium mb-2">
                      <TranslatedText text="Email du destinataire" />
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="destinataire_email"
                      value={formData.destinataire_email}
                      onChange={handleChange}
                      placeholder={t("email@exemple.com")}
                      className={`w-full border ${
                        errors.destinataire_email ? "border-red-500" : "border-gray-300"
                      } rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#B6B498]`}
                    />
                    {errors.destinataire_email && (
                      <p className="text-red-500 text-sm mt-2">{errors.destinataire_email}</p>
                    )}
                    <p className="text-gray-600 text-sm mt-2 font-roboto">
                      <TranslatedText text="Pour notifier ou transférer les fonds" />
                    </p>
                  </div>
                </div>
              </div>

              {/* Email organisateur */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <label className="flex items-center gap-2 text-xl font-bold mb-3">
                  <Mail className="text-[#B6B498]" size={24} />
                  <TranslatedText text="Votre email (organisateur)" />
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email_founder"
                  value={formData.email_founder}
                  onChange={handleChange}
                  placeholder={t("votre.email@exemple.com")}
                  className={`w-full border ${
                    errors.email_founder ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#B6B498]`}
                />
                {errors.email_founder && (
                  <p className="text-red-500 text-sm mt-2">{errors.email_founder}</p>
                )}
                <p className="text-gray-600 text-sm mt-2 font-roboto">
                  <TranslatedText text="Vous recevrez un lien pour gérer votre cagnotte" />
                </p>
              </div>

              {/* Description */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <label className="flex items-center gap-2 text-xl font-bold mb-3">
                  <Users className="text-[#B6B498]" size={24} />
                  <TranslatedText text="Description" />
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder={t(
                    "Décrivez l'occasion et pourquoi cette personne mérite ce cadeau..."
                  )}
                  className={`w-full border ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#B6B498] resize-none font-roboto`}
                  maxLength="1000"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-2">{errors.description}</p>
                )}
                <p className="text-gray-500 text-sm mt-2 font-roboto">
                  {formData.description.length}/1000 caractères
                </p>
              </div>

              {/* Date limite */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <label className="flex items-center gap-2 text-xl font-bold mb-3">
                  <Calendar className="text-[#B6B498]" size={24} />
                  <TranslatedText text="Date limite" />
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date_limite"
                  value={formData.date_limite}
                  onChange={handleChange}
                  min={today}
                  max={maxDate}
                  className={`w-full border ${
                    errors.date_limite ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#B6B498]`}
                />
                {errors.date_limite && (
                  <p className="text-red-500 text-sm mt-2">{errors.date_limite}</p>
                )}
                <p className="text-gray-600 text-sm mt-2 font-roboto">
                  <TranslatedText text="Maximum 6 mois" />
                </p>
              </div>

              {/* Options de visibilité */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-6">
                  <TranslatedText text="Options de visibilité" />
                </h3>
                <div className="space-y-8">
                  {/* Afficher le montant collecté */}
                  <div className="flex items-center justify-between">
                    <div className="max-w-md">
                      <p className="font-medium text-lg">
                        <TranslatedText text="Afficher le montant collecté" />
                      </p>
                      <p className="text-sm text-gray-600 font-roboto">
                        <TranslatedText text="Les contributeurs verront le total actuel (désactivez pour une surprise)" />
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={formData.prix_is_public}
                        onChange={handleToggle("prix_is_public")}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#B6B498]/30 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B6B498]"></div>
                    </label>
                  </div>

                  {/* Afficher les contributions */}
                  <div className="flex items-center justify-between">
                    <div className="max-w-md">
                      <p className="font-medium text-lg">
                        <TranslatedText text="Afficher les contributions" />
                      </p>
                      <p className="text-sm text-gray-600 font-roboto">
                        <TranslatedText text="Les noms et montants des contributeurs seront visibles" />
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={formData.contributions_is_public}
                        onChange={handleToggle("contributions_is_public")}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#B6B498]/30 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B6B498]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Prévisualisation */}
              {showPreview && (formData.titre || formData.description) && (
                <div className="bg-[#FBF6EC] p-6 rounded-xl border-2 border-[#B6B498]">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TranslatedText text="Aperçu de votre cagnotte" />
                  </h3>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="text-2xl font-bold mb-2">{formData.titre}</h4>
                    {formData.destinataire_nom && (
                      <p className="text-lg font-medium text-[#B6B498] mb-4">
                        Pour {formData.destinataire_nom}
                      </p>
                    )}
                    <p className="font-roboto text-gray-700 whitespace-pre-line mb-6">
                      {formData.description}
                    </p>

                    {/* Montant collecté dans l'aperçu */}
                    {formData.prix_is_public && (
                      <div className="mb-6">
                        <p className="text-lg font-bold">
                          <TranslatedText text="Collecté" /> : 0 €
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {formData.date_limite && (
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>
                            <TranslatedText text="Jusqu'au" />{" "}
                            {new Date(formData.date_limite).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-[#B6B498] font-bold underline hover:text-black transition"
                >
                  {showPreview ? (
                    <TranslatedText text="Masquer l'aperçu" />
                  ) : (
                    <TranslatedText text="Voir l'aperçu" />
                  )}
                </button>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-100 transition"
                  >
                    <TranslatedText text="Annuler" />
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-[#B6B498] to-[#8B8970] text-white rounded-full font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <TranslatedText text="Création..." />
                      </>
                    ) : (
                      <>
                        <TranslatedText text="Créer ma cagnotte" />
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Section informations complémentaires */}
      <div className="bg-gray-50 w-screen relative left-[calc(-50vw+50%)] px-5 py-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">
            <TranslatedText text="Après la création" />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-[#B6B498] bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-[#B6B498]" size={24} />
              </div>
              <h4 className="font-bold mb-2">
                <TranslatedText text="Recevez votre lien" />
              </h4>
              <p className="text-sm text-gray-600 font-roboto">
                <TranslatedText text="Un email avec le lien de gestion vous sera envoyé" />
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-[#B6B498] bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Copy className="text-[#B6B498]" size={24} />
              </div>
              <h4 className="font-bold mb-2">
                <TranslatedText text="Partagez facilement" />
              </h4>
              <p className="text-sm text-gray-600 font-roboto">
                <TranslatedText text="Copiez le lien et partagez-le avec vos proches" />
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-[#B6B498] bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-[#B6B498]" size={24} />
              </div>
              <h4 className="font-bold mb-2">
                <TranslatedText text="Suivez en temps réel" />
              </h4>
              <p className="text-sm text-gray-600 font-roboto">
                <TranslatedText text="Consultez les contributions et messages" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}