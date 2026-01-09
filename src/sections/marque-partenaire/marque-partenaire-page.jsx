import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { sendMarques } from "src/actions/forms";
import validator from "validator"; 
import theImage from "src/assets/SPC-Collab-marque-1975x1318-01.jpg";
import theImage2 from "src/assets/SPC-Collab-marque-1975x1318-03.jpg";
import { useTranslation } from "src/context/translation-context";

export default function MarquePartenairePage() {
  const { translateSync } = useTranslation();

  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const fileInputRef = useRef(null);

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
    if (!formData.nom.trim()) errors.push(translateSync("Le champ Nom est requis."));
    if (!formData.marque.trim()) errors.push(translateSync("Le champ Nom de la marque est requis."));
    if (!formData.email.trim()) {
      errors.push(translateSync("Le champ Email est requis."));
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.push(translateSync("L'adresse e-mail n'est pas valide."));
      }
    }
    if (formData.telephone && !/^\+?[0-9\s-]{6,15}$/.test(formData.telephone)) {
      errors.push(translateSync("Le numéro de téléphone n'est pas valide."));
    }
    if (formData.siteweb && !validator.isURL(formData.siteweb)) {
      errors.push(translateSync("L'URL du site web doit être valide (ex: exemple.com ou https://exemple.com)."));
    }
    if (!formData.message.trim()) errors.push(translateSync("Votre message doit contenir du texte."));
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
        pending: translateSync("En cours d'envoi"),
        success: translateSync("Envoi avec succès"),
        error: translateSync("Échec lors de l'envoi"),
      });
      setFormData(initialFormData);
      if (fileInputRef.current) fileInputRef.current.value = "";
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
              "OFFREZ A VOTRE MARQUE UNE VISIBILITÉ INÉGALÉE AVEC SPA & PRESTIGE COLLECTION"
            )}
          </h1>
        </div>
      </div>

      {/* Pourquoi nous rejoindre */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-5xl italic text-center mb-12 font-serif">
          {translateSync("Pourquoi nous rejoindre ?")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ul className="space-y-4 text-justify font-bricolage text-base list-disc">
            <li>
              <strong>{translateSync("Visibilité Ciblée :")}</strong>{" "}
              {translateSync("Profitez d’une newsletter exclusive, de publications personnalisées sur nos réseaux sociaux et d’une mise en avant optimale sur notre site.")}
            </li>
            <li>
              <strong>{translateSync("Accompagnement Digital et Direct :")}</strong>{" "}
              {translateSync("Participez à des visio-conférences régulières et aux réunions régionales pour échanger directement avec le réseau et renforcer vos collaborations.")}
            </li>
            <li>
              <strong>{translateSync("Événements Stratégiques :")}</strong>{" "}
              {translateSync("Assurez votre présence lors des salons et événements majeurs pour accroître votre visibilité et multiplier les opportunités.")}
            </li>
            <li>
              <strong>{translateSync("Bénéficiez d’un accompagnement personnalisé :")}</strong>{" "}
              {translateSync("Assurez votre présence lors des salons et événements majeurs pour accroître votre visibilité et multiplier les opportunités.")}
            </li>
            <li>
              <strong>{translateSync("Soutien Marketing et Développement Commercial :")}</strong>{" "}
              {translateSync("Bénéficiez d’outils marketing exclusifs et de partenariats stratégiques pour accélérer votre développement.")}
            </li>
            <li>
              <strong>{translateSync("Collection Prestige :")}</strong>{" "}
              {translateSync("Faites rayonner votre marque...")}
            </li>
          </ul>
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
        <section className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl italic text-center mb-6 font-serif">
            {translateSync("Rejoignez le Cercle des Fournisseurs de Spa & Prestige Collection")}
          </h2>
          <p className="font-roboto text-center mb-8">
            {translateSync("Rejoignez un réseau sélectif en pleine expansion et donnez à votre marque l’opportunité de se propulser vers de nouveaux horizons.")}
          </p>
          <p className="text-center italic text-2xl font-bold">
            {translateSync("Vous souhaitez devenir une marque partenaire ?")}
          </p>
          <p className="font-tahoma text-base mt-4">
            {translateSync("Veuillez remplir ce formulaire, et nous vous recontacterons dans les plus brefs délais !")}
          </p>
          <p className="font-tahoma text-base mb-4">
            {translateSync("* Champs obligatoires")}
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 font-roboto">
            <label className="flex flex-col">
              {translateSync("Nom*")}
              <input type="text" name="nom" value={formData.nom} onChange={handleChange} className="border p-2 rounded w-full" required />
            </label>
            <label className="flex flex-col">
              {translateSync("Prénom")}
              <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} className="border p-2 rounded w-full" />
            </label>
            <label className="flex flex-col">
              {translateSync("Nom de la marque*")}
              <input type="text" name="marque" value={formData.marque} onChange={handleChange} className="border p-2 rounded w-full" required />
            </label>
            <label className="flex flex-col">
              {translateSync("Pays")}
              <select name="pays" value={formData.pays} onChange={handleChange} className="border p-2 rounded w-full">
                <option>France</option>
                <option>Belgique</option>
                <option>Suisse</option>
                <option>Autre</option>
              </select>
            </label>
            <label className="flex flex-col">
              {translateSync("Adresse complète")}
              <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} className="border p-2 rounded w-full" />
            </label>
            <label className="flex flex-col">
              {translateSync("Site web")}
              <input type="url" name="siteweb" value={formData.siteweb} onChange={handleChange} className="border p-2 rounded w-full" placeholder={translateSync("ex: exemple.com (https:// sera ajouté automatiquement)")} />
            </label>
            <label className="flex flex-col md:col-span-2">
              {translateSync("E-mail*")}
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 rounded w-full" required />
            </label>
            <label className="flex flex-col">
              {translateSync("Téléphone")}
              <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} className="border p-2 rounded w-full" />
            </label>
            <label className="flex flex-col">
              {translateSync("Secteur d’activité")}
              <select name="secteur" value={formData.secteur} onChange={handleChange} className="border p-2 rounded w-full">
                <option value="Hôtel">{translateSync("Hôtel")}</option>
                <option value="Spa">{translateSync("Spa")}</option>
                <option value="Centre de beauté">{translateSync("Centre de beauté")}</option>
                <option value="Restaurant">{translateSync("Restaurant")}</option>
                <option value="Autre">{translateSync("Autre")}</option>
              </select>
            </label>
            <label className="flex flex-col">
              {translateSync("Rôle de la personne")}
              <input type="text" name="role" value={formData.role} onChange={handleChange} className="border p-2 rounded w-full" />
            </label>
            <label className="flex flex-col">
              {translateSync("Comment avez-vous connu Spa & Prestige Collection ?")}
              <input type="text" name="connaissance" value={formData.connaissance} onChange={handleChange} className="border p-2 rounded w-full" />
            </label>
            <label className="flex flex-col md:col-span-2">
              {translateSync("Message*")}
              <textarea required name="message" value={formData.message} onChange={handleChange} className="border p-2 rounded w-full" rows="4" />
            </label>
            <label className="flex flex-col md:col-span-2">
              {translateSync("Joindre un fichier")}
              <input type="file" name="fichier" onChange={handleChange} className="border p-2 rounded w-full" ref={fileInputRef} />
            </label>
            <div className="md:col-span-2 flex justify-center">
              <button type="submit" className="bg-[#c4c0a1] text-white px-8 rounded-full py-2 hover:bg-[#b09456] transition">
                {translateSync("Envoyer")}
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
