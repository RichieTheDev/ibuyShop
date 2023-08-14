import { create } from "zustand";

const useStore = create((set) => ({
  cart: [],
  add: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        return { cart: [...state.cart] };
      } else {
        return { cart: [...state.cart, { ...item, quantity: 1 }] };
      }
    }),
  minus: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        const newQuantity = Math.max(existingItem.quantity - 1, 1);
        existingItem.quantity = newQuantity;
        return { cart: [...state.cart] };
      } else {
        return { cart: [...state.cart, { ...item, quantity: 1 }] };
      }
    }),
  removeItem: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((cartItem) => cartItem._id !== itemId),
    })),
  clear: () =>
    set(() => ({
      cart: [],
    })),
}));

export default useStore;
