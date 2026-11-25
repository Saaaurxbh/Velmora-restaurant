import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const ORDER_STATUS = ["pending", "preparing", "delivered", "cancelled"];
const RES_STATUS = ["pending", "confirmed", "cancelled"];

export default function Admin() {
  const { user } = useAuth();
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState("");
  const [food, setFood] = useState({ name: "", description: "", price: "", category: "" });

  const loadAll = () => {
    api.get("/orders").then((r) => setOrders(r.data));
    api.get("/reservations").then((r) => setReservations(r.data));
    api.get("/foods").then((r) => setFoods(r.data));
    api.get("/categories").then((r) => setCategories(r.data));
  };

  useEffect(() => {
    if (user?.role === "admin") loadAll();
  }, [user]);

  if (user?.role !== "admin") return <Navigate to="/" />;

  const updateOrder = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    loadAll();
  };
  const updateReservation = async (id, status) => {
    await api.put(`/reservations/${id}/status`, { status });
    loadAll();
  };
  const addCategory = async (e) => {
    e.preventDefault();
    await api.post("/categories", { name: catName });
    setCatName("");
    loadAll();
  };
  const addFood = async (e) => {
    e.preventDefault();
    await api.post("/foods", { ...food, price: Number(food.price) });
    setFood({ name: "", description: "", price: "", category: "" });
    loadAll();
  };
  const deleteFood = async (id) => {
    await api.delete(`/foods/${id}`);
    loadAll();
  };

  const input = "p-2 rounded bg-stone-900 text-white";
  const tabBtn = (name) =>
    `px-4 py-2 rounded ${tab === name ? "bg-yellow-500 text-black" : "border border-yellow-500 text-yellow-500"}`;

  return (
    <div className="min-h-[80vh] p-8 text-stone-200">
      <h2 className="text-3xl text-yellow-500 font-bold mb-6">Admin Dashboard</h2>
      <div className="flex gap-3 mb-6">
        <button className={tabBtn("orders")} onClick={() => setTab("orders")}>Orders</button>
        <button className={tabBtn("reservations")} onClick={() => setTab("reservations")}>Reservations</button>
        <button className={tabBtn("menu")} onClick={() => setTab("menu")}>Menu</button>
      </div>

      {tab === "orders" && (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o._id} className="border border-yellow-700 rounded p-4">
              <p className="text-sm text-stone-400">{o.user?.name} ({o.user?.email})</p>
              {o.items.map((i) => (<p key={i._id}>{i.name} x {i.quantity}</p>))}
              <p>Total: ₹{o.totalPrice} | {o.address}</p>
              <select className={input + " mt-2"} value={o.status} onChange={(e) => updateOrder(o._id, e.target.value)}>
                {ORDER_STATUS.map((s) => (<option key={s}>{s}</option>))}
              </select>
            </div>
          ))}
        </div>
      )}

      {tab === "reservations" && (
        <div className="space-y-3">
          {reservations.map((r) => (
            <div key={r._id} className="border border-yellow-700 rounded p-4">
              <p className="text-sm text-stone-400">{r.user?.name} ({r.user?.email})</p>
              <p>{new Date(r.date).toLocaleDateString()} at {r.time}, {r.guests} guests</p>
              {r.note && <p className="text-sm">Note: {r.note}</p>}
              <select className={input + " mt-2"} value={r.status} onChange={(e) => updateReservation(r._id, e.target.value)}>
                {RES_STATUS.map((s) => (<option key={s}>{s}</option>))}
              </select>
            </div>
          ))}
        </div>
      )}

      {tab === "menu" && (
        <div className="space-y-8 max-w-2xl">
          <form onSubmit={addCategory} className="flex gap-3">
            <input className={input + " flex-1"} placeholder="New category" value={catName}
              onChange={(e) => setCatName(e.target.value)} required />
            <button className="bg-yellow-500 text-black px-4 rounded font-semibold">Add Category</button>
          </form>

          <form onSubmit={addFood} className="space-y-3 border border-yellow-700 p-4 rounded">
            <input className={input + " w-full"} placeholder="Food name" value={food.name}
              onChange={(e) => setFood({ ...food, name: e.target.value })} required />
            <input className={input + " w-full"} placeholder="Description" value={food.description}
              onChange={(e) => setFood({ ...food, description: e.target.value })} />
            <input className={input + " w-full"} type="number" placeholder="Price" value={food.price}
              onChange={(e) => setFood({ ...food, price: e.target.value })} required />
            <select className={input + " w-full"} value={food.category}
              onChange={(e) => setFood({ ...food, category: e.target.value })} required>
              <option value="">Select category</option>
              {categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
            </select>
            <button className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold">Add Food</button>
          </form>

          <div className="space-y-2">
            {foods.map((f) => (
              <div key={f._id} className="flex justify-between border border-yellow-700 rounded p-3">
                <span>{f.name} (₹{f.price}) - {f.category?.name}</span>
                <button onClick={() => deleteFood(f._id)} className="text-red-400">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}