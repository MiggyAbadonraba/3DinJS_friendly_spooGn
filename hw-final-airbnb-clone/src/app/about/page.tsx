export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        О проекте
      </h1>
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          Это минимальный шаблон проекта на Next.js 15+, созданный с учётом 
          современных лучших практик разработки.
        </p>
        <p>
          Основные цели проекта — предоставить чистую, производительную основу
          без лишней сложности, но с полной поддержкой необходимого функционала.
        </p>
        
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Особенности реализации тем
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
              <span>Используется <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">next-themes</code> для корректной работы с SSR</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
              <span>Все элементы имеют явные классы для темной темы</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
              <span>Плавные переходы между темами</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}