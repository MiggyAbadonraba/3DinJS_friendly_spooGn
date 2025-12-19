"use client";

import { useApp } from "../context/AppContext";
import { Heart, MapPin, Star, Settings, LogOut, ChevronRight, User as UserIcon, Sun, Moon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { favorites, removeFavorite, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<"favorites" | "trips" | "settings">("favorites");

  const mockTrips = [
    { id: 1, title: "Отдых в Сочи", date: "15-22 мая 2025", status: "Предстоящая" },
    { id: 2, title: "Бизнес-поездка в Москву", date: "10-12 апреля 2025", status: "Завершена" },
  ];

  const handleNonWorkingButton = (buttonName: string) => {
    showToast(
      `Кнопка "${buttonName}" в данный момент не работает. Это демо-версия Airbnb Clone.`,
      "info"
    );
  };

  const handleRemoveFavorite = (id: number, title: string) => {
    removeFavorite(id);
    showToast(`Удалено из избранного: "${title}"`, "info");
  };

  return (
    <div className="mx-auto py-12 px-6 max-w-screen-80">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Боковая панель */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            {/* Аватар и имя */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 bg-linear-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Алексей Иванов</h2>
                <p className="text-gray-500 dark:text-gray-400">alexey@example.com</p>
              </div>
            </div>

            {/* Навигация */}
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("favorites")}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${activeTab === "favorites" ? "bg-rose-50 dark:bg-gray-800 text-rose-500" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
              >
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Избранное</span>
                  {favorites.length > 0 && (
                    <span className="bg-rose-500 text-white text-xs px-2 py-1 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </div>
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setActiveTab("trips")}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${activeTab === "trips" ? "bg-rose-50 dark:bg-gray-800 text-rose-500" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
              >
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span className="font-medium">Мои поездки</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${activeTab === "settings" ? "bg-rose-50 dark:bg-gray-800 text-rose-500" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
              >
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Настройки</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <button 
                onClick={() => handleNonWorkingButton("Выйти")}
                className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Выйти</span>
              </button>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="lg:w-2/3">
          {/* Избранное */}
          {activeTab === "favorites" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Избранные варианты</h1>
                <span className="text-gray-500 dark:text-gray-400">{favorites.length} сохранено</span>
              </div>

              {favorites.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Нет избранных вариантов</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Сохраняйте понравившиеся варианты, нажимая на сердечко</p>
                  <Link 
                    href="/" 
                    className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                  >
                    Найти жилье
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favorites.map(item => (
                    <div key={item.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden group hover:shadow-xl transition-all duration-300 relative">
                      <button
                        onClick={() => handleRemoveFavorite(item.id, item.title)}
                        className="absolute top-4 right-4 z-10 h-10 w-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform hover:bg-red-50 dark:hover:bg-red-900/20"
                        aria-label={`Удалить "${item.title}" из избранного`}
                      >
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </button>
                      
                      <div className="relative aspect-video">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg line-clamp-1 pr-10 text-gray-900 dark:text-gray-100">{item.title}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-rose-500 text-rose-500" />
                            <span className="text-gray-900 dark:text-gray-100">{item.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          {item.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">₽{item.price.toLocaleString("ru-RU")}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">ночь</p>
                          </div>
                          <button 
                            onClick={() => handleNonWorkingButton("Забронировать")}
                            className="px-4 py-2 border border-rose-500 text-rose-500 hover:bg-rose-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                          >
                            Забронировать
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Поездки */}
          {activeTab === "trips" && (
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Мои поездки</h1>
              <div className="space-y-4">
                {mockTrips.map(trip => (
                  <div key={trip.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">{trip.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400">{trip.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${trip.status === "Предстоящая" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"}`}>
                        {trip.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Настройки */}
          {activeTab === "settings" && (
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Настройки профиля</h1>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Имя</label>
                    <input 
                      type="text" 
                      defaultValue="Алексей Иванов"
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Email</label>
                    <input 
                      type="email" 
                      defaultValue="alexey@example.com"
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Тема оформления</label>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Sun className="h-4 w-4" /> Светлая
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Moon className="h-4 w-4" /> Тёмная
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleNonWorkingButton("Сохранить изменения")}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    Сохранить изменения
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}