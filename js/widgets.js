// Регистрация всех виджетов сайта

// 1. Промо-слайдер
Site.registerWidget('promo-slider', (data) => {
    const settings = data.widget_settings?.promo_slider || {};
    const slides = settings.slides || [
        { image: 'https://via.placeholder.com/1200x400/0066cc/white?text=Summer+Sale', title: 'Летняя распродажа', subtitle: 'Скидки до 50%' },
        { image: 'https://via.placeholder.com/1200x400/ff6600/white?text=New+Collection', title: 'Новая коллекция', subtitle: 'Осень-Зима 2024' }
    ];
    
    return `
        <div class="widget promo-slider">
            <div class="slider-container">
                ${slides.map(slide => `
                    <div class="slide">
                        <img src="${slide.image}" alt="${slide.title}">
                        <div class="slide-content">
                            <h2>${slide.title}</h2>
                            <p>${slide.subtitle}</p>
                            <a href="/catalog" class="btn-primary">Смотреть</a>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="slider-prev">◀</button>
            <button class="slider-next">▶</button>
        </div>
    `;
});

// 2. Сетка товаров
Site.registerWidget('product-grid', (data) => {
    const settings = data.widget_settings?.product_grid || {};
    const title = settings.title || 'Наши товары';
    const products = data.products || [];
    const limit = settings.limit || 6;
    
    return `
        <div class="widget product-grid">
            <h2 class="section-title">${title}</h2>
            <div class="products-grid">
                ${products.slice(0, limit).map(product => `
                    <div class="product-card">
                        <div class="product-image">📷</div>
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-price">${product.price.toLocaleString()} ₽</div>
                        <button class="btn-primary add-to-cart" data-id="${product.id}">В корзину</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
});

// 3. Список категорий
Site.registerWidget('category-list', (data) => {
    const categories = data.categories || [];
    
    return `
        <div class="widget category-list">
            <h2 class="section-title">Категории</h2>
            <div class="categories-grid">
                ${categories.map(cat => `
                    <div class="category-card" data-category="${cat.id}">
                        <div class="category-icon">📁</div>
                        <span class="category-title">${cat.title}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
});

// 4. Баннер в шапке
Site.registerWidget('header-banner', (data) => {
    const settings = data.widget_settings?.header_banner || {};
    const text = settings.text || 'Бесплатная доставка при заказе от 3000 ₽';
    const bgColor = settings.bg_color || '#f8f9fa';
    
    return `
        <div class="widget header-banner" style="background: ${bgColor}; padding: 12px; text-align: center;">
            🏷️ ${text}
        </div>
    `;
});

// 5. Подписка в футере
Site.registerWidget('footer-subscribe', (data) => {
    return `
        <div class="widget footer-subscribe">
            <div class="subscribe-container">
                <h3>Подпишитесь на новости</h3>
                <p>Будьте в курсе новых поступлений и акций</p>
                <form id="subscribe-form">
                    <input type="email" placeholder="Ваш email" required>
                    <button type="submit" class="btn-primary">Подписаться</button>
                </form>
            </div>
        </div>
    `;
});

// Добавляем обработчики событий после рендера
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const id = parseInt(e.target.dataset.id);
        Site.addToCart(id);
        e.target.textContent = '✓ Добавлено';
        setTimeout(() => { e.target.textContent = 'В корзину'; }, 1000);
    }
});
