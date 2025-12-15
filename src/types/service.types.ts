export interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  date: string;
  image?: string;
  status: 'active' | 'deleted';
  created_at?: string;
}

export interface ServiceResponse {
  data: Service[];
  total: number;
  page: number;
}
