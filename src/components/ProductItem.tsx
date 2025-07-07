import { Link } from "react-router-dom";
import { formatCategoryName } from "../utils/formatCategoryName";

type Props = {
  id: string;
  image: string;    // e.g. "/uploads/12345.webp"
  title: string;
  category?: string;
  price: number;
};

export default function ProductItem({
  id,
  image,
  title,
  category,
  price,
}: Props) {
  return (
    <div className="w-[400px] flex flex-col gap-2 max-md:w-[300px]">
      <Link to={`/product/${id}`} className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-[300px] max-md:h-[200px] object-cover"
        />
      </Link>
      <Link to={`/product/${id}`} className="text-center text-3xl">
        {title}
      </Link>
      <p className="text-center text-lg text-secondaryBrown">
        {formatCategoryName(category || "")}
      </p>
      <p className="text-center text-2xl font-bold">₹{price}</p>
      <div className="flex flex-col gap-1">
        <Link
          to={`/product/${id}`}
          className="bg-secondaryBrown text-white text-center py-3"
        >
          View product
        </Link>
        <Link
          to={`/product/${id}`}
          className="border border-gray-400 text-center py-3"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}
