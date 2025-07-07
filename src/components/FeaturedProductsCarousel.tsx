// src/components/FeaturedProductsCarousel.tsx
import React from "react";

const featured = [
  { name: "Velvet Anarkali", price: "₹29,000", image: "/images/featured1.jpg" },
  { name: "Pastel Kurta Set", price: "₹15,900", image: "/images/featured2.jpg" },
  { name: "Classic Kaftan", price: "₹17,900", image: "/images/featured3.jpg" },
  { name: "Floral Organza", price: "₹21,500", image: "/images/featured4.jpg" },
];

export default function FeaturedProductsCarousel() {
  return (
    <section className="py-20 bg-white px-5">
      <h2 className="text-4xl font-semibold text-center mb-12 font-serif">New Arrivals</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {featured.map((prod, i) => (
          <div
            key={i}
            className="w-[320px] bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center pb-8 group"
            style={{ minHeight: 480 }}
          >
            <div className="overflow-hidden w-full h-72 rounded-t-2xl">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 flex flex-col items-center justify-end px-6 mt-4 w-full">
              <h3 className="text-2xl font-bold font-serif text-center mb-2">{prod.name}</h3>
              <p className="text-lg text-gray-600 mb-4 text-center">{prod.price}</p>
              <a
                href="/shop"
                className="inline-block mt-2 px-7 py-2 rounded-full bg-[#f4f0ec] text-neutral-800 font-semibold text-base shadow hover:bg-[#e5dfd8] transition"
              >
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
