// 1. Промо-слайдер
Site.registerWidget('promo-slider', (data) => {
    const settings = data.widget_settings?.promo_slider || {};
    const slides = settings.slides || [
        { image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400"%3E%3Crect width="1200" height="400" fill="%230066cc"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="32"%3EЛетняя распродажа%3C/text%3E%3C/svg%3E', title: 'Летняя распродажа', subtitle: 'Скидки до 50%' },
        { image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400"%3E%3Crect width="1200" height="400" fill="%23ff6600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="32"%3EНовая коллекция%3C/text%3E%3C/svg%3E', title: 'Новая коллекция', subtitle: 'Осень-Зима 2024' }
    ];
    
    return `
        <div class="widget promo-slider" style="position: relative;">
            <div class="slider-container">
                ${slides.map(slide => `
                    <div class="slide" style="display: none;">
                        <img src="${slide.image}" alt="${slide.title}" style="width:100%; border-radius:16px;">
                        <div class="slide-content" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: white;">
                            <h2 style="font-size: 2rem;">${slide.title}</h2>
                            <p>${slide.subtitle}</p>
                            <a href="/catalog" class="btn-primary" style="display: inline-block; margin-top: 12px;">Смотреть</a>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="slider-prev" style="position: absolute; left: 10px; top: 50%; background: rgba(0,0,0,0.5); color: white; border: none; padding: 10px 15px; border-radius: 30px; cursor: pointer;">◀</button>
            <button class="slider-next" style="position: absolute; right: 10px; top: 50%; background: rgba(0,0,0,0.5); color: white; border: none; padding: 10px 15px; border-radius: 30px; cursor: pointer;">▶</button>
        </div>
    `;
});
