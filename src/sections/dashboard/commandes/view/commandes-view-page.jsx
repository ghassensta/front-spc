import React from "react";
import { Eye } from "lucide-react";

export default function CommandesViewPage({ order }) {
  const formatPrice = (value) => (value ? Number(value).toFixed(2) : "0.00");
 // console.log("orders", order);
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="border p-4 col-span-3 overflow-x-auto">
        {}
        <h4 className="mt-4 font-semibold text-xl">Articles commandés :</h4>

        {}
        <table className="w-full mt-2 min-w-[600px] border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left text-sm">Produit</th>
              <th className="border p-2 text-left text-sm">Destinataire</th>
              <th className="border p-2 text-left text-sm">Quantité</th>
              <th className="border p-2 text-left text-sm">
                Prix Unitaire TTC
              </th>
              <th className="border p-2 text-left text-sm">Total TTC </th>
              <th className="border p-2 text-left text-sm">Carte Cadeau</th>
            </tr>
          </thead>

          <tbody>
            {order?.lignes?.map((item) => {
              const hasDiscount = Number(item.coupon_discount) > 0;
              const originalPrice = Number(item.prix_unitaire) || 0;
              const unitPriceAfterDiscount =
                originalPrice -
                (hasDiscount ? Number(item.coupon_discount) : 0);
              const totalAfterDiscount = unitPriceAfterDiscount * item.quantite;

              return (
                <tr key={item.id} className="border-t">
                  {}
                  <td className="border p-2 text-sm">
                    <div className="font-semibold">
                      {item.produit?.nom || "Carte Cadeau"}
                    </div>

                    {}
                    <div className="text-xs mt-1">
                      Statut:{" "}
                      {item.statut === "En cours" ? (
                        <span className="inline-block px-2 py-1 rounded-full bg-orange-100 text-orange-800 font-semibold text-xs">
                          {item.statut}
                        </span>
                      ) : item.statut === "Utilisée" ? (
                        <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 font-semibold text-xs">
                          {item.statut}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold text-xs">
                          {item.statut}
                        </span>
                      )}
                    </div>

                    {}
                    {hasDiscount && (
                      <div className="text-xs mt-1 text-red-600">
                        Coupon: {formatPrice(item.coupon_discount)} € appliqué
                      </div>
                    )}

                    {}
                    <div className="text-xs mt-1 text-gray-600 space-y-0.5">
                      <div>Numéro: {item.numero_carte || "—"}</div>
                      <div>Code: {item.code_validation || "—"}</div>
                      <div className="text-red-500">
                        Date d'envoi:{" "}
                        {item.date_envoi_destinataire
                          ? new Date(
                              item.date_envoi_destinataire
                            ).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })
                          : "—"}
                      </div>
                    </div>
                  </td>

                  {}
                  <td className="border p-2 text-sm">
                    <div className="font-semibold">
                      {item.destinataire_name || "—"}
                    </div>
                    <div className="text-gray-600 text-xs">
                      {item.destinataire_email || "—"}
                    </div>
                  </td>

                  {}
                  <td className="border p-2 text-sm">{item.quantite}</td>

                  {}
                  <td className="border p-2 text-sm">
                    {hasDiscount ? (
                      <>
                        <span className="line-through text-gray-400 text-xs">
                          {formatPrice(originalPrice)} €
                        </span>
                        <br />
                        <span className="font-semibold text-green-700">
                          {formatPrice(unitPriceAfterDiscount)} €
                        </span>
                      </>
                    ) : (
                      <span>{formatPrice(originalPrice)} €</span>
                    )}
                  </td>

                  {}
                  <td className="border p-2 text-sm">
                    {hasDiscount ? (
                      <>
                        <span className="line-through text-gray-400 text-xs">
                          {formatPrice(originalPrice * item.quantite)} €
                        </span>
                        <br />
                        <span className="font-semibold text-green-700">
                          {formatPrice(totalAfterDiscount)} €
                        </span>
                      </>
                    ) : (
                      <span>
                        {formatPrice(originalPrice * item.quantite)} €
                      </span>
                    )}
                  </td>

                  {}
                  <td className="border p-2 text-sm">
                    {item.url_pdf_carte ? (
                      <a
                        href={item.url_pdf_carte}
                        download
                        className="flex items-center gap-1 text-[#080808] hover:text-[#080808] underline text-sm"
                      >
                        <Eye size={16} />
                        Télécharger
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {}
        <div className="mt-4 border-t pt-2 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Sous-total (HT) :</span>
            <span>{formatPrice(order?.total_ht)} €</span>
          </div>

          <div className="flex justify-between">
            <span>TVA (20%) :</span>
            <span>{formatPrice(order?.taxe)} €</span>
          </div>

          {order?.coupon_code && (
            <div className="flex justify-between text-red-600">
              <span>Coupon appliqué :</span>
              <span>
                -
                {formatPrice(
                  order?.lignes.reduce(
                    (acc, i) => acc + Number(i.coupon_discount || 0),
                    0
                  )
                )}{" "}
                €
              </span>
            </div>
          )}

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

        {}
        <div className="mt-6">
          {order?.statut ? (
            <div className="inline-block px-3 py-1 rounded bg-green-100 text-green-700 font-semibold">
              ✔ Paiement reçu
            </div>
          ) : (
            <div className="inline-block px-3 py-1 rounded bg-red-100 text-red-700 font-semibold">
              ✘ Non payé
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
