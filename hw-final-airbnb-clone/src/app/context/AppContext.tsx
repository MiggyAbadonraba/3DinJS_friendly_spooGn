"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

interface FavoriteListing {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

interface ToastMessage {
  id: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
}

interface AppContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  favorites: FavoriteListing[];
  toggleFavorite: (listing: FavoriteListing) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  showToast: (message: string, type?: "info" | "warning" | "error" | "success") => void;
  currentToast: ToastMessage | null;
  clearToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Ленивая инициализация темы
  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) return savedTheme;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  });

  // Ленивая инициализация избранного
  const [favorites, setFavorites] = useState<FavoriteListing[]>(() => {
    if (typeof window === "undefined") return [];
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentToast, setCurrentToast] = useState<ToastMessage | null>(null);

  // Применение темы при изменении
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Сохранение избранного при изменении
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => (prev === "light" ? "dark" : "light"));
  }, []);

  const toggleFavorite = useCallback((listing: FavoriteListing) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === listing.id);
      if (exists) {
        return prev.filter(fav => fav.id !== listing.id);
      } else {
        return [...prev, listing];
      }
    });
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  }, []);

  const isFavorite = useCallback((id: number) => {
    return favorites.some(fav => fav.id === id);
  }, [favorites]);

  const setUserProfileCallback = useCallback((profile: UserProfile | null) => {
    setUserProfile(profile);
  }, []);

  const showToast = useCallback((message: string, type: "info" | "warning" | "error" | "success" = "info") => {
    const id = Date.now().toString();
    setCurrentToast({ id, message, type });
    
    // Автоматическое удаление через 5 секунд
    setTimeout(() => {
      setCurrentToast(null);
    }, 5000);
  }, []);

  const clearToast = useCallback(() => {
    setCurrentToast(null);
  }, []);

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      favorites,
      toggleFavorite,
      removeFavorite,
      isFavorite,
      userProfile,
      setUserProfile: setUserProfileCallback,
      showToast,
      currentToast,
      clearToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}