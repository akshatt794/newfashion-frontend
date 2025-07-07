// HomeCollectionSection.jsx
import ProductGrid from "./ProductGrid";
import ProductGridWrapper from "./ProductGridWrapper";

const HomeCollectionSection = () => {
  return (
    <div className="max-w-screen-2xl px-5 mx-auto mt-10">
      <h2 className="text-black text-2xl font-semibold tracking-tight mb-4">
        Our Collection
      </h2>
      <ProductGridWrapper limit={6}>
        <ProductGrid />
      </ProductGridWrapper>
    </div>
  );
};
export default HomeCollectionSection;
