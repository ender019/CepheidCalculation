// src/services/api.ts
import type { Cepheid, CepheidCalc, CepheidCalcListResponse } from '../types/api';
import { MOCK_CEPHEIDS, MOCK_CEPHEID_CALC } from './datas';

const prefix = 'https://192.168.1.216:3000/api/v1'
// const prefix = '/api/v1'

// Базовые функции для работы с API
const apiRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const defaultOptions: RequestInit = {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log("request");
  

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
  },
};

// Сервис для работы с расчетами цефеид
export const cepheidCalcService = {
  async getCepheidCalcs(filters?: {
    status?: number;
    start?: string;
    end?: string;
  }): Promise<CepheidCalcListResponse[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.status) queryParams.append('status', filters.status.toString());
      if (filters?.start) queryParams.append('start', filters.start);
      if (filters?.end) queryParams.append('end', filters.end);

      const url = `/cepheid_calc${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      return await apiRequest<CepheidCalcListResponse[]>(url);
    } catch (error) {
      console.warn('Используются mock-данные для расчетов:', error);
      return [{
        id: "1",
        created_at: "2024-01-15",
        ka: -2.81,
        kb: -1.43
      }];
    }
  },

  async getCepheidCalcById(id: string): Promise<CepheidCalc> {
    try {
      return await apiRequest<CepheidCalc>(`/cepheid_calc/${id}`);
    } catch (error) {
      console.warn('Используются mock-данные для расчета:', error);
      return MOCK_CEPHEID_CALC;
    }
  },

  async getLastDraftCalc(): Promise<{ cepheid_calc_id: number; item_count: number }> {
    try {
      return await apiRequest<{ cepheid_calc_id: number; item_count: number }>('/cepheid_calc/last');
    } catch (error) {
      console.warn('Используются mock-данные для последнего расчета:', error);
      return { cepheid_calc_id: 1, item_count: 2 };
    }
  },

  async updateCepheidCalc(id: string, data: { ka: number; kb: number }): Promise<void> {
    try {
      await apiRequest(`/cepheid_calc/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn('Не удалось обновить расчет:', error);
      throw error;
    }
  }
};
