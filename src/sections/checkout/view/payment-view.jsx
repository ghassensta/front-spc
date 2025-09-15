import React, { useState } from "react";
import { useCheckoutContext } from "../context";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "src/components/button-icon/button-icon";
import axios from "axios";
import { API_URL_base } from "src/api/data";

export default function PaymentView() {
  const checkout = useCheckoutContext();
  const navigate = useNavigate();
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const TAX_RATE = 0.2;

  // Calcul HT, taxe et TTC
  const subtotal =
    checkout.items?.reduce(
      (acc, item) => acc + Number(item.price || 0) * item.quantity,
      0
    ) || 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  // Fonction pour envoyer la commande
  const handleSubmit = async () => {
    if (
      !checkout.expediteur ||
      !checkout.items ||
      checkout.items.length === 0
    ) {
      alert(
        "Veuillez remplir toutes les informations et ajouter des articles."
      );
      return;
    }

    setLoading(true);

    const data = {
      expediteur: checkout.expediteur,
      items: checkout.items,
      subtotal,
      tax,
      total,
      payment_method: "stripe",
    };

    try {
      const response = await axios.post(`${API_URL_base}/api/commandes`, data);
      console.log("Commande envoyée :", response.data);

      navigate("/checkout/details"); // navigue vers la page suivante
      localStorage.removeItem("app-checkout"); // puis vide le panier
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Erreur lors de l'envoi de la commande. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container font-tahoma mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Side - Form */}
      <div className="col-span-2 space-y-6">
        {/* Contact Info */}
        <div className="bg-white rounded-md p-6 shadow">
          <h2 className="text-base font-semibold mb-4">Coordonnées</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Adresse e-mail</label>
            <input
              type="email"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="contact@example.com"
              value={checkout.expediteur.email}
              onChange={(e) =>
                checkout.onCreateExpediteur({
                  ...checkout.expediteur,
                  email: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Billing Address */}
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
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium">Nom complet</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={checkout.expediteur.fullName}
                  onChange={(e) =>
                    checkout.onCreateExpediteur({
                      ...checkout.expediteur,
                      fullName: e.target.value,
                    })
                  }
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Adresse</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={checkout.expediteur.address}
                  onChange={(e) =>
                    checkout.onCreateExpediteur({
                      ...checkout.expediteur,
                      address: e.target.value,
                    })
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
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={checkout.expediteur.address2 || ""}
                  onChange={(e) =>
                    checkout.onCreateExpediteur({
                      ...checkout.expediteur,
                      address2: e.target.value,
                    })
                  }
                  placeholder="Appartement, étage, etc."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Ville</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={checkout.expediteur.city}
                    onChange={(e) =>
                      checkout.onCreateExpediteur({
                        ...checkout.expediteur,
                        city: e.target.value,
                      })
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
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={checkout.expediteur.state}
                    onChange={(e) =>
                      checkout.onCreateExpediteur({
                        ...checkout.expediteur,
                        state: e.target.value,
                      })
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
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={checkout.expediteur.postalCode}
                    onChange={(e) =>
                      checkout.onCreateExpediteur({
                        ...checkout.expediteur,
                        postalCode: e.target.value,
                      })
                    }
                    placeholder="75015"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Pays</label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={checkout.expediteur.country}
                    onChange={(e) =>
                      checkout.onCreateExpediteur({
                        ...checkout.expediteur,
                        country: e.target.value,
                      })
                    }
                    placeholder="France"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Téléphone</label>
                <input
                  type="tel"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={checkout.expediteur.phone}
                  onChange={(e) =>
                    checkout.onCreateExpediteur({
                      ...checkout.expediteur,
                      phone: e.target.value,
                    })
                  }
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>
          )}
        </div>

        {/* Payment - Stripe only */}
        <div className="bg-white rounded-md p-6 shadow">
          <h2 className="text-base font-semibold mb-4">Paiement</h2>
          <p>Le paiement se fera uniquement par carte via Stripe.</p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex font-tahoma rounded-sm items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-black text-white disabled:opacity-50"
          >
            {loading ? "Envoi..." : "Commander"}
          </button>
        </div>
      </div>

      {/* Right Side - Order Summary */}
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
                src={`${API_URL_base}/storage/${item.image}`}
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
              <span>Taxe 20%</span>
              <span>{tax.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total TTC</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md p-6 shadow">
          <h2 className="text-base font-semibold mb-4">Note de commande</h2>
          <textarea
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ex : Laisser la commande devant la porte..."
            value={checkout.expediteur.note || ""}
            onChange={(e) =>
              checkout.onCreateExpediteur({
                ...checkout.expediteur,
                note: e.target.value,
              })
            }
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
