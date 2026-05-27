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
