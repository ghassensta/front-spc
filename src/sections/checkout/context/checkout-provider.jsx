import {
  useMemo,
  useEffect,
  useCallback,
  createContext,
  Suspense,
} from "react";
import { useRouter } from "../../../hooks";
import { useLocalStorage } from "../../../hooks/use-local-storage";

export const CheckoutContext = createContext(undefined);
export const CheckoutConsumer = CheckoutContext.Consumer;

const STORAGE_KEY = "app-checkout";

const initialState = {
  items: [],
  subtotal: 0,
  total: 0,
  discount: 0,
  shipping: 0,
  billing: {},
  expediteur: {},
  totalItems: 0,
  selectedCreditIds: [],
  couponId: null,
  couponTimestamp: null, // For coupon expiration
  cartTimestamp: null, // New: for cart inactivity expiration (1 hour)
};

export function CheckoutProvider({ children }) {
  return (
    <Suspense>
      <Container>{children}</Container>
    </Suspense>
  );
}

function Container({ children }) {
  const router = useRouter();
  const { state, setState, setField, canReset, resetState } = useLocalStorage(
    STORAGE_KEY,
    initialState
  );

  // Check cart expiration (1 hour of inactivity)
  const checkCartExpiration = useCallback(() => {
    if (state.cartTimestamp) {
      const now = Date.now();
      const oneHour = 60 * 60 * 1000; // 1 hour in ms
      if (now - state.cartTimestamp > oneHour) {
        // Clear entire cart if inactive for 1 hour
        setField("items", []);
        setField("cartTimestamp", null);
        setField("couponId", null);
        setField("couponTimestamp", null);
      }
    }
  }, [state.cartTimestamp, setField]);

  // Update cart timestamp on any cart change (add, delete, etc.)
  const updateCartTimestamp = useCallback(() => {
    setField("cartTimestamp", Date.now());
  }, [setField]);

  // Check coupon expiration (1 hour)
  const checkCouponExpiration = useCallback(() => {
    if (state.couponId && state.couponTimestamp) {
      const now = Date.now();
      const oneHour = 60 * 60 * 1000; // 1 hour in ms
      if (now - state.couponTimestamp > oneHour) {
        // Clear coupon and discounts
        setField("couponId", null);
        setField("couponTimestamp", null);
        const updatedItems = state.items.map((item) => ({
          ...item,
          discount: 0,
        }));
        setField("items", updatedItems);
      }
    }
  }, [state.couponId, state.couponTimestamp, state.items, setField]);

  // Run expiration checks on mount and when relevant state changes
  useEffect(() => {
    checkCartExpiration();
    checkCouponExpiration();
  }, [checkCartExpiration, checkCouponExpiration]);

  // Recalcul des totaux
  const updateTotalField = useCallback(() => {
    const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = state.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const total = subtotal - state.discount + state.shipping;
    setField("subtotal", subtotal);
    setField("totalItems", totalItems);
    setField("total", total);
  }, [state.items, state.discount, state.shipping, setField]);

  useEffect(() => {
    if (state.items.length > 0 || state.discount > 0 || state.shipping > 0) {
      updateTotalField();
    }
  }, []); // Au montage initial

  useEffect(() => {
    updateTotalField();
  }, [state.items, state.discount, state.shipping]);

  // Cart actions
  const onAddToCart = useCallback(
    (newItem) => {
      const updatedItems = [...state.items];
      const existingIndex = updatedItems.findIndex((i) => i.id === newItem.id);
      if (existingIndex > -1) {
        const existing = updatedItems[existingIndex];
        const newDest = newItem.destinataires.filter(
          (d) => !existing.destinataires.some((e) => e.email.toLowerCase() === d.email.toLowerCase())
        );
        updatedItems[existingIndex] = {
          ...existing,
          destinataires: [...existing.destinataires, ...newDest],
          quantity: existing.destinataires.length + newDest.length,
          discount: 0, // Reset discount on update
        };
      } else {
        updatedItems.push({
          ...newItem,
          quantity: newItem.destinataires.length,
          discount: 0, // Initialize discount
        });
      }
      const clearedItems = updatedItems.map((item) => ({ ...item, discount: 0 }));
      setField("items", clearedItems);
      updateCartTimestamp();
      setField("couponId", null);
      setField("couponTimestamp", null);
    },
    [state.items, setField, updateCartTimestamp]
  );
  
  const onDeleteCart = useCallback(
    (itemId) => {
      const updatedItems = state.items.filter((item) => item.id !== itemId);
      const clearedItems = updatedItems.map((item) => ({ ...item, discount: 0 }));
      setField("items", clearedItems);
      updateCartTimestamp();
      // Clear coupon on delete
      setField("couponId", null);
      setField("couponTimestamp", null);
    },
    [state.items, setField, updateCartTimestamp]
  );

  const onCreateExpediteur = useCallback(
    (expediteur) => setField("expediteur", expediteur),
    [setField]
  );

  const onCreateBilling = useCallback(
    (billing) => setField("billing", billing),
    [setField]
  );

  const onApplyDiscount = useCallback(
    (discount) => {
      setField("discount", discount);
      updateCartTimestamp();
    },
    [setField, updateCartTimestamp]
  );

  const onApplyShipping = useCallback(
    (shipping) => {
      setField("shipping", shipping);
      updateCartTimestamp();
    },
    [setField, updateCartTimestamp]
  );

  const onApplyCouponId = useCallback(
    (couponId) => {
      setField("couponId", couponId);
      if (couponId) {
        setField("couponTimestamp", Date.now());
      } else {
        setField("couponTimestamp", null);
      }
      updateCartTimestamp();
    },
    [setField, updateCartTimestamp]
  );

  const onSelectCredit = useCallback(
    (creditId) => {
      setField("selectedCreditIds", (prev = []) => {
        if (prev.includes(creditId)) return prev.filter((id) => id !== creditId);
        return [...prev, creditId];
      });
      updateCartTimestamp();
    },
    [setField, updateCartTimestamp]
  );

  const onReset = useCallback(() => {
    resetState();
    localStorage.removeItem(STORAGE_KEY);
  }, [resetState]);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      selectedCreditIds: state.selectedCreditIds || [],
      canReset,
      onReset,
      onUpdate: setState,
      onUpdateField: setField,
      onAddToCart,
      onDeleteCart,
      onCreateBilling,
      onCreateExpediteur,
      onApplyDiscount,
      onApplyShipping,
      onSelectCredit,
      setSelectedCreditIds: (ids) => setField("selectedCreditIds", ids),
      onApplyCouponId,
    }),
    [
      state,
      canReset,
      setState,
      setField,
      onAddToCart,
      onDeleteCart,
      onCreateBilling,
      onCreateExpediteur,
      onApplyDiscount,
      onApplyShipping,
      onReset,
      onApplyCouponId,
    ]
  );

  return <CheckoutContext.Provider value={memoizedValue}>{children}</CheckoutContext.Provider>;
}
