import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { user } = useAuth();
  const { items, changeQty, clearCart, total } = useCart();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const placeOrder = async () => {
    setError("");
    try {
      await api.post("/orders", {
        items: items.map((i) => ({ food: i._id, quantity: i.quantity })),
        address,
      });
      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] text-stone-300 p-10">
        <h2 className="text-3xl text-yellow-500 font-bold mb-4">Your Cart</h2>
        <p>Cart is empty. <Link to="/menu" className="text-yellow-500">Go to menu</Link></p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] text-stone-200 p-10 max-w-2xl">
      <h2 className="text-3xl text-yellow-500 font-bold mb-6">Your Cart</h2>
      {items.map((i) => (
        <div key={i._id} className="flex items-center justify-between border-b border-stone-700 py-3">
          <span>{i.name} (₹{i.price})</span>
          <div className="flex items-center gap-3">
            <button onClick={() => changeQty(i._id, -1)} className="px-2 border border-yellow-500 rounded">-</button>
            <span>{i.quantity}</span>
            <button onClick={() => changeQty(i._id, 1)} className="px-2 border border-yellow-500 rounded">+</button>
            <span className="w-20 text-right">₹{i.price * i.quantity}</span>
          </div>
        </div>
      ))}
      <p className="text-xl text-yellow-500 font-bold mt-4">Total: ₹{total}</p>

      {user ? (
        <div className="mt-6 space-y-3">
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <textarea
            className="w-full p-2 rounded bg-stone-900 text-white"
            placeholder="Delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            onClick={placeOrder}
            disabled={!address.trim()}
            className="bg-yellow-500 text-black px-6 py-2 rounded font-semibold disabled:opacity-50"
          >
            Place Order
          </button>
        </div>
      ) : (
        <p className="mt-6">
          Please <Link to="/login" className="text-yellow-500">login</Link> to place your order.
        </p>
      )}
    </div>
  );
}