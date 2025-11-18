import React, { useEffect, useState, useMemo } from "react";
import { useCheckoutContext } from "../context";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "src/components/button-icon/button-icon";
import { CONFIG } from "src/config-global";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import CreditOption from "src/components/checkout/CreditOption";
import { useGetCreditsPanier } from "src/actions/credis-panier";
import toast from "react-hot-toast";
import axios from "axios";
export default function PaymentView() {
  const checkout = useCheckoutContext();
  const navigate = useNavigate();
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expediteurEmail, setExpediteurEmail] = useState("");
  const { user } = useAuthContext();

  // Récupération réelle des crédits
  const { credits = [], loading: creditsLoading } = useGetCreditsPanier();

  const TAX_RATE = 0.2;

  // Calculs totaux
  const subtotal = useMemo(() => {
    return (
      checkout.items?.reduce(
        (acc, item) => acc + Number(item.price || 0) * item.quantity,
        0
      ) || 0
    );
  }, [checkout.items]);

  const tax = subtotal * TAX_RATE;
  const totalAvantCredits = subtotal + tax;

  // Crédits utilisables (non utilisés + non expirés)
  const creditsUtilisables = useMemo(() => {
    return credits.filter(
      (c) =>
        c.utilise === false &&
        (c.date_expiration === null ||
          new Date(c.date_expiration) >= new Date())
    );
  }, [credits]);

  // Montant total des crédits sélectionnés
  const montantCredits = useMemo(() => {
    const selected = checkout.selectedCreditIds || [];
    return creditsUtilisables
      .filter((c) => selected.includes(c.id))
      .reduce((sum, c) => sum + Number(c.montant), 0);
  }, [creditsUtilisables, checkout.selectedCreditIds]);

  const totalAPayer = Math.max(0, totalAvantCredits - montantCredits);
  const creditsDepassent = montantCredits > totalAvantCredits;

  // Envoi de la commande
  const handleSubmit = async () => {
    if (
      !checkout.expediteur ||
      !checkout.items ||
      checkout.items.length === 0
    ) {
      toast.error(
        "Veuillez remplir toutes les informations et ajouter des articles."
      );
      return;
    }

    if (creditsDepassent) {
      toast.error(
        "Les crédits sélectionnés dépassent le montant total de la commande."
      );
      return;
    }

    setLoading(true);

    const payload = {
      expediteur: checkout.expediteur,
      items: checkout.items,
      subtotal,
      tax,
      total: totalAvantCredits,
      montant_apres_credits: totalAPayer,
      credit_ids: checkout.selectedCreditIds || [],
      payment_method: totalAPayer > 0 ? "stripe" : "credits_only",
    };

    try {
      await axios.post(`${CONFIG.serverUrl}/api/commandes`, payload);
      toast.success("Commande passée avec succès ! 🎉");
      navigate("/checkout/details");
      localStorage.removeItem("app-checkout");
      checkout.resetCheckout?.();
    } catch (error) {
      console.error("Erreur commande :", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleExpediteurChange = (field, value) => {
    checkout.onCreateExpediteur({
      ...checkout.expediteur,
      [field]: value,
    });
  };

  useEffect(() => {
    if (user && user.email && !checkout.expediteur?.email) {
      const updated = {
        ...checkout.expediteur,
        email: user.email,
        fullName: user.name || "",
      };
      setExpediteurEmail(user.email);
      checkout.onCreateExpediteur(updated);
    }
  }, [user, checkout.expediteur]);

  return (
    <div className="container font-tahoma mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Colonne gauche - Formulaire */}
      <div className="col-span-2 space-y-6">
        {/* Email */}
        <div className="bg-white rounded-md p-6 shadow">
          <h2 className="text-base font-semibold mb-4">Coordonnées</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Adresse e-mail</label>
            <input
              type="email"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="contact@example.com"
              value={expediteurEmail}
              onChange={(e) => {
                const email = e.target.value;
                setExpediteurEmail(email);
                handleExpediteurChange("email", email);
              }}
            />
          </div>
        </div>

        {/* Crédits - passe les vrais crédits */}
        <CreditOption
          credits={creditsUtilisables}
          totalTTC={totalAvantCredits}
          onValueChange={(newTotal, creditsUsed) => {
        setTotalAprèsCredits(newTotal);
        setCreditsIds(credits_ids); 
    }}
        />
        {/* Adresse de facturation */}
        <div className="bg-white rounded-md p-6 shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold">Adresse de facturation</h2>
            <button onClick={() => setIsEditingAddress(!isEditingAddress)}>
              <ButtonIcon
                size="sm"
                title={isEditingAddress ? "Terminer" : "Modifier"}
              />
            </button>
          </div>

          {!isEditingAddress ? (
            <div className="space-y-1 text-sm">
              <p>{checkout.expediteur.fullName}</p>
              <p>{checkout.expediteur.address}</p>
              {checkout.expediteur.address2 && (
                <p>{checkout.expediteur.address2}</p>
              )}
              <p>
                {checkout.expediteur.city} {checkout.expediteur.state}{" "}
                {checkout.expediteur.postalCode}
              </p>
              <p>{checkout.expediteur.country}</p>
              {checkout.expediteur.phone && (
                <p>Téléphone : {checkout.expediteur.phone}</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Tous les champs d'adresse (inchangés) */}
              <div>
                <label className="block text-sm font-medium">Nom complet</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  value={checkout.expediteur.fullName || ""}
                  onChange={(e) =>
                    handleExpediteurChange("fullName", e.target.value)
                  }
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Adresse</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  value={checkout.expediteur.address || ""}
                  onChange={(e) =>
                    handleExpediteurChange("address", e.target.value)
                  }
                  placeholder="15 rue Jean Maridor"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Complément d'adresse
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  value={checkout.expediteur.address2 || ""}
                  onChange={(e) =>
                    handleExpediteurChange("address2", e.target.value)
                  }
                  placeholder="Appartement, étage, etc."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Ville</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2"
                    value={checkout.expediteur.city || ""}
                    onChange={(e) =>
                      handleExpediteurChange("city", e.target.value)
                    }
                    placeholder="Paris"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    État / Province
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2"
                    value={checkout.expediteur.state || ""}
                    onChange={(e) =>
                      handleExpediteurChange("state", e.target.value)
                    }
                    placeholder="Île-de-France"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Code postal
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2"
                    value={checkout.expediteur.postalCode || ""}
                    onChange={(e) =>
                      handleExpediteurChange("postalCode", e.target.value)
                    }
                    placeholder="75015"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Pays</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2"
                    value={checkout.expediteur.country || ""}
                    onChange={(e) =>
                      handleExpediteurChange("country", e.target.value)
                    }
                    placeholder="France"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Téléphone</label>
                <input
                  type="tel"
                  className="w-full border rounded-md p-2"
                  value={checkout.expediteur.phone || ""}
                  onChange={(e) =>
                    handleExpediteurChange("phone", e.target.value)
                  }
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>
          )}
        </div>

        {/* Paiement */}
        <div className="bg-white rounded-md p-6 shadow">
          <h2 className="text-base font-semibold mb-4">Paiement</h2>
          <p>
            {totalAPayer > 0
              ? "Le montant restant sera payé par carte via Stripe."
              : "Votre commande est intégralement réglée avec vos crédits !"}
          </p>
        </div>

        {/* Bouton Commander */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading || creditsLoading || creditsDepassent}
            className="inline-flex font-tahoma rounded-sm items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Envoi en cours..." : "Commander"}
          </button>
        </div>
      </div>

      {/* Colonne droite - Résumé */}
      <div>
        <div className="bg-white rounded-md p-6 shadow space-y-4 mb-3">
          <h2 className="text-base font-semibold mb-4">
            Résumé de la commande
          </h2>

          {checkout.items?.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-center border-b pb-2"
            >
              <img
                loading="lazy"
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Quantité: {item.quantity}
                </p>
              </div>
              <div className="font-bold">
                {(Number(item.price || 0) * item.quantity).toFixed(2)} €
              </div>
            </div>
          ))}

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Sous-total HT</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>TVA 20%</span>
              <span>{tax.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total TTC</span>
              <span>{totalAvantCredits.toFixed(2)} €</span>
            </div>

            {montantCredits > 0 && (
              <div className="flex justify-between text-sm font-medium text-green-600">
                <span>Crédits appliqués</span>
                <span>- {montantCredits.toFixed(2)} €</span>
              </div>
            )}

            <div className="flex justify-between font-bold text-lg border-t pt-3 mt-2">
              <span>Montant à payer</span>
              <span className={totalAPayer === 0 ? "text-green-600" : ""}>
                {totalAPayer.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="bg-white rounded-md p-6 shadow">
          <h2 className="text-base font-semibold mb-4">Note de commande</h2>
          <textarea
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ex : Laisser la commande devant la porte..."
            value={checkout.expediteur.note || ""}
            onChange={(e) => handleExpediteurChange("note", e.target.value)}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
