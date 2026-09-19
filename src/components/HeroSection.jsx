import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Clock, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function HeroSection({ isVisible }) {
  const { couple, countdownTarget } = weddingData;

  const calculateTimeLeft = () => {
    const target = countdownTarget || "2026-11-01T06:00:00";
    const difference = +new Date(target) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [countdownTarget]);

  return (
    <section id="hero-invitation" className="relative pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center">

      <p 
        className={`text-xs sm:text-sm font-serif italic text-[#8c6d48] max-w-xl mx-auto mb-8 leading-relaxed transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '200ms' }}
      >
        "With the divine grace of the Almighty and the blessings of our beloved parents, we joyfully invite you to celebrate our new beginning."
      </p>

      {/* Main Couple Names */}
      <div 
        className={`relative my-8 transition-all duration-[1200ms] ease-out ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        <div className="absolute left-1/2 -top-6 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#5a222f] font-normal tracking-tight">
          <span className="block sm:inline hover:text-[#722b3b] transition-colors">{couple.groom.name}</span>
          <span className="font-script text-4xl sm:text-6xl md:text-7xl text-[#d4af37] mx-3 sm:mx-5 font-normal">
            &
          </span>
          <span className="block sm:inline hover:text-[#722b3b] transition-colors">{couple.bride.name}</span>
        </h1>

        <p className="mt-3 text-xs sm:text-sm font-sans uppercase tracking-[0.3em] text-[#a67c2e] font-semibold">
          Two Souls, One Heart, An Eternal Journey
        </p>
        <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
      </div>

      {/* Parents & Family Blessings */}
      <div 
        className={`mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-xs sm:text-sm font-serif text-[#664d3e] transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '800ms' }}
      >
        <div className="p-4 rounded-2xl bg-white/70 border border-[#eedfce] shadow-sm">
          <p className="font-bold text-[#722b3b] uppercase tracking-wider text-[11px] mb-1">Groom's Family</p>
          <p>{couple.groom.parents}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/70 border border-[#eedfce] shadow-sm">
          <p className="font-bold text-[#722b3b] uppercase tracking-wider text-[11px] mb-1">Bride's Family</p>
          <p>{couple.bride.parents}</p>
        </div>
      </div>

      {/* Date Banner */}
      <div 
        className={`mt-10 inline-block transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '1000ms' }}
      >
        <div className="glass-card px-8 py-4 rounded-3xl border border-[#decba5] shadow-card-soft">
          <div className="flex flex-wrap items-center justify-center gap-6 text-[#722b3b]">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#d4af37]" />
              <span className="font-serif font-bold text-base sm:text-lg">{weddingData.formattedDate}</span>
            </div>
            <div className="hidden sm:block w-[1px] h-6 bg-[#decba5]"></div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-[#d4af37]" />
              <span className="font-serif text-sm sm:text-base">Muhurtham: {weddingData.auspiciousMuhurthamTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Countdown Timer */}
      <div 
        className={`mt-12 max-w-2xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '1200ms' }}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-3.5 h-3.5 text-[#df325c] fill-current" />
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#8c3a4b] font-semibold">
            Counting Down To The Sacred Vows
          </span>
          <Heart className="w-3.5 h-3.5 text-[#df325c] fill-current" />
        </div>

        <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="glass-card p-3 sm:p-5 rounded-2xl border border-[#decba5]/80 shadow-md relative overflow-hidden group hover:border-[#b89758] transition-all"
            >
              <div className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#722b3b] group-hover:scale-105 transition-transform">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-[#a67c2e] font-semibold mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
