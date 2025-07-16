// src/components/ProductGrid.tsx

import { Link } from "react-router-dom";
import { Product } from "../types/Product";

interface Props {
  products: Product[];
}

const ProductGrid: React.FC<Props> = ({ products }) => {
  if (!products.length)
    return <div className="text-center text-gray-500">No products found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 px-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-5 transition-transform hover:-translate-y-1 hover:shadow-2xl"
        >
          <img
            src={`https://newfashion-backend.onrender.com${product.image}`}
            alt={product.name}
            className="h-60 w-full object-cover rounded-lg mb-4"
          />
          <div className="w-full flex flex-col flex-1">
            <h3 className="text-xl font-bold mb-1 text-center">{product.name}</h3>
            <div className="text-lg font-semibold text-gray-800 mb-2 text-center">
              ₹{product.price}
            </div>
            <div className="text-sm text-gray-500 mb-4 text-center">{product.category}</div>
            <div className="text-xs text-gray-400 mb-4 text-center">{product.description}</div>
            <div className="mt-auto flex flex-row gap-3 justify-center">
              <Link
                to={`/product/${product._id}`}
                className="px-4 py-2 rounded-full border border-gray-300 text-sm font-semibold hover:bg-gray-100 transition"
              >
                View
              </Link>
              <button
                className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
                // onClick={() => addToCart(product)} // implement addToCart if needed
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
