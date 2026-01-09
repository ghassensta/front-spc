import React, { useState } from "react";
import { TranslatedText } from "../translated-text/translated-text";
import { useTranslation } from "react-i18next";
import { CONFIG } from "src/config-global";
import { poster } from "src/utils/axios"; // Utilise ton helper poster
import { toast } from "react-toastify";

export default function ShareModal({ isOpen, product, onClose }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !product) return null;

  const productLink = `${window.location.origin}/spa/${product.slug}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error(t("Veuillez saisir une adresse email valide"));
      return;
    }

    setLoading(true);

    try {
      await poster("api/auth/produit/share", {
        to_email: email.trim(),
        product_name: product.nom,
        product_description: product.description,
        product_images: CONFIG.serverUrl + "/storage/" + product.galleries_images,
        product_price: product.prix,
        product_link: productLink,
        product_image: CONFIG.serverUrl + "/storage/" + product.image,
        custom_message: message.trim(),
      });

      toast.success(t("Produit partagé avec succès !"));
      onClose();
      setEmail("");
      setMessage("");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        t("Erreur lors de l'envoi de l'email");

      toast.error(errorMessage);
      console.error("Erreur partage produit :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-screen overflow-y-auto p-6">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">
            <TranslatedText text="Partager ce soin" />
          </h3>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 text-3xl font-light leading-none"
          >
            &times;
          </button>
        </div>

        {/* Aperçu du produit */}
        <div className="mb-6">
          <img
            src={CONFIG.serverUrl + "/storage/" + product.image}
            alt={product.nom}
            className="w-full h-56 object-cover rounded-lg shadow-sm"
          />
          <p className="mt-4 text-lg font-medium text-gray-900">{product.nom}</p>
          <p className="text-2xl font-bold text-[#b6b499] mt-1">{product.prix} €</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TranslatedText text="Email du destinataire" />
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6b499] focus:border-transparent transition"
              placeholder="ami@exemple.com"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TranslatedText text="Message personnalisé (facultatif)" />
            </label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b6b499] focus:border-transparent resize-none transition"
              placeholder={t("Je tenais à te partager ce soin incroyable...")}
              disabled={loading}
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
            >
              <TranslatedText text="Annuler" />
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-[#b6b499] text-white hover:bg-[#a09d85] disabled:opacity-70 transition flex items-center gap-2 min-w-[140px] justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {t("Envoi...")}
                </>
              ) : (
                t("Envoyer")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}