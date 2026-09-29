import { createContext, useContext, useReducer, useEffect } from 'react';
import { products } from '../data/products';

const CartContext = createContext();

const STORAGE_KEY = 'brownlabel-cart';

// Authoritative sanitizer: never trust raw prices or sizes from localStorage
function sanitizeAndHydrateCart(rawItems) {
  if (!Array.isArray(rawItems)) return [];

  const sanitized = [];

  for (const item of rawItems) {
    if (!item || typeof item !== 'object') continue;

    const authoritativeProduct = products.find((p) => p.id === item.id);
    if (!authoritativeProduct) continue;

    // Verify size exists in authoritative catalog
    const validSizes = Object.keys(authoritativeProduct.prices || {});
    if (!validSizes.includes(item.size)) continue;

    const authoritativePrice = authoritativeProduct.prices[item.size];
    const safeQuantity =
      Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99
        ? item.quantity
        : 1;

    sanitized.push({
      id: authoritativeProduct.id,
      name: authoritativeProduct.name,
      variant: authoritativeProduct.variant,
      size: item.size,
      price: authoritativePrice, // Always authoritative
      colorPrimary: authoritativeProduct.colorPrimary,
      quantity: safeQuantity,
    });
  }

  return sanitized;
}

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return sanitizeAndHydrateCart(parsed);
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: Math.min(99, item.quantity + 1) }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter(
        (item) => !(item.id === action.payload.id && item.size === action.payload.size)
      );
    case 'UPDATE_QUANTITY':
      return state
        .map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: Math.min(99, Math.max(0, Math.floor(action.payload.quantity))) }
            : item
        )
        .filter((item) => item.quantity > 0);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => loadCart());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Storage quota or disabled cookies protection
    }
  }, [cart]);

  const addItem = (product, size) => {
    if (!product || !product.id || !product.prices || !product.prices[size]) return;
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        variant: product.variant,
        size,
        price: product.prices[size], // Authoritative
        colorPrimary: product.colorPrimary,
      },
    });
  };

  const removeItem = (id, size) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size } });
  };

  const updateQuantity = (id, size, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } });
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
