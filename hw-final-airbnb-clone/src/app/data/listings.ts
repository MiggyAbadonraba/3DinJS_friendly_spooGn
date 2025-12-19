// Детерминированная функция для рейтинга
function getRating(id: number): number {
  const seed = id * 123456789;
  let random = Math.sin(seed) * 10000;
  random = random - Math.floor(random);
  return parseFloat((random * 0.5 + 4.5).toFixed(1));
}

// Детерминированная функция для isGuestFavorite
function getIsGuestFavorite(id: number): boolean {
  return (id * 137) % 4 === 0;
}

// Детерминированная функция для генерации удобств
function getAmenities(id: number): string[] {
  const allAmenities = [
    'Wi-Fi',
    'Кухня',
    'Стиральная машина',
    'Кондиционер',
    'Отопление',
    'Телевизор',
    'Фен',
    'Утюг',
    'Парковка',
    'Бассейн',
    'Джакузи',
    'Завтрак',
    'Рабочее место',
    'Камин',
    'Терраса',
    'Балкон'
  ];
  
  const baseAmenities = 3 + ((id * 23) % 6); // 3-8 базовых удобств
  const shuffled = [...allAmenities].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, baseAmenities);
}

export interface Listing {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  images: string[];
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  description: string;
  host: {
    name: string;
    avatar: string;
    isSuperhost: boolean;
  };
  amenities: string[];
  isGuestFavorite?: boolean;
  category: string;
}

export const mockListings: Listing[] = Array.from({ length: 18 }, (_, index) => {
  const id = index + 1;
  const locations = [
    { city: 'Москва', district: 'Тверской район', country: 'Россия' },
    { city: 'Санкт-Петербург', district: 'Центральный район', country: 'Россия' },
    { city: 'Сочи', district: 'Адлерский район', country: 'Россия' },
    { city: 'Казань', district: 'Вахитовский район', country: 'Россия' },
    { city: 'Екатеринбург', district: 'Ленинский район', country: 'Россия' },
    { city: 'Новосибирск', district: 'Центральный район', country: 'Россия' },
    { city: 'Краснодар', district: 'Центральный округ', country: 'Россия' },
    { city: 'Владивосток', district: 'Ленинский район', country: 'Россия' },
    { city: 'Калининград', district: 'Центральный район', country: 'Россия' },
    { city: 'Минск', district: 'Центральный район', country: 'Беларусь' },
    { city: 'Нижний Новгород', district: 'Нижегородский район', country: 'Россия' },
    { city: 'Ростов-на-Дону', district: 'Ленинский район', country: 'Россия' },
    { city: 'Самара', district: 'Самарский район', country: 'Россия' },
    { city: 'Уфа', district: 'Советский район', country: 'Россия' },
    { city: 'Воронеж', district: 'Центральный район', country: 'Россия' },
    { city: 'Пермь', district: 'Ленинский район', country: 'Россия' },
    { city: 'Волгоград', district: 'Центральный район', country: 'Россия' },
    { city: 'Красноярск', district: 'Центральный район', country: 'Россия' },
  ];
  
  const location = locations[index];
  const categories = ['Квартира', 'Дом', 'Апартаменты', 'Вилла', 'Лофт', 'Студия'];
  
  // Детерминированные значения
  const rating = getRating(id);
  const isGuestFavorite = getIsGuestFavorite(id);
  
  // Генерация 5 изображений для каждого объекта
  const firstImageNumber = (id - 1) * 5 + 1;
  const images = Array.from({ length: 5 }, (_, imgIndex) => 
    `/images/listing${firstImageNumber + imgIndex}.avif`
  );
  
  const image = images[0]; // Первое изображение для превью

  return {
    id,
    title: `${categories[index % categories.length]} в центре ${location.city}`,
    location: `${location.city}, ${location.district}, ${location.country}`,
    price: 3000 + ((id * 123) % 15000),
    rating,
    image,
    images,
    guests: 2 + ((id * 7) % 8),
    bedrooms: 1 + ((id * 11) % 4),
    beds: 1 + ((id * 13) % 5),
    bathrooms: 1 + ((id * 17) % 3),
    description: `Просторный и уютный ${categories[index % categories.length].toLowerCase()} в самом центре ${location.city}. Идеальное расположение для знакомства с городом. Современный ремонт, вся необходимая техника, высокоскоростной Wi-Fi.`,
    host: {
      name: ['Алексей', 'Мария', 'Дмитрий', 'Анна', 'Сергей', 'Екатерина'][index % 6],
      avatar: `/images/listing${firstImageNumber}.avif`, // Используем первое фото как аватар
      isSuperhost: (id * 19) % 2 === 0
    },
    amenities: getAmenities(id),
    isGuestFavorite,
    category: categories[index % categories.length]
  };
});