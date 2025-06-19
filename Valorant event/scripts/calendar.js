document.addEventListener('DOMContentLoaded', function() {
    // Проверяем авторизацию
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    // Отображаем имя пользователя
    document.getElementById('usernameDisplay').textContent = currentUser.username;
    
    // Выход из системы
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
    
    // Данные календаря
    const calendarData = JSON.parse(localStorage.getItem('calendarData_' + currentUser.email)) || {
        claimedDays: [],
        dailyMissions: {},
        weeklyMissions: {}
    };
    
    // Награды за дни
    const dailyRewards = [
        { day: 1, reward: "BP XP 10K", image: "../images/xp.webp" },
        { day: 2, reward: "10 RP", image: "../images/radianite-point.png" },
        { day: 3, reward: "Карточка <От руки>", image: "../images/card-1.webp" },
        { day: 4, reward: "Панорамник - Classic", image: "../images/valorant-skin-1.jpg" },
        { day: 5, reward: "BP XP 5K", image: "../images/xp.webp" },
        { day: 6, reward: "Панорамник - Bucky", image: "../images/valorant-skin-2.jpg" },
        { day: 7, reward: "10 RP", image: "../images/radianite-point.png" },
        { day: 8, reward: "Карточка <Мороженное>", image: "../images/card-2.webp" },
        { day: 9, reward: "BP XP 10K", image: "../images/xp.webp" },
        { day: 10, reward: "Панорамник - Guardian", image: "../images/valorant-skin-3.jpg" },
        { day: 11, reward: "BP XP 5K", image: "../images/xp.webp" },
        { day: 12, reward: "10 RP", image: "../images/radianite-point.png" },
        { day: 13, reward: "Рисунок от руки - Ghost", image: "../images/valorant-skin-4.jpg" },
        { day: 14, reward: "Карточка <Переход>", image: "../images/card-3.webp" },
        { day: 15, reward: "BP XP 10K", image: "../images/xp.webp" },
        { day: 16, reward: "Рисунок от руки - Spector", image: "../images/valorant-skin-5.jpg" },
        { day: 17, reward: "10 RP", image: "../images/radianite-point.png" },
        { day: 18, reward: "Рисунок от руки - Marshal", image: "i../mages/valorant-skin-6.jpg" },
        { day: 19, reward: "Карточка <Панорамник>", image: "../images/card-4.webp" },
        { day: 20, reward: "Рисунок от руки - Odin", image: "../images/valorant-skin-7.jpg" },
        { day: 21, reward: "15 RP", image: "../images/radianite-point.png" },
        { day: 22, reward: "15 RP", image: "../images/radianite-point.png" },
        { day: 23, reward: "Переходный стиль - Vandal", image: "../images/valorant-skin-8.jpg" },
        { day: 24, reward: "Карточка <Летнаяя дорога>", image: "../images/card-5.webp" },
        { day: 25, reward: "BP XP 5K", image: "../images/xp.webp" },
        { day: 26, reward: "Переходный стиль - Bulldog", image: "../images/valorant-skin-9.jpg" },
        { day: 27, reward: "15 RP", image: "../images/radianite-point.png" },
        { day: 28, reward: "Карточка <Бомбочки>", image: "../images/card-6.webp" },
        { day: 29, reward: "BP XP 10K", image: "../images/xp.webp" },
        { day: 30, reward: "RDVR - Phantom", image: "../images/valorant-skin-10.jpg" }
    ];
    
    // Ежедневные задания
    const dailyMissions = [
        { id: 'daily1', name: "Сыграть 1 матч", reward: "1000 Опыта", progress: 0, max: 1},
        { id: 'daily2', name: "Нанести 2000 урона", reward: "1500 Опыта", progress: 0, max: 2000},
        { id: 'daily3', name: "Сделать 10 убийств", reward: "2000 Опыта", progress: 0, max: 10}
    ];
    
    // Еженедельные задания
    const weeklyMissions = [
        { id: 'weekly1', name: "Сыграть 10 матчей", reward: "5000 Опыта", progress: 0, max: 10},
        { id: 'weekly2', name: "Выиграть 5 матчей", reward: "7500 Опыта", progress: 0, max: 5},
        { id: 'weekly3', name: "Сделать 50 убийств", reward: "10000 Опыта", progress: 0, max: 50}
    ];
    
    // Загружаем прогресс из localStorage
    if (calendarData.dailyMissions) {
        dailyMissions.forEach(mission => {
            if (calendarData.dailyMissions[mission.id]) {
                mission.progress = calendarData.dailyMissions[mission.id].progress;
            }
        });
    }
    
    if (calendarData.weeklyMissions) {
        weeklyMissions.forEach(mission => {
            if (calendarData.weeklyMissions[mission.id]) {
                mission.progress = calendarData.weeklyMissions[mission.id].progress;
            }
        });
    }
    
    // Обновляем статистику пользователя
    updateUserStats();
    
    function updateUserStats() {
        const daysCompleted = calendarData.claimedDays.length;
        const rewardsEarned = daysCompleted + 
            Object.keys(calendarData.dailyMissions).filter(id => calendarData.dailyMissions[id].completed).length +
            Object.keys(calendarData.weeklyMissions).filter(id => calendarData.weeklyMissions[id].completed).length;
        
        document.getElementById('daysCompleted').textContent = daysCompleted;
        document.getElementById('rewardsEarned').textContent = rewardsEarned;
        document.getElementById('progressText').textContent = `${daysCompleted}/30 дней`;
        
        // Обновляем прогресс-бар
        const progressPercent = (daysCompleted / 30) * 100;
        document.querySelector('.progress-bar');
    }
    
    // Генерируем календарь
    const calendarGrid = document.getElementById('calendarGrid');
    const today = new Date().getDate();
    
    dailyRewards.forEach((reward, index) => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        if (index + 1 === today) {
            dayCard.classList.add('today');
        }
        
        dayCard.innerHTML = `
            <div class="day-number">День ${reward.day}</div>
            <div class="day-reward">${reward.reward}</div>
        `;
        
        if (calendarData.claimedDays.includes(reward.day)) {
            dayCard.classList.add('claimed');
        } else if (index + 1 <= today) {
            dayCard.addEventListener('click', () => claimReward(reward));
        } else {
            dayCard.style.opacity = '0.5';
            dayCard.style.cursor = 'not-allowed';
        }
        
        calendarGrid.appendChild(dayCard);
    });
    
    // Генерируем ежедневные задания
    const dailyMissionsList = document.getElementById('dailyMissions');
    
    dailyMissions.forEach(mission => {
        const missionItem = document.createElement('li');
        missionItem.className = 'mission-item';
        
        const progressPercent = (mission.progress / mission.max) * 100;
        const isCompleted = calendarData.dailyMissions[mission.id]?.completed || false;
        
        missionItem.innerHTML = `
            <div class="mission-info">
                <h4>${mission.name}</h4>
                <span class="mission-reward">${mission.reward}</span>
                <div class="mission-progress">
                    <div class="mission-progress-bar" style="width: ${progressPercent}%"></div>
                </div>
            </div>
            <button class="mission-btn ${isCompleted ? 'completed' : ''}" 
                ${isCompleted || mission.progress < mission.max ? 'disabled' : ''}>
                ${isCompleted ? 'Получено' : (mission.progress >= mission.max ? 'Получить' : `${mission.progress}/${mission.max}`)}
            </button>
        `;
        
        const btn = missionItem.querySelector('.mission-btn');
        if (btn && !isCompleted && mission.progress >= mission.max) {
            btn.addEventListener('click', () => completeMission('daily', mission));
        }
        
        dailyMissionsList.appendChild(missionItem);
    });
    
    // Генерируем еженедельные задания
    const weeklyMissionsList = document.getElementById('weeklyMissions');
    
    weeklyMissions.forEach(mission => {
        const missionItem = document.createElement('li');
        missionItem.className = 'mission-item';
        
        const progressPercent = (mission.progress / mission.max) * 100;
        const isCompleted = calendarData.weeklyMissions[mission.id]?.completed || false;
        
        missionItem.innerHTML = `
            <div class="mission-info">
                <h4>${mission.name}</h4>
                <span class="mission-reward">${mission.reward}</span>
                <div class="mission-progress">
                    <div class="mission-progress-bar" style="width: ${progressPercent}%"></div>
                </div>
            </div>
            <button class="mission-btn ${isCompleted ? 'completed' : ''}" 
                ${isCompleted || mission.progress < mission.max ? 'disabled' : ''}>
                ${isCompleted ? 'Получено' : (mission.progress >= mission.max ? 'Получить' : `${mission.progress}/${mission.max}`)}
            </button>
        `;
        
        const btn = missionItem.querySelector('.mission-btn');
        if (btn && !isCompleted && mission.progress >= mission.max) {
            btn.addEventListener('click', () => completeMission('weekly', mission));
        }
        
        weeklyMissionsList.appendChild(missionItem);
    });
    
    // Таймер обновления заданий
    updateRefreshTimers();
    setInterval(updateRefreshTimers, 1000);
    
    function updateRefreshTimers() {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const dailyDiff = midnight - now;
        
        const hours = Math.floor((dailyDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((dailyDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((dailyDiff % (1000 * 60)) / 1000);
        
        document.getElementById('dailyRefresh').textContent = 
            `${Math.floor(hours)}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Для еженедельного обновления (каждое воскресенье в 00:00)
        const nextSunday = new Date();
        nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()));
        nextSunday.setHours(0, 0, 0, 0);
        const weeklyDiff = nextSunday - now;
        
        const days = Math.floor(weeklyDiff / (1000 * 60 * 60 * 24));
        const weeklyHours = Math.floor((weeklyDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        document.getElementById('weeklyRefresh').textContent = 
            `${days}д ${weeklyHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Функция получения награды за день
    function claimReward(reward) {
        if (!calendarData.claimedDays.includes(reward.day)) {
            calendarData.claimedDays.push(reward.day);
            localStorage.setItem('calendarData_' + currentUser.email, JSON.stringify(calendarData));
            
            // Показываем уведомление
            showRewardNotification(reward.reward, reward.image);
            
            // Обновляем интерфейс
            const dayCards = document.querySelectorAll('.day-card');
            dayCards[reward.day - 1].classList.add('claimed');
            dayCards[reward.day - 1].removeEventListener('click', () => claimReward(reward));
            
            // Обновляем статистику
            updateUserStats();
        }
    }
    
    // Функция завершения задания
    function completeMission(type, mission) {
        if (type === 'daily') {
            calendarData.dailyMissions[mission.id] = { completed: true };
        } else {
            calendarData.weeklyMissions[mission.id] = { completed: true };
        }
        
        localStorage.setItem('calendarData_' + currentUser.email, JSON.stringify(calendarData));
        
        // Показываем уведомление
        showRewardNotification(mission.reward, mission.image);
        
        // Обновляем интерфейс
        const missionItems = document.querySelectorAll('.mission-item');
        missionItems.forEach(item => {
            if (item.querySelector('h4').textContent === mission.name) {
                const btn = item.querySelector('.mission-btn');
                btn.textContent = 'Получено';
                btn.disabled = true;
                btn.classList.add('completed');
            }
        });
        
        // Обновляем статистику
        updateUserStats();
    }
    
    // Функция показа уведомления о награде
    function showRewardNotification(reward, image) {
        const notification = document.getElementById('rewardNotification');
        document.getElementById('rewardName').textContent = reward;
        document.getElementById('rewardImage').src = image;
        notification.style.display = 'flex';
    }
    
    // Глобальная функция для закрытия уведомления
    window.closeRewardNotification = function() {
        document.getElementById('rewardNotification').style.display = 'none';
    }
    
    // Проверяем, есть ли неполученные награды за предыдущие дни
    checkMissedDays();
    
    function checkMissedDays() {
        const today = new Date().getDate();
        const missedDays = [];
        
        for (let i = 1; i < today && i <= 30; i++) {
            if (!calendarData.claimedDays.includes(i)) {
                missedDays.push(i);
            }
        }
        
        if (missedDays.length > 0) {
            setTimeout(() => {
                alert(`У вас есть неполученные награды за дни: ${missedDays.join(', ')}. Не забудьте их получить!`);
            }, 1000);
        }
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