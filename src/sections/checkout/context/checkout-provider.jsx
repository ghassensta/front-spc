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
      const updatedItems = [...state.items];
      const existingItemIndex = updatedItems.findIndex((item) => item.id === newItem.id);

      // Filter out duplicate destinataires based on email
      // const newDestinataires = newItem.destinataires.filter(
      //   (newDest) => !updatedItems.some((item) =>
      //     item.destinataires?.some((dest) => dest.email.toLowerCase() === newDest.email.toLowerCase())
      //   )
      // );

      if (existingItemIndex !== -1) {
        // Item exists, append new unique destinataires and update quantity
        const existingItem = updatedItems[existingItemIndex];
        const updatedDestinataires = [...existingItem.destinataires, ...newItem.destinataires];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          destinataires: updatedDestinataires,
          quantity: updatedDestinataires.length, // Quantity is number of destinataires
        };
      } else {
        // New item, add with unique destinataires list
        updatedItems.push({
          ...newItem,
          destinataires: newItem.destinataires,
          quantity: newItem.destinataires.length, // Quantity is number of destinataires
        });
      }

      setField('items', updatedItems);
      updateTotalField();
    },
    [setField, state.items, updateTotalField]
  );

  const onDeleteCart = useCallback(
    (itemId) => {
      const updatedItems = state.items.filter((item) => item.id !== itemId);
      setField('items', updatedItems);
      updateTotalField();
    },
    [setField, state.items, updateTotalField]
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
      updateTotalField();
    },
    [setField, updateTotalField]
  );

  const onApplyShipping = useCallback(
    (shipping) => {
      setField('shipping', shipping);
      updateTotalField();
    },
    [setField, updateTotalField]
  );

  const onReset = useCallback(() => {
    resetState();
  }, [resetState]);

  console.log(state)

  const memoizedValue = useMemo(
    () => ({
      ...state,
      canReset,
      onReset,
      onUpdate: setState,
      onUpdateField: setField,
      // setAmount: onSetAmount,
      onAddToCart,
      onDeleteCart,
      onCreateBilling,
      onCreateExpediteur,
      onApplyDiscount,
      onApplyShipping,
    }),
    [
      state,
      onReset,
      canReset,
      setState,
      // onSetAmount,
      setField,
      onAddToCart,
      onDeleteCart,
      onCreateBilling,
      onCreateExpediteur,
      onApplyDiscount,
      onApplyShipping,
    ]
  );

  return <CheckoutContext.Provider value={memoizedValue}>{children}</CheckoutContext.Provider>;
}