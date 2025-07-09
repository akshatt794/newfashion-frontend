// src/components/HomeBanner.tsx


export default function HomeBanner() {
  return (
    <section className="w-full mb-10">
      {/* Static Video Banner */}
      <div className="w-full h-[400px] mb-5 relative overflow-hidden rounded-xl shadow">
        <video
          className="object-cover w-full h-full"
          autoPlay
          loop
          muted
          poster="/banner-placeholder.jpg" // fallback image if video doesn't load
        >
          <source src="/sample-banner-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Optional: Add overlay text */}
        <div className="absolute bottom-5 left-5 text-white text-3xl font-bold shadow-lg">
          Welcome to NewFashion!
        </div>
      </div>

      {/* Static Image Banner */}
      <div className="w-full h-[300px] rounded-xl overflow-hidden shadow">
        <img
          src="/banner-placeholder.jpg"
          alt="Shop Banner"
          className="object-cover w-full h-full"
        />
      </div>
    </section>
  );
}
