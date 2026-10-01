import React from 'react';
import { SPECIALTIES } from '../data/restaurantData';
import { MenuItem } from '../types/restaurant';
import { Plus, Wine, Sparkles } from 'lucide-react';

interface SpecialtiesProps {
  onSelectDish: (dish: MenuItem) => void;
  onOpenReservation: () => void;
}

export const Specialties: React.FC<SpecialtiesProps> = ({ onSelectDish, onOpenReservation }) => {
  return (
    <section id="specialites" className="py-20 lg:py-28 bg-[#090807] relative">
      {/* Decorative subtle background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-950/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header matching the reference styling */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-3 text-amber-500/80 text-xs uppercase tracking-[0.3em]">
            <span className="w-8 h-[1px] bg-amber-500/50" />
            <span>Spécialités Incontournables</span>
            <span className="w-8 h-[1px] bg-amber-500/50" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury text-stone-100 italic">
            Les Créations Signées Nakay
          </h2>

          <p className="text-stone-400 text-xs sm:text-sm tracking-wide leading-relaxed font-light">
            Chaque plat est une pièce maîtresse élaborée par notre brigade, où se rencontrent techniques de haute volée et saveurs vibrantes.
          </p>
        </div>

        {/* 3 Featured Specialties Cards with 1, 2, 3 Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8">
          {SPECIALTIES.map((dish) => (
            <div
              key={dish.id}
              className="group bg-[#120f0d] border border-stone-800/80 hover:border-amber-500/50 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-black/80"
            >
              {/* Top Card Content: Badge Number, Title, Description */}
              <div className="p-6 sm:p-7 text-center flex flex-col items-center">
                {/* Circular Number Badge (matching the 1, 2, 3 in screenshot) */}
                <div className="w-10 h-10 rounded-full border border-amber-500/60 bg-gradient-to-b from-amber-600/30 to-amber-950/40 flex items-center justify-center text-amber-300 font-serif-luxury text-lg font-bold mb-4 shadow-md shadow-amber-950/40 group-hover:scale-110 group-hover:border-amber-400 transition-transform">
                  {dish.badgeNumber}
                </div>

                {/* Subtitle kicker */}
                <span className="text-[11px] uppercase tracking-[0.2em] text-amber-500/90 font-medium mb-1">
                  {dish.categoryLabel}
                </span>

                {/* Dish Name */}
                <h3 className="font-serif-luxury text-xl sm:text-2xl text-stone-100 group-hover:text-amber-200 transition-colors mb-3">
                  {dish.name}
                </h3>

                {/* Description */}
                <p className="text-stone-400 text-xs leading-relaxed line-clamp-3 mb-4 font-light">
                  {dish.description}
                </p>

                {/* Wine pairing hint if present */}
                {dish.pairing && (
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-stone-500 group-hover:text-stone-300 transition-colors">
                    <Wine className="w-3 h-3 text-amber-500/70" />
                    <span className="italic">Accord : {dish.pairing}</span>
                  </div>
                )}
              </div>

              {/* Decorative separator */}
              <div className="flex items-center justify-center px-8">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
              </div>

              {/* Dish Photo */}
              <div className="relative aspect-[4/3] overflow-hidden m-5 rounded-lg border border-stone-800 bg-[#070605]">
                {dish.image && (
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />

                {/* Price tag on photo */}
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-stone-950/90 backdrop-blur-sm border border-amber-500/40 rounded text-amber-300 font-serif-luxury text-lg font-semibold shadow-md">
                  {dish.price}€
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="px-6 pb-6 pt-1 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectDish(dish)}
                  className="text-xs uppercase tracking-wider text-stone-400 hover:text-amber-300 transition-colors py-2 flex items-center gap-1 cursor-pointer"
                >
                  <span>Détails & Ingrédients</span>
                </button>

                <button
                  onClick={onOpenReservation}
                  className="px-4 py-2 bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-stone-300 border border-stone-700 hover:border-amber-500 text-[11px] uppercase tracking-wider transition-all font-medium cursor-pointer"
                >
                  Réserver pour goûter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
