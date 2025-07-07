// src/pages/Landing.tsx
import React from "react";
import BannerCarousel from "../components/BannerCarousel";
import VideoBanner from "../components/VideoBanner";
import FeaturedProductsCarousel from "../components/FeaturedProductsCarousel";
import CategoryHighlights from "../components/CategoryHighlights";
import BrandMessage from "../components/BrandMessage";
import LookbookInstagramCarousel from "../components/LookbookInstagramCarousel";
import PressCelebritiesSection from "../components/PressCelebritiesSection";
import NewsletterSignup from "../components/NewsletterSignup";

export default function Landing() {
  return (
    <main className="bg-white">
      {/* 1. Premium Banner Carousel (supports image & video) */}
      <BannerCarousel />

      {/* SPACER */}
      <div className="h-8 md:h-12"></div>

      {/* 2. Video Banner Section */}
      <VideoBanner />

      {/* SPACER */}
      <div className="h-12"></div>

      {/* 3. Featured / New Arrivals Carousel */}
      <FeaturedProductsCarousel />

      {/* 4. Category Highlights */}
      <CategoryHighlights />

      {/* 5. Designer / Brand Message Section */}
      <BrandMessage />

      {/* 6. Instagram / Lookbook Horizontal Carousel */}
      <LookbookInstagramCarousel />

      {/* 7. Celebrities / Press Feature Section */}
      <PressCelebritiesSection />

      {/* 8. Newsletter Signup */}
      <NewsletterSignup />
    </main>
  );
}
