import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-[80vh] bg-black flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-yellow-500 tracking-widest">VELMORA</h1>
      <p className="text-stone-300 mt-4 text-lg">Fine dining, crafted with passion</p>
      <Link to="/menu" className="mt-8 bg-yellow-500 text-black px-6 py-3 rounded font-semibold">
        View Menu
      </Link>
    </div>
  );
}