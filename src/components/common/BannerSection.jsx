import React, { useState } from "react";

export default function BannerSection() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() === "") {
      alert("Please enter a food name to search!");
      return;
    }
    alert(`Searching for: ${query}`);
  };

  return (
    <section
      className="relative w-full h-[70vh] md:h-[85vh] flex items-center justify-center bg-center bg-cover"
      style={{ backgroundImage: `url('/share-food.jpeg')` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          Share Food, <span className="text-orange-400">Share Love</span>
        </h1>

        <p className="mt-4 text-white/90 text-sm md:text-lg opa">
          Connect with your community to reduce food waste and help those in
          need. Every meal shared is a step towards a better world.
        </p>

        <div className="mt-8 flex justify-center">
          <input
            type="text"
            placeholder="Search food..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 w-60 md:w-80 rounded-l-full bg-white text-gray-800 placeholder-gray-500 outline-none shadow-md opacity-65"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 rounded-r-full bg-[#24C7F5] text-white font-semibold hover:bg-[#50D3F7] transition-all shadow-md"
          >
            Search
          </button>
        </div>

        <button
          onClick={() => alert("View All Foods clicked")}
          className="mt-6 px-8 py-3 rounded-full bg-orange-500 text-white font-semibold shadow-lg hover:bg-orange-400 transition-all"
        >
          View All Foods
        </button>
      </div>
    </section>
  );
}
