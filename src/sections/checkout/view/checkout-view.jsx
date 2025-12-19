import React, { useEffect, useState } from "react";
import { useCheckoutContext } from "../context/use-checkout-context";
import { Link } from "react-router-dom";
import { paths } from "../../../router/paths";
import { FaRegTrashAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { toast } from "react-toastify";
import { useRouter } from "src/hooks";
import { useValidateCoupon } from "src/actions/coupon";

export default function CheckoutView() {
  const checkout = useCheckoutContext();
  const { user } = useAuthContext();
  const [loyaltyOpen, setLoyaltyOpen] = useState(false);
  const router = useRouter();
  const validateCoupon = useValidateCoupon();
  const itemsFiltered = checkout.items?.filter((item) => item.quantity > 0) || [];

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
  const [couponData, setCouponData] = useState(null);

  useEffect(() => {
    const hasDiscount = checkout.items?.some((item) => (item.discount || 0) > 0);
    const hasCoupon = !!checkout.couponId;
    if (hasDiscount || hasCoupon) {
      // Clear persisted coupon and discounts
      checkout.onApplyCouponId(null);
      const resetItems = checkout.items.map((item) => ({
        ...item,
        discount: 0,
      }));
      checkout.onUpdateField("items", resetItems);
      // Clear local state too
      setCouponCode("");
      setCouponApplied(false);
      setCouponData(null);
      toast.info("Les réductions et coupons ont été réinitialisés.");
    }
  }, []); // Only on mount (refresh)

  useEffect(() => {
    if (user) setExpediteurFullName(user.name);
  }, [user]);

  const handleExpediteurChange = (field, value) => {
    checkout.onCreateExpediteur({ ...checkout.expediteur, [field]: value });
  };

  const handleDelete = (productId) => {
    checkout.onDeleteCart(productId);
    // Clear local coupon state on delete
    setCouponCode("");
    setCouponApplied(false);
    setCouponData(null);
  };

  // Sous-total TTC AVANT réduction
  const subtotalTTC = itemsFiltered.reduce(
    (acc, item) => acc + Number(item.price || 0) * item.quantity,
    0
  );

  // Total des réductions (coupon local state only for display)
  const totalDiscount = couponApplied && couponData ? Number(couponData.amount || 0) : 0;

  // Sous-total HT et taxe basés sur TTC original
  const subtotalHT = subtotalTTC / (1 + TAX_RATE);
  const tax = subtotalTTC - subtotalHT;

  // Grand total TTC APRÈS réduction (for display)
  const grandTotal = subtotalTTC - totalDiscount;

  const isCartEmpty = itemsFiltered.length === 0;

  // Calculate proportional discount for display only (not updating items)
  const getDisplayDiscountForItem = (itemTotal) => {
    if (!couponApplied || !couponData || subtotalTTC === 0) return 0;
    return (itemTotal / subtotalTTC) * totalDiscount;
  };

  // Apply discount to items (called only on order confirmation)
  const applyDiscountToItems = (items, totalDiscountAmount) => {
    const totalCart = items.reduce(
      (acc, i) => acc + Number(i.price || 0) * Number(i.quantity || 0),
      0
    );
    if (totalCart === 0) return items;
    const updatedItems = items.map((item) => {
      const itemTotal = Number(item.price || 0) * Number(item.quantity || 0);
      const itemDiscount = totalDiscountAmount * (itemTotal / totalCart);
      return {
        ...item,
        discount: itemDiscount,
      };
    });
    checkout.onUpdateField("items", updatedItems);
    return updatedItems;
  };

  // Gestion du coupon (local only)
  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setCouponLoading(true);
    try {
      const res = await validateCoupon(couponCode, subtotalTTC, itemsFiltered);
      if (res.success) {
        const { discount, coupon_id, type } = res;
        const discountNumber = Number(discount) || 0;
        setCouponApplied(true);
        setCouponData({
          id: coupon_id,
          code: couponCode,
          type,
          amount: discountNumber,
        });
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
    setCouponData(null);
  };

  const gotCheckout = () => {
    if (isCartEmpty) return toast.error("Panier est vide");
    if (!expediteurFullName) return toast.error("Remplir nom d'expéditeur");

    checkout.onCreateExpediteur({
      ...checkout.expediteur,
      fullName: expediteurFullName,
      message: expediteurMessage,
    });

    // Now apply coupon to context if present
    if (couponApplied && couponData) {
      applyDiscountToItems(itemsFiltered, Number(couponData.amount));
      checkout.onApplyCouponId(couponData.id);
    } else {
      checkout.onApplyCouponId(null);
    }

    router.push(paths.payment);
  };

  return (
    <div className="container mx-auto p-4 font-tahoma">
      <div className="flex flex-col lg:flex-row gap-6">
        {}
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
                <th className="py-4 px-3">Réduction</th>
                <th className="py-4 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {itemsFiltered.length > 0 ? (
                itemsFiltered.map((item) => {
                  const itemTotal = Number(item.price || 0) * item.quantity;
                  const displayDiscount = getDisplayDiscountForItem(itemTotal);
                  const itemAfterDiscount = itemTotal - displayDiscount;
                  return (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 flex gap-2 items-start">
                        <img
                          loading="lazy"
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
                        <div className="flex flex-col">
                          <span
                            className={
                              displayDiscount > 0
                                ? "line-through text-gray-400 text-xs"
                                : ""
                            }
                          >
                            {itemTotal.toFixed(2)} €
                          </span>
                          {displayDiscount > 0 && (
                            <span className="text-green-600 font-semibold">
                              {itemAfterDiscount.toFixed(2)} €
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 text-green-600 font-medium">
                        {displayDiscount > 0
                          ? `-${displayDiscount.toFixed(2)} €`
                          : "-"}
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
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-400">
                    Votre panier est vide.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {}
          <div className="flex flex-col items-end mt-6 space-y-1 text-sm font-medium">
            <div>Sous-total HT : {subtotalHT.toFixed(2)} €</div>
            <div>Taxe 20 % : {tax.toFixed(2)} €</div>
            {totalDiscount > 0 && (
              <div className="text-green-600 font-semibold">
                Réduction : -{totalDiscount.toFixed(2)} €
              </div>
            )}
            <div className="text-base font-bold border-t pt-2 mt-2 w-48">
              Total TTC : {grandTotal.toFixed(2)} €
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md border mt-6 w-full">
            <button
              type="button"
              onClick={() => setLoyaltyOpen((s) => !s)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3 text-left">
                <h5 className="text-base font-semibold leading-snug">
                  Validez cette commande et gagnez jusqu’à{" "}
                  <span className="text-yellow-600 font-bold">{grandTotal.toFixed(0)} points</span>
                </h5>
              </div>
              <div className="text-gray-600">
                {loyaltyOpen ? (
                  <FaChevronUp size={18} />
                ) : (
                  <FaChevronDown size={18} />
                )}
              </div>
            </button>
            {loyaltyOpen && (
              <div className="px-4 pb-4 text-sm text-gray-600">
                Les points de fidélité vous permettent d'obtenir des récompenses
                lors de vos futurs achats. Le nombre final peut varier selon les
                remises.
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-80 flex flex-col gap-4 md:gap-6">
          {}
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
            {couponApplied && couponData && (
              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                ✓ Code <strong>{couponData.code}</strong> appliqué
              </div>
            )}
          </div>
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
                      "/checkout"
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
