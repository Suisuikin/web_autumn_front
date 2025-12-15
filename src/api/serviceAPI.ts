import { Service, ServiceResponse } from '../store/types/service.types';
import { ServiceFilter } from '../store/types/filter.types';

interface ApiConfig {
  baseURL: string;
  timeout: number;
}

interface ApiError {
  status: number;
  message: string;
}

class ServiceAPI {
  private baseURL: string;
  private timeout: number;

  constructor(config: ApiConfig) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout;
  }

  /**
   * Получить список услуг с фильтрацией
   * @param filters - объект фильтров
   * @returns Promise<Service[]>
   */
  async getServices(filters: ServiceFilter = {}): Promise<Service[]> {
    const params = new URLSearchParams();
    if (filters.name) params.append('name', filters.name);
    if (filters.priceMin) params.append('price_min', filters.priceMin.toString());
    if (filters.priceMax) params.append('price_max', filters.priceMax.toString());

    try {
      const response = await fetch(
        `${this.baseURL}/services?${params}`,
        { timeout: this.timeout }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: ServiceResponse = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Ошибка загрузки услуг:', error);
      return [];
    }
  }

  /**
   * Получить одну услугу по ID
   */
  async getServiceById(id: number): Promise<Service | null> {
    try {
      const response = await fetch(`${this.baseURL}/services/${id}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Ошибка загрузки услуги:', error);
      return null;
    }
  }

  /**
   * Добавить услугу в заявку
   */
  async addServiceToRequest(serviceId: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/requests/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_id: serviceId }),
      });
      return response.ok;
    } catch (error) {
      console.error('Ошибка добавления услуги:', error);
      return false;
    }
  }
}

// Конфигурация по окружению
const apiConfig: ApiConfig = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
};

export const serviceAPI = new ServiceAPI(apiConfig);
