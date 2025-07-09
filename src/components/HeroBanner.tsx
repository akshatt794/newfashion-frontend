// src/components/HeroBanner.tsx
import { useEffect, useState } from "react";
import axios from "axios";

type Banner = {
  _id: string;
  image?: string;
  video?: string;
  title?: string;
  link?: string;
};

export default function HeroBanner() {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://newfashion-backend.onrender.com/api/banners")
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          // Show the first banner (or use res.data[res.data.length-1] for the latest)
          setBanner(res.data[0]);
        } else {
          setBanner(null);
        }
      })
      .catch(() => setBanner(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <section className="w-full h-[85vh] flex items-center justify-center bg-black"><span className="text-white text-2xl">Loading banner...</span></section>;

  if (!banner) {
    return (
      <section className="relative w-full h-[85vh] min-h-[500px] bg-black flex items-center justify-center">
        <span className="text-white text-xl">No banners available.</span>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[85vh] min-h-[500px] bg-black">
      {/* VIDEO Banner */}
      {banner.video ? (
        <video
          src={`https://newfashion-backend.onrender.com${banner.video}`}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover brightness-90"
          style={{ minHeight: "500px" }}
        />
      ) : (
        /* IMAGE Banner */
        <img
          src={`https://newfashion-backend.onrender.com${banner.image}`}
          alt={banner.title || "Banner"}
          className="w-full h-full object-cover brightness-90"
          loading="eager"
          style={{ minHeight: "500px" }}
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg">
          {banner.title || "SAKSHI KHETTERPAL"}
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light tracking-wide">
          Timeless | Handcrafted | Luxury
        </p>
        <a
          href={banner.link || "/shop"}
          className="px-8 py-3 bg-white/90 text-black font-semibold rounded-full shadow hover:bg-white transition"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
}
