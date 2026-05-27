// Дополнительная логика сайта (слайдеры, анимации)
document.addEventListener('DOMContentLoaded', () => {
    // Простая логика слайдера (будет улучшена позже)
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    function showSlide(index) {
        if (!slides.length) return;
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        currentSlide = index;
    }
    
    if (prevBtn) prevBtn.onclick = () => showSlide(currentSlide - 1);
    if (nextBtn) nextBtn.onclick = () => showSlide(currentSlide + 1);
    showSlide(0);
    
    // Фильтр по категориям
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const categoryId = card.dataset.category;
            // Простая фильтрация (можно улучшить)
            alert(`Фильтр по категории ${categoryId} (будет реализовано)`);
        });
    });
    
    // Подписка
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = subscribeForm.querySelector('input').value;
            alert(`Спасибо за подписку, ${email}!`);
            subscribeForm.reset();
        });
    }
});
// Обработчики для 3D-карточек (делегирование событий)
document.addEventListener('click', (e) => {
    // Добавление в корзину
    if (e.target.classList.contains('add-to-cart-3d')) {
        const id = parseInt(e.target.dataset.id);
        if (id) {
            Site.addToCart(id);
            
            // Визуальный фидбек
            const btn = e.target;
            const originalText = btn.textContent;
            btn.textContent = '✓ Добавлено!';
            btn.style.background = '#4caf50';
            btn.style.color = 'white';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'white';
                btn.style.color = '#0066cc';
            }, 1000);
        }
    }
    
    // Переход на страницу товара (если кликнули не по кнопке)
    const card = e.target.closest('.product-card-3d');
    if (card && !e.target.classList.contains('add-to-cart-3d')) {
        const id = card.dataset.id;
        if (id) {
            // alert(`Страница товара #${id} (будет позже)`);
            // Здесь позже добавим переход на страницу товара
        }
    }
});

// Эффект следования за мышью для 3D-карточек (дополнительный эффект)
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.product-card-3d');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
            const rotateX = (mouseY - rect.height / 2) / 20;
            const rotateY = (mouseX - rect.width / 2) / 20;
            card.style.transform = `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });
});

console.log('🎨 3D-эффекты для карточек товаров активированы');
