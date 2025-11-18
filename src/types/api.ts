// src/types/index.ts
export interface Cepheid {
  id: string;
  title: string;
  img: string;
  period: number;
  source: string;
  description?: string;
  mv?: number;
  asw?: number;
  distance?: number;
}

export interface CepheidCalc {
  id: string;
  created_at: string;
  ka: number;
  kb: number;
  items: Cepheid[];
  approved_at?: string;
  closed_at?: string;
}

export interface CepheidCalcListResponse {
  id: string;
  created_at: string;
  ka: number;
  kb: number;
  status?: string;
  approved_at?: string;
  closed_at?: string;
}