// src/services/mockData.ts

export interface RandomLayer {
  id: number;
  name: string;
  description: string;
  image_url: string; // Заметьте: в api.ts у вас используется image_url (snake_case)
  from_year: number; // и from_year
  to_year: number;   // и to_year
  words: string;
  status: string;
}

// Данные
export const MOCKLAYERS: RandomLayer[] = [
  {
    id: 1,
    name: 'XI-XV вв. - Период раздробленности',
    description: 'Эпоха феодальной раздробленности на Руси.',
    image_url: '/images/img.png',
    from_year: 1000,
    to_year: 1500,
    words: 'князь, дружина, вотчина, удел, междоусобица, церковь, летопись, береста, софия, лавра',
    status: 'active'
  },
  {
    id: 2,
    name: 'Образование централизованного государства',
    description: 'Объединение земель вокруг Москвы, создание единого Русского государства.',
    image_url: '/images/img.png',
    from_year: 1000,
    to_year: 1450,
    words: 'москва, кремль, иван, третий, судебник, боярская, дума, поместье, дворяне',
    status: 'active'
  },
  {
    id: 3,
    name: 'Царствование Ивана Грозного',
    description: 'Реформы, опричнина и расширение границ на восток.',
    image_url: '/images/img.png',
    from_year: 1450,
    to_year: 1600,
    words: 'грозный, царь, земский, собор, стрелецкое, войско, казань, астрахань, сибирь',
    status: 'active'
  },
  {
    id: 4,
    name: 'Смутное время',
    description: 'Династический кризис, интервенция и народное ополчение.',
    image_url: '/images/img.png',
    from_year: 1600,
    to_year: 1613,
    words: 'смута, самозванец, интервенция, ополчение, минин, пожарский, романовы, земский, собор',
    status: 'active'
  },
  {
    id: 5,
    name: 'Эпоха Петра I',
    description: 'Масштабные реформы, создание империи и выход к морю.',
    image_url: '/images/img.png',
    from_year: 1682,
    to_year: 1725,
    words: 'петр, империя, флот, петербург, сенат, коллегии, рекрут, ассамблея, табель, рангах',
    status: 'active'
  },
  {
    id: 6,
    name: 'Дворцовые перевороты',
    description: 'Частая смена правителей при поддержке гвардии.',
    image_url: '/images/img.png',
    from_year: 1725,
    to_year: 1762,
    words: 'гвардия, фаворит, елизавета, университет, ломоносов, растрелли, барокко, театр',
    status: 'active'
  },
  {
    id: 7,
    name: 'Золотой век Екатерины II',
    description: 'Просвещенный абсолютизм и расширение прав дворянства.',
    image_url: '/images/img.png',
    from_year: 1762,
    to_year: 1796,
    words: 'екатерина, просвещение, дворянство, грамота, крым, черноморье, суворов, ушаков, эрмитаж',
    status: 'active'
  }
];

export const MOCKREQUESTS = [
  {
    id: 1,
    status: "draft",
    created_at: "2025-11-15T10:00:00Z",
    text_for_analysis: "Текст для анализа...",
    result_from_year: 1000,
    result_to_year: 1450,
    matched_layers: 2,
    layers: [MOCKLAYERS[0], MOCKLAYERS[1]]
  },
  {
    id: 2,
    status: "processing",
    created_at: "2025-11-16T14:30:00Z",
    text_for_analysis: "Другой текст...",
    result_from_year: 1917,
    result_to_year: 1950,
    matched_layers: 1,
    layers: [MOCKLAYERS[2]]
  }
];
