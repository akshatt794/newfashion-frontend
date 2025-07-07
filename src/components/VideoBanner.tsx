// src/components/VideoBanner.tsx


const VideoBanner: React.FC = () => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <video
        src="/videos/hero.mp4"        // ← this path serves from public/videos/hero.mp4
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-5xl font-bold text-center drop-shadow-lg">
        Born to Stand Out
        </h1>
      </div>
    </div>
  )
}

export default VideoBanner
