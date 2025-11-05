// src/services/api.ts
import type { Cepheid } from '../types/api';
import { MOCK_CEPHEIDS } from './datas';

const prefix = 'http://172.20.10.4:3000/api/v1'

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
  async getCepheids(): Promise<Cepheid[]> {
    try {
      const url = `/cepheid`;
      
      return await apiRequest<Cepheid[]>(url);
    } catch (error) {
      console.warn('Используются mock-данные для цефеид:', error);
      let filtered = MOCK_CEPHEIDS;
      
      return filtered;
    }
  },

  async getCepheidsByFilter(filters: { 
    query?: string;
  }): Promise<Cepheid[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.query) queryParams.append('query', filters.query);
      
      const url = `/cepheid/filter${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      return await apiRequest<Cepheid[]>(url);
    } catch (error) {
      console.warn('Используются mock-данные для фильтрованных цефеид:', error);
      
      // Fallback: фильтрация мок-данных
      let filtered = MOCK_CEPHEIDS;
      
      if (filters?.query) {
        const query = filters.query.toLowerCase();
        filtered = filtered.filter(ceph => 
          ceph.title.toLowerCase().includes(query) ||
          ceph.source.toLowerCase().includes(query) ||
          ceph.period.toString().includes(filters.query!)
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