// 2. Сетка товаров с parallax эффектом и прилипанием
Site.registerWidget('product-grid', (data) => {
    const settings = data.widget_settings?.product_grid || {};
    const title = settings.title || 'Наши товары';
    const products = data.products || [];
    const limit = settings.limit || 8;
    
    return `
        <div class="widget product-grid parallax-section">
            <h2 class="section-title" style="text-align: center; margin-bottom: 60px; font-size: 42px; background: linear-gradient(135deg, #1a1a2e, #0066cc); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${title}</h2>
            
            <div class="parallax-container" style="
                position: relative;
                height: 600px;
                overflow-x: auto;
                overflow-y: visible;
                perspective: 1000px;
                padding: 40px 0;
                margin: 0 -20px;
            ">
                <div class="parallax-track" style="
                    display: flex;
                    gap: 30px;
                    position: absolute;
                    left: 0;
                    top: 0;
                    will-change: transform;
                    padding: 0 20px;
                ">
                    ${products.slice(0, limit).map((product, index) => `
                        <div class="parallax-card" data-id="${product.id}" data-depth="${0.2 + index * 0.05}" style="
                            width: 280px;
                            flex-shrink: 0;
                            background: white;
                            border-radius: 24px;
                            overflow: hidden;
                            transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
                            cursor: pointer;
                            position: relative;
                            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                            transform: translateY(${index * 15}px) scale(${1 - index * 0.03});
                            opacity: ${1 - index * 0.07};
                            z-index: ${products.length - index};
                        ">
                            <div class="parallax-card-inner" style="
                                position: relative;
                                transition: all 0.3s ease;
                            ">
                                <div class="product-badge" style="
                                    position: absolute;
                                    top: 15px;
                                    right: 15px;
                                    background: ${index === 0 ? '#ff6600' : '#0066cc'};
                                    color: white;
                                    padding: 6px 14px;
                                    border-radius: 30px;
                                    font-size: 12px;
                                    font-weight: 600;
                                    z-index: 10;
                                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                                ">${index === 0 ? '🔥 Хит' : index === 1 ? '⭐ Новинка' : index === 2 ? '💰 Скидка' : '✓ В наличии'}</div>
                                
                                <div class="product-image-parallax" style="
                                    height: 280px;
                                    background: linear-gradient(135deg, ${getGradientColor(index)});
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    position: relative;
                                    overflow: hidden;
                                ">
                                    <div style="
                                        font-size: 80px;
                                        transition: transform 0.4s ease;
                                        filter: drop-shadow(0 8px 12px rgba(0,0,0,0.1));
                                    ">${getProductIcon(product.id)}</div>
                                    <div class="price-tag" style="
                                        position: absolute;
                                        bottom: 15px;
                                        left: 15px;
                                        background: rgba(255,255,255,0.95);
                                        backdrop-filter: blur(10px);
                                        padding: 8px 16px;
                                        border-radius: 40px;
                                        font-weight: bold;
                                        font-size: 20px;
                                        color: #0066cc;
                                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                                    ">${product.price.toLocaleString()} ₽</div>
                                </div>
                                
                                <div class="product-info-parallax" style="
                                    padding: 20px;
                                    background: white;
                                ">
                                    <h3 style="
                                        font-size: 18px;
                                        margin: 0 0 8px 0;
                                        color: #1a1a2e;
                                        font-weight: 600;
                                    ">${product.title}</h3>
                                    <p style="
                                        font-size: 13px;
                                        color: #666;
                                        margin-bottom: 16px;
                                        line-height: 1.4;
                                        opacity: 0.8;
                                    ">${product.description?.substring(0, 80) || 'Стильная модель, отлично подходит для повседневной носки.'}...</p>
                                    
                                    <button class="add-to-cart-parallax" data-id="${product.id}" style="
                                        width: 100%;
                                        background: linear-gradient(135deg, #0066cc, #0052a3);
                                        color: white;
                                        border: none;
                                        padding: 12px;
                                        border-radius: 40px;
                                        font-size: 14px;
                                        font-weight: 600;
                                        cursor: pointer;
                                        transition: all 0.3s ease;
                                        position: relative;
                                        overflow: hidden;
                                    ">
                                        <span class="btn-text">📦 Добавить в корзину</span>
                                        <span class="btn-hover" style="
                                            position: absolute;
                                            top: 0;
                                            left: -100%;
                                            width: 100%;
                                            height: 100%;
                                            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                                            transition: left 0.5s;
                                        "></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="parallax-controls" style="
                text-align: center;
                margin-top: 40px;
                display: flex;
                justify-content: center;
                gap: 20px;
            ">
                <button class="parallax-nav prev" style="
                    background: #1a1a2e;
                    color: white;
                    border: none;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-size: 20px;
                ">←</button>
                <button class="parallax-nav next" style="
                    background: #1a1a2e;
                    color: white;
                    border: none;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-size: 20px;
                ">→</button>
            </div>
        </div>
    `;
});

function getGradientColor(index) {
    const gradients = [
        '#f5f7fa 0%, #e9ecef 100%',
        '#ffe6e6 0%, #ffcccc 100%',
        '#e6f3ff 0%, #cce6ff 100%',
        '#f0e6ff 0%, #e0ccff 100%',
        '#e6ffe6 0%, #ccffcc 100%',
        '#fff0e6 0%, #ffe0cc 100%'
    ];
    return gradients[index % gradients.length];
}

function getProductIcon(productId) {
    const icons = { 1: '👕', 2: '👖', 3: '👟', 4: '👔', 5: '🧥', 6: '👞' };
    return icons[productId] || '👕';
}
