import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { sendEntreprise } from "src/actions/forms";
import { paths } from "src/router/paths";
import theImage from "src/assets/SPC-solution-entreprise-1975x1318-03.jpg";
import theImage2 from "src/assets/SPC-solution-entreprise-1975x1318-04.jpg";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "src/context/translation-context";
import { useGetHomePage } from "src/actions/homepage";
import Partenaires from "../home2/comp/partenaires";

export default function SolutionsPageView() {
  const { translateSync } = useTranslation();
  const { sections } = useGetHomePage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    entreprise: "",
    nbr: "",
    fonction: "",
    country: "",
    adresse: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) {
      errors.push(translateSync("Le champ Nom et prénom est requis."));
    }

    if (!formData.email.trim()) {
      errors.push(translateSync("Le champ Email est requis."));
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.push(translateSync("L'adresse e-mail n'est pas valide."));
      }
    }

    if (!formData.entreprise.trim()) {
      errors.push(translateSync("Le champ Nom de l'entreprise est requis."));
    }

    if (formData.phone && !/^\+?[0-9\s-]{6,15}$/.test(formData.phone)) {
      errors.push(translateSync("Le numéro de téléphone n'est pas valide."));
    }

    if (formData.nbr && isNaN(Number(formData.nbr))) {
      errors.push(translateSync("Le nombre de salariés doit être un nombre."));
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
      const promise = sendEntreprise(formData);
      toast.promise(promise, {
        pending: translateSync("En cours d'envoi"),
        success: translateSync("Envoi avec succès"),
        error: translateSync("Échec lors de l'envoi"),
      });

      await promise;
      setFormData({
        name: "",
        email: "",
        phone: "",
        entreprise: "",
        nbr: "",
        fonction: "",
        country: "",
        adresse: "",
        message: "",
      });
    } catch (error) {
      toast.error(translateSync("Une erreur inattendue est survenue."));
    }
  };

  // ── Chargement ────────────────────────────────────────────────
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Chargement des données...</p>
          {/* Tu peux ajouter un spinner ici si tu veux */}
        </div>
      </div>
    );
  }

  const section6 = sections.find((s) => s.key === "section6");

  return (
    <>
      {/* Hero Section */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden hidden md:block"
        style={{
          backgroundImage: `url(${theImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-white text-4xl md:text-5xl max-w-5xl mx-auto text-center font-bold leading-snug">
            <TranslatedText text="Spa & Prestige Collection – CSE & Collectivités" />
          </h1>
        </div>
      </div>

      {/* Engagement Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl italic font-bold text-center mb-12">
          <TranslatedText text="NOTRE ENGAGEMENT : Offrir à vos salariés des expériences bien-être d’exception !" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-sm font-bricolage leading-relaxed">
            <p>
              <strong>
                <TranslatedText text="Un engagement local et national," />
              </strong>{" "}
              <TranslatedText text="soutenant l’essor économique des régions et offrant des avantages exclusifs aux salariés." />
            </p>

            <p>
              <strong>
                <TranslatedText text="Offrez aux CSE et Associations des solutions bien-être et cadeaux uniques :" />
              </strong>{" "}
              <TranslatedText text="cartes cadeaux, offres exclusives, commandes groupées et personnalisation sur-mesure." />
            </p>

            <p>
              <strong>
                <TranslatedText text="Des expériences bien-être adaptées" />
              </strong>{" "}
              <TranslatedText text="aux envies des salariés, avec un large choix d’établissements sélectionnés pour leur excellence en France et en Europe." />
            </p>

            <div>
              <strong>
                <TranslatedText text="Avantages pour vos collaborateurs :" />
              </strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <TranslatedText text="Accès privilégié à des soins et expériences bien-être uniques à tarifs préférentiels" />
                </li>
                <li>
                  <TranslatedText text="Une offre de cadeaux adaptée à l’ensemble de vos événements" />
                </li>
                <li>
                  <strong>
                    <TranslatedText text="Des solutions packagées alliant hébergement, bien-être, restauration et autres services sur mesure" />
                  </strong>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <img
              loading="lazy"
              src={theImage2}
              alt="Réunion d'équipe"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl mb-2">
            <TranslatedText text="Spa & Prestige Collection - CSE & Collectivités" />
          </h2>
          <p className="text-gray-600 mb-12 text-lg font-bricolage">
            <TranslatedText text="Des solutions adaptées à votre quotidien et à celui de vos salariés" />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="py-12 bg-[#faf4ec] p-6 rounded shadow-sm text-left hover:bg-[#B6B499] duration-300 ease-out transition-colors">
              <h3 className="font-bold text-2xl mb-4">
                <TranslatedText text="Commandes Groupées" />
              </h3>
              <ul className="list-disc list-inside space-y-2 font-bricolage text-[#565656]">
                <li>
                  <strong>
                    <TranslatedText text="Remises Exclusives :" />
                  </strong>{" "}
                  <TranslatedText text="Bénéficiez d'avantages tarifaires sur vos commandes groupées." />
                </li>
                <li>
                  <strong>
                    <TranslatedText text="Personnalisation :" />
                  </strong>{" "}
                  <TranslatedText text="Personnalisez les cartes cadeaux pour offrir une touche unique." />
                </li>
                <li>
                  <strong>
                    <TranslatedText text="Pour Toutes les Occasions :" />
                  </strong>{" "}
                  <TranslatedText text="Idéal pour Noël, départ en retraite, fêtes des mères/pères, et bien plus." />
                </li>
              </ul>
            </div>

            <div className="py-12 bg-[#faf4ec] p-6 rounded shadow-sm text-left hover:bg-[#B6B499] duration-300 ease-out transition-colors">
              <h3 className="font-bold text-2xl mb-4">
                <TranslatedText text="Vente en Ligne" />
              </h3>
              <ul className="list-disc list-inside space-y-2 font-bricolage text-[#565656]">
                <li>
                  <strong>
                    <TranslatedText text="Tarifs Préférentiels :" />
                  </strong>{" "}
                  <TranslatedText text="Offrez à vos collaborateurs des réductions grâce à un code unique." />
                </li>
                <li>
                  <strong>
                    <TranslatedText text="Accessibilité 24h/24 :" />
                  </strong>{" "}
                  <TranslatedText text="Permet à vos collaborateurs de commander à tout moment, en toute autonomie." />
                </li>
                <li>
                  <strong>
                    <TranslatedText text="Simplicité et Rapidité :" />
                  </strong>{" "}
                  <TranslatedText text="Une solution simple et rapide pour une expérience d'achat optimale." />
                </li>
              </ul>
            </div>

            <div className="py-12 bg-[#faf4ec] p-6 rounded shadow-sm text-left hover:bg-[#B6B499] duration-300 ease-out transition-colors">
              <h3 className="font-bold text-2xl mb-4">
                <TranslatedText text="Avantages pour vos équipes" />
              </h3>
              <ul className="list-disc list-inside space-y-2 font-bricolage text-[#565656]">
                <li>
                  <TranslatedText text="Stimulez vos collaborateurs avec des cadeaux exceptionnels qui marquent leur quotidien." />
                </li>
                <li>
                  <TranslatedText text="Exprimez votre reconnaissance en offrant des moments de bien-être uniques à vos équipes." />
                </li>
              </ul>
            </div>
          </div>

          <Partenaires section={section6} />

          <div className="mt-10">
            <Link
              to={paths.contact}
              className="inline-flex mx-auto font-tahoma rounded-full items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 bg-[#B6B499] hover:bg-black text-white px-6 py-3 text-sm"
            >
              <TranslatedText text="Nous contacter" />
            </Link>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)]">
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 font-serif">
            <TranslatedText text="Pourquoi choisir Spa & Prestige Collection ?" />
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="Nom et prénom*" />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#B6B499]"
                required
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
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#B6B499]"
                required
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="Téléphone" />
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#B6B499]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="Nom de l'entreprise*" />
              </span>
              <input
                type="text"
                name="entreprise"
                value={formData.entreprise}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#B6B499]"
                required
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="Nombre de salariés" />
              </span>
              <input
                type="text"
                name="nbr"
                value={formData.nbr}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#B6B499]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="Fonction" />
              </span>
              <input
                type="text"
                name="fonction"
                value={formData.fonction}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#B6B499]"
              />
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
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#B6B499]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-medium">
                <TranslatedText text="Pays" />
              </span>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#B6B499]"
              >
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Autre">Autre</option>
              </select>
            </label>

            <label className="flex flex-col gap-1 md:col-span-2">
              <span className="font-medium">
                <TranslatedText text="Message" />
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#B6B499] min-h-[120px]"
                rows={4}
              />
            </label>

            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#c4c0a1] text-white px-10 py-3 rounded-full hover:bg-[#B6B499] transition-colors font-medium"
              >
                <TranslatedText text="Envoyer" />
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}