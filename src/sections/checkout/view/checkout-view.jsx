import React, { useEffect, useState } from "react";
import { useCheckoutContext } from "../context/use-checkout-context";
import { Link } from "react-router-dom";
import { paths } from "../../../router/paths";
import { FaRegTrashAlt } from "react-icons/fa";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { toast } from "react-toastify";
import { useRouter } from "src/hooks";
import { useValidateCoupon } from "src/actions/coupon";

export default function CheckoutView() {
  const checkout = useCheckoutContext();
  const { user } = useAuthContext();
  const router = useRouter();
  const validateCoupon = useValidateCoupon();

  const itemsFiltered =
    checkout.items?.filter((item) => item.quantity > 0) || [];
  const TAX_RATE = 0.2;

  const [expediteurFullName, setExpediteurFullName] = useState(
    checkout.expediteur?.fullName || ""
  );
  const [expediteurMessage, setExpediteurMessage] = useState(
    checkout.expediteur?.message || ""
  );

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponData, setCouponData] = useState(null);

  useEffect(() => {
    if (user) setExpediteurFullName(user.name);
  }, [user]);

  const handleExpediteurChange = (field, value) => {
    checkout.onCreateExpediteur({ ...checkout.expediteur, [field]: value });
  };

  const handleDelete = (productId) => {
    checkout.onDeleteCart(productId);
    handleRemoveCoupon();
  };

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

  const getDiscountPerItem = (item) => {
    if (!couponApplied || !couponData) return 0;

    const priceTotal = Number(item.price || 0) * Number(item.quantity || 0);

    if (couponData.type === 2) {
      return ((couponData.amount / 100) * priceTotal).toFixed(2);
    } else {
      const totalCart = itemsFiltered.reduce(
        (acc, i) => acc + Number(i.price || 0) * Number(i.quantity || 0),
        0
      );
      if (totalCart === 0) return 0;
      return (couponData.amount * (priceTotal / totalCart)).toFixed(2);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setCouponLoading(true);

    try {
      const totalTTC = grandTotal;
      const res = await validateCoupon(couponCode, totalTTC, itemsFiltered);

      if (res.success) {
        const { discount, coupon_id, type } = res;
        const discountNumber = Number(discount) || 0;

        setAppliedDiscount(discountNumber);
        setCouponApplied(true);

        const coupon = {
          id: coupon_id,
          code: couponCode,
          type,
          amount: discountNumber,
        };
        setCouponData(coupon);

        // ➤ Met à jour chaque item avec son discount
        const updatedItems = itemsFiltered.map((item) => {
          const priceTotal =
            Number(item.price || 0) * Number(item.quantity || 0);

          let itemDiscount = 0;
          if (type === 2) {
            // Pourcentage
            itemDiscount = priceTotal * (discountNumber / 100);
          } else {
            // Montant fixe réparti proportionnellement
            const totalCart = itemsFiltered.reduce(
              (acc, i) => acc + Number(i.price || 0) * Number(i.quantity || 0),
              0
            );
            if (totalCart > 0) {
              itemDiscount = discountNumber * (priceTotal / totalCart);
            }
          }

          return {
            ...item,
            discount: Number(itemDiscount.toFixed(2)),
          };
        });

        checkout.onUpdateField("items", updatedItems);
        checkout.onApplyDiscount(discountNumber);
        checkout.onApplyCouponId(coupon_id);

        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Erreur lors de la validation du coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setCouponApplied(false);
    setAppliedDiscount(0);
    setCouponData(null);
    checkout.onApplyDiscount(0);
    checkout.onApplyCouponId(null);
  };

  const gotCheckout = () => {
    if (isCartEmpty) return toast.error("Panier est vide");
    if (!expediteurFullName) return toast.error("Remplir nom d'expéditeur");

    const updatedItems = itemsFiltered.map((item) => ({
      ...item,
      discount: Number(getDiscountPerItem(item)),
    }));

    checkout.onUpdateField("items", updatedItems);
    checkout.onApplyCouponId(couponData?.id || null);
    checkout.onApplyDiscount(appliedDiscount);

    router.push(paths.payment);
  };

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
                <th className="py-4 px-3">Discount</th>
                <th className="py-4 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {itemsFiltered.length > 0 ? (
                itemsFiltered.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3 flex gap-2 items-start">
                      <img
                        lazyload="lazy"
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <Link
                        to={
                          item.slug ? paths.product(item.slug) : "/carte-cadeau"
                        }
                        className="hover:underline"
                      >
                        {item.name}
                      </Link>
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
                      <input
                        type="number"
                        readOnly
                        value={item.quantity}
                        className="w-12 text-center border border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="py-3">
                      {(Number(item.price || 0) * item.quantity).toFixed(2)} €
                    </td>
                    <td className="py-3 text-green-600">
                      -{getDiscountPerItem(item)} €
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
                  <td colSpan={7} className="py-6 text-center text-gray-400">
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
            {appliedDiscount > 0 && (
              <div className="text-green-600 font-semibold">
                Remise totale : -{appliedDiscount.toFixed(2)} €
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-80 flex flex-col gap-4 md:gap-6">
          {/* Coupon */}
          <div className="bg-white rounded-md p-4 md:p-6 shadow">
            <h2 className="text-base font-semibold mb-3 md:mb-4">
              Code Coupon
            </h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                className="flex-1 border rounded-md p-2 w-full"
                placeholder="Entrez votre code coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                disabled={couponApplied || couponLoading}
              />
              {couponApplied ? (
                <button
                  onClick={handleRemoveCoupon}
                  className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                >
                  Supprimer
                </button>
              ) : (
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponLoading || !couponCode}
                  className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {couponLoading ? "Validation..." : "Appliquer"}
                </button>
              )}
            </div>
          </div>

          {/* Expéditeur */}
          {user ? (
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-3 md:mb-4">Expéditeur</h4>
              <div className="flex flex-col gap-3 md:gap-4">
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

              <button
                onClick={gotCheckout}
                className="w-full mt-4 inline-flex justify-center items-center rounded-full gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-[#B6B499] hover:bg-black text-white"
              >
                Commander
              </button>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-3">
              <p>Vous devez vous identifier pour commander</p>
              <button
                onClick={() =>
                  router.push(
                    `${paths.auth.root}?returnTo=${encodeURIComponent(
                      "/payment"
                    )}`
                  )
                }
                className="w-full inline-flex justify-center items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-[#B6B499] hover:bg-black text-white rounded-full"
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
