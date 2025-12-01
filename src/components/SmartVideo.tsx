import React, { useEffect, useRef, useState } from "react";

interface SmartVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  className?: string;
}

const SmartVideo: React.FC<SmartVideoProps> = ({ src, poster, className = "", ...props }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    function onCanPlay() {
      setIsReady(true);
      v.muted = true;
      v.play().catch(() => {});
    }

    v.addEventListener("canplaythrough", onCanPlay);
    v.addEventListener("canplay", onCanPlay);

    return () => {
      v.removeEventListener("canplaythrough", onCanPlay);
      v.removeEventListener("canplay", onCanPlay);
    };
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      {!isReady && (
        <img src={poster} alt="hero poster" className="w-full h-full object-cover" />
      )}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="auto"
        playsInline
        muted
        loop
        style={{ display: isReady ? "block" : "none" }}
        {...props}
      />
    </div>
  );
};

export default SmartVideo;


