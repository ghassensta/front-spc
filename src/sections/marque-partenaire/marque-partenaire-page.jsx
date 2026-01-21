import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { sendMarques } from "src/actions/forms";
import validator from "validator";
import theImage from "src/assets/SPC-Collab-marque-1975x1318-01.jpg";
import theImage2 from "src/assets/SPC-Collab-marque-1975x1318-03.jpg";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "src/context/translation-context";
import { useGetHomePage } from "src/actions/homepage";
import Partenaires from "src/sections/home2/comp/partenaires";

export default function MarquePartenairePage() {
  const { translateSync } = useTranslation();
  const { sections } = useGetHomePage();

  const [formData, setFormData] = useState({
    marque: "",
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    pays: "France",
    adresse: "",
    siteweb: "",
    role: "",
    connaissance: "",
    message: "",
    secteur: "Hôtel",
    fichier: null,
  });

  const fileInputRef = useRef(null);

  // ── Gestion du chargement des données ───────────────────────────────
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  const section6 = sections.find((s) => s.key === "section6");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let processedValue = value;

    if (name === "siteweb" && value) {
      if (!value.match(/^https?:\/\//)) {
        processedValue = `https://${
          value.startsWith("www.") ? value.slice(4) : value
        }`;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : processedValue,
    }));
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.nom.trim()) {
      errors.push(translateSync("Le champ Nom est requis."));
    }

    if (!formData.marque.trim()) {
      errors.push(translateSync("Le champ Nom de la marque est requis."));
    }

    if (!formData.email.trim()) {
      errors.push(translateSync("Le champ Email est requis."));
    } else if (!validator.isEmail(formData.email)) {
      errors.push(translateSync("L'adresse e-mail n'est pas valide."));
    }

    if (formData.telephone && !/^\+?[0-9\s-]{6,15}$/.test(formData.telephone)) {
      errors.push(translateSync("Le numéro de téléphone n'est pas valide."));
    }

    if (formData.siteweb && !validator.isURL(formData.siteweb, { require_protocol: false })) {
      errors.push(
        translateSync("L'URL du site web doit être valide (ex: exemple.com)")
      );
    }

    if (!formData.message.trim()) {
      errors.push(translateSync("Votre message doit contenir du texte."));
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    try {
      await toast.promise(sendMarques(formData), {
        pending: translateSync("En cours d'envoi..."),
        success: translateSync("Demande envoyée avec succès !"),
        error: translateSync("Échec lors de l'envoi"),
      });

      setFormData({
        marque: "",
        nom: "",
        prenom: "",
        telephone: "",
        email: "",
        pays: "France",
        adresse: "",
        siteweb: "",
        role: "",
        connaissance: "",
        message: "",
        secteur: "Hôtel",
        fichier: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error(translateSync("Une erreur inattendue est survenue."));
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden hidden md:block"
        style={{ backgroundImage: `url(${theImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-white text-4xl md:text-5xl max-w-5xl mx-auto text-center font-bold leading-snug">
            <TranslatedText text="OFFREZ A VOTRE MARQUE UNE VISIBILITÉ INÉGALÉE AVEC SPA & PRESTIGE COLLECTION" />
          </h1>
        </div>
      </div>

      {/* Pourquoi nous rejoindre */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl italic text-center mb-12 font-serif">
          <TranslatedText text="Pourquoi nous rejoindre ?" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <ul className="space-y-5 text-justify font-bricolage text-base list-disc pl-6">
            <li>
              <strong><TranslatedText text="Visibilité Ciblée :" /></strong>{" "}
              <TranslatedText text="Profitez d’une newsletter exclusive, de publications personnalisées sur nos réseaux sociaux et d’une mise en avant optimale sur notre site." />
            </li>
            <li>
              <strong><TranslatedText text="Accompagnement Digital et Direct :" /></strong>{" "}
              <TranslatedText text="Participez à des visio-conférences régulières et aux réunions régionales pour échanger directement avec le réseau." />
            </li>
            <li>
              <strong><TranslatedText text="Événements Stratégiques :" /></strong>{" "}
              <TranslatedText text="Assurez votre présence lors des salons et événements majeurs pour accroître votre visibilité." />
            </li>
            <li>
              <strong><TranslatedText text="Accompagnement personnalisé :" /></strong>{" "}
              <TranslatedText text="Bénéficiez d’un suivi sur mesure adapté à vos objectifs." />
            </li>
            <li>
              <strong><TranslatedText text="Soutien Marketing et Développement Commercial :" /></strong>{" "}
              <TranslatedText text="Outils marketing exclusifs et partenariats stratégiques." />
            </li>
          </ul>

          <div>
            <img
              loading="lazy"
              src={theImage2}
              alt="Piscine & Spa de luxe"
              className="w-full h-auto object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="mt-12">
          <Partenaires section={section6} />
        </div>
      </section>

      {/* Formulaire */}
      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] py-12">
        <section className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl italic text-center mb-6 font-serif">
            <TranslatedText text="Rejoignez le Cercle des Fournisseurs de Spa & Prestige Collection" />
          </h2>

          <p className="text-center text-lg mb-6 max-w-3xl mx-auto">
            <TranslatedText text="Rejoignez un réseau sélectif en pleine expansion et donnez à votre marque l’opportunité de se propulser vers de nouveaux horizons." />
          </p>

          <p className="text-center font-bold text-xl md:text-2xl mb-6 italic">
            <TranslatedText text="Vous souhaitez devenir une marque partenaire ?" />
          </p>

          <p className="text-center text-base mb-2">
            <TranslatedText text="Veuillez remplir ce formulaire, et nous vous recontacterons dans les plus brefs délais !" />
          </p>
          <p className="text-center text-sm text-gray-600 mb-10">
            <TranslatedText text="* Champs obligatoires" />
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="Nom*" />
              </span>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4c0a1]"
                required
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="Prénom" />
              </span>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4c0a1]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="Nom de la marque*" />
              </span>
              <input
                type="text"
                name="marque"
                value={formData.marque}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4c0a1]"
                required
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="Pays" />
              </span>
              <select
                name="pays"
                value={formData.pays}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4c0a1]"
              >
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Autre">Autre</option>
              </select>
            </label>

            <label className="flex flex-col gap-1 md:col-span-2">
              <span className="font-medium">
                <TranslatedText text="Adresse complète" />
              </span>
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4c0a1]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="Site web" />
              </span>
              <input
                type="url"
                name="siteweb"
                value={formData.siteweb}
                onChange={handleChange}
                placeholder="ex: exemple.com"
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4c0a1]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="E-mail*" />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4c0a1]"
                required
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="Téléphone" />
              </span>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4c0a1]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="Secteur d’activité" />
              </span>
              <select
                name="secteur"
                value={formData.secteur}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4c0a1]"
              >
                <option value="Hôtel">{translateSync("Hôtel")}</option>
                <option value="Spa">{translateSync("Spa")}</option>
                <option value="Centre de beauté">{translateSync("Centre de beauté")}</option>
                <option value="Restaurant">{translateSync("Restaurant")}</option>
                <option value="Autre">{translateSync("Autre")}</option>
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="Rôle de la personne" />
              </span>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4c0a1]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="Comment avez-vous connu Spa & Prestige Collection ?" />
              </span>
              <input
                type="text"
                name="connaissance"
                value={formData.connaissance}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4c0a1]"
              />
            </label>

            <label className="flex flex-col gap-1 md:col-span-2">
              <span className="font-medium">
                <TranslatedText text="Message*" />
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4c0a1] min-h-[120px]"
              />
            </label>

            <label className="flex flex-col gap-1 md:col-span-2">
              <span className="font-medium">
                <TranslatedText text="Joindre un fichier (facultatif)" />
              </span>
              <input
                type="file"
                name="fichier"
                onChange={handleChange}
                ref={fileInputRef}
                className="border border-gray-300 py-2 px-3 rounded w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[#f5f0e6] file:text-gray-700 hover:file:bg-[#e6ded1] cursor-pointer"
              />
            </label>

            <div className="md:col-span-2 flex justify-center mt-8">
              <button
                type="submit"
                className="bg-[#c4c0a1] text-white px-10 py-3 rounded-full hover:bg-[#b09456] transition-colors font-medium shadow-md"
              >
                <TranslatedText text="Envoyer ma demande" />
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}