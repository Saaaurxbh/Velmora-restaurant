import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form.name, form.email, form.password);
      navigate("/menu");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-80 space-y-4 border border-yellow-700 p-6 rounded">
        <h2 className="text-2xl text-yellow-500 font-bold">Register</h2>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <input className="w-full p-2 rounded bg-stone-900 text-white" name="name"
          placeholder="Name" value={form.name} onChange={handleChange} required />
        <input className="w-full p-2 rounded bg-stone-900 text-white" name="email" type="email"
          placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="w-full p-2 rounded bg-stone-900 text-white" name="password" type="password"
          placeholder="Password (min 6)" value={form.password} onChange={handleChange} minLength={6} required />
        <button className="w-full bg-yellow-500 text-black py-2 rounded font-semibold">Register</button>
        <p className="text-stone-300 text-sm">
          Already have an account? <Link to="/login" className="text-yellow-500">Login</Link>
        </p>
      </form>
    </div>
  );
}