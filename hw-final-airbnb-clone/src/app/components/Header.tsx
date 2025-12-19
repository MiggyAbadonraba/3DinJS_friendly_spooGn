'use client'

import Link from 'next/link'
import { Globe, Menu, User, Heart } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useApp } from '../context/AppContext'

export default function Header() {
  const { favorites, showToast } = useApp()

  const handleDemoAction = (actionName: string) => {
    showToast(`Функция "${actionName}" в демо-версии не реализована`, 'info')
  }

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
            onClick={() => handleDemoAction('Поиск')}
            className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full shadow-sm hover:shadow-md transition-all duration-300 px-6 py-3 w-150 justify-between bg-white dark:bg-gray-900 cursor-pointer"
          >
            <span className="text-sm font-medium">Куда едем?</span>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
            <span className="text-sm">Даты</span>
            <div className="h-6 w-px bg-gray-300 dark:border-gray-700"></div>
            <span className="text-sm">Гости</span>
            <div className="h-8 w-8 bg-rose-500 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Правая часть */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <button 
              onClick={() => handleDemoAction('Язык')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <Globe className="h-5 w-5" />
            </button>
            
            <Link 
              href="/profile" 
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            
            <Link 
              href="/profile"
              className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 hover:shadow-md transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Menu className="h-5 w-5" />
              <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}