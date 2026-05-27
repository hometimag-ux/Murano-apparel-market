// Parallax эффект для ленты товаров
function initParallax() {
    const container = document.querySelector('.parallax-container');
    const track = document.querySelector('.parallax-track');
    
    if (!container || !track) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    // Drag to scroll
    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });
    
    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });
    
    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });
    
    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
    
    // Кнопки навигации
    const prevBtn = document.querySelector('.parallax-nav.prev');
    const nextBtn = document.querySelector('.parallax-nav.next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            container.scrollBy({ left: -320, behavior: 'smooth' });
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            container.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }
    
    // Parallax эффект при прокрутке
    container.addEventListener('scroll', () => {
        const cards = document.querySelectorAll('.parallax-card');
        const scrollPosition = container.scrollLeft;
        
        cards.forEach((card, index) => {
            const cardOffset = card.offsetLeft;
            const depth = parseFloat(card.dataset.depth) || 0.2;
            const translateY = Math.sin((scrollPosition - cardOffset) * 0.01) * 15 * depth;
            const rotateY = (scrollPosition - cardOffset) * 0.05 * depth;
            
            card.style.transform = `translateY(${translateY}px) rotateY(${rotateY}deg)`;
        });
    });
}

// Добавление в корзину с parallax эффектом
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart-parallax')) {
        const btn = e.target.closest('.add-to-cart-parallax');
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
});

// Запуск parallax после загрузки
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initParallax, 100);
});

// Обновляем при изменении размера окна
window.addEventListener('resize', initParallax);
