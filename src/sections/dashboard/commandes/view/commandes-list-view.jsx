import React from "react";
import { Link } from "react-router-dom";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";

export default function CommandesListView({ orders }) {
  const date = new Date("Wed Sep 24 2025 15:41:33 GMT+0100");
  const formatted = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long", // mercredi
    year: "numeric", // 2025
    month: "long", // septembre
    day: "numeric", // 24
    hour: "2-digit", // 15
    minute: "2-digit", // 41
  }).format(date);

  const totals = orders.map((commande) => {
    return commande.lignes_commande.reduce((sum, ligne) => {
      return sum + parseFloat(ligne.prix_unitaire) * ligne.quantite;
    }, 0);
  });
 
  return (
    <table className="table w-full">
      <thead className="bg-gray-300 ">
        <th>Commande</th>
        <th>Date</th>
        <th>Etat</th>
        <th>Total</th>
        <th>Actions</th>
      </thead>
      <tbody className="text-center text-secondary text-sm">
        {orders.map((order) => (
          <tr className="border-b-2 py-2">
            <td>
              <Link
                to={paths.dashboard.commandes.view(order.id)}
                className="font-bold"
              >
                {order.numero_commande}
              </Link>
            </td>
            <td>{formatted}</td>
            <td>{order.statut_paiement ? "Payé" : "Non Payé"}</td>
            <td>
              {totals} € pour {order.lignes_commande.length} article(s)
            </td>
            <td>
              <ButtonIcon
                link={paths.dashboard.commandes.view(order.id)}
                size="sm"
                title="Voir"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
