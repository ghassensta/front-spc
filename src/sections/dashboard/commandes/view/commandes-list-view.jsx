import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";

export default function CommandesListView({ orders, loading, validating }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (loading || validating) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <table className="table w-full">
          <thead className="bg-gray-300">
            <tr>
              <th>Commande</th>
              <th>Date</th>
              <th>État</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center text-sm">
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-b-2 py-2">
                <td><div className="h-4 bg-gray-200 animate-pulse w-24 mx-auto rounded" /></td>
                <td><div className="h-4 bg-gray-200 animate-pulse w-32 mx-auto rounded" /></td>
                <td><div className="h-4 bg-gray-200 animate-pulse w-16 mx-auto rounded" /></td>
                <td><div className="h-4 bg-gray-200 animate-pulse w-24 mx-auto rounded" /></td>
                <td><div className="h-6 w-12 bg-gray-200 animate-pulse mx-auto rounded" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Pagination
  const totalPages = Math.ceil(orders.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);

  // Calcul du total
  const totals = currentOrders.map((commande) =>
    commande.lignes_commande.reduce(
      (sum, ligne) => sum + parseFloat(ligne.prix_unitaire) * ligne.quantite,
      0
    )
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <table className="table w-full">
        <thead className="bg-gray-300">
          <tr>
            <th>Commande</th>
            <th>Date</th>
            <th>État</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center text-secondary text-sm">
          {!orders.length && (
            <tr>
              <td colSpan={5}>
                <div className="flex flex-col items-center">
                  <p className="py-2">Vous n'avez pas de commandes</p>
                  <Link
                    to={paths.spa.list}
                    className="bg-black text-white px-6 py-2 uppercase tracking-wider hover:bg-gray-800 max-w-max"
                  >
                    Découvrir nos offres
                  </Link>
                </div>
              </td>
            </tr>
          )}

          {currentOrders.map((order, index) => {
            const formattedDate = new Intl.DateTimeFormat("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(order.created_at));

            return (
              <tr key={order.id} className="border-b-2 py-2">
                <td>
                  <Link
                    to={paths.dashboard.commandes.view(order.id)}
                    className="font-bold"
                  >
                    {order.numero_commande}
                  </Link>
                </td>
                <td>{formattedDate}</td>
                <td className={order.statut_paiement ? "text-green-600" : "text-red-600"}>
                  {order.statut_paiement ? "Payé" : "Non payé"}
                </td>
                <td>
                  {totals[index].toFixed(2)} € pour {order.lignes_commande.length}{" "}
                  article{order.lignes_commande.length > 1 ? "s" : ""}
                </td>
                <td>
                  <ButtonIcon
                    link={paths.dashboard.commandes.view(order.id)}
                    size="sm"
                    title="Voir"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div>
          <label className="mr-2">Lignes par page :</label>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Précédent
          </button>
          <span>
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
