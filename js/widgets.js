// 2. Сетка товаров с 3D-эффектами при наведении
Site.registerWidget('product-grid', (data) => {
    const settings = data.widget_settings?.product_grid || {};
    const title = settings.title || 'Наши товары';
    const products = data.products || [];
    const limit = settings.limit || 6;
    
    return `
        <div class="widget product-grid">
            <h2 class="section-title" style="text-align: center; margin-bottom: 40px; font-size: 32px;">${title}</h2>
            
            <div class="products-grid-simple" style="
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 30px;
                max-height: 600px;
                overflow-y: auto;
                padding: 10px;
            ">
                ${products.slice(0, limit).map((product, index) => `
                    <div class="product-card-simple" data-id="${product.id}" style="
                        background: white;
                        border-radius: 20px;
                        overflow: hidden;
                        cursor: pointer;
                        transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
                        box-shadow: 0 5px 15px rgba(0,0,0,0.08);
                        animation: fadeInUp 0.4s ease forwards;
                        animation-delay: ${index * 0.05}s;
                        opacity: 0;
                        transform: translateY(20px);
                    ">
                        <div class="product-image-simple" style="
                            height: 250px;
                            background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;
                            transition: all 0.3s ease;
                        ">
                            <div style="font-size: 70px; transition: transform 0.3s ease;">${getProductIcon(product.id)}</div>
                            <div class="product-overlay-simple" style="
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background: rgba(0,102,204,0.9);
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                opacity: 0;
                                transition: opacity 0.3s ease;
                            ">
                                <button class="add-to-cart-simple" data-id="${product.id}" style="
                                    background: white;
                                    color: #0066cc;
                                    border: none;
                                    padding: 12px 24px;
                                    border-radius: 40px;
                                    font-weight: 600;
                                    cursor: pointer;
                                    transform: translateY(20px);
                                    transition: all 0.3s ease;
                                ">🛒 В корзину</button>
                            </div>
                        </div>
                        <div class="product-info-simple" style="padding: 20px;">
                            <h3 style="
                                font-size: 18px;
                                margin: 0 0 8px 0;
                                color: #1a1a2e;
                                transition: color 0.3s ease;
                            ">${product.title}</h3>
                            <p style="
                                font-size: 13px;
                                color: #666;
                                margin-bottom: 12px;
                                line-height: 1.4;
                            ">${product.description?.substring(0, 60) || 'Стильная модель для повседневной носки.'}</p>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span class="product-price-simple" style="
                                    font-size: 22px;
                                    font-weight: 700;
                                    color: #0066cc;
                                    transition: transform 0.3s ease;
                                ">${product.price.toLocaleString()} ₽</span>
                                <span style="
                                    background: #e8f5e9;
                                    color: #4caf50;
                                    padding: 4px 12px;
                                    border-radius: 20px;
                                    font-size: 11px;
                                ">В наличии</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <style>
                .products-grid-simple::-webkit-scrollbar {
                    width: 6px;
                }
                .products-grid-simple::-webkit-scrollbar-track {
                    background: #f0f0f0;
                    border-radius: 10px;
                }
                .products-grid-simple::-webkit-scrollbar-thumb {
                    background: #0066cc;
                    border-radius: 10px;
                }
                
                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .product-card-simple:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 20px 30px rgba(0,0,0,0.15);
                }
                
                .product-card-simple:hover .product-image-simple {
                    transform: scale(1.02);
                }
                
                .product-card-simple:hover .product-image-simple > div:first-child {
                    transform: scale(1.1) rotate(5deg);
                }
                
                .product-card-simple:hover .product-overlay-simple {
                    opacity: 1;
                }
                
                .product-card-simple:hover .product-overlay-simple button {
                    transform: translateY(0);
                }
                
                .product-card-simple:hover .product-info-simple h3 {
                    color: #0066cc;
                }
                
                .product-card-simple:hover .product-price-simple {
                    transform: scale(1.05);
                }
            </style>
        </div>
    `;
});

function getProductIcon(productId) {
    const icons = { 1: '👕', 2: '👖', 3: '👟', 4: '👔', 5: '🧥', 6: '👞' };
    return icons[productId] || '👕';
}
