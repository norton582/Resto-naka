import React, { useState } from 'react';
import { Reservation } from '../types/restaurant';
import { SEATING_AREAS, RESTAURANT_INFO } from '../data/restaurantData';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MapPin, 
  Download, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Phone
} from 'lucide-react';
import { downloadReservationICS } from '../utils/reservationStorage';

interface MyReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onCancelReservation: (id: string) => void;
  onOpenNewBooking: () => void;
}

export const MyReservationsModal: React.FC<MyReservationsModalProps> = ({
  isOpen,
  onClose,
  reservations,
  onCancelReservation,
  onOpenNewBooking,
}) => {
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeReservations = reservations.filter((r) => r.status !== 'annulee');
  const pastOrCancelled = reservations.filter((r) => r.status === 'annulee');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#120f0d] border border-stone-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-[#161310]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-semibold block">
              Espace Client
            </span>
            <h3 className="font-serif-luxury text-2xl text-stone-100">
              Mes Réservations Gourmande Nakay
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {reservations.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <CalendarIcon className="w-12 h-12 text-stone-600 mx-auto" />
              <p className="text-stone-300 text-sm">Vous n'avez aucune réservation enregistrée pour le moment.</p>
              <button
                onClick={() => {
                  onClose();
                  onOpenNewBooking();
                }}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs uppercase font-bold tracking-wider cursor-pointer"
              >
                Réserver une table maintenant
              </button>
            </div>
          ) : (
            <>
              {/* Active Reservations */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-400 uppercase tracking-wider font-semibold">
                  <span>Réservations Confirmées ({activeReservations.length})</span>
                </div>

                {activeReservations.length === 0 ? (
                  <p className="text-xs text-stone-500 italic">Aucune réservation active en cours.</p>
                ) : (
                  activeReservations.map((res) => {
                    const areaLabel = SEATING_AREAS.find((s) => s.id === res.seatingArea)?.label;
                    return (
                      <div
                        key={res.id}
                        className="p-5 bg-[#171411] border border-amber-900/30 rounded-xl space-y-4 hover:border-amber-500/40 transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="font-serif-luxury text-lg text-stone-100 font-semibold">
                              Table pour {res.guests} {res.guests > 1 ? 'convives' : 'personne'}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-mono font-medium rounded">
                            Réf: {res.reference}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-300">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-3.5 h-3.5 text-amber-500" />
                            <span>{res.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                            <span>{res.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-amber-500" />
                            <span>{areaLabel}</span>
                          </div>
                        </div>

                        {res.specialRequests && (
                          <div className="text-[11px] text-stone-400 italic bg-[#1f1a16] p-2.5 rounded border border-stone-800">
                            Notes : "{res.specialRequests}"
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                          <button
                            onClick={() => downloadReservationICS(res)}
                            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer font-medium"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Télécharger .ics</span>
                          </button>

                          {confirmCancelId === res.id ? (
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-red-400">Annuler vraiment ?</span>
                              <button
                                onClick={() => {
                                  onCancelReservation(res.id);
                                  setConfirmCancelId(null);
                                }}
                                className="px-2.5 py-1 bg-red-800 hover:bg-red-700 text-white text-[11px] font-bold rounded cursor-pointer"
                              >
                                Oui
                              </button>
                              <button
                                onClick={() => setConfirmCancelId(null)}
                                className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] rounded cursor-pointer"
                              >
                                Non
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmCancelId(res.id)}
                              className="text-xs text-stone-500 hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Annuler cette table</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Cancelled history if any */}
              {pastOrCancelled.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-stone-800">
                  <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold block">
                    Historique / Annulées ({pastOrCancelled.length})
                  </span>
                  {pastOrCancelled.map((res) => (
                    <div
                      key={res.id}
                      className="p-3 bg-stone-900/40 border border-stone-800/50 rounded-lg text-xs text-stone-500 flex items-center justify-between"
                    >
                      <div>
                        <span>{res.date} à {res.time} · {res.guests} pers.</span>
                        <span className="block text-[10px] text-stone-600">Réf: {res.reference}</span>
                      </div>
                      <span className="text-stone-500 text-[11px]">Annulée</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#161310] border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            <span>Besoin d'assistance ? {RESTAURANT_INFO.phone}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenNewBooking();
            }}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
          >
            + Nouvelle réservation
          </button>
        </div>
      </div>
    </div>
  );
};
