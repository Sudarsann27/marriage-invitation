import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Navigation, Copy, Check, Car, Phone, Mail, Plane, Train, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function VenueLocation() {
  const { t } = useTranslation();
  const { venue } = weddingData;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(venue.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="venue-location" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-[#decba5] text-xs font-serif tracking-widest text-[#722b3b] uppercase mb-3">
          <MapPin className="w-3.5 h-3.5 text-[#df325c]" />
          <span>{t('venue.sectionHeader')}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#5a222f] font-normal tracking-tight">
          {t('venue.sectionTitle')}
        </h2>
        <p className="mt-3 text-xs sm:text-sm font-serif italic text-[#8c6d48] max-w-lg mx-auto">
          We look forward to welcoming you to this joyous celebration. Find easy navigation routes and venue amenities below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Venue Information Panel (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-[#decba5] shadow-card-soft">
          
          <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#a67c2e] block mb-2">
            Ceremony Venue
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#5a222f] leading-tight mb-2">
            {t('venue.name')}
          </h3>
          <p className="text-xs font-serif italic text-[#8c6d48] mb-6">
            {t('venue.tagline')}
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 border border-[#eedfce]">
              <MapPin className="w-5 h-5 text-[#df325c] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-serif font-bold text-[#722b3b] mb-0.5">Address</p>
                <p className="text-xs text-[#5a222f] leading-relaxed">{t('venue.address')}</p>
                <p className="text-xs text-[#5a222f] font-medium">{t('venue.city')}</p>
                <p className="text-[11px] text-[#8c6d48] mt-1 italic">Landmark: {venue.landmark}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 border border-[#eedfce]">
              <Phone className="w-5 h-5 text-[#d4af37] shrink-0" />
              <div>
                <p className="text-xs font-serif font-bold text-[#722b3b]">Contact for Assistance</p>
                <p className="text-xs text-[#5a222f]">{venue.contactPhone}</p>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="space-y-3">
            <a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#722b3b] to-[#8c3a4b] text-white font-serif font-bold text-sm shadow-md hover:shadow-glow-rose hover:scale-[1.02] active:scale-98 transition-all"
            >
              <Navigation className="w-4 h-4 text-[#ffeaa7]" />
              <span>{t('venue.openMap')}</span>
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={venue.appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-[#decba5] hover:border-[#b89758] text-[#722b3b] text-xs font-serif font-bold transition-all text-center"
              >
                <span>🍎 Apple Maps</span>
              </a>

              <button
                onClick={handleCopyAddress}
                className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-[#decba5] hover:border-[#b89758] text-[#722b3b] text-xs font-serif font-bold transition-all text-center"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#a67c2e]" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Interactive Map & Amenities (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Map Embed Frame */}
          <div className="glass-card rounded-3xl p-3 sm:p-4 border border-[#decba5] shadow-card-soft">
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-inner border border-[#eedfce]">
              <iframe
                title="Mahal Location Map"
                src={venue.mapEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Travel Guide & Amenities Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Travel Connections */}
            <div className="glass-card p-5 rounded-2xl border border-[#eedfce]">
              <div className="flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-[#722b3b] mb-3">
                <Plane className="w-4 h-4 text-[#d4af37]" />
                <span>Transit Guide</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#664d3e]">
                {(venue.travelGuide || []).map((item, idx) => (
                  <li key={idx} className="flex flex-col">
                    <span className="font-bold text-[#5a222f]">{item.mode}:</span>
                    <span>{item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Venue Amenities */}
            <div className="glass-card p-5 rounded-2xl border border-[#eedfce]">
              <div className="flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-[#722b3b] mb-3">
                <Car className="w-4 h-4 text-[#d4af37]" />
                <span>Venue Amenities</span>
              </div>
              <ul className="space-y-2 text-xs text-[#664d3e]">
                {(venue.amenities || []).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-[#d4af37] shrink-0" />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
