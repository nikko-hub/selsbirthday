
import React, { useState, useEffect } from 'react';

interface PhotoInstance {
  id: number;
  url: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  depth: number; // Factor for parallax speed
  focalPoint: number; // The scroll position where this photo is most "in focus"
}

const PHOTO_URLS = [
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80", // Cake
  "https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=400&q=80", // Balloons
  "https://raw.githubusercontent.com/npnicdao-psu/twicehappyhappy/refs/heads/main/images.jpg", // Flowers
  "https://raw.githubusercontent.com/npnicdao-psu/twicehappyhappy/refs/heads/main/MV5BODAzOGI4ZDYtZmEzMS00MGY4LWJhNzYtYWUxNzcwMTYzMjFkXkEyXkFqcGc%40._V1_.jpg", // Sparkles
  "https://raw.githubusercontent.com/npnicdao-psu/twicehappyhappy/refs/heads/main/30091ba2f18b0a2eca78716300013799.jpg", // Gift
  "https://raw.githubusercontent.com/npnicdao-psu/twicehappyhappy/refs/heads/main/1b0e73c1305027599a18f2eb3f904620.jpg", // Party
  "https://raw.githubusercontent.com/npnicdao-psu/twicehappyhappy/refs/heads/main/1724303445258BINI%20AIAH.avif",  // Confetti
  "https://raw.githubusercontent.com/npnicdao-psu/twicehappyhappy/refs/heads/main/maxresdefault.jpg",
  "https://raw.githubusercontent.com/npnicdao-psu/twicehappyhappy/refs/heads/main/profil-lengkah-dahyun-twice-yang-ja-2-83e5d.webp"
];

const BackgroundPhotos: React.FC = () => {
  const [activePhotos, setActivePhotos] = useState<PhotoInstance[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother scroll tracking
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const addPhoto = () => {
      const id = Date.now();
      const newPhoto: PhotoInstance = {
        id,
        url: PHOTO_URLS[Math.floor(Math.random() * PHOTO_URLS.length)],
        x: 5 + Math.random() * 90,
        y: 10 + Math.random() * 80,
        rotation: Math.random() * 30 - 15,
        scale: 0.6 + Math.random() * 0.5,
        depth: 0.08 + Math.random() * 0.2, // Pronounced parallax range
        focalPoint: Math.random() * 1000, // Random scroll depth focal point
      };

      setActivePhotos((prev) => [...prev.slice(-14), newPhoto]); // Keep more photos for richer crossfading

      // Remove after 20 seconds to keep performance high and content fresh
      setTimeout(() => {
        setActivePhotos((prev) => prev.filter((p) => p.id !== id));
      }, 20000);
    };

    // Initial population burst
    for (let i = 0; i < 8; i++) {
      setTimeout(addPhoto, i * 400);
    }

    const interval = setInterval(addPhoto, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent">
      {activePhotos.map((photo) => {
        const parallaxOffset = scrollY * photo.depth;
        
        // Calculate a "distance" from the photo's focal scroll position
        // This creates a crossfade effect as the user scrolls.
        const scrollDistance = Math.abs(scrollY - photo.focalPoint);
        const fadeRange = 600; // The distance over which the photo fades in/out
        
        // Calculate opacity based on scroll distance (peak visibility at focalPoint)
        const scrollOpacity = Math.max(0, 1 - (scrollDistance / fadeRange));
        
        // Calculate blur effect for depth of field feel
        const blurAmount = Math.max(0, (scrollDistance / fadeRange) * 8);

        return (
          <div
            key={photo.id}
            className="absolute transition-all duration-700 ease-out will-change-transform"
            style={{
              left: `${photo.x}%`,
              top: `${photo.y}%`,
              transform: `translate(-50%, calc(-50% - ${parallaxOffset}px)) rotate(${photo.rotation}deg) scale(${photo.scale})`,
              zIndex: Math.floor(photo.depth * 100),
              opacity: scrollOpacity * 0.7, // Subtle base opacity
              filter: `blur(${blurAmount}px)`,
            }}
          >
            <div className="bg-white p-2 pb-10 shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-white/80 animate-pop-in backdrop-blur-sm">
              <div 
                className="w-36 h-36 md:w-56 md:h-56 bg-gray-50 overflow-hidden"
                style={{
                  backgroundImage: `url(${photo.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="mt-4 flex flex-col items-center gap-1">
                <div className="h-1 w-16 bg-rose-100/50 rounded-full"></div>
                <div className="h-1 w-8 bg-rose-50/30 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      })}
      <style>{`
        @keyframes pop-in {
          0% { transform: scale(0.8) rotate(-10deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default BackgroundPhotos;
