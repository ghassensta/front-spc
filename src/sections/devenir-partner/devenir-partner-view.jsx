import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { sendDevenirPartenaire } from "src/actions/forms";
import theImage from "src/assets/SPC-Devenir-Partenaire-1975x1318-03.jpg";
import theImage2 from "src/assets/SPC-Devenir-Partenaire-1975x1318-02.jpg";
import { useTranslation } from "src/context/translation-context";
import { TranslatedText } from "src/components/translated-text/translated-text";
import HeroImage from "src/components/hero-image/HeroImage";
import SectionHeader from "src/components/section-header/SectionHeader";
import ButtonLink from "src/components/button-link/ButtonLink";

import Select from "react-select";
import {
  FaBullseye,
  FaUsers,
  FaChartLine,
  FaEye,
  FaUserCheck,
  FaHandshake,
  FaPaperPlane,
} from "react-icons/fa";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";

const inputClass =
  "border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#b8955a] text-gray-700 w-full";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? GOLD : "#d1d5db",
    boxShadow: state.isFocused ? `0 0 0 2px ${GOLD}` : "none",
    borderRadius: "6px",
    minHeight: "42px",
    "&:hover": { borderColor: GOLD },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? GOLD
      : state.isFocused
        ? "#f3ebdd"
        : "white",
    color: "#333",
    cursor: "pointer",
  }),
  singleValue: (base) => ({ ...base, color: "#374151" }),
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

