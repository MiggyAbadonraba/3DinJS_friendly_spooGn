#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Расширения файлов, которые считаются ключевыми
const KEY_FILE_EXTENSIONS = new Set([
  '.json', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', 
  '.css', '.scss', '.md', '.txt', '.yml', '.yaml', '.toml',
  '.config.js', '.config.ts', '.config.mjs', '.config.cjs'
]);

// Папки для игнорирования
const IGNORE_DIRS = new Set([
  'node_modules', '.next', '.git', '.vscode', '.idea', 
  '.cache', 'dist', 'build', 'coverage', '__pycache__',
  '.turbo', '.vercel', '.netlify', '.github'
]);

// Файлы для игнорирования
const IGNORE_FILES = new Set([
  '.DS_Store', 'Thumbs.db', '.env', '.env.local', '.env.production',
  '.eslintcache', '.npmrc', '.yarnrc', 'pnpm-lock.yaml',
  'bun.lockb', 'package-lock.json', 'yarn.lock', '.gitignore',
  '.prettierignore', '.eslintignore'
]);

// Файлы, которые всегда включаем как ключевые (даже если не в папке src)
const ALWAYS_KEY_FILES = new Set([
  'package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
  'bun.lockb', 'tsconfig.json', 'next.config.js', 'next.config.ts',
  'tailwind.config.js', 'tailwind.config.ts', 'postcss.config.js',
  'postcss.config.mjs', 'postcss.config.cjs', 'eslint.config.js',
  'eslint.config.mjs', '.eslintrc.js', '.eslintrc.json', '.prettierrc',
  'README.md', 'LICENSE', 'Dockerfile', 'docker-compose.yml',
  '.env.example', '.env.sample'
]);

async function getPackageVersions() {
  try {
    const packageJson = JSON.parse(
      await fs.readFile(path.join(projectRoot, 'package.json'), 'utf-8')
    );
    
    const versions = {
      bun: 'не установлен',
      next: packageJson.dependencies?.next || packageJson.devDependencies?.next || 'не указано',
      react: packageJson.dependencies?.react || packageJson.devDependencies?.react || 'не указано',
      reactDom: packageJson.dependencies?.['react-dom'] || packageJson.devDependencies?.['react-dom'] || 'не указано',
      tailwind: packageJson.dependencies?.tailwindcss || packageJson.devDependencies?.tailwindcss || 'не указано',
      typescript: packageJson.dependencies?.typescript || packageJson.devDependencies?.typescript || 'не указано',
    };

    // Получаем версию bun
    try {
      versions.bun = execSync('bun --version').toString().trim();
    } catch {
      try {
        versions.bun = execSync('bun -v').toString().trim();
      } catch {
        versions.bun = 'не установлен';
      }
    }

    return versions;
  } catch (error) {
    return {
      bun: 'не установлен',
      next: 'не указано',
      react: 'не указано',
      reactDom: 'не указано',
      tailwind: 'не указано',
      typescript: 'не указано',
    };
  }
}

async function getFileTree(dir, prefix = '', depth = 0, maxDepth = 8) {
  // Ограничиваем глубину для больших проектов
  if (depth > maxDepth) {
    return `${prefix}... (глубина ограничена)\n`;
  }

  let result = '';
  
  try {
    const items = await fs.readdir(dir);
    
    // Фильтруем и сортируем элементы
    const itemsWithStats = await Promise.all(
      items.map(async (item) => {
        if (IGNORE_DIRS.has(item) || IGNORE_FILES.has(item)) {
          return null;
        }
        
        const itemPath = path.join(dir, item);
        try {
          const stats = await fs.stat(itemPath);
          return { item, stats, isDirectory: stats.isDirectory() };
        } catch {
          return null;
        }
      })
    );

    // Отфильтровываем null и сортируем
    const validItems = itemsWithStats
      .filter(item => item !== null)
      .sort((a, b) => {
        // Сначала папки, потом файлы
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.item.localeCompare(b.item);
      });
    
    for (let i = 0; i < validItems.length; i++) {
      const { item, stats, isDirectory } = validItems[i];
      const itemPath = path.join(dir, item);
      const isLast = i === validItems.length - 1;
      const connector = isLast ? '└──' : '├──';
      const nextPrefix = prefix + (isLast ? '    ' : '│   ');
      
      if (isDirectory) {
        result += `${prefix}${connector} ${item}/\n`;
        result += await getFileTree(itemPath, nextPrefix, depth + 1, maxDepth);
      } else {
        result += `${prefix}${connector} ${item}\n`;
      }
    }
  } catch (error) {
    result += `${prefix}⚠️  Ошибка чтения директории: ${error.message}\n`;
  }
  
  return result;
}

