import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import CheckoutDetails from "src/sections/checkout/view/checkout-details";
import { paymentSuccess } from "src/actions/paiment";
import { useLocation } from "react-router-dom";
import successAnimation from "src/animations/Confetti.json"; 

export default function PageSuccess({ sessionId: propSessionId }) {
  const location = useLocation();
  const [sessionId, setSessionId] = useState(propSessionId);
  const [checkoutData, setCheckoutData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      const params = new URLSearchParams(location.search);
      const id = params.get("session_id");
      setSessionId(id);
    }
  }, [location.search, sessionId]);

  useEffect(() => {
    if (!sessionId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await paymentSuccess(sessionId);

        if (!res.success) {
          setError(
            res.message || "Impossible de récupérer les détails de la commande."
          );
          return;
        }

        setMessage(res.message);

        let allItems = [];
        let totalSubtotal = 0;
        let totalTotal = 0;
        let orderIds = [];
        let cmdnumbers = [];
        let expediteur = {};
        let date = '';

        res.commandesPaied.forEach((commande) => {
          orderIds.push(commande.id);
          cmdnumbers.push(commande.numero_commande);
          console.log("items-cat",commande.lignes_commande);
          const items = commande.lignes_commande.map((ligne) => ({
            id: ligne.id,
            name: ligne.produit?.nom || `Produit #${ligne.produit_id}`, 
            quantity: ligne.quantite,
            price: ligne.prix_unitaire,
          }));

          allItems = [...allItems, ...items];

          const sub = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
          totalSubtotal += sub;
          totalTotal += sub; 

          if (!date) date = commande.created_at;
          if (!Object.keys(expediteur).length) expediteur = commande.expediteur || {};
        });

        setCheckoutData({
          id: orderIds.join(', '),
          nbcmd:cmdnumbers,
          items: allItems,
          subtotal: totalSubtotal,
          shipping: 0,
          discount: 0,
          total: totalTotal,
          date,
          expediteur,
        });
      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer les détails de la commande.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId]);

  if (loading) return <div className="text-center mt-10">Chargement...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="relative">
      <h2 className="text-center text-2xl font-bold">{message}</h2>
      {checkoutData && <CheckoutDetails checkout={checkoutData} />}
      {showAnimation && (
        <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none">
          <Lottie
            animationData={successAnimation}
            loop={false}
            onComplete={() => setShowAnimation(false)}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </div>
  );
}