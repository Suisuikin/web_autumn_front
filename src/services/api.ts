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
    this.token = localStorage.getItem('auth_token');
  }

  private getHeaders(includeAuth = true) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE}${endpoint}`;
    try {
      const response = await fetch(url, {
        ...options,
        headers: this.getHeaders(options.headers ? false : true),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Request to ${endpoint} failed:`, error);
      throw error;
    }
  }

  // Auth endpoints
  async register(username: string, password: string, email?: string) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
    });
  }

  async login(username: string, password: string) {
    const response = await this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    this.token = response.access_token;
    localStorage.setItem('auth_token', this.token);
    return response;
  }

  async logout() {
    await this.request('/users/logout', { method: 'POST' });
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Layers endpoints
  async getLayers(query?: string): Promise<Layer[]> {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    return this.request(`/layers?${params.toString()}`);
  }

  async getLayerById(id: number): Promise<Layer> {
    return this.request(`/layers/${id}`);
  }

  async addLayerToRequest(layerId: number) {
    return this.request(`/layers/${layerId}/add-to-request`, {
      method: 'POST',
    });
  }

  // Requests (Chrono) endpoints
  async getCartIcon(): Promise<CartIcon> {
    try {
      return await this.request('/chrono/cart-icon');
    } catch {
      return { count: 0 };
    }
  }

  async getRequests(status?: string, dateFrom?: string, dateTo?: string) {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (dateFrom) params.append('date_from', dateFrom);
    if (dateTo) params.append('date_to', dateTo);
    return this.request(`/chrono?${params.toString()}`);
  }

  async getRequestById(id: number): Promise<ResearchRequest> {
    return this.request(`/chrono/${id}`);
  }

  async updateRequest(id: number, data: { text_for_analysis?: string; purpose?: string }) {
    return this.request(`/chrono/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async formRequest(id: number) {
    return this.request(`/chrono/${id}/form`, {
      method: 'PUT',
    });
  }

  async completeRequest(id: number) {
    return this.request(`/chrono/${id}/complete`, {
      method: 'PUT',
    });
  }

  async deleteRequest(id: number) {
    return this.request(`/chrono/${id}`, {
      method: 'DELETE',
    });
  }

  // Helper function to get image URL
  getImageUrl(imageUrl?: string) {
    if (!imageUrl) return '/placeholder.jpg';
    return imageUrl.startsWith('http') ? imageUrl : `http://localhost:8080/${imageUrl}`;
  }
}

export default new ApiClient();
