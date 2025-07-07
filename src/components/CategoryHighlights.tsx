// src/components/CategoryHighlights.tsx
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Corsets",
    image: "/images/category-occasion.jpg",
    slug: "Corsets",
  },
  {
    title: "Jackets",
    image: "/images/category-bestsellers.jpg",
    slug: "Jackets",
  },
  {
    title: "Shirts",
    image: "/images/category-kaftans.jpg",
    slug: "Shirts",
  },
  {
    title: "Co-ord Sets",
    image: "/images/category-coord.jpg",
    slug: "coord-sets",
  },
  {
    title: "Dresses",
    image: "/images/category-dresses.jpg",
    slug: "dresses",
  },
  
  
];

const CategoryHighlights = () => (
  <section className="py-14 bg-white">
    <h2 className="text-4xl font-bold text-center mb-10">Shop by Category</h2>
    <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 justify-items-center">
      {categories.map((cat) => (
        <Link
          to={`/shop/${cat.slug}`}
          key={cat.slug}
          className="group relative w-full max-w-xs h-80 rounded-2xl overflow-hidden shadow hover:scale-105 transition"
        >
          <img
            src={cat.image}
            alt={cat.title}
            className="object-cover w-full h-full group-hover:brightness-90 transition"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-2xl font-bold text-center drop-shadow">
              {cat.title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default CategoryHighlights;
