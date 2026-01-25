export enum ActivityType {
  MEAL = 'MEAL',
  NAP = 'NAP',
  PLAY = 'PLAY',
  LEARNING = 'LEARNING',
  BATHROOM = 'BATHROOM',
  CHECKIN = 'CHECKIN',
  CHECKOUT = 'CHECKOUT'
}

export interface Child {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // YYYY-MM-DD
  allergies: string;
  photoUrl: string;
  group: string; // e.g., "Toddlers", "Preschool"
  email?: string;
  phoneNumber?: string;
}

export interface ActivityLog {
  id: string;
  childId: string;
  type: ActivityType;
  timestamp: string; // ISO string
  description: string;
  details?: string; // e.g., "Ate 100%", "2 hours"
  imageUrl?: string;
}

export interface MilestoneMetric {
  date: string;
  score: number; // 0-100 scale of developmental progress
  category: 'Motor' | 'Social' | 'Language' | 'Cognitive';
}

export interface AITip {
  title: string;
  content: string;
}