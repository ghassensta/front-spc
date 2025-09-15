import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL_base } from "src/api/data";

export default function LoginPageView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");


    try {
      const response = await axios.post(`${API_URL_base}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user_id", JSON.stringify(response.data.user.id));
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response); // Affiche toutes les infos de l'erreur
      setError(
        err.response?.data?.error ||
          err.message ||
          "Erreur lors de la connexion"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-tahoma">
      <h1 className="text-xl font-semibold text-center mb-6">Connexion</h1>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se Connecter"}
        </button>
      </form>
    </div>
  );
}
