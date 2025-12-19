# restructure.ps1 - Реструктуризация проекта Airbnb Clone

Write-Host "🎯 Начинаю реструктуризацию проекта..." -ForegroundColor Green

# 1. Создаем новую структуру папок
Write-Host "1. Создаю новую структуру папок..." -ForegroundColor Cyan

# Удаляем ненужные папки (если существуют)
$foldersToRemove = @(
    "src/app/components/HeaderDropdown",
    "src/app/components/HeroSearch",
    "src/app/components/Toast",
    "src/app/components/ToastContainer",
    "src/app/context",
    "src/app/data",
    "src/app/listings",
    "src/app/profile",
    "scripts"
)

foreach ($folder in $foldersToRemove) {
    if (Test-Path $folder) {
        Remove-Item -Recurse -Force $folder
        Write-Host "   Удалено: $folder" -ForegroundColor Yellow
    }
}

# Создаем чистую структуру
$newStructure = @{
    "src/app/components" = $null
    "src/app/hooks" = $null
    "src/app/lib" = $null
}

foreach ($path in $newStructure.Keys) {
    if (!(Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "   Создано: $path" -ForegroundColor Green
    }
}

# 2. Удаляем ненужные файлы
Write-Host "`n2. Очищаю ненужные файлы..." -ForegroundColor Cyan

$filesToRemove = @(
    "src/app/components/HeaderDropdown.tsx",
    "src/app/components/HeroSearch.tsx",
    "src/app/components/Toast.tsx",
    "src/app/components/ToastContainer.tsx",
    "src/app/context/AppContext.tsx",
    "src/app/data/listings.ts",
    "src/app/profile/page.tsx",
    "scripts/download-images.mjs",
    "scripts/generate-project-info.js",
    "PROJECT_INFO.md"
)

foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        Remove-Item -Force $file
        Write-Host "   Удалено: $file" -ForegroundColor Yellow
    }
}

# 3. Обновляем package.json
Write-Host "`n3. Обновляю зависимости..." -ForegroundColor Cyan

# Создаем новый package.json с оптимизированными зависимостями
$packageJson = @{
    name = "airbnb-clone-optimized"
    version = "1.0.0"
    private = true
    scripts = @{
        dev = "next dev --turbopack"
        build = "next build"
        start = "next start"
        lint = "next lint"
        clean = "rm -rf .next && rm -rf node_modules/.cache"
    }
    dependencies = @{
        "next" = "^16.0.10"
        "react" = "^19.2.1"
        "react-dom" = "^19.2.1"
        "lucide-react" = "^0.561.0"
        "next-themes" = "^0.4.4"
    }
    devDependencies = @{
        "@tailwindcss/postcss" = "^4.0.0"
        "@types/node" = "^20.0.0"
        "@types/react" = "^19.0.0"
        "@types/react-dom" = "^19.0.0"
        "tailwindcss" = "^4.0.0"
        "typescript" = "^5.0.0"
        "eslint" = "^9.0.0"
        "eslint-config-next" = "16.0.10"
    }
}

# Сохраняем обновленный package.json
$packageJson | ConvertTo-Json -Depth 10 | Out-File -FilePath "package.json" -Encoding UTF8
Write-Host "   package.json обновлен" -ForegroundColor Green

# 4. Устанавливаем/обновляем зависимости
Write-Host "`n4. Устанавливаю зависимости..." -ForegroundColor Cyan
pnpm install

# 5. Создаем новые, оптимизированные файлы
Write-Host "`n5. Создаю оптимизированные компоненты..." -ForegroundColor Cyan

# Создаем файлы по одному

# Создаем оптимизированный Header (объединяет Header + HeaderDropdown)
$headerContent = @'
"use client"

