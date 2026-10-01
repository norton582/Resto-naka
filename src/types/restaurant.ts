export type DietaryTag = 'vegetarien' | 'sans-gluten' | 'halal' | 'signature' | 'nouveau' | 'coup-de-coeur';

export interface MenuItem {
  id: string;
  name: string;
  category: 'entrees' | 'signatures' | 'plats' | 'desserts' | 'boissons';
  categoryLabel: string;
  description: string;
  price: number;
  image?: string;
  tags?: DietaryTag[];
  badgeNumber?: number; // 1, 2, 3 for specialties
  spicyLevel?: number; // 0 to 3
  pairing?: string; // Wine or beverage recommendation
}

export type SeatingArea = 'salle_principale' | 'terrasse' | 'lounge_nakay' | 'table_chef';

export type OccasionType = 'repas_romantique' | 'anniversaire' | 'affaires' | 'famille' | 'autre';

export interface Reservation {
  id: string;
  reference: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  guests: number;
  seatingArea: SeatingArea;
  occasion?: OccasionType;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  status: 'confirmee' | 'en_attente' | 'annulee';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  source: string;
}
