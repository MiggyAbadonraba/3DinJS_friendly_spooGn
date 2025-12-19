import Link from 'next/link'
import { Facebook, Twitter, Instagram, Globe } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = [
    { category: 'О нас', links: ['Как работает Airbnb', 'Новости', 'Инвесторы'] },
    { category: 'Сообщество', links: ['Доступность', 'Гости', 'Хозяева'] },
    { category: 'Принимайте гостей', links: ['Сдайте жилье', 'Ответственный прием'] },
    { category: 'Поддержка', links: ['Центр помощи', 'Варианты отмены'] },
  ]

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
                <button className="hover:underline">
                  Конфиденциальность
                </button>
                <span>·</span>
                <button className="hover:underline">
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
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <Facebook className="h-5 w-5" />
            </button>
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <Twitter className="h-5 w-5" />
            </button>
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <Instagram className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}