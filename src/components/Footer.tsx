import React, { useState } from 'react';
import { RESTAURANT_IMAGES, RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer id="contact" className="bg-[#070605] border-t border-stone-800/80 pt-16 pb-12 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-stone-800/70">
          {/* Brand & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-500/50">
                <img
                  src={RESTAURANT_IMAGES.logo}
                  alt="Gourmande Nakay"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-display tracking-[0.2em] uppercase text-xl font-bold text-stone-100">
                  Gourmande Nakay
                </h3>
                <span className="font-serif-luxury italic text-xs text-amber-400 font-medium">
                  Haute Gastronomie & Saveurs Inspirées
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-stone-400 max-w-sm font-light">
              Une table intimiste au cœur de Paris où les recettes d’auteur célèbrent la noblesse du produit et la générosité du partage.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-bold uppercase text-[11px] tracking-widest cursor-pointer shadow-md shadow-amber-950/40 hover:brightness-110 transition-all"
              >
                Réserver en ligne
              </button>
            </div>
          </div>

          {/* Horaires d'Ouverture */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-stone-100 text-base font-semibold tracking-wider uppercase">
              Horaires
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              {RESTAURANT_INFO.hours.map((h, i) => (
                <li key={i} className="space-y-0.5">
                  <span className="text-stone-300 font-medium block">{h.days}</span>
                  <span className="text-stone-500 block text-[11px]">
                    {h.lunch} · {h.dinner}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Accès & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-stone-100 text-base font-semibold tracking-wider uppercase">
              Accès & Contact
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  {RESTAURANT_INFO.address}
                  <span className="block text-stone-500 text-[11px] mt-0.5">
                    {RESTAURANT_INFO.metro}
                  </span>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-amber-300 transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-amber-300 transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Newsletter / Club Épicurien */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-stone-100 text-base font-semibold tracking-wider uppercase">
              Club Épicurien
            </h4>
            <p className="text-xs text-stone-400 font-light">
              Recevez les invitations aux menus dégustation éphémères du Chef Nakay.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-emerald-950/40 border border-emerald-600/50 rounded text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Merci de votre inscription au Club !</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Votre adresse email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-[#141210] border border-stone-800 text-stone-200 text-xs px-3 py-2 pr-9 outline-none focus:border-amber-500/80"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-amber-400 hover:text-amber-300 cursor-pointer"
                    aria-label="S'inscrire"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-stone-600 block">
                  Nous respectons votre tranquillité. Désinscription en 1 clic.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & Mentions */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Gourmande Nakay. Tous droits réservés.
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="#accueil" className="hover:text-amber-400 transition-colors">Mentions Légales</a>
            <span>·</span>
            <a href="#accueil" className="hover:text-amber-400 transition-colors">Politique de Confidentialité</a>
            <span>·</span>
            <a href="#accueil" className="hover:text-amber-400 transition-colors">Gestion des Allergènes</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
