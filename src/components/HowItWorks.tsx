// src/components/HowItWorks.tsx
import { PackageSearch, ShoppingCart, Truck } from "lucide-react";

const steps = [
  { Icon: PackageSearch, title: "Browse Products", description: "Explore a curated selection of the latest fashion trends for every occasion." },
  { Icon: ShoppingCart, title: "Add to Cart", description: "Easily add your favorite styles to the cart with just a click." },
  { Icon: Truck, title: "Fast Delivery", description: "Get your orders delivered quickly and reliably to your doorstep." },
];

export default function HowItWorks() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="text-5xl text-center font-semibold mb-16">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
        {steps.map(({ Icon, title, description }, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-xl shadow">
            <div className="mb-4 text-secondaryBrown">
              <Icon size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600 text-base">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
