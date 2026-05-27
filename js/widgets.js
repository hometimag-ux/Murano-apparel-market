// 2. Сетка товаров с эффектом как в примере
Site.registerWidget('product-grid', (data) => {
    const settings = data.widget_settings?.product_grid || {};
    const title = settings.title || 'Наши товары';
    const products = data.products || [];
    const limit = settings.limit || 8;
    
    return `
        <div class="widget product-grid">
            <h2 class="section-title" style="text-align: center; margin-bottom: 40px; font-size: 32px; letter-spacing: -0.5px;">${title}</h2>
            
            <div class="products-grid-stable" style="
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                gap: 28px;
                max-height: 700px;
                overflow-y: auto;
                padding: 8px;
            ">
                ${products.slice(0, limit).map((product, index) => `
                    <div class="product-card-stable" data-id="${product.id}" style="
                        background: white;
                        border-radius: 20px;
                        overflow: hidden;
                        transition: all 0.25s ease;
                        cursor: pointer;
                        box-shadow: 0 8px 20px rgba(0,0,0,0.05);
                    ">
                        <div class="product-image-stable" style="
                            aspect-ratio: 1 / 1;
                            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;
                        ">
                            <div style="font-size: 70px; transition: transform 0.2s ease;">${getProductIcon(product.id)}</div>
                            ${index < 3 ? '<span style="position: absolute; top: 12px; left: 12px; background: #ff4d4d; color: white; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;">🔥 ХИТ</span>' : ''}
                        </div>
                        <div class="product-info-stable" style="padding: 18px 16px 20px;">
                            <h3 style="
                                font-size: 17px;
                                font-weight: 600;
                                margin: 0 0 6px 0;
                                color: #1a1a2e;
                                transition: color 0.2s ease;
                            ">${product.title}</h3>
                            <p style="
                                font-size: 13px;
                                color: #6c757d;
                                margin: 0 0 12px 0;
                                line-height: 1.4;
                            ">${product.description?.substring(0, 55) || 'Новая коллекция'}</p>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                                <span class="product-price-stable" style="
                                    font-size: 20px;
                                    font-weight: 700;
                                    color: #1a1a2e;
                                ">${product.price.toLocaleString()} ₽</span>
                                <button class="add-to-cart-stable" data-id="${product.id}" style="
                                    background: #1a1a2e;
                                    border: none;
                                    color: white;
                                    width: 36px;
                                    height: 36px;
                                    border-radius: 50%;
                                    font-size: 18px;
                                    cursor: pointer;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    transition: all 0.2s ease;
                                ">🛒</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <style>
                /* Кастомный скролл */
                .products-grid-stable::-webkit-scrollbar {
                    width: 5px;
                }
                .products-grid-stable::-webkit-scrollbar-track {
                    background: #e9ecef;
                    border-radius: 10px;
                }
                .products-grid-stable::-webkit-scrollbar-thumb {
                    background: #adb5bd;
                    border-radius: 10px;
                }
                .products-grid-stable::-webkit-scrollbar-thumb:hover {
                    background: #0066cc;
                }

                /* Эффект при наведении на карточку */
                .product-card-stable {
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .product-card-stable:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 30px -12px rgba(0,0,0,0.2);
                }
                
                /* Изменение цвета заголовка при наведении */
                .product-card-stable:hover .product-info-stable h3 {
                    color: #0066cc;
                }
                
                /* Анимация иконки и кнопки при наведении */
                .product-card-stable:hover .product-image-stable div {
                    transform: scale(1.05);
                }
                .product-card-stable:hover .add-to-cart-stable {
                    background: #0066cc;
                    transform: scale(1.05);
                }
                
                /* Анимация появления карточек */
                @keyframes fadeUp {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .product-card-stable {
                    animation: fadeUp 0.3s ease forwards;
                    opacity: 0;
                }
                .product-card-stable:nth-child(1) { animation-delay: 0.02s; }
                .product-card-stable:nth-child(2) { animation-delay: 0.04s; }
                .product-card-stable:nth-child(3) { animation-delay: 0.06s; }
                .product-card-stable:nth-child(4) { animation-delay: 0.08s; }
                .product-card-stable:nth-child(5) { animation-delay: 0.10s; }
                .product-card-stable:nth-child(6) { animation-delay: 0.12s; }
                .product-card-stable:nth-child(7) { animation-delay: 0.14s; }
                .product-card-stable:nth-child(8) { animation-delay: 0.16s; }
            </style>
        </div>
    `;
});

function getProductIcon(productId) {
    const icons = { 1: '👕', 2: '👖', 3: '👟', 4: '👔', 5: '🧥', 6: '👞', 7: '👗', 8: '🧢' };
    return icons[productId] || '👕';
}
