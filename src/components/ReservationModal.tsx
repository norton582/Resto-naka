import React from 'react';
import { ReservationSection } from './ReservationSection';
import { Reservation } from '../types/restaurant';
import { X } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReservationSuccess: (res: Reservation) => void;
  onOpenMyReservations: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onReservationSuccess,
  onOpenMyReservations,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl my-auto">
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 sm:-right-2 p-2 text-stone-400 hover:text-stone-100 bg-stone-900 border border-stone-800 rounded-full transition-colors cursor-pointer z-10"
          aria-label="Fermer la réservation"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <ReservationSection
            onReservationSuccess={(res) => {
              onReservationSuccess(res);
            }}
            onOpenMyReservations={() => {
              onClose();
              onOpenMyReservations();
            }}
          />
        </div>
      </div>
    </div>
  );
};
