import React, { useState } from "react";
import SmartVideo from "./SmartVideo";

interface VideoHeroProps {
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  imageFallback?: string;
  children?: React.ReactNode;
  height?: string;
}

const VideoHero: React.FC<VideoHeroProps> = ({
  title,
  subtitle,
  videoUrl,
  imageFallback,
  children,
  height = "h-screen",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isVimeo = videoUrl?.includes("vimeo.com");
  const vimeoId = isVimeo ? videoUrl?.split("/").pop()?.split("?")[0] : null;

  return (
    <section
      className={`relative ${height} w-full overflow-hidden pt-12 md:pt-16 mb-0`}
    >
      {/* Always show blurred background if imageFallback exists */}
      {imageFallback && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center blur-md scale-105 transition-all duration-500 z-0"
          style={{ backgroundImage: `url(${imageFallback})` }}
        />
      )}

      {/* Overlay video (priority) */}
      {isVimeo && vimeoId ? (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1&quality=auto&responsive=1`}
          className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          style={{ aspectRatio: '16/9' }}
        ></iframe>
      ) : videoUrl ? (
        <SmartVideo
          src={videoUrl}
          poster={imageFallback}
          className="absolute inset-0 w-full h-full z-10"
        />
      ) : null}

      {/* If no videoUrl and imageFallback, no blank section - already handled above. */}
    </section>
  );
};

export default VideoHero;
