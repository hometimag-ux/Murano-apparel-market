// Site Core — загрузка виджетов и управление данными
window.Site = {
    // Данные магазина
    storeData: {
        shop: { name: 'Murano Apparel', phone: '+7 (999) 123-45-67', email: 'info@murano.ru' },
        products: [
            { id: 1, title: 'Хлопковая футболка', price: 1990, category_id: 1, image: 'tshirt.jpg', description: 'Мягкая хлопковая футболка, отлично подходит для повседневной носки.' },
            { id: 2, title: 'Джинсы skinny', price: 3990, category_id: 1, image: 'jeans.jpg', description: 'Узкие джинсы с эластаном, идеально сидят по фигуре.' },
            { id: 3, title: 'Кеды белые', price: 2990, category_id: 2, image: 'shoes.jpg', description: 'Классические белые кеды на толстой подошве.' },
            { id: 4, title: 'Свитшот оверсайз', price: 3490, category_id: 1, image: 'hoodie.jpg', description: 'Уютный свитшот оверсайз с капюшоном.' },
            { id: 5, title: 'Пальто осеннее', price: 8990, category_id: 1, image: 'coat.jpg', description: 'Стильное пальто из натуральной шерсти.' },
            { id: 6, title: 'Кроссовки', price: 4990, category_id: 2, image: 'sneakers.jpg', description: 'Удобные кроссовки для бега и прогулок.' }
        ],
        categories: [
            { id: 1, title: 'Одежда', slug: 'clothing' },
            { id: 2, title: 'Обувь', slug: 'shoes' }
        ],
        widget_settings: {},
        widget_zones: {
            header: ['header-banner'],
            main: ['promo-slider', 'category-list', 'product-grid'],
            footer: ['footer-subscribe']
        }
    },

    widgets: {},
    cart: [],

    init: function() {
        console.log('🟢 Site.init() запущен');
        this.loadData();
        this.renderZones();
        this.initCart();
    },

    loadData: function() {
        const saved = localStorage.getItem('murano_site_data');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.storeData = { ...this.storeData, ...data };
                console.log('📀 Данные загружены из localStorage');
            } catch(e) { console.error('Ошибка загрузки данных', e); }
        }
    },

    saveData: function() {
        localStorage.setItem('murano_site_data', JSON.stringify(this.storeData));
        console.log('💾 Данные сохранены');
    },

    registerWidget: function(name, renderFn) {
        this.widgets[name] = renderFn;
        console.log(`✅ Виджет зарегистрирован: ${name}`);
    },

    renderZones: function() {
        console.log('🟢 Рендеринг зон');
        for (const [zone, widgets] of Object.entries(this.storeData.widget_zones)) {
            const zoneElement = document.getElementById(`zone-${zone}`);
            if (zoneElement) {
                let html = '';
                for (const widgetName of widgets) {
                    if (this.widgets[widgetName]) {
                        html += `<div class="widget" data-widget="${widgetName}">${this.widgets[widgetName](this.storeData)}</div>`;
                    } else {
                        console.warn(`⚠️ Виджет не найден: ${widgetName}`);
                    }
                }
                zoneElement.innerHTML = html;
            } else {
                console.warn(`⚠️ Зона не найдена: zone-${zone}`);
            }
        }
        this.addCartIcon();
    },

    addCartIcon: function() {
        if (!document.querySelector('.cart-icon')) {
            const cartIcon = document.createElement('div');
            cartIcon.className = 'cart-icon';
            cartIcon.innerHTML = '🛒 <span class="cart-count">0</span>';
            cartIcon.onclick = () => this.openCart();
            document.body.appendChild(cartIcon);
        }
        this.updateCartCount();
    },

    updateCartCount: function() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) cartCount.textContent = count;
    },

    addToCart: function(productId, quantity = 1) {
        const product = this.storeData.products.find(p => p.id == productId);
        if (!product) return;
        
        const existing = this.cart.find(item => item.id == productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cart.push({ ...product, quantity });
        }
        
        this.updateCartCount();
        this.saveCart();
    },

    saveCart: function() {
        localStorage.setItem('murano_cart', JSON.stringify(this.cart));
    },

    loadCart: function() {
        const saved = localStorage.getItem('murano_cart');
        if (saved) {
            try {
                this.cart = JSON.parse(saved);
                this.updateCartCount();
            } catch(e) {}
        }
    },

    openCart: function() {
        const modal = document.getElementById('cart-modal');
        if (!modal) {
            console.warn('Модальное окно корзины не найдено');
            return;
        }
        
        const cartItemsDiv = document.getElementById('cart-items');
        const cartTotalDiv = document.querySelector('.cart-total');
        
        if (!cartItemsDiv) return;
        
        if (this.cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Корзина пуста</p>';
            if (cartTotalDiv) cartTotalDiv.innerHTML = '';
        } else {
            cartItemsDiv.innerHTML = this.cart.map(item => `
                <div class="cart-item" style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                    <span>${item.title}</span>
                    <span>${item.price} ₽ × ${item.quantity}</span>
                    <span>${(item.price * item.quantity).toLocaleString()} ₽</span>
                    <button onclick="Site.removeFromCart(${item.id})" style="background:none; border:none; color:#f44336; cursor:pointer;">🗑️</button>
                </div>
            `).join('');
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (cartTotalDiv) cartTotalDiv.innerHTML = `<strong>Итого: ${total.toLocaleString()} ₽</strong>`;
        }
        
        modal.classList.add('active');
    },

    removeFromCart: function(productId) {
        this.cart = this.cart.filter(item => item.id != productId);
        this.saveCart();
        this.updateCartCount();
        this.openCart();
    },

    initCart: function() {
        console.log('🟢 Инициализация корзины');
        this.loadCart();
        
        const modal = document.getElementById('cart-modal');
        if (!modal) {
            console.warn('Модальное окно корзины не найдено, пропускаем инициализацию');
            return;
        }
        
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.onclick = () => modal.classList.remove('active');
        }
        
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.onclick = () => {
                if (this.cart.length === 0) {
                    alert('Корзина пуста');
                    return;
                }
                alert('Форма оформления заказа будет здесь. Заявка отправится в CRM!');
            };
        }
        
        window.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
    }
};

// Автозапуск после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('🟢 DOM загружен, запускаем Site.init()');
    Site.init();
});

window.Site = Site;
