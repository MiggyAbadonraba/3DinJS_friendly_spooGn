class Terminal {
    constructor(outputElement) {
        this.output = outputElement;
        this.currentLine = 0;
    }

    print(message, type = 'info', delay = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                // Пропускаем пустые строки
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
                
                // Дублируем вывод в консоль браузера
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

    showGif(imageUrl, caption, delay = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                const gifContainer = document.createElement('div');
                gifContainer.className = 'output-line christopher-gif';
                
                gifContainer.style.opacity = '0';
                
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = caption;
                
                const captionElement = document.createElement('div');
                captionElement.className = 'christopher-text';
                captionElement.textContent = caption;
                
                gifContainer.appendChild(img);
                gifContainer.appendChild(captionElement);
                this.output.appendChild(gifContainer);
                
                setTimeout(() => {
                    gifContainer.style.transition = 'opacity 0.5s ease';
                    gifContainer.style.opacity = '1';
                }, 50);
                
                console.log(`%c${caption}`, 'color: #ffbd2e; font-size: 18px; font-weight: bold; font-style: italic;');
                console.log('%c(гифка Кристофера)', 'color: #00aaff; font-style: italic;');
                
                this.scrollToBottom();
                resolve();
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
        console.log('%cКонсоль очищена... как будто ничего и не было', 'color: #00aaff; font-weight: bold;');
    }
}

// Инициализация терминала
const terminal = new Terminal(document.getElementById('output'));
let isRunning = false;

// Группа 1: Базовые операции с переменными (задания 1-2)
async function basicVariablesTasks() {
    const group = await terminal.startTaskGroup('📝 ГРУППА 1: БАЗОВЫЕ БУПАТЕЛЬНЫЕ ОПЕРАЦИИ С ПЕРЕМЕННЫМИ', 500);
    
    // Задание 1
    await terminal.print('🎯 Задание 1: Работа с переменными роберта', 'system');
    
    let adminName;
    let userName = "Иван";
    adminName = userName;
    
    await terminal.print('📦 Объявлены переменные: adminName и userName (как всеми известный Болек и Лёлек)', 'info', 300);
    await terminal.print(`🆔 userName = "${userName}" (это тот, кто платит за кофе, наверное...)`, 'info', 200);
    await terminal.print('🔄 adminName = userName (великое клонирование в админа...)', 'info', 200);
    await terminal.print(`✅ Результат: adminName = "${adminName}" (теперь у нас два Ивана! Но один круче... Мы не узнаем, кто)`, 'success', 300);

    await terminal.printSeparator('~', 'section-separator', 400);
    
    // Задание 2
    await terminal.print('🎯 Задание 2: Понятные имена переменных (возможно!)', 'system');
    
    const planetName = "Земля";
    const currentUserName = "Бобан";
    const userRegistrationDate = "2024-01-15";
    const userRole = "администратор";
    
    await terminal.print(`🌍 planetName = "${planetName}" (наша голубая жемчужина)`, 'info', 200);
    await terminal.print(`👤 currentUserName = "${currentUserName}" (тот, кто вечно забывает пароль от компа инженера)`, 'info', 200);
    await terminal.print(`📅 userRegistrationDate = "${userRegistrationDate}" (помните этот день? Я точно не помню)`, 'info', 200);
    await terminal.print(`👑 userRole = "${userRole}" (бремя власти, но какие возможности!)`, 'info', 200);
    await terminal.print('✅ Переменные созданы с понятными названиями (даже бабуля поймет! Вполне себе...)', 'success', 300);
}

// Группа 2: Работа с объектами (задания 3-4)
async function objectsTasks() {
    await terminal.printSeparator('=', 'full-separator', 600);
    const group = await terminal.startTaskGroup('🛠️ ГРУППА 2: РАБОТА С БОЛ ОБЪЕКТАМИ', 500);
    
    // Задание 3
    await terminal.print('🎯 Задание 3: Работа с объектами', 'system');
    
    const product = {
        name: "Стационарный ноутбук",
        price: 45000
    };
    
    await terminal.print('📦 Создан объект product (основа для великих свершений нашего магазина):', 'info', 300);
    await terminal.printCode(JSON.stringify(product, null, 2), 'object', 400);
    
    product.category = "Электроника";
    product.price = 42000;
    
    await terminal.print('🔄 Добавлено свойство category и обновлена цена (но на распродажу и не надейтесь!):', 'info', 400);
    await terminal.printCode(JSON.stringify(product, null, 2), 'object', 400);
    await terminal.print('✅ Объект успешно обновлен (теперь можно идти в магазин, разрешается)', 'success', 300);

    await terminal.printSeparator('~', 'section-separator', 500);
    
    // Задание 4
    await terminal.print('🎯 Задание 4: Работа со сложными объектами', 'system');
    
    const student = {
        name: "Анна",
        age: 20,
        courses: ["Математика", "Физика", "Программирование"],
        address: {
            city: "Москва",
            street: "Ленина",
            number: 15
        }
    };
    
    await terminal.print('📦 Создан объект student (наш подопытный КРОЛ-лик):', 'info', 300);
    await terminal.printCode(JSON.stringify(student, null, 2), 'object', 500);
    
    await terminal.print('🔄 Манипуляции с объектом (путь студента тернист):', 'info', 400);
    await terminal.print('- 📚 Добавлен курс "JavaScript" (потому что модно, как и шэтэмээль, как и ссс)', 'object', 200);
    await terminal.print('- 🏙️ Город изменен на "Санкт-Петербург" (переезд в культурную столицу, но под мост...)', 'object', 200);
    await terminal.print('- ❌ Удален первый курс из массива (математика оказалась сложной, да и зачем она нужна... все умные)', 'object', 200);
    await terminal.print('- 📊 Добавлены оценки (суровая реальность мне в лоб)', 'object', 200);
    
    student.courses.push("JavaScript");
    student.address.city = "Санкт-Петербург";
    student.courses.shift();
    
    student.grades = {
        "Математика": 4,
        "Физика": 5,
        "Программирование": 5,
        "JavaScript": 5
    };
    
    await terminal.print('📋 Финальный объект student (во всей красе):', 'info', 400);
    await terminal.printCode(JSON.stringify(student, null, 2), 'object', 600);
    await terminal.print('✅ Сложный объект успешно обработан (студент готов к труду и сессии!)', 'success', 300);
}

// Группа 3: Функции и логика (задания 5-7)
async function functionsTasks() {
    await terminal.printSeparator('=', 'full-separator', 600);
    const group = await terminal.startTaskGroup('⚙️ ГРУППА 3: ФУНКЦИИ И (НЕ)ЛОГИКА', 500);
    
    // Задание 5
    await terminal.print('🎯 Задание 5: Разбор кода', 'system');
    
    let a = 1, b = 1;
    let c = ++a;
    let d = b++;
    
    await terminal.print('🔍 Исходный код (магия инкрементов):', 'info', 300);
    await terminal.print('let a = 1, b = 1; (близнецы-числа)', 'object', 200);
    await terminal.print('let c = ++a; (префиксный - сначала думает, потом делает)', 'object', 200);
    await terminal.print('let d = b++; (постфиксный - сначала делает, потом думает)', 'object', 200);
    
    await terminal.print('📊 Результат (откровение):', 'info', 300);
    await terminal.print(`a = ${a}, b = ${b}, c = ${c}, d = ${d} (числа преобразились!)`, 'object', 300);
    await terminal.print('✅ Префиксный инкремент: значение увеличивается до возврата', 'success', 300);
    await terminal.print('✅ Постфиксный инкремент: значение возвращается до увеличения', 'success', 300);

    await terminal.printSeparator('~', 'section-separator', 500);
    
    // Задание 6
    await terminal.print('🎯 Задание 6: Создание функций (что?)', 'system');
    
    function greet(name) {
        return `Привет, ${name}!`;
    }
    
    function sum(a, b) {
        return a + b;
    }
    
    function isEven(number) {
        return number % 2 === 0;
    }
    
    function calculateArea(width, height) {
        return width * height;
    }
    
    await terminal.print('🔧 Созданы функции:', 'info', 300);
    await terminal.print('greet(name) - возвращает приветствие (вежливость - наше всё)', 'object', 200);
    await terminal.print('sum(a, b) - возвращает сумму двух чисел (математика для чайников)', 'object', 200);
    await terminal.print('isEven(number) - проверяет четность числа (делимость на 2 без остатка)', 'object', 200);
    await terminal.print('calculateArea(width, height) - вычисляет площадь (геометрия в действии)', 'object', 200);
    
    await terminal.print('🧪 Тестирование функций (испытание огнем):', 'info', 300);
    await terminal.print(`greet("Мария") = "${greet("Мария")}"`, 'object', 200);
    await terminal.print(`sum(5, 3) = ${sum(5, 3)} (восемь - число совершенства)`, 'object', 200);
    await terminal.print(`isEven(4) = ${isEven(4)} (четное - символ баланса)`, 'object', 200);
    await terminal.print(`isEven(7) = ${isEven(7)} (нечетное - символ хаоса)`, 'object', 200);
    await terminal.print(`calculateArea(5, 10) = ${calculateArea(5, 10)} (площадь комнаты для медитации после юзабилити... Кхм.)`, 'object', 200);
    await terminal.print('✅ Все функции работают корректно (заклинания действуют! Но не воздействуют...)', 'success', 300);

    await terminal.printSeparator('~', 'section-separator', 500);
    
    // Задание 7
    await terminal.print('🎯 Задание 7: Функции и условные операторы', 'system');
    
    function checkAge(age) {
        if (age < 18) {
            return "Доступ запрещён: возраст меньше 18 лет.";
        } else if (age >= 18 && age <= 59) {
            return "Доступ разрешён: добро пожаловать!";
        } else {
            return "Доступ разрешён: добро пожаловать! Особые привилегии.";
        }
    }
    
    function getDiscount(totalAmount) {
        if (totalAmount < 1000) {
            return 0;
        } else if (totalAmount >= 1000 && totalAmount <= 5000) {
            return 5;
        } else {
            return 10;
        }
    }
    
    function greetUser(name, age) {
        const accessMessage = checkAge(age);
        return `Привет, ${name}! ${accessMessage}`;
    }
    
    await terminal.print('🔞 Тестирование функции checkAge (проверка возраста):', 'info', 300);
    await terminal.print(`checkAge(16) = "${checkAge(16)}" (извините, мелочи сюда не приносить!)`, 'object', 200);
    await terminal.print(`checkAge(25) = "${checkAge(25)}" (добро пожаловать, взрослый человек)`, 'object', 200);
    await terminal.print(`checkAge(65) = "${checkAge(65)}" (уважаемому пенсионеру - особые условия, да котлы генеральские...)`, 'object', 200);
    
    await terminal.print('💰 Тестирование функции getDiscount (магия скидок):', 'info', 300);
    await terminal.print(`getDiscount(500) = ${getDiscount(500)}% (маловато для скидки, приходите позже)`, 'object', 200);
    await terminal.print(`getDiscount(2500) = ${getDiscount(2500)}% (уже что-то, продолжайте в том же духе)`, 'object', 200);
    await terminal.print(`getDiscount(7500) = ${getDiscount(7500)}% (ваша щедрость вознаграждена (можно и пендалем)!)`, 'object', 200);
    
    await terminal.print('👋 Тестирование функции greetUser (персонализированное приветствие):', 'info', 300);
    await terminal.print(`greetUser("Алексей", 25) = "${greetUser("Алексей", 25)}"`, 'object', 200);
    await terminal.print('✅ Условные операторы работают корректно (логика не подвела!)', 'success', 300);
}

// Функция для показа Кристофера
async function showChristopher() {
    await terminal.printSeparator('*', 'full-separator', 300);
    await terminal.showGif(
        'gifs/1757003605_new_etos-special-ezgif.com-optimize.gif',
        'А вот и Кристофер! Кажется, он опять что-то натворил...',
        500
    );
    await terminal.print('⚠️ Кристофер был найден прячущимся в коде!', 'warning', 300);
    await terminal.print('💡 Похоже, он украл все точки с запятой... опять', 'info', 300);
}

// Функция очистки консоли
function clearConsole() {
    terminal.clear();
    document.getElementById('bonus-buttons').style.display = 'none';
    isRunning = false;
    
    setTimeout(() => {
        terminal.print('🧹 Консоль очищена (чисто, как в операционной)', 'system', 500);
        terminal.print('🔄 Нажмите кнопку "Потрогать древние руны" для повторного выполнения', 'info', 500);
    }, 800);
}

// Главная функция для запуска всех заданий
async function runAllTasks() {
    if (isRunning) {
        terminal.print('⚠️ Задания уже выполняются! Подождите завершения.', 'warning', 300);
        return;
    }
    
    const runBtn = document.querySelector('.run-btn');
    runBtn.textContent = 'Выполнение...';
    runBtn.classList.add('running');
    runBtn.disabled = true;
    isRunning = true;
    
    terminal.clear();
    
    try {
        await terminal.print('🚀 Запуск заданий по JavaScript...', 'system', 800);
        await terminal.print('⚡ Инициализация системы...', 'info', 600);
        await terminal.print('📊 Проверка переменных... ✓', 'success', 400);
        await terminal.print('🛠️ Загрузка объектов... ✓', 'success', 400);
        await terminal.print('🔧 Подготовка функций... ✓', 'success', 400);
        await terminal.print('🎉 Всё готово к выполнению!', 'success', 400);
        
        await basicVariablesTasks();
        await objectsTasks();
        await functionsTasks();
        
        await terminal.printSeparator('=', 'full-separator', 600);
        await terminal.print('🎊 Все задания успешно выполнены! (руны подчинились)', 'success', 600);
        await terminal.print('🏁 Программа завершена. (Но код живёт вечно...)', 'system', 600);
        
        // Показываем бонусные кнопки после завершения
        setTimeout(() => {
            document.getElementById('bonus-buttons').style.display = 'flex';
        }, 1000);
        
    } catch (error) {
        await terminal.print(`💥 Ошибка: ${error.message} (Кристофер, это ты?)`, 'error', 300);
    } finally {
        runBtn.textContent = 'Потрогать древние цифровые руны';
        runBtn.classList.remove('running');
        runBtn.disabled = false;
        isRunning = false;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        terminal.print('💻 Система готова к работе (и шутулукам)', 'info', 500);
        terminal.print('🎮 Для начала выполнения нажмите кнопку "Потрогать древние цифровые руны"', 'info', 500);
        terminal.print('⚠️ Предупреждение: спасибо за предупреждение', 'warning', 500);
    }, 1000);
});