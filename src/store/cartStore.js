import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find(item => item.id === product.id);

        if (existingItem) {
          const updatedItems = items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ items: updatedItems });
        } else {
          set({ items: [...items, { ...product, quantity }] });
        }

        get().calculateTotals();
        toast.success(`${product.name} added to cart`);
      },

      removeItem: (productId) => {
        const items = get().items.filter(item => item.id !== productId);
        set({ items });
        get().calculateTotals();
        toast.success('Item removed from cart');
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const items = get().items.map(item =>
          item.id === productId ? { ...item, quantity } : item
        );
        set({ items });
        get().calculateTotals();
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
      },

      calculateTotals: () => {
        const items = get().items;
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        set({ total, itemCount });
      },

      loadCart: () => {
        get().calculateTotals();
      },
    }),
    {
      name: 'vista-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);