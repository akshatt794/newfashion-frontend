// src/components/LookbookInstagramCarousel.tsx
import React from "react";

const posts = [
  "/images/insta1.jpg",
  "/images/insta2.jpg",
  "/images/insta3.jpg",
  "/images/insta4.jpg",
  "/images/insta5.jpg",
];

export default function LookbookInstagramCarousel() {
  return (
    <section className="py-20 px-5 bg-white">
      <h2 className="text-4xl font-semibold text-center mb-12">Styled By You</h2>
      <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 pb-4">
        {posts.map((img, idx) => (
          <div key={idx} className="flex-shrink-0 w-64 h-80 rounded-xl overflow-hidden shadow">
            <img src={img} alt={`Instagram look ${idx + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
