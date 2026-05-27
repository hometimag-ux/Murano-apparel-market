// Плавный стэк эффект с Intersection Observer
function initStackEffect() {
    const container = document.querySelector('.scroll-stack');
    const cards = document.querySelectorAll('.stack-card');
    
    if (!container || !cards.length) return;
    
    // Используем Intersection Observer для определения активной карточки
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const card = entry.target;
            const rect = entry.boundingClientRect;
            const containerRect = container.getBoundingClientRect();
            
            // Центр контейнера
            const containerCenter = containerRect.top + containerRect.height / 2;
            const cardCenter = rect.top + rect.height / 2;
            const distance = Math.abs(containerCenter - cardCenter);
            const maxDistance = containerRect.height / 2;
            
            // Масштабирование: 1.05 в центре, 0.85 на краях
            let scale;
            if (distance < 50) {
                scale = 1.05; // Центр
                card.classList.add('scale-up');
                card.classList.remove('scale-down');
            } else {
                scale = 0.92 - (distance / maxDistance) * 0.1;
                scale = Math.max(0.85, Math.min(0.92, scale));
                card.classList.remove('scale-up');
                card.classList.add('scale-down');
            }
            
            const wrapper = card.querySelector('.card-wrapper');
            if (wrapper) {
                wrapper.style.transform = `scale(${scale})`;
            }
        });
    }, {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        root: container,
        rootMargin: '0px'
    });
    
    // Наблюдаем за каждой карточкой
    cards.forEach(card => observer.observe(card));
    
    // Плавная прокрутка колесиком
    let isScrolling = false;
    let scrollTimeout;
    
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 1 : -1;
        const currentIndex = findCurrentCardIndex(container, cards);
        const targetIndex = Math.min(Math.max(0, currentIndex + delta), cards.length - 1);
        
        if (!isScrolling && targetIndex !== currentIndex) {
            isScrolling = true;
            cards[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 500);
        }
    }, { passive: false });
    
    function findCurrentCardIndex(container, cards) {
        const containerRect = container.getBoundingClientRect();
        let closestIndex = 0;
        let minDistance = Infinity;
        
        cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const distance = Math.abs(cardRect.top - containerRect.top);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });
        
        return closestIndex;
    }
    
    // Добавляем обработчик для кнопок корзины
    document.querySelectorAll('.add-to-cart-stack').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            if (id) {
                Site.addToCart(id);
                const originalText = btn.innerHTML;
                btn.innerHTML = '✓ Добавлено!';
                btn.style.background = '#4caf50';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '#0066cc';
                }, 1000);
            }
        });
    });
}

// Запуск
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initStackEffect, 200);
});
