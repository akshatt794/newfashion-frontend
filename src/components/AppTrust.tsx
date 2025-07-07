// src/components/AppTrust.tsx
import React from "react";
import { ShieldCheck, Award, Star } from "lucide-react";

const trustItems = [
  { Icon: ShieldCheck, label: "Secure Payments" },
  { Icon: Star, label: "4.8/5 Rated" },
  { Icon: Award, label: "Quality Guaranteed" },
];

export default function AppTrust() {
  return (
    <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-12">
      {trustItems.map(({ Icon, label }, idx) => (
        <div key={idx} className="flex flex-col items-center text-center">
          {/* Icon is a React component */}
          <Icon size={30} className="text-secondaryBrown mb-2" />
          <p className="font-medium text-lg">{label}</p>
        </div>
      ))}
    </div>
  );
}
