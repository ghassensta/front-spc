import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
// import { resetPassword } from "src/actions/auth";
import Logo from "src/components/logo/logo";
import { useRouter } from "src/hooks";
import { paths } from "src/router/paths";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setIsSubmitting(true);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    try {
      // Uncomment and implement the resetPassword function in your auth actions
      // await resetPassword({ token, email, password });
      toast.success("Votre mot de passe a été réinitialisé avec succès !");
      router.push(paths.auth.login);
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      console.error(error);
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
      <h1 className="text-xl font-semibold text-center mb-6">Réinitialiser votre mot de passe</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Veuillez entrer votre nouveau mot de passe ci-dessous.
          </p>
          
          <div className="mb-4">
            <label htmlFor="password" className="text-sm text-gray-600 block mb-1">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="w-full border rounded p-2"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre nouveau mot de passe"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 8 caractères</p>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="text-sm text-gray-600 block mb-1">
              Confirmez le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full border rounded p-2"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmez votre mot de passe"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {isSubmitting ? "Traitement en cours..." : "Réinitialiser le mot de passe"}
        </button>
      </form>
     
      <p className="mt-4 text-sm text-center text-gray-600">
        <Link to={paths.auth.root} className="text-[#B6B499] hover:underline">
          Retour à la page de connexion
        </Link>
      </p>
    </div>
  );
}
