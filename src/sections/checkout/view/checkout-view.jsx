import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { useCheckoutContext } from "../context/use-checkout-context";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { useRouter } from "src/hooks";
import { useValidateCoupon } from "src/actions/coupon";
import { paths } from "src/router/paths";
import { TranslatedText } from "src/components/translated-text/translated-text";

import CartTable from "./components/CartTable";
import OrderSummary from "./components/OrderSummary";
import CouponSection from "./components/CouponSection";
import SenderForm from "./components/SenderForm";
import LoyaltyBanner from "./components/LoyaltyBanner";

// ─── Constants ────────────────────────────────────────────────────────────────
const TAX_RATE = 0.2;

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CheckoutView() {
  const { t } = useTranslation();
  const checkout = useCheckoutContext();
  const { user } = useAuthContext();
  const router = useRouter();
  const validateCoupon = useValidateCoupon();

  // ── Derived data ─────────────────────────────────────────────────────────
  const itemsFiltered = checkout.items?.filter((item) => item.quantity > 0) || [];

  // ── Sender state ─────────────────────────────────────────────────────────
  const [expediteurFullName, setExpediteurFullName] = useState(
    checkout.expediteur?.fullName || "",
  );
  const [expediteurMessage, setExpediteurMessage] = useState(
    checkout.expediteur?.message || "",
  );
  const [expediteurNewsletter, setExpediteurNewsletter] = useState(
    checkout.expediteur?.newsletter ?? true,
  );

  // ── Coupon state ──────────────────────────────────────────────────────────
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponData, setCouponData] = useState(null);

  // ── Price calculations ────────────────────────────────────────────────────
  const subtotalTTC = itemsFiltered.reduce(
    (acc, item) => acc + Number(item.price || 0) * item.quantity,
    0,
  );
  const totalDiscount = couponApplied && couponData ? Number(couponData.amount || 0) : 0;
  const subtotalHT = subtotalTTC / (1 + TAX_RATE);
  const tax = subtotalTTC - subtotalHT;
  const grandTotal = subtotalTTC - totalDiscount;

  // ── Effects ───────────────────────────────────────────────────────────────
  // Reset discounts on mount
  useEffect(() => {
    const hasDiscount = checkout.items?.some((item) => (item.discount || 0) > 0);
    if (hasDiscount || checkout.couponId) {
      checkout.onApplyCouponId(null);
      checkout.onUpdateField(
        "items",
        checkout.items.map((item) => ({ ...item, discount: 0 })),
      );
      resetCoupon();
      toast.info(t("Les réductions et coupons ont été réinitialisés."));
    }
  }, []);

  // Auto-fill sender name from user profile
  useEffect(() => {
    if (user) setExpediteurFullName(user.name);
  }, [user]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const resetCoupon = () => {
    setCouponCode("");
    setCouponApplied(false);
    setCouponData(null);
  };

  const updateExpediteur = (field, value) => {
    checkout.onCreateExpediteur({ ...checkout.expediteur, [field]: value });
  };

  const applyDiscountToItems = (items, discountAmount) => {
    const totalCart = items.reduce(
      (acc, i) => acc + Number(i.price || 0) * Number(i.quantity || 0),
      0,
    );
    if (totalCart === 0) return;

    const updatedItems = items.map((item) => {
      const itemTotal = Number(item.price || 0) * Number(item.quantity || 0);
      return { ...item, discount: discountAmount * (itemTotal / totalCart) };
    });
    checkout.onUpdateField("items", updatedItems);
  };

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleDelete = (productId) => {
    checkout.onDeleteCart(productId);
    resetCoupon();
  };

  const handleUpdateQuantity = (itemId, qty) => {
    const updatedItems = checkout.items.map((it) =>
      it.id === itemId ? { ...it, quantity: qty } : it,
    );
    checkout.onUpdateField("items", updatedItems);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setCouponLoading(true);
    try {
      const res = await validateCoupon(couponCode, subtotalTTC, itemsFiltered);
      if (res.success) {
        const discountNumber = Number(res.discount) || 0;
        setCouponApplied(true);
        setCouponData({ id: res.coupon_id, code: couponCode, type: res.type, amount: discountNumber });
        toast.success(t("Le coupon a été appliqué avec succès"));
      } else {
        toast.error(t("Erreur lors de la validation du coupon"));
      }
    } catch {
      toast.error(t("Erreur lors de la validation du coupon"));
    } finally {
      setCouponLoading(false);
    }
  };

  const handleNewsletterChange = (checked) => {
    setExpediteurNewsletter(checked);
    updateExpediteur("newsletter", checked);
  };

  const handleFullNameChange = (value) => {
    setExpediteurFullName(value);
    updateExpediteur("fullName", value);
  };

  const handleMessageChange = (value) => {
    setExpediteurMessage(value);
    updateExpediteur("message", value);
  };

  const handleCheckout = () => {
    if (itemsFiltered.length === 0) return toast.error(t("Panier est vide"));
   // if (!expediteurFullName) return toast.error(t("Remplir nom d'expéditeur"));

    checkout.onCreateExpediteur({
      ...checkout.expediteur,
      fullName: expediteurFullName,
      message: expediteurMessage,
    });

    if (couponApplied && couponData) {
      applyDiscountToItems(itemsFiltered, Number(couponData.amount));
      checkout.onApplyCouponId(couponData.id);
    } else {
      checkout.onApplyCouponId(null);
    }

    router.push(paths.payment);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="container mx-auto p-4 font-tahoma">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">

          <h4 className="text-xl font-semibold mb-4">
            <TranslatedText text="Panier" />
          </h4>

          <CartTable
            items={itemsFiltered}
            couponApplied={couponApplied}
            subtotalTTC={subtotalTTC}
            totalDiscount={totalDiscount}
            onDelete={handleDelete}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveCoupon={resetCoupon}
          />

          <OrderSummary
            subtotalHT={subtotalHT}
            tax={tax}
            totalDiscount={totalDiscount}
            grandTotal={grandTotal}
          />

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
            <CouponSection
              couponCode={couponCode}
              couponApplied={couponApplied}
              couponLoading={couponLoading}
              couponData={couponData}
              expediteurNewsletter={expediteurNewsletter}
              onCodeChange={setCouponCode}
              onApply={handleApplyCoupon}
              onRemove={resetCoupon}
              onNewsletterChange={handleNewsletterChange}
            />

            <SenderForm
              user={user}
              expediteurFullName={expediteurFullName}
              expediteurMessage={expediteurMessage}
              onFullNameChange={handleFullNameChange}
              onMessageChange={handleMessageChange}
              onCheckout={handleCheckout}
            />
          </div>

          <LoyaltyBanner points={grandTotal.toFixed(0)} />

        </div>
      </div>
    </div>
  );
}