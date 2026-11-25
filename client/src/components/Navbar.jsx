import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  return (
    <nav className="bg-black text-yellow-500 px-8 py-4 flex items-center justify-between border-b border-yellow-700">
      <Link to="/" className="text-2xl font-bold tracking-widest">VELMORA</Link>
      <div className="flex gap-6 items-center">
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart ({count})</Link>
        {user ? (
          <>
            <Link to="/orders">My Orders</Link>
            <span className="text-stone-300">Hi, {user.name}</span>
            <button onClick={logout} className="border border-yellow-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}