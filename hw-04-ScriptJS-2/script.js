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

// Инициализация терминала
const terminal = new Terminal(document.getElementById('output'));
let isRunning = false;

// Задание 1: Фильтрация чётных чисел
async function task1() {
    await terminal.print('Задание 1: Фильтрация чётных чисел из массива', 'system');
    
    function filterEvenNumbers(arr) {
        return arr.filter(num => num % 2 === 0);
    }
    
    await terminal.print('Создана функция filterEvenNumbers:', 'info', 300);
    await terminal.printCode('function filterEvenNumbers(arr) {\n  return arr.filter(num => num % 2 === 0);\n}', 'object', 400);
    
    const testArrays = [
        [1, 2, 3, 4, 5, 6],
        [10, 15, 20, 25],
        [0, -1, -2, -3, -4],
        [],
        [7, 9, 11]
    ];
    
    await terminal.print('Тестирование функции на разных массивах:', 'info', 400);
    
    for (let i = 0; i < testArrays.length; i++) {
        const testArr = testArrays[i];
        const result = filterEvenNumbers(testArr);
        
        await terminal.print(`Тест ${i + 1}:`, 'info', 200);
        await terminal.print(`Вход: [${testArr.join(', ')}]`, 'object', 200);
        await terminal.print(`Результат: [${result.join(', ')}]`, result.length > 0 ? 'success' : 'warning', 300);
        
        if (testArr.length === 0) {
            await terminal.print('Пустой массив возвращает пустой результат', 'info', 200);
        }
    }
    
    await terminal.print('Задание 1 завершено', 'success', 400);
}

// Задание 2: Вывод чисел от n до 1
async function task2() {
    await terminal.printSeparator('~', 'section-separator', 500);
    await terminal.print('Задание 2: Вывод чисел от n до 1 с использованием цикла while', 'system');
    
    function countdownFrom(n) {
        if (n <= 0 || !Number.isInteger(n)) {
            return "Ошибка: n должно быть положительным целым числом";
        }
        
        let result = [];
        let current = n;
        
        while (current >= 1) {
            result.push(current);
            current--;
        }
        
        return result;
    }
    
    await terminal.print('Создана функция countdownFrom:', 'info', 300);
    await terminal.printCode('function countdownFrom(n) {\n  let result = [];\n  let current = n;\n  \n  while (current >= 1) {\n    result.push(current);\n    current--;\n  }\n  \n  return result;\n}', 'object', 400);
    
    const testValues = [5, 3, 10, 1, 0, -5, 7.5];
    
    await terminal.print('Тестирование функции на разных значениях:', 'info', 400);
    
    for (let value of testValues) {
        const result = countdownFrom(value);
        
        await terminal.print(`Тест с n = ${value}:`, 'info', 200);
        
        if (Array.isArray(result)) {
            await terminal.print(`Результат: [${result.join(' → ')}]`, 'success', 300);
            
            if (result.length === 0) {
                await terminal.print('Для n ≤ 0 возвращается пустой массив', 'warning', 200);
            }
        } else {
            await terminal.print(`Результат: ${result}`, 'error', 300);
        }
    }
    
    await terminal.print('Задание 2 завершено', 'success', 400);
}

// Задание 3: Определение длины слов
async function task3() {
    await terminal.printSeparator('~', 'section-separator', 500);
    await terminal.print('Задание 3: Определение длины слов с использованием метода map', 'system');
    
    function getWordsLength(words) {
        return words.map(word => word.length);
    }
    
    await terminal.print('Создана функция getWordsLength:', 'info', 300);
    await terminal.printCode('function getWordsLength(words) {\n  return words.map(word => word.length);\n}', 'object', 400);
    
    const testWordArrays = [
        ["apple", "cat", "banana"],
        ["JavaScript", "HTML", "CSS"],
        ["МИЭТ", "Тверь", "программирование"],
        ["", "a", "abcde"],
        ["солнечно", "дождь", "ветер"]
    ];
    
    await terminal.print('Тестирование функции на разных массивах слов:', 'info', 400);
    
    for (let i = 0; i < testWordArrays.length; i++) {
        const words = testWordArrays[i];
        const lengths = getWordsLength(words);
        
        await terminal.print(`Тест ${i + 1}:`, 'info', 200);
        
        let output = "Слова: ";
        words.forEach((word, index) => {
            output += `"${word}"(${lengths[index]})`;
            if (index < words.length - 1) output += ", ";
        });
        
        await terminal.print(output, 'object', 300);
        await terminal.print(`Длины: [${lengths.join(', ')}]`, 'success', 300);
        
        if (words.includes("")) {
            await terminal.print('Пустая строка имеет длину 0', 'info', 200);
        }
    }
    
    await terminal.print('Задание 3 завершено', 'success', 400);
}

