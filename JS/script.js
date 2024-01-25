let cart = [];

function addToCart(productId) {
    // Assuming each product has a unique productId
    // Find the product details by productId
    // Here, we need to fetch the details like name, price from our product list
    const product = { name: "Product Name", price: 5.00, quantity: 1 }; // Sample product data

    // Check if product is already in cart
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product exists
    } else {
        cart.push(product); // Add new product to cart
    }

    updateCartCount();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}

function displayCart() {
    // Assuming we have a modal or a section to display cart items
    const cartModal = document.querySelector('.cart-modal');
    cartModal.innerHTML = ''; // Clear previous items

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartModal.appendChild(itemElement);
    });

    // Show the cart modal
    cartModal.style.display = 'block';
}

// Event listeners for add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.closest('.product').getAttribute('data-id');
        addToCart(productId);
    });
});

// Event listener for cart icon
document.querySelector('.cart-icon').addEventListener('click', displayCart);