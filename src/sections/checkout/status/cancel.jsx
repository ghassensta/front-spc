import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { paths } from "src/router/paths";
import { paymentCancel } from "src/actions/paiment";

const buttonStyle =
  "w-auto mx-auto mt-4 px-4 py-3 bg-black leading-4 rounded-2xl text-white uppercase font-normal text-xs tracking-[3px] hover:bg-gray-800 transition font-tahoma flex items-center justify-center gap-2";

export default function PaymentCancelled({ sessionId: propSessionId }) {
  const location = useLocation();
  const [sessionId, setSessionId] = useState(propSessionId || null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!propSessionId) {
      const params = new URLSearchParams(location.search);
      const id = params.get("session_id");
      setSessionId(id);
    }
  }, [location.search, propSessionId]);

  useEffect(() => {
    if (!sessionId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
console.log("sessionId",sessionId);

      try {
        const res = await paymentCancel(sessionId);

        if (!res.success) {
          setMessage(res.message || "Paiement annulé");
          return;
        }

        setMessage(res.message);
      } catch (err) {
        console.error(err);
        setError("Erreur de connexion au serveur.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId]);

  if (loading) return <div className="text-center mt-10">Chargement...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 text-center font-tahoma">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
        <div className="flex items-center justify-center">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <h2 className="ml-3 text-2xl font-bold text-red-700">
            Paiement annulé
          </h2>
        </div>

        <p className="mt-2 text-red-600">{message}</p>
      </div>

      <p className="text-gray-600">
        Si vous souhaitez réessayer votre achat, vous pouvez retourner à votre
        panier.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Link to={paths.checkout} className={`${buttonStyle}`}>
          <FaShoppingCart /> Panier
        </Link>

        <Link to={paths.main} className={buttonStyle}>
          <FaHome /> Accueil
        </Link>

        <Link to={paths.dashboard.root} className={buttonStyle}>
          <MdDashboard /> Tableau de bord
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Besoin d'aide ?{" "}
          <a
            href={`mailto:contact@ecom-fr.com`}
            className="text-primary hover:underline"
          >
            Contactez notre service client
          </a>
        </p>
      </div>
    </div>
  );
}
