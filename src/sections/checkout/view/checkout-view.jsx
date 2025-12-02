import React, { useEffect, useState } from "react";
import { useCheckoutContext } from "../context/use-checkout-context";
import { Link } from "react-router-dom";
import { paths } from "../../../router/paths";
import ButtonIcon from "../../../components/button-icon/button-icon";
import { FaRegTrashAlt } from "react-icons/fa";
import { CONFIG } from "src/config-global";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { toast } from "react-toastify";
import { useRouter } from "src/hooks";

export default function CheckoutView() {
  const checkout = useCheckoutContext();
  const { user } = useAuthContext();

  const router = useRouter();
  const itemsFiltered =
    checkout.items?.filter((item) => item.quantity > 0) || [];
  const TAX_RATE = 0.2;

  // Inputs
  const [expediteurFullName, setExpediteurFullName] = useState(
    checkout.expediteur?.fullName || ""
  );
  const [expediteurMessage, setExpediteurMessage] = useState(
    checkout.expediteur?.message || ""
  );

  useEffect(() => {
    if (user) {
      setExpediteurFullName(user.name);
    }
  }, [user]);

  const handleExpediteurChange = (field, value) => {
    checkout.onCreateExpediteur({
      ...checkout.expediteur,
      [field]: value,
    });
  };

  const handleDelete = (productId) => checkout.onDeleteCart(productId);

  const subtotalHT = itemsFiltered.reduce(
    (acc, item) =>
      acc + (Number(item.price || 0) / (1 + TAX_RATE)) * item.quantity,
    0
  );

  const tax = itemsFiltered.reduce(
    (acc, item) =>
      acc +
      (Number(item.price || 0) - Number(item.price || 0) / (1 + TAX_RATE)) *
        item.quantity,
    0
  );

  const grandTotal = subtotalHT + tax;

  const isCartEmpty = itemsFiltered.length === 0;

  const gotCheckout = () => {
    if (isCartEmpty) {
      toast.error("Panier est vide");
      return;
    }
    if (!expediteurFullName) {
      toast.error("Remplir nom d'expéditeur");
      return;
    }
    router.push(paths.payment);
  };
  console.log("itemsFiltered", itemsFiltered);
  return (
    <div className="container mx-auto p-4 font-tahoma">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Panier */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
          <h4 className="text-xl font-semibold mb-4">Panier</h4>
          <table className="table-auto w-full text-sm text-left min-w-[700px] lg:min-w-full">
            <thead className="uppercase text-gray-700 bg-gray-50 border-b text-xs tracking-wide">
              <tr>
                <th className="py-4 px-3">Produit</th>
                <th className="py-4 px-3">Destinataires</th>
                <th className="py-4 px-3">Prix TTC</th>
                <th className="py-4 px-3">QTE</th>
                <th className="py-4 px-3">Total TTC</th>
                <th className="py-4 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {itemsFiltered.length > 0 ? (
                itemsFiltered.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3">
                      <div className="flex gap-2 items-start">
                        <img
                          lazyload="lazy"
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <Link
                          to={
                            item.slug
                              ? paths.product(item.slug)
                              : "/carte-cadeau"
                          }
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
            <div>Sous-total HT : {subtotalHT.toFixed(2)} €</div>
            <div>Taxe 20 % : {tax.toFixed(2)} €</div>
            <div className="text-base font-bold">
              Total TTC : {grandTotal.toFixed(2)} €
            </div>
          </div>
        </div>

        {/* Expéditeur */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          {user ? (
            <>
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

              <button
                onClick={gotCheckout}
                className="inline-flex font-tahoma justify-center items-center rounded-full gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm text-center bg-[#B6B499] hover:bg-black text-white"
              >
                Commander
              </button>
            </>
          ) : (
            <div className="bg-white p-2 md:p-4 rounded-lg shadow-sm">
              <p className="mb-3">Vous devez vous identifier pour commander</p>
              <button
                onClick={() =>
                  router.push(
                    `${paths.auth.root}?returnTo=${encodeURIComponent(
                      "/payment"
                    )}`
                  )
                }
                className="inline-flex font-tahoma justify-center rounded-full items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm text-center bg-[#B6B499] hover:bg-black text-white"
              >
                Se connecter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
