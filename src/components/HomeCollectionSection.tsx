import ProductGrid from "./ProductGrid";

const HomeCollectionSection = () => {
  return (
    <div>
      {/* Pass an empty array or fetch data if you want */}
      <ProductGrid products={[]} />
    </div>
  );
};

export default HomeCollectionSection;
