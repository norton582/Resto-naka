import React, { useState, useMemo } from 'react';
import { FULL_MENU } from '../data/restaurantData';
import { MenuItem, DietaryTag } from '../types/restaurant';
import { Search, Sparkles, Utensils, Heart, Filter, Check } from 'lucide-react';

interface MenuSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onOpenReservation: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectDish, onOpenReservation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTag, setActiveTag] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Toute la Carte' },
    { id: 'entrees', label: 'Entrées Délicates' },
    { id: 'signatures', label: 'Plats Signatures' },
    { id: 'plats', label: 'Viandes & Pêche' },
    { id: 'desserts', label: 'Douceurs & Desserts' },
    { id: 'boissons', label: 'Vins & Cocktails' },
  ];

  const tagFilters: { id: string; label: string }[] = [
    { id: 'all', label: 'Tous' },
    { id: 'signature', label: 'Signatures' },
    { id: 'vegetarien', label: 'Végétarien' },
    { id: 'sans-gluten', label: 'Sans Gluten' },
    { id: 'coup-de-coeur', label: 'Coups de Cœur' },
  ];

  const filteredItems = useMemo(() => {
    return FULL_MENU.filter((item) => {
      // Category match
      if (activeCategory !== 'all') {
        if (activeCategory === 'signatures') {
          if (item.category !== 'signatures' && !item.tags?.includes('signature')) return false;
        } else if (item.category !== activeCategory) {
          return false;
        }
      }

      // Tag filter
      if (activeTag !== 'all') {
        if (!item.tags?.includes(activeTag as DietaryTag)) return false;
      }

      // Search match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesPairing = item.pairing?.toLowerCase().includes(q) ?? false;
        if (!matchesName && !matchesDesc && !matchesPairing) return false;
      }

      return true;
    });
  }, [activeCategory, activeTag, searchQuery]);

  return (
    <section id="menu" className="py-20 lg:py-28 bg-[#0c0a09] relative border-t border-stone-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-amber-400 text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Savoir-Faire & Gastronomie</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury text-stone-100">
            La Carte du Restaurant
          </h2>

          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-light">
            Une sélection rigoureuse d'ingrédients de saison travaillés avec finesse et créativité. Nos poissons sont issus de la pêche durable et nos viandes sont d'origine française certifiée.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="mb-10 space-y-5">
          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-amber-600 text-stone-950 font-bold shadow-md shadow-amber-950/60'
                      : 'bg-stone-900/80 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input & Sub-tags */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-stone-800/70">
            {/* Dietary Tags */}
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-stone-500 text-xs flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3 text-amber-500" />
                <span>Préférences :</span>
              </span>
              {tagFilters.map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => setActiveTag(tf.id)}
                  className={`text-[11px] px-2.5 py-1 transition-colors cursor-pointer rounded-sm ${
                    activeTag === tf.id
                      ? 'bg-stone-800 text-amber-400 font-semibold border border-amber-600/50'
                      : 'text-stone-400 hover:text-stone-200 bg-stone-950 border border-stone-800'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Rechercher un ingrédient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141210] border border-stone-800 focus:border-amber-500/80 text-stone-200 placeholder-stone-500 text-xs px-3.5 py-2 pl-9 outline-none transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Menu Items Grid with Classic Dotted Leaders */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#110f0d] border border-stone-800/60 p-8 space-y-3">
            <Utensils className="w-8 h-8 text-stone-600 mx-auto" />
            <h4 className="font-serif-luxury text-stone-300 text-lg">Aucun plat ne correspond à votre recherche</h4>
            <p className="text-xs text-stone-500">Essayez de réinitialiser vos filtres ou de modifier votre mot-clé.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveTag('all');
                setSearchQuery('');
              }}
              className="text-xs uppercase tracking-wider text-amber-400 hover:underline pt-2 cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectDish(item)}
                className="group p-4 bg-[#110f0d]/60 hover:bg-[#161310] border border-transparent hover:border-amber-900/30 rounded-lg transition-all duration-200 cursor-pointer"
              >
                {/* Name, dotted leader and price */}
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif-luxury text-lg text-stone-100 group-hover:text-amber-200 transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex-1 border-b border-dotted border-stone-700/60 mx-2 mb-1" />
                  <span className="font-serif-luxury text-lg font-bold text-amber-400 shrink-0">
                    {item.price}€
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-stone-400 leading-relaxed mt-1.5 font-light line-clamp-2">
                  {item.description}
                </p>

                {/* Metadata & Tag Badges */}
                <div className="flex items-center gap-2 mt-2.5 text-[10px] text-stone-500">
                  <span className="text-amber-500/80 font-medium uppercase tracking-wider">{item.categoryLabel}</span>
                  {item.tags?.includes('signature') && (
                    <>
                      <span>·</span>
                      <span className="text-amber-300 font-medium">Signature</span>
                    </>
                  )}
                  {item.tags?.includes('vegetarien') && (
                    <>
                      <span>·</span>
                      <span className="text-emerald-400">Végétarien</span>
                    </>
                  )}
                  {item.tags?.includes('sans-gluten') && (
                    <>
                      <span>·</span>
                      <span className="text-sky-300">Sans Gluten</span>
                    </>
                  )}
                  {item.tags?.includes('coup-de-coeur') && (
                    <>
                      <span>·</span>
                      <span className="text-rose-400">Coup de cœur</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 bg-gradient-to-r from-[#171310] via-[#1c1713] to-[#171310] border border-amber-900/30 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h4 className="font-serif-luxury text-2xl text-stone-100">
              Une envie particulière ou un événement privé ?
            </h4>
            <p className="text-stone-400 text-xs mt-1">
              Notre chef adapte ses propositions pour les menus dégustation personnalisés et régimes spécifiques.
            </p>
          </div>
          <button
            onClick={onOpenReservation}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase tracking-widest text-xs shrink-0 transition-colors shadow-md shadow-amber-950/60 cursor-pointer"
          >
            Réserver pour cette dégustation
          </button>
        </div>
      </div>
    </section>
  );
};
