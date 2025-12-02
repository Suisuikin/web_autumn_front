// src/services/api.ts

import MockApiClient from './mockApi';

const USE_MOCK = true;

const API_BASE = 'http://localhost:8080/api';

interface Layer {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  from_year: number;
  to_year: number;
  words: string;
  status: string;
}

interface ResearchRequest {
  id: number;
  status: string;
  created_at: string;
  formed_at?: string;
  completed_at?: string;
  user_id: number;
  moderator_id?: number;
  text_for_analysis?: string;
  purpose?: string;
  result_from_year?: number;
  result_to_year?: number;
  matched_layers?: number;
  layers?: Layer[];
}

interface CartIcon {
  chrono_id?: number;
  count: number;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('authtoken');
  }

  private getHeaders(includeAuth = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  private async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE}${endpoint}`;

    // Нормально мёрджим базовые заголовки и переданные извне
    const defaultHeaders = this.getHeaders();
    const mergedHeaders: HeadersInit = {
      ...defaultHeaders,
      ...(options.headers || {}),
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: mergedHeaders,
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        console.error(`API error ${response.status} for ${url}:`, text);
        throw new Error(`API Error: ${response.status}`);
      }

      // На всякий случай корректно обрабатываем 204 No Content
      if (response.status === 204) {
        return null as T;
      }

      const contentType = response.headers.get('Content-Type') || '';
      if (contentType.includes('application/json')) {
        return (await response.json()) as T;
      }

      // Если бек вернул не JSON (например, текст/HTML/файл)
      return (await response.text()) as unknown as T;
    } catch (error) {
      console.error(`Request to ${endpoint} failed:`, error);
      throw error;
    }
  }

  // Auth endpoints
  async register(username: string, password: string, email?: string) {
    if (USE_MOCK) return MockApiClient.register(username, password, email);
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
    });
  }

  async login(username: string, password: string) {
    if (USE_MOCK) return MockApiClient.login(username, password);
    const response = await this.request<{ access_token: string }>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    this.token = response.access_token;
    localStorage.setItem('authtoken', this.token!);
    return response;
  }

  async logout() {
    if (USE_MOCK) return MockApiClient.logout();
    await this.request('/users/logout', { method: 'POST' });
    this.token = null;
    localStorage.removeItem('authtoken');
  }

  // Layers endpoints
  async getLayers(query?: string): Promise<Layer[]> {
    if (USE_MOCK) return MockApiClient.getLayers(query);
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    return this.request<Layer[]>(`/layers?${params.toString()}`);
  }

  async getLayerById(id: number): Promise<Layer> {
    if (USE_MOCK) return (MockApiClient.getLayerById(id) as unknown) as Promise<Layer>;
    return this.request<Layer>(`/layers/${id}`);
  }

  async addLayerToRequest(layerId: number) {
    if (USE_MOCK) return MockApiClient.addLayerToRequest(layerId);
    return this.request(`/layers/${layerId}/add-to-request`, {
      method: 'POST',
    });
  }

  // Requests/Chrono endpoints
  async getCartIcon(): Promise<CartIcon> {
    if (USE_MOCK) return MockApiClient.getCartIcon();
    try {
      return await this.request<CartIcon>('/chrono/cart-icon');
    } catch {
      return { count: 0 };
    }
  }

  async getRequests(status?: string, dateFrom?: string, dateTo?: string) {
    if (USE_MOCK) return MockApiClient.getRequests(status, dateFrom, dateTo);
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (dateFrom) params.append('datefrom', dateFrom);
    if (dateTo) params.append('dateto', dateTo);
    return this.request<ResearchRequest[]>(`/chrono?${params.toString()}`);
  }

  async getRequestById(id: number): Promise<ResearchRequest> {
    if (USE_MOCK) {
      return (MockApiClient.getRequestById(id) as unknown) as Promise<ResearchRequest>;
    }
    return this.request<ResearchRequest>(`/chrono/${id}`);
  }

  async updateRequest(
    id: number,
    data: { text_for_analysis?: string; purpose?: string }
  ) {
    if (USE_MOCK) return MockApiClient.updateRequest(id, data);
    return this.request(`/chrono/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async formRequest(id: number) {
    if (USE_MOCK) return MockApiClient.formRequest(id);
    return this.request(`/chrono/${id}/form`, {
      method: 'PUT',
    });
  }

  async completeRequest(id: number) {
    if (USE_MOCK) return MockApiClient.completeRequest(id);
    return this.request(`/chrono/${id}/complete`, {
      method: 'PUT',
    });
  }

  async deleteRequest(id: number) {
    if (USE_MOCK) return MockApiClient.deleteRequest(id);
    return this.request(`/chrono/${id}`, {
      method: 'DELETE',
    });
  }

  // Helper function to get image URL
  getImageUrl(imageUrl?: string) {
    if (USE_MOCK) return MockApiClient.getImageUrl(imageUrl);
    if (!imageUrl) return '/placeholder.jpg';
    return imageUrl.startsWith('http')
      ? imageUrl
      : `http://localhost:8080${imageUrl}`;
  }
}

const apiClient = new ApiClient();

export const getImageUrl = (imageUrl?: string) => apiClient.getImageUrl(imageUrl);

export default apiClient;
