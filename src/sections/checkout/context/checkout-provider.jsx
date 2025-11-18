import {
  useMemo,
  Suspense,
  useEffect,
  useCallback,
  createContext,
} from 'react';
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
  selectedCreditIds: [], // ←←← AJOUTÉ ICI
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

  // Mise à jour automatique des totaux quand les items/discount/shipping changent
  const updateTotalField = useCallback(() => {
    const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = state.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const total = subtotal - state.discount + state.shipping;

    setField('subtotal', subtotal);
    setField('totalItems', totalItems);
    setField('total', total);
  }, [state.items, state.discount, state.shipping, setField]);

  // Au chargement initial, recalculer si données restaurées
  useEffect(() => {
    if (state.items.length > 0 || state.discount > 0 || state.shipping > 0) {
      updateTotalField();
    }
  }, []); // Une seule fois au montage

  // Recalculer à chaque changement critique
  useEffect(() => {
    updateTotalField();
  }, [state.items, state.discount, state.shipping, updateTotalField]);

  // Ajouter au panier
  const onAddToCart = useCallback(
    (newItem) => {
      const updatedItems = [...state.items];
      const existingIndex = updatedItems.findIndex((i) => i.id === newItem.id);

      if (existingIndex > -1) {
        const existing = updatedItems[existingIndex];
        const newDest = newItem.destinataires.filter(
          (d) =>
            !existing.destinataires.some(
              (e) => e.email.toLowerCase() === d.email.toLowerCase()
            )
        );
        updatedItems[existingIndex] = {
          ...existing,
          destinataires: [...existing.destinataires, ...newDest],
          quantity: existing.destinataires.length + newDest.length,
        };
      } else {
        updatedItems.push({
          ...newItem,
          quantity: newItem.destinataires.length,
        });
      }

      setField('items', updatedItems);
    },
    [state.items, setField]
  );

  const onDeleteCart = useCallback(
    (itemId) => {
      setField(
        'items',
        state.items.filter((item) => item.id !== itemId)
      );
    },
    [state.items, setField]
  );

  const onCreateExpediteur = useCallback(
    (expediteur) => setField('expediteur', expediteur),
    [setField]
  );

  const onCreateBilling = useCallback(
    (billing) => setField('billing', billing),
    [setField]
  );

  const onApplyDiscount = useCallback(
    (discount) => setField('discount', discount),
    [setField]
  );

  const onApplyShipping = useCallback(
    (shipping) => setField('shipping', shipping),
    [setField]
  );

  // ←←← NOUVELLE FONCTION POUR LES CRÉDITS
  const onSelectCredit = useCallback(
    (creditId) => {
      setField('selectedCreditIds', (prev = []) => {
        if (prev.includes(creditId)) {
          return prev.filter((id) => id !== creditId);
        }
        return [...prev, creditId];
      });
    },
    [setField]
  );

  // Reset complet
  const onReset = useCallback(() => {
    resetState();
    localStorage.removeItem(STORAGE_KEY);
  }, [resetState]);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      selectedCreditIds: state.selectedCreditIds || [], // ←←← Toujours un tableau
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
      onSelectCredit,        // ←←← Exposée !
      setSelectedCreditIds: (ids) => setField('selectedCreditIds', ids), // ←←← Setter direct aussi
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
    ]
  );

  return (
    <CheckoutContext.Provider value={memoizedValue}>
      {children}
    </CheckoutContext.Provider>
  );
}