import React from "react";
import { useCheckoutContext } from "../context/use-checkout-context";
import { Link } from "react-router-dom";
import { paths } from "../../../router/paths";
import ButtonIcon from "../../../components/button-icon/button-icon";
import { FaRegTrashAlt } from "react-icons/fa";
import { CONFIG } from "src/config-global";

export default function CheckoutView() {
  const checkout = useCheckoutContext();
  console.log("Checkout data:", checkout.items); // Debug log
  const itemsFiltered = checkout.items?.filter((item) => item.quantity > 0) || [];
  const TAX_RATE = 0.2;

  // State for expéditeur input fields
  const [expediteurFullName, setExpediteurFullName] = React.useState(
    checkout.expediteur?.fullName || ""
  );
  const [expediteurMessage, setExpediteurMessage] = React.useState(
    checkout.expediteur?.message || ""
  );

  // Update expéditeur in checkout context when inputs change
  const handleExpediteurChange = (field, value) => {
    checkout.onCreateExpediteur({
      ...checkout.expediteur,
      [field]: value,
    });
  };

  const handleDelete = (productId) => checkout.onDeleteCart(productId);

  const subtotal = itemsFiltered.reduce(
    (acc, item) => acc + Number(item.price || 0) * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const grandTotal = subtotal + tax;
  const isCartEmpty = itemsFiltered.length === 0;

  return (
    <div className="container mx-auto p-4 font-tahoma">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Panier */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
          <h4 className="text-xl font-semibold mb-4">Panier</h4>
          <table className="w-full text-sm text-left min-w-[600px] lg:min-w-full">
            <thead className="uppercase text-gray-600 border-b text-xs">
              <tr>
                <th className="py-2">Produit</th>
                <th className="py-2">Destinataires</th>
                <th className="py-2">Prix</th>
                <th className="py-2">Quantité</th>
                <th className="py-2">Total</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {itemsFiltered.length > 0 ? (
                itemsFiltered.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3">
                      <div className="flex gap-2 items-start">
                        <img
                          src={`${CONFIG.serverUrl}/storage/${item.image}`}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <Link
                          to={paths.spa.details(item.id)}
                          className="hover:underline"
                        >
                          {item.name}
                        </Link>
                      </div>
                    </td>
                    <td className="py-3">
                      {item.destinataires?.length > 0 ? (
                        <ul className="list-disc pl-4">
                          {item.destinataires.map((dest, index) => (
                            <li key={index}>
                              {dest.fullName && dest.email
                                ? `${dest.fullName} — ${dest.email}`
                                : "Destinataire non défini"}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "Aucun destinataire défini"
                      )}
                    </td>
                    <td className="py-3">
                      {Number(item.price || 0).toFixed(2)} €
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          readOnly
                          value={item.quantity}
                          className="w-12 text-center border border-gray-300 rounded-md"
                        />
                      </div>
                    </td>
                    <td className="py-3">
                      {(Number(item.price || 0) * item.quantity).toFixed(2)} €
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-sm duration-150"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-400">
                    Votre panier est vide.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Totaux */}
          <div className="flex flex-col items-end mt-6 space-y-1 text-sm font-medium">
            <div>Sous-total HT : {subtotal.toFixed(2)} €</div>
            <div>Taxe 20 % : {tax.toFixed(2)} €</div>
            <div className="text-base font-bold">
              Total TTC : {grandTotal.toFixed(2)} €
            </div>
          </div>
        </div>

        {/* Expéditeur + bouton commander */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-xl font-semibold mb-4">Expéditeur</h4>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Nom et prénom"
                value={expediteurFullName}
                onChange={(e) => {
                  setExpediteurFullName(e.target.value);
                  handleExpediteurChange("fullName", e.target.value);
                }}
              />
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Message (optionnel)"
                value={expediteurMessage}
                onChange={(e) => {
                  setExpediteurMessage(e.target.value);
                  handleExpediteurChange("message", e.target.value);
                }}
              />
            </div>
          </div>
          <ButtonIcon
            title="Commander"
            size=""
            link={paths.payment}
            disabled={isCartEmpty || !expediteurFullName}
          />
        </div>
      </div>
    </div>
  );
}