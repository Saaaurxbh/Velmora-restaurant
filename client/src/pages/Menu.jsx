import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Menu() {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState("");

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
            <p className="mt-3 font-bold">₹{f.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}