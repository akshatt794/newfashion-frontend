import React from "react";
import { Product } from "../types/Product";

const ProductGrid = ({ products }: { products: Product[] }) => (
  <div>
    {products.map((p) => (
      <div key={p._id}>
        <img
          src={`https://newfashion-backend.onrender.com${p.image}`}
          alt={p.name}
          style={{ width: 150, height: 150, objectFit: "cover" }}
        />
        <div>{p.name}</div>
        <div>₹{p.price}</div>
        <div>{p.category}</div>
      </div>
    ))}
  </div>
);

export default React.memo(ProductGrid);
