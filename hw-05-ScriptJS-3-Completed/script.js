class Terminal {
    constructor(outputElement) {
        this.output = outputElement;
        this.currentLine = 0;
    }

    print(message, type = 'info', delay = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (message.trim() === '') {
                    resolve();
                    return;
                }
                
                const line = document.createElement('div');
                line.className = `output-line ${type}`;
                
                line.style.opacity = '0';
                line.textContent = message;
                
                this.output.appendChild(line);
                
                setTimeout(() => {
                    line.style.transition = 'opacity 0.5s ease';
                    line.style.opacity = '1';
                }, 50);
                
                const consoleMessage = `[${type.toUpperCase()}] ${message}`;
                switch(type) {
                    case 'error':
                        console.error(consoleMessage);
                        break;
                    case 'warning':
                        console.warn(consoleMessage);
                        break;
                    case 'success':
                        console.log(`%c${consoleMessage}`, 'color: #00ff88; font-weight: bold');
                        break;
                    case 'system':
                        console.log(`%c${consoleMessage}`, 'color: #00aaff; font-weight: bold');
                        break;
                    default:
                        console.log(consoleMessage);
                }
                
                this.scrollToBottom();
                this.currentLine++;
                resolve();
            }, delay);
        });
    }

    printCode(code, type = 'object', delay = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                const codeBlock = document.createElement('div');
                codeBlock.className = `output-line ${type} code-block`;
                
                codeBlock.style.opacity = '0';
                codeBlock.textContent = code;
                
                this.output.appendChild(codeBlock);
                
                setTimeout(() => {
                    codeBlock.style.transition = 'opacity 0.5s ease';
                    codeBlock.style.opacity = '1';
                }, 50);
                
                console.log(`%c${code}`, 'background: #000000; color: #ff9966; padding: 8px; border-radius: 4px; font-family: monospace;');
                
                this.scrollToBottom();
                resolve();
            }, delay);
        });
    }

    printSeparator(text = '=', type = 'full-separator', delay = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                const separator = document.createElement('div');
                separator.className = `output-line ${type}`;
                
                separator.style.opacity = '0';
                separator.textContent = text.repeat(80).substring(0, 80);
                
                this.output.appendChild(separator);
                
                setTimeout(() => {
                    separator.style.transition = 'opacity 0.5s ease';
                    separator.style.opacity = '1';
                }, 50);
                
                console.log(`%c${separator.textContent}`, 'color: #444444; font-weight: bold;');
                
                this.scrollToBottom();
                resolve();
            }, delay);
        });
    }

    startTaskGroup(title, delay = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                const group = document.createElement('div');
                group.className = 'output-line task-group';
                
                group.style.opacity = '0';
                
                const header = document.createElement('div');
                header.className = 'task-header';
                header.textContent = title;
                
                group.appendChild(header);
                this.output.appendChild(group);
                
                setTimeout(() => {
                    group.style.transition = 'opacity 0.5s ease';
                    group.style.opacity = '1';
                }, 50);
                
                console.log(`%c${title}`, 'color: #00aaff; font-size: 16px; font-weight: bold; margin: 10px 0;');
                
                this.scrollToBottom();
                this.currentLine++;
                resolve(group);
            }, delay);
        });
    }

    scrollToBottom() {
        this.output.parentElement.scrollTop = this.output.parentElement.scrollHeight;
    }

    clear() {
        this.output.innerHTML = '';
        this.currentLine = 0;
        console.clear();
        console.log('%cКонсоль очищена', 'color: #00aaff; font-weight: bold;');
    }
}

// Глобальные классы для всех заданий
class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
    
    getSummary() {
        return `"${this.title}" была написана ${this.author} в ${this.year} году`;
    }
}

class Magazine extends Book {
    constructor(title, author, year, month) {
        super(title, author, year);
        this.month = month;
    }
    
    getSummary() {
        return `"${this.title}" была написана ${this.author} в ${this.month} ${this.year} года`;
    }
}

// Добавляем статический метод в класс Book
Book.compareAge = function(book1, book2) {
    if (book1.year < book2.year) {
        return `"${book1.title}" была издана раньше, чем "${book2.title}"`;
    } else if (book1.year > book2.year) {
        return `"${book2.title}" была издана раньше, чем "${book1.title}"`;
    } else {
        return `"${book1.title}" и "${book2.title}" были изданы в одном году`;
    }
};

// Инициализация терминала
const terminal = new Terminal(document.getElementById('output'));
let isRunning = false;

