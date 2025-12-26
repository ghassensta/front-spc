import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { sendEntreprise } from "src/actions/forms";
import { paths } from "src/router/paths";
import theImage from "src/assets/SPC-solution-entreprise-1975x1318-03.jpg";
import theImage2 from "src/assets/SPC-solution-entreprise-1975x1318-04.jpg";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "src/context/translation-context";

export default function SolutionsPageView() {
  const { translateSync } = useTranslation();
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    entreprise: "",
    nbr: "",
    fonction: "",
    country: "France",
    adresse: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);

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
      }).then(() => {
        setFormData(initialFormData);
      });
    } catch (error) {
      toast.error(translateSync("Une erreur inattendue est survenue."));
    }
  };
  return (
    <>
      <div
        className="w-screen relative left-[calc(-50vw+50%)] h-96 bg-black bg-center bg-cover bg-fixed overflow-hidden hidden md:block"
        style={{
          backgroundImage:
            `url(${theImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-white text-4xl md:text-5xl max-w-5xl mx-auto text-center font-bold leading-snug">
            <TranslatedText text="Spa & Prestige Collection – CSE & Collectivités" />
          </h1>
        </div>
      </div>

      {}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl italic font-bold text-center mb-12">
          <TranslatedText text="NOTRE ENGAGEMENT : Offrir à vos salariés des expériences bien-être d’exception !" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {}
          <div className="space-y-4 text-sm font-bricolage leading-relaxed">
            <p>
              <strong><TranslatedText text="Un engagement local et national," /></strong> <TranslatedText text="soutenant l’essor économique des régions et offrant des avantages exclusifs aux salariés." />
            </p>

            <p>
              <strong>
                <TranslatedText text="Offrez aux CSE et Associations des solutions bien-être et cadeaux uniques :" />
              </strong>{" "}
              <TranslatedText text="cartes cadeaux, offres exclusives, commandes groupées et personnalisation sur-mesure." />
            </p>

            <p>
              <strong><TranslatedText text="Des expériences bien-être adaptées" /></strong> <TranslatedText text="aux envies des salariés, avec un large choix d’établissements sélectionnés pour leur excellence en France et en Europe." />
            </p>

            <div>
              <strong><TranslatedText text="Avantages pour vos collaborateurs :" /></strong>
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

            <p>
              <strong><TranslatedText text="Un engagement local et national," /></strong> <TranslatedText text="soutenant l’essor économique des régions et offrant des avantages exclusifs aux salariés." />
            </p>
          </div>

          {}
          <div>
            <img
              loading="lazy"
              src={theImage2}
              alt={translateSync("Réunion d'équipe")}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl mb-2">
            <TranslatedText text="Spa & Prestige Collection - CSE & Collectivités" />
          </h2>
          <p className="text-gray-600 mb-12 text-lg font-bricolage">
            <TranslatedText text="Des solutions adaptées à votre quotidien et à celui de vos salariés" />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {}
            <div className="py-12 bg-[#faf4ec] p-6 rounded shadow-sm text-left hover:bg-[#B6B499] duration-300 ease-out">
              <h3 className="font-bold text-2xl mb-4"><TranslatedText text="Commandes Groupées" /></h3>
              <ul className="list-disc list-inside space-y-2 font-bricolage text-[#565656]">
                <li>
                  <strong><TranslatedText text="Remises Exclusives :" /></strong> <TranslatedText text="Bénéficiez d'avantages tarifaires sur vos commandes groupées." />
                </li>
                <li>
                  <strong><TranslatedText text="Cartes Cadeaux :" /></strong> <TranslatedText text="Disponibles en version physique ou digitale pour répondre à vos besoins." />
                </li>
                <li>
                  <strong><TranslatedText text="Personnalisation :" /></strong> <TranslatedText text="Personnalisez les cartes cadeaux pour offrir une touche unique." />
                </li>
                <li>
                  <strong><TranslatedText text="Pour Toutes les Occasions :" /></strong> <TranslatedText text="Idéal pour Noël, départ en retraite, fêtes des mères/pères, et bien plus." />
                </li>
              </ul>
            </div>

            {}
            <div className="py-12 bg-[#faf4ec] p-6 rounded shadow-sm text-left hover:bg-[#B6B499] duration-300 ease-out">
              <h3 className="font-bold text-2xl mb-4"><TranslatedText text="Vente en Ligne" /></h3>
              <ul className="list-disc list-inside space-y-2 font-bricolage text-[#565656]">
                <li>
                  <strong><TranslatedText text="Tarifs Préférentiels :" /></strong> <TranslatedText text="Offrez à vos collaborateurs des réductions grâce à un code unique." />
                </li>
                <li>
                  <strong><TranslatedText text="Accessibilité 24h/24 :" /></strong> <TranslatedText text="Permet à vos collaborateurs de commander à tout moment, en toute autonomie." />
                </li>
                <li>
                  <strong><TranslatedText text="Simplicité et Rapidité :" /></strong> <TranslatedText text="Une solution simple et rapide pour une expérience d'achat optimale." />
                </li>
              </ul>
            </div>

            {}
            <div className="py-12 bg-[#faf4ec] p-6 rounded shadow-sm text-left hover:bg-[#B6B499] duration-300 ease-out">
              <h3 className="font-bold mb-4 text-2xl">
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

          {}
          <div className="mt-10">
            <Link to={paths.contact} className="inline-flex mx-auto font-tahoma rounded-full items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 bg-[#B6B499] hover:bg-black text-white px-6 py-3 text-sm">
              <TranslatedText text="Nous contacter" />
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-[#FBF6EC] p-8 w-screen relative left-[calc(-50vw+50%)]">
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 font-serif">
            <TranslatedText text="Pourquoi choisir Spa & Prestige Collection ?" />
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-2 font-roboto"
          >
            {}
            <label className="flex flex-col">
              <TranslatedText text="Nom et prénom*" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
              />
            </label>

            {}
            <label className="flex flex-col">
              <TranslatedText text="E-mail*" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
              />
            </label>

            {}
            <label className="flex flex-col">
              <TranslatedText text="Téléphone" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
              />
            </label>

            {}
            <label className="flex flex-col">
              <TranslatedText text="Nom de l'entreprise*" />
              <input
                type="text"
                name="entreprise"
                value={formData.entreprise}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
              />
            </label>

            {}
            <label className="flex flex-col">
              <TranslatedText text="Nombre de salariés" />
              <input
                type="text"
                name="nbr"
                value={formData.nbr}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
              />
            </label>

            {}
            <label className="flex flex-col">
              <TranslatedText text="Fonction" />
              <input
                type="text"
                name="fonction"
                value={formData.fonction}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
              />
            </label>

            {}
            <label className="flex flex-col">
              <TranslatedText text="Adresse complète" />
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
              />
            </label>

            {}
            <label className="flex flex-col">
              <TranslatedText text="Pays" />
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
              >
                <option value="France"><TranslatedText text="France" /></option>
                <option value="Belgique"><TranslatedText text="Belgique" /></option>
                <option value="Suisse"><TranslatedText text="Suisse" /></option>
                <option value="Autre"><TranslatedText text="Autre" /></option>
              </select>
            </label>

            {}
            <label className="flex flex-col md:col-span-2">
              <TranslatedText text="Message" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="border py-1 px-2 rounded w-full"
                rows="4"
              ></textarea>
            </label>

            {}
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-[#c4c0a1] text-white px-8 py-2 rounded-full hover:bg-[#B6B499] w-max transition"
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