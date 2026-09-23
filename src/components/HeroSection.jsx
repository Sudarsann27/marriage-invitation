import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Heart, Clock, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function HeroSection({ isVisible }) {
  const { t } = useTranslation();
  const { countdownTarget } = weddingData;

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
        {t('hero.inviteText')}
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
          <span className="block sm:inline hover:text-[#722b3b] transition-colors">{t('couple.groomName')}</span>
          <span className="font-script text-4xl sm:text-6xl md:text-7xl text-[#d4af37] mx-3 sm:mx-5 font-normal">
            &
          </span>
          <span className="block sm:inline hover:text-[#722b3b] transition-colors">{t('couple.brideName')}</span>
        </h1>

        <p className="mt-3 text-xs sm:text-sm font-sans uppercase tracking-[0.3em] text-[#a67c2e] font-semibold">
          {t('hero.tagline')}
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
          <p className="font-bold text-[#722b3b] uppercase tracking-wider text-[11px] mb-1">{t('hero.groomsFamily')}</p>
          <p>{t('couple.groomParents')}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/70 border border-[#eedfce] shadow-sm">
          <p className="font-bold text-[#722b3b] uppercase tracking-wider text-[11px] mb-1">{t('hero.bridesFamily')}</p>
          <p>{t('couple.brideParents')}</p>
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
              <span className="font-serif font-bold text-base sm:text-lg">{t('common.formattedDate')}</span>
            </div>
            <div className="hidden sm:block w-[1px] h-6 bg-[#decba5]"></div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-[#d4af37]" />
              <span className="font-serif text-sm sm:text-base">{t('hero.muhurtham')}: {t('common.auspiciousMuhurthamTime')}</span>
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
          <Heart className="w-3.5 h-3.5 text-[#df325c] fill-current animate-pulse" />
          <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#8c3a4b] font-semibold">
            {t('hero.countdownText')}
          </span>
          <Heart className="w-3.5 h-3.5 text-[#df325c] fill-current animate-pulse" />
        </div>

        <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
          {[
            { label: t('hero.days'), value: timeLeft.days },
            { label: t('hero.hours'), value: timeLeft.hours },
            { label: t('hero.minutes'), value: timeLeft.minutes },
            { label: t('hero.seconds'), value: timeLeft.seconds }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-gradient-to-b from-[#fff0f3] to-[#ffe5ea] p-3 sm:p-5 rounded-2xl border-2 border-[#f4aab7]/80 shadow-card-soft hover:shadow-glow-rose relative overflow-hidden group hover:border-[#df325c]/50 transition-all"
            >
              <div className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#b02a48] group-hover:scale-105 transition-transform">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-[#a67c2e] font-bold mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
