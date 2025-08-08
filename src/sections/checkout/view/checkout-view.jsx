import React, { useState } from "react";
import { useCheckoutContext } from "../context/use-checkout-context";
import { Link } from "react-router-dom";
import { paths } from "../../../router/paths";
import ButtonIcon from "../../../components/button-icon/button-icon";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CheckoutView() {
  const checkout = useCheckoutContext();

  console.log(checkout);

  // Local states for discount and shipping
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);

  const handleIncrease = (productId) => {
    checkout.onIncreaseQuantity(productId);
  };

  const handleDecrease = (productId) => {
    checkout.onDecreaseQuantity(productId);
  };

  const handleDelete = (productId) => {
    checkout.onDeleteCart(productId);
  };

  // Calculate the grand total
  const grandTotal = checkout.total - discount + shipping;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-tahoma p-4">
      {/* Cart Section */}
      <div className="md:col-span-3">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-xl font-semibold mb-4">Panier</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="uppercase text-gray-600 border-b text-xs">
                <tr>
                  <th className="py-2">Produit</th>
                  <th className="py-2">Prix</th>
                  <th className="py-2">Quantité</th>
                  <th className="py-2">Total</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {checkout.items?.length > 0 ? (
                  checkout.items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3">
                        <div className="flex gap-2 items-start">
                          <img
                            src="https://spa-prestige-collection.com/wp-content/uploads/2025/02/SPC-Massage-Duo-1975x1318-01-600x400.jpg"
                            alt=""
                            className="w-20 rounded"
                          />
                          <Link to={paths.spa.details(item.id)}>
                            {item.name}
                          </Link>
                        </div>
                      </td>
                      <td className="py-3">{item.price.toFixed(2)} €</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDecrease(item.id)}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            readOnly
                            value={item.quantity}
                            className="w-12 text-center border border-gray-300 rounded-md"
                          />
                          <button
                            onClick={() => handleIncrease(item.id)}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3">
                        {(item.price * item.quantity).toFixed(2)} €
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 hover:bg-red-700 text-sm text-white p-2 rounded-sm duration-150"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-400">
                      Votre panier est vide.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex flex-col items-end mt-6 text-xs font-medium space-y-2">
            <div>Sous-total HT : {checkout.total.toFixed(2)} €</div>
            <div>
              Remise :
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-16 mr-2 px-2 py-1 border rounded-md text-sm"
                min="0"
              />
              €
            </div>
            <div>
              Tax :
              <input
                type="number"
                value={shipping}
                onChange={(e) => setShipping(Number(e.target.value))}
                className="w-16 mr-2 px-2 py-1 border rounded-md text-sm"
                min="0"
              />
              €
            </div>
            <div className="text-base font-bold">
              Totale TTC : {grandTotal.toFixed(2)} €
            </div>
          </div>
        </div>
      </div>

      {/* Client & Expéditeur Section */}
      <div className="space-y-6">
        {/* Client Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-xl font-semibold mb-4">Client</h4>
          {checkout.billing ? (
            <div className="text-sm space-y-2">
              <div>
                <span className="font-medium">Nom:</span>{" "}
                {checkout.billing.fullName}
              </div>
              
              <div>
                <span className="font-medium">Email:</span>{" "}
                {checkout.billing.email}
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-sm">
              Aucun client sélectionné.
            </div>
          )}
        </div>

        {/* Expéditeur Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-xl font-semibold mb-4">Expéditeur</h4>
          {checkout.expediteur ? (
            <div className="text-sm space-y-2">
              <div>
                <span className="font-medium">Nom:</span>{" "}
                {checkout.expediteur.fullName}
              </div>
              <div>
                <span className="font-medium">Message:</span>{" "}
                {checkout.expediteur.message}
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-sm">
              Aucun expéditeur défini.
            </div>
          )}
        </div>
        <ButtonIcon title="Commander" size="" link={paths.payment}/>
      </div>

      
    </div>
  );
}
