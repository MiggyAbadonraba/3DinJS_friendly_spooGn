document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Проверяем сохранённую тему
    function checkTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeIcon.classList.remove('sun-icon');
            themeIcon.classList.add('moon-icon');
        }
    }
    
    // Переключаем тему
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        if (isDark) {
            themeIcon.classList.remove('sun-icon');
            themeIcon.classList.add('moon-icon');
        } else {
            themeIcon.classList.remove('moon-icon');
            themeIcon.classList.add('sun-icon');
        }
    }
    
    // Инициализация темы
    checkTheme();
    
    // Обработчик клика по переключателю
    themeToggle.addEventListener('click', toggleTheme);
    
    // Проверяем системные настройки темы (если пользователь не выбирал вручную)
    if (!localStorage.getItem('theme')) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            document.body.classList.add('dark-theme');
            themeIcon.classList.remove('sun-icon');
            themeIcon.classList.add('moon-icon');
            localStorage.setItem('theme', 'dark');
        }
    }
});