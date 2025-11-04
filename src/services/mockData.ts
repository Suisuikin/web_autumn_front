import { Service, Order } from '../types';

export const mockServices: Service[] = [
  {
    id: 1,
    name: 'Премиум тур в Париж',
    description: 'Незабываемое путешествие в город любви с посещением Эйфелевой башни, Лувра и круизом по Сене',
    price: 125000,
    image_url: null,
    status: 'active',
    date: '2025-06-15',
    category: 'Туры'
  },
  {
    id: 2,
    name: 'Экскурсия в Рим',
    description: 'Исторический тур по Вечному городу с посещением Колизея, Ватикана и Фонтана Треви',
    price: 98000,
    image_url: null,
    status: 'active',
    date: '2025-07-20',
    category: 'Туры'
  },
  {
    id: 3,
    name: 'Сафари в Африке',
    description: 'Приключенческий тур с наблюдением за дикими животными в их естественной среде обитания',
    price: 215000,
    image_url: null,
    status: 'active',
    date: '2025-08-10',
    category: 'Приключения'
  },
  {
    id: 4,
    name: 'Круиз по Средиземному морю',
    description: 'Роскошный круиз с посещением 7 стран за 14 дней',
    price: 180000,
    image_url: null,
    status: 'active',
    date: '2025-09-05',
    category: 'Круизы'
  },
  {
    id: 5,
    name: 'Горнолыжный тур в Альпы',
    description: 'Активный отдых на лучших горнолыжных курортах Швейцарии',
    price: 156000,
    image_url: null,
    status: 'active',
    date: '2025-12-15',
    category: 'Спорт'
  },
  {
    id: 6,
    name: 'Пляжный отдых на Мальдивах',
    description: 'Райский отдых на белоснежных пляжах с кристально чистой водой',
    price: 245000,
    image_url: null,
    status: 'active',
    date: '2025-11-01',
    category: 'Пляжный отдых'
  }
];

export const mockOrder: Order = {
  id: 1,
  status: 'draft',
  created_at: new Date().toISOString(),
  services: []
};
