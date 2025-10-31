import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 flex flex-col space-y-8">
        
        {/* Блок 1 с общей функциональной частью футера */}
        <div className="flex flex-col xl:flex-row justify-between items-start space-y-8 xl:space-y-0">
          
          {/* Блок с информацией и социальными сетями */}
          <div className="flex-1 max-w-md space-y-6">
            
            {/* Лого */}
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-700">
                <Image
                  src="/puff.jpg"
                  alt="Логотип"
                  fill
                  className="object-cover object-center"
                  sizes="48px"
                />
              </div>
              <span className="text-xl font-bold">А вы что думали? Не думайте...</span>
            </div>
            
            {/* Блок с информацией */}
            <div className="text-gray-300 leading-relaxed">
              Стартовая точка, которую очень важно пройти всем и каждому, ведь только тогда можно быть готовым использовать Next.js, работая с Tailwind и обретая свободу... (наверное).
            </div>
            
            {/* Блок с социальными сетями */}
            <div className="flex space-x-4">
              {/* ВКонтакте */}
              <Link href="#" className="bg-gray-700 hover:bg-[#0f5050] rounded-lg p-2 transition-colors">
                <div className="w-6 h-6 relative">
                  <Image
                    src="/social/ri_vk-fill.png"
                    alt="ВКонтакте"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </Link>
              
              {/* Pinterest */}
              <Link href="#" className="bg-gray-700 hover:bg-[#0f5050] rounded-lg p-2 transition-colors">
                <div className="w-6 h-6 relative">
                  <Image
                    src="/social/logos_pinterest.png"
                    alt="Pinterest"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </Link>
              
              {/* Tailwind CSS */}
              <Link href="#" className="bg-gray-700 hover:bg-[#0f5050] rounded-lg p-2 transition-colors">
                <div className="w-6 h-6 relative">
                  <Image
                    src="/social/tailwindcss.png"
                    alt="Tailwind CSS"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </Link>
              
              {/* Next.js */}
              <Link href="#" className="bg-gray-700 hover:bg-[#0f5050] rounded-lg p-2 transition-colors">
                <div className="w-6 h-6 relative">
                  <Image
                    src="/social/nextjs.png"
                    alt="Next.js"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>
          </div>
          
          {/* Блок с пунктами меню футера */}
          <div className="flex-1 w-full xl:w-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 justify-items-start xl:justify-items-end">
              
              {/* Блок Minimal */}
              <div className="space-y-4 text-left">
                <h3 className="text-lg font-semibold text-white mb-4">МИНИМАЛЬНОЕ</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link href="#" className="hover:text-[#23BBBC] transition-colors">О нас</Link></li>
                  <li><Link href="#" className="hover:text-[#23BBBC] transition-colors">Связаться с нами</Link></li>
                  <li><Link href="#" className="hover:text-[#23BBBC] transition-colors">Частые вопросы</Link></li>
                </ul>
              </div>
              
              {/* Блок Legal */}
              <div className="space-y-4 text-left">
                <h3 className="text-lg font-semibold text-white mb-4">ПРАВОВОЕ</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link href="#" className="hover:text-[#23BBBC] transition-colors">Условия использования</Link></li>
                  <li><Link href="#" className="hover:text-[#23BBBC] transition-colors">Политика конфиденциальности</Link></li>
                </ul>
              </div>
              
              {/* Блок Contact */}
              <div className="space-y-4 text-left">
                <h3 className="text-lg font-semibold text-white mb-4">КОНТАКТЫ</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="hover:text-[#23BBBC] transition-colors cursor-pointer">support@miet-js.ru</li>
                  <li className="leading-relaxed max-w-xs">Москва, Зеленоград, площадь Шокина, 1</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Копирайт */}
        <div className="border-t border-gray-700 pt-8 text-center lg:text-left">
          <div className="text-gray-400">
            @2025. Надоело быб жужом?
          </div>
        </div>
      </div>
    </footer>
  )
}