// Задание 1: Работа с контекстом объектов
async function task1() {
    await terminal.print('Задание 1: Работа с контекстом объектов', 'system');
    
    // Создание объекта car
    const car = {
        brand: "Toyota",
        model: "Camry", 
        year: 2022,
        getDescription: function() {
            return `${this.brand} ${this.model}, выпущен в ${this.year} году.`;
        }
    };
    
    await terminal.print('Создан объект car:', 'info', 300);
    await terminal.printCode(`const car = {
    brand: "Toyota",
    model: "Camry", 
    year: 2022,
    getDescription: function() {
        return \\\`\${this.brand} \${this.model}, выпущен в \${this.year} году.\\\`;
    }
}`, 'object', 400);
    
    await terminal.print('Тестирование метода getDescription():', 'info', 400);
    await terminal.print(`Результат: ${car.getDescription()}`, 'success', 300);
    
    // Демонстрация с разными объектами
    await terminal.print('Создание дополнительных объектов:', 'info', 400);
    
    const car2 = {
        brand: "BMW",
        model: "X5",
        year: 2020,
        getDescription: car.getDescription // повторное использование метода
    };
    
    const car3 = {
        brand: "Lada",
        model: "Vesta", 
        year: 2023,
        getDescription: car.getDescription
    };
    
    await terminal.print(`car2: ${car2.getDescription()}`, 'object', 200);
    await terminal.print(`car3: ${car3.getDescription()}`, 'object', 200);
    
    await terminal.print('Метод корректно использует контекст (this) каждого объекта', 'success', 400);
}

// Задание 2.1: Создание класса Book
async function task2() {
    await terminal.printSeparator('~', 'section-separator', 500);
    await terminal.print('Задание 2.1: Создание класса Book', 'system');
    
    await terminal.print('Создан класс Book:', 'info', 300);
    await terminal.printCode(`class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
    
    getSummary() {
        return \\\`"\${this.title}" была написана \${this.author} в \${this.year} году\\\`;
    }
}`, 'object', 400);
    
    await terminal.print('Создание экземпляров класса Book:', 'info', 400);
    
    const book1 = new Book("Война и мир", "Лев Толстой", 1869);
    const book2 = new Book("1984", "Джордж Оруэлл", 1949);
    const book3 = new Book("Мастер и Маргарита", "Михаил Булгаков", 1967);
    
    await terminal.print(`book1: ${book1.getSummary()}`, 'object', 200);
    await terminal.print(`book2: ${book2.getSummary()}`, 'object', 200);
    await terminal.print(`book3: ${book3.getSummary()}`, 'object', 200);
    
    await terminal.print('Класс Book успешно создан и работает', 'success', 400);
}

// Задание 2.2: Наследование классов
async function task3() {
    await terminal.printSeparator('~', 'section-separator', 500);
    await terminal.print('Задание 2.2: Наследование классов', 'system');
    
    await terminal.print('Создан класс Magazine, наследуемый от Book:', 'info', 300);
    await terminal.printCode(`class Magazine extends Book {
    constructor(title, author, year, month) {
        super(title, author, year);
        this.month = month;
    }
    
    getSummary() {
        return \\\`"\${this.title}" была написана \${this.author} в \${this.month} \${this.year} года\\\`;
    }
}`, 'object', 400);
    
    await terminal.print('Создание экземпляров класса Magazine:', 'info', 400);
    
    const magazine1 = new Magazine("Наука и жизнь", "Редакция журнала", 2023, "октябре");
    const magazine2 = new Magazine("Forbes", "Forbes Media", 2024, "январе");
    
    await terminal.print(`magazine1: ${magazine1.getSummary()}`, 'object', 200);
    await terminal.print(`magazine2: ${magazine2.getSummary()}`, 'object', 200);
    
    // Демонстрация наследования
    await terminal.print('Проверка наследования:', 'info', 400);
    await terminal.print(`magazine1 instanceof Book: ${magazine1 instanceof Book}`, 'success', 200);
    await terminal.print(`magazine1 instanceof Magazine: ${magazine1 instanceof Magazine}`, 'success', 200);
    
    await terminal.print('Метод getSummary() успешно переопределен в классе Magazine', 'success', 400);
}

