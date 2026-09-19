import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Flower2, Flame, Sun, Award } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function InteractiveBlessings() {
  const { couple } = weddingData;
  const [counts, setCounts] = useState({
    petals: 342,
    diyas: 189,
    hearts: 520,
    mangalam: 215
  });

  const [activeBlessing, setActiveBlessing] = useState(null);

  const triggerShower = (type) => {
    setActiveBlessing(type);
    setTimeout(() => setActiveBlessing(null), 2500);

    setCounts(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));

    if (type === 'petals') {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#f4aab7', '#fed5dd', '#d4af37', '#fff5f7']
      });
    } else if (type === 'hearts') {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#df325c', '#fa839d', '#b05c6d']
      });
    } else if (type === 'diyas') {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#d4af37', '#f3e5ab', '#ff9f43', '#ffeaa7']
      });
    } else if (type === 'mangalam') {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#d4af37', '#722b3b', '#2ed573', '#fffa65']
      });
    }
  };


  return (
    <section id="blessings-section" className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fcedee] border border-[#f4aab7] text-xs font-serif tracking-widest text-[#b05c6d] uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#df325c]" />
          <span>Shower of Blessings</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#5a222f] font-normal tracking-tight">
          Bestow Your Blessings
        </h2>
        <p className="mt-3 text-xs sm:text-sm font-serif italic text-[#8c6d48] max-w-md mx-auto leading-relaxed">
          Tap the sacred blessing buttons below to shower {couple.groom.name} & {couple.bride.name} with love, flowers, and divine grace.
        </p>
      </div>

      {/* Interactive Blessing Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12">
        
        {/* 1. Flower Petals Shower */}
        <button
          onClick={() => triggerShower('petals')}
          className="glass-card rounded-3xl p-5 sm:p-6 border border-[#f4aab7]/80 shadow-card-soft hover:shadow-glow-rose hover:-translate-y-1 active:scale-95 transition-all flex flex-col items-center justify-between group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#fff0f3] border border-[#f4aab7] flex items-center justify-center text-[#df325c] mb-3 group-hover:scale-110 transition-transform">
            <Flower2 className="w-7 h-7 animate-pulse" />
          </div>
          <span className="text-xs font-serif font-bold text-[#722b3b] mb-1">
            Shower Petals
          </span>
          <span className="text-[10px] font-sans font-medium text-[#8c6d48] uppercase tracking-wider">
            🌸 {counts.petals} Showered
          </span>
        </button>

        {/* 2. Light Auspicious Diya */}
        <button
          onClick={() => triggerShower('diyas')}
          className="glass-card rounded-3xl p-5 sm:p-6 border border-[#decba5] shadow-card-soft hover:shadow-glow-gold hover:-translate-y-1 active:scale-95 transition-all flex flex-col items-center justify-between group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#fdfaf3] border border-[#decba5] flex items-center justify-center text-[#d4af37] mb-3 group-hover:scale-110 transition-transform">
            <Flame className="w-7 h-7 animate-bounce" />
          </div>
          <span className="text-xs font-serif font-bold text-[#722b3b] mb-1">
            Light a Diya
          </span>
          <span className="text-[10px] font-sans font-medium text-[#8c6d48] uppercase tracking-wider">
            🪔 {counts.diyas} Diyas Lit
          </span>
        </button>

        {/* 3. Send Love & Heart */}
        <button
          onClick={() => triggerShower('hearts')}
          className="glass-card rounded-3xl p-5 sm:p-6 border border-[#f4aab7]/80 shadow-card-soft hover:shadow-glow-rose hover:-translate-y-1 active:scale-95 transition-all flex flex-col items-center justify-between group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#fff0f3] border border-[#f4aab7] flex items-center justify-center text-[#df325c] mb-3 group-hover:scale-110 transition-transform">
            <Heart className="w-7 h-7 fill-current animate-pulse" />
          </div>
          <span className="text-xs font-serif font-bold text-[#722b3b] mb-1">
            Send Love
          </span>
          <span className="text-[10px] font-sans font-medium text-[#8c6d48] uppercase tracking-wider">
            💖 {counts.hearts} Hearts
          </span>
        </button>

        {/* 4. Mangala Vazhthu */}
        <button
          onClick={() => triggerShower('mangalam')}
          className="glass-card rounded-3xl p-5 sm:p-6 border border-[#decba5] shadow-card-soft hover:shadow-glow-gold hover:-translate-y-1 active:scale-95 transition-all flex flex-col items-center justify-between group"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#fdfaf3] border border-[#decba5] flex items-center justify-center text-[#a67c2e] mb-3 group-hover:scale-110 transition-transform">
            <Sun className="w-7 h-7 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <span className="text-xs font-serif font-bold text-[#722b3b] mb-1">
            Mangala Vazhthu
          </span>
          <span className="text-[10px] font-sans font-medium text-[#8c6d48] uppercase tracking-wider">
            ✨ {counts.mangalam} Blessings
          </span>
        </button>

      </div>

      {/* Floating blessing toast when tapped */}
      {activeBlessing && (
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/95 border border-[#d4af37] shadow-lg text-xs font-serif font-bold text-[#722b3b] animate-fadeIn mb-8">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span>✨ Divine blessings bestowed upon {couple.groom.name} & {couple.bride.name}! ✨</span>
        </div>
      )}


    </section>
  );
}
