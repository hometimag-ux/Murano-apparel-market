// Обработчики для 3D-карточек с флип эффектом
document.addEventListener('click', (e) => {
    // Добавление в корзину (кнопка на обратной стороне)
    if (e.target.classList.contains('add-to-cart-flip')) {
        e.stopPropagation();
        const id = parseInt(e.target.dataset.id);
        if (id) {
            Site.addToCart(id);
            
            // Визуальный фидбек
            const btn = e.target;
            const originalText = btn.textContent;
            btn.textContent = '✓ Добавлено!';
            btn.style.background = '#4caf50';
            btn.style.color = 'white';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'white';
                btn.style.color = '#0066cc';
            }, 1000);
        }
    }
    
    // Кнопка "Подробнее"
    if (e.target.classList.contains('view-details')) {
        e.stopPropagation();
        const id = parseInt(e.target.dataset.id);
        alert(`Страница товара #${id} будет здесь позже!`);
    }
});

// Добавляем иконку корзины, если её нет
function ensureCartIcon() {
    if (!document.querySelector('.cart-icon')) {
        const cartIcon = document.createElement('div');
        cartIcon.className = 'cart-icon';
        cartIcon.innerHTML = '🛒 <span class="cart-count">0</span>';
        cartIcon.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #0066cc;
            color: white;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 24px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
        `;
        cartIcon.onclick = () => Site.openCart();
        document.body.appendChild(cartIcon);
        
        // Добавляем счётчик
        const countSpan = document.createElement('span');
        countSpan.className = 'cart-count';
        countSpan.style.cssText = `
            position: absolute;
            top: -8px;
            right: -8px;
            background: #f44336;
            color: white;
            border-radius: 50%;
            width: 22px;
            height: 22px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        cartIcon.appendChild(countSpan);
    }
}

// Запускаем добавление иконки
setTimeout(ensureCartIcon, 100);
