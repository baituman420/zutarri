export type Language = 'eu' | 'es';

export interface TxalapartaZone {
  id: string;
  number: string;
  name: {
    eu: string;
    es: string;
  };
  subtitle: {
    eu: string;
    es: string;
  };
  sectionId: string;
  description: {
    eu: string;
    es: string;
  };
  makilaPitch: number; // Frequency in Hz for audio synthesis (ttakun vs herrena)
}

export interface MenuItem {
  id: string;
  name: string;
  badge: {
    eu: string;
    es: string;
  };
  description: {
    eu: string;
    es: string;
  };
  notes?: {
    eu: string;
    es: string;
  };
  glutenFree: boolean;
  highlight?: boolean;
  image?: string;
  category?: 'talo' | 'pintxo' | 'postre';
}
