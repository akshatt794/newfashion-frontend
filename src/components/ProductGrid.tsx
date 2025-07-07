import React from "react";
import ProductItem from "./ProductItem";
import { nanoid } from "nanoid";
import { Product } from "../types/Product";

const ProductGrid = ({ products }) => (
  <div>
    {products.map(p => (
      <div key={p._id}>
        <img src={`https://newfashion-backend.onrender.com${p.image}`} alt={p.name} />
        <div>{p.name}</div>
        <div>{p.price}</div>
        {/* etc */}
      </div>
    ))}
  </div>
);

};

export default React.memo(ProductGrid);
