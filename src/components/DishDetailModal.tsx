import React from 'react';
import { MenuItem } from '../types/restaurant';
import { X, Wine, Utensils, Sparkles, Check, Heart } from 'lucide-react';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onOpenReservation: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onOpenReservation,
}) => {
  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#120f0d] border border-amber-900/40 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-stone-950/70 hover:bg-stone-900 text-stone-300 rounded-full border border-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Dish Image if available */}
        {dish.image && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-950">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120f0d] via-[#120f0d]/30 to-transparent" />
            {dish.badgeNumber && (
              <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-stone-950/90 border border-amber-500/70 flex items-center justify-center text-amber-400 font-serif-luxury font-bold">
                #{dish.badgeNumber}
              </div>
            )}
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-amber-500 font-semibold block mb-1">
                {dish.categoryLabel}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-stone-100 font-medium">
                {dish.name}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-400">
                {dish.price}€
              </span>
            </div>
          </div>

          <p className="text-stone-300 text-sm leading-relaxed font-light">
            {dish.description}
          </p>

          {/* Tags */}
          {dish.tags && dish.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              {dish.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-stone-900 border border-stone-800 text-stone-300 rounded text-[11px] capitalize"
                >
                  ✓ {tag.replace('-', ' ')}
                </span>
              ))}
            </div>
          )}

          {/* Wine Pairing */}
          {dish.pairing && (
            <div className="p-3.5 bg-amber-950/20 border border-amber-900/30 rounded-xl flex items-center gap-3">
              <Wine className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="text-xs">
                <span className="text-amber-400 font-medium block">Conseil Sommelier Nakay</span>
                <span className="text-stone-300 italic">{dish.pairing}</span>
              </div>
            </div>
          )}

          {/* Quality Guarantee */}
          <div className="text-xs text-stone-400 space-y-1.5 pt-2 border-t border-stone-800/80">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Élaboré le jour même à partir de produits frais du marché</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="w-3.5 h-3.5 text-amber-500" />
              <span>Dressage minute par la brigade du Chef</span>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs text-stone-400 hover:text-stone-200 uppercase tracking-wider cursor-pointer"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenReservation();
              }}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-wider text-xs transition-colors shadow-md shadow-amber-950/50 cursor-pointer"
            >
              Réserver pour ce plat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
