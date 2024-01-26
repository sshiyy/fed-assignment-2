document.addEventListener("DOMContentLoaded", () => {
    const cart = {
        items: [],
        addItem(item) {
            const existingItem = this.items.find(product => product.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({...item, quantity: 1});
            }
            this.updateCartUI();
        },
        updateCartUI() {
            document.getElementById("cart-count").textContent = this.totalItems();
        },
        totalItems() {
            return this.items.reduce((total, item) => total + item.quantity, 0);
        }
    };

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const product = e.target.closest(".product");
            const item = {
                id: product.dataset.id,
                name: product.querySelector(".product-name").textContent,
                price: parseFloat(product.querySelector(".product-price").textContent)
            };
            cart.addItem(item);
        });
    });
});