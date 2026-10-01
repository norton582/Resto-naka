/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Specialties } from './components/Specialties';
import { MenuSection } from './components/MenuSection';
import { ChefStory } from './components/ChefStory';
import { ReservationSection } from './components/ReservationSection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { MyReservationsModal } from './components/MyReservationsModal';
import { DishDetailModal } from './components/DishDetailModal';
import { MenuItem, Reservation } from './types/restaurant';
import { getStoredReservations, cancelStoredReservation } from './utils/reservationStorage';
import { Calendar, Phone, CheckCircle2, BookmarkCheck } from 'lucide-react';
import { RESTAURANT_INFO } from './data/restaurantData';

export default function App() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isMyReservationsOpen, setIsMyReservationsOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  // Load reservations from storage on mount
  useEffect(() => {
    const list = getStoredReservations();
    setReservations(list);
  }, []);

  // Track scroll for floating mobile CTA
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleReservationSuccess = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
    showToast(`Table confirmée ! Réf: ${newRes.reference} pour le ${newRes.date} à ${newRes.time}`);
  };

  const handleCancelReservation = (id: string) => {
    const ok = cancelStoredReservation(id);
    if (ok) {
      setReservations(getStoredReservations());
      showToast('Votre réservation a bien été annulée.');
    }
  };

  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToReservation = () => {
    const resEl = document.getElementById('reservation');
    if (resEl) {
      resEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsReservationModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-200 font-sans-clean selection:bg-amber-600 selection:text-white relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-sm p-4 bg-stone-900/95 border border-amber-500/60 rounded-xl shadow-2xl text-stone-100 text-xs flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="flex-1 font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        onOpenReservation={() => setIsReservationModalOpen(true)}
        onOpenMyReservations={() => setIsMyReservationsOpen(true)}
        reservationsCount={reservations.filter((r) => r.status !== 'annulee').length}
      />

      <main>
        {/* Hero Section matching the uploaded design */}
        <Hero
          onOpenReservation={scrollToReservation}
          onExploreMenu={scrollToMenu}
        />

        {/* 3 Featured Specialties with 1, 2, 3 numbering badges */}
        <Specialties
          onSelectDish={(dish) => setSelectedDish(dish)}
          onOpenReservation={scrollToReservation}
        />

        {/* Complete Gastronomic Menu */}
        <MenuSection
          onSelectDish={(dish) => setSelectedDish(dish)}
          onOpenReservation={scrollToReservation}
        />

        {/* Chef Philosophy & Homemade Cuisine */}
        <ChefStory
          onOpenReservation={scrollToReservation}
        />

        {/* Interactive In-Page Reservation System */}
        <ReservationSection
          onReservationSuccess={handleReservationSuccess}
          onOpenMyReservations={() => setIsMyReservationsOpen(true)}
        />

        {/* Guest Reviews & Press */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer
        onOpenReservation={scrollToReservation}
      />

      {/* Quick Floating Action for Mobile & Tablet */}
      {showFloatingCTA && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-30 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-2 max-w-md ml-auto">
            <button
              onClick={() => setIsMyReservationsOpen(true)}
              className="p-3 bg-stone-900/90 backdrop-blur-md border border-stone-700 text-amber-400 rounded-full shadow-xl hover:bg-stone-800 transition-colors cursor-pointer"
              title="Mes réservations"
              aria-label="Mes réservations"
            >
              <BookmarkCheck className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsReservationModalOpen(true)}
              className="flex-1 sm:flex-initial px-5 py-3.5 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-stone-950 font-bold uppercase tracking-wider text-xs rounded-full shadow-2xl shadow-black border border-amber-400/50 flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-stone-950" />
              <span>Réserver une table</span>
            </button>
          </div>
        </div>
      )}

      {/* Reservation Modal Dialog */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        onReservationSuccess={handleReservationSuccess}
        onOpenMyReservations={() => setIsMyReservationsOpen(true)}
      />

      {/* My Reservations Management Modal */}
      <MyReservationsModal
        isOpen={isMyReservationsOpen}
        onClose={() => setIsMyReservationsOpen(false)}
        reservations={reservations}
        onCancelReservation={handleCancelReservation}
        onOpenNewBooking={() => {
          setIsMyReservationsOpen(false);
          setIsReservationModalOpen(true);
        }}
      />

      {/* Dish Detail Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onOpenReservation={() => {
          setSelectedDish(null);
          scrollToReservation();
        }}
      />
    </div>
  );
}
