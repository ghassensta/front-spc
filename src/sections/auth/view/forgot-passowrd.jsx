import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { forgetPassword } from "src/actions/auth";
import Logo from "src/components/logo/logo";
import { useRouter } from "src/hooks";
import { paths } from "src/router/paths";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation basique
    if (!email || !email.includes('@')) {
      toast.error("Veuillez entrer une adresse email valide");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await forgetPassword(email);
      
      // Afficher le message de succès du backend
      toast.success(response.message || "Un email de réinitialisation a été envoyé à votre adresse.");
      
      // Rediriger après 2 secondes
      setTimeout(() => {
        router.push(paths.auth.login);
      }, 2000);
    } catch (error) {
      // Afficher le message d'erreur
      toast.error(error.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-tahoma max-w-md mx-auto p-4">
      <div className="flex items-center w-full justify-center mb-4">
        <Link to={paths.main}>
          <Logo />
        </Link>
      </div>
      <h1 className="text-xl font-semibold text-center mb-6">
        Réinitialisation du mot de passe
      </h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
          <label htmlFor="email" className="text-sm text-gray-600 block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#B6B499]"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
        </button>
      </form>
     
      <p className="mt-4 text-sm text-center text-gray-600">
        <Link 
          to={paths.auth.login} 
          className="text-[#B6B499] hover:underline"
        >
          Retour à la page de connexion
        </Link>
      </p>
    </div>
  );
}
