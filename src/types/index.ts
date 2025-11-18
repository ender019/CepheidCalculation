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

export interface Breadcrumb {
  label: string;
  path?: string;
}