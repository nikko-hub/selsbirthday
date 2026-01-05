
import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Using the raw GitHub link so the audio file can be fetched directly by the browser
  const audioUrl = "https://raw.githubusercontent.com/npnicdao-psu/twicehappyhappy/main/twicehappy.mp3"; 

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.warn("Autoplay might be blocked by browser. Click the play button manually.", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      // Many browsers block autoplay unless the user has interacted.
      // Since this is mounted after the login 'Unlock' click, it is more likely to work.
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-rose-100 transition-all hover:scale-105 group">
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        loop 
        preload="auto"
      />
      
      <button 
        onClick={togglePlay}
        className="w-12 h-12 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center transition-all shadow-md active:scale-95"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} ${!isPlaying ? 'ml-1' : ''}`}></i>
      </button>

      <div className="flex flex-col items-start pr-4 overflow-hidden w-0 group-hover:w-32 transition-all duration-500 ease-in-out">
        <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider mb-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
          Twice - Happy Happy ♫
        </span>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={handleVolumeChange}
          className="w-full h-1 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>

      <div className="flex items-center text-rose-300 px-2 group-hover:hidden">
        <i className={`fa-solid ${volume === 0 ? 'fa-volume-xmark' : volume < 0.5 ? 'fa-volume-low' : 'fa-volume-high'} ${isPlaying ? 'animate-pulse' : ''}`}></i>
      </div>
    </div>
  );
};

export default MusicPlayer;
