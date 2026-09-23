import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, ArrowUp } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Footer() {
  const { t } = useTranslation();
  const { couple } = weddingData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#2d191e] text-[#eedfce] pt-16 pb-12 px-4 sm:px-6 border-t border-[#d4af37]/30 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.15)_0%,_transparent_70%)] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto text-center">
        
        {/* Monogram Seal Emblem */}
        <div className="w-16 h-16 rounded-full mx-auto mb-6 bg-gradient-to-br from-[#d4af37] via-[#f3e5ab] to-[#8a651a] p-[2px] shadow-glow-gold flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#2d191e] flex items-center justify-center">
            <span className="font-serif font-bold text-lg text-[#ffeaa7] tracking-wider">
              {couple.monogram}
            </span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium mb-2">
          {t('couple.groomName')} <span className="font-script text-3xl sm:text-4xl text-[#d4af37] mx-1">&</span> {t('couple.brideName')}
        </h3>


        {/* Navigation links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-serif tracking-wider uppercase text-[#decba5] mb-10">
          <a href="#hero-invitation" className="hover:text-white transition-colors">{t('footer.nav.wedding')}</a>
          <span>•</span>
          <a href="#story-section" className="hover:text-white transition-colors">{t('footer.nav.story')}</a>
          <span>•</span>
          <a href="#events-schedule" className="hover:text-white transition-colors">{t('footer.nav.ceremonies')}</a>
          <span>•</span>
          <a href="#venue-location" className="hover:text-white transition-colors">{t('footer.nav.location')}</a>
          <span>•</span>
          <a href="#guestbook" className="hover:text-white transition-colors">{t('footer.nav.blessings')}</a>
        </div>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mx-auto mb-8"></div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-[#decba5]/40 text-xs font-sans text-[#ffeaa7] transition-all mb-8 hover:scale-105"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>{t('footer.returnTop')}</span>
        </button>

        <p className="text-[11px] font-sans text-[#a89080] flex items-center justify-center gap-1.5">
          <span>{t('footer.crafted')}</span>
          <Heart className="w-3.5 h-3.5 text-[#df325c] fill-current" />
          <span>{t('footer.craftedFor')}</span>
        </p>

      </div>
    </footer>
  );
}
