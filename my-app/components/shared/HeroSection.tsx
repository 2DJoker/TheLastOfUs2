'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const HeroSection = () => {
  const backgrounds = [
    '122212.jpg',
    '122234.png',
    '388228.png'
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  
  const initVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      
      videoRef.current.play()
        .then(() => setIsVideoPlaying(true))
        .catch(error => {
          console.log('Autoplay failed, will use manual play:', error);
        });
    }
  };

  useEffect(() => {
    const preloadImages = async () => {
      const promises = backgrounds.map((bg) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = `/${bg}`;
          img.onload = () => resolve();
          img.onerror = () => resolve(); 
        });
      });

      await Promise.all(promises);
      setImagesLoaded(true);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
        setIsFading(false);
      }, 1000); 
    }, 6500); 

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  useEffect(() => {
    initVideo();
  }, []);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsVideoPlaying(true))
          .catch(error => console.error('Play failed:', error));
      }
    }
  };

  if (!imagesLoaded) {
    return <div className="fixed inset-0 bg-black" />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="fixed inset-0 -z-20 transition-all duration-1000"
        style={{
          backgroundImage: `url('/${backgrounds[currentBgIndex]}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-1000 -z-30 pointer-events-none ${
          isFading ? 'opacity-80' : 'opacity-0'
        }`}
      />

      <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center px-6 md:px-12 lg:px-20 min-h-screen pt-40 gap-10">
      <div className="relative flex flex-col items-start p-8 bg-opacity-10 rounded-xl border-opacity-20 max-w-md">
  <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-9">ABOUT THE GAME</h2>
  <div className="space-y-4">
    <p className="text-white text-sm drop-shadow-md leading-tight tracking-tight">
      The Last of Us Part II is an action-adventure game played from a third-person perspective
    </p>
    <p className="text-white text-sm drop-shadow-md leading-tight tracking-tight">
      featuring elements of the survival horror genre. The player traverses post-apocalyptic
    </p>
    <p className="text-white text-sm drop-shadow-md leading-tight tracking-tight">
      environments such as buildings and forests to advance the story.
    </p>
  </div>
  <button className="mt-8 bg-red-800 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 transform hover:scale-105 w-full">
    Начать игру
  </button>
  <div className="flex gap-4 mt-9"> 
  <Facebook className="w-10 h-10 invert" />
  <Twitter className="w-10 h-10 invert" />
  <Instagram className="w-10 h-10 invert"/>
  <img src="/77733.png" alt="logo" className='w-50'/>
</div>
</div>

        <div className="flex flex-col items-start text-white space-y-10 max-w-sm w-full">
          <div>
            <h3 className="text-3xl font-bold drop-shadow-lg mb-6">AWARDS</h3> 
            <ul className="text-sm space-y-2 drop-shadow-md pl-5 list-disc">
              <li>PlayStation Blog – Most Anticipated Game</li>
              <li>Golden Joystick Awards – Most Wanted Game</li>    
              <li>The Game Awards – Most Anticipated Game</li>
              <li>Game Critics Awards – Special Commendation for Graphics</li>
              <li>Game Critics Awards – Special Commendation for Sound</li>
            </ul>
          </div>

          <div>
            <div className="relative w-[360px] aspect-video rounded-lg overflow-hidden shadow-lg">
              <video
                ref={videoRef}
                src="https://gmedia.playstation.com/is/content/SIEPDC/global_pdc/en/games/pdps/l/la/the-last-of-us-part-ii/videos/the-last-of-us-part-ii-live-video-block-01-ps4-us-23sep19.mp4"
                controls
                playsInline
                className="w-full h-full object-cover"
                poster="/1244875.jpg" 
              />
              {!isVideoPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer"
                  onClick={toggleVideoPlay}
                >
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 4l10 6-10 6V4z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;