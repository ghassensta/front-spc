import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "src/actions/auth";
import Logo from "src/components/logo/logo";
import { useRouter } from "src/hooks";
import { paths } from "src/router/paths";
import { TranslatedText } from "src/components/translated-text/translated-text";
import { useTranslation } from "react-i18next";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const router = useRouter();
  const { t } = useTranslation();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      router.push(paths.auth.login);
    }
  }, [token, email, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const promise = resetPassword({ 
      token, 
      email, 
      password,
      password_confirmation: confirmPassword 
    });
    
    toast.promise(promise, {
      pending: t("Traitement en cours..."),
      success: t("Votre mot de passe a été réinitialisé avec succès !"),
      error: t("Une erreur est survenue. Veuillez réessayer.")
    }).then(() => {
      setPassword("");
      setConfirmPassword("");
      router.push(paths.auth.login);
    }).catch((error) => {
    }).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="font-tahoma max-w-md mx-auto p-4">
      <div className="flex items-center w-full justify-center mb-4">
        <Link to={paths.main}>
          <Logo />
        </Link>
      </div>
      <h1 className="text-xl font-semibold text-center mb-6">
        <TranslatedText text="Réinitialiser votre mot de passe" />
      </h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            <TranslatedText text="Veuillez entrer votre nouveau mot de passe ci-dessous." />
          </p>
          
          <div className="mb-4">
            <label htmlFor="password" className="text-sm text-gray-600 block mb-1">
              <TranslatedText text="Nouveau mot de passe" />
            </label>
            <input
              type="password"
              id="password"
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#B6B499]"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("Entrez votre nouveau mot de passe")}
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500 mt-1"><TranslatedText text="Minimum 8 caractères" /></p>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="text-sm text-gray-600 block mb-1">
              <TranslatedText text="Confirmez le mot de passe" />
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#B6B499]"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t("Confirmez votre mot de passe")}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? t("Traitement en cours...") : <TranslatedText text="Réinitialiser le mot de passe" />}
        </button>
      </form>
     
      <p className="mt-4 text-sm text-center text-gray-600">
        <Link 
          to={paths.auth.login} 
          className="text-[#B6B499] hover:underline"
        >
          <TranslatedText text="Retour à la page de connexion" />
        </Link>
      </p>
    </div>
  );
}
