import React, { useState } from "react";
import { toast } from "react-toastify";
import { sendMarques } from "src/actions/forms";

export default function MarquePartenairePage() {
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

   const validateForm = () => {
    const errors = [];

    if (!formData.nom.trim()) {
      errors.push("Le champ Nom est requis.");
    }

    if (!formData.marque.trim()) {
      errors.push("Le champ Nom de la marque est requis.");
    }

    if (!formData.email.trim()) {
      errors.push("Le champ Email est requis.");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.push("L'adresse e-mail n'est pas valide.");
      }
    }

    if (formData.telephone && !/^\+?[0-9\s-]{6,15}$/.test(formData.telephone)) {
      errors.push("Le numéro de téléphone n'est pas valide.");
    }

    if (formData.siteweb && !/^https?:\/\/[^\s]+$/.test(formData.siteweb)) {
      errors.push("L'URL du site web doit être valide (commencer par http ou https).");
    }

    if(!formData.message.trim()) {
      errors.push("Votre email doit contient une message")
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
      const promise = sendMarques(formData);
      toast.promise(promise, {
        pending: "En cours d'envoi",
        success: "Envoi avec succès",
        error: "Échec lors de l'envoi",
      });

      console.log(formData)
    } catch (error) {
      console.error("Erreur lors de l'envoi", error);
      toast.error("Une erreur inattendue est survenue.");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden hidden md:block"
        style={{
          backgroundImage:
            "url('https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-white text-4xl md:text-5xl max-w-5xl mx-auto text-center font-bold leading-snug">
            OFFREZ A VOTRE MARQUE UNE VISIBILITÉ INÉGALÉE AVEC SPA & PRESTIGE
            COLLECTION
          </h1>
        </div>
      </div>

      {/* Pourquoi nous rejoindre */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-5xl italic text-center mb-12 font-serif">
          Pourquoi nous rejoindre ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ul className="space-y-4 text-justify font-bricolage text-base list-disc">
            <li>
              <strong>Visibilité Ciblée :</strong> Profitez d’une newsletter exclusive, de publications personnalisées sur nos réseaux sociaux et d’une mise en avant optimale sur notre site.
            </li>
            <li>
              <strong>Accompagnement Digital et Direct :</strong> Participez à des visio-conférences régulières et aux réunions régionales pour échanger directement avec le réseau et renforcer vos collaborations.
            </li>
            <li>
              <strong>Événements Stratégiques :</strong> Assurez votre présence lors des salons et événements majeurs pour accroître votre visibilité et multiplier les opportunités.
            </li>
            <li>
              <strong>Bénéficiez d’un accompagnement personnalisé :</strong>{" "}
              Assurez votre présence lors des salons et événements majeurs pour accroître votre visibilité et multiplier les opportunités.
            </li>
            <li>
              <strong>Soutien Marketing et Développement Commercial :</strong>{" "}
              Bénéficiez d’outils marketing exclusifs et de partenariats stratégiques pour accélérer votre développement.
              </li>
            <li>
              <strong>Collection Prestige :</strong> Faites rayonner votre
              marque...
            </li>
          </ul>

          <div>
            <img
              lazyload="lazy"
              src="https://spa-prestige-collection.com/wp-content/uploads/2025/05/SPC-equipe-ce-1975x1318-1-768x513.jpg"
              alt="Piscine spa"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Form */}
      <div className="bg-[#FBF6EC] p-8 w-screen relative left-[calc(-50vw+50%)]">
        <section className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl italic text-center mb-6 font-serif">
            Rejoignez le Cercle des Fournisseurs de Spa & Prestige Collection
          </h2>
          <p className="font-roboto text-center mb-8">
            Rejoignez un réseau sélectif en pleine expansion et donnez à votre marque l’opportunité de se propulser vers de nouveaux horizons.
          </p>
          <p className="text-center italic text-2xl font-bold">
            Vous souhaitez devenir une marque partenaire ?
          </p>
          <p className="font-tahoma text-base mt-4">Veuillez remplir ce formulaire, et nous vous recontacterons dans les plus brefs délais !</p>
          <p className="font-tahoma text-base mb-4">* Champs obligatoires</p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 font-roboto"
          >
            <label className="flex flex-col">
              Nom*
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
              Prénom
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <label className="flex flex-col">
              Nom de la marque*
              <input
                type="text"
                name="marque"
                value={formData.marque}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </label>

            <label className="flex flex-col">
              Pays
              <select
                name="pays"
                value={formData.pays}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option>France</option>
                <option>Belgique</option>
                <option>Suisse</option>
                <option>Autre</option>
              </select>
            </label>

            <label className="flex flex-col">
              Adresse complète
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <label className="flex flex-col">
              Site web
              <input
                type="text"
                name="siteweb"
                value={formData.siteweb}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <label className="flex flex-col md:col-span-2">
              E-mail*
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
              Téléphone
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <label className="flex flex-col">
              Secteur d’activité
              <select
                name="secteur"
                value={formData.secteur}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="Hôtel">Hôtel</option>
                <option value="Spa">Spa</option>
                <option value="Centre de beauté">Centre de beauté</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Autre">Autre</option>
              </select>
            </label>

            <label className="flex flex-col">
              Rôle de la personne
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <label className="flex flex-col">
              Comment avez-vous connu Spa & Prestige Collection ?
              <input
                type="text"
                name="connaissance"
                value={formData.connaissance}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <label className="flex flex-col md:col-span-2">
              Message*
              <textarea
              required
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                rows="4"
              />
            </label>

            <label className="flex flex-col md:col-span-2">
              Joindre un fichier
              <input
                type="file"
                name="fichier"
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </label>

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-[#c0a765] text-white px-8 py-2 rounded hover:bg-[#b09456] transition"
              >
                Envoyer
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
