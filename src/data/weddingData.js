/**
 * Central Wedding Data Configuration
 */

export const weddingData = {
  couple: {
    groom: {
      name: "Sudarsan",
      parents: "S/o Mr. P. B. Nandakumar & Mrs. Geetha Nandakumar",
    },
    bride: {
      name: "Hamshavarthini",
      parents: "D/o Mr. P. N. Srinivasan & Mrs. Sasikala Srinivasan",
    },
    monogram: "S & H",
    signature: "Sudarsan & Hamshavarthini"
  },

  // Wedding date & timing (used by HeroSection countdown)
  formattedDate: "Sunday, November 1, 2026",
  auspiciousMuhurthamTime: "06:00 AM – 07:30 AM",
  countdownTarget: "2026-11-01T06:00:00",

  storyCards: [
    {
      id: "card1",
      groomImage: "/images/generated/groom_first_impression.png",
      brideImage: "/images/generated/bride_first_impression.png",
    },
    {
      id: "card2",
      groomImage: "/images/generated/groom_first_date.png",
      brideImage: "/images/generated/bride_first_date.png",
    },
    {
      id: "card3",
      groomImage: "/images/generated/groom_proposal.png",
      brideImage: "/images/generated/bride_proposal.png",
    },
    {
      id: "card4",
      groomImage: "/images/generated/groom_future.png",
      brideImage: "/images/generated/bride_future.png",
    }
  ],

  // Events (used by EventsTimeline)
  events: [
    {
      id: "engagement",
      title: "Engagement Ceremony",
      subtitle: "The auspicious ring exchange & formal betrothal celebration",
      date: "Saturday, October 31, 2026",
      time: "10:30 AM onwards",
      venue: "Main Hall, Vysya Mahal, Salem",
      dressCode: "Traditional Silk / Ethnic Formals",
      icon: "Ring",
      color: "from-purple-500/20 to-pink-500/10",
      badgeColor: "bg-purple-100 text-purple-800",
      description: "The joyous exchange of rings and blessings from both families, marking the beginning of a new chapter with love and celebration."
    },
    {
      id: "reception",
      title: "Wedding Reception",
      subtitle: "An elegant evening of blessings & celebration",
      date: "Saturday, October 31, 2026",
      time: "07:00 PM onwards",
      venue: "Main Hall, Vysya Mahal, Salem",
      dressCode: "Lehanga / Tuxedo",
      icon: "Sparkles",
      color: "from-amber-500/20 to-yellow-500/10",
      badgeColor: "bg-amber-100 text-amber-800",
      description: "An auspicious evening welcoming our cherished friends and family to bestow their blessings on the couple, followed by a festive feast."
    },
    {
      id: "muhurtham",
      title: "Auspicious Muhurtham",
      subtitle: "The sacred Vedic rituals, floral garlands & mangalsutra ceremony",
      date: "Sunday, November 1, 2026",
      time: "06:00 AM – 07:15 AM",
      venue: "Ugadhi Nanbargal Hall, Vysya Mahal, Salem",
      dressCode: "Traditional Silk Saree & Pattu Veshti",
      icon: "Heart",
      isPrimary: true,
      color: "from-red-500/20 to-rose-500/10",
      badgeColor: "bg-red-100 text-red-900 border border-red-300",
      description: "Witness the sacred Vedic rituals and the tying of the sacred mangalsutra amidst auspicious nadaswaram melodies."
    }
  ],

  // Venue (used by VenueLocation)
  venue: {
    name: "Vysya Mahal",
    tagline: "A majestic traditional wedding venue in the heart of Salem",
    address: "M56Q+6H5, Military Rd, Ammapet",
    city: "Salem (M.Corp.), Tamil Nadu - 636003",
    fullAddress: "Vysya Mahal, M56Q+6H5, Military Rd, Ammapet, Salem (M.Corp.), Tamil Nadu 636003",
    landmark: "Near Ammapet Main Road, Salem",
    googleMapsUrl: "https://maps.google.com/?q=Vysya+Mahal+Military+Rd+Ammapet+Salem+Tamil+Nadu+636003",
    appleMapsUrl: "https://maps.apple.com/?q=Vysya+Mahal+Military+Rd+Ammapet+Salem+Tamil+Nadu+636003",
    mapEmbedUrl: "https://maps.google.com/maps?q=Vysya+Mahal,+Military+Rd,+Ammapet,+Salem,+Tamil+Nadu+636003&t=&z=15&ie=UTF8&iwloc=&output=embed",
    amenities: [
      { name: "Spacious Car Parking" },
      { name: "Air Conditioned Dining & Mandapam" },
      { name: "Guest Accommodation Rooms" },
      { name: "Wheelchair Accessible" }
    ],
    travelGuide: [
      { mode: "Airport", detail: "Salem Airport (SXV) ~22 km / Coimbatore Airport (CJB) ~160 km" },
      { mode: "Railway Station", detail: "Salem Town Station (3 km) / Salem Junction (7 km)" },
      { mode: "Bus Station", detail: "Salem New & Old Bus Stand (4.5 km)" }
    ]
  }
};
