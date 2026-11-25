import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Reservation() {
  const { user } = useAuth();
  const [form, setForm] = useState({ date: "", time: "", guests: 2, note: "" });
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const load = () =>
    api.get("/reservations/my").then((res) => setList(res.data)).catch(() => {});

  useEffect(() => {
    if (user) load();
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    try {
      await api.post("/reservations", form);
      setMsg("Table requested! We will confirm soon.");
      setForm({ date: "", time: "", guests: 2, note: "" });
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not book table");
    }
  };

  const cancel = async (id) => {
    await api.put(`/reservations/${id}/cancel`);
    load();
  };

  if (!user) {
    return (
      <div className="min-h-[80vh] p-10 text-stone-300">
        <h2 className="text-3xl text-yellow-500 font-bold mb-4">Reserve a Table</h2>
        <p>Please <Link to="/login" className="text-yellow-500">login</Link> to book a table.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] p-10 text-stone-200 max-w-2xl">
      <h2 className="text-3xl text-yellow-500 font-bold mb-6">Reserve a Table</h2>
      <form onSubmit={handleSubmit} className="space-y-3 border border-yellow-700 p-5 rounded">
        {msg && <p className="text-green-400 text-sm">{msg}</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <input className="w-full p-2 rounded bg-stone-900 text-white" type="date" name="date"
          value={form.date} onChange={handleChange} required />
        <input className="w-full p-2 rounded bg-stone-900 text-white" type="time" name="time"
          value={form.time} onChange={handleChange} required />
        <input className="w-full p-2 rounded bg-stone-900 text-white" type="number" name="guests"
          min="1" max="20" value={form.guests} onChange={handleChange} required />
        <input className="w-full p-2 rounded bg-stone-900 text-white" name="note"
          placeholder="Special request (optional)" value={form.note} onChange={handleChange} />
        <button className="bg-yellow-500 text-black px-6 py-2 rounded font-semibold">Book Table</button>
      </form>

      <h3 className="text-xl text-yellow-500 font-semibold mt-8 mb-3">My Reservations</h3>
      {list.length === 0 && <p>No reservations yet.</p>}
      <div className="space-y-3">
        {list.map((r) => (
          <div key={r._id} className="border border-yellow-700 rounded p-4 flex justify-between items-center">
            <div>
              <p>{new Date(r.date).toLocaleDateString()} at {r.time}, {r.guests} guests</p>
              <p className="text-sm text-yellow-500 uppercase">{r.status}</p>
            </div>
            {r.status !== "cancelled" && (
              <button onClick={() => cancel(r._id)} className="border border-red-400 text-red-400 px-3 py-1 rounded text-sm">
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}