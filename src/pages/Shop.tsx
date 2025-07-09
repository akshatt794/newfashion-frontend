// src/pages/Shop.tsx
import { useParams } from "react-router-dom";
import ShopPageContent from "../components/ShopPageContent";

// Only care about the category param!
const Shop = () => {
  const { category } = useParams<{ category?: string }>();
  return <ShopPageContent category={category} />;
};

export default Shop;
