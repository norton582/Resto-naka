import React, { useState } from 'react';
import { 
  Users, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  ArrowRight, 
  ShieldCheck, 
  ChevronRight,
  Heart,
  Wine,
  UtensilsCrossed
} from 'lucide-react';
import { SEATING_AREAS } from '../data/restaurantData';
import { SeatingArea, OccasionType, Reservation } from '../types/restaurant';
import { saveNewReservation, downloadReservationICS } from '../utils/reservationStorage';

interface ReservationSectionProps {
  onReservationSuccess?: (res: Reservation) => void;
  onOpenMyReservations?: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationSuccess,
  onOpenMyReservations,
}) => {
  // Today date formatted YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Form State
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>(() => {
    // default to tomorrow
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('20:00');
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('salle_principale');
  const [occasion, setOccasion] = useState<OccasionType>('repas_romantique');
  
  // Guest fields
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  // UI Steps: 1: Choix & Créneau, 2: Vos Coordonnées, 3: Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Time slots config
  const lunchSlots = ['12:00', '12:30', '13:00', '13:30', '14:00'];
  const dinnerSlots = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];

  // Check if date is Monday (restaurant closed for public)
  const isMonday = new Date(date).getDay() === 1;

  const handleQuickDate = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    setDate(d.toISOString().split('T')[0]);
  };

  const handleGoToContact = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (isMonday) {
      setErrorMessage('Le restaurant est fermé le lundi. Veuillez choisir un autre jour du mardi au dimanche.');
      return;
    }
    if (!timeSlot) {
      setErrorMessage('Veuillez sélectionner un horaire de service.');
      return;
    }
    setStep(2);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Veuillez renseigner votre nom complet.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Veuillez saisir une adresse email valide.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMessage('Veuillez saisir un numéro de téléphone valide pour la confirmation.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newRes = saveNewReservation({
        date,
        time: timeSlot,
        guests,
        seatingArea,
        occasion,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        specialRequests: specialRequests.trim(),
      });

      setConfirmedReservation(newRes);
      setIsSubmitting(false);
      setStep(3);

      if (onReservationSuccess) {
        onReservationSuccess(newRes);
      }
    }, 600);
  };

  const handleReset = () => {
    setStep(1);
    setConfirmedReservation(null);
    setErrorMessage('');
  };

  return (
    <section id="reservation" className="py-20 lg:py-28 bg-[#0a0807] relative scroll-mt-10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-500 text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Réservation Instantanée</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury text-stone-100">
            Réserver Votre Table
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm font-light">
            Confirmation immédiate garantie. Aucun acompte requis pour les tables jusqu'à 6 personnes.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-stone-800 -z-0" />
            
            {/* Step 1 */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= 1 ? 'bg-amber-600 text-stone-950 ring-4 ring-amber-950/80' : 'bg-stone-800 text-stone-400'
              }`}>
                1
              </div>
              <span className="text-[11px] uppercase tracking-wider text-stone-300 mt-1.5 font-medium">Table & Date</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= 2 ? 'bg-amber-600 text-stone-950 ring-4 ring-amber-950/80' : 'bg-stone-800 text-stone-400'
              }`}>
                2
              </div>
              <span className="text-[11px] uppercase tracking-wider text-stone-300 mt-1.5 font-medium">Coordonnées</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === 3 ? 'bg-emerald-500 text-stone-950 ring-4 ring-emerald-950/80' : 'bg-stone-800 text-stone-400'
              }`}>
                3
              </div>
              <span className="text-[11px] uppercase tracking-wider text-stone-300 mt-1.5 font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-[#120f0d] border border-stone-800 rounded-2xl p-6 sm:p-10 shadow-2xl shadow-black/80 relative">
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-950/50 border border-red-800/80 rounded-lg text-red-200 text-xs flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: GUESTS, DATE, TIME, SEATING AREA */}
          {step === 1 && (
            <form onSubmit={handleGoToContact} className="space-y-8">
              {/* Number of Guests */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
                  1. Nombre de personnes
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                        guests === num
                          ? 'bg-amber-600 text-stone-950 shadow-lg shadow-amber-950/60 scale-[1.02]'
                          : 'bg-[#181512] text-stone-300 hover:bg-[#201c18] border border-stone-800'
                      }`}
                    >
                      {num} {num === 1 ? 'pers.' : 'pers.'}
                    </button>
                  ))}
                </div>
                {guests >= 7 && (
                  <p className="text-[11px] text-amber-500/90 mt-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pour les grandes tablées, nous vous préparons une disposition d'exception.</span>
                  </p>
                )}
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
                  2. Date de votre venue
                </label>

                {/* Quick Date Pills */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleQuickDate(0)}
                    className="text-xs px-3 py-1.5 bg-[#181512] hover:bg-stone-800 border border-stone-800 text-stone-300 transition-colors cursor-pointer"
                  >
                    Aujourd'hui
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDate(1)}
                    className="text-xs px-3 py-1.5 bg-[#181512] hover:bg-stone-800 border border-stone-800 text-stone-300 transition-colors cursor-pointer"
                  >
                    Demain
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDate(2)}
                    className="text-xs px-3 py-1.5 bg-[#181512] hover:bg-stone-800 border border-stone-800 text-stone-300 transition-colors cursor-pointer"
                  >
                    Après-demain
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDate(5)}
                    className="text-xs px-3 py-1.5 bg-[#181512] hover:bg-stone-800 border border-stone-800 text-stone-300 transition-colors cursor-pointer"
                  >
                    Ce week-end
                  </button>
                </div>

                <div className="relative max-w-sm">
                  <input
                    type="date"
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#181512] border border-stone-800 focus:border-amber-500/80 text-stone-100 text-sm px-4 py-3 rounded-lg outline-none cursor-pointer"
                  />
                  <CalendarIcon className="w-4 h-4 text-stone-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {isMonday && (
                  <p className="text-xs text-rose-400 mt-2 font-medium">
                    ⚠️ Le restaurant est fermé le lundi. Merci de sélectionner une date du mardi au dimanche.
                  </p>
                )}
              </div>

              {/* Service & Time Slots */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
                  3. Service & Heure d'arrivée
                </label>

                <div className="space-y-4">
                  {/* Lunch Slots */}
                  <div>
                    <span className="text-xs text-stone-400 mb-2 block font-medium">
                      ☀️ Déjeuner (12h00 - 14h30)
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {lunchSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            timeSlot === slot
                              ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                              : 'bg-[#181512] text-stone-300 hover:bg-[#221e1a] border border-stone-800'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dinner Slots */}
                  <div>
                    <span className="text-xs text-stone-400 mb-2 block font-medium">
                      🌙 Dîner Gastronomique (19h00 - 23h00)
                    </span>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {dinnerSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`py-2.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            timeSlot === slot
                              ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                              : 'bg-[#181512] text-stone-300 hover:bg-[#221e1a] border border-stone-800'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Seating Area Preference */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
                  4. Espace souhaité
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SEATING_AREAS.map((area) => (
                    <div
                      key={area.id}
                      onClick={() => setSeatingArea(area.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        seatingArea === area.id
                          ? 'border-amber-500 bg-amber-950/20 shadow-md shadow-amber-950/30 ring-1 ring-amber-500/40'
                          : 'border-stone-800 bg-[#161310] hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif-luxury text-base text-stone-100 font-medium">
                          {area.label}
                        </span>
                        {seatingArea === area.id && (
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-stone-400 font-light">{area.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50 hover:brightness-110 active:scale-98 transition-all cursor-pointer"
                >
                  <span>Continuer vers vos coordonnées</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: GUEST CONTACT & SPECIAL OCCASIONS */}
          {step === 2 && (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              {/* Recap Bar */}
              <div className="p-4 bg-[#181512] border border-amber-900/40 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs text-stone-300">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Convives</span>
                    <span className="font-semibold text-amber-300">{guests} personnes</span>
                  </div>
                  <div className="border-l border-stone-800 pl-4">
                    <span className="text-stone-500 block text-[10px] uppercase">Date & Heure</span>
                    <span className="font-semibold text-amber-300">{date} à {timeSlot}</span>
                  </div>
                  <div className="hidden sm:block border-l border-stone-800 pl-4">
                    <span className="text-stone-500 block text-[10px] uppercase">Espace</span>
                    <span className="font-semibold text-stone-200">
                      {SEATING_AREAS.find((s) => s.id === seatingArea)?.label}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-amber-400 hover:underline text-xs cursor-pointer font-medium"
                >
                  Modifier
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-1.5">
                    Nom et Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Alexandre Laurent"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#181512] border border-stone-800 focus:border-amber-500 text-stone-100 text-sm px-4 py-3 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-1.5">
                    Téléphone mobile * (Confirmation SMS)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: +33 6 12 34 56 78"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#181512] border border-stone-800 focus:border-amber-500 text-stone-100 text-sm px-4 py-3 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-1.5">
                  Adresse Email * (Envoi du bon de réservation)
                </label>
                <input
                  type="email"
                  required
                  placeholder="alexandre@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#181512] border border-stone-800 focus:border-amber-500 text-stone-100 text-sm px-4 py-3 rounded-lg outline-none"
                />
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-1.5">
                  Occasion particulière (optionnel)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'repas_romantique', label: 'Tête-à-tête' },
                    { id: 'anniversaire', label: 'Anniversaire' },
                    { id: 'affaires', label: 'Repas d’affaires' },
                    { id: 'famille', label: 'Famille / Amis' },
                  ].map((occ) => (
                    <button
                      key={occ.id}
                      type="button"
                      onClick={() => setOccasion(occ.id as OccasionType)}
                      className={`py-2 px-3 text-xs rounded-lg transition-colors cursor-pointer border ${
                        occasion === occ.id
                          ? 'border-amber-500 bg-amber-950/30 text-amber-300 font-medium'
                          : 'border-stone-800 bg-[#181512] text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {occ.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-1.5">
                  Régimes alimentaires, allergies ou demandes spécifiques
                </label>
                <textarea
                  rows={3}
                  placeholder="Ex: 1 convive sans gluten, préférence pour table en retrait, chaise haute pour enfant..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#181512] border border-stone-800 focus:border-amber-500 text-stone-100 text-sm px-4 py-3 rounded-lg outline-none resize-none"
                />
              </div>

              {/* Terms and Submit */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-stone-400 hover:text-stone-200 uppercase tracking-wider cursor-pointer"
                >
                  ← Retour à l'étape précédente
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-stone-950 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-amber-950/60 hover:brightness-110 active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Confirmation en cours...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-stone-950" />
                      <span>Confirmer ma réservation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: BOOKING CONFIRMATION & CALENDAR EXPORT */}
          {step === 3 && confirmedReservation && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold block">
                  Table Réservée avec Succès
                </span>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-stone-100">
                  Merci, {confirmedReservation.fullName} !
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm max-w-md mx-auto">
                  Votre réservation est enregistrée sous la référence{' '}
                  <strong className="text-amber-400 font-mono tracking-wider font-bold">
                    {confirmedReservation.reference}
                  </strong>
                  . Un récapitulatif a été préparé pour votre venue.
                </p>
              </div>

              {/* Summary Card */}
              <div className="max-w-md mx-auto p-5 bg-[#181512] border border-amber-900/30 rounded-xl text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Date & Heure :</span>
                  <span className="font-semibold text-amber-300">
                    {confirmedReservation.date} à {confirmedReservation.time}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Nombre d'invités :</span>
                  <span className="font-semibold text-stone-200">
                    {confirmedReservation.guests} personnes
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Espace attribué :</span>
                  <span className="font-semibold text-stone-200">
                    {SEATING_AREAS.find((s) => s.id === confirmedReservation.seatingArea)?.label}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Contact :</span>
                  <span className="text-stone-300">
                    {confirmedReservation.phone}
                  </span>
                </div>
                {confirmedReservation.specialRequests && (
                  <div className="pt-1">
                    <span className="text-stone-400 block mb-0.5">Demande spéciale :</span>
                    <span className="text-stone-300 italic">"{confirmedReservation.specialRequests}"</span>
                  </div>
                )}
              </div>

              {/* Action Buttons: Add to Calendar, View Saved Bookings, New Booking */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => downloadReservationICS(confirmedReservation)}
                  className="w-full sm:w-auto px-5 py-3 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/40 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Ajouter à mon agenda (.ics)</span>
                </button>

                {onOpenMyReservations && (
                  <button
                    onClick={onOpenMyReservations}
                    className="w-full sm:w-auto px-5 py-3 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Voir mes réservations</span>
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs uppercase tracking-wider font-bold cursor-pointer transition-colors"
                >
                  Réserver une autre date
                </button>
              </div>

              <div className="text-[11px] text-stone-500 pt-2 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500/80" />
                <span>Une question ou modification ? Contactez-nous au 01 42 68 55 00</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
