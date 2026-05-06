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
import Select from "react-select";
import {
  FaBullseye,
  FaVideo,
  FaBook,
  FaCalendarAlt,
  FaUserCheck,
  FaChartLine,
} from "react-icons/fa";

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

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#c4c0a1" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 2px #c4c0a1" : "none",
      borderRadius: "6px",
      minHeight: "42px",
      "&:hover": {
        borderColor: "#c4c0a1",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#c4c0a1"
        : state.isFocused
          ? "#f3ebdd"
          : "white",
      color: "#333",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#374151",
    }),
  };
  const paysOptions = [
    { value: "France", label: "France" },
    { value: "Belgique", label: "Belgique" },
    { value: "Suisse", label: "Suisse" },
    { value: "Autre", label: "Autre" },
  ];

  const secteurOptions = [
    { value: "Hôtel", label: "Hôtel" },
    { value: "Spa", label: "Spa" },
    { value: "Centre de beauté", label: "Centre de beauté" },
    { value: "Restaurant", label: "Restaurant" },
    { value: "Autre", label: "Autre" },
  ];

  const fileInputRefPhotos = useRef(null);
  const [fileName, setFileName] = useState("");
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

    if (files && files[0]) {
      setFileName(files[0].name);
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
      errors.push(translateSync("Le champ Nom de l'établissement est requis."));
    }

    if (!formData.email.trim()) {
      errors.push(translateSync("Le champ Email est requis."));
    } else if (!validator.isEmail(formData.email)) {
      errors.push(translateSync("L'adresse e-mail n'est pas valide."));
    }

    if (!formData.secteur.trim()) {
      errors.push(translateSync("Le champ Secteur d'activité est requis."));
    }

    if (formData.telephone && !/^\+?[0-9\s-]{6,15}$/.test(formData.telephone)) {
      errors.push(translateSync("Le numéro de téléphone n'est pas valide."));
    }

    if (
      formData.siteweb &&
      !validator.isURL(formData.siteweb, { require_protocol: false })
    ) {
      errors.push(
        translateSync("L'URL du site web doit être valide (ex: exemple.com)"),
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

      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error(translateSync("Une erreur inattendue est survenue."));
    }
  };

  const FONT = "Calibri, 'Segoe UI', sans-serif";
  const FONT_LIGHT =
    "'Calibri Light', 'Segoe UI Light', 'Segoe UI', sans-serif";

  const inputClass =
    "border border-gray-300 py-2 pl-9 pr-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4c0a1] text-gray-700 w-full";

  return (
    <>
      <div
        className="w-full h-96 bg-black bg-center bg-cover relative"
        style={{ backgroundImage: `url(${theImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="max-w-6xl mx-auto w-full px-6 text-white text-center">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold mb-4 uppercase">
                {translateSync("OFFREZ À VOTRE MARQUE UNE VISIBILITÉ CIBLÉE")}
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/*   */}

      {/* Pourquoi nous rejoindre */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "#C7B892", letterSpacing: "0.2em" }}
          >
            {translateSync("Nos avantages")}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            {translateSync("Pourquoi nous rejoindre ?")}
          </h2>

          <div
            className="mx-auto mt-4"
            style={{
              width: "60px",
              height: "2px",
              background: "#C7B892",
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <ul className="space-y-5 text-justify text-base">
            <li className="flex items-start gap-3">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F3EBDD] shrink-0 mt-1">
                <FaBullseye className="text-[#C7B892] text-3xl" />
              </div>
              <div>
                <strong>
                  <TranslatedText text="Visibilité ciblée :" />
                </strong>{" "}
                <TranslatedText text="Newsletter, réseaux sociaux et mise en avant sur notre site avec votre logo et redirection." />
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F3EBDD] shrink-0 mt-1">
                <FaVideo className="text-[#C7B892] text-3xl" />
              </div>
              <div>
                <strong>
                  <TranslatedText text="Accompagnement digital et direct :" />
                </strong>{" "}
                <TranslatedText text="Visioconférences régulières, échanges avec le réseau et transmission des demandes professionnelles." />
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F3EBDD] shrink-0 mt-1">
                <FaBook className="text-[#C7B892] text-3xl" />
              </div>
              <div>
                <strong>
                  <TranslatedText text="Présence sur des supports clés :" />
                </strong>{" "}
                <TranslatedText text="Guide annuel (édition avril 2027) et mise en avant lors de nos temps forts." />
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F3EBDD] shrink-0 mt-1">
                <FaCalendarAlt className="text-[#C7B892] text-3xl" />
              </div>
              <div>
                <strong>
                  <TranslatedText text="Événements stratégiques :" />
                </strong>{" "}
                <TranslatedText text="Participation à des salons, événements majeurs et opérations comme le calendrier de l'Avent ou le Championnat de France de Massage." />
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F3EBDD] shrink-0 mt-1">
                <FaUserCheck className="text-[#C7B892] text-3xl" />
              </div>
              <div>
                <strong>
                  <TranslatedText text="Accompagnement personnalisé :" />
                </strong>{" "}
                <TranslatedText text="Un suivi adapté à vos objectifs." />
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F3EBDD] shrink-0 mt-1">
                <FaChartLine className="text-[#C7B892] text-3xl" />
              </div>
              <div>
                <strong>
                  <TranslatedText text="Soutien marketing & développement :" />
                </strong>{" "}
                <TranslatedText text="Outils dédiés, collaborations et visibilité auprès de nos établissements adhérents." />
              </div>
            </li>
          </ul>

          <div className="hidden md:block">
            <img
              loading="lazy"
              src={theImage2}
              alt="Piscine & Spa de luxe"
              className="w-full h-auto object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <div className="bg-[#FBF6EC] w-screen relative left-[calc(-50vw+50%)] py-12">
        <section className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            {/* Petit label */}
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "#C7B892", letterSpacing: "0.2em" }}
            >
              <TranslatedText text="Devenir partenaire" />
            </p>

            {/* Titre principal */}
            <h2 className="text-3xl md:text-4xl font-bold">
              <TranslatedText text="Nous rejoindre" />
            </h2>

            {/* Ligne décorative */}
            <div
              className="mx-auto mt-4 mb-6"
              style={{
                width: "60px",
                height: "2px",
                background: "#C7B892",
              }}
            />

            {/* Texte */}
            <p className="text-center text-base mb-1 font-bricolage">
              <TranslatedText text="Veuillez remplir ce formulaire, et nous vous contacterons dans les plus brefs délais." />
            </p>

            <p className="text-center text-sm text-gray-500 italic">
              <TranslatedText text="* Champs obligatoires" />
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
          >
            {/* Nom de l'établissement */}
            <label className="flex flex-col gap-1 md:col-span-2">
              <span className="font-semibold">
                <TranslatedText text="Nom de l'établissement*" />
              </span>
              <input
                type="text"
                name="marque"
                value={formData.marque}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </label>

            {/* Nom */}
            <label className="flex flex-col gap-1">
              <span className="font-semibold">
                <TranslatedText text="Nom*" />
              </span>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </label>

            {/* Prénom */}
            <label className="flex flex-col gap-1">
              <span className="font-semibold">
                <TranslatedText text="Prénom" />
              </span>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className={inputClass}
              />
            </label>

            {/* Téléphone */}
            <label className="flex flex-col gap-1">
              <span className="font-semibold">
                <TranslatedText text="Téléphone" />
              </span>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className={inputClass}
              />
            </label>

            {/* Email */}
            <label className="flex flex-col gap-1">
              <span className="font-semibold">
                <TranslatedText text="E-mail*" />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </label>

            {/* Pays */}
            <label className="flex flex-col gap-1">
              <span className="font-semibold">
                <TranslatedText text="Pays" />
              </span>
              <Select
                options={paysOptions}
                value={paysOptions.find((opt) => opt.value === formData.pays)}
                onChange={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    pays: selected.value,
                  }))
                }
                styles={selectStyles}
                placeholder="Sélectionner un pays"
              />
            </label>

            {/* Adresse */}
            <label className="flex flex-col gap-1">
              <span className="font-semibold">
                <TranslatedText text="Adresse complète" />
              </span>
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className={inputClass}
              />
            </label>

            {/* Site web */}
            <label className="flex flex-col gap-1">
              <span className="font-semibold">
                <TranslatedText text="Site web" />
              </span>
              <input
                type="url"
                name="siteweb"
                value={formData.siteweb}
                onChange={handleChange}
                placeholder="ex: exemple.com"
                className={inputClass}
              />
            </label>

            {/* Rôle */}
            <label className="flex flex-col gap-1">
              <span className="font-semibold">
                <TranslatedText text="Rôle de la personne qui nous contacte" />
              </span>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={inputClass}
              />
            </label>

            {/* Secteur */}
            <label className="flex flex-col gap-1">
              <span className="font-semibold">
                <TranslatedText text="Secteur d'activité*" />
              </span>
              <Select
                options={secteurOptions}
                value={secteurOptions.find(
                  (opt) => opt.value === formData.secteur,
                )}
                onChange={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    secteur: selected.value,
                  }))
                }
                styles={selectStyles}
                placeholder="Sélectionner un secteur"
              />
            </label>

            {/* Connaissance */}
            <label className="flex flex-col gap-1 md:col-span-2">
              <span className="font-semibold">
                <TranslatedText text="Comment avez-vous connu Spa & Prestige Collection ?" />
              </span>
              <input
                type="text"
                name="connaissance"
                value={formData.connaissance}
                onChange={handleChange}
                className={inputClass}
              />
            </label>

            {/* Message */}
            <label className="flex flex-col gap-1 md:col-span-2">
              <span className="font-semibold">
                <TranslatedText text="Message*" />
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder={translateSync(
                  "Décrivez votre établissement, vos atouts et vos attentes",
                )}
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4c0a1] min-h-[120px] text-gray-700 w-full"
              />
            </label>

            {/* Upload photos */}
            <label className="flex flex-col gap-1 md:col-span-2">
              <span className="font-semibold">
                <TranslatedText text="Ajouter des photos (JPEG, PNG, PDF – 5 Mo maximum)" />
              </span>

              <label
                htmlFor="photos-upload"
                className="flex items-center gap-3 border border-dashed border-[#c8a96e] bg-white rounded px-4 py-4 cursor-pointer hover:bg-[#fdf9f2] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#c8a96e"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 5.25 5.25 0 011.233 10.59"
                  />
                </svg>

                <span className="text-sm text-gray-500">
                  {formData.photos
                    ? formData.photos.name
                    : translateSync(
                        "Cliquez pour ajouter des fichiers ou glissez-déposez ici",
                      )}
                </span>

                <input
                  id="photos-upload"
                  type="file"
                  name="photos"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </label>
            {/* Submit */}
            <div className="md:col-span-2 flex justify-center mt-8">
              <button
                type="submit"
                className="bg-black text-white px-10 py-3 rounded-full hover:bg-[#b09456] transition-colors font-semibold shadow-md"
                style={{ letterSpacing: "0.05em" }}
              >
                <TranslatedText text="ENVOYER MA DEMANDE" />
              </button>
            </div>
          </form>
        </section>

        {/* Nos marques partenaires */}
        <div className="mt-12">
          <Partenaires section={section6} />
        </div>
      </div>
    </>
  );
}
