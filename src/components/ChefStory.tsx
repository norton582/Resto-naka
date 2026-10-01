import React from 'react';
import { RESTAURANT_IMAGES } from '../data/restaurantData';
import { ShieldCheck, Heart, Sparkles, Award } from 'lucide-react';

interface ChefStoryProps {
  onOpenReservation: () => void;
}

export const ChefStory: React.FC<ChefStoryProps> = ({ onOpenReservation }) => {
  return (
    <section id="histoire" className="py-20 lg:py-28 bg-[#090807] relative border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title matching reference "- Fait Maison..." */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.28em] text-amber-500 font-semibold block mb-2">
            Authenticité & Rigueur
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury text-stone-100 italic">
            Fait Maison & Philosophie Nakay
          </h2>
        </div>

        {/* 3-column / asymmetric layout from screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Text Card (Dark framed card like in the reference) */}
          <div className="lg:col-span-5 bg-[#120f0d] border border-amber-900/30 p-8 sm:p-10 rounded-xl flex flex-col justify-between shadow-xl shadow-black/80">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-600/10 border border-amber-500/30">
                  <Award className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-2xl text-stone-100">
                    L'Excellence du Geste
                  </h3>
                  <p className="text-[11px] text-amber-400/90 uppercase tracking-widest">
                    Une cuisine engagée et vivante
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                <p>
                  Chez <strong className="text-amber-300 font-medium">Gourmande Nakay</strong>, chaque recette est le fruit d’un travail artisanal méticuleux. Tous nos jus sont réduits pendant 36 heures, nos poissons levés à la commande et nos sauces préparées au gré des arrivages matinaux.
                </p>
                <p>
                  Notre philosophie puise sa force dans le respect absolu de la saisonnalité : des producteurs bio d’Île-de-France aux épices rares sourcées directement auprès de coopératives éthiques.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-stone-800 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>100% de nos plats cuisinés sur place dans nos ateliers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-amber-500" />
                  <span>Circuit court & respect du bien-être animal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Cuisine ouverte et brigade d'expérience</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onOpenReservation}
                className="w-full py-3 bg-stone-900 hover:bg-amber-600 hover:text-stone-950 text-stone-200 border border-amber-500/40 text-xs uppercase tracking-widest transition-all font-semibold cursor-pointer"
              >
                Vivre l'Expérience en Salle
              </button>
            </div>
          </div>

          {/* Middle Photo Card (Dish focus) */}
          <div className="lg:col-span-3 rounded-xl overflow-hidden border border-stone-800 relative group min-h-[320px] bg-[#120f0d]">
            <img
              src={RESTAURANT_IMAGES.dishMeatballs}
              alt="Bouchées gourmandes"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
                Texture & Saveur
              </span>
              <h4 className="font-serif-luxury text-stone-100 text-lg">
                Cuisson Basse Température
              </h4>
              <p className="text-[11px] text-stone-400">
                Moelleux incomparable et sucs concentrés.
              </p>
            </div>
          </div>

          {/* Right Photo Card (Ambiance or Salad) */}
          <div className="lg:col-span-4 rounded-xl overflow-hidden border border-stone-800 relative group min-h-[320px] bg-[#120f0d]">
            <img
              src={RESTAURANT_IMAGES.ambiance}
              alt="Ambiance Gourmande Nakay"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
                Atmosphère Feutrée
              </span>
              <h4 className="font-serif-luxury text-stone-100 text-lg">
                Un Écrin Élégant & Chaleureux
              </h4>
              <p className="text-[11px] text-stone-400">
                Lumières tamisées et service bienveillant pour vos moments précieux.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
