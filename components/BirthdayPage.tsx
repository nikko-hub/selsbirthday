
import React, { useEffect, useState } from 'react';
import { generateBirthdayMessage } from '../services/geminiService';
import { BirthdayWish } from '../types';
import ConfettiEffect from './ConfettiEffect';
import MusicPlayer from './MusicPlayer';
import BackgroundPhotos from './BackgroundPhotos';

const BirthdayPage: React.FC = () => {
  const [wish, setWish] = useState<BirthdayWish | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchWish = async () => {
      const result = await generateBirthdayMessage();
      setWish(result);
      setLoading(false);
      setTimeout(() => setIsVisible(true), 100);
    };
    fetchWish();
  }, []);

  return (
    <div className="min-h-screen bg-rose-50 relative overflow-hidden flex flex-col items-center justify-center py-12 px-4">
      <BackgroundPhotos />
      <ConfettiEffect />
      <MusicPlayer />
      
      {/* Decorative Floating Elements */}
      <div className="absolute top-10 left-10 text-rose-300 text-6xl opacity-30 float z-10">
        <i className="fa-solid fa-cake-candles"></i>
      </div>
      <div className="absolute bottom-10 right-10 text-rose-300 text-6xl opacity-30 float z-10" style={{ animationDelay: '1.5s' }}>
        <i className="fa-solid fa-gift"></i>
      </div>

      <div className={`max-w-3xl w-full text-center transition-all duration-1000 transform z-20 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        {/* Animated Main Greeting */}
        <h1 className="font-cursive text-6xl md:text-8xl mb-6 drop-shadow-lg animate-gradient">
          Happy Birthday, Sel!
        </h1>
        
        <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-10 rounded-full"></div>

        <div className="bg-white/95 backdrop-blur-xl p-8 md:p-14 rounded-[4rem] shadow-[0_20px_50px_rgba(251,113,133,0.15)] border border-white/60 relative group transition-shadow hover:shadow-[0_20px_60px_rgba(251,113,133,0.25)]">
          <i className="fa-solid fa-quote-left absolute top-10 left-10 text-rose-100 text-7xl -z-10 group-hover:text-rose-200 transition-colors"></i>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-6 py-16">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-rose-100 border-t-rose-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fa-solid fa-heart text-rose-300 text-xs animate-pulse"></i>
                </div>
              </div>
              <p className="text-rose-400 font-medium italic tracking-wide">Composing something beautiful for you...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Staggered Content Reveal */}
              <h2 className="text-3xl font-serif text-gray-800 italic animate-fade-up opacity-0 delay-1">
                {wish?.title}
              </h2>
              
              {/* Message Body with at least 65% opacity (set to 75% for aesthetic balance) */}
              <div className="text-xl md:text-2xl text-gray-800/75 leading-relaxed font-light whitespace-pre-wrap italic animate-fade-up opacity-0 delay-2">
                {wish?.poem}
              </div>
              
              <div className="pt-8 border-t border-rose-50 inline-block animate-fade-up opacity-0 delay-3">
                <p className="font-cursive text-3xl text-rose-500 hover:scale-110 transition-transform cursor-default">
                  {wish?.closing}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Decorative Icons with hover effects */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {[
            { icon: 'fa-champagne-glasses', label: 'Cheers', delay: '0s' },
            { icon: 'fa-music', label: 'Harmony', delay: '0.1s' },
            { icon: 'fa-star', label: 'Magic', delay: '0.2s' }
          ].map((item, idx) => (
            <div key={idx} className="group flex flex-col items-center" style={{ animation: `fadeInUp 0.8s ease-out ${0.8 + idx * 0.1}s forwards`, opacity: 0 }}>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all mb-3 border border-rose-50">
                <i className={`fa-solid ${item.icon} text-2xl`}></i>
              </div>
              <span className="text-[10px] text-rose-400 font-bold uppercase tracking-[0.2em]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BirthdayPage;
