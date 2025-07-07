import React from "react";

import ProductItem from "./ProductItem";
import { nanoid } from "nanoid";
import { Product } from "../types/Product"; // Adjust the path if your file structure is different


const ProductGrid = ({ products }: { products?: Product[] }) => {
  return (
    <div
      id="gridTop"
      className="max-w-screen-2xl flex flex-wrap justify-between items-center gap-y-8 mx-auto mt-12 max-xl:justify-start max-xl:gap-5 px-5 max-[400px]:px-3"
    >
      {products &&
        products.map((product: Product) => (
          <ProductItem
  key={product._id || nanoid()}
  id={product._id}
  image={product.image}
  title={product.name}            // <--- Fix: use product.name!
  category={product.category}
  price={product.price}
/>

        ))}
    </div>
  );
};

export default React.memo(ProductGrid);
