import React, { useState, useEffect } from 'react';
import { Utensils, Phone, Clock, Calendar, Menu, X, ChevronRight, BookmarkCheck, MapPin } from 'lucide-react';
import { RESTAURANT_IMAGES, RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenMyReservations: () => void;
  reservationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenMyReservations,
  reservationsCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Spécialités', href: '#specialites' },
    { label: 'La Carte', href: '#menu' },
    { label: 'Le Chef & Histoire', href: '#histoire' },
    { label: 'Réservations', href: '#reservation' },
    { label: 'Avis', href: '#avis' },
    { label: 'Accès', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className={`hidden md:block transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'h-10 bg-[#070605] border-b border-stone-800/80 py-2'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center text-xs text-stone-400">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{RESTAURANT_INFO.address}</span>
            </span>
            <span className="hidden lg:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Mar - Dim : 12h-14h30 / 19h-23h</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-1.5 text-stone-300 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
            
            <button
              onClick={onOpenMyReservations}
              className="flex items-center gap-1 text-stone-300 hover:text-amber-400 transition-colors relative cursor-pointer"
              title="Consulter mes réservations enregistrées"
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Mes Réservations</span>
              {reservationsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-amber-600 text-stone-950 font-bold rounded-full text-[10px]">
                  {reservationsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0807]/95 backdrop-blur-md shadow-2xl shadow-black/80 border-b border-amber-900/30 py-3'
            : 'bg-gradient-to-b from-[#0c0a09]/90 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#accueil"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-amber-500/50 shadow-md group-hover:border-amber-400 transition-all duration-300">
              <img
                src={RESTAURANT_IMAGES.logo}
                alt="Gourmande Nakay Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-amber-500/20 rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-display tracking-[0.2em] uppercase text-lg sm:text-xl font-bold text-stone-100 group-hover:text-amber-200 transition-colors">
                Gourmande
              </span>
              <span className="font-serif-luxury italic text-xs tracking-widest text-amber-400 -mt-1 font-semibold">
                Nakay · Haute Cuisine
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-xs uppercase tracking-[0.16em] text-stone-300 hover:text-amber-400 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-none bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-stone-950 font-semibold text-xs tracking-[0.15em] uppercase hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-amber-950/60 border border-amber-500/40 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-stone-950" />
              <span>Réserver une table</span>
            </button>

            {/* Mobile Booking Icon Button */}
            <button
              onClick={onOpenReservation}
              className="sm:hidden p-2.5 bg-amber-600 text-stone-950 rounded-none border border-amber-400"
              aria-label="Réserver"
            >
              <Calendar className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-stone-300 hover:text-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Out Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-[#0c0a09]/98 backdrop-blur-xl z-50 flex flex-col justify-between p-6 border-t border-stone-800 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4 pt-2">
            <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold pb-2 border-b border-stone-800/80">
              Navigation du Restaurant
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="flex items-center justify-between text-base font-serif-luxury tracking-wider text-stone-200 hover:text-amber-400 py-2 border-b border-stone-900/60 transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-stone-600" />
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyReservations();
              }}
              className="flex items-center justify-between text-sm tracking-wider text-amber-300 py-2.5 text-left border-b border-stone-900/60"
            >
              <span className="flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4" />
                <span>Mes réservations</span>
              </span>
              {reservationsCount > 0 && (
                <span className="px-2 py-0.5 bg-amber-600 text-stone-950 font-bold rounded-full text-xs">
                  {reservationsCount}
                </span>
              )}
            </button>
          </div>

          <div className="space-y-4 pt-6 border-t border-stone-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50"
            >
              <Calendar className="w-4 h-4" />
              <span>Réserver une table maintenant</span>
            </button>

            <div className="text-center text-xs text-stone-500 flex flex-col gap-1">
              <span>{RESTAURANT_INFO.address}</span>
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-amber-400/90 font-medium">
                {RESTAURANT_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
