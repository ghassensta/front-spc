import React from "react";
import { Link } from "react-router-dom";
import ButtonIcon from "src/components/button-icon/button-icon";
import { paths } from "src/router/paths";

export default function CommandesListView() {
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
        <tr className="border-b-2 py-2">
          <td>
            <Link className="font-bold">n°4065</Link>
          </td>
          <td>29 avril 2025</td>
          <td>En cours</td>
          <td>160,00 € pour 1 article</td>
          <td>
            <ButtonIcon link={paths.dashboard.commandes.view(1)} size="sm" title="Voir" />
          </td>
        </tr>
        <tr className="border-b-2 py-2">
          <td>
            <Link className="font-bold">n°4065</Link>
          </td>
          <td>29 avril 2025</td>
          <td>En cours</td>
          <td>160,00 € pour 1 article</td>
          <td>
            <ButtonIcon link={paths.dashboard.commandes.view(2)} size="sm" title="Voir" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
