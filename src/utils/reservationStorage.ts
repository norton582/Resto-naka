import { Reservation } from '../types/restaurant';

const STORAGE_KEY = 'gourmande_nakay_reservations';

export const getStoredReservations = (): Reservation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed initial sample reservation
      const initial: Reservation[] = [
        {
          id: 'res-sample-1',
          reference: 'GN-48291',
          date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
          time: '20:00',
          guests: 2,
          seatingArea: 'salle_principale',
          occasion: 'repas_romantique',
          fullName: 'Claire Dupont',
          email: 'claire.dupont@example.com',
          phone: '+33 6 12 34 56 78',
          specialRequests: 'Table au calme près de la fenêtre si possible.',
          status: 'confirmee',
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveNewReservation = (data: Omit<Reservation, 'id' | 'reference' | 'status' | 'createdAt'>): Reservation => {
  const current = getStoredReservations();
  const id = 'res_' + Math.random().toString(36).substring(2, 9);
  const reference = 'GN-' + Math.floor(10000 + Math.random() * 90000);
  
  const newReservation: Reservation = {
    ...data,
    id,
    reference,
    status: 'confirmee',
    createdAt: new Date().toISOString(),
  };

  const updated = [newReservation, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save reservation to local storage', e);
  }
  return newReservation;
};

export const cancelStoredReservation = (id: string): boolean => {
  try {
    const current = getStoredReservations();
    const updated = current.map(item => item.id === id ? { ...item, status: 'annulee' as const } : item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch {
    return false;
  }
};

export const downloadReservationICS = (res: Reservation) => {
  const [year, month, day] = res.date.split('-').map(Number);
  const [hour, minute] = res.time.split(':').map(Number);

  const start = new Date(year, month - 1, day, hour, minute);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2 hours

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Gourmande Nakay//Table Reservation//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:Réservation Gourmande Nakay (${res.guests} pers.)`,
    `DESCRIPTION:Réservation confirmée pour ${res.fullName}. Réf: ${res.reference}. Salle: ${res.seatingArea}. Téléphone restaurant: +33 1 42 68 55 00.`,
    'LOCATION:Gourmande Nakay, 28 Rue de la Paix, 75002 Paris',
    `DTSTART:${formatDate(start)}`,
    `DTEND:${formatDate(end)}`,
    `UID:${res.reference}@gourmande-nakay.com`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `reservation-${res.reference}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
