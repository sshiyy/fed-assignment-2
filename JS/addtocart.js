
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            const productElement = event.target.closest('.product');
            const productId = productElement.dataset.id;
            const productName = productElement.querySelector('.product-name').textContent;
            const productPrice = productElement.querySelector('.product-price').textContent;

            const product = {
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                quantity: 1
            };

            addProductToCart(product);
        });
    });
});

function addProductToCart(product) {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    const existingProductIndex = cart.findIndex(p => p.id === product.id);
    if (existingProductIndex > -1) {
        // Product already in cart, update quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // New product, add to cart
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}
