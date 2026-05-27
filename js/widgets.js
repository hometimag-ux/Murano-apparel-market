// 2. Сетка товаров с плавной прокруткой
Site.registerWidget('product-grid', (data) => {
    const settings = data.widget_settings?.product_grid || {};
    const title = settings.title || 'Наши товары';
    const products = data.products || [];
    
    return `
        <div class="widget product-grid">
            <h2 class="section-title" style="text-align: center; margin-bottom: 40px; font-size: 32px;">${title}</h2>
            
            <div class="scroll-stack" style="
                position: relative;
                height: 80vh;
                overflow-y: auto;
                overflow-x: hidden;
                border-radius: 24px;
                scroll-snap-type: y mandatory;
            ">
                ${products.map((product, index) => `
                    <div class="stack-card" data-id="${product.id}" data-index="${index}" style="
                        scroll-snap-align: start;
                        height: 80vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                    ">
                        <div class="card-wrapper" style="
                            width: 90%;
                            max-width: 500px;
                            background: white;
                            border-radius: 32px;
                            overflow: hidden;
                            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                            transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
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
                                    padding: 8px 16px;
                                    border-radius: 40px;
                                    font-weight: bold;
                                    font-size: 20px;
                                    color: #0066cc;
                                ">${product.price.toLocaleString()} ₽</div>
                            </div>
                            
                            <div class="card-info" style="padding: 20px;">
                                <h3 style="
                                    font-size: 20px;
                                    margin: 0 0 8px 0;
                                    color: #1a1a2e;
                                ">${product.title}</h3>
                                <p style="
                                    font-size: 13px;
                                    color: #666;
                                    line-height: 1.4;
                                    margin-bottom: 16px;
                                ">${product.description?.substring(0, 80) || 'Стильная модель для повседневной носки.'}</p>
                                
                                <button class="add-to-cart-stack" data-id="${product.id}" style="
                                    width: 100%;
                                    background: #0066cc;
                                    color: white;
                                    border: none;
                                    padding: 12px;
                                    border-radius: 40px;
                                    font-size: 14px;
                                    font-weight: 600;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                ">
                                    📦 В корзину
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
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
        '#a18cd1 0%, #fbc2eb 100%'
    ];
    return gradients[index % gradients.length];
}

function getProductIcon(productId) {
    const icons = { 1: '👕', 2: '👖', 3: '👟', 4: '👔', 5: '🧥', 6: '👞' };
    return icons[productId] || '👕';
}
