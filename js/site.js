// Обработчик для кнопки корзины (стабильная версия)
document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-to-cart-stable');
    if (addBtn) {
        e.stopPropagation();
        const id = parseInt(addBtn.dataset.id);
        if (id) {
            Site.addToCart(id);
            
            // Визуальный отклик
            addBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                addBtn.style.transform = '';
            }, 150);
            
            // Быстрое уведомление (можно через toast)
            const toast = document.createElement('div');
            toast.textContent = '✓ Добавлено';
            toast.style.cssText = `
                position: fixed;
                bottom: 90px;
                right: 20px;
                background: #1a1a2e;
                color: white;
                padding: 8px 16px;
                border-radius: 30px;
                font-size: 13px;
                z-index: 1100;
                opacity: 0;
                transition: opacity 0.2s;
                pointer-events: none;
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.style.opacity = '1', 10);
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 1500);
        }
    }
});

// Убеждаемся, что иконка корзины есть
function ensureCartIcon() {
    if (!document.querySelector('.cart-icon')) {
        const cartIcon = document.createElement('div');
        cartIcon.className = 'cart-icon';
        cartIcon.innerHTML = '🛒 <span class="cart-count">0</span>';
        cartIcon.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #1a1a2e;
            color: white;
            width: 52px;
            height: 52px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 22px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transition: transform 0.2s;
        `;
        cartIcon.onclick = () => Site.openCart();
        document.body.appendChild(cartIcon);
        
        cartIcon.addEventListener('mouseenter', () => cartIcon.style.transform = 'scale(1.05)');
        cartIcon.addEventListener('mouseleave', () => cartIcon.style.transform = 'scale(1)');
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(ensureCartIcon, 100);
});