// Задание 4: Нумерация строк
async function task4() {
    await terminal.printSeparator('~', 'section-separator', 500);
    await terminal.print('Задание 4: Нумерация строк', 'system');
    
    function printNumberedStrings(strings) {
        strings.forEach((str, index) => {
            console.log(`${index + 1}. ${str}`);
        });
        
        return strings.map((str, index) => `${index + 1}. ${str}`);
    }
    
    await terminal.print('Создана функция printNumberedStrings:', 'info', 300);
    await terminal.printCode('function printNumberedStrings(strings) {\n  strings.forEach((str, index) => {\n    console.log(`${index + 1}. ${str}`);\n  });\n}', 'object', 400);
    
    const testStringArrays = [
        ["Привет", "Как дела?", "До свидания"],
        ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"],
        ["Красный", "Зеленый", "Синий"],
        ["Кофе", "Чай"]
    ];
    
    await terminal.print('Тестирование функции на разных массивах строк:', 'info', 400);
    
    for (let i = 0; i < testStringArrays.length; i++) {
        const strings = testStringArrays[i];
        
        await terminal.print(`Тест ${i + 1} с массивом: [${strings.map(s => `"${s}"`).join(', ')}]`, 'info', 300);
        await terminal.print('Результат нумерации:', 'system', 200);
        
        const numberedStrings = printNumberedStrings(strings);
        
        for (let numberedStr of numberedStrings) {
            await terminal.print(numberedStr, 'object', 150);
        }
        
        await terminal.print('Строки пронумерованы с использованием forEach', 'info', 300);
    }
    
    await terminal.print('Задание 4 завершено', 'success', 400);
}

// Задание 5: Поиск чисел больше заданного значения
async function task5() {
    await terminal.printSeparator('~', 'section-separator', 500);
    await terminal.print('Задание 5: Поиск чисел больше заданного значения', 'system');
    
    function filterGreaterThan(arr, n) {
        return arr.filter(num => num > n);
    }
    
    await terminal.print('Создана функция filterGreaterThan:', 'info', 300);
    await terminal.printCode('function filterGreaterThan(arr, n) {\n  return arr.filter(num => num > n);\n}', 'object', 400);
    
    const testCases = [
        { arr: [10, 20, 30, 40, 50], n: 25 },
        { arr: [5, 15, 25, 35, 45], n: 20 },
        { arr: [1, 2, 3, 4, 5], n: 10 },
        { arr: [100, 200, 300], n: 150 },
        { arr: [-10, -5, 0, 5, 10], n: -3 }
    ];
    
    await terminal.print('Тестирование функции на разных наборах данных:', 'info', 400);
    
    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        const result = filterGreaterThan(testCase.arr, testCase.n);
        
        await terminal.print(`Тест ${i + 1}:`, 'info', 200);
        await terminal.print(`Массив: [${testCase.arr.join(', ')}], n = ${testCase.n}`, 'object', 200);
        await terminal.print(`Результат: [${result.join(', ')}]`, result.length > 0 ? 'success' : 'warning', 300);
        
        if (result.length === 0) {
            await terminal.print('В массиве нет чисел, больших заданного значения', 'info', 200);
        } else {
            await terminal.print(`Найдено ${result.length} чисел больше ${testCase.n}`, 'info', 200);
        }
    }
    
    await terminal.print('Пример из задания:', 'system', 400);
    const exampleResult = filterGreaterThan([10, 20, 30, 40, 50], 25);
    await terminal.print('filterGreaterThan([10, 20, 30, 40, 50], 25)', 'object', 200);
    await terminal.print(`Результат: [${exampleResult.join(', ')}]`, 'success', 300);
    
    await terminal.print('Задание 5 завершено', 'success', 400);
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
        await terminal.print('Загрузка массивов...', 'success', 400);
        await terminal.print('Подготовка циклов...', 'success', 400);
        await terminal.print('Настройка функций...', 'success', 400);
        await terminal.print('Всё готово к выполнению', 'success', 400);
        
        await terminal.startTaskGroup('ПРАКТИЧЕСКИЕ ЗАДАНИЯ ТГвJS', 500);
        
        await task1();
        await terminal.print('Подготавливаем следующее задание...', 'info', 5000);
        
        await task2();
        await terminal.print('Загружаем следующее задание...', 'info', 5000);
        
        await task3();
        await terminal.print('Переходим к следующему заданию...', 'info', 5000);
        
        await task4();
        await terminal.print('Готовим финальное задание...', 'info', 5000);
        
        await task5();
        
        await terminal.printSeparator('=', 'full-separator', 600);
        await terminal.print('Все 5 заданий успешно выполнены', 'success', 600);
        
        setTimeout(() => {
            document.getElementById('bonus-buttons').style.display = 'flex';
        }, 1000);
        
    } catch (error) {
        await terminal.print(`💥 Ошибка: ${error.message} (Кристофер, это ты?)`, 'error', 300);
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