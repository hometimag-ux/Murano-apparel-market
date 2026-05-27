// Простые обработчики для карточек
document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-to-cart-simple');
    if (addBtn) {
        e.stopPropagation();
        const id = parseInt(addBtn.dataset.id);
        if (id) {
            Site.addToCart(id);
            
            const originalText = addBtn.innerHTML;
            addBtn.innerHTML = '✓ Добавлено!';
            addBtn.style.background = '#4caf50';
            addBtn.style.color = 'white';
            
            setTimeout(() => {
                addBtn.innerHTML = originalText;
                addBtn.style.background = 'white';
                addBtn.style.color = '#0066cc';
            }, 1000);
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
        
        const countSpan = cartIcon.querySelector('.cart-count');
        if (countSpan) {
            countSpan.style.cssText = `
                position: absolute;
                top: -8px;
                right: -8px;
                background: #f44336;
                border-radius: 50%;
                width: 22px;
                height: 22px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
        }
    }
}

setTimeout(ensureCartIcon, 100);
