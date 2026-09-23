import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' }
  ];

  const currentLanguage = languages.find(l => l.code === (i18n.language || 'en')) || languages[0];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#d4af37] text-[#722b3b] shadow-lg hover:bg-white transition-all text-xs font-serif font-bold"
          aria-label="Change Language"
        >
          <Globe className="w-4 h-4" />
          <span>{currentLanguage.label}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-12 right-0 mt-2 w-32 bg-white/95 backdrop-blur-md border border-[#eedfce] rounded-xl shadow-xl overflow-hidden flex flex-col">
            {languages.map((lng) => (
              <button
                key={lng.code}
                onClick={() => changeLanguage(lng.code)}
                className={`py-2.5 px-4 text-sm font-sans font-medium tracking-wide text-left transition-colors ${
                  i18n.language === lng.code
                    ? 'bg-[#fcedee] text-[#df325c]'
                    : 'text-[#8c6d48] hover:bg-black/5'
                }`}
              >
                {lng.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
