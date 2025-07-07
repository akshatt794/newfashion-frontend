import React, { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";
import customFetch from "../axios/custom";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

type Props = {
  category?: string;
  page?: number;
};

const ShopPageContent: React.FC<Props> = ({ category, page }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    customFetch
      .get("/products")
      .then((res) => {
        let prods = res.data;
        console.log("All products from API:", prods);
        if (category) {
          prods = prods.filter(
            (p: Product) =>
              p.category &&
              p.category.toLowerCase().trim() === category.toLowerCase().trim()
          );
          console.log("Filtered products:", prods, "for category", category);
        }
        setProducts(prods);
      })
      .catch((err) => {
        setProducts([]);
        console.error("Error loading products:", err);
      })
      .finally(() => setLoading(false));
  }, [category, page]);

  if (loading) return <div>Loading...</div>;
  if (products.length === 0) return <div>No products found.</div>;

  return <ProductGrid products={products} />;
};

export default ShopPageContent;
