"use client";

import { Star, MapPin, Users, Home, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import Link from "next/link";

interface ListingCardProps {
  listing: {
    id: number;
    title: string;
    location: string;
    price: number;
    rating: number;
    image: string;
    isGuestFavorite?: boolean;
    guests: number;
    bedrooms: number;
  };
}

export default function ListingCard({ listing }: ListingCardProps) {
  const { toggleFavorite, isFavorite } = useApp();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    
    toggleFavorite({
      id: listing.id,
      title: listing.title,
      location: listing.location,
      price: listing.price,
      rating: listing.rating,
      image: listing.image,
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const favorite = isFavorite(listing.id);

  return (
    <Link 
      href={`/listings/${listing.id}`}
      className="group block cursor-pointer transition-all duration-300 hover:-translate-y-2"
    >
      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square">
        <Image
          src={listing.image}
          alt={listing.title}
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          priority={listing.id <= 4}
        />
        
        {/* Плашка "Выбор гостей" */}
        {listing.isGuestFavorite && (
          <div className="absolute top-3 left-3 bg-white dark:bg-gray-900 px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Выбор гостей</span>
          </div>
        )}
        
        {/* Кнопка избранного */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 h-10 w-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
          style={{
            animation: isAnimating ? 'heartBeat 0.5s ease-in-out' : 'none',
          }}
          aria-label={favorite ? "Удалить из избранного" : "Добавить в избранное"}
        >
          <Heart 
            className={`h-5 w-5 transition-all duration-300 ${favorite ? 'fill-rose-500 text-rose-500 scale-125' : 'fill-white dark:fill-gray-900 text-gray-800 dark:text-gray-200 stroke-2'}`}
          />
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1 pr-2 text-gray-900 dark:text-gray-100">{listing.title}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="h-4 w-4 fill-rose-500 text-rose-500" />
            <span className="font-medium text-gray-900 dark:text-gray-100">{listing.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
          <MapPin className="h-3.5 w-3.5 mr-1.5 shrink-0" />
          <span className="line-clamp-1">{listing.location}</span>
        </div>
        
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            <span>{listing.guests} гостей</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Home className="h-3.5 w-3.5" />
            <span>{listing.bedrooms} спальни</span>
          </div>
        </div>
        
        <div className="pt-2">
          <p className="text-lg">
            <span className="font-bold text-gray-900 dark:text-gray-100">₽{listing.price.toLocaleString("ru-RU")}</span>
            <span className="text-gray-600 dark:text-gray-400"> / ночь</span>
          </p>
        </div>
      </div>
    </Link>
  );
}