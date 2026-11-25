import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const images = [
  "/images/food1.jpg",
  "/images/food2.jpg",
  "/images/food3.jpg",
  "/images/food4.jpg",
  "/images/food5.jpg",
  "/images/food6.jpg",
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[85vh] overflow-hidden flex items-center justify-center text-center">
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${
            i === index ? "opacity-100 kenburns" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 px-6">
        <h1 className="text-7xl font-bold text-yellow-500 tracking-[0.3em]">VELMORA</h1>
        <div className="w-24 h-px bg-yellow-600 mx-auto my-5"></div>
        <p className="text-stone-200 tracking-widest uppercase text-sm">
          Fine dining, crafted with passion
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link to="/menu" className="bg-yellow-500 text-black px-6 py-3 rounded font-semibold">
            View Menu
          </Link>
          <Link to="/reservations" className="border border-yellow-500 text-yellow-500 px-6 py-3 rounded">
            Book a Table
          </Link>
        </div>
      </div>
    </div>
  );
}