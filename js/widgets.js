// 2. Сетка товаров с 3D-флип эффектом
Site.registerWidget('product-grid', (data) => {
    const settings = data.widget_settings?.product_grid || {};
    const title = settings.title || 'Наши товары';
    const products = data.products || [];
    const limit = settings.limit || 6;
    
    return `
        <div class="widget product-grid">
            <h2 class="section-title" style="text-align: center; margin-bottom: 40px; font-size: 32px;">${title}</h2>
            <div class="products-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px;">
                ${products.slice(0, limit).map(product => `
                    <div class="product-card-3d" data-id="${product.id}" style="
                        background: transparent;
                        perspective: 1000px;
                        cursor: pointer;
                        height: 420px;
                    ">
                        <div class="flip-card-inner" style="
                            position: relative;
                            width: 100%;
                            height: 100%;
                            text-align: center;
                            transition: transform 0.6s;
                            transform-style: preserve-3d;
                            border-radius: 20px;
                        ">
                            <!-- ПЕРЕДНЯЯ СТОРОНА карточки -->
                            <div class="flip-card-front" style="
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                backface-visibility: hidden;
                                background: white;
                                border-radius: 20px;
                                overflow: hidden;
                                box-shadow: 0 10px 20px rgba(0,0,0,0.05);
                            ">
                                <div class="product-image" style="
                                    height: 260px;
                                    background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    position: relative;
                                ">
                                    <div style="font-size: 80px;">${getProductIcon(product.id)}</div>
                                    <div class="product-badge" style="
                                        position: absolute;
                                        top: 12px;
                                        right: 12px;
                                        background: #0066cc;
                                        color: white;
                                        padding: 4px 12px;
                                        border-radius: 20px;
                                        font-size: 12px;
                                        font-weight: 500;
                                    ">Новинка</div>
                                </div>
                                <div class="product-info" style="padding: 20px; text-align: left;">
                                    <h3 style="
                                        font-size: 18px;
                                        margin: 0 0 8px 0;
                                        color: #1a1a2e;
                                    ">${product.title}</h3>
                                    <div style="
                                        font-size: 14px;
                                        color: #666;
                                        margin-bottom: 12px;
                                        line-height: 1.4;
                                    ">${product.description || 'Стильная модель, отлично подходит для повседневной носки.'}</div>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <span class="product-price" style="
                                            font-size: 24px;
                                            font-weight: 700;
                                            color: #0066cc;
                                        ">${product.price.toLocaleString()} ₽</span>
                                        <span style="
                                            background: #e8f5e9;
                                            color: #4caf50;
                                            padding: 4px 12px;
                                            border-radius: 20px;
                                            font-size: 12px;
                                            font-weight: 500;
                                        ">✓ В наличии</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- ЗАДНЯЯ СТОРОНА карточки -->
                            <div class="flip-card-back" style="
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                backface-visibility: hidden;
                                background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);
                                color: white;
                                border-radius: 20px;
                                transform: rotateY(180deg);
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                padding: 20px;
                                box-sizing: border-box;
                            ">
                                <div style="font-size: 48px; margin-bottom: 20px;">🛒</div>
                                <h3 style="font-size: 22px; margin-bottom: 10px;">${product.title}</h3>
                                <div style="font-size: 28px; font-weight: bold; margin-bottom: 20px;">${product.price.toLocaleString()} ₽</div>
                                <button class="add-to-cart-flip btn-primary" data-id="${product.id}" style="
                                    background: white;
                                    color: #0066cc;
                                    border: none;
                                    padding: 14px 32px;
                                    border-radius: 40px;
                                    font-size: 16px;
                                    font-weight: 600;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                    margin-bottom: 12px;
                                ">📦 В корзину</button>
                                <button class="view-details" data-id="${product.id}" style="
                                    background: transparent;
                                    color: white;
                                    border: 1px solid white;
                                    padding: 10px 24px;
                                    border-radius: 40px;
                                    font-size: 14px;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                ">Подробнее</button>
                                <div style="margin-top: 20px; font-size: 12px; opacity: 0.8;">
                                    ★ Быстрая доставка ★
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
});

// Вспомогательная функция для иконок товаров
function getProductIcon(productId) {
    const icons = {
        1: '👕',
        2: '👖',
        3: '👟',
        4: '👔',
        5: '🧥',
        6: '👞'
    };
    return icons[productId] || '👕';
}
