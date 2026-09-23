import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function StoryCarousel() {
  const { t } = useTranslation();
  const { storyCards } = weddingData;
  const totalSlides = storyCards.length * 2;
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);

  // Preload images
  useEffect(() => {
    storyCards.forEach(card => {
      const img1 = new Image(); img1.src = card.groomImage;
      const img2 = new Image(); img2.src = card.brideImage;
    });
  }, [storyCards]);

  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const currentCardIndex = Math.floor(currentIndex / 2);
  const isBrideSlide = currentIndex % 2 !== 0;
  const currentCard = storyCards[currentCardIndex];

  return (
    <section className="relative py-16 px-4 max-w-md mx-auto text-center">
      <style>
        {`
          @keyframes storyTransition {
            0% { opacity: 0.6; filter: blur(2px); }
            100% { opacity: 1; filter: blur(0px); }
          }
          .animate-story {
            animation: storyTransition 0.3s ease-out forwards;
          }
        `}
      </style>

      {/* Header */}
      <div className="mb-8">
        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#a67c2e] block mb-1">
          {t('story.sectionHeader')}
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#722b3b] font-normal">
          {t('story.sectionTitle')}
        </h2>
        <p className="text-xs font-serif italic text-[#8c6d48] max-w-xs mx-auto mt-2 leading-relaxed">
          {t('story.sectionDesc')}
        </p>
      </div>

      <div className="flex justify-between items-center mb-3 px-2 animate-story" key={`title-${currentCardIndex}`}>
        <h3 className="text-lg font-serif font-semibold text-[#722b3b]">
          {t(`story.cards.${currentCard.id}.title`)}
        </h3>
        <Heart className="w-4 h-4 text-[#df325c] fill-[#df325c]" />
      </div>

      {/* Main Interactive Container */}
      <div 
        className="relative mb-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full aspect-[3/4] group select-none">
          
          {/* 1. Instagram-style Progress Bars (8 total) */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-1.5 z-30 pointer-events-none drop-shadow-md">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <div
                key={idx}
                className="flex-1 h-1.5 rounded-full bg-white/30 overflow-hidden"
              >
                <div 
                  className={`h-full bg-white transition-all duration-300 ${
                    idx === currentIndex ? 'w-full' : idx < currentIndex ? 'w-full' : 'w-0'
                  }`} 
                />
              </div>
            ))}
          </div>

          {/* 2. Tap-to-Navigate Zones */}
          <div 
            className="absolute top-0 left-0 w-[40%] h-full z-20 cursor-pointer"
            onClick={prevSlide}
            aria-label="Previous Slide"
          />
          <div 
            className="absolute top-0 right-0 w-[40%] h-full z-20 cursor-pointer"
            onClick={nextSlide}
            aria-label="Next Slide"
          />

          {/* The Slide Element */}
          <div className="w-full h-full relative shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden bg-white border border-[#eedfce] flex flex-col animate-story" key={`slide-${currentIndex}`}>
             <div className="relative h-[65%] bg-[#fcedee] overflow-hidden flex items-center justify-center">
               <img 
                 src={isBrideSlide ? currentCard.brideImage : currentCard.groomImage} 
                 alt="Story view"
                 className="w-full h-full object-contain p-2 transition-transform duration-700 hover:scale-105"
                 draggable="false"
               />
               <div className="absolute top-10 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm text-white border border-white/20 z-10">
                 <span className="text-[10px] font-bold uppercase tracking-wider">
                   {isBrideSlide ? "Amsa Said..." : "Sudarsan Said..."}
                 </span>
               </div>
             </div>
             
             <div className="p-5 flex flex-col flex-1 justify-center text-center bg-white relative">
               <p className="text-sm sm:text-base font-serif text-[#722b3b] font-medium italic leading-relaxed">
                 "{t(`story.cards.${currentCard.id}.${isBrideSlide ? 'back' : 'front'}`)}"
               </p>
             </div>
          </div>
          
        </div>
      </div>

    </section>
  );
}
