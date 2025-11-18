import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAuthOrders } from "src/actions/auth-commandes";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";

export default function CommandesListView() {
  const { orders = [], loading, validating } = useGetAuthOrders();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const safeOrders = Array.isArray(orders) ? orders : [];
  const totalPages = Math.ceil(safeOrders.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentOrders = safeOrders.slice(startIndex, startIndex + rowsPerPage);

  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const calculateTotal = (lignes = []) => {
    if (!Array.isArray(lignes)) return "0.00";
    return lignes
      .reduce((sum, ligne) => sum + parseFloat(ligne.prix_unitaire || 0) * (ligne.quantite || 0), 0)
      .toFixed(2);
  };

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
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-b-2 py-2">
                <td><div className="h-4 bg-gray-200 animate-pulse w-24 mx-auto rounded" /></td>
                <td><div className="h-4 bg-gray-200 animate-pulse w-40 mx-auto rounded" /></td>
                <td><div className="h-4 bg-gray-200 animate-pulse w-20 mx-auto rounded" /></td>
                <td><div className="h-4 bg-gray-200 animate-pulse w-32 mx-auto rounded" /></td>
                <td><div className="h-8 w-12 bg-gray-200 animate-pulse mx-auto rounded" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

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
          {safeOrders.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <div className="flex flex-col items-center py-12">
                  <p className="py-4 text-gray-600 text-lg">
                    Vous n'avez pas encore passé de commande
                  </p>
                  <Link
                    to={paths.spa.list}
                    className="bg-black text-white px-8 py-3 uppercase tracking-wider hover:bg-gray-800 transition rounded"
                  >
                    Découvrir nos offres
                  </Link>
                </div>
              </td>
            </tr>
          ) : (
            currentOrders.map((order) => {
              const total = calculateTotal(order.lignes_commande);
              const articleCount = Array.isArray(order.lignes_commande) ? order.lignes_commande.length : 0;

              return (
                <tr key={order.id} className="border-b-2 py-3 hover:bg-gray-50">
                  <td>
                    <Link
                      to={paths.dashboard.commandes.view(order.id)}
                      className="font-bold text-black-600 hover:underline"
                    >
                      {order.numero_commande || "N/A"}
                    </Link>
                  </td>
                  <td>{formatDate(order.created_at)}</td>
                  <td className={order.statut_paiement ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {order.statut_paiement ? "Payée" : "En attente"}
                  </td>
                  <td>
                    {total} € pour {articleCount} article{articleCount > 1 ? "s" : ""}
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
            })
          )}
        </tbody>
      </table>

      {/* ← Pagination TOUJOURS visible (comme tu le veux) */}
      <div className="flex justify-between items-center mt-6 text-sm">
        <div>
          <label className="mr-2">Lignes par page :</label>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Précédent
          </button>
          <span className="font-medium">
            Page {currentPage} sur {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages || 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}