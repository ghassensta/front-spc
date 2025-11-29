import React from 'react';
import { useCheckoutContext } from 'src/sections/checkout/context';

export default function CommandesViewPage({ order }) {
  const checkout = useCheckoutContext();

  // Format sécurisé
  const formatPrice = (value) =>
    value ? Number(value).toFixed(2) : "0.00";

  // Redirection vers paiement
  
  return (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">

      <div className="border p-4 col-span-3">
        <h4 className="mt-4 font-semibold text-xl">Articles commandés :</h4>

        <table className="w-full mt-2 border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left">Produit</th>
              <th className="border p-2 text-left">Quantité</th>
              <th className="border p-2 text-left">Prix (TTC)</th>
            </tr>
          </thead>

          <tbody>
            {order?.lignes?.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="border p-2">
                  {item.produit?.nom || item.produit || "Carte Cadeau"}
                </td>
                <td className="border p-2">{item.quantite}</td>
                <td className="border p-2">{formatPrice(item.prix_unitaire)} €</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totaux */}
        <div className="mt-4 border-t pt-2 space-y-1">

          <div className="flex justify-between">
            <span>Sous-total (HT) :</span>
            <span>{formatPrice(order?.total_ht)} €</span>
          </div>

          <div className="flex justify-between">
            <span>TVA (20%) :</span>
            <span>{formatPrice(order?.taxe)} €</span>
          </div>

          {order?.credits > 0 && (
            <div className="flex justify-between text-red-600">
              <span>Crédits appliqués :</span>
              <span>-{formatPrice(order.credits)} €</span>
            </div>
          )}

          <div className="flex justify-between font-bold">
            <span>Total (TTC) :</span>
            <span>{formatPrice(order?.total_ttc)} €</span>
          </div>

          <div className="flex justify-between font-bold text-green-700 mt-2">
            <span>Total payé :</span>
            <span>{formatPrice(order?.total_paye)} €</span>
          </div>
        </div>

        <div className="mt-6">
          {order?.statut ? (
            <div className="inline-block px-3 py-1 rounded bg-green-100 text-green-700 font-semibold">
              ✔ Paiement reçu
            </div>
          ) : (
            <div className=" flex gap-2">
              <div className="inline-block px-3 py-2 rounded bg-red-100 text-red-700 font-semibold">
                ✘ Non payée
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
