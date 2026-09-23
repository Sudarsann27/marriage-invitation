import React, { useState } from 'react';
import EnvelopeModal from './components/EnvelopeModal';
import HeroSection from './components/HeroSection';
import StoryCarousel from './components/StoryCarousel';
import EventsTimeline from './components/EventsTimeline';
import VenueLocation from './components/VenueLocation';
import InteractiveBlessings from './components/InteractiveBlessings';
import Footer from './components/Footer';
import PetalsCanvas from './components/PetalsCanvas';
import LanguageSwitcher from './components/LanguageSwitcher';

export default function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  const handleInvitationOpen = () => {
    setIsInvitationOpen(true);
  };

  return (
    <div className="min-h-screen paper-texture relative selection:bg-rose-200 selection:text-rose-900 font-sans overflow-x-hidden">
      
      {/* Ambient Floating Blossom Petals */}
      <PetalsCanvas />

      <LanguageSwitcher />

      {/* 1. Interactive 3D Royal Gatefold Invitation Card */}
      <EnvelopeModal 
        isOpen={!isInvitationOpen} 
        onOpen={handleInvitationOpen} 
      />

      {/* 2. Main Wedding Celebration Suite */}
      <main className={`relative z-10 transition-all duration-1000 ${
        isInvitationOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        <HeroSection isVisible={isInvitationOpen} />
        <StoryCarousel />
        <EventsTimeline />
        <VenueLocation />
        <InteractiveBlessings />
      </main>

      {/* 3. Royal Footer */}
      {isInvitationOpen && <Footer />}
    </div>
  );
}

