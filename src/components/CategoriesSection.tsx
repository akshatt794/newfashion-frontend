// CategoriesSection.jsx
import CategoryItem from "./CategoryItem";

const CategoriesSection = () => {
  return (
    <div className="max-w-screen-2xl px-5 mx-auto mt-10">
      <h2 className="text-black text-2xl font-semibold tracking-tight mb-4">
        Our Categories
      </h2>
      <div className="flex justify-between flex-wrap gap-y-10">
        <CategoryItem
          categoryTitle="Special Edition"
          image="luxury category 1.png"
          link="special-edition"
        />
        <CategoryItem
          categoryTitle="Luxury Collection"
          image="luxury category 2.png"
          link="luxury-collection"
        />
        <CategoryItem
          categoryTitle="Summer Edition"
          image="luxury category 3.png"
          link="summer-edition"
        />
        <CategoryItem
          categoryTitle="Unique Collection"
          image="luxury category 4.png"
          link="unique-collection"
        />
      </div>
    </div>
  );
};
export default CategoriesSection;
