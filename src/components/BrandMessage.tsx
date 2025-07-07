// src/components/BrandMessage.tsx
import React from "react";

export default function BrandMessage() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 py-20 px-5 bg-gray-50">
      <img
        src="/images/designer.jpg"
        alt="Designer SAKSHI KHETTERPAL"
        className="w-[340px] rounded-xl shadow-lg mb-6 md:mb-0"
      />
      <div className="max-w-xl text-center md:text-left">
        <h2 className="text-4xl font-serif font-bold mb-4">About SAKSHI KHETTERPAL</h2>
        <p className="text-lg text-gray-700 mb-2">
          "Each silhouette is timeless and every garment is handcrafted to perfection. We focus on subtle luxury and elegance that transcends seasons."
        </p>
        <span className="block mt-4 font-semibold">— SAKSHI KHETTERPAL</span>
      </div>
    </section>
  );
}
