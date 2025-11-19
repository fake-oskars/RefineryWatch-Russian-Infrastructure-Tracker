
export const RefineryStatus = {
  OPERATIONAL: 'Operational',
  DAMAGED: 'Damaged',
  OFFLINE: 'Offline', // Significantly destroyed or completely stopped
  UNKNOWN: 'Unknown'
} as const;

export type RefineryStatus = typeof RefineryStatus[keyof typeof RefineryStatus];

export interface Refinery {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: RefineryStatus;
  description: string;
  lastIncidentDate?: string; // ISO string or approximate "March 2024"
  capacity?: string; // e.g., "Barrels per day" if available
  incidentVideoUrls?: string[]; // Array of URLs to X.com/Twitter posts with video
}

export interface RefineryUpdate {
  id: string;
  status: RefineryStatus;
  lastIncidentDate?: string;
  description: string;
  incidentVideoUrls?: string[];
}

export interface Pipeline {
  id: string;
  name: string;
  type: 'oil' | 'gas';
  coordinates: [number, number][]; // Array of [lat, lng]
  status: 'operational' | 'suspended' | 'destroyed';
}

export interface MapViewState {
  lat: number;
  lng: number;
  zoom: number;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface AppState {
  refineries: Refinery[];
  isLoading: boolean;
  lastUpdated: Date | null;
  selectedRefineryId: string | null;
  error: string | null;
  aiReport: string | null;
  groundingChunks: GroundingChunk[] | null;
}
