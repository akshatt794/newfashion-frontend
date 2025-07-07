export interface Clip {
    title: string;
    src: string;
    thumbnail: string;
  }
  
  const clips: Clip[] = [
    {
      title: "Summer Lookbook",
      src: "/videos/clip1.mp4",
      thumbnail: "/videos/thumb1.jpg",
    },
    {
      title: "Behind the Scenes",
      src: "/videos/clip2.mp4",
      thumbnail: "/videos/thumb2.jpg",
    },
    {
      title: "New Arrivals Sneak Peek",
      src: "/videos/clip3.mp4",
      thumbnail: "/videos/thumb3.jpg",
    },
  ];
  
  export default clips;
  