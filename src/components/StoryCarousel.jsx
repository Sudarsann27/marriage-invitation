import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function StoryCarousel() {
  const { storySlides } = weddingData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % storySlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + storySlides.length) % storySlides.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide(); // Swiped left -> next
    } else if (diff < -50) {
      prevSlide(); // Swiped right -> prev
    }
    touchStartX.current = null;
  };

  const currentSlide = storySlides[currentIndex];

  return (
    <section className="relative py-16 px-4 max-w-md mx-auto text-center">
      
      {/* Header */}
      <div className="mb-8">
        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#a67c2e] block mb-1">
          Our Story
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#722b3b] font-normal">
          Our Little Story
        </h2>
        <p className="text-xs font-serif italic text-[#8c6d48] max-w-xs mx-auto mt-2 leading-relaxed">
          Two hearts, two families, one beautiful beginning — and a new chapter waiting to unfold.
        </p>
      </div>

      {/* Main Story Card Carousel */}
      <div 
        className="relative bg-white/90 rounded-3xl p-4 shadow-sm border border-[#eedfce] cursor-pointer select-none transition-all"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={nextSlide}
      >
        {/* Story Illustration Frame */}
        <div className="relative aspect-[4/4.5] rounded-2xl overflow-hidden shadow-inner mb-4 bg-[#fcedee]">
          <img 
            src={currentSlide.image} 
            alt={currentSlide.caption}
            className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
          />
        </div>

        {/* Caption */}
        <div className="py-2 px-1">
          <h3 className="text-base font-serif font-medium text-[#722b3b] mb-1">
            {currentSlide.caption}
          </h3>
          <p className="text-xs font-serif italic text-[#8c6d48]">
            {currentSlide.detail}
          </p>
        </div>
      </div>

      {/* Interactive Bottom Control Pill */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          className="w-8 h-8 rounded-full bg-white border border-[#eedfce] flex items-center justify-center text-[#722b3b] shadow-sm hover:border-[#b89758] transition-all"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="px-4 py-1.5 rounded-full bg-white border border-[#eedfce] text-[10px] font-sans font-semibold tracking-wider text-[#a67c2e] uppercase shadow-sm">
          <span>0{currentIndex + 1} / 0{storySlides.length}</span>
          <span className="mx-2">•</span>
          <span className="text-[#722b3b]">SWIPE OR TAP TO CONTINUE</span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          className="w-8 h-8 rounded-full bg-white border border-[#eedfce] flex items-center justify-center text-[#722b3b] shadow-sm hover:border-[#b89758] transition-all"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
}
