import React, { useEffect, useRef, useState } from "react";
import { TranslatedText } from "../translated-text/translated-text";
import { useTranslation } from "react-i18next";
import { CONFIG } from "src/config-global";
import { poster } from "src/utils/axios";
import { toast } from "react-toastify";

export default function ShareModal({ isOpen, product, onClose }) {
  const { t } = useTranslation();
  const modalRef = useRef(null);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !loading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading, onClose]);

 
  const handleBackdropClick = (e) => {
    if (loading) return;
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen || !product) return null;

  const productLink = `${window.location.origin}/produit/${product.slug}`;

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
      setEmail("");
      setMessage("");
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          t("Erreur lors de l'envoi de l'email")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">
            <TranslatedText text="Partager ce soin" />
          </h3>

          <button
            onClick={onClose}
            disabled={loading}
            aria-label="Fermer"
            className="text-gray-400 hover:text-gray-600 text-3xl leading-none disabled:opacity-40"
          >
            &times;
          </button>
        </div>

        {/* ===== PRODUIT ===== */}
        <div className="mb-6">
          <img
            src={CONFIG.serverUrl + "/storage/" + product.image}
            alt={product.nom}
            className="w-full h-56 object-cover rounded-xl"
          />
          <p className="mt-4 text-lg font-medium">{product.nom}</p>
          <p className="text-2xl font-bold text-[#b6b499]">
            {product.prix} €
          </p>
        </div>

        {/* ===== FORM ===== */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              <TranslatedText text="Email du destinataire" />
            </label>
            <input
              type="email"
              required
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#b6b499]"
              placeholder="ami@exemple.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <TranslatedText text="Message personnalisé (facultatif)" />
            </label>
            <textarea
              rows="4"
              value={message}
              disabled={loading}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg resize-none focus:ring-2 focus:ring-[#b6b499]"
              placeholder={t("Je tenais à te partager ce soin incroyable...")}
            />
          </div>

          {/* ===== ACTIONS ===== */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40"
            >
              <TranslatedText text="Annuler" />
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-[#b6b499] text-white hover:bg-[#a09d85] flex items-center gap-2 min-w-[140px] justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="opacity-25"
                    />
                    <path
                      fill="currentColor"
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
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
