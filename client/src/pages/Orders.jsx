import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my").then((res) => setOrders(res.data)).catch(() => {});
  }, []);

  return (
    <div className="bg-black min-h-[80vh] p-10 text-stone-200">
      <h2 className="text-3xl text-yellow-500 font-bold mb-6">My Orders</h2>
      {orders.length === 0 && <p>No orders yet.</p>}
      <div className="space-y-4 max-w-2xl">
        {orders.map((o) => (
          <div key={o._id} className="border border-yellow-700 rounded p-4">
            <div className="flex justify-between">
              <span className="text-xs text-stone-400">{new Date(o.createdAt).toLocaleString()}</span>
              <span className="text-yellow-500 uppercase text-sm">{o.status}</span>
            </div>
            {o.items.map((i) => (
              <p key={i._id}>{i.name} x {i.quantity}</p>
            ))}
            <p className="font-bold mt-2">Total: ₹{o.totalPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
}