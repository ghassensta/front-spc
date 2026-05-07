import React, { useState } from "react";
import { FaPhoneAlt, FaChevronRight } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { paths } from "src/router/paths";
import { sendMessage } from "src/actions/forms";
import theImage from "src/assets/images/SPC-Massage-1975x1318-02.jpg";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "src/context/translation-context";

const GOLD = "#b8955a";
const FONT = "Calibri, 'Segoe UI', sans-serif";
const FONT_LIGHT = "'Calibri Light', 'Segoe UI Light', 'Segoe UI', sans-serif";

const inputClass =
  "border border-gray-200 rounded px-3 py-2 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#b8955a] transition";

export default function ContactPageView() {
  const { translateSync } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      toast.error(translateSync("Veuillez valider le CAPTCHA"));
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error(translateSync("Veuillez remplir les champs obligatoires (Nom, Email, Message)"));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error(translateSync("Format d'email invalide"));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await sendMessage({ ...formData, recaptcha: recaptchaValue });

      if (response && response.success) {
        toast.success(translateSync("Votre message a été envoyé avec succès !"));
        setFormData({ name: "", lastName: "", email: "", phone: "", subject: "", message: "" });
        setRecaptchaValue(null);
        if (window.grecaptcha) window.grecaptcha.reset();
      } else {
        throw new Error(response?.message || translateSync("Erreur lors de l'envoi du formulaire"));
      }
    } catch (error) {
      toast.error(error.message || translateSync("Une erreur est survenue lors de l'envoi du formulaire"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen relative left-[calc(-50vw+50%)]" style={{ fontFamily: FONT }}>
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* ── Colonne gauche : image + infos contact ── */}
        <div
          className="flex flex-col justify-center px-10 py-16 relative text-white bg-center bg-cover"
          style={{ backgroundImage: `url(${theImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />

          <div className="relative z-10 max-w-sm">

            {/* Label */}
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: GOLD, letterSpacing: "0.18em", fontFamily: FONT }}
            >
              {translateSync("Nous écrire")}
            </p>

            {/* Titre */}
            <h1
              className="mb-4 leading-tight"
              style={{
                fontFamily: FONT_LIGHT,
                fontWeight: 300,
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              }}
            >
              <TranslatedText text="Contactez-nous" />
            </h1>

            {/* Séparateur doré */}
            <div className="w-10 h-0.5 mb-5" style={{ backgroundColor: GOLD }} />

            <p className="text-sm leading-relaxed mb-6 text-gray-200" style={{ fontFamily: FONT }}>
              <TranslatedText text="Nous serions ravis de vous parler." />
              <br />
              <TranslatedText text="N'hésitez pas à nous contacter en utilisant les coordonnées ci-dessous." />
            </p>

            {/* Coordonnées */}
            <div className="space-y-4" style={{ fontFamily: FONT }}>
              <a
                href="tel:+33182350126"
                className="flex items-center gap-3 text-sm text-gray-100 hover:text-white transition-colors group"
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: GOLD }}
                >
                  <FaPhoneAlt className="text-xs text-white" />
                </span>
                <span className="font-medium">+33 (0)1 82 35 01 26</span>
              </a>

              <a
                href="mailto:contact@spa-prestige-collection.com"
                className="flex items-center gap-3 text-sm text-gray-100 hover:text-white transition-colors group"
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: GOLD }}
                >
                  <MdEmail className="text-sm text-white" />
                </span>
                <span className="font-medium">contact@spa-prestige-collection.com</span>
              </a>
            </div>

          </div>
        </div>

        {/* ── Colonne droite : formulaire ── */}
        <div className="bg-white px-10 py-10 md:py-16">

          {/* Titre formulaire */}
          <p
            className="text-xs uppercase tracking-widest text-center mb-2"
            style={{ color: GOLD, letterSpacing: "0.18em", fontFamily: FONT }}
          >
            {translateSync("Formulaire de contact")}
          </p>
          <h2
            className="text-center mb-2 leading-snug"
            style={{
              fontFamily: FONT_LIGHT,
              fontWeight: 300,
              fontSize: "1.6rem",
              color: "#1a1a1a",
            }}
          >
            <TranslatedText text="Envoyez-nous un message" />
          </h2>

          {/* Séparateur doré centré */}
          <div className="flex justify-center mb-4">
            <div className="w-10 h-0.5" style={{ backgroundColor: GOLD }} />
          </div>

          <p className="mb-6 text-center text-sm text-gray-500" style={{ fontFamily: FONT }}>
            <TranslatedText text="Vous souhaitez un renseignement ? N'hésitez pas à remplir le formulaire ci-dessous :" />
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-[40em] mx-auto"
            style={{ fontFamily: FONT }}
          >
            {/* Nom / Prénom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={translateSync("Nom*")}
                className={inputClass}
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={translateSync("Prénom")}
                className={inputClass}
              />
            </div>

            {/* Email / Téléphone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={translateSync("Email*")}
                className={inputClass}
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={translateSync("Téléphone")}
                className={inputClass}
              />
            </div>

            {/* Sujet */}
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder={translateSync("Sujet")}
              className={inputClass}
            />

            {/* Message */}
            <textarea
              placeholder={translateSync("Message*")}
              rows="5"
              className={`${inputClass} min-h-[120px] resize-none`}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            {/* ReCAPTCHA */}
            <div className="flex justify-center my-2">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={(value) => setRecaptchaValue(value)}
                onExpired={() => setRecaptchaValue(null)}
                onErrored={() => setRecaptchaValue(null)}
              />
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !recaptchaValue}
                className="px-8 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider text-white transition-colors disabled:opacity-50"
                style={{
                  backgroundColor: "#1a1a1a",
                  letterSpacing: "0.08em",
                  fontFamily: FONT,
                }}
                onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = "#333")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1a1a1a")}
              >
                {isSubmitting ? translateSync("Envoi en cours...") : translateSync("Envoyer")}
              </button>

              <Link
                to={paths.main}
                className="px-8 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider text-white transition-colors"
                style={{
                  backgroundColor: GOLD,
                  letterSpacing: "0.08em",
                  fontFamily: FONT,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a07a45")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
              >
                <TranslatedText text="Accueil" />
              </Link>
            </div>

            <p className="text-center text-xs text-gray-400 mt-1">
              <TranslatedText text="* Champs obligatoires" />
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}