import { Globe, Menu, User, Sun, Moon, Calendar, Users, MapPin, Search, X, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { ThemeToggle } from "./ThemeToggle"

const cities = [
  "Москва", "Санкт-Петербург", "Сочи", "Казань", "Екатеринбург", 
  "Новосибирск", "Краснодар", "Владивосток", "Калининград", "Минск"
]

export default function Header() {
  const { theme } = useTheme()
  const [activeDropdown, setActiveDropdown] = useState<"where" | "when" | "who" | null>(null)
  const [guests, setGuests] = useState({ adults: 2, children: 0, infants: 0, pets: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const updateGuests = (type: keyof typeof guests, delta: number) => {
    setGuests(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }))
  }

  const handleSearchClick = () => {
    alert("Функция поиска в демо-версии не реализована")
  }

  if (!mounted) return null

  return (
    <header className="sticky top-0 w-full bg-white dark:bg-gray-900 z-50 border-b dark:border-gray-800 shadow-sm transition-colors">
      <div className="mx-auto px-4 py-3 flex items-center justify-between max-w-screen-80">
        {/* Логотип */}
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold text-rose-500 dark:text-rose-400">
            airbnb
          </Link>
        </div>

        {/* Центральная панель поиска */}
        <div className="hidden md:flex flex-1 justify-center">
          <div 
            onClick={() => setActiveDropdown("where")}
            className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full shadow-sm hover:shadow-md transition-all duration-300 px-6 py-3 w-150 justify-between bg-white dark:bg-gray-900 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">Выберите город</span>
            </div>
            
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Даты поездки</span>
            </div>
            
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">Гости</span>
              <div 
                onClick={handleSearchClick}
                className="h-8 w-8 bg-rose-500 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors"
              >
                <Search className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Правая часть */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Globe className="h-5 w-5" />
            </button>
            
            <Link href="/" className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 hover:shadow-md transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
              <Menu className="h-5 w-5" />
              <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Выпадающее меню */}
      {activeDropdown && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-150 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border dark:border-gray-800 overflow-hidden z-50 animate-slide-in">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">
                {activeDropdown === "where" && "Выберите город"}
                {activeDropdown === "when" && "Выберите даты"}
                {activeDropdown === "who" && "Кто едет?"}
              </h3>
              <button 
                onClick={() => setActiveDropdown(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Контент меню */}
            {activeDropdown === "where" && (
              <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => {
                      setActiveDropdown(null)
                      alert(`Выбран город: ${city}`)
                    }}
                    className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-800 dark:hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  >
                    <div className="font-medium">{city}</div>
                  </button>
                ))}
              </div>
            )}

            {activeDropdown === "who" && (
              <div className="space-y-6">
                {[
                  { label: "Взрослые", desc: "От 13 лет", key: "adults" },
                  { label: "Дети", desc: "2-12 лет", key: "children" },
                  { label: "Младенцы", desc: "До 2 лет", key: "infants" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => updateGuests(item.key as any, -1)}
                        disabled={guests[item.key as keyof typeof guests] <= 0}
                        className="h-8 w-8 rounded-full border border-gray-300 dark:border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-800 dark:hover:border-gray-400 flex items-center justify-center"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {guests[item.key as keyof typeof guests]}
                      </span>
                      <button 
                        onClick={() => updateGuests(item.key as any, 1)}
                        className="h-8 w-8 rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-800 dark:hover:border-gray-400 flex items-center justify-center"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
'@

$headerContent | Out-File -FilePath "src/app/components/Header.tsx" -Encoding UTF8
Write-Host "   Header.tsx создан" -ForegroundColor Green

# Создаем оптимизированный Footer
$footerContent = @'
"use client"

import { Facebook, Twitter, Instagram, Globe } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"

export default function Footer() {
  const { theme } = useTheme()
  const currentYear = new Date().getFullYear()
  
  const footerLinks = [
    { category: "О нас", links: ["Как работает Airbnb", "Новости", "Инвесторы"] },
    { category: "Сообщество", links: ["Доступность", "Гости", "Хозяева"] },
    { category: "Принимайте гостей", links: ["Сдайте жилье", "Ответственный прием"] },
    { category: "Поддержка", links: ["Центр помощи", "Варианты отмены"] },
  ]

  const handleDemoLink = (linkName: string) => {
    alert(`Ссылка "${linkName}" не работает в демо-версии`)
  }

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 mt-16 transition-colors">
      <div className="mx-auto px-4 py-8 max-w-screen-80">
        {/* Основные ссылки */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footerLinks.map((section) => (
            <div key={section.category}>
              <h3 className="font-semibold text-sm mb-4 text-gray-900 dark:text-gray-100">
                {section.category}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <button 
                      onClick={() => handleDemoLink(link)}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Левая часть */}
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-4 mb-3">
              <Link href="/" className="text-lg font-bold text-rose-500">
                airbnb
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>© {currentYear} Airbnb Clone</span>
                <span>·</span>
                <button onClick={() => handleDemoLink("Конфиденциальность")} className="hover:underline">
                  Конфиденциальность
                </button>
                <span>·</span>
                <button onClick={() => handleDemoLink("Условия")} className="hover:underline">
                  Условия
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Globe className="h-4 w-4" />
              <span>Русский (RU)</span>
              <span className="ml-4">₽ RUB</span>
            </div>
          </div>
          
          {/* Соцсети */}
          <div className="flex items-center gap-4">
            <button onClick={() => handleDemoLink("Facebook")} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <Facebook className="h-5 w-5" />
            </button>
            <button onClick={() => handleDemoLink("Twitter")} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <Twitter className="h-5 w-5" />
            </button>
            <button onClick={() => handleDemoLink("Instagram")} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <Instagram className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
'@

$footerContent | Out-File -FilePath "src/app/components/Footer.tsx" -Encoding UTF8
Write-Host "   Footer.tsx создан" -ForegroundColor Green

# Создаем оптимизированный ThemeToggle
$themeToggleContent = @'
"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="h-10 w-10 rounded-lg border border-gray-300" aria-label="Загрузка темы">
        <div className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-10 w-10 rounded-lg border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={theme === "dark" ? "Переключить на светлую тему" : "Переключить на тёмную тему"}
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
'@

$themeToggleContent | Out-File -FilePath "src/app/components/ThemeToggle.tsx" -Encoding UTF8
Write-Host "   ThemeToggle.tsx создан" -ForegroundColor Green

# Создаем ThemeProvider
$themeProviderContent = @'
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="airbnb-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
'@

$themeProviderContent | Out-File -FilePath "src/app/components/ThemeProvider.tsx" -Encoding UTF8
Write-Host "   ThemeProvider.tsx создан" -ForegroundColor Green

# Создаем упрощенный ListingCard
$listingCardContent = @'
"use client"

import { Star, MapPin, Heart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ListingCardProps {
  listing: {
    id: number
    title: string
    location: string
    price: number
    rating: number
    image: string
    guests: number
    bedrooms: number
  }
}

export default function ListingCard({ listing }: ListingCardProps) {
  const [favorite, setFavorite] = useState(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorite(!favorite)
  }

  return (
    <div className="group block cursor-pointer transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square">
        <Image
          src={listing.image}
          alt={listing.title}
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Кнопка избранного */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 h-10 w-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
          aria-label={favorite ? "Удалить из избранного" : "Добавить в избранное"}
        >
          <Heart className={`h-5 w-5 ${favorite ? "fill-rose-500 text-rose-500" : "text-gray-800 dark:text-gray-200"}`} />
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1 text-gray-900 dark:text-gray-100">
            {listing.title}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-rose-500 text-rose-500" />
            <span className="font-medium text-gray-900 dark:text-gray-100">{listing.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
          <MapPin className="h-3.5 w-3.5 mr-1.5" />
          <span className="line-clamp-1">{listing.location}</span>
        </div>
        
        <div className="pt-2">
          <p className="text-lg">
            <span className="font-bold text-gray-900 dark:text-gray-100">
              ₽{listing.price.toLocaleString("ru-RU")}
            </span>
            <span className="text-gray-600 dark:text-gray-400"> / ночь</span>
          </p>
        </div>
      </div>
    </div>
  )
}
'@

$listingCardContent | Out-File -FilePath "src/app/components/ListingCard.tsx" -Encoding UTF8
Write-Host "   ListingCard.tsx создан" -ForegroundColor Green

# Создаем упрощенный AppContext (комбинируем тему и избранное)
$appContextContent = @'
"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

interface Listing {
  id: number
  title: string
  location: string
  price: number
  rating: number
  image: string
}

interface AppContextType {
  favorites: Listing[]
  toggleFavorite: (listing: Listing) => void
  isFavorite: (id: number) => boolean
  showToast: (message: string, type?: "info" | "warning" | "error" | "success") => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Listing[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Загружаем избранное из localStorage
    const saved = localStorage.getItem("favorites")
    if (saved) {
      try {
        setFavorites(JSON.parse(saved))
      } catch {
        setFavorites([])
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
  }, [favorites, mounted])

  const toggleFavorite = (listing: Listing) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === listing.id)
      if (exists) {
        return prev.filter(fav => fav.id !== listing.id)
      } else {
        return [...prev, listing]
      }
    })
  }

  const isFavorite = (id: number) => {
    return favorites.some(fav => fav.id === id)
  }

  const showToast = (message: string, type: "info" | "warning" | "error" | "success" = "info") => {
    alert(`${type.toUpperCase()}: ${message}`)
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <AppContext.Provider value={{ favorites, toggleFavorite, isFavorite, showToast }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
'@

$appContextContent | Out-File -FilePath "src/app/components/AppProvider.tsx" -Encoding UTF8
Write-Host "   AppProvider.tsx создан" -ForegroundColor Green

# Создаем главную страницу с моковыми данными
$pageContent = @'
"use client"

import ListingCard from "./components/ListingCard"
import { Shield, Star, Zap, MapPin, TrendingUp, Award, Clock, Users } from "lucide-react"

const features = [
  { title: "Надёжная защита", desc: "Безопасные платежи и подтвержденные отзывы", icon: Shield },
  { title: "Выбор гостей", desc: "Лучшие варианты с высшим рейтингом", icon: Star },
  { title: "Мгновенное бронирование", desc: "Бронируйте без ожидания подтверждения", icon: Zap },
  { title: "Популярные направления", desc: "Актуальные тренды путешествий", icon: MapPin },
]

const mockListings = [
  {
    id: 1,
    title: "Уютная квартира в центре Москвы",
    location: "Москва, Тверской район",
    price: 4500,
    rating: 4.9,
    image: "/images/listing1.jpg",
    guests: 4,
    bedrooms: 2
  },
  {
    id: 2,
    title: "Апартаменты с видом на Неву",
    location: "Санкт-Петербург, Центр",
    price: 5200,
    rating: 4.8,
    image: "/images/listing2.jpg",
    guests: 3,
    bedrooms: 1
  },
  {
    id: 3,
    title: "Вилла у моря в Сочи",
    location: "Сочи, Адлерский район",
    price: 12000,
    rating: 4.95,
    image: "/images/listing3.jpg",
    guests: 8,
    bedrooms: 4
  },
  {
    id: 4,
    title: "Современный лофт в Казани",
    location: "Казань, Вахитовский район",
    price: 3800,
    rating: 4.7,
    image: "/images/listing4.jpg",
    guests: 2,
    bedrooms: 1
  },
  {
    id: 5,
    title: "Дом в традиционном стиле",
    location: "Екатеринбург, Центр",
    price: 5500,
    rating: 4.85,
    image: "/images/listing5.jpg",
    guests: 6,
    bedrooms: 3
  },
  {
    id: 6,
    title: "Квартира с панорамными окнами",
    location: "Новосибирск, Железнодорожный район",
    price: 4200,
    rating: 4.6,
    image: "/images/listing6.jpg",
    guests: 4,
    bedrooms: 2
  }
]

export default function Home() {
  const handleDemoButton = (buttonName: string) => {
    alert(`Кнопка "${buttonName}" не работает в демо-версии`)
  }

  return (
    <div className="mx-auto max-w-screen-80 px-4">
      {/* Герой-секция */}
      <section className="mb-12 text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Найдите идеальное жилье для вашего{" "}
          <span className="text-rose-500">отпуска</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          От уютных квартир до роскошных вилл — выберите то, что подходит именно вам
        </p>
      </section>

      {/* Особенности */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-center">
          Почему выбирают нас
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div 
                key={idx} 
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-rose-500 mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Карточки объявлений */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Популярные варианты
          </h2>
          <button 
            onClick={() => handleDemoButton("Показать все")}
            className="text-sm font-semibold text-gray-800 dark:text-gray-300 hover:text-rose-500 transition-colors"
          >
            Показать все →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockListings.map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 mb-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Начните планировать вашу поездку
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Сохраняйте понравившиеся варианты и получайте персонализированные рекомендации
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => handleDemoButton("Начать поиск")}
              className="bg-rose-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-rose-600 transition-all hover:scale-105 active:scale-95"
            >
              Начать поиск
            </button>
            <button 
              onClick={() => handleDemoButton("Узнать больше")}
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              Узнать больше
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
'@

$pageContent | Out-File -FilePath "src/app/page.tsx" -Encoding UTF8
Write-Host "   page.tsx создан" -ForegroundColor Green

# Создаем обновленный layout
$layoutContent = @'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./components/ThemeProvider"
import { AppProvider } from "./components/AppProvider"
import Header from "./components/Header"
import Footer from "./components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Airbnb Clone | Жилье для отпуска",
  description: "Найди уникальное жилье для любой поездки",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <AppProvider>
            <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
              <Header />
              <main className="grow pt-20 w-full max-w-screen-80 mx-auto px-4">
                {children}
              </main>
              <Footer />
            </div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
'@

$layoutContent | Out-File -FilePath "src/app/layout.tsx" -Encoding UTF8
Write-Host "   layout.tsx создан" -ForegroundColor Green

# Создаем обновленный globals.css
$globalsCss = @'
@import "tailwindcss";

/* Плавные переходы для темы */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

/* Анимации */
@keyframes slideIn {
  from {
    transform: translateY(-10px) translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
}

@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

.animate-heart-beat {
  animation: heartBeat 0.5s ease-in-out;
}

/* Стили для скроллбара */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #d4d4d4;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a3a3a3;
}

.dark ::-webkit-scrollbar-track {
  background: #262626;
}

.dark ::-webkit-scrollbar-thumb {
  background: #525252;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #737373;
}

/* Кастомные утилиты */
.max-w-screen-80 {
  max-width: 80vw !important;
}
'@

$globalsCss | Out-File -FilePath "src/app/globals.css" -Encoding UTF8
Write-Host "   globals.css обновлен" -ForegroundColor Green

# Создаем tsconfig.json для правильных путей
$tsconfig = @'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
'@

$tsconfig | Out-File -FilePath "tsconfig.json" -Encoding UTF8
Write-Host "   tsconfig.json обновлен" -ForegroundColor Green

# Обновляем tailwind.config.ts
$tailwindConfig = @'
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        }
      },
      maxWidth: {
        'screen-80': '80vw',
      },
      width: {
        '150': '600px',
      },
      animation: {
        'heart-beat': 'heartBeat 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px) translateX(-50%)', opacity: '0' },
          '100%': { transform: 'translateY(0) translateX(-50%)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

export default config
'@

$tailwindConfig | Out-File -FilePath "tailwind.config.ts" -Encoding UTF8
Write-Host "   tailwind.config.ts обновлен" -ForegroundColor Green

Write-Host "`n✅ Реструктуризация завершена!" -ForegroundColor Green
Write-Host "`n📋 Файлы созданы:"
Write-Host "   • src/app/components/Header.tsx" -ForegroundColor Cyan
Write-Host "   • src/app/components/Footer.tsx" -ForegroundColor Cyan
Write-Host "   • src/app/components/ThemeToggle.tsx" -ForegroundColor Cyan
Write-Host "   • src/app/components/ThemeProvider.tsx" -ForegroundColor Cyan
Write-Host "   • src/app/components/ListingCard.tsx" -ForegroundColor Cyan
Write-Host "   • src/app/components/AppProvider.tsx" -ForegroundColor Cyan
Write-Host "   • src/app/page.tsx" -ForegroundColor Cyan
Write-Host "   • src/app/layout.tsx" -ForegroundColor Cyan
Write-Host "   • src/app/globals.css" -ForegroundColor Cyan
Write-Host "`n🚀 Для запуска проекта выполните:" -ForegroundColor Yellow
Write-Host "   pnpm dev" -ForegroundColor White -BackgroundColor DarkBlue
Write-Host "`n🛠  Для сборки выполните:" -ForegroundColor Yellow
Write-Host "   pnpm build" -ForegroundColor White -BackgroundColor DarkBlue