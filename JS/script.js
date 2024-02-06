// Initialize an empty cart array
let cart = [];

// Function to add an item to the cart
function addToCart(item) {
    cart.push(item);
    alert('Item added to cart!');
    console.log('Cart:', cart);
}

function viewCart() {
    const cartDisplay = document.getElementById('cart-display');
    if (cartDisplay) {
        if (cart.length === 0) {
            alert('Cart is empty!');
        } else {
            alert(`Cart Contents:\n${cart.join('\n')}`);
        }
    }
}

function checkCart() {
    if (cart.length === 0) {
        alert('Cart is empty. Please add items before proceeding to checkout.');
        // Prevent the default behavior of the link (going to checkout.html)
        event.preventDefault();
    }
}


//login

function toggleSignUp() {
    var cta = document.getElementById('signupCTA');
    var form = document.getElementById('signupForm');
    if (cta.style.display === 'none') {
        cta.style.display = 'flex';
        form.style.display = 'none';
    } else {
        cta.style.display = 'none';
        form.style.display = 'flex'; // Use 'flex' to center the form
    }
}