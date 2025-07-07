type VideoCardProps = {
  title: string;
  src: string;
  thumbnail: string;
};

export default function VideoCard({ title, src, thumbnail }: VideoCardProps) {
  return (
    <div className="w-[300px] flex flex-col gap-2">
      <div className="relative w-full h-[200px] overflow-hidden rounded-xl">
        <video
          src={src}
          poster={thumbnail}
          muted
          loop
          className="object-cover w-full h-full"
          onMouseEnter={e => e.currentTarget.play()}
          onMouseLeave={e => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
}
