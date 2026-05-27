// Admin Panel Logic
const AdminPanel = {
    availableWidgets: [
        { id: 'header-banner', name: '🏷️ Баннер в шапке', description: 'Информационная строка' },
        { id: 'promo-slider', name: '🎠 Промо-слайдер', description: 'Карусель изображений' },
        { id: 'category-list', name: '📁 Список категорий', description: 'Категории товаров' },
        { id: 'product-grid', name: '📦 Сетка товаров', description: 'Вывод товаров' },
        { id: 'footer-subscribe', name: '✉️ Подписка', description: 'Форма подписки' }
    ],
    
    init: function() {
        this.setupEventListeners();
        this.renderWidgetsTab();
        this.renderZonesTab();
        this.renderSettingsTab();
    },
    
    setupEventListeners: function() {
        const toggleBtn = document.getElementById('adminToggle');
        const closeBtn = document.getElementById('adminClose');
        const panel = document.getElementById('adminPanel');
        const overlay = document.getElementById('overlay');
        
        toggleBtn.onclick = () => {
            panel.classList.add('open');
            overlay.classList.add('active');
        };
        
        const closePanel = () => {
            panel.classList.remove('open');
            overlay.classList.remove('active');
        };
        
        closeBtn.onclick = closePanel;
        overlay.onclick = closePanel;
        
        // Переключение вкладок
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.onclick = () => {
                document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const tabName = tab.dataset.tab;
                if (tabName === 'widgets') this.renderWidgetsTab();
                if (tabName === 'zones') this.renderZonesTab();
                if (tabName === 'settings') this.renderSettingsTab();
            };
        });
    },
    
    renderWidgetsTab: function() {
        const container = document.getElementById('adminContent');
        container.innerHTML = `
            <h4 style="margin-bottom: 12px;">Доступные виджеты</h4>
            <p style="font-size: 12px; color: #666; margin-bottom: 16px;">Перетащите виджет в нужную зону на вкладке "Зоны"</p>
            <div id="available-widgets-list">
                ${this.availableWidgets.map(w => `
                    <div class="widget-list-item" draggable="true" data-widget-id="${w.id}">
                        <div>
                            <strong>${w.name}</strong>
                            <div style="font-size: 11px; color: #999;">${w.description}</div>
                        </div>
                        <div style="font-size: 20px;">⋮⋮</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Добавляем drag & drop для виджетов
        document.querySelectorAll('.widget-list-item').forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.dataset.widgetId);
                item.classList.add('dragging');
            });
            item.addEventListener('dragend', (e) => {
                item.classList.remove('dragging');
            });
        });
    },
    
    renderZonesTab: function() {
        const zones = ['header', 'main', 'footer'];
        const zoneNames = { header: 'Шапка сайта', main: 'Основная область', footer: 'Подвал' };
        const widgetsInZones = Site.storeData.widget_zones;
        
        const container = document.getElementById('adminContent');
        container.innerHTML = `
            <h4 style="margin-bottom: 12px;">Зоны для виджетов</h4>
            <p style="font-size: 12px; color: #666; margin-bottom: 16px;">Перетащите виджеты из левой колонки сюда</p>
            <div id="zones-container">
                ${zones.map(zone => `
                    <div class="zone" data-zone="${zone}" 
                         ondragover="event.preventDefault()" 
                         ondrop="AdminPanel.handleDrop(event, '${zone}')">
                        <div class="zone-title">📌 ${zoneNames[zone]}</div>
                        <div class="zone-widgets" id="zone-${zone}">
                            ${(widgetsInZones[zone] || []).map(widgetId => `
                                <div class="zone-widget" data-widget="${widgetId}">
                                    <span>${this.getWidgetName(widgetId)}</span>
                                    <button class="zone-widget-remove" onclick="AdminPanel.removeWidgetFromZone('${zone}', '${widgetId}')">🗑️</button>
                                </div>
                            `).join('')}
                            ${(widgetsInZones[zone] || []).length === 0 ? '<div style="color:#ccc; text-align:center; padding:20px;">Перетащите виджет сюда</div>' : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="save-btn" onclick="AdminPanel.saveZones()">💾 Сохранить изменения</button>
        `;
    },
    
    handleDrop: function(event, zone) {
        event.preventDefault();
        const widgetId = event.dataTransfer.getData('text/plain');
        if (!widgetId) return;
        
        const zones = Site.storeData.widget_zones;
        if (!zones[zone]) zones[zone] = [];
        
        if (!zones[zone].includes(widgetId)) {
            zones[zone].push(widgetId);
            this.renderZonesTab();
        }
    },
    
    removeWidgetFromZone: function(zone, widgetId) {
        const zones = Site.storeData.widget_zones;
        if (zones[zone]) {
            zones[zone] = zones[zone].filter(id => id !== widgetId);
            this.renderZonesTab();
        }
    },
    
    saveZones: function() {
        Site.saveData();
        Site.renderZones();
        alert('Настройки сохранены! Страница обновлена.');
    },
    
    renderSettingsTab: function() {
        const settings = Site.storeData.widget_settings || {};
        const container = document.getElementById('adminContent');
        
        container.innerHTML = `
            <h4 style="margin-bottom: 12px;">Настройки виджетов</h4>
            <p style="font-size: 12px; color: #666; margin-bottom: 16px;">Настройте параметры каждого виджета</p>
            
            <div style="margin-bottom: 20px;">
                <label style="font-weight: 600;">🏷️ Баннер в шапке</label>
                <input type="text" id="banner-text" class="admin-input" value="${settings.header_banner?.text || 'Бесплатная доставка при заказе от 3000 ₽'}" style="width:100%; padding:8px; margin-top:8px; border:1px solid #ddd; border-radius:6px;">
                <input type="color" id="banner-bg" value="${settings.header_banner?.bg_color || '#f8f9fa'}" style="margin-top:8px;">
            </div>
            
            <div style="margin-bottom: 20px;">
                <label style="font-weight: 600;">📦 Сетка товаров</label>
                <input type="number" id="product-limit" value="${settings.product_grid?.limit || 6}" style="width:100%; padding:8px; margin-top:8px; border:1px solid #ddd; border-radius:6px;" placeholder="Количество товаров">
            </div>
            
            <button class="save-btn" onclick="AdminPanel.saveSettings()">💾 Сохранить настройки</button>
        `;
    },
    
    saveSettings: function() {
        const settings = {
            header_banner: {
                text: document.getElementById('banner-text')?.value || '',
                bg_color: document.getElementById('banner-bg')?.value || '#f8f9fa'
            },
            product_grid: {
                limit: parseInt(document.getElementById('product-limit')?.value) || 6
            }
        };
        
        Site.storeData.widget_settings = settings;
        Site.saveData();
        Site.renderZones();
        alert('Настройки сохранены!');
    },
    
    getWidgetName: function(widgetId) {
        const found = this.availableWidgets.find(w => w.id === widgetId);
        return found ? found.name : widgetId;
    }
};

// Запуск админки после загрузки
document.addEventListener('DOMContentLoaded', () => {
    AdminPanel.init();
    window.AdminPanel = AdminPanel;
});
