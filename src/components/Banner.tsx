import { useEffect, useState } from "react";

// Use your deployed backend URL here, or use an ENV variable.
const API_BASE = "https://newfashion-backend.onrender.com";

type BannerType = {
  _id: string;
  image?: string;
  video?: string;
  title?: string;
  link?: string;
};

const Banner = () => {
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/banners`)
      .then((res) => res.json())
      .then((data) => setBanners(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-24">Loading banners...</div>;
  if (banners.length === 0) return <div className="text-center py-24">No banners available.</div>;

  return (
    <div className="banner w-full flex flex-col justify-end items-center max-sm:h-[550px] max-sm:gap-2">
      {banners.map((banner) => (
        <div key={banner._id} className="w-full flex flex-col items-center mb-6">
          {/* Render video if available, otherwise image */}
          {banner.video ? (
            <video
              className="w-full h-[450px] object-cover rounded-xl mb-4"
              src={`${API_BASE}${banner.video}`}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              poster={banner.image ? `${API_BASE}${banner.image}` : undefined}
            />
          ) : banner.image ? (
            <img
              className="w-full h-[450px] object-cover rounded-xl mb-4"
              src={`${API_BASE}${banner.image}`}
              alt={banner.title || "Banner"}
            />
          ) : null}
          {/* Optional: Banner title and link */}
          {banner.title && (
            <h2 className="text-white text-center text-6xl font-bold tracking-[1.86px] leading-[60px] max-sm:text-4xl max-[400px]:text-3xl">
              {banner.title}
            </h2>
          )}
          {banner.link && (
            <a
              href={banner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline text-lg"
            >
              Learn More
            </a>
          )}
        </div>
      ))}
      {/* You can keep your Shop Now/See Collection links below banners */}
      <div className="flex justify-center items-center gap-3 pb-10 max-[400px]:flex-col max-[400px]:gap-1 w-[420px] max-sm:w-[350px] max-[400px]:w-[300px]">
        <a href="/shop" className="bg-white text-black text-center text-xl border border-[rgba(0, 0, 0, 0.40)] font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center">
          Shop Now
        </a>
        <a href="/shop" className="text-white border-white border-2 text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center">
          See Collection
        </a>
      </div>
    </div>
  );
};

export default Banner;
