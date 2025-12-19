"use client";

import HeroSearch from "./components/HeroSearch";
import ListingCard from "./components/ListingCard";
import { Shield, Star, Zap, MapPin as MapPinIcon, TrendingUp, Award, Clock, Users as UsersIcon } from "lucide-react";
import { useApp } from "./context/AppContext";
import { mockListings } from "./data/listings";

const features = [
  { title: "Надёжная защита", desc: "Безопасные платежи и подтвержденные отзывы", icon: Shield },
  { title: "Выбор гостей", desc: "Лучшие варианты с высшим рейтингом", icon: Star },
  { title: "Мгновенное бронирование", desc: "Бронируйте без ожидания подтверждения", icon: Zap },
  { title: "Популярные направления", desc: "Актуальные тренды путешествий", icon: MapPinIcon },
  { title: "Трендовые места", desc: "Самые популярные направления этого сезона", icon: TrendingUp },
  { title: "Премиум качество", desc: "Отборные варианты с повышенным комфортом", icon: Award },
  { title: "Быстрое заселение", desc: "Автоматическое заселение по прибытии", icon: Clock },
  { title: "Для компаний", desc: "Просторные варианты для больших компаний", icon: UsersIcon },
];

export default function Home() {
  const { showToast } = useApp();

  const handleNonWorkingButton = (buttonName: string) => {
    showToast(
      `Кнопка "${buttonName}" в данный момент не работает. Это демо-версия Airbnb Clone.`,
      "info"
    );
  };

  // Разделяем карточки на 3 строки по 4 объекта (всего 12)
  const firstRow = mockListings.slice(0, 4);
  const secondRow = mockListings.slice(4, 8);
  const thirdRow = mockListings.slice(8, 12);

  return (
    <div className="mx-auto max-w-screen-80 px-4">
      {/* Герой-секция */}
      <section className="mb-12">
        <HeroSearch />
      </section>

      {/* Особенности */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-center">
          Почему выбирают нас
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className="text-rose-500 mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Первая строка объявлений */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Самые популярные варианты
          </h2>
          <button 
            onClick={() => handleNonWorkingButton("Показать все")}
            className="text-sm font-semibold text-gray-800 dark:text-gray-300 hover:text-rose-500 transition-colors"
          >
            Показать все →
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {firstRow.map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      </section>

      {/* Вторая строка объявлений */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Премиум варианты с отличными отзывами
          </h2>
          <button 
            onClick={() => handleNonWorkingButton("Показать все премиум")}
            className="text-sm font-semibold text-gray-800 dark:text-gray-300 hover:text-rose-500 transition-colors"
          >
            Показать все →
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {secondRow.map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      </section>

      {/* Третья строка объявлений */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Новые поступления
          </h2>
          <button 
            onClick={() => handleNonWorkingButton("Показать все новые")}
            className="text-sm font-semibold text-gray-800 dark:text-gray-300 hover:text-rose-500 transition-colors"
          >
            Показать все →
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {thirdRow.map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button 
            onClick={() => handleNonWorkingButton("Показать больше вариантов")}
            className="bg-rose-500 text-white font-semibold px-8 py-3 rounded-xl hover:bg-rose-600 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg animate-pulse-slow"
          >
            Показать больше вариантов
          </button>
        </div>
      </section>

      {/* Гостевой профиль */}
      <section className="bg-linear-to-r from-rose-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 mb-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Ваш гостевой профиль</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Сохраняйте понравившиеся варианты в избранное, получайте персональные рекомендации 
            и быстрее бронируйте с сохранёнными данными.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => handleNonWorkingButton("Войти в профиль")}
              className="bg-rose-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-rose-600 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Войти в профиль
            </button>
            <button 
              onClick={() => handleNonWorkingButton("Создать профиль")}
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
            >
              Создать профиль
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}