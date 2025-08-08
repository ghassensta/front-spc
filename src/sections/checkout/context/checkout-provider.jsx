import { useMemo, Suspense, useEffect, useCallback, createContext } from 'react';

import { useRouter } from '../../../hooks';
import { getStorage, useLocalStorage } from '../../../hooks/use-local-storage';

export const CheckoutContext = createContext(undefined);

export const CheckoutConsumer = CheckoutContext.Consumer;

const STORAGE_KEY = 'app-checkout';

const initialState = {
  items: [],
  subtotal: 0,
  total: 0,
  discount: 0,
  shipping: 0,
  billing: {},
  expediteur: {},
  totalItems: 0,
};


// ----------------------------------------------------------------------

export function CheckoutProvider({ children }) {
  return (
    <Suspense>
      <Container>{children}</Container>
    </Suspense>
  );
}

// ----------------------------------------------------------------------

function Container({ children }) {
  const router = useRouter();

  const { state, setState, setField, canReset, resetState } = useLocalStorage(
    STORAGE_KEY,
    initialState
  );

  const updateTotalField = useCallback(() => {
    const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = state.items.reduce((total, item) => total + item.quantity * item.price, 0);

    setField('subtotal', subtotal);
    setField('totalItems', totalItems);
    setField('total', subtotal - state.discount + state.shipping);
  }, [setField, state.discount, state.items, state.shipping]);

  useEffect(() => {
    const restoredValue = getStorage(STORAGE_KEY);
    if (restoredValue) {
      updateTotalField();
    }
  }, [updateTotalField]);

  const onAddToCart = useCallback(
    (newItem) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === newItem.id) {

          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      if (!updatedItems.some((item) => item.id === newItem.id)) {
        updatedItems.push({...newItem, quantity: 1});
      }

      setField('items', updatedItems);
    },
    [setField, state.items]
  );

  const onDeleteCart = useCallback(
    (itemId) => {
      const updatedItems = state.items.filter((item) => item.id !== itemId);
      setField('items', updatedItems);
    },
    [setField, state.items]
  );

  const onIncreaseQuantity = useCallback(
    (itemId) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setField('items', updatedItems);
    },
    [setField, state.items]
  );

  const onDecreaseQuantity = useCallback(
    (itemId) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setField('items', updatedItems);
    },
    [setField, state.items]
  );

  const onCreateExpediteur = useCallback(
    (expediteur) => {
      setField('expediteur', expediteur);
    },
    [setField]
  );

  const onCreateBilling = useCallback(
    (address) => {
      setField('billing', address);
    },
    [setField]
  );

  const onApplyDiscount = useCallback(
    (discount) => {
      setField('discount', discount);
    },
    [setField]
  );

  const onApplyShipping = useCallback(
    (shipping) => {
      setField('shipping', shipping);
    },
    [setField]
  );

  const onReset = useCallback(() => {
    resetState();
  }, [resetState]);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      canReset,
      onReset,
      onUpdate: setState,
      onUpdateField: setField,
      onAddToCart,
      onDeleteCart,
      onIncreaseQuantity,
      onDecreaseQuantity,
      onCreateBilling,
      onCreateExpediteur, // <-- add here
      onApplyDiscount,
      onApplyShipping,
    }),
    [
      state,
      onReset,
      canReset,
      setState,
      setField,
      onAddToCart,
      onDeleteCart,
      onIncreaseQuantity,
      onDecreaseQuantity,
      onCreateBilling,
      onCreateExpediteur, // <-- and here
      onApplyDiscount,
      onApplyShipping,
    ]
  );
  

  return <CheckoutContext.Provider value={memoizedValue}>{children}</CheckoutContext.Provider>;
}
