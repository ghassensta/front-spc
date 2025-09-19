import React, { useState } from "react";

export default function SolutionsPageView() {
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
        if (files) {
          setFormData({ ...formData, [name]: files[0] });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert("Formulaire soumis !");
      };
  return (
    <>
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden"
        style={{
          backgroundImage:
            "url('https://spa-prestige-collection.com/wp-content/uploads/2025/03/SPC-Essence-1975x1318-02.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-white text-4xl md:text-5xl max-w-5xl mx-auto text-center font-bold leading-snug italic">
            Spa & Prestige Collection – CSE & Collectivités
          </h1>
        </div>
      </div>

      {/* First Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl italic font-bold text-center mb-12">
          NOTRE ENGAGEMENT : Offrir à vos salariés des expériences bien-être d’exception !
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Column */}
          <div className="space-y-4 text-sm font-bricolage leading-relaxed">
            <p>
              <strong>Un engagement local et national,</strong> soutenant
              l’essor économique des régions et offrant des avantages exclusifs
              aux salariés.
            </p>

            <p>
              <strong>
                Offrez aux CSE et Associations des solutions bien-être et
                cadeaux uniques :
              </strong>{" "}
              cartes cadeaux, offres exclusives, commandes groupées et
              personnalisation sur-mesure.
            </p>

            <p>
              <strong>Des expériences bien-être adaptées</strong> aux envies des
              salariés, avec un large choix d’établissements sélectionnés pour
              leur excellence en France et en Europe.
            </p>

            <div>
              <strong>Avantages pour vos collaborateurs :</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  Accès privilégié à des soins et expériences bien-être uniques
                  à tarifs préférentiels
                </li>
                <li>
                  Une offre de cadeaux adaptée à l’ensemble de vos événements
                </li>
                <li>
                  <strong>
                    Des solutions packagées alliant hébergement, bien-être,
                    restauration et autres services sur mesure
                  </strong>
                </li>
              </ul>
            </div>

            <p>
              <strong>Un engagement local et national,</strong> soutenant
              l’essor économique des régions et offrant des avantages exclusifs
              aux salariés.
            </p>
          </div>

          {/* Image Column */}
          <div>
            <img lazyload="lazy"
              src="https://spa-prestige-collection.com/wp-content/uploads/2025/05/SPC-equipe-ce-1975x1318-1-768x513.jpg"
              alt="Réunion d'équipe"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* New Section from Screenshot */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl mb-2">
            Spa & Prestige Collection - CSE & Collectivités
          </h2>
          <p className="text-gray-600 mb-12 text-lg font-bricolage">
            Des solutions adaptées à votre quotidien et à celui de vos salariés
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#faf4ec] p-6 rounded shadow-sm text-left">
              <h3 className="font-bold text-2xl mb-4">Commandes Groupées</h3>
              <ul className="list-disc list-inside space-y-2 text-sm font-bricolage">
                <li>
                  <strong>Remises Exclusives :</strong> Bénéficiez d'avantages
                  tarifaires sur vos commandes groupées.
                </li>
                <li>
                  <strong>Cartes Cadeaux :</strong> Disponibles en version
                  physique ou digitale pour répondre à vos besoins.
                </li>
                <li>
                  <strong>Personnalisation :</strong> Personnalisez les cartes
                  cadeaux pour offrir une touche unique.
                </li>
                <li>
                  <strong>Pour Toutes les Occasions :</strong> Idéal pour Noël,
                  départ en retraite, fêtes des mères/pères, et bien plus.
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-[#faf4ec] p-6 rounded shadow-sm text-left">
              <h3 className="font-bold text-2xl mb-4">Vente en Ligne</h3>
              <ul className="list-disc list-inside space-y-2 text-sm font-bricolage">
                <li>
                  <strong>Tarifs Préférentiels :</strong> Offrez à vos
                  collaborateurs des réductions grâce à un code unique.
                </li>
                <li>
                  <strong>Accessibilité 24h/24 :</strong> Permet à vos
                  collaborateurs de commander à tout moment, en toute autonomie.
                </li>
                <li>
                  <strong>Simplicité et Rapidité :</strong> Une solution simple
                  et rapide pour une expérience d'achat optimale.
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-[#faf4ec] p-6 rounded shadow-sm text-left">
              <h3 className="font-bold mb-4 text-2xl">Avantages pour vos équipes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm font-bricolage">
                <li>
                  Stimulez vos collaborateurs avec des cadeaux exceptionnels qui
                  marquent leur quotidien.
                </li>
                <li>
                  Exprimez votre reconnaissance en offrant des moments de
                  bien-être uniques à vos équipes.
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Button */}
          <div className="mt-10">
            <button className="px-6 py-2 bg-[#a4a083] font-bricolage text-white rounded-full uppercase text-sm tracking-wide hover:bg-[#8d8a6d] transition">
              Nous contacter
            </button>
          </div>
        </div>
      </section>

      <div className="bg-[#FBF6EC] p-8 w-screen relative left-[calc(-50vw+50%)]">
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 font-serif">
            Pourquoi choisir Spa & Prestige Collection ?
          </h2>
          <p className="text-center italic font-bold text-xl mb-4">NOTRE ENGAGEMENT : Offrir à vos salariés des expériences bien-être d’exception !</p>
          <ul className="font-roboto list-disc text-xs space-y-2 mb-4">
            <li className="list-item">Une entreprise française engagée dans la valorisation du bien-être et des expériences d’exception.</li>
            <li className="list-item">Une équipe à votre écoute pour vous accompagner et simplifier votre quotidien.</li>
            <li className="list-item">Des solutions exclusives en matière de bien-être et de cadeaux, avec un accompagnement personnalisé pour répondre à vos besoins.</li>
          </ul>
          <p className="text-center font-bold text-xl mb-4">Prêt, partez !</p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-2 font-roboto"
          >
            {/* Nom établissement */}
            <label className="flex flex-col">
              Nom et prénom*
              <input
                type="text"
                name="etablissement"
                value={formData.etablissement}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
                required
              />
            </label>

              {/* Email */}
            <label className="flex flex-col">
              E-mail*
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
                required
              />
            </label>

             {/* Téléphone */}
            <label className="flex flex-col">
              Téléphone
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
              />
            </label>

            {/* Nom */}
            <label className="flex flex-col">
              Nom de l'entreprise*
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
                required
              />
            </label>

            {/* Prénom */}
            <label className="flex flex-col">
              Nombre de salariés
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
              />
            </label>
            <label className="flex flex-col">
              Fonction
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
              />
            </label>

             {/* Adresse */}
            <label className="flex flex-col">
              Adresse complète
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
              />
            </label>

            {/* Pays */}
            <label className="flex flex-col">
              Pays
              <select
                name="pays"
                value={formData.pays}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
              >
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Autre">Autre</option>
              </select>
            </label>

            {/* Message */}
            <label className="flex flex-col md:col-span-2">
              Message
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
                rows="4"
              ></textarea>
            </label>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-[#c0a765] text-white w-full px-8 py-2 rounded hover:bg-[#b09456] transition"
              >
                Envoyer
              </button>
            </div>

            <div className="flex w-full justify-around mt-10 gap-4 col-span-2">
                <button className="bg-[#c0a765] text-white w-max px-8 py-2 hover:bg-[#b09456] transition rounded-full">ACCUEIL</button>
                <button className="bg-[#c0a765] text-white w-max px-8 py-2 hover:bg-[#b09456] transition rounded-full">COUP DE CŒUR</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}