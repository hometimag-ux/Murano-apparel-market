// 2. Сетка товаров с 3D-эффектами
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
                        background: white;
                        border-radius: 20px;
                        overflow: hidden;
                        transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
                        cursor: pointer;
                        position: relative;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.05);
                    ">
                        <div class="product-image-3d" style="
                            height: 260px;
                            background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;
                            overflow: hidden;
                        ">
                            <div style="
                                font-size: 80px;
                                transition: transform 0.4s ease;
                            ">👕</div>
                            <div class="product-overlay" style="
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
                                <button class="add-to-cart-3d btn-primary" data-id="${product.id}" style="
                                    background: white;
                                    color: #0066cc;
                                    border: none;
                                    padding: 12px 24px;
                                    border-radius: 40px;
                                    font-weight: 600;
                                    cursor: pointer;
                                    transform: translateY(20px);
                                    transition: all 0.3s ease;
                                ">В корзину</button>
                            </div>
                        </div>
                        <div class="product-info-3d" style="padding: 20px;">
                            <h3 style="
                                font-size: 18px;
                                margin: 0 0 8px 0;
                                color: #1a1a2e;
                                transition: color 0.3s ease;
                            ">${product.title}</h3>
                            <div style="
                                font-size: 14px;
                                color: #666;
                                margin-bottom: 12px;
                                line-height: 1.4;
                            ">${product.description || 'Стильная модель, отлично подходит для повседневной носки.'}</div>
                            <div style="
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                            ">
                                <span class="product-price-3d" style="
                                    font-size: 24px;
                                    font-weight: 700;
                                    color: #0066cc;
                                    transition: transform 0.3s ease;
                                    display: inline-block;
                                ">${product.price.toLocaleString()} ₽</span>
                                <span style="
                                    background: #e8f5e9;
                                    color: #4caf50;
                                    padding: 4px 12px;
                                    border-radius: 20px;
                                    font-size: 12px;
                                    font-weight: 500;
                                ">В наличии</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
});
