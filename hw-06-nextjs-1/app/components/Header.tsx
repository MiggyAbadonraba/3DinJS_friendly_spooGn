'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
  const [isPagesOpen, setIsPagesOpen] = useState(false)

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4 sm:gap-0">
          
          {/* Логотип и название */}
          <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto justify-center sm:justify-start">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
              <Image
                src="/christopher.gif"
                alt="Анимированный логотип"
                width={48}
                height={48}
                className="object-cover"
                unoptimized
                sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 56px"
              />
            </div>
            <div className="text-lg sm:text-xl font-bold text-gray-800 text-center sm:text-left whitespace-nowrap">
              А куда это вы хотели от Кристофера уйти?
            </div>
          </div>

          {/* Навигация */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
            <button className="text-sm sm:text-base text-gray-700 hover:text-[#23BBBC] transition-colors duration-200 font-medium whitespace-nowrap">
              Домой?
            </button>

            <button className="text-sm sm:text-base text-gray-700 hover:text-[#23BBBC] transition-colors duration-200 font-medium whitespace-nowrap">
              В компоненты?
            </button>

            {/* Выпадающее меню */}
            <div className="relative">
              <button 
                className="text-sm sm:text-base text-gray-700 hover:text-[#23BBBC] transition-colors duration-200 font-medium flex items-center space-x-1 whitespace-nowrap"
                onClick={() => setIsPagesOpen(!isPagesOpen)}
              >
                <span>Может быть странички?</span>
                <svg 
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${isPagesOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isPagesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                    Без хехе
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                    НИКАКИХ хаха
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                    Может быть хихи
                  </a>
                </div>
              )}
            </div>

            <button className="text-sm sm:text-base text-gray-700 hover:text-[#23BBBC] transition-colors duration-200 font-medium whitespace-nowrap">
              Или в документы?
            </button>

            <button className="bg-[#23BBBC] text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg hover:bg-[#1da5a6] transition-colors duration-200 font-medium shadow-sm text-sm sm:text-base whitespace-nowrap">
              Лучше сразу купить...
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}