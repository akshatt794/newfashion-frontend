import React from "react";
import { Product } from "../types/Product"; // Make sure this is defined as described

const ProductGrid = ({ products }: { products: Product[] }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
    {products.map((p) => (
      <div key={p._id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
        <img
          src={`https://newfashion-backend.onrender.com${p.image}`}
          alt={p.name}
          style={{ width: 150, height: 150, objectFit: "cover", borderRadius: 6 }}
        />
        <div style={{ marginTop: 12, fontWeight: 600 }}>{p.name}</div>
        <div style={{ color: "#444" }}>₹{p.price}</div>
        <div style={{ color: "#777" }}>{p.category}</div>
      </div>
    ))}
  </div>
);

export default React.memo(ProductGrid);
