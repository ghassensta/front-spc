import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { sendEntreprise } from "src/actions/forms";
import { paths } from "src/router/paths";
import theImage from "src/assets/SPC-solution-entreprise-1975x1318-03.jpg";
import theImage2 from "src/assets/SPC-solution-entreprise-1975x1318-04.jpg";
import { useTranslation } from "src/context/translation-context";
import { TranslatedText } from "src/components/translated-text/translated-text";
import UniversalSpinner from "src/components/universal-spinner/universal-spinner";
import { useGetHomePage } from "src/actions/homepage";
import Partenaires from "../home2/comp/partenaires";
import {
  FaUsers,
  FaShoppingBag,
  FaHandHoldingHeart,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import Select from "react-select";
import HeroImage from "src/components/hero-image/HeroImage";
import SectionHeader from "src/components/section-header/SectionHeader";
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

  const countryOptions = [
    { value: "France", label: "France" },
    { value: "Belgique", label: "Belgique" },
    { value: "Suisse", label: "Suisse" },
    { value: "Autre", label: "Autre" },
  ];

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
        <UniversalSpinner size="lg" text="Chargement des données..." />
      </div>
    );
  }

  const section6 = sections.find((s) => s.key === "section6");

  return (
    <>
      <HeroImage
        image={theImage}
        label="Spa & Prestige Collection"
        title="CSE & Collectivités"
      />

      {/* Engagement Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionHeader
          label="Notre engagement"
          title="Offrir à vos salariés des expériences de bien-être d'exception"
        />
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

              <ul className="mt-2 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#c8a96e] font-bold mt-0.5">✓</span>
                  <span>
                    <TranslatedText text="Accès privilégié à des soins et expériences bien-être uniques à tarifs préférentiels" />
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c8a96e] font-bold mt-0.5">✓</span>
                  <span>
                    <TranslatedText text="Une offre de cadeaux adaptée à l'ensemble de vos événements" />
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c8a96e] font-bold mt-0.5">✓</span>
                  <span>
                    <TranslatedText text="Des solutions packagées alliant hébergement, bien-être, restauration et autres services sur mesure" />
                  </span>
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
          <SectionHeader
            label="CSE & collectivités"
            title="Spa & Prestige Collection - CSE & Collectivités"
          />

          <p className="text-gray-600 text-lg font-bricolage max-w-2xl mx-auto text-center -mt-6 mb-12">
            <TranslatedText text="Des solutions adaptées à votre quotidien et à celui de vos salariés" />
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="py-12 bg-[#faf4ec] p-6 rounded shadow-sm text-left hover:bg-[#b8955a] duration-300 ease-out transition-colors group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F3EBDD] shrink-0 group-hover:bg-white/20">
                  <FaUsers className="text-[#b8955a] text-2xl group-hover:text-white" />
                </div>
                <h3 className="font-bold text-2xl group-hover:text-white">
                  <TranslatedText text="Commandes Groupées" />
                </h3>
              </div>
              <ul className="space-y-2 font-bricolage text-[#565656] group-hover:text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-[#b8955a] font-bold mt-0.5 group-hover:text-white">
                    ✓
                  </span>
                  <span>
                    <strong>
                      <TranslatedText text="Remises Exclusives :" />
                    </strong>{" "}
                    <TranslatedText text="Bénéficiez d'avantages tarifaires sur vos commandes groupées." />
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b8955a] font-bold mt-0.5 group-hover:text-white">
                    ✓
                  </span>
                  <span>
                    <strong>
                      <TranslatedText text="Personnalisation :" />
                    </strong>{" "}
                    <TranslatedText text="Personnalisez les cartes cadeaux pour offrir une touche unique." />
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b8955a] font-bold mt-0.5 group-hover:text-white">
                    ✓
                  </span>
                  <span>
                    <strong>
                      <TranslatedText text="Pour Toutes les Occasions :" />
                    </strong>{" "}
                    <TranslatedText text="Idéal pour Noël, départ en retraite, fêtes des mères/pères, et bien plus." />
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="py-12 bg-[#faf4ec] p-6 rounded shadow-sm text-left hover:bg-[#b8955a] duration-300 ease-out transition-colors group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F3EBDD] shrink-0 group-hover:bg-white/20">
                  <FaShoppingBag className="text-[#b8955a] text-2xl group-hover:text-white" />
                </div>
                <h3 className="font-bold text-2xl group-hover:text-white">
                  <TranslatedText text="Vente en Ligne" />
                </h3>
              </div>
              <ul className="space-y-2 font-bricolage text-[#565656] group-hover:text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-[#b8955a] font-bold mt-0.5 group-hover:text-white">
                    ✓
                  </span>
                  <span>
                    <strong>
                      <TranslatedText text="Tarifs Préférentiels :" />
                    </strong>{" "}
                    <TranslatedText text="Offrez à vos collaborateurs des réductions grâce à un code unique." />
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b8955a] font-bold mt-0.5 group-hover:text-white">
                    ✓
                  </span>
                  <span>
                    <strong>
                      <TranslatedText text="Accessibilité 24h/24 :" />
                    </strong>{" "}
                    <TranslatedText text="Permet à vos collaborateurs de commander à tout moment, en toute autonomie." />
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b8955a] font-bold mt-0.5 group-hover:text-white">
                    ✓
                  </span>
                  <span>
                    <strong>
                      <TranslatedText text="Simplicité et Rapidité :" />
                    </strong>{" "}
                    <TranslatedText text="Une solution simple et rapide pour une expérience d'achat optimale." />
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="py-12 bg-[#faf4ec] p-6 rounded shadow-sm text-left hover:bg-[#b8955a] duration-300 ease-out transition-colors group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F3EBDD] shrink-0 group-hover:bg-white/20">
                  <FaHandHoldingHeart className="text-[#b8955a] text-2xl group-hover:text-white" />
                </div>
                <h3 className="font-bold text-2xl group-hover:text-white">
                  <TranslatedText text="Avantages pour vos équipes" />
                </h3>
              </div>
              <ul className="space-y-2 font-bricolage text-[#565656] group-hover:text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-[#b8955a] font-bold mt-0.5 group-hover:text-white">
                    ✓
                  </span>
                  <span>
                    <TranslatedText text="Stimulez vos collaborateurs avec des cadeaux exceptionnels qui marquent leur quotidien." />
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b8955a] font-bold mt-0.5 group-hover:text-white">
                    ✓
                  </span>
                  <span>
                    <TranslatedText text="Exprimez votre reconnaissance en offrant des moments de bien-être uniques à vos équipes." />
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <Link
              to={paths.contact}
              className="inline-flex mx-auto font-tahoma rounded-full items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 bg-black hover:bg-[#c8a96e] text-white px-6 py-3 text-sm"
            >
              <TranslatedText text="Nous contacter" />
            </Link>
          </div>
        </div>
      </section>
      {/* Formulaire */}
      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)]">
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "#b8955a", letterSpacing: "0.2em" }}
            >
              <TranslatedText text="Notre différence" />
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold">
              <TranslatedText text="Pourquoi choisir Spa & Prestige Collection ?" />
            </h2>
            <div
              className="mx-auto mt-4"
              style={{ width: "60px", height: "2px", background: "#b8955a" }}
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">
                <TranslatedText text="Nom et prénom*" />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-[#D6C9B0] bg-white rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#c8a96e] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">
                <TranslatedText text="E-mail*" />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-[#D6C9B0] bg-white rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#c8a96e] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">
                <TranslatedText text="Téléphone" />
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-[#D6C9B0] bg-white rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#c8a96e] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">
                <TranslatedText text="Nom de l'entreprise*" />
              </span>
              <input
                type="text"
                name="entreprise"
                value={formData.entreprise}
                onChange={handleChange}
                required
                className="border border-[#D6C9B0] bg-white rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#c8a96e] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">
                <TranslatedText text="Nombre de salariés" />
              </span>
              <input
                type="text"
                name="nbr"
                value={formData.nbr}
                onChange={handleChange}
                className="border border-[#D6C9B0] bg-white rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#c8a96e] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">
                <TranslatedText text="Fonction" />
              </span>
              <input
                type="text"
                name="fonction"
                value={formData.fonction}
                onChange={handleChange}
                className="border border-[#D6C9B0] bg-white rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#c8a96e] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <span className="text-sm font-medium text-gray-700">
                <TranslatedText text="Adresse complète" />
              </span>
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="border border-[#D6C9B0] bg-white rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#c8a96e] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-700">
                <TranslatedText text="Pays" />
              </span>

              <Select
                options={countryOptions}
                value={countryOptions.find(
                  (opt) => opt.value === formData.country,
                )}
                onChange={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    country: selected?.value || "",
                  }))
                }
                placeholder="Sélectionner un pays"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    border: "1px solid #D6C9B0",
                    borderRadius: "6px",
                    minHeight: "42px",
                    boxShadow: "none",
                    backgroundColor: "white",
                    "&:hover": {
                      borderColor: "#c8a96e",
                    },
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? "#c8a96e"
                      : state.isFocused
                        ? "#FBF6EC"
                        : "white",
                    color: state.isSelected ? "white" : "#333",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "#333",
                    fontSize: "14px",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#9ca3af",
                    fontSize: "14px",
                  }),
                  indicatorSeparator: () => ({ display: "none" }),
                }}
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <span className="text-sm font-medium text-gray-700">
                <TranslatedText text="Message" />
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder={translateSync(
                  "Décrivez votre établissement, vos atouts et vos attentes...",
                )}
                className="border border-[#D6C9B0] bg-white rounded px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#c8a96e] transition-colors resize-none"
              />
            </div>

            <div className="md:col-span-2 flex justify-center pt-2">
              <button
                type="submit"
                className="uppercase tracking-[0.18em] text-sm font-semibold text-white px-12 py-3.5 rounded-full bg-black hover:bg-[#111111] transition-colors duration-300"
              >
                <TranslatedText text="Envoyer ma demande" />
              </button>
            </div>
          </form>

          {/* Besoin d'un renseignement */}
          <div className="mt-10 flex items-start gap-4 pt-8 border-t border-[#E8DCC8]">
            {/* Icône cercle */}
            <div className="shrink-0 w-11 h-11 rounded-full bg-[#F3EBDD] flex items-center justify-center">
              <FaPhone className="text-[#b8955a] text-base" />
            </div>

            <div>
              <p className="font-semibold text-gray-800 mb-0.5">
                <TranslatedText text="Besoin d'un renseignement ?" />
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <TranslatedText text="Notre équipe est à votre écoute du lundi au vendredi de 9h à 18h." />
              </p>

              <div className="flex flex-col gap-1.5">
                <a
                  href="tel:+33184801152"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#b8955a] transition-colors"
                >
                  <FaPhone className="text-[#b8955a] text-xs shrink-0" />
                  01 84 80 11 52
                </a>

                <a
                  href="mailto:partenaires@spa-prestige-collection.com"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#b8955a] transition-colors"
                >
                  <FaEnvelope className="text-[#b8955a] text-xs shrink-0" />
                  partenaires@spa-prestige-collection.com
                </a>
              </div>
            </div>
          </div>
        </section>

        <Partenaires section={section6} />
      </div>
    </>
  );
}