const advantages = [
  {
    icon: <FaChartLine />,
    bold: "Boostez votre Chiffre d'Affaires :",
    text: "Développez vos revenus grâce à la vente de cartes cadeaux et à des partenariats avec des comités d'entreprise.",
  },
  {
    icon: <FaUsers />,
    bold: "Recrutez et fidélisez une clientèle qualifiée :",
    text: "Grâce à des actions ciblées et des programmes de fidélité.",
  },
  {
    icon: <FaBullseye />,
    bold: "Maximisez votre taux d'occupation :",
    text: "Augmentez votre présence en ligne avec des offres de dernière minute.",
  },
  {
    icon: <FaEye />,
    bold: "Renforcez votre visibilité :",
    text: "Profitez de stratégies de communication sur mesure et de votre présence au sein du guide exclusif : Collection Prestige.",
  },
  {
    icon: <FaUserCheck />,
    bold: "Bénéficiez d'un accompagnement personnalisé :",
    text: "Optimisez votre stratégie avec un soutien sur mesure.",
  },
  {
    icon: <FaHandshake />,
    bold: "Créez des synergies :",
    text: "Stimulez votre croissance avec des partenariats stratégiques.",
  },
];

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
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) setFileName(files[0].name);
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.etablissement.trim())
      errors.push(translateSync("Le nom de l'établissement est obligatoire."));
    if (!formData.nom.trim())
      errors.push(translateSync("Le nom est obligatoire."));
    if (!formData.email.trim())
      errors.push(translateSync("L'email est obligatoire."));
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.push(translateSync("Veuillez entrer un email valide."));
    if (formData.telephone && !/^\+?[0-9\s-]{6,20}$/.test(formData.telephone))
      errors.push(
        translateSync("Veuillez entrer un numéro de téléphone valide."),
      );
    if (!formData.message.trim())
      errors.push(translateSync("Le message est obligatoire."));
    if (!formData.secteur)
      errors.push(translateSync("Le secteur est obligatoire."));
    if (formData.fichier) {
      if (
        !["image/jpeg", "image/png", "application/pdf"].includes(
          formData.fichier.type,
        )
      )
        errors.push(
          translateSync("Le fichier doit être en format JPEG, PNG ou PDF."),
        );
      if (formData.fichier.size > 5 * 1024 * 1024)
        errors.push(
          translateSync("La taille du fichier ne doit pas dépasser 5 Mo."),
        );
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
      toast
        .promise(sendDevenirPartenaire(formData), {
          pending: translateSync("En cours d'envoi"),
          success: translateSync("Envoi avec succès"),
          error: translateSync("Échec lors de l'envoi"),
        })
        .then(() => {
          setFormData(initialFormData);
          setFileName("");
          if (fileInputRef.current) fileInputRef.current.value = "";
        });
    } catch {
      toast.error(translateSync("Une erreur inattendue est survenue."));
    }
  };

  return (
    <div style={{ fontFamily: FONT }}>
      {/* ── Hero ── */}
      <HeroImage
        image={theImage}
        label="Spa & Prestige Collection"
        title="Élevez votre établissement au rang de référence avec Spa & Prestige Collection."
      />

      {/* ── Pourquoi nous rejoindre ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <SectionHeader
          label="Spa & Prestige Collection"
          title="Pourquoi nous rejoindre ?"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <ul className="space-y-5">
            {advantages.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full shrink-0 mt-0.5"
                  style={{ backgroundColor: "#F3EBDD" }}
                >
                  <span style={{ color: GOLD }}>{item.icon}</span>
                </div>
                <p
                  className="text-sm text-gray-700 leading-relaxed"
                  style={{ fontFamily: FONT }}
                >
                  <strong className="text-gray-900">
                    {translateSync(item.bold)}
                  </strong>{" "}
                  {translateSync(item.text)}
                </p>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <img
              loading="lazy"
              src={theImage2}
              alt={translateSync("Piscine spa")}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ── Formulaire ── */}
      <div
        className="w-screen relative left-[calc(-50vw+50%)] py-12"
        style={{ backgroundColor: "#FBF6EC" }}
      >
        <section className="max-w-6xl mx-auto px-4">
          <SectionHeader
            label="Rejoignez-nous"
            title="Vous souhaitez devenir adhérent de Spa & Prestige Collection ?"
          />

          <p className="text-center text-sm mb-2" style={{ fontFamily: FONT }}>
            {translateSync(
              "Veuillez remplir ce formulaire, et nous vous recontacterons dans les plus brefs délais !",
            )}
          </p>
          <p className="text-center text-sm text-gray-500 italic mb-8">
            {translateSync("* Champs obligatoires")}
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
          >
            {/* Établissement */}
            <label className="flex flex-col gap-1 md:col-span-2">
              <span className="font-semibold">
                <TranslatedText text="Nom de l'établissement*" />
              </span>
              <input
                type="text"
                name="etablissement"
                value={formData.etablissement}
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
                value={paysOptions.find((o) => o.value === formData.pays)}
                onChange={(s) => setFormData((p) => ({ ...p, pays: s.value }))}
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
                type="text"
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
                value={secteurOptions.find((o) => o.value === formData.secteur)}
                onChange={(s) =>
                  setFormData((p) => ({ ...p, secteur: s.value }))
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
                className="border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-[#b8955a] min-h-[120px] text-gray-700 w-full"
              />
            </label>

            {/* Fichier */}
            <label className="flex flex-col gap-1 md:col-span-2">
              <span className="font-semibold">
                <TranslatedText text="Ajouter photos (JPEG, PNG, PDF – 5 Mo maximum)" />
              </span>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed rounded-lg bg-white hover:bg-[#f5f0e6] transition-colors py-6 px-4 flex flex-col items-center justify-center gap-2 text-center"
                style={{ borderColor: GOLD }}
              >
                {fileName ? (
                  <span className="text-gray-700 font-medium text-sm break-all">
                    {fileName}
                  </span>
                ) : (
                  <>
                    <span className="text-gray-600 text-sm">
                      <TranslatedText text="Cliquez pour sélectionner un fichier" />
                    </span>
                    <span className="text-gray-400 text-xs italic">
                      <TranslatedText text="Formats acceptés : JPEG, PNG, PDF – 5 Mo maximum" />
                    </span>
                  </>
                )}
              </div>
              <input
                type="file"
                name="fichier"
                onChange={handleChange}
                ref={fileInputRef}
                accept=".jpg,.jpeg,.png,.pdf"
                className="hidden"
              />
            </label>

            {/* CTA Principal — soumission du formulaire (conversion) */}
            <div className="md:col-span-2 flex justify-center mt-6">
              <ButtonLink text="ENVOYER MA DEMANDE" />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