async function getAllProjectFiles(baseDir = projectRoot, currentPath = '') {
  const files = [];
  
  try {
    const items = await fs.readdir(baseDir);
    
    for (const item of items) {
      if (IGNORE_DIRS.has(item) || IGNORE_FILES.has(item)) {
        continue;
      }
      
      const itemPath = path.join(baseDir, item);
      const relativePath = currentPath ? path.join(currentPath, item) : item;
      
      try {
        const stats = await fs.stat(itemPath);
        
        if (stats.isDirectory()) {
          // Рекурсивно сканируем поддиректории
          const subFiles = await getAllProjectFiles(itemPath, relativePath);
          files.push(...subFiles);
        } else {
          files.push(relativePath);
        }
      } catch (error) {
        console.warn(`⚠️  Пропущен файл ${relativePath}: ${error.message}`);
      }
    }
  } catch (error) {
    console.warn(`⚠️  Пропущена директория ${baseDir}: ${error.message}`);
  }
  
  return files.sort((a, b) => a.localeCompare(b));
}

function isKeyFile(filePath) {
  const fileName = path.basename(filePath);
  
  // Всегда включаем важные файлы
  if (ALWAYS_KEY_FILES.has(fileName)) {
    return true;
  }
  
  // Проверяем расширение
  const ext = path.extname(filePath).toLowerCase();
  
  // Если файл в src/ - считаем его важным
  const normalizedPath = filePath.replace(/\\/g, '/');
  if (normalizedPath.startsWith('src/')) {
    return KEY_FILE_EXTENSIONS.has(ext) || ext === '';
  }
  
  // В корне проекта проверяем расширения
  if (!normalizedPath.includes('/')) {
    return KEY_FILE_EXTENSIONS.has(ext);
  }
  
  // Конфигурационные файлы в любом месте
  if (fileName.includes('.config.') || fileName.includes('config.')) {
    return true;
  }
  
  return false;
}

async function readFileContent(filePath) {
  try {
    const fullPath = path.join(projectRoot, filePath);
    const content = await fs.readFile(fullPath, 'utf-8');
    
    // Определяем расширение для подсветки синтаксиса
    let ext = path.extname(filePath).slice(1);
    
    // Специальные случаи
    if (filePath.endsWith('.config.js') || filePath.endsWith('.config.ts')) {
      ext = 'javascript';
    } else if (ext === 'tsx') {
      ext = 'tsx';
    } else if (ext === 'jsx') {
      ext = 'jsx';
    } else if (ext === 'mjs' || ext === 'cjs') {
      ext = 'javascript';
    } else if (ext === 'yml' || ext === 'yaml') {
      ext = 'yaml';
    } else if (ext === 'md') {
      ext = 'markdown';
    }
    
    return { 
      content: content.trim(), 
      ext,
      success: true 
    };
  } catch (error) {
    return { 
      content: `// ❌ Ошибка чтения файла: ${error.message}`,
      ext: 'txt',
      success: false 
    };
  }
}

