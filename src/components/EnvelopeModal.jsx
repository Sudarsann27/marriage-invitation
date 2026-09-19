import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

// Static geometric dot positions — deterministic so no re-randomize flicker
const DOTS = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  top: `${(i * 131.7) % 100}%`,
  left: `${(i * 93.1) % 100}%`,
  size: (i % 4 === 0) ? 2 : 1,
  opacity: ((i * 0.09) % 0.18) + 0.04,
}));

export default function EnvelopeModal({ onOpen, isOpen }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [ringScale, setRingScale] = useState(false);
  const pulseRef = useRef(null);

  // ── Lock body scroll + prevent wheel/touch scroll bleeding through ──
  useEffect(() => {
    if (!isOpen) return;
    const prevent = (e) => e.preventDefault();
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    window.addEventListener('wheel', prevent, { passive: false });
    window.addEventListener('touchmove', prevent, { passive: false });
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      window.removeEventListener('wheel', prevent);
      window.removeEventListener('touchmove', prevent);
    };
  }, [isOpen]);

  // ── Card entrance ──
  useEffect(() => {
    const t = setTimeout(() => setHasEntered(true), 120);
    return () => clearTimeout(t);
  }, []);

  // ── Breathing ring animation ──
  useEffect(() => {
    pulseRef.current = setInterval(() => {
      setRingScale(true);
      setTimeout(() => setRingScale(false), 900);
    }, 2600);
    return () => clearInterval(pulseRef.current);
  }, []);

  const handleOpen = () => {
    if (isAnimating || isOpened) return;
    setIsAnimating(true);
    clearInterval(pulseRef.current);

    confetti({
      particleCount: 90,
      spread: 110,
      origin: { y: 0.45 },
      colors: ['#c9a227', '#f0d78c', '#fce4ec', '#e8c4a0', '#ffffff'],
      disableForReducedMotion: true,
      scalar: 0.85,
    });

    setTimeout(() => {
      // Reset scroll to top before revealing main content
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      setIsOpened(true);
      onOpen();
    }, 700);
  };

  if (!isOpen && isOpened) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none transition-all duration-700 ease-in-out ${
        isAnimating ? 'opacity-0 scale-[1.04] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ background: '#0a0a0f' }}
      onWheel={(e) => e.preventDefault()}
    >
      {/* Subtle gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(25,18,10,0) 0%, rgba(10,10,15,0.9) 100%)',
        }}
      />

      {/* Fine grain dot field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {DOTS.map((d) => (
          <div
            key={d.id}
            className="absolute rounded-full bg-[#c9a227]"
            style={{ top: d.top, left: d.left, width: `${d.size}px`, height: `${d.size}px`, opacity: d.opacity }}
          />
        ))}
      </div>


      {/* ══ MAIN CONTENT ══ */}
      <div
        className={`relative z-10 flex flex-col items-center text-center transition-all duration-700 ease-out cursor-pointer w-full px-8`}
        style={{ maxWidth: '420px' }}
        onClick={handleOpen}
      >

        {/* Top line + label */}
        <div
          className={`flex items-center gap-4 mb-10 transition-all duration-700 ${hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          style={{ transitionDelay: '0ms' }}
        >
          <div className="h-[1px] w-12 bg-[#c9a227] opacity-30" />
          <span
            className="font-serif uppercase tracking-[0.4em] text-[10px]"
            style={{ color: 'rgba(201,162,39,0.6)' }}
          >
            Wedding Invitation
          </span>
          <div className="h-[1px] w-12 bg-[#c9a227] opacity-30" />
        </div>

        {/* Main headline */}
        <div
          className={`mb-3 transition-all duration-700 ${hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '100ms' }}
        >
          <h1
            className="font-serif font-light"
            style={{
              fontSize: 'clamp(2.4rem, 8vw, 3.5rem)',
              color: '#f0e8d6',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            You Are
          </h1>
          <h1
            className="font-serif"
            style={{
              fontSize: 'clamp(2.4rem, 8vw, 3.5rem)',
              color: '#c9a227',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              fontStyle: 'italic',
            }}
          >
            Invited
          </h1>
        </div>

        {/* Subline */}
        <p
          className={`font-serif mb-12 transition-all duration-700 ${hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            fontSize: '13px',
            color: 'rgba(230,215,185,0.45)',
            letterSpacing: '0.06em',
            transitionDelay: '160ms',
          }}
        >
          A celebration of love &amp; two families united
        </p>

        {/* ── Interactive tap element — Modern geometric ring ── */}
        <div
          className={`relative mb-12 transition-all duration-700 ${hasEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
          style={{ transitionDelay: '220ms', width: '96px', height: '96px' }}
        >
          {/* Outer breathing ring */}
          <div
            className="absolute inset-0 rounded-full border transition-all duration-1000 ease-out"
            style={{
              borderColor: 'rgba(201,162,39,0.5)',
              transform: ringScale ? 'scale(1.22)' : 'scale(1)',
              opacity: ringScale ? 0 : 0.6,
            }}
          />

          {/* Static outer ring */}
          <div
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: 'rgba(201,162,39,0.2)' }}
          />

          {/* Mid ring */}
          <div
            className="absolute inset-3 rounded-full border"
            style={{ borderColor: 'rgba(201,162,39,0.35)' }}
          />

          {/* Inner filled disc */}
          <div
            className="absolute inset-6 rounded-full transition-transform duration-300 hover:scale-110"
            style={{
              background: 'linear-gradient(145deg, #2a1f0a 0%, #1a1306 100%)',
              border: '1px solid rgba(201,162,39,0.5)',
              boxShadow: '0 0 20px rgba(201,162,39,0.15), inset 0 1px 3px rgba(0,0,0,0.6)',
            }}
          >
            {/* SVG geometric motif in centre */}
            <svg
              viewBox="0 0 24 24"
              className="absolute inset-0 m-auto w-5 h-5"
              fill="none"
              stroke="#c9a227"
              strokeWidth="1.2"
            >
              <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
            </svg>
          </div>
        </div>

        {/* Date & Venue teaser */}
        <div
          className={`transition-all duration-700 ${hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-10" style={{ background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.5))' }} />
            <div className="w-1 h-1 rounded-full" style={{ background: '#c9a227', opacity: 0.6 }} />
            <div className="h-[1px] w-10" style={{ background: 'linear-gradient(to left, transparent, rgba(201,162,39,0.5))' }} />
          </div>

          <p
            className="font-serif font-medium mb-1"
            style={{ fontSize: '14px', color: '#e8d9b8', letterSpacing: '0.05em' }}
          >
            October 31 – November 1, 2026
          </p>
          <p
            className="font-serif uppercase"
            style={{ fontSize: '10px', color: 'rgba(201,162,39,0.5)', letterSpacing: '0.35em' }}
          >
            Vysya Mahal · Salem
          </p>
        </div>

        {/* Tap CTA */}
        <p
          className={`mt-12 font-serif italic transition-all duration-500 ${
            isAnimating ? 'opacity-0' : hasEntered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            fontSize: '11px',
            color: 'rgba(201,162,39,0.38)',
            letterSpacing: '0.12em',
            transitionDelay: '400ms',
          }}
        >
          — tap anywhere to enter —
        </p>
      </div>
    </div>
  );
}
