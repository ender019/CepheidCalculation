// src/services/api.ts
import type { Cepheid } from '../types/api';

const MOCK_CEPHEIDS: Cepheid[] = [
  {
    id: "1",
    title: "Классические цефеиды",
    img: "/img/cepheid1.jpg",
    period: 5.37,
    source: "Хаббл",
    description: "Классические цефеиды — это переменные звёзды, которые используются для измерения расстояний во Вселенной благодаря четкой зависимости период-светимость.",
    mv: 15.5,
    asw: -3.5,
    distance: 750000
  },
  {
    id: "2",
    title: "Цефея V2",
    img: "/img/cepheid2.jpg",
    period: 3.82,
    source: "Хаббл",
    description: "Цефеида в галактике Треугольника с хорошо изученными характеристиками.",
    mv: 16.2,
    asw: -3.2,
    distance: 850000
  },
  {
    id: "3", 
    title: "Дельта Цефея",
    img: "/img/cepheid3.jpg",
    period: 5.366,
    source: "ESO",
    description: "Прототип цефеид, используемый для калибровки шкалы расстояний.",
    mv: 3.5,
    asw: -3.9,
    distance: 887
  }
];

const prefix = '/api/v1'

// Базовые функции для работы с API
const apiRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const defaultOptions: RequestInit = {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(`${prefix}${url}`, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.warn('API request failed, using mock data:', error);
    throw error; // Пробрасываем ошибку для обработки в сервисах
  }
};

// Сервис для работы с цефеидами
export const cepheidService = {
  async getCepheids(filters?: { 
    query?: string;
  }): Promise<Cepheid[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.query) queryParams.append('query', filters.query);
      
      const url = `/cepheid${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      return await apiRequest<Cepheid[]>(url);
    } catch (error) {
      console.warn('Используются mock-данные для цефеид:', error);
      let filtered = MOCK_CEPHEIDS;
      
      if (filters?.query) {
        filtered = filtered.filter(ceph => 
          ceph.title.toLowerCase().includes(filters.query!.toLowerCase()) ||
          (ceph.description && ceph.description.toLowerCase().includes(filters.query!.toLowerCase()))
        );
      }
      
      return filtered;
    }
  },

  async getCepheidById(id: string): Promise<Cepheid> {
    try {
      return await apiRequest<Cepheid>(`/cepheid/${id}`);
    } catch (error) {
      console.warn('Используются mock-данные для цефеиды:', error);
      return MOCK_CEPHEIDS.find(ceph => ceph.id === id) || MOCK_CEPHEIDS[0];
    }
  }
};