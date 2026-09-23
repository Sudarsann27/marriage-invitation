import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

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

    // Create a custom heart shape for the confetti
    const heart = confetti.shapeFromPath({ 
      path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z' 
    });

    const defaults = {
      spread: 120,
      angle: 270, // Shoot downwards
      ticks: 400, // Make them last longer on screen
      gravity: 0.7,
      decay: 0.94,
      startVelocity: 20, // Lower initial push so they fall naturally
      shapes: [heart],
      colors: ['#c9a227', '#f0e8d6', '#990000', '#ffffff', '#e6c875', '#ff9999', '#ff4d4d'],
      scalar: 0.5, // minute hearts/flowers
      disableForReducedMotion: true,
      zIndex: 100, // Ensure it sits on top of everything
    };

    // Heavy shower: Wave 1 (spawned way off-screen so the origin isn't visible)
    confetti({ ...defaults, particleCount: 200, origin: { x: 0.1, y: -0.25 } });
    confetti({ ...defaults, particleCount: 250, origin: { x: 0.3, y: -0.25 } });
    confetti({ ...defaults, particleCount: 300, origin: { x: 0.5, y: -0.25 } });
    confetti({ ...defaults, particleCount: 250, origin: { x: 0.7, y: -0.25 } });
    confetti({ ...defaults, particleCount: 200, origin: { x: 0.9, y: -0.25 } });
    
    // Wave 2 (delayed slightly)
    setTimeout(() => {
      confetti({ ...defaults, particleCount: 200, origin: { x: 0.2, y: -0.25 } });
      confetti({ ...defaults, particleCount: 250, origin: { x: 0.5, y: -0.25 } });
      confetti({ ...defaults, particleCount: 200, origin: { x: 0.8, y: -0.25 } });
    }, 250);

    // Wave 3 (final lingering trail)
    setTimeout(() => {
      confetti({ ...defaults, particleCount: 150, origin: { x: 0.35, y: -0.25 } });
      confetti({ ...defaults, particleCount: 150, origin: { x: 0.65, y: -0.25 } });
    }, 500);

    setTimeout(() => {
      // Reset scroll to top before revealing main content
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      setIsOpened(true);
      onOpen();
    }, 800);
  };

  if (!isOpen && isOpened) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none transition-all duration-[800ms] ease-in-out ${
        isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: isAnimating ? 'transparent' : '#3c141e' }}
      onWheel={(e) => e.preventDefault()}
    >
      <style>
        {`
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            15% { transform: scale(1.15); }
            30% { transform: scale(1); }
            45% { transform: scale(1.15); }
            60% { transform: scale(1); }
          }
          .animate-heartbeat {
            animation: heartbeat 1.5s ease-in-out infinite;
          }
        `}
      </style>

      {/* Subtle gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(90,34,47,0.4) 0%, rgba(45,15,22,0.95) 100%)',
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
          className={`flex items-center gap-4 mb-10 transition-all duration-1000 ${
            isAnimating ? 'translate-y-[100vh] opacity-0 ease-in' : hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
          style={{ transitionDelay: isAnimating ? '0ms' : '0ms' }}
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
          className={`mb-3 transition-all duration-1000 ${
            isAnimating ? 'translate-y-[100vh] opacity-0 ease-in' : hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: isAnimating ? '100ms' : '100ms' }}
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
          className={`font-serif mb-12 transition-all duration-1000 ${
            isAnimating ? 'translate-y-[100vh] opacity-0 ease-in' : hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            fontSize: '13px',
            color: 'rgba(230,215,185,0.45)',
            letterSpacing: '0.06em',
            transitionDelay: isAnimating ? '200ms' : '160ms',
          }}
        >
          A celebration of love &amp; two families united
        </p>

        {/* ── Interactive tap element — Modern geometric ring ── */}
        <div
          className={`relative mb-12 transition-all duration-[1000ms] ${
            isAnimating ? 'translate-y-[100vh] opacity-0 ease-in' : hasEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{ transitionDelay: isAnimating ? '300ms' : '220ms', width: '96px', height: '96px' }}
        >
          {/* Continuous pulsing ripples to grab attention immediately */}
          <div className="absolute inset-0 rounded-full border border-[#d4af37] animate-ping opacity-75" style={{ animationDuration: '2s' }}></div>
          <div className="absolute inset-0 rounded-full border border-[#d4af37] animate-ping opacity-50" style={{ animationDuration: '2s', animationDelay: '1s' }}></div>
          
          {/* Outer breathing ring */}
          <div
            className="absolute inset-0 rounded-full border transition-all duration-1000 ease-out"
            style={{
              borderColor: 'rgba(212,175,55,0.8)',
              transform: ringScale ? 'scale(1.22)' : 'scale(1)',
              opacity: ringScale ? 0 : 0.8,
            }}
          />

          {/* Static outer ring */}
          <div
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: 'rgba(212,175,55,0.3)' }}
          />

          {/* Mid ring */}
          <div
            className="absolute inset-3 rounded-full border"
            style={{ borderColor: 'rgba(212,175,55,0.5)' }}
          />

          {/* Inner filled disc */}
          <div
            className="absolute inset-5 rounded-full transition-transform duration-300 flex items-center justify-center animate-heartbeat cursor-pointer"
            style={{
              background: 'linear-gradient(145deg, #722b3b 0%, #3c141e 100%)',
              border: '1.5px solid rgba(212,175,55,0.9)',
              boxShadow: '0 0 30px rgba(212,175,55,0.6), inset 0 2px 5px rgba(0,0,0,0.8)',
            }}
          >
            {/* Beating Heart Icon */}
            <Heart className="w-7 h-7 text-[#ffeaa7] fill-[#d4af37]" />
          </div>
        </div>

        {/* Date & Venue teaser */}
        <div
          className={`transition-all duration-1000 ${
            isAnimating ? 'translate-y-[100vh] opacity-0 ease-in' : hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: isAnimating ? '400ms' : '300ms' }}
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

      </div>
    </div>
  );
}
