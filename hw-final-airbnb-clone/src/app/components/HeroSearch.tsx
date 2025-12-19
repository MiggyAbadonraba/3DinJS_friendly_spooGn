"use client";

import { useState, useEffect } from "react";
import { MapPin, Calendar, Users } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function HeroSearch() {
  const { showToast } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Анимация появления при монтировании
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleSearchClick = () => {
    showToast(
      "Функция поиска в демо-версии не работает. Это демонстрация Airbnb Clone.",
      "info"
    );
  };

  return (
    <div className="container mx-auto text-center py-8 md:py-12">
      {/* Заголовок */}
      <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-gray-100 leading-tight">
          Найдите следующее место для{" "}
          <span className="text-rose-500 dark:text-rose-400 animate-pulse-slow">отдыха</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto px-4">
          Исследуйте уникальные жилые пространства по всему миру — от уютных коттеджей до роскошных вилл.
        </p>
      </div>

      {/* Строка поиска (только на десктопах) */}
      <div className={`hidden md:block transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div 
          onClick={handleSearchClick}
          className="mx-auto max-w-3xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer group"
        >
          <div className="flex items-center justify-between p-2 md:p-3">
            {/* Кнопка "Куда" */}
            <div className="flex-1 px-4 md:px-6">
              <div className="text-left">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Куда</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium truncate">Выберите направление</span>
                </div>
              </div>
            </div>
            
            <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>
            
            {/* Кнопка "Даты" */}
            <div className="flex-1 px-4 md:px-6">
              <div className="text-left">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Даты</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">Выберите даты</span>
                </div>
              </div>
            </div>
            
            <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>
            
            {/* Кнопка "Гости" */}
            <div className="flex-1 px-4 md:px-6">
              <div className="text-left">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Кто</p>
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">Гости</span>
                  </div>
                  <div className="h-10 w-10 bg-rose-500 rounded-full flex items-center justify-center group-hover:bg-rose-600 group-hover:scale-110 transition-all duration-300 shadow-md">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильная версия поиска */}
      <div className={`md:hidden transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <button
          onClick={handleSearchClick}
          className="mx-auto max-w-md w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 text-left group"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-left">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Найти жилье</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium truncate">Любое направление · Любые даты · Гости</span>
                </div>
              </div>
            </div>
            <div className="h-10 w-10 bg-rose-500 rounded-full flex items-center justify-center group-hover:bg-rose-600 transition-all duration-300 ml-4">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      {/* Популярные направления (быстрые ссылки) */}
      <div className={`mt-8 md:mt-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Популярные направления:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {["Москва", "Санкт-Петербург", "Сочи", "Казань", "Краснодар", "Крым"].map((city) => (
            <button
              key={city}
              onClick={() => showToast(`Поиск по городу "${city}" в демо-версии не работает`, "info")}
              className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-full hover:border-gray-800 dark:hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}