// src/pages/SingleProduct.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Dropdown,
  ProductItem,
  QuantityInput,
  StandardSelectInput,
} from "../components";
import customFetch from "../axios/custom";
import { addProductToTheCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks";
import WithSelectInputWrapper from "../utils/withSelectInputWrapper";
import WithNumberInputWrapper from "../utils/withNumberInputWrapper";
import { formatCategoryName } from "../utils/formatCategoryName";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  
}

const SingleProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [size, setSize] = useState<string>("xs");
  const [color, setColor] = useState<string>("black");
  const [quantity, setQuantity] = useState<number>(1);

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const SelectInputUpgrade = WithSelectInputWrapper(StandardSelectInput);
  const QuantityInputUpgrade = WithNumberInputWrapper(QuantityInput);

  useEffect(() => {
    if (!id) return;

    const fetchSingle = async () => {
      try {
        const res = await customFetch.get<Product>(`/products/${id}`);
        setSingleProduct(res.data);
      } catch {
        toast.error("Product not found");
        setSingleProduct(null);
      }
    };

    const fetchAll = async () => {
      try {
        const res = await customFetch.get<Product[]>("/products");
        setProducts(res.data);
      } catch {
        toast.error("Could not load products");
      }
    };

    fetchSingle();
    fetchAll();
  }, [id]);

  const handleAddToCart = () => {
    if (!singleProduct) return;
    dispatch(
      addProductToTheCart({
        id: `${singleProduct._id}-${size}-${color}`,
        image: singleProduct.image,
        title: singleProduct.name,
        category: singleProduct.category,
        price: singleProduct.price,
        quantity,
        size,
        color,
        stock: 1,           // add dummy value
  popularity: 0  
      })
    );
    toast.success("Product added to the cart");
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-5 pt-24">
      {/* DETAIL SECTION */}
      <div className="grid grid-cols-3 gap-x-8 max-lg:grid-cols-1">
        <div className="lg:col-span-2">
          {singleProduct && (
            <img
              src={singleProduct.image}
              alt={singleProduct.name}
              className="w-full object-cover"
            />
          )}
        </div>
        <div className="w-full flex flex-col gap-5 mt-9">
          <h1 className="text-4xl">{singleProduct?.name}</h1>
          <div className="flex justify-between items-center">
            <p className="text-base text-secondaryBrown">
              {formatCategoryName(singleProduct?.category || "")}
            </p>
            <p className="text-base font-bold">${singleProduct?.price}</p>
          </div>

          <div className="flex flex-col gap-2">
            <SelectInputUpgrade
              selectList={[
                { id: "xs", value: "XS" },
                { id: "sm", value: "SM" },
                { id: "m", value: "M" },
                { id: "lg", value: "LG" },
                { id: "xl", value: "XL" },
                { id: "2xl", value: "2XL" },
              ]}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <SelectInputUpgrade
              selectList={[
                { id: "black", value: "BLACK" },
                { id: "red", value: "RED" },
                { id: "blue", value: "BLUE" },
                { id: "white", value: "WHITE" },
                { id: "rose", value: "ROSE" },
                { id: "green", value: "GREEN" },
              ]}
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <QuantityInputUpgrade
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button mode="brown" text="Add to cart" onClick={handleAddToCart} />
            <p className="text-secondaryBrown text-sm text-right">
              Delivery estimated on the Friday, July 26
            </p>
          </div>

          <Dropdown dropdownTitle="Description">
            {singleProduct?.name} — {singleProduct?.category}
          </Dropdown>
          <Dropdown dropdownTitle="Product Details">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quos
            deleniti mollitia…
          </Dropdown>
          <Dropdown dropdownTitle="Delivery Details">
            Shipping & returns within 30 days.
          </Dropdown>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      <div className="mt-24">
        <h2 className="text-5xl text-center mb-12 max-lg:text-4xl">
          Similar Products
        </h2>
        <div className="flex flex-wrap justify-between gap-y-8 mt-12">
          {products.slice(0, 3).map((p) => (
            <ProductItem
              key={p._id}
              id={p._id}
              image={p.image}
              title={p.name}
              category={p.category}
              price={p.price}
              
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
