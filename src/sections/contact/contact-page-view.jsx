import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { paths } from "src/router/paths";
import { sendMessage } from "src/actions/forms";

export default function ContactPageView() {
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
      toast.error("Veuillez valider le CAPTCHA");
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace with your actual form submission logic
      const response = await sendMessage({ ...formData, recaptcha :recaptchaValue });

      if (response.ok) {
        toast.success("Votre message a été envoyé avec succès !");
        // Reset form
        setFormData({
          name: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setRecaptchaValue(null);
        if (window.grecaptcha) {
          window.grecaptcha.reset();
        }
      } else {
        throw new Error("Erreur lors de l'envoi du formulaire");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Une erreur est survenue lors de l'envoi du formulaire");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-screen relative left-[calc(-50vw+50%)]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left section - Contact info with background image */}
        <div
          className="flex flex-col justify-center px-10 py-16 relative text-white bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://spa-prestige-collection.com/wp-content/uploads/2025/02/SPC-Massage-1975x1318-02.jpg')", // <-- change to your actual image path
          }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Content */}
          <div className="mx-auto relative z-10">
            <h1 className="text-4xl font-serif mb-4">Contactez nous</h1>
            <p className="mb-2 font-bricolage">
              Nous serions ravis de vous parler.
              <br />
              N’hésitez pas à nous contacter en utilisant les coordonnées
              ci-dessous.
            </p>
            <div className="mt-6 font-bricolage text-xl">
              <div className="flex items-center mb-4">
                <span className="mr-3 text-xl">
                  <FaPhoneAlt />
                </span>
                <p className="font-semibold">+33 (0)1 82 35 01 26</p>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-xl">
                  <MdEmail />
                </span>
                <p className="font-semibold">
                  contact@spa-prestige-collection.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right section - Contact form */}
        <div className="bg-white px-10 py-6 md:py-16">
          <h2 className="text-2xl font-serif mb-2 text-center">
            Demande d'informations
          </h2>
          <p className="mb-6 text-center font-bricolage">
            Vous souhaitez un renseignement, n’hésitez pas à remplir le
            formulaire suivant :
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 font-bricolage max-w-[40em] mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nom*"
                className="border p-2 w-full"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Prénom"
                className="border p-2 w-full"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email*"
                className="border p-2 w-full"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Téléphone"
                className="border p-2 w-full"
              />
            </div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Sujet"
              className="border p-2 w-full"
            />
            <textarea
              placeholder="Message*"
              rows="4"
              className="border p-2 w-full"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <div className="flex justify-center my-4">
              <ReCAPTCHA
                sitekey="6LeJ6RssAAAAAJCy1zB7fIfNwzPowTrqOoFrWMnN" // Replace with your actual site key
                onChange={(value) => setRecaptchaValue(value)}
                onExpired={() => setRecaptchaValue(null)}
                onErrored={() => setRecaptchaValue(null)}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting || !recaptchaValue}
                className="bg-black text-white px-6 py-2 uppercase tracking-wider hover:bg-gray-800 max-w-max rounded-full"
              >
                Envoyer
              </button>
              <Link
                to={paths.main}
                type="button"
                className="bg-[#c4c0a1] text-white px-6 py-2 uppercase tracking-wider hover:opacity-90 max-w-max rounded-full"
              >
                Accueil
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
