// src/types/index.ts
export interface ChronoLayer {
  id: number;
  name: string;
  description?: string;
  fromYear?: number;
  toYear?: number;
  image?: string;
}

export interface Order {
  requestId: string;
  requestStatus: 'draft' | 'processing' | 'completed' | 'closed' | 'rejected';
  randomLayers?: Array<{
    name: string;
    fromYear: number;
    toYear: number;
  }>;
}

export interface AnalysisResult {
  text: string;
  period: string;
  layers: ChronoLayer[];
}
