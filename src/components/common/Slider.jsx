import React, { useEffect, useState, useRef } from "react";

const slides = [
  {
    id: 1,
    title: "Share Food, Share Love",

    subtitle:
      "Connect with your community to reduce food waste and help those in need.",
    cta: "View All Foods",
    image: "/share-food.jpeg",
  },
  {
    id: 2,
    title: "Every Meal Matters",
    subtitle: "Every meal shared is a step towards a better world.",
    cta: "Browse Meals",
    image: "/every-meal.jpg",
  },
  {
    id: 3,
    title: "Join The Movement",
    subtitle: "Reduce waste, create smiles — join us today.",
    cta: "Get Involved",
    image: "/join-movement.jpg",
  },
];

export default function Slider({ interval = 5000 }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    start();
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  function start() {
    stop();
    timerRef.current = setTimeout(() => {
      setIdx((p) => (p + 1) % slides.length);
    }, interval);
  }
  function stop() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function goTo(i) {
    setIdx(i);
  }
  function prev() {
    setIdx((p) => (p - 1 + slides.length) % slides.length);
  }
  function next() {
    setIdx((p) => (p + 1) % slides.length);
  }

  return (
    <section className="relative w-full overflow-hidden">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${(idx * 100) / slides.length}%)`,
        }}
        onMouseEnter={stop}
        onMouseLeave={start}
      >
        {slides.map((s) => (
          <div
            key={s.id}
            className="relative w-full flex-shrink-0 h-[60vh] md:h-[80vh] lg:h-[90vh] bg-center bg-cover"
            style={{
              width: `${100 / slides.length}%`,
              backgroundImage: `url(${s.image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute inset-0 flex items-center justify-center px-6">
              <div className="text-center max-w-3xl">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-sm">
                  {s.title.replace("Love", "")}
                  <span className="text-orange-400"> Love</span>
                </h1>
                <p className="mt-4 text-sm md:text-base text-white/90">
                  {s.subtitle}
                </p>
                <button
                  className="mt-8 inline-block px-6 py-3 rounded-full bg-[#24C7F5] text-white font-medium shadow hover:bg-[#50D3F7] transition"
                  onClick={() => alert(`${s.cta} clicked`)}
                >
                  {s.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white"
      >
        ›
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full ${
              i === idx ? "bg-white" : "bg-white/40"
            } transition`}
          ></button>
        ))}
      </div>
    </section>
  );
}
