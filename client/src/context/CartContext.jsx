import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (food) =>
    setItems((prev) => {
      const found = prev.find((i) => i._id === food._id);
      if (found) {
        return prev.map((i) => (i._id === food._id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { _id: food._id, name: food.name, price: food.price, quantity: 1 }];
    });

  const changeQty = (id, delta) =>
    setItems((prev) =>
      prev.map((i) => (i._id === id ? { ...i, quantity: i.quantity + delta } : i)).filter((i) => i.quantity > 0)
    );

  const clearCart = () => setItems([]);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, changeQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);