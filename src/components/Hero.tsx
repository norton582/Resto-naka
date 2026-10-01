import React from 'react';
import { Calendar, ChevronDown, Award, Sparkles, ArrowRight } from 'lucide-react';
import { RESTAURANT_IMAGES } from '../data/restaurantData';

interface HeroProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onExploreMenu }) => {
  return (
    <section
      id="accueil"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden bg-[#0c0a09]"
    >
      {/* Background radial ambiance & glowing warm bokeh effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-amber-900/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-orange-950/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-amber-950/10 rounded-full blur-[90px] pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography & Story */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-amber-400 font-semibold px-0 py-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Haute Gastronomie & Création d'Auteur</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-stone-100 leading-[1.1]">
                Gourmande <br />
                <span className="font-serif-luxury italic font-normal text-gold-gradient text-5xl sm:text-6xl lg:text-7xl">
                  Nakay
                </span>
              </h1>
              <p className="text-xs uppercase tracking-[0.3em] text-stone-400 pt-1 font-medium">
                Paris · Table Gastronomique Étoilée d'Inspiration
              </p>
            </div>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              L'alliance harmonieuse entre le raffinement des techniques culinaires françaises et la vivacité envoûtante des arômes Nakay. Chaque assiette est une ode au voyage, façonnée à la minute à partir d’ingrédients d'exception.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={onOpenReservation}
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-stone-950 font-bold text-xs uppercase tracking-[0.18em] shadow-xl shadow-amber-950/70 hover:brightness-115 active:scale-98 transition-all border border-amber-500/50 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-stone-950" />
                <span>Réserver une table</span>
              </button>

              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-stone-700 hover:border-amber-500/70 text-stone-200 hover:text-amber-300 text-xs uppercase tracking-[0.16em] bg-stone-900/40 hover:bg-stone-900/70 transition-all cursor-pointer"
              >
                <span>Découvrir la carte</span>
                <ArrowRight className="w-4 h-4 text-amber-500/80" />
              </button>
            </div>

            {/* Key Quality Indicators */}
            <div className="pt-6 border-t border-stone-800/80 grid grid-cols-3 gap-4 text-left w-full max-w-lg">
              <div>
                <div className="text-lg font-serif-luxury font-bold text-amber-400">100%</div>
                <div className="text-[11px] text-stone-400 uppercase tracking-wider">Fait Maison</div>
              </div>
              <div>
                <div className="text-lg font-serif-luxury font-bold text-amber-400">4.9 / 5</div>
                <div className="text-[11px] text-stone-400 uppercase tracking-wider">Guide Épicurien</div>
              </div>
              <div>
                <div className="text-lg font-serif-luxury font-bold text-amber-400">Terroir</div>
                <div className="text-[11px] text-stone-400 uppercase tracking-wider">Produits Nobles</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Dish Photo Showcase */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Ambient Circular Glow */}
            <div className="absolute w-[85%] aspect-square rounded-full bg-gradient-to-tr from-amber-900/30 via-orange-950/20 to-transparent blur-3xl" />

            <div className="relative group w-full max-w-lg">
              {/* Dish Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-amber-900/40 shadow-2xl shadow-black/90 bg-[#120f0d] transition-all duration-500 group-hover:border-amber-500/60">
                <img
                  src={RESTAURANT_IMAGES.heroSalmon}
                  alt="Pavé de Saumon Glacé Nakay"
                  className="w-full aspect-[16/10] object-cover scale-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient overlay on bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent pointer-events-none" />

                {/* Floating Dish Banner */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-stone-950/85 backdrop-blur-md border border-amber-500/30 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-amber-400 font-semibold block">
                      Création Signature Nakay
                    </span>
                    <h3 className="font-serif-luxury text-stone-100 text-lg sm:text-xl font-medium">
                      Pavé de Saumon Laqué aux Épices Douces
                    </h3>
                    <p className="text-stone-400 text-xs line-clamp-1">
                      Peau croustillante, réduction de miel et soja, herbes du potager.
                    </p>
                  </div>
                  <div className="text-right pl-3 shrink-0">
                    <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-amber-400">
                      34€
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative culinary badge */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-stone-900/90 border border-amber-500/50 rounded-full px-3.5 py-1.5 items-center gap-2 shadow-xl shadow-black">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] uppercase tracking-wider text-stone-200 font-medium">
                  Recette Étoilée
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-12 lg:mt-16">
          <a
            href="#specialites"
            className="flex flex-col items-center text-stone-500 hover:text-amber-400 transition-colors group"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] mb-1 group-hover:text-amber-400">
              Découvrir la suite
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-amber-500/70" />
          </a>
        </div>
      </div>
    </section>
  );
};
