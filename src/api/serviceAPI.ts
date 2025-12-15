import { Service, ServiceResponse } from '../store/types/service.types';
import { ServiceFilter } from '../store/types/filter.types';

interface ApiConfig {
  baseURL: string;
  timeout: number;
}

class ServiceAPI {
  private baseURL: string;

  constructor(config: ApiConfig) {
    this.baseURL = config.baseURL;
  }

  /**
   * Получить список услуг с фильтрацией
   * @param filters - объект фильтров
   * @returns Promise<Service[]>
   */
  async getServices(filters?: ServiceFilter): Promise<Service[]> {
    const params = new URLSearchParams();

    if (filters?.name) params.append('name', filters.name);
    if (filters?.priceMin !== undefined)
      params.append('price_min', filters.priceMin.toString());
    if (filters?.priceMax !== undefined)
      params.append('price_max', filters.priceMax.toString());
    if (filters?.dateFrom) params.append('date_from', filters.dateFrom);
    if (filters?.dateTo) params.append('date_to', filters.dateTo);

    try {
      const response = await fetch(`${this.baseURL}/services?${params.toString()}`);

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
      return (await response.json()) as Service;
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

const apiConfig: ApiConfig = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10),
};

export const serviceAPI = new ServiceAPI(apiConfig);
