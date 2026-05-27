// Site Core — загрузка виджетов и управление данными
window.Site = {
    // Данные магазина (позже будет загружаться из CRM)
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
        // Настройки виджетов
        widget_settings: {},
        // Какие виджеты в каких зонах
        widget_zones: {
            header: ['header-banner'],
            main: ['promo-slider', 'category-list', 'product-grid'],
            footer: ['footer-subscribe']
        }
    },

    // Зарегистрированные виджеты
    widgets: {},

    // Корзина
    cart: [],

    // Инициализация
    init: function() {
        this.loadData();
        this.renderZones();
        this.initCart();
    },

    loadData: function() {
        // Загружаем сохранённые настройки из localStorage
        const saved = localStorage.getItem('murano_site_data');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.storeData = { ...this.storeData, ...data };
            } catch(e) {}
        }
    },

    saveData: function() {
        localStorage.setItem('murano_site_data', JSON.stringify(this.storeData));
    },

    registerWidget: function(name, renderFn) {
        this.widgets[name] = renderFn;
    },

    renderZones: function() {
        for (const [zone, widgets] of Object.entries(this.storeData.widget_zones)) {
            const zoneElement = document.getElementById(`zone-${zone}`);
            if (zoneElement) {
                let html = '';
                for (const widgetName of widgets) {
                    if (this.widgets[widgetName]) {
                        html += `<div class="widget" data-widget="${widgetName}">${this.widgets[widgetName](this.storeData)}</div>`;
                    }
                }
                zoneElement.innerHTML = html;
            }
        }
        
        // Добавляем иконку корзины
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
        const cartItemsDiv = document.getElementById('cart-items');
        const cartTotalDiv = document.querySelector('.cart-total');
        
        if (this.cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Корзина пуста</p>';
            cartTotalDiv.innerHTML = '';
        } else {
            cartItemsDiv.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <span>${item.title}</span>
                    <span>${item.price} ₽ × ${item.quantity}</span>
                    <span>${item.price * item.quantity} ₽</span>
                    <button onclick="Site.removeFromCart(${item.id})">🗑️</button>
                </div>
            `).join('');
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotalDiv.innerHTML = `<strong>Итого: ${total.toLocaleString()} ₽</strong>`;
        }
        
        modal.classList.add('active');
    },

    removeFromCart: function(productId) {
        this.cart = this.cart.filter(item => item.id != productId);
        this.saveCart();
        this.updateCartCount();
        this.openCart(); // обновляем модалку
    },

    initCart: function() {
        this.loadCart();
        
        // Закрытие модалки
        const modal = document.getElementById('cart-modal');
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => modal.classList.remove('active');
        window.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
        
        // Оформление заказа
        document.getElementById('checkout-btn').onclick = () => {
            if (this.cart.length === 0) {
                alert('Корзина пуста');
                return;
            }
            alert('Форма оформления заказа будет здесь. Заявка отправится в CRM!');
        };
    }
};

// Функция для обновления данных (будет использоваться админкой)
window.updateSiteData = function(newData) {
    Site.storeData = { ...Site.storeData, ...newData };
    Site.saveData();
    Site.renderZones();
};

Site.init();
window.Site = Site;
