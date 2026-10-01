import React from 'react';
import { REVIEWS } from '../data/restaurantData';
import { Star, Quote, Award } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="avis" className="py-20 lg:py-24 bg-[#0a0807] relative border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-500 text-xs uppercase tracking-[0.25em] font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Témoignages & Guides</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury text-stone-100">
            Ce Qu'en Disent Nos Convives
          </h2>

          <p className="text-stone-400 text-xs sm:text-sm font-light">
            Une table reconnue pour son accueil feutré et l'harmonie de ses saveurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#120f0d] border border-stone-800/90 hover:border-amber-900/40 p-7 rounded-xl flex flex-col justify-between shadow-lg relative group transition-all"
            >
              <Quote className="w-8 h-8 text-amber-500/20 absolute top-5 right-5 group-hover:text-amber-500/30 transition-colors" />

              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed italic font-light">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-6 border-t border-stone-800/70 mt-6 flex items-center justify-between text-xs">
                <div>
                  <span className="font-serif-luxury text-stone-100 text-base font-medium block">
                    {review.author}
                  </span>
                  <span className="text-[11px] text-stone-500">{review.role}</span>
                </div>
                <span className="text-[10px] text-amber-500/90 font-mono">{review.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
