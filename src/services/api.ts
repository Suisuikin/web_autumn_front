// src/services/api.ts
import MockApiClient from './mockApi';

declare global {
  interface Window {
    __TAURI__?: any;
  }
}

const IS_GITHUB = window.location.hostname.includes('github.io');
const IS_TAURI = !!window.__TAURI__;
const IS_DEV = import.meta.env.DEV;

let API_BASE = '';
if (IS_TAURI) {
  API_BASE = 'http://172.20.10.3:8080/api';
} else if (IS_DEV) {
  API_BASE = '/api';
} else if (IS_GITHUB) {
  API_BASE = 'http://172.20.10.3:8080/api';
} else {
  API_BASE = 'http://localhost:8080/api';
}

interface Layer { id: number; name: string; description?: string; image_url?: string; from_year: number; to_year: number; words: string; status: string; }
interface ResearchRequest { id: number; status: string; created_at: string; formed_at?: string; completed_at?: string; user_id: number; moderator_id?: number; text_for_analysis?: string; purpose?: string; result_from_year?: number; result_to_year?: number; matched_layers?: number; layers?: Layer[]; }
interface CartIcon { chrono_id?: number; count: number; }

class ApiClient {
  private token: string | null = null;
  private useMockFallback = false;

  constructor() {
    this.token = localStorage.getItem('authtoken');
  }

  private getHeaders(includeAuth = true): HeadersInit {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (includeAuth && this.token) headers['Authorization'] = `Bearer ${this.token}`;
    return headers;
  }

  private async execute<T>(
    endpoint: string,
    options: RequestInit = {},
    mockFunc: () => Promise<T>
  ): Promise<T> {
    if (this.useMockFallback) {
      return mockFunc();
    }

    try {
      const url = `${API_BASE}${endpoint}`;
      const defaultHeaders = this.getHeaders();
      const mergedHeaders = { ...defaultHeaders, ...(options.headers || {}) };

      const response = await fetch(url, {
        ...options,
        headers: mergedHeaders,
      });

      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
            throw new Error(`API Error: ${response.status}`);
        }
        throw new Error(`Server Error: ${response.status}`);
      }

      if (response.status === 204) return null as T;
      const contentType = response.headers.get('Content-Type') || '';
      if (contentType.includes('application/json')) return (await response.json()) as T;
      return (await response.text()) as unknown as T;

    } catch (error: any) {
      if (error.message && error.message.includes('API Error')) {
        throw error;
      }

      console.warn(`[API] Backend fail (${error}). Switching to Mocks.`);
      this.useMockFallback = true;
      return mockFunc();
    }
  }

  async register(username: string, password: string, email?: string) {
    return this.execute(
      '/users/register',
      { method: 'POST', body: JSON.stringify({ username, password, email }) },
      () => MockApiClient.register(username, password, email)
    );
  }

  async login(username: string, password: string) {
    const res = await this.execute<{ access_token: string }>(
      '/users/login',
      { method: 'POST', body: JSON.stringify({ username, password }) },
      () => MockApiClient.login(username, password)
    );
    // Для моков токен тоже придет
    this.token = res.access_token;
    localStorage.setItem('authtoken', this.token);
    return res;
  }

  async logout() {
    return this.execute(
      '/users/logout',
      { method: 'POST' },
      async () => { await MockApiClient.logout(); this.token = null; localStorage.removeItem('authtoken'); }
    ).then(() => {
       // Очистка при успешном реальном запросе
       this.token = null;
       localStorage.removeItem('authtoken');
    });
  }

  async getLayers(query?: string): Promise<Layer[]> {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    return this.execute<Layer[]>(
      `/layers?${params.toString()}`,
      {},
      () => MockApiClient.getLayers(query) as Promise<Layer[]> // Приведение типов
    );
  }

  async getLayerById(id: number): Promise<Layer> {
    return this.execute<Layer>(
      `/layers/${id}`,
      {},
      () => MockApiClient.getLayerById(id) as unknown as Promise<Layer>
    );
  }

  async addLayerToRequest(layerId: number) {
    return this.execute(
      `/layers/${layerId}/add-to-request`,
      { method: 'POST' },
      () => MockApiClient.addLayerToRequest(layerId)
    );
  }

  async getCartIcon(): Promise<CartIcon> {
    return this.execute<CartIcon>(
      '/chrono/cart-icon',
      {},
      () => MockApiClient.getCartIcon() as Promise<CartIcon>
    );
  }

  async getRequests(status?: string, dateFrom?: string, dateTo?: string) {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (dateFrom) params.append('datefrom', dateFrom);
    if (dateTo) params.append('dateto', dateTo);
    return this.execute<ResearchRequest[]>(
      `/chrono?${params.toString()}`,
      {},
      () => MockApiClient.getRequests(status, dateFrom, dateTo)
    );
  }

  async getRequestById(id: number): Promise<ResearchRequest> {
    return this.execute<ResearchRequest>(
      `/chrono/${id}`,
      {},
      () => MockApiClient.getRequestById(id) as unknown as Promise<ResearchRequest>
    );
  }

  async updateRequest(id: number, data: { text_for_analysis?: string; purpose?: string }) {
    return this.execute(
      `/chrono/${id}`,
      { method: 'PUT', body: JSON.stringify(data) },
      () => MockApiClient.updateRequest(id, data)
    );
  }

  async formRequest(id: number) {
    return this.execute(
      `/chrono/${id}/form`,
      { method: 'PUT' },
      () => MockApiClient.formRequest(id)
    );
  }

  async completeRequest(id: number) {
    return this.execute(
      `/chrono/${id}/complete`,
      { method: 'PUT' },
      () => MockApiClient.completeRequest(id)
    );
  }

  async deleteRequest(id: number) {
    return this.execute(
      `/chrono/${id}`,
      { method: 'DELETE' },
      () => MockApiClient.deleteRequest(id)
    );
  }

  getImageUrl(imageUrl?: string) {
    const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
    if (!imageUrl) return `${BASE}/images/placeholder.jpg`;
    if (imageUrl.startsWith('http')) return imageUrl;

    // Тут сложнее: если мы в режиме моков (fallback), то картинки тоже должны быть моковые (локальные)
    if (this.useMockFallback) {
         // Предполагаем, что моковые картинки лежат в public
         // Если путь /images/layer1.jpg -> то возвращаем как есть
         return imageUrl.startsWith('/') ? `${BASE}${imageUrl}` : `${BASE}/${imageUrl}`;
    }

    // Иначе пробуем реальный адрес
    // Для GitHub Pages ставим тот же хардкодный IP
    let imageHost = 'http://localhost:8080';
    if (IS_TAURI || IS_GITHUB) imageHost = 'http://172.20.10.3:8080';

    return `${imageHost}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  }
}

const apiClient = new ApiClient();
export const getImageUrl = (imageUrl?: string) => apiClient.getImageUrl(imageUrl);
export default apiClient;
