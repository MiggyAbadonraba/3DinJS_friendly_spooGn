"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { 
  Star, MapPin, Users, Home, Bed, Bath, Shield, Heart, 
  ChevronLeft, Share2, Wifi, Tv, Wind, Coffee,
  Car, Dog, Utensils, Check, X, ChevronRight, Globe,
  Camera, Maximize2, Minimize2, ZoomIn, ZoomOut
} from "lucide-react";
import { mockListings } from "../../data/listings";
import { useApp } from "../../context/AppContext";
import Image from "next/image";
import ImageMagnifier from "../../components/ImageMagnifier";
import Link from "next/link";

export default function ListingPage() {
  const params = useParams();
  const router = useRouter();
  const { toggleFavorite, isFavorite, showToast } = useApp();
  
  const id = parseInt(params.id as string);
  const listing = mockListings.find(l => l.id === id);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(2.5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Объект не найден</h1>
          <button 
            onClick={() => router.back()}
            className="text-rose-500 hover:text-rose-600"
          >
            ← Вернуться назад
          </button>
        </div>
      </div>
    );
  }
  
  const favorite = isFavorite(listing.id);
  
  const handleFavoriteClick = () => {
    toggleFavorite({
      id: listing.id,
      title: listing.title,
      location: listing.location,
      price: listing.price,
      rating: listing.rating,
      image: listing.image,
    });
  };
  
  const handleBookClick = () => {
    showToast('Функция бронирования в демо-версии не реализована', 'info');
  };
  
  const handleShareClick = () => {
    showToast('Ссылка скопирована в буфер обмена', 'success');
    navigator.clipboard.writeText(window.location.href);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const increaseZoom = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 5));
  };

  const decreaseZoom = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1.5));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const renderAllImagesModal = () => {
    if (!showAllImages) return null;

    return (
      <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl max-h-[85vh] flex flex-col">
          {/* Заголовок и кнопки управления */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">
              Все фото ({listing.images.length})
            </h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleFullscreen}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label={isFullscreen ? "Выйти из полноэкранного режима" : "Полноэкранный режим"}
              >
                {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </button>
              <button 
                onClick={() => setShowAllImages(false)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          {/* Галерея */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto p-2">
            {listing.images.map((img, idx) => (
              <div 
                key={idx} 
                className="relative aspect-video group cursor-pointer"
                onClick={() => {
                  setSelectedImageIndex(idx);
                  setShowAllImages(false);
                }}
              >
                <Image
                  src={img}
                  alt={`${listing.title} - изображение ${idx + 1}`}
                  fill
                  className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
                <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
                  {idx + 1}/{listing.images.length}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`pb-16 ${isFullscreen ? 'fixed inset-0 bg-black z-50 overflow-auto' : ''}`}>
      {/* Кнопка назад (только не в полноэкранном режиме) */}
      {!isFullscreen && (
        <button 
          onClick={() => router.back()}
          className="fixed top-24 left-4 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:scale-110 transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      
      {/* Основное изображение с лупой */}
      <div className={`mb-8 ${isFullscreen ? 'max-w-full p-4' : 'max-w-4xl mx-auto'}`}>
        <div className="relative rounded-2xl overflow-hidden">
          <ImageMagnifier 
            src={listing.images[selectedImageIndex]}
            alt={`${listing.title} - изображение ${selectedImageIndex + 1}`}
            width={isFullscreen ? 1600 : 800}
            height={isFullscreen ? 900 : 600}
            magnifierHeight={isFullscreen ? 200 : 150}
            magnifierWidth={isFullscreen ? 200 : 150}
            zoomLevel={zoomLevel}
          />
          
          {/* Панель управления изображением */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button 
                onClick={prevImage}
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-all shadow-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                <span className="text-sm font-medium">
                  {selectedImageIndex + 1} / {listing.images.length}
                </span>
              </div>
              
              <button 
                onClick={nextImage}
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-all shadow-lg"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              
              {/* Контроль зума */}
              <div className="hidden md:flex items-center gap-1 ml-2">
                <button 
                  onClick={decreaseZoom}
                  className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-all shadow-lg"
                  aria-label="Уменьшить зум"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg text-sm">
                  {zoomLevel.toFixed(1)}×
                </div>
                <button 
                  onClick={increaseZoom}
                  className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-all shadow-lg"
                  aria-label="Увеличить зум"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowAllImages(true)}
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-lg hover:scale-105 transition-all shadow-lg flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                <span className="hidden md:inline">Все фото</span>
              </button>
              
              <button 
                onClick={toggleFullscreen}
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-all shadow-lg"
                aria-label={isFullscreen ? "Выйти из полноэкранного режима" : "Полноэкранный режим"}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Maximize2 className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          
          {/* Кнопки действий справа */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button 
              onClick={handleShareClick}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-all shadow-lg"
            >
              <Share2 className="h-5 w-5" />
            </button>
            
            <button 
              onClick={handleFavoriteClick}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-all shadow-lg"
            >
              <Heart className={`h-5 w-5 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>
        
        {/* Миниатюры */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {listing.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                selectedImageIndex === idx 
                  ? 'ring-2 ring-rose-500 scale-105 shadow-lg' 
                  : 'opacity-70 hover:opacity-100 hover:scale-105'
              }`}
              aria-label={`Показать изображение ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`Миниатюра ${idx + 1}`}
                fill
                className="object-cover"
              />
              {selectedImageIndex === idx && (
                <div className="absolute inset-0 bg-rose-500/20" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Модальное окно со всеми изображениями */}
      {renderAllImagesModal()}
      
      {/* Информация об объекте (скрываем в полноэкранном режиме) */}
      {!isFullscreen && (
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {listing.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-rose-500 text-rose-500" />
                <span className="font-semibold">{listing.rating}</span>
                <span className="text-gray-600 dark:text-gray-400">·</span>
                <span className="text-gray-600 dark:text-gray-400 underline cursor-pointer hover:text-gray-900 dark:hover:text-gray-100">
                  123 отзыва
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-600 dark:text-gray-400">
                  {listing.location}
                </span>
              </div>
              
              {listing.host.isSuperhost && (
                <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-900/30 px-3 py-1 rounded-full">
                  <Shield className="h-4 w-4 text-rose-500" />
                  <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
                    Суперхозяин
                  </span>
                </div>
              )}
            </div>
            
            {/* Информация о жилье */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border border-gray-200 dark:border-gray-800 rounded-2xl mb-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-gray-500" />
                <div className="font-semibold">{listing.guests} гостя</div>
                <div className="text-sm text-gray-500">максимум</div>
              </div>
              
              <div className="text-center">
                <Home className="h-6 w-6 mx-auto mb-2 text-gray-500" />
                <div className="font-semibold">{listing.bedrooms} спальни</div>
                <div className="text-sm text-gray-500">{listing.beds} кровати</div>
              </div>
              
              <div className="text-center">
                <Bed className="h-6 w-6 mx-auto mb-2 text-gray-500" />
                <div className="font-semibold">{listing.beds} кровати</div>
                <div className="text-sm text-gray-500">{listing.bedrooms} спальни</div>
              </div>
              
              <div className="text-center">
                <Bath className="h-6 w-6 mx-auto mb-2 text-gray-500" />
                <div className="font-semibold">{listing.bathrooms} ванные</div>
                <div className="text-sm text-gray-500">частные</div>
              </div>
            </div>
          </div>
          
          {/* Разделение контента */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Основной контент */}
            <div className="lg:col-span-2 space-y-8">
              {/* Описание */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Описание
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {listing.description}
                </p>
              </div>
              
              {/* Удобства */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                  Что входит в проживание
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {listing.amenities.map((amenity, idx) => {
                    const icons = [Wifi, Tv, Wind, Coffee, Car, Dog, Utensils, Globe];
                    const Icon = icons[idx % icons.length] || Check;
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Icon className="h-5 w-5 text-rose-500" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Боковая панель с бронированием */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-bold">₽{listing.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">ночь</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 fill-rose-500 text-rose-500" />
                    <span>{listing.rating} · 123 отзыва</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button 
                    onClick={handleBookClick}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg"
                  >
                    Забронировать
                  </button>
                  
                  <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Бронирование пока не снимает деньги
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between">
                      <span>₽{listing.price} x 5 ночей</span>
                      <span>₽{listing.price * 5}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Сбор за уборку</span>
                      <span>₽1,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Сбор за услуги Airbnb</span>
                      <span>₽2,340</span>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Итого</span>
                        <span>₽{(listing.price * 5 + 1500 + 2340).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Кнопка "Назад к списку" */}
          <div className="mt-12 text-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 font-semibold px-6 py-3 rounded-xl border border-rose-500 hover:border-rose-600 hover:bg-rose-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
              Вернуться к списку объектов
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}