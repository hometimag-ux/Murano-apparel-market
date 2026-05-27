// 2. Сетка товаров с эффектом TikTok/Reels
Site.registerWidget('product-grid', (data) => {
    const settings = data.widget_settings?.product_grid || {};
    const title = settings.title || 'Наши товары';
    const products = data.products || [];
    
    return `
        <div class="widget product-grid">
            <h2 class="section-title" style="text-align: center; margin-bottom: 40px; font-size: 32px;">${title}</h2>
            
            <div class="reels-container" style="
                height: 70vh;
                overflow-y: auto;
                overflow-x: hidden;
                scroll-snap-type: y mandatory;
                border-radius: 24px;
                position: relative;
            ">
                ${products.map((product, index) => `
                    <div class="reels-card" data-id="${product.id}" data-index="${index}" style="
                        scroll-snap-align: start;
                        height: 70vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                        transform: scale(0.6);
                        opacity: 0;
                        transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
                    ">
                        <div class="card-inner" style="
                            width: 85%;
                            max-width: 500px;
                            background: white;
                            border-radius: 32px;
                            overflow: hidden;
                            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                            transform-origin: center;
                            transition: all 0.4s ease;
                        ">
                            <div class="card-image" style="
                                height: 50vh;
                                background: linear-gradient(135deg, ${getGradientColor(index)});
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                position: relative;
                            ">
                                <div style="font-size: 100px; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.2));">
                                    ${getProductIcon(product.id)}
                                </div>
                                <div class="price-badge" style="
                                    position: absolute;
                                    bottom: 20px;
                                    right: 20px;
                                    background: rgba(255,255,255,0.95);
                                    backdrop-filter: blur(10px);
                                    padding: 12px 20px;
                                    border-radius: 40px;
                                    font-weight: bold;
                                    font-size: 24px;
                                    color: #0066cc;
                                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                                ">${product.price.toLocaleString()} ₽</div>
                            </div>
                            
                            <div class="card-info" style="padding: 24px;">
                                <h3 style="
                                    font-size: 24px;
                                    margin: 0 0 12px 0;
                                    color: #1a1a2e;
                                    font-weight: 700;
                                ">${product.title}</h3>
                                
                                <p style="
                                    font-size: 14px;
                                    color: #666;
                                    line-height: 1.5;
                                    margin-bottom: 20px;
                                ">${product.description || 'Стильная модель, отлично подходит для повседневной носки. Высокое качество и современный дизайн.'}</p>
                                
                                <div style="display: flex; gap: 12px;">
                                    <button class="add-to-cart-reels" data-id="${product.id}" style="
                                        flex: 2;
                                        background: linear-gradient(135deg, #0066cc, #0052a3);
                                        color: white;
                                        border: none;
                                        padding: 14px;
                                        border-radius: 40px;
                                        font-size: 16px;
                                        font-weight: 600;
                                        cursor: pointer;
                                        transition: all 0.3s;
                                    ">
                                        📦 В корзину
                                    </button>
                                    <button class="like-btn" data-id="${product.id}" style="
                                        flex: 0;
                                        background: #f0f0f0;
                                        border: none;
                                        width: 50px;
                                        border-radius: 40px;
                                        font-size: 20px;
                                        cursor: pointer;
                                        transition: all 0.3s;
                                    ">
                                        ♡
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="scroll-progress" style="
                position: fixed;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                width: 4px;
                background: rgba(0,0,0,0.1);
                border-radius: 4px;
                z-index: 100;
            ">
                <div class="scroll-progress-bar" style="
                    width: 100%;
                    background: #0066cc;
                    border-radius: 4px;
                    transition: height 0.1s;
                "></div>
            </div>
        </div>
    `;
});

function getGradientColor(index) {
    const gradients = [
        '#667eea 0%, #764ba2 100%',
        '#f093fb 0%, #f5576c 100%',
        '#4facfe 0%, #00f2fe 100%',
        '#fa709a 0%, #fee140 100%',
        '#a18cd1 0%, #fbc2eb 100%',
        '#ff9a9e 0%, #fecfef 100%'
    ];
    return gradients[index % gradients.length];
}

function getProductIcon(productId) {
    const icons = { 1: '👕', 2: '👖', 3: '👟', 4: '👔', 5: '🧥', 6: '👞', 7: '👗', 8: '🧣' };
    return icons[productId] || '🛍️';
}
