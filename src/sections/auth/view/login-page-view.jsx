import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithPassword } from "src/actions/auth";
import Logo from "src/components/logo/logo";
import { useRouter } from "src/hooks";
import { paths } from "src/router/paths";

export default function LoginPageView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

   const handleSubmit = async (e) => {
    e.preventDefault();

    const promise = signInWithPassword({ email, password });

    toast.promise(
      promise,
      {
        pending: "Connexion en cours...",
        success: "Connecté avec succès !",
        error: "Échec de la connexion. Vérifiez vos identifiants.",
      }
    );

    try {
      await promise;
      router.refresh(); // Or redirect if needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="font-tahoma">
      <div className="flex items-center w-full justify-center mb-4">
        <Link to={paths.main}>
          <Logo />
        </Link>
      </div>
      <h1 className="text-xl font-semibold text-center ">Connexion à votre compte</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border rounded p-2"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm text-gray-600">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            className="w-full border rounded p-2"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <Link className="text-xs text-gray-400" to={paths.auth.forget}>Mot de passe oublié?</Link>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          Se Connecter
        </button>
      </form>
     
      <p className="mt-4 text-sm text-center text-gray-600">Vous n'avez pas d'un compte ? <Link className="text-[#B6B499] hover:underline" to={paths.auth.register}>Créer un compte!</Link></p>
    </div>
  );
}
