import React, { useState } from "react";

export default function MarquePartenairePage() {
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare FormData for file uploads
    const formPayload = new FormData();
    for (const key in formData) {
      formPayload.append(key, formData[key]);
    }

    alert("Formulaire soumis !");
    // Here you could send formPayload via fetch or axios
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden"
        style={{
          backgroundImage:
            "url('https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-white text-4xl md:text-5xl max-w-5xl mx-auto text-center font-bold leading-snug">
            OFFREZ A VOTRE MARQUE UNE VISIBILITÉ INÉGALÉE AVEC SPA & PRESTIGE COLLECTION
          </h1>
        </div>
      </div>

      {/* Pourquoi nous rejoindre */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 font-serif">
          Pourquoi nous rejoindre ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4 text-justify font-bricolage text-sm">
            <p><strong>Visibilité Ciblée :</strong> Profitez d’une newsletter exclusive...</p>
            <p><strong>Accompagnement Digital et Direct :</strong> Participez à des visio-conférences...</p>
            <p><strong>Événements Stratégiques :</strong> Profitez de stratégies sur mesure...</p>
            <p><strong>Bénéficiez d’un accompagnement personnalisé :</strong> Optimisez votre stratégie...</p>
            <p><strong>Soutien Marketing et Développement Commercial :</strong> Outils marketing exclusifs...</p>
            <p><strong>Collection Prestige :</strong> Faites rayonner votre marque...</p>
          </div>

          <div>
            <img lazyload="lazy"
              src="https://spa-prestige-collection.com/wp-content/uploads/2025/05/SPC-equipe-ce-1975x1318-1-768x513.jpg"
              alt="Piscine spa"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Form */}
      <div className="bg-[#FBF6EC] p-8 w-screen relative left-[calc(-50vw+50%)]">
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 font-serif">
            Rejoignez le Cercle des Fournisseurs de Spa & Prestige Collection
          </h2>
          <p className="font-roboto text-center text-sm mb-8">
            Rejoignez un réseau sélectif en pleine expansion...
          </p>
          <p className="text-center text-lg font-bold">
            Vous souhaitez devenir une marque partenaire ?
          </p>

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
                name="etablissement"
                value={formData.etablissement}
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

            <label className="flex flex-col col-span-2">
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
                <option>Hôtel</option>
                <option>Restaurant</option>
                <option>Bien-être</option>
                <option>Autre</option>
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
              Message
              <textarea
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