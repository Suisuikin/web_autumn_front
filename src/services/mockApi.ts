// src/services/mockApi.ts

import { MOCK_LAYERS, MOCK_REQUESTS, MockLayer } from './mockLayers';

const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

function pickRandom<T>(arr: T[], count: number): T[] {
  if (!arr || arr.length <= count) return arr.slice(0, count);
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export class MockApiClient {
  async getLayers(query?: string): Promise<MockLayer[]> {
    await delay();
    if (query) {
      const lowerQuery = query.toLowerCase();
      return MOCK_LAYERS.filter((layer) => {
        const name = layer.name?.toLowerCase() ?? '';
        const description = layer.description?.toLowerCase() ?? '';
        const words = layer.words?.toLowerCase() ?? '';

        return (
          name.includes(lowerQuery) ||
          description.includes(lowerQuery) ||
          words.includes(lowerQuery)
        );
      });
    }
    return MOCK_LAYERS;
  }

  async getLayerById(id: number): Promise<MockLayer | null> {
    await delay();
    return MOCK_LAYERS.find(layer => layer.id === id) || null;
  }

  async addLayerToRequest(layerId: number): Promise<{ success: boolean }> {
    await delay();
    console.log(`[MOCK] Добавлен слой ${layerId} в заявку`);
    return { success: true };
  }

  // Requests/Chrono endpoints
  async getCartIcon(): Promise<{ chrono_id?: number; count: number }> {
    await delay();
    return { count: Math.floor(Math.random() * 5) };
  }

  async getRequests(
    status?: string,
    dateFrom?: string,
    dateTo?: string
  ): Promise<any[]> {
    await delay();
    let filtered = [...MOCK_REQUESTS];
    if (status) {
      filtered = filtered.filter(req => req.status === status);
    }
    return filtered;
  }

  async getRequestById(id: number): Promise<any | null> {
    await delay();
    const request = MOCK_REQUESTS.find(req => req.id === id);
    if (!request) return null;

    const randomLayers = pickRandom(MOCK_LAYERS, 3);
    return {
      ...request,
      layers: randomLayers
    };
  }

  async updateRequest(
    id: number,
    data: { text_for_analysis?: string; purpose?: string }
  ): Promise<{ success: boolean }> {
    await delay();
    console.log(`[MOCK] Обновлена заявка ${id}:`, data);
    return { success: true };
  }

  async formRequest(id: number): Promise<{ success: boolean }> {
    await delay();
    console.log(`[MOCK] Сформирована заявка ${id}`);
    return { success: true };
  }

  async completeRequest(id: number): Promise<{ success: boolean }> {
    await delay();
    console.log(`[MOCK] Завершена заявка ${id}`);
    return { success: true };
  }

  async deleteRequest(id: number): Promise<{ success: boolean }> {
    await delay();
    console.log(`[MOCK] Удалена заявка ${id}`);
    return { success: true };
  }

  async getChronoById(id: number): Promise<any | null> {
    await delay();
    const twoRandomLayers = pickRandom(MOCK_LAYERS, 2);
    return {
      request_id: id,
      status: 'draft',
      notes: 'Пример заметки',
      random_layers: twoRandomLayers,
      comments: {}
    };
  }

  async updateChrono(
    id: number,
    data: { notes?: string; comments?: Record<number, string> }
  ): Promise<{ success: boolean }> {
    await delay();
    console.log(`[MOCK] Обновлена хроно-заявка ${id}:`, data);
    return { success: true };
  }

  async deleteChrono(id: number): Promise<{ success: boolean }> {
    await delay();
    console.log(`[MOCK] Закрыта хроно-заявка ${id}`);
    return { success: true };
  }

  async register(username: string, password: string, email?: string): Promise<any> {
    await delay();
    console.log('[MOCK] Регистрация:', { username, email });
    return { success: true, user_id: 1 };
  }

  async login(username: string, password: string): Promise<any> {
    await delay();
    console.log('[MOCK] Вход:', { username });
    return { access_token: 'mock_token_12345', user_id: 1 };
  }

  async logout(): Promise<void> {
    await delay();
    console.log('[MOCK] Выход');
  }

  getImageUrl(imageUrl?: string): string {
    if (!imageUrl || imageUrl === 'image') return '/placeholder.jpg';
    return imageUrl.startsWith('http') ? imageUrl : `http://localhost:8080${imageUrl}`;
  }
}

export default new MockApiClient();
