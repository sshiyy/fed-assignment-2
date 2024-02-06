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

//API
document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65c1b8029510e8364c754629";

    // Login Button
    var loginBtn = document.getElementById('contact-submit');
    if (loginBtn) {
        loginBtn.addEventListener('click', function (e) {
            e.preventDefault();

            let contactEmail = document.getElementById("contact-email").value;
            let contactText = document.getElementById("contact-text").value;

            let settings = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                },
            };

            fetch("https://fedasg2-d40c.restdb.io/rest/membership", settings)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    const matchingUser = data.find(user => user.email === contactEmail && user.password === contactText);
                    if (matchingUser) {
                        window.location.href = "profile.html";
                    } else {
                        alert('Invalid email or password');
                    }
                })
                .catch(error => {
                    console.error('Login error:', error);
                    alert('Login error: ' + error.message);
                });
        });
    } else {
        console.log('Login button not found');
    }

    // Signup Button
    var signUpBtn = document.getElementById('signup-submit');
    if (signUpBtn) {
        signUpBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Retrieve form data
            let signupName = document.getElementById("signup-name").value;
            let signupNumber = document.getElementById("signup-number").value;
            let signupEmail = document.getElementById("signup-email").value;
            let signupPassword = document.getElementById("signup-password").value;

            // Prepare JSON data for the API call
            let jsondata = {
                "name": signupName,
                "number": signupNumber,
                "email": signupEmail,
                "password": signupPassword
            };

            // Define settings for fetch call
            let settings = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(jsondata),
            };

            // Make the API call to signup
            fetch("https://fedasg2-d40c.restdb.io/rest/membership", settings) // Ensure this is the correct endpoint
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(response => {
                    console.log('Signup successful', response);
                    alert('Thank you for signing up!');
                })
                .catch(error => {
                    console.error('Signup error:', error);
                    alert('Signup error: ' + error.message);
                });
        });
    } else {
        console.log('Signup button not found');
    }
});
