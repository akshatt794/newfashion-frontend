// src/components/PressCelebritiesSection.tsx
import React from "react";

const celebs = [
  { name: "Alia Bhatt", img: "/images/celeb1.jpg" },
  { name: "Kiara Advani", img: "/images/celeb2.jpg" },
  { name: "Kareena Kapoor", img: "/images/celeb3.jpg" },
];

export default function PressCelebritiesSection() {
  return (
    <section className="py-16 px-5 bg-white text-center">
      <h2 className="text-4xl font-semibold mb-12 font-serif">As Seen On</h2>
      <div className="flex gap-14 justify-center flex-wrap">
        {celebs.map((c, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-32 h-32 mb-4 rounded-full border border-gray-200 bg-gray-50 shadow-sm overflow-hidden flex items-center justify-center">
              {c.img ? (
                <img
                  src={c.img}
                  alt={c.name}
                  className="w-full h-full object-cover"
                  onError={e => ((e.target as HTMLImageElement).style.display = "none")}
                />
              ) : (
                // Placeholder if image missing
                <span className="text-2xl text-gray-400">?</span>
              )}
            </div>
            <span className="text-lg font-medium font-serif">{c.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
