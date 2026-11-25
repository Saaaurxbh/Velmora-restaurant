import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Menu() {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    api
      .get("/foods")
      .then((res) => setFoods(res.data))
      .catch(() => setError("Could not load menu"));
  }, []);

  return (
    <div className="bg-black min-h-[80vh] px-8 py-10">
      <h2 className="text-3xl text-yellow-500 font-bold mb-8">Our Menu</h2>
      {error && <p className="text-red-400">{error}</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {foods.map((f) => (
          <div key={f._id} className="border border-yellow-700 rounded p-5 text-stone-200">
            <p className="text-xs text-yellow-600">{f.category?.name}</p>
            <h3 className="text-xl text-yellow-500 font-semibold">{f.name}</h3>
            <p className="text-sm mt-1">{f.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <p className="font-bold">₹{f.price}</p>
              <button
                onClick={() => addToCart(f)}
                className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}