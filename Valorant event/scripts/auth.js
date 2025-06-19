document.addEventListener('DOMContentLoaded', function() {
    // Переключение между вкладками
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Удаляем активный класс у всех кнопок и контента
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке и контенту
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Проверка паролей при регистрации
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        // Валидация
        if (password !== confirmPassword) {
            showError('Пароли не совпадают');
            return;
        }
        
        if (password.length < 6) {
            showError('Пароль должен содержать минимум 6 символов');
            return;
        }
        
        // Сохраняем пользователя в localStorage
        const user = {
            username,
            email,
            password
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('user_' + email, JSON.stringify(user));
        
        // Перенаправляем на страницу календаря
        window.location.href = '../pages/auth.html';
    });
    
    // Логин
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Проверяем есть ли такой пользователь
        const user = JSON.parse(localStorage.getItem('user_' + email));
        
        if (!user || user.password !== password) {
            showError('Неверный email или пароль');
            return;
        }
        
        // Сохраняем текущего пользователя
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Перенаправляем на страницу календаря
        window.location.href = '../pages/calendar.html';
    });
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const burgerMenu = document.querySelector(".burger-menu");
    const mobileMenu = document.querySelector(".mobile-menu");
    const overlay = document.querySelector(".overlay");
  
    burgerMenu.addEventListener("click", function () {
      this.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  
    overlay.addEventListener("click", function () {
      burgerMenu.classList.remove("active");
      mobileMenu.classList.remove("active");
      this.classList.remove("active");
    });
  });