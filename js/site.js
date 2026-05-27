// TikTok/Reels эффект для товаров
function initReelsEffect() {
    const container = document.querySelector('.reels-container');
    const cards = document.querySelectorAll('.reels-card');
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    if (!container || !cards.length) return;
    
    function updateCards() {
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.top + containerRect.height / 2;
        
        cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.top + cardRect.height / 2;
            const distanceFromCenter = Math.abs(containerCenter - cardCenter);
            const maxDistance = containerRect.height / 2;
            
            // Масштаб от 0.6 до 1 в зависимости от близости к центру
            let scale = 1 - (distanceFromCenter / maxDistance) * 0.4;
            scale = Math.max(0.6, Math.min(1, scale));
            
            // Прозрачность
            let opacity = 1 - (distanceFromCenter / maxDistance) * 0.5;
            opacity = Math.max(0.3, Math.min(1, opacity));
            
            // Поворот для 3D эффекта
            const rotate = (distanceFromCenter / maxDistance) * 5;
            const direction = cardCenter < containerCenter ? -rotate : rotate;
            
            card.style.transform = `scale(${scale})`;
            card.style.opacity = opacity;
            card.querySelector('.card-inner').style.transform = `perspective(1000px) rotateX(${direction}deg)`;
            
            // Добавляем активный класс для центральной карточки
            if (Math.abs(distanceFromCenter) < 50) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        // Обновляем прогресс скролла
        if (progressBar) {
            const scrollPercent = container.scrollTop / (container.scrollHeight - container.clientHeight);
            const heightPercent = scrollPercent * 100;
            progressBar.style.height = `${heightPercent}%`;
        }
    }
    
    // Обработчик скролла с throttle
    let ticking = false;
    container.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateCards();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Обработчик изменения размера
    window.addEventListener('resize', updateCards);
    
    // Первоначальный запуск
    setTimeout(updateCards, 100);
}

// Добавление в корзину
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart-reels')) {
        const btn = e.target.closest('.add-to-cart-reels');
        const id = parseInt(btn.dataset.id);
        
        if (id) {
            Site.addToCart(id);
            
            // Визуальный фидбек
            const originalText = btn.innerHTML;
            btn.innerHTML = '✓ Добавлено!';
            btn.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = 'linear-gradient(135deg, #0066cc, #0052a3)';
            }, 1000);
        }
    }
    
    // Лайк
    if (e.target.closest('.like-btn')) {
        const btn = e.target.closest('.like-btn');
        btn.classList.toggle('liked');
        
        if (btn.classList.contains('liked')) {
            btn.innerHTML = '❤️';
            // Можно добавить сохранение в избранное
        } else {
            btn.innerHTML = '♡';
        }
    }
});

// Запуск
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initReelsEffect, 100);
});
