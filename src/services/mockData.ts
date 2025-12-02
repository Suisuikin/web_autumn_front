export interface RandomLayer {
  id: number;
  name: string;
  description: string;
  image_url: string;
  from_year: number;
  to_year: number;
  words: string;
  status: string;
}

export const MOCK_LAYERS: RandomLayer[] = [
  {
    "id": 1,
    "name": "Средневековый слой (XI-XV вв.) - обновлённый",
    "description": "Расширенная лексика древнерусского периода",
    "image_url": "http://127.0.0.1:9000/chrono/1_1761001602469308798.jpg",
    "from_year": 1000,
    "to_year": 1500,
    "words": "дружина,князь,воевода,гридь,тиун,вече,боярин,отрок,кормилец,тысяцкий",
    "status": "active"
  },
  {
    "id": 2,
    "name": "Древнерусский слой",
    "description": "Церковнославянская и летописная лексика: «вещати», «чудо», «чадо», «рать». Без заимствований.",
    "image_url": "http://127.0.0.1:9000/chrono/1_1761001602469308798.jpg",
    "from_year": 1000,
    "to_year": 1450,
    "words": "вещати,чудо,чадо,рать,вече,князь,боярин,дружина",
    "status": "active"
  },
  {
    "id": 3,
    "name": "Раннесреднерусский слой",
    "description": "Смешение церковнославянской и народной речи. Первые полонизмы и кальки с латинизмов.",
    "image_url": "http://localhost:9000/chrono/img_1.png",
    "from_year": 1450,
    "to_year": 1600,
    "words": "полонизм,калька,светлица,хоромы,терем,посад",
    "status": "active"
  },
  {
    "id": 4,
    "name": "Позднесреднерусский слой",
    "description": "Расширение бытовой лексики, редкие заимствования из Европы. Переходный период перед реформами Петра.",
    "image_url": "http://localhost:9000/chrono/img_2.png",
    "from_year": 1600,
    "to_year": 1720,
    "words": "изба,амбар,лавка,торг,приказ,дьяк,подьячий",
    "status": "active"
  },
  {
    "id": 5,
    "name": "Петровский слой",
    "description": "Активное заимствование из западных языков, формирование современного литературного языка.",
    "image_url": "http://localhost:9000/chrono/img_3.png",
    "from_year": 1720,
    "to_year": 1800,
    "words": "регламент,ассамблея,губерния,коллегия,сенат,генерал,адмирал,гардероб",
    "status": "active"
  },
  {
    "id": 6,
    "name": "Классический слой",
    "description": "Эпоха Пушкина и Толстого. Развитие науки, формирование норм, частичная архаизация старых слов.",
    "image_url": "http://localhost:9000/chrono/img_4.png",
    "from_year": 1800,
    "to_year": 1917,
    "words": "литература,поэзия,гимназия,университет,департамент,чиновник,дворянин,извозчик",
    "status": "active"
  },
  {
    "id": 7,
    "name": "Революционно-советский слой",
    "description": "Массовые неологизмы и идеологическая лексика: «колхоз», «пятилетка», «социализм».",
    "image_url": "http://localhost:9000/chrono/img_5.png",
    "from_year": 1917,
    "to_year": 1950,
    "words": "колхоз,пятилетка,социализм,коммунизм,партком,совет,революция,товарищ",
    "status": "active"
  },
  {
    "id": 8,
    "name": "Позднесоветский слой",
    "description": "Техническая и бюрократическая речь: «автоматизация», «НИИ», «профком», «космодром».",
    "image_url": "http://127.0.0.1:9000/chrono/8_1759844949964897641.jpg",
    "from_year": 1950,
    "to_year": 1985,
    "words": "автоматизация,НИИ,профком,космодром,спутник,комсомол,пионер,ракета",
    "status": "active"
  },
  {
    "id": 11,
    "name": "Древний слой",
    "description": "Слой с археологическими находками",
    "image_url": "image",
    "from_year": 1000,
    "to_year": 1500,
    "words": "археология,курган,городище,палеография,берестяная,грамота",
    "status": "active"
  }
];

// Mock-данные для заявок
export const MOCK_REQUESTS = [
  {
    id: 1,
    status: 'draft',
    notes: 'Текст для анализа',
    comments: { '1': 'Комментарий к первому слою' },
    created_at: new Date().toISOString(),
    random_layers: [MOCK_LAYERS[0], MOCK_LAYERS[1]]
  }
];

// Helper для выбора N случайных элементов
export function pickRandom<T>(arr: T[], count: number): T[] {
  if (!arr || arr.length <= count) return (arr || []).slice(0, count);
  const idxs = new Set<number>();
  while (idxs.size < count) idxs.add(Math.floor(Math.random() * arr.length));
  return Array.from(idxs).map(i => arr[i]);
}
