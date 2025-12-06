import React, { useEffect, useState, useMemo } from "react";
import { useCheckoutContext } from "../context";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "src/components/button-icon/button-icon";
import { CONFIG } from "src/config-global";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import CreditOption from "src/components/checkout/CreditOption";
import { useGetCreditsPanier } from "src/actions/credis-panier";
import toast from "react-hot-toast";
const TAX_RATE = 0.2;
export default function PaymentView() {
  const checkout = useCheckoutContext();
  console.log("checkout2", checkout);
  const navigate = useNavigate();
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expediteurEmail, setExpediteurEmail] = useState("");
  const { user } = useAuthContext();

  const { credits = [], loading: creditsLoading } = useGetCreditsPanier();

  const totalBeforeDiscount = useMemo(() => {
    return (
      checkout.items?.reduce(
        (acc, item) => acc + Number(item.price || 0) * item.quantity,
        0
      ) || 0
    );
  }, [checkout.items]);

  const totalDiscount = useMemo(() => {
    return (
      checkout.items?.reduce(
        (acc, item) => acc + (Number(item.discount) || 0),
        0
      ) || 0
    );
  }, [checkout.items]);

  const totalTTC = totalBeforeDiscount - totalDiscount;

  const totalHT = Number((totalTTC / (1 + TAX_RATE)).toFixed(2));
  const tvaAmount = Number((totalTTC - totalHT).toFixed(2));

  const totalBeforeHT = Number((totalBeforeDiscount / (1 + TAX_RATE)).toFixed(2));
  const tvaBefore = Number((totalBeforeDiscount - totalBeforeHT).toFixed(2));

  const { creditsParrainage, creditsNormaux } = useMemo(() => {
    const parrainage = [];
    const normaux = [];

    credits.forEach((credit) => {
      const desc = (credit.description || "").toLowerCase();
      const isParrainage =
        desc.includes("parrain") ||
        desc.includes("parrainage") ||
        desc.includes("filleul") ||
        credit.source_id === 1;

      if (isParrainage) parrainage.push(credit);
      else normaux.push(credit);
    });

    return { creditsParrainage: parrainage, creditsNormaux: normaux };
  }, [credits]);

  const [appliedParrainage, setAppliedParrainage] = useState(0);
  const [appliedNormaux, setAppliedNormaux] = useState(0);
  const [parrainageIds, setParrainageIds] = useState([]);
  const [normauxIds, setNormauxIds] = useState([]);

  const totalCreditsApplied = appliedParrainage + appliedNormaux;
  const totalAPayer = Math.max(0, totalTTC - totalCreditsApplied);
  const creditsDepassent = totalCreditsApplied > totalTTC;

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
      toast.error("Les crédits sélectionnés dépassent le montant total.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${CONFIG.serverUrl}/api/commandes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expediteur: checkout.expediteur,
          items: checkout.items,
          subtotal: totalHT,
          tax: tvaAmount,
          total: totalTTC,
          montant_apres_credits: totalAPayer,
          coupon_id: checkout.couponId || null,
          credit_ids: [...parrainageIds, ...normauxIds],
          payment_method: totalAPayer > 0 ? "stripe" : "credits_only",
        }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      const commandesIds = data.commandes_ids;
      if (totalAPayer > 0) {
        const sessionRes = await fetch(
          `${CONFIG.serverUrl}/api/payment/create-session`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ commandes_ids: commandesIds }),
          }
        );

        const sessionData = await sessionRes.json();
        console.log("sessionData",sessionData);
        if (sessionData?.url) {
          window.location.href = sessionData.url;
        } else {
          throw new Error("Impossible de créer la session Stripe.");
        }
      } else {
        toast.success("Commande payée intégralement avec vos crédits !");
        navigate("/checkout/details");
        localStorage.removeItem("app-checkout");
        checkout.resetCheckout?.();
      }
    } catch (error) {
      console.error("Erreur paiement :", error);
      toast.error(
        error?.message || "Une erreur est survenue lors du paiement."
      );
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
    if (user?.email && !checkout.expediteur?.email) {
      const updated = {
        ...checkout.expediteur,
        email: user.email,
        fullName: user.name || user.displayName || "",
      };
      setExpediteurEmail(user.email);
      checkout.onCreateExpediteur(updated);
    }
  }, [user, checkout.expediteur]);

  return (
    <div className="container font-tahoma mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <div className="bg-white rounded-md p-6 shadow">
          <h2 className="text-base font-semibold mb-4">Coordonnées</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Adresse e-mail</label>
            {user.email}
          </div>
        </div>

        {creditsParrainage.length > 0 && (
          <CreditOption
            key="parrainage"
            credits={creditsParrainage}
            totalTTC={totalTTC}
            title="Crédit Parrainage"
            theme="parrainage"
            forceSingleUse={true}
            onValueChange={(amount, ids) => {
              setAppliedParrainage(amount);
              setParrainageIds(ids);
            }}
          />
        )}

        {creditsNormaux.length > 0 && (
          <CreditOption
            key="normaux"
            credits={creditsNormaux}
            totalTTC={totalTTC - appliedParrainage}
            title="Crédits fidélité & cadeaux"
            theme="normal"
            onValueChange={(amount, ids) => {
              setAppliedNormaux(amount);
              setNormauxIds(ids);
            }}
          />
        )}

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
              <p className="font-medium">
                {checkout.expediteur?.fullName || "Non renseigné"}
              </p>
              <p>{checkout.expediteur?.address || "Non renseigné"}</p>
              {checkout.expediteur?.address2 && (
                <p>{checkout.expediteur.address2}</p>
              )}
              <p>
                {checkout.expediteur?.city} {checkout.expediteur?.state}{" "}
                {checkout.expediteur?.postalCode}
              </p>
              <p>{checkout.expediteur?.country || "France"}</p>
              {checkout.expediteur?.phone && (
                <p>Téléphone : {checkout.expediteur.phone}</p>
              )}
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {/* Tous les inputs d'adresse (identiques à avant) */}
              <div>
                <label className="block text-sm font-medium">Nom complet</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  value={checkout.expediteur?.fullName || ""}
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
                  value={checkout.expediteur?.address || ""}
                  onChange={(e) =>
                    handleExpediteurChange("address", e.target.value)
                  }
                  placeholder="15 rue Jean Maridor"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Complément d’adresse
                </label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  value={checkout.expediteur?.address2 || ""}
                  onChange={(e) =>
                    handleExpediteurChange("address2", e.target.value)
                  }
                  placeholder="Appartement, étage..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Ville</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2"
                    value={checkout.expediteur?.city || ""}
                    onChange={(e) =>
                      handleExpediteurChange("city", e.target.value)
                    }
                    placeholder="Paris"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    État / Région
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2"
                    value={checkout.expediteur?.state || ""}
                    onChange={(e) =>
                      handleExpediteurChange("state", e.target.value)
                    }
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
                    value={checkout.expediteur?.postalCode || ""}
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
                    value={checkout.expediteur?.country || "France"}
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
                  value={checkout.expediteur?.phone || ""}
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
          <p className="text-sm">
            {totalAPayer > 0
              ? `Le montant restant de ${totalAPayer.toFixed(
                  2
                )} € sera payé par carte via Stripe.`
              : "Votre commande est intégralement réglée avec vos crédits !"}
          </p>
        </div>

        {/* Bouton Commander */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading || creditsLoading || creditsDepassent}
            className="w-full md:w-auto inline-flex justify-center font-tahoma rounded-sm items-center uppercase tracking-widest px-8 py-4 text-sm bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 transition"
          >
            {loading ? "Envoi en cours..." : "Commander"}
          </button>
        </div>
      </div>

      {/* === RÉSUMÉ DROITE === */}
      <div>
        <div className="bg-white rounded-md p-6 shadow space-y-4">
          <h2 className="text-base font-semibold mb-4">
            Résumé de la commande
          </h2>

          {checkout.items?.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-center border-b pb-3 last:border-0"
            >
              <img
                loading="lazy"
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qté : {item.quantity}</p>
                {item.discount > 0 && <p className="text-sm text-green-600">- {Number(item.discount).toFixed(2)} €</p>}
              </div>
              <div className="font-bold">
                {(Number(item.price || 0) * item.quantity - (Number(item.discount) || 0)).toFixed(2)} €
              </div>
            </div>
          ))}

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Sous-total HT</span>
              <span>{totalBeforeHT.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>TVA 20%</span>
              <span>{tvaBefore.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total TTC</span>
              <span>{totalBeforeDiscount.toFixed(2)} €</span>
            </div>
            {totalDiscount > 0 && (
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Remise totale</span>
                <span>- {totalDiscount.toFixed(2)} €</span>
              </div>
            )}

            {appliedParrainage > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Crédit parrainage</span>
                <span>- {appliedParrainage.toFixed(2)} €</span>
              </div>
            )}

            {appliedNormaux > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Crédits fidélité & cadeaux</span>
                <span>- {appliedNormaux.toFixed(2)} €</span>
              </div>
            )}

            <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4">
              <span>Montant à payer</span>
              <span className={totalAPayer === 0 ? "text-green-600" : ""}>
                {totalAPayer.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md p-6 shadow mt-4">
          <h2 className="text-base font-semibold mb-3">
            Note de commande (facultatif)
          </h2>
          <textarea
            className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ex : Laisser devant la porte..."
            value={checkout.expediteur?.note || ""}
            onChange={(e) => handleExpediteurChange("note", e.target.value)}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}