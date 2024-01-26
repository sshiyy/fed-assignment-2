
document.addEventListener("DOMContentLoaded", () => {
    const cart = {
        items: JSON.parse(localStorage.getItem('cartItems')) || [],
        displayCartItems() {
            const cartItemsContainer = document.querySelector('.cart-items');
            cartItemsContainer.innerHTML = '';
            this.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item p-4 flex justify-between items-center';
                itemElement.innerHTML = `
                    <span class="item-name">${item.name}</span>
                    <div class="quantity-control">
                        <button class="decrease-quantity">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-quantity">+</button>
                    </div>
                    <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);

                itemElement.querySelector('.decrease-quantity').addEventListener('click', () => this.updateQuantity(item.id, item.quantity - 1));
                itemElement.querySelector('.increase-quantity').addEventListener('click', () => this.updateQuantity(item.id, item.quantity + 1));
                itemElement.querySelector('.remove-item').addEventListener('click', () => this.removeItem(item.id));
            });
            this.updateTotalAmount();
        },
        updateQuantity(id, newQuantity) {
            const item = this.items.find(item => item.id === id);
            if (item) {
                item.quantity = newQuantity < 1 ? 1 : newQuantity;
                this.saveCart();
                this.displayCartItems();
            }
        },
        removeItem(id) {
            this.items = this.items.filter(item => item.id !== id);
            this.saveCart();
            this.displayCartItems();
        },
        updateTotalAmount() {
            const totalAmount = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
            document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
        },
        saveCart() {
            localStorage.setItem('cartItems', JSON.stringify(this.items));
        }
    };

    cart.displayCartItems();
});
document.addEventListener("DOMContentLoaded", () => {
    const cart = {
        items: JSON.parse(localStorage.getItem('cartItems')) || [],
        displayCartItems() {
            const cartItemsContainer = document.querySelector('.cart-items');
            cartItemsContainer.innerHTML = '';
            this.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item p-4 flex justify-between items-center';
                itemElement.innerHTML = `
                    <span class="item-name">${item.name}</span>
                    <div class="quantity-control">
                        <button class="decrease-quantity">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-quantity">+</button>
                    </div>
                    <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);

                itemElement.querySelector('.decrease-quantity').addEventListener('click', () => this.updateQuantity(item.id, item.quantity - 1));
                itemElement.querySelector('.increase-quantity').addEventListener('click', () => this.updateQuantity(item.id, item.quantity + 1));
                itemElement.querySelector('.remove-item').addEventListener('click', () => this.removeItem(item.id));
            });
            this.updateTotalAmount();
        },
        updateQuantity(id, newQuantity) {
            const item = this.items.find(item => item.id === id);
            if (item) {
                item.quantity = newQuantity < 1 ? 1 : newQuantity;
                this.saveCart();
                this.displayCartItems();
            }
        },
        removeItem(id) {
            this.items = this.items.filter(item => item.id !== id);
            this.saveCart();
            this.displayCartItems();
        },
        updateTotalAmount() {
            const totalAmount = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
            document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
        },
        saveCart() {
            localStorage.setItem('cartItems', JSON.stringify(this.items));
        }
    };

    cart.displayCartItems();
});