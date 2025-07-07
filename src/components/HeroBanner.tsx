// src/components/HeroBanner.tsx

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[85vh] min-h-[500px] bg-black">
      <img
        src="/images/hero.jpg"
        alt="Luxury Indianwear"
        className="w-full h-full object-cover brightness-90"
        loading="eager"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg">SAKSHI KHETTERPAL</h1>
        <p className="text-xl md:text-2xl mb-8 font-light tracking-wide">Timeless | Handcrafted | Luxury</p>
        <a href="/shop" className="px-8 py-3 bg-white/90 text-black font-semibold rounded-full shadow hover:bg-white transition">
          Shop Now
        </a>
      </div>
    </section>
  );
}
