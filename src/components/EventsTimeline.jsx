import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, Heart, Download, Shirt, Gem } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function EventsTimeline() {
  const { events, couple } = weddingData;

  const downloadIcs = (event) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//${couple.signature} Wedding Invitation//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${event.title} - ${couple.signature} Wedding
DESCRIPTION:${event.description}\\nVenue: ${event.venue}\\nDress Code: ${event.dressCode}
LOCATION:${event.venue}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}-wedding-event.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getGoogleCalendarUrl = (event) => {
    const title = encodeURIComponent(`${event.title} — ${couple.signature} Wedding`);
    const details = encodeURIComponent(`${event.subtitle}\n\n${event.description}\nDress Code: ${event.dressCode}`);
    const location = encodeURIComponent(event.venue);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <section id="events-schedule" className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-[#decba5] text-xs font-serif tracking-widest text-[#722b3b] uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Auspicious Program</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#5a222f] font-normal tracking-tight">
          Wedding Events & Ceremonies
        </h2>
        <p className="mt-3 text-xs sm:text-sm font-serif italic text-[#8c6d48] max-w-lg mx-auto">
          We invite you to grace all three auspicious occasions with your presence and heartfelt blessings.
        </p>
      </div>

      {/* 3 Events Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {events.map((evt) => {
          const isMuhurtham = evt.isPrimary;
          return (
            <div 
              key={evt.id}
              className={`glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 relative overflow-hidden group ${
                isMuhurtham 
                  ? 'border-2 border-[#d4af37] shadow-glow-gold bg-gradient-to-b from-white/95 to-[#fff5f7]/95' 
                  : 'border border-[#decba5] shadow-card-soft hover:border-[#b89758]'
              }`}
            >
              {isMuhurtham && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#d4af37] to-[#b89758] text-[#5a222f] text-[10px] font-serif font-bold uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-sm">
                  ★ Main Ceremony ★
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                    isMuhurtham ? 'bg-[#722b3b] text-[#ffeaa7]' : 'bg-[#faf4ee] text-[#722b3b] border border-[#decba5]'
                  }`}>
                    {evt.icon === 'Sparkles' && <Sparkles className="w-6 h-6" />}
                    {evt.icon === 'Heart' && <Heart className="w-6 h-6 fill-current" />}
                    {evt.icon === 'Ring' && <Gem className="w-6 h-6" />}
                  </div>
                  <span className={`text-[11px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full ${evt.badgeColor}`}>
                    {evt.id.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#5a222f] mb-1">
                  {evt.title}
                </h3>
                <p className="text-xs font-serif italic text-[#8c6d48] mb-6">
                  {evt.subtitle}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#722b3b] font-medium bg-white/70 p-2.5 rounded-xl border border-[#eedfce]">
                    <Calendar className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>{evt.date}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#722b3b] font-medium bg-white/70 p-2.5 rounded-xl border border-[#eedfce]">
                    <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>{evt.time}</span>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-[#664d3e] bg-white/70 p-2.5 rounded-xl border border-[#eedfce]">
                    <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{evt.venue}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#faf6f0] border border-[#eedfce] mb-6">
                  <div className="flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-wider text-[#a67c2e] mb-1">
                    <Shirt className="w-3.5 h-3.5" />
                    <span>Dress Code</span>
                  </div>
                  <p className="text-xs font-serif text-[#722b3b]">
                    {evt.dressCode}
                  </p>
                </div>

                <p className="text-xs font-serif text-[#664d3e] leading-relaxed mb-6">
                  {evt.description}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#eedfce]">
                <a
                  href={getGoogleCalendarUrl(evt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#decba5] hover:border-[#b89758] text-[#722b3b] text-xs font-serif font-bold shadow-sm hover:shadow transition-all text-center"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Add to Google Calendar</span>
                </a>

                <button
                  onClick={() => downloadIcs(evt)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#faf4ee] hover:bg-[#f5eee6] text-[#8c6d48] text-xs font-sans font-medium transition-all text-center"
                >
                  <Download className="w-3 h-3" />
                  <span>Download .ICS (Apple/Outlook)</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