function getLanguageForExtension(ext) {
  const languageMap = {
    'js': 'javascript',
    'jsx': 'jsx',
    'ts': 'typescript',
    'tsx': 'tsx',
    'mjs': 'javascript',
    'cjs': 'javascript',
    'json': 'json',
    'css': 'css',
    'scss': 'scss',
    'md': 'markdown',
    'yml': 'yaml',
    'yaml': 'yaml',
    'toml': 'toml',
    'txt': 'text',
    '': 'text'
  };
  
  return languageMap[ext] || ext;
}

async function generateProjectInfo() {
  console.log('🔄 Генерация PROJECT_INFO.md...');
  console.log(`📁 Корневая директория: ${projectRoot}`);
  
  try {
    // Проверяем существование корневой директории
    try {
      await fs.access(projectRoot);
      console.log('✅ Корневая директория доступна');
    } catch {
      console.error('❌ Корневая директория не найдена или недоступна');
      return;
    }
    
    const versions = await getPackageVersions();
    console.log('✅ Версии технологий получены');
    
    const fileTree = await getFileTree(projectRoot);
    console.log('✅ Структура проекта получена');
    
    const allFiles = await getAllProjectFiles();
    console.log(`✅ Найдено ${allFiles.length} файлов проекта`);
    
    // Автоматически определяем ключевые файлы
    const keyFiles = allFiles.filter(isKeyFile);
    console.log(`✅ Выбрано ${keyFiles.length} ключевых файлов`);
    
    let mdContent = `# Airbnb Clone Project - Техническая информация\n\n`;
    mdContent += `*Автоматически сгенерировано ${new Date().toLocaleString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })}*\n\n`;
    
    // Версии технологий
    mdContent += `## 📦 Версии технологий\n\`\`\`json\n${JSON.stringify(versions, null, 2)}\n\`\`\`\n\n`;
    
    // Структура проекта
    if (fileTree.trim()) {
      mdContent += `## 📁 Структура проекта\n\`\`\`\n${fileTree}\`\`\`\n\n`;
    } else {
      mdContent += `## 📁 Структура проекта\n*Структура проекта пуста или не удалось прочитать*\n\n`;
    }
    
    // Все файлы проекта
    if (allFiles.length > 0) {
      mdContent += `## 📄 Все файлы проекта (${allFiles.length} файлов)\n\n`;
      mdContent += `\`\`\`\n${allFiles.join('\n')}\n\`\`\`\n\n`;
    } else {
      mdContent += `## 📄 Все файлы проекта\n*Файлы не найдены*\n\n`;
    }
    
    // Ключевые файлы с содержимым
    mdContent += `## 🔧 Код ключевых файлов (${keyFiles.length} файлов)\n\n`;
    
    // Сортируем ключевые файлы: сначала важные, потом остальные
    const sortedKeyFiles = keyFiles.sort((a, b) => {
      // Файлы из ALWAYS_KEY_FILES в начало
      const aIsImportant = ALWAYS_KEY_FILES.has(path.basename(a));
      const bIsImportant = ALWAYS_KEY_FILES.has(path.basename(b));
      
      if (aIsImportant && !bIsImportant) return -1;
      if (!aIsImportant && bIsImportant) return 1;
      
      // Затем сортируем по пути
      return a.localeCompare(b);
    });
    
    let processedFiles = 0;
    
    for (const file of sortedKeyFiles) {
      processedFiles++;
      console.log(`📁 Обработка файла ${processedFiles}/${sortedKeyFiles.length}: ${file}`);
      
      const { content, ext, success } = await readFileContent(file);
      const language = getLanguageForExtension(ext);
      
      mdContent += `### ${file}\n`;
      
      if (!success) {
        mdContent += `*⚠️ Файл не удалось прочитать*\n\n`;
      }
      
      mdContent += `\`\`\`${language}\n${content}\n\`\`\`\n\n`;
      
      // Ограничиваем размер файла (примерно 100KB)
      if (mdContent.length > 100000) {
        mdContent += `\n... и ещё ${sortedKeyFiles.length - processedFiles} файлов (отображение ограничено)\n\n`;
        break;
      }
    }
    
    // Команды для запуска
    mdContent += `## 🚀 Команды для запуска\n\`\`\`bash\n`;
    mdContent += `# Установка зависимостей\nbun install\n\n`;
    mdContent += `# Запуск в режиме разработки\nbun run dev\n\n`;
    mdContent += `# Сборка для продакшена\nbun run build\n\n`;
    mdContent += `# Запуск собранного приложения\nbun run start\n\n`;
    mdContent += `# Генерация информации о проекте\nbun run generate-info\n`;
    mdContent += `\`\`\`\n\n`;
    
    // Быстрое напоминание
    mdContent += `## 📝 Быстрое напоминание для чата\n`;
    mdContent += `\`\`\`\n`;
    mdContent += `Проект: Airbnb Clone\n`;
    mdContent += `Технологии: Bun ${versions.bun} + Next.js ${versions.next} + React ${versions.react} + Tailwind CSS ${versions.tailwind}\n`;
    mdContent += `Структура: App Router, TypeScript, темная/светлая тема\n`;
    mdContent += `Функции: интерактивный Header, избранное, профиль пользователя\n`;
    mdContent += `Файлов в проекте: ${allFiles.length}\n`;
    mdContent += `Ключевых файлов: ${keyFiles.length}\n`;
    mdContent += `\`\`\`\n`;
    
    // Дополнительная информация
    mdContent += `\n---\n`;
    mdContent += `*Сгенерировано автоматически. Для обновления выполните: \`bun run generate-info\`*\n`;
    
    await fs.writeFile(path.join(projectRoot, 'PROJECT_INFO.md'), mdContent);
    console.log(`✅ PROJECT_INFO.md успешно сгенерирован! (${Math.round(mdContent.length / 1024)} KB)`);
    
    // Также создаем сокращенную версию
    const shortContent = `# Проект Airbnb Clone

*Последнее обновление: ${new Date().toLocaleString('ru-RU')}*

**Статистика:**
- Всего файлов: ${allFiles.length}
- Ключевых файлов: ${keyFiles.length}
- Размер проекта: ${await getProjectSize()} MB

**Технологии:**
- Bun: ${versions.bun}
- Next.js: ${versions.next}
- React: ${versions.react}
- Tailwind CSS: ${versions.tailwind}
- TypeScript: ${versions.typescript}

**Команды:**
\`\`\`bash
bun install      # Установка зависимостей
bun run dev      # Запуск в режиме разработки
bun run build    # Сборка проекта
bun run start    # Запуск собранного приложения
\`\`\`

*Полная информация в [PROJECT_INFO.md](PROJECT_INFO.md)*
`;

    await fs.writeFile(path.join(projectRoot, 'PROJECT_INFO_SHORT.md'), shortContent);
    console.log('✅ PROJECT_INFO_SHORT.md также создан!');
    
  } catch (error) {
    console.error('❌ Ошибка генерации PROJECT_INFO.md:', error);
    process.exit(1);
  }
}

async function getProjectSize() {
  let totalSize = 0;
  
  async function calculateSize(dir) {
    const items = await fs.readdir(dir);
    
    for (const item of items) {
      if (IGNORE_DIRS.has(item)) continue;
      
      const itemPath = path.join(dir, item);
      try {
        const stats = await fs.stat(itemPath);
        
        if (stats.isDirectory()) {
          await calculateSize(itemPath);
        } else {
          totalSize += stats.size;
        }
      } catch {
        // Игнорируем ошибки при доступе к файлам
      }
    }
  }
  
  try {
    await calculateSize(projectRoot);
  } catch {
    // Игнорируем ошибки расчета размера
  }
  
  return (totalSize / (1024 * 1024)).toFixed(2);
}

// Запуск
generateProjectInfo();