// Задание 2.3: Статический метод compareAge
async function task4() {
    await terminal.printSeparator('~', 'section-separator', 500);
    await terminal.print('Задание 2.3: Статический метод compareAge', 'system');
    
    await terminal.print('Добавлен статический метод compareAge в класс Book:', 'info', 300);
    await terminal.printCode(`Book.compareAge = function(book1, book2) {
    if (book1.year < book2.year) {
        return \\\`"\${book1.title}" была издана раньше, чем "\${book2.title}"\\\`;
    } else if (book1.year > book2.year) {
        return \\\`"\${book2.title}" была издана раньше, чем "\${book1.title}"\\\`;
    } else {
        return \\\`"\${book1.title}" и "\${book2.title}" были изданы в одном году\\\`;
    }
};`, 'object', 400);
    
    await terminal.print('Тестирование статического метода:', 'info', 400);
    
    // Создаем тестовые книги
    const oldBook = new Book("Старая книга", "Автор 1", 1900);
    const newBook = new Book("Новая книга", "Автор 2", 2020);
    const sameYearBook1 = new Book("Книга А", "Автор 3", 2000);
    const sameYearBook2 = new Book("Книга Б", "Автор 4", 2000);
    
    await terminal.print('Сравнение книг разного года:', 'info', 200);
    const result1 = Book.compareAge(oldBook, newBook);
    await terminal.print(`Book.compareAge(oldBook, newBook):`, 'object', 200);
    await terminal.print(`Результат: ${result1}`, 'success', 300);
    
    await terminal.print('Сравнение книг одного года:', 'info', 200);
    const result2 = Book.compareAge(sameYearBook1, sameYearBook2);
    await terminal.print(`Book.compareAge(sameYearBook1, sameYearBook2):`, 'object', 200);
    await terminal.print(`Результат: ${result2}`, 'success', 300);
    
    await terminal.print('Статический метод вызывается без создания экземпляра класса', 'success', 400);
}

// Функция очистки консоли
function clearConsole() {
    terminal.clear();
    document.getElementById('bonus-buttons').style.display = 'none';
    isRunning = false;
    
    setTimeout(() => {
        terminal.print('Консоль очищена', 'system', 500);
        terminal.print('Нажмите кнопку "Запустить практические задания" для повторного выполнения', 'info', 500);
    }, 800);
}

// Главная функция для запуска всех заданий
async function runAllTasks() {
    if (isRunning) {
        terminal.print('Задания уже выполняются! Подождите завершения.', 'warning', 300);
        return;
    }
    
    const runBtn = document.querySelector('.run-btn');
    runBtn.textContent = 'Выполнение...';
    runBtn.classList.add('running');
    runBtn.disabled = true;
    isRunning = true;
    
    terminal.clear();
    
    try {
        await terminal.print('Запуск практических заданий ТГвJS...', 'system', 800);
        await terminal.print('Инициализация системы...', 'info', 600);
        await terminal.print('Создание классов...', 'success', 400);
        await terminal.print('Подготовка объектов...', 'success', 400);
        await terminal.print('Настройка методов...', 'success', 400);
        await terminal.print('Всё готово к выполнению', 'success', 400);
        
        await terminal.startTaskGroup('ПРАКТИЧЕСКИЕ ЗАДАНИЯ ТГвJS: ОБЪЕКТЫ И КЛАССЫ', 500);
        
        await task1();
        await terminal.print('Подготавливаем следующее задание...', 'info', 1000);
        
        await task2();
        await terminal.print('Загружаем следующее задание...', 'info', 1000);
        
        await task3();
        await terminal.print('Переходим к следующему заданию...', 'info', 1000);
        
        await task4();
        
        await terminal.printSeparator('=', 'full-separator', 600);
        await terminal.print('ВСЕ ЗАДАНИЯ УСПЕШНО ВЫПОЛНЕНЫ!', 'success', 600);
        await terminal.print('', 'info', 300);
        await terminal.print('Отчёт о выполнении:', 'system', 400);
        await terminal.print('✓ Задание 1: Создан объект car с методом getDescription()', 'success', 200);
        await terminal.print('✓ Задание 2.1: Создан класс Book с методом getSummary()', 'success', 200);
        await terminal.print('✓ Задание 2.2: Создан класс Magazine, наследуемый от Book', 'success', 200);
        await terminal.print('✓ Задание 2.3: Добавлен статический метод compareAge()', 'success', 200);
        await terminal.print('', 'info', 300);
        await terminal.print('Проверьте консоль браузера для дополнительной информации', 'info', 400);
        
        setTimeout(() => {
            document.getElementById('bonus-buttons').style.display = 'flex';
        }, 1000);
        
    } catch (error) {
        await terminal.print(`💥 Ошибка: ${error.message}`, 'error', 300);
        console.error(error);
    } finally {
        runBtn.textContent = 'Запустить практические задания';
        runBtn.classList.remove('running');
        runBtn.disabled = false;
        isRunning = false;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        terminal.print('Система готова к работе', 'info', 500);
        terminal.print('Для начала выполнения нажмите кнопку "Запустить практические задания"', 'info', 500);
    }, 1000);
});