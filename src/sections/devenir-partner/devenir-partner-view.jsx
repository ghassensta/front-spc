import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { sendDevenirPartenaire } from "src/actions/forms";
import theImage from "src/assets/SPC-Devenir-Partenaire-1975x1318-03.jpg";
import theImage2 from "src/assets/SPC-Devenir-Partenaire-1975x1318-02.jpg";
import { useTranslation } from "src/context/translation-context";

export default function DevenirPartnerView() {
  const { translateSync } = useTranslation();

  const initialFormData = {
    etablissement: "",
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.etablissement.trim())
      errors.push(translateSync("Le nom de l'établissement est obligatoire."));
    if (!formData.nom.trim())
      errors.push(translateSync("Le nom est obligatoire."));
    if (!formData.email.trim()) {
      errors.push(translateSync("L'email est obligatoire."));
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.push(translateSync("Veuillez entrer un email valide."));
      }
    }
    if (formData.telephone && !/^\+?[0-9\s-]{6,20}$/.test(formData.telephone)) {
      errors.push(translateSync("Veuillez entrer un numéro de téléphone valide."));
    }
    if (!formData.message.trim())
      errors.push(translateSync("Le message est obligatoire."));
    if (!formData.secteur)
      errors.push(translateSync("Le secteur est obligatoire."));

    if (formData.fichier) {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(formData.fichier.type)) {
        errors.push(
          translateSync("Le fichier doit être en format JPEG, PNG ou PDF.")
        );
      }
      if (formData.fichier.size > 5 * 1024 * 1024) {
        errors.push(
          translateSync("La taille du fichier ne doit pas dépasser 5 Mo.")
        );
      }
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
      const promise = sendDevenirPartenaire(formData);
      toast.promise(promise, {
        pending: translateSync("En cours d'envoi"),
        success: translateSync("Envoi avec succès"),
        error: translateSync("Échec lors de l'envoi"),
      }).then(() => {
        setFormData(initialFormData);
        if (fileInputRef.current) fileInputRef.current.value = "";
      });
    } catch (error) {
      toast.error(translateSync("Une erreur inattendue est survenue."));
    }
  };

  return (
    <>
      {/* Header Image */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden hidden md:block"
        style={{ backgroundImage: `url(${theImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-white text-4xl md:text-5xl max-w-5xl mx-auto text-center font-bold leading-snug">
            {translateSync(
              "ÉLEVEZ VOTRE ÉTABLISSEMENT AU RANG DE RÉFÉRENCE AVEC SPA & PRESTIGE COLLECTION."
            )}
          </h1>
        </div>
      </div>

      {/* Pourquoi nous rejoindre */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-6 md:mb-12 font-serif">
          {translateSync("Pourquoi nous rejoindre ?")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4 text-justify font-bricolage text-sm">
            <p>
              <strong>
                {translateSync("Boostez votre Chiffre d’Affaires :")}
              </strong>{" "}
              {translateSync(
                "Développez vos revenus grâce à la vente de cartes cadeaux et à des partenariats avec des comités d’entreprise."
              )}
            </p>
            <p>
              <strong>
                {translateSync("Recrutez et fidélisez une clientèle qualifiée :")}
              </strong>{" "}
              {translateSync(
                "Grâce à des actions ciblées et des programmes de fidélité."
              )}
            </p>
            <p>
              <strong>
                {translateSync("Maximisez votre taux d’occupation :")}
              </strong>{" "}
              {translateSync(
                "Augmentez votre présence en ligne avec des offres de dernière minute."
              )}
            </p>
            <p>
              <strong>{translateSync("Renforcez votre visibilité :")}</strong>{" "}
              {translateSync(
                "Profitez de stratégies de communication sur mesure et de votre présence au sein du guide exclusif : Collection Prestige."
              )}
            </p>
            <p>
              <strong>{translateSync("Bénéficiez d’un accompagnement personnalisé :")}</strong>{" "}
              {translateSync(
                "Optimisez votre stratégie avec un soutien sur mesure."
              )}
            </p>
            <p>
              <strong>{translateSync("Créez des synergies :")}</strong>{" "}
              {translateSync(
                "Stimulez votre croissance avec des partenariats stratégiques."
              )}
            </p>
          </div>

          <div>
            <img
              loading="lazy"
              src={theImage2}
              alt={translateSync("Piscine spa")}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <div className="bg-[#FBF6EC] p-8 w-screen relative left-[calc(-50vw+50%)]">
        <section className="max-w-6xl mx-auto px-4 py-16 font-roboto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 font-serif">
            {translateSync(
              "Vous souhaitez devenir adhérent de Spa & Prestige Collection ?"
            )}
          </h2>
          <p className="text-center text-sm mb-8">
            {translateSync(
              "Veuillez remplir ce formulaire, et nous vous recontacterons dans les plus brefs délais !"
            )}
            <br />
            <span className="text-red-500">*</span>{" "}
            {translateSync("Champs obligatoires")}
          </p>

          <form
            onSubmit={handleSubmit}
            method="POST"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <label className="flex flex-col md:col-span-2">
              {translateSync("Nom de l'établissement*")}
              <input
                type="text"
                name="etablissement"
                value={formData.etablissement}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </label>

            <label className="flex flex-col">
              {translateSync("Nom*")}
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </label>

            <label className="flex flex-col">
              {translateSync("Prénom")}
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <label className="flex flex-col">
              {translateSync("Téléphone")}
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <label className="flex flex-col">
              {translateSync("E-mail*")}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </label>

            <label className="flex flex-col">
              {translateSync("Pays")}
              <select
                name="pays"
                value={formData.pays}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="France">{translateSync("France")}</option>
                <option value="Belgique">{translateSync("Belgique")}</option>
                <option value="Suisse">{translateSync("Suisse")}</option>
                <option value="Autre">{translateSync("Autre")}</option>
              </select>
            </label>

            <label className="flex flex-col">
              {translateSync("Adresse complète")}
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <label className="flex flex-col">
              {translateSync("Site web")}
              <input
                type="text"
                name="siteweb"
                value={formData.siteweb}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <label className="flex flex-col">
              {translateSync("Rôle de la personne qui nous contacte")}
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <label className="flex flex-col">
              {translateSync("Secteur d'activité*")}
              <select
                name="secteur"
                value={formData.secteur}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              >
                <option value="Hôtel">{translateSync("Hôtel")}</option>
                <option value="Spa">{translateSync("Spa")}</option>
                <option value="Centre de beauté">{translateSync("Centre de beauté")}</option>
                <option value="Restaurant">{translateSync("Restaurant")}</option>
                <option value="Autre">{translateSync("Autre")}</option>
              </select>
            </label>

            <label className="flex flex-col">
              {translateSync("Comment avez-vous connu Spa & Prestige Collection ?")}
              <input
                type="text"
                name="connaissance"
                value={formData.connaissance}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <label className="flex flex-col md:col-span-2">
              {translateSync("Message*")}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                rows="4"
                required
              />
            </label>

            <label className="flex flex-col md:col-span-2">
              {translateSync("Ajouter photos (JPEG, PNG, PDF et 5 Mo maximum)")}
              <input
                type="file"
                name="fichier"
                onChange={handleChange}
                className="w-full"
                ref={fileInputRef}
              />
            </label>

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-[#c4c0a1] text-white px-8 py-2 rounded-full hover:bg-[#b09456] transition"
              >
                {translateSync("Envoyer")}
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
