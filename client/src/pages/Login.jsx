import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/menu");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-black min-h-[80vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-80 space-y-4 border border-yellow-700 p-6 rounded">
        <h2 className="text-2xl text-yellow-500 font-bold">Login</h2>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <input
          className="w-full p-2 rounded bg-stone-900 text-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 rounded bg-stone-900 text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-yellow-500 text-black py-2 rounded